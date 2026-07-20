import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { authenticate, AuthRequest } from './middleware/auth';

const prisma = new PrismaClient();
const app = express();
const PORT = process.env.PORT || 4000;
const JWT_SECRET = process.env.JWT_SECRET || 'super-secret-creatorne-key';

app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:3001'],
  credentials: true
}));
app.use(express.json());

// Basic health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'CreatorNE Backend is running' });
});

// --- AUTHENTICATION ---

app.post('/api/auth/register/brand', async (req, res) => {
  try {
    const { email, phone, password, brandName, contactPerson, industry } = req.body;
    
    const existing = await prisma.user.findFirst({ where: { OR: [{ email }, { phone }] } });
    if (existing) return res.status(400).json({ error: 'User with this email or phone already exists' });

    const passwordHash = await bcrypt.hash(password, 10);
    const newUser = await prisma.user.create({
      data: {
        role: 'BRAND',
        email,
        phone,
        passwordHash,
        status: 'PENDING',
        brand: {
          create: { brandName, contactPerson, industry }
        }
      },
      include: { brand: true }
    });

    const token = jwt.sign({ id: newUser.id, role: newUser.role, email: newUser.email }, JWT_SECRET, { expiresIn: '7d' });
    res.status(201).json({ message: 'Brand registered successfully', user: { id: newUser.id, email: newUser.email, role: newUser.role, brand: newUser.brand }, token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to register brand' });
  }
});

app.post('/api/auth/register/creator', async (req, res) => {
  try {
    const { email, phone, password, name, state, city, category, bio, followersCount, avgViews, engagementRate } = req.body;
    
    const existing = await prisma.user.findFirst({ where: { OR: [{ email }, { phone }] } });
    if (existing) return res.status(400).json({ error: 'User with this email or phone already exists' });

    const passwordHash = await bcrypt.hash(password, 10);
    const newUser = await prisma.user.create({
      data: {
        role: 'CREATOR',
        email,
        phone,
        passwordHash,
        status: 'PENDING',
        creator: {
          create: {
            name, state, city, bio, followersCount: Number(followersCount), avgViews: Number(avgViews), engagementRate: Number(engagementRate), languages: "[]"
          }
        }
      },
      include: { creator: true }
    });

    const token = jwt.sign({ id: newUser.id, role: newUser.role, email: newUser.email }, JWT_SECRET, { expiresIn: '7d' });
    res.status(201).json({ message: 'Creator registered successfully', user: { id: newUser.id, email: newUser.email, role: newUser.role, creator: newUser.creator }, token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to register creator' });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({ 
      where: { email },
      include: { creator: true, brand: true } 
    });

    if (!user) return res.status(401).json({ error: 'Invalid credentials' });

    const valid = await bcrypt.compare(password, user.passwordHash);
    if (!valid) return res.status(401).json({ error: 'Invalid credentials' });

    const token = jwt.sign({ id: user.id, role: user.role, email: user.email }, JWT_SECRET, { expiresIn: '7d' });
    
    const userData = {
      id: user.id,
      email: user.email,
      role: user.role,
      profile: user.role === 'CREATOR' ? user.creator : user.brand
    };

    res.json({ message: 'Login successful', user: userData, token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to login' });
  }
});

app.get('/api/auth/me', authenticate, async (req: AuthRequest, res) => {
  try {
    const user = await prisma.user.findUnique({ 
      where: { id: req.user?.id },
      include: { creator: true, brand: true }
    });
    if (!user) return res.status(404).json({ error: 'User not found' });
    
    res.json({
      id: user.id,
      email: user.email,
      role: user.role,
      profile: user.role === 'CREATOR' ? user.creator : user.brand
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user' });
  }
});


// --- CREATORS (Discovery) ---

app.get('/api/creators', async (req, res) => {
  try {
    const { search, state, category } = req.query;
    
    const where: any = {};
    if (search) where.name = { contains: String(search) }; // SQLite doesn't have insensitive
    if (state) where.state = String(state);
    
    // SQLite doesn't easily filter by many-to-many in basic where without include filter, but this is a stub
    // For simplicity, we just filter by state and name
    
    const creators = await prisma.creator.findMany({
      where,
      include: { user: { select: { status: true } }, categories: true },
      take: 20
    });
    
    res.json(creators);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch creators' });
  }
});

// --- DASHBOARDS ---

app.get('/api/dashboard/brand', authenticate, async (req: AuthRequest, res) => {
  try {
    if (req.user?.role !== 'BRAND') return res.status(403).json({ error: 'Forbidden' });
    
    const brand = await prisma.brand.findUnique({ where: { userId: req.user.id } });
    if (!brand) return res.status(404).json({ error: 'Brand not found' });
    
    const campaigns = await prisma.campaign.findMany({
      where: { brandId: brand.id },
      take: 5,
      orderBy: { createdAt: 'desc' }
    });
    
    res.json({
      stats: {
        activeCampaigns: campaigns.length,
        shortlisted: 0,
        views: 0
      },
      recentCampaigns: campaigns
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch dashboard data' });
  }
});

app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});

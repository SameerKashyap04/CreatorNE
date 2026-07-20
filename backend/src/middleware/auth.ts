import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'super-secret-creatorne-key';

export interface AuthRequest extends Request {
  user?: {
    id: string;
    role: string;
    email: string;
  };
}

export const authenticate = (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Unauthorized: No token provided' });
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, JWT_SECRET) as any;

    req.user = {
      id: decoded.id,
      role: decoded.role,
      email: decoded.email
    };

    next();
  } catch (error) {
    return res.status(401).json({ error: 'Unauthorized: Invalid token' });
  }
};

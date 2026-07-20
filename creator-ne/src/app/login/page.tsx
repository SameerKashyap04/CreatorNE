"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { Sparkles, Mail, Lock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { GlassCard } from "@/components/ui/GlassCard";
import { useToast } from "@/contexts/ToastContext";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"CREATOR" | "BRAND">("CREATOR");
  const [loading, setLoading] = useState(false);
  
  const { login } = useAuth();
  const { success, error: toastError } = useToast();
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const res = await fetch("http://localhost:4000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, role })
      });
      const data = await res.json();
      
      if (!res.ok) throw new Error(data.error || "Login failed");
      
      login(data.token, data.user);
      success("Welcome Back", "You have successfully logged in.");
      
      if (data.user.role === "BRAND") router.push("/brand/dashboard");
      else if (data.user.role === "CREATOR") router.push("/creator/dashboard");
      else if (data.user.role === "ADMIN") router.push("/admin");
      
    } catch (err: any) {
      toastError("Login Failed", err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden mesh-bg">
      {/* Background blobs */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="absolute top-1/4 -left-1/4 h-[500px] w-[500px] rounded-full opacity-[0.07]" style={{ background: "radial-gradient(circle, var(--brand-500) 0%, transparent 70%)", filter: "blur(80px)" }} />
        <div className="absolute bottom-1/4 -right-1/4 h-[500px] w-[500px] rounded-full opacity-[0.06]" style={{ background: "radial-gradient(circle, var(--accent-purple) 0%, transparent 70%)", filter: "blur(80px)" }} />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-md relative z-10"
      >
        <div className="flex flex-col items-center mb-8">
          <Link href="/" className="flex items-center gap-2 group mb-6">
            <div className="relative">
              <div className="absolute -inset-1 rounded-lg bg-gradient-to-r from-brand-600 to-[var(--accent-purple)] opacity-50 blur-md group-hover:opacity-80 transition-opacity" />
              <div className="relative flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-brand-600 to-[var(--accent-purple)]">
                <Sparkles className="h-5 w-5 text-white" />
              </div>
            </div>
            <span className="text-xl font-bold tracking-tight" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
              <span className="gradient-text">Creator</span>
              <span className="text-[var(--text-primary)]">NE</span>
            </span>
          </Link>
          <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-2">Welcome Back</h2>
          <p className="text-[var(--text-secondary)] mb-8">Sign in to your CreatorNE account</p>
        </div>

        <GlassCard animated={false} hover={false} glow className="p-8">
          <form onSubmit={handleLogin} className="flex flex-col gap-5">
            {/* Role Selection */}
            <Input
              type="email"
              label="Email address"
              placeholder="you@example.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              leftIcon={<Mail className="h-4 w-4" />}
            />
            <div className="flex flex-col gap-1.5">
              <Input
                type="password"
                label="Password"
                placeholder="••••••••"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                leftIcon={<Lock className="h-4 w-4" />}
              />
              <div className="flex justify-end">
                <Link href="#" className="text-xs text-[var(--brand-400)] hover:text-[var(--brand-300)] transition-colors">
                  Forgot password?
                </Link>
              </div>
            </div>

            <Button
              type="submit"
              variant="primary"
              className="w-full mt-2"
              loading={loading}
              icon={<ArrowRight className="h-4 w-4" />}
              iconPosition="right"
            >
              Sign in
            </Button>
          </form>

          <div className="mt-6 flex items-center justify-between text-xs text-[var(--text-muted)]">
            <div className="h-px bg-[var(--border-subtle)] flex-1" />
            <span className="px-3">or continue with</span>
            <div className="h-px bg-[var(--border-subtle)] flex-1" />
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3">
            <Button variant="secondary" className="text-xs">Google</Button>
            <Button variant="secondary" className="text-xs">Apple</Button>
          </div>
        </GlassCard>

        <p className="text-center text-sm text-[var(--text-secondary)] mt-8">
          Don&apos;t have an account?{" "}
          <Link href="/register/creator" className="text-[var(--brand-400)] hover:text-[var(--brand-300)] font-medium transition-colors">
            Sign up
          </Link>
        </p>
      </motion.div>
    </div>
  );
}

"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { Mail, Lock, Compass } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
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
    <div className="min-h-screen flex items-center justify-center p-4 bg-[#0a0a0f] mesh-bg relative overflow-hidden">
      
      {/* Subtle background ambient light */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
        <div className="w-[800px] h-[800px] bg-purple-900/10 rounded-full blur-[120px]" />
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.98, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-md relative z-10"
      >
        <div className="bg-[#141218] border border-white/5 rounded-3xl p-8 md:p-10 shadow-[0_20px_60px_rgba(0,0,0,0.5)] ring-1 ring-white/10 flex flex-col justify-between min-h-[600px]">
          
          {/* Logo (Top Left) */}
          <Link href="/" className="flex items-center gap-2 group w-fit">
            <div className="relative">
              <div className="absolute -inset-1 rounded-lg bg-gradient-to-r from-brand-600 to-[var(--accent-purple)] opacity-50 blur-md group-hover:opacity-80 transition-opacity" />
              <div className="relative flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-brand-600 to-[var(--accent-purple)]">
                <Compass className="h-4 w-4 text-white" />
              </div>
            </div>
            <span className="text-lg font-bold tracking-tight" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
              <span className="gradient-text">Creator</span>
              <span className="text-white">NE</span>
            </span>
          </Link>

          {/* Form Container (Center) */}
          <div className="w-full flex flex-col pt-8 pb-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-white mb-2 tracking-tight">Welcome back</h2>
              <p className="text-sm text-slate-400">Log in to continue</p>
            </div>

            <form onSubmit={handleLogin} className="flex flex-col gap-5">
              
              <Input
                type="email"
                placeholder="Email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                leftIcon={<Mail className="h-4 w-4 text-slate-400" />}
                className="bg-[#1C1A22] border-transparent focus:border-[var(--brand-500)] h-12"
              />
              
              <Input
                type="password"
                placeholder="Password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                leftIcon={<Lock className="h-4 w-4 text-slate-400" />}
                className="bg-[#1C1A22] border-transparent focus:border-[var(--brand-500)] h-12"
              />

              <div className="flex items-center justify-between text-xs mt-1 mb-2">
                <label className="flex items-center gap-2 cursor-pointer text-slate-400 hover:text-slate-300">
                  <input type="checkbox" className="rounded border-slate-700 bg-[#1C1A22] text-[var(--brand-500)] focus:ring-[var(--brand-500)] focus:ring-offset-0" />
                  Remember me
                </label>
                <Link href="#" className="text-slate-400 hover:text-white transition-colors">
                  Forgot password?
                </Link>
              </div>

              <Button
                type="submit"
                className="w-full h-12 bg-gradient-to-r from-[#9333ea] to-[#a855f7] hover:from-[#7e22ce] hover:to-[#9333ea] text-white font-medium rounded-lg shadow-lg shadow-purple-500/20"
                loading={loading}
              >
                Log In
              </Button>
            </form>

            <div className="mt-6 flex items-center justify-center gap-4 text-xs text-slate-500">
              <div className="h-px bg-slate-800 flex-1" />
              <span>Or</span>
              <div className="h-px bg-slate-800 flex-1" />
            </div>

            <div className="mt-6 flex flex-col gap-3">
              <Button 
                variant="secondary" 
                className="w-full h-12 bg-[#1C1A22] border-transparent hover:bg-[#25232b] text-slate-300"
                icon={
                  <svg className="w-4 h-4" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                  </svg>
                }
              >
                Log in with Google
              </Button>
              <Button 
                variant="secondary" 
                className="w-full h-12 bg-[#1C1A22] border-transparent hover:bg-[#25232b] text-slate-300"
                icon={
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="#1877F2">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                }
              >
                Log in with Facebook
              </Button>
            </div>

            <p className="text-center text-sm text-slate-400 mt-8">
              Don&apos;t have an account?{" "}
              <Link href="/register/creator" className="text-purple-400 hover:text-purple-300 transition-colors font-medium">
                Sign Up
              </Link>
            </p>
          </div>

          {/* Footer (Bottom Center) */}
          <div className="text-center text-[10px] text-slate-600 mt-auto pt-4 border-t border-white/5">
            <p>Powered by <span className="text-slate-500">CreatorNE</span></p>
            <p>© All rights reserved.</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

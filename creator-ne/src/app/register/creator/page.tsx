"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Link from "next/link";
import { Sparkles, Camera, MapPin, User, Mail, Phone, Link as LinkIcon, ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { GlassCard } from "@/components/ui/GlassCard";

import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/contexts/ToastContext";

const steps = ["Personal", "Social", "Details"];

export default function CreatorRegistrationPage() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  
  const { login } = useAuth();
  const { success: toastSuccess, error: toastError } = useToast();
  
  const [formData, setFormData] = useState({
    name: "", email: "", phone: "", state: "", city: "", 
    category: "", followersCount: "", avgViews: "", engagementRate: "",
    bio: "", password: "", confirmPassword: ""
  });

  const updateForm = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const nextStep = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 3) setStep(step + 1);
    else handleSubmit();
  };

  const handleSubmit = async () => {
    if (formData.password !== formData.confirmPassword) {
      toastError("Passwords do not match", "");
      return;
    }
    
    setLoading(true);
    
    try {
      const res = await fetch("http://localhost:4000/api/auth/register/creator", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Registration failed");
      
      login(data.token, data.user);
      toastSuccess("Application Received", "Your creator profile is pending approval.");
      setSuccess(true);
    } catch (err: any) {
      toastError("Registration Failed", err.message);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 mesh-bg">
        <GlassCard animated hover={false} glow className="p-10 max-w-md w-full text-center flex flex-col items-center">
          <div className="h-16 w-16 bg-emerald-500/20 rounded-full flex items-center justify-center mb-6 ring-4 ring-emerald-500/10">
            <CheckCircle2 className="h-8 w-8 text-emerald-400" />
          </div>
          <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-2">Application Received!</h2>
          <p className="text-[var(--text-secondary)] mb-8">
            Our admin team will review your profile and verify your details. You will receive an email once approved.
          </p>
          <Link href="/" className="w-full">
            <Button variant="primary" className="w-full">Return to Home</Button>
          </Link>
        </GlassCard>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-20 px-4 relative overflow-hidden mesh-bg flex flex-col items-center justify-center">
      {/* Header */}
      <div className="flex flex-col items-center mb-8 relative z-10 w-full max-w-2xl">
        <Link href="/" className="flex items-center gap-2 group mb-6">
          <div className="relative">
            <div className="absolute -inset-1 rounded-lg bg-gradient-to-r from-brand-600 to-[var(--accent-purple)] opacity-50 blur-md group-hover:opacity-80 transition-opacity" />
            <div className="relative flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-brand-600 to-[var(--accent-purple)]">
              <Sparkles className="h-4 w-4 text-white" />
            </div>
          </div>
          <span className="font-bold tracking-tight" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
            <span className="gradient-text">Creator</span>
            <span className="text-[var(--text-primary)]">NE</span>
          </span>
        </Link>
        <h1 className="text-3xl font-bold text-[var(--text-primary)] text-center">Join as a Creator</h1>
        <p className="text-sm text-[var(--text-secondary)] mt-2 text-center max-w-md">
          Build your professional profile, get discovered by top brands, and monetize your influence.
        </p>

        {/* Progress Bar */}
        <div className="w-full mt-10">
          <div className="flex justify-between mb-2">
            {steps.map((s, i) => (
              <span key={s} className={`text-xs font-medium ${step >= i + 1 ? "text-[var(--brand-400)]" : "text-[var(--text-muted)]"}`}>
                {i + 1}. {s}
              </span>
            ))}
          </div>
          <div className="h-1.5 w-full bg-[var(--bg-glass-strong)] rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-brand-600 to-[var(--accent-purple)] rounded-full"
              initial={{ width: "33%" }}
              animate={{ width: `${(step / 3) * 100}%` }}
              transition={{ duration: 0.4 }}
            />
          </div>
        </div>
      </div>

      <motion.div
        key={step}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-2xl relative z-10"
      >
        <GlassCard animated={false} hover={false} glow className="p-6 md:p-8">
          <form onSubmit={nextStep} className="flex flex-col gap-6">
            
            {/* STEP 1: Personal */}
            {step === 1 && (
              <div className="flex flex-col gap-5">
                <div className="grid md:grid-cols-2 gap-5">
                  <Input name="name" value={formData.name} onChange={updateForm} label="Full Name" placeholder="e.g. Priya Mohan" required leftIcon={<User className="h-4 w-4"/>} />
                  <Input name="email" value={formData.email} onChange={updateForm} label="Email Address" type="email" placeholder="priya@example.com" required leftIcon={<Mail className="h-4 w-4"/>} />
                </div>
                <div className="grid md:grid-cols-2 gap-5">
                  <Input name="phone" value={formData.phone} onChange={updateForm} label="Phone Number" type="tel" placeholder="+91" required leftIcon={<Phone className="h-4 w-4"/>} />
                  <Input label="WhatsApp Number" type="tel" placeholder="+91" required leftIcon={<Phone className="h-4 w-4"/>} />
                </div>
                <div className="grid md:grid-cols-2 gap-5">
                  <Input name="state" value={formData.state} onChange={updateForm} label="State" placeholder="e.g. Assam" required leftIcon={<MapPin className="h-4 w-4"/>} />
                  <Input name="city" value={formData.city} onChange={updateForm} label="City" placeholder="e.g. Guwahati" required leftIcon={<MapPin className="h-4 w-4"/>} />
                </div>
              </div>
            )}

            {/* STEP 2: Social */}
            {step === 2 && (
              <div className="flex flex-col gap-5">
                <Input name="category" value={formData.category} onChange={updateForm} label="Main Category" placeholder="e.g. Travel, Lifestyle" required leftIcon={<Sparkles className="h-4 w-4"/>} />
                <Input label="Instagram Profile Link" type="url" placeholder="https://instagram.com/..." required leftIcon={<Camera className="h-4 w-4"/>} />
                <Input label="YouTube Channel Link (Optional)" type="url" placeholder="https://youtube.com/..." leftIcon={<LinkIcon className="h-4 w-4"/>} />
                <div className="grid md:grid-cols-3 gap-5">
                  <Input name="followersCount" value={formData.followersCount} onChange={updateForm} label="Total Followers" placeholder="e.g. 50000" type="number" required />
                  <Input name="avgViews" value={formData.avgViews} onChange={updateForm} label="Avg Views / Reel" placeholder="e.g. 10000" type="number" required />
                  <Input name="engagementRate" value={formData.engagementRate} onChange={updateForm} label="Engagement Rate (%)" placeholder="e.g. 5.2" type="number" step="0.1" required />
                </div>
              </div>
            )}

            {/* STEP 3: Details */}
            {step === 3 && (
              <div className="flex flex-col gap-5">
                <div className="flex flex-col gap-1.5 w-full">
                  <label className="text-sm font-medium text-[var(--text-secondary)]">Short Bio</label>
                  <textarea
                    name="bio"
                    value={formData.bio}
                    onChange={updateForm}
                    className="w-full bg-[var(--bg-glass)] border border-[var(--border-default)] rounded-[var(--radius-md)] px-4 py-3 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--brand-500)] focus:ring-1 focus:ring-[var(--brand-500)] resize-none"
                    rows={4}
                    placeholder="Tell brands about yourself, your audience, and what makes you unique..."
                    required
                  />
                </div>
                <div className="grid md:grid-cols-2 gap-5">
                  <Input label="Languages Spoken" placeholder="English, Assamese, Hindi" required />
                  <Input label="UPI ID (For Payments)" placeholder="name@upi" required />
                </div>
                
                <div className="grid md:grid-cols-2 gap-5 mt-2 border-t border-[var(--border-subtle)] pt-5">
                  <Input name="password" value={formData.password} onChange={updateForm} label="Set Password" type="password" placeholder="••••••••" required />
                  <Input name="confirmPassword" value={formData.confirmPassword} onChange={updateForm} label="Confirm Password" type="password" placeholder="••••••••" required />
                </div>

                <div className="p-4 bg-brand-500/10 border border-brand-500/20 rounded-[var(--radius-md)]">
                  <p className="text-xs text-[var(--brand-300)] leading-relaxed">
                    By submitting this application, you agree to our Terms of Service. Your bank and contact details remain private and are only used for processing brand payments.
                  </p>
                </div>
              </div>
            )}

            {/* Navigation */}
            <div className="flex justify-between mt-4 pt-6 border-t border-[var(--border-subtle)]">
              {step > 1 ? (
                <Button type="button" variant="ghost" onClick={() => setStep(step - 1)}>
                  Back
                </Button>
              ) : (
                <div />
              )}
              <Button
                type="submit"
                variant="primary"
                loading={loading}
                icon={step === 3 ? undefined : <ArrowRight className="h-4 w-4" />}
                iconPosition="right"
              >
                {step === 3 ? "Submit Application" : "Continue"}
              </Button>
            </div>
          </form>
        </GlassCard>
      </motion.div>
    </div>
  );
}

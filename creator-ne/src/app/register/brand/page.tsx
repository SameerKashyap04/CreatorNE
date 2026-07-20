"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Link from "next/link";
import { Sparkles, Building, Mail, Phone, Link as LinkIcon, Target, Briefcase, ArrowRight, CheckCircle2, User } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { GlassCard } from "@/components/ui/GlassCard";

import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/contexts/ToastContext";

const steps = ["Company", "Campaign", "Account"];

export default function BrandRegistrationPage() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  
  const { login } = useAuth();
  const { success: toastSuccess, error: toastError } = useToast();
  
  // Form State
  const [formData, setFormData] = useState({
    brandName: "", contactPerson: "", industry: "", email: "", phone: "", website: "",
    goal: "", description: "", budget: "", targetState: "",
    password: "", confirmPassword: ""
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
      toastError("Passwords do not match");
      return;
    }
    setLoading(true);
    
    try {
      const res = await fetch("http://localhost:4000/api/auth/register/brand", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Registration failed");
      
      login(data.token, data.user);
      toastSuccess("Application Received", "Your brand account is pending approval.");
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
          <div className="h-16 w-16 bg-brand-500/20 rounded-full flex items-center justify-center mb-6 ring-4 ring-brand-500/10">
            <CheckCircle2 className="h-8 w-8 text-brand-400" />
          </div>
          <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-2">Welcome to CreatorNE</h2>
          <p className="text-[var(--text-secondary)] mb-8">
            Your brand account is ready. Let's find the perfect creators for your next campaign.
          </p>
          <Link href="/brand/dashboard" className="w-full">
            <Button variant="primary" className="w-full">Go to Dashboard</Button>
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
        <h1 className="text-3xl font-bold text-[var(--text-primary)] text-center">Hire Top Creators</h1>
        <p className="text-sm text-[var(--text-secondary)] mt-2 text-center max-w-md">
          Connect with authentic voices across North East India and launch impactful campaigns.
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
            
            {/* STEP 1: Company */}
            {step === 1 && (
              <div className="flex flex-col gap-5">
                <Input name="brandName" value={formData.brandName} onChange={updateForm} label="Brand / Company Name" placeholder="e.g. Acme Corp" required leftIcon={<Building className="h-4 w-4"/>} />
                <div className="grid md:grid-cols-2 gap-5">
                  <Input name="contactPerson" value={formData.contactPerson} onChange={updateForm} label="Contact Person" placeholder="e.g. Jane Doe" required leftIcon={<User className="h-4 w-4"/>} />
                  <Input name="industry" value={formData.industry} onChange={updateForm} label="Industry" placeholder="e.g. FMCG, Tech" required leftIcon={<Briefcase className="h-4 w-4"/>} />
                </div>
                <div className="grid md:grid-cols-2 gap-5">
                  <Input name="email" value={formData.email} onChange={updateForm} label="Email Address" type="email" placeholder="jane@acme.com" required leftIcon={<Mail className="h-4 w-4"/>} />
                  <Input name="phone" value={formData.phone} onChange={updateForm} label="Phone Number" type="tel" placeholder="+91" required leftIcon={<Phone className="h-4 w-4"/>} />
                </div>
                <Input name="website" value={formData.website} onChange={updateForm} label="Website URL (Optional)" type="url" placeholder="https://..." leftIcon={<LinkIcon className="h-4 w-4"/>} />
              </div>
            )}

            {/* STEP 2: Campaign */}
            {step === 2 && (
              <div className="flex flex-col gap-5">
                <Input name="goal" value={formData.goal} onChange={updateForm} label="Initial Campaign Goal" placeholder="e.g. Product Launch, Brand Awareness" required leftIcon={<Target className="h-4 w-4"/>} />
                <div className="flex flex-col gap-1.5 w-full">
                  <label className="text-sm font-medium text-[var(--text-secondary)]">Campaign Description</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={updateForm}
                    className="w-full bg-[var(--bg-glass)] border border-[var(--border-default)] rounded-[var(--radius-md)] px-4 py-3 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--brand-500)] focus:ring-1 focus:ring-[var(--brand-500)] resize-none"
                    rows={4}
                    placeholder="Briefly describe what you are looking for..."
                    required
                  />
                </div>
                <div className="grid md:grid-cols-2 gap-5">
                  <Input name="budget" value={formData.budget} onChange={updateForm} label="Estimated Budget (₹)" placeholder="e.g. 50000" type="number" required />
                  <Input name="targetState" value={formData.targetState} onChange={updateForm} label="Target State/City" placeholder="e.g. Assam, Meghalaya" required />
                </div>
              </div>
            )}

            {/* STEP 3: Account */}
            {step === 3 && (
              <div className="flex flex-col gap-5">
                <Input name="password" value={formData.password} onChange={updateForm} label="Set Password" type="password" placeholder="••••••••" required />
                <Input name="confirmPassword" value={formData.confirmPassword} onChange={updateForm} label="Confirm Password" type="password" placeholder="••••••••" required />
                <div className="p-4 bg-brand-500/10 border border-brand-500/20 rounded-[var(--radius-md)]">
                  <p className="text-xs text-[var(--brand-300)] leading-relaxed">
                    By registering, you agree to our Brand Terms & Conditions. You will gain immediate access to search and filter our curated list of North East creators.
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
                {step === 3 ? "Complete Registration" : "Continue"}
              </Button>
            </div>
          </form>
        </GlassCard>
      </motion.div>
    </div>
  );
}

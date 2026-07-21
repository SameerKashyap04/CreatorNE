"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Link from "next/link";
import { Building, Mail, Phone, Link as LinkIcon, Target, Briefcase, ArrowRight, CheckCircle2, User, Compass } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
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
      <div className="min-h-screen flex items-center justify-center p-4 bg-[#0a0a0f] mesh-bg">
        <div className="bg-[#1C1A22] border border-white/5 p-10 rounded-3xl max-w-md w-full text-center flex flex-col items-center shadow-2xl">
          <div className="h-16 w-16 bg-brand-500/20 rounded-full flex items-center justify-center mb-6 ring-4 ring-brand-500/10">
            <CheckCircle2 className="h-8 w-8 text-brand-400" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2 tracking-tight">Welcome to CreatorNE</h2>
          <p className="text-slate-400 mb-8 text-sm">
            Your brand account is ready. Let's find the perfect creators for your next campaign.
          </p>
          <Link href="/brand/dashboard" className="w-full">
            <Button variant="primary" className="w-full">Go to Dashboard</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 md:p-8 bg-[#0a0a0f] mesh-bg relative overflow-hidden">
      
      {/* Subtle background ambient light */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
        <div className="w-[800px] h-[800px] bg-purple-900/10 rounded-full blur-[120px]" />
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.98, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-2xl relative z-10"
      >
        <div className="bg-[#141218] border border-white/5 rounded-3xl p-8 md:p-10 shadow-[0_20px_60px_rgba(0,0,0,0.5)] ring-1 ring-white/10 flex flex-col justify-between min-h-[600px] gap-8">
          
          {/* Header & Logo */}
          <div className="flex flex-col gap-4">
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

            <div className="mt-4">
              <h1 className="text-3xl font-bold text-white tracking-tight">Hire Top Creators</h1>
              <p className="text-sm text-slate-400 mt-2">
                Connect with authentic voices across North East India and launch impactful campaigns.
              </p>
            </div>

            {/* Progress Bar */}
            <div className="w-full mt-4">
              <div className="flex justify-between mb-2">
                {steps.map((s, i) => (
                  <span key={s} className={`text-xs font-medium ${step >= i + 1 ? "text-[var(--brand-400)]" : "text-slate-500"}`}>
                    {i + 1}. {s}
                  </span>
                ))}
              </div>
              <div className="h-1.5 w-full bg-[#1C1A22] rounded-full overflow-hidden border border-white/5">
                <motion.div
                  className="h-full bg-gradient-to-r from-brand-600 to-purple-500 rounded-full"
                  initial={{ width: "33%" }}
                  animate={{ width: `${(step / 3) * 100}%` }}
                  transition={{ duration: 0.4 }}
                />
              </div>
            </div>
          </div>

          {/* Form Area */}
          <div className="flex-1 flex flex-col justify-center">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="w-full"
            >
              <div className="bg-[#1C1A22] border border-white/5 rounded-2xl p-6 md:p-8 shadow-xl">
                <form onSubmit={nextStep} className="flex flex-col gap-6">
                  
                  {/* STEP 1: Company */}
                  {step === 1 && (
                    <div className="flex flex-col gap-5">
                      <Input name="brandName" value={formData.brandName} onChange={updateForm} label="Brand / Company Name" placeholder="e.g. Acme Corp" required leftIcon={<Building className="h-4 w-4 text-slate-400"/>} className="bg-[#141218] border-transparent focus:border-purple-500 h-12" />
                      <div className="grid md:grid-cols-2 gap-5">
                        <Input name="contactPerson" value={formData.contactPerson} onChange={updateForm} label="Contact Person" placeholder="e.g. Jane Doe" required leftIcon={<User className="h-4 w-4 text-slate-400"/>} className="bg-[#141218] border-transparent focus:border-purple-500 h-12" />
                        <Input name="industry" value={formData.industry} onChange={updateForm} label="Industry" placeholder="e.g. FMCG, Tech" required leftIcon={<Briefcase className="h-4 w-4 text-slate-400"/>} className="bg-[#141218] border-transparent focus:border-purple-500 h-12" />
                      </div>
                      <div className="grid md:grid-cols-2 gap-5">
                        <Input name="email" value={formData.email} onChange={updateForm} label="Email Address" type="email" placeholder="jane@acme.com" required leftIcon={<Mail className="h-4 w-4 text-slate-400"/>} className="bg-[#141218] border-transparent focus:border-purple-500 h-12" />
                        <Input name="phone" value={formData.phone} onChange={updateForm} label="Phone Number" type="tel" placeholder="+91" required leftIcon={<Phone className="h-4 w-4 text-slate-400"/>} className="bg-[#141218] border-transparent focus:border-purple-500 h-12" />
                      </div>
                      <Input name="website" value={formData.website} onChange={updateForm} label="Website URL (Optional)" type="url" placeholder="https://..." leftIcon={<LinkIcon className="h-4 w-4 text-slate-400"/>} className="bg-[#141218] border-transparent focus:border-purple-500 h-12" />
                    </div>
                  )}

                  {/* STEP 2: Campaign */}
                  {step === 2 && (
                    <div className="flex flex-col gap-5">
                      <Input name="goal" value={formData.goal} onChange={updateForm} label="Initial Campaign Goal" placeholder="e.g. Product Launch, Brand Awareness" required leftIcon={<Target className="h-4 w-4 text-slate-400"/>} className="bg-[#141218] border-transparent focus:border-purple-500 h-12" />
                      <div className="flex flex-col gap-1.5 w-full">
                        <label className="text-sm font-medium text-slate-400">Campaign Description</label>
                        <textarea
                          name="description"
                          value={formData.description}
                          onChange={updateForm}
                          className="w-full bg-[#141218] border border-transparent rounded-[var(--radius-md)] px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 resize-none h-24"
                          placeholder="Briefly describe what you are looking for..."
                          required
                        />
                      </div>
                      <div className="grid md:grid-cols-2 gap-5">
                        <Input name="budget" value={formData.budget} onChange={updateForm} label="Estimated Budget (₹)" placeholder="e.g. 50000" type="number" required className="bg-[#141218] border-transparent focus:border-purple-500 h-12" />
                        <Input name="targetState" value={formData.targetState} onChange={updateForm} label="Target State/City" placeholder="e.g. Assam, Meghalaya" required className="bg-[#141218] border-transparent focus:border-purple-500 h-12" />
                      </div>
                    </div>
                  )}

                  {/* STEP 3: Account */}
                  {step === 3 && (
                    <div className="flex flex-col gap-5">
                      <Input name="password" value={formData.password} onChange={updateForm} label="Set Password" type="password" placeholder="••••••••" required className="bg-[#141218] border-transparent focus:border-purple-500 h-12" />
                      <Input name="confirmPassword" value={formData.confirmPassword} onChange={updateForm} label="Confirm Password" type="password" placeholder="••••••••" required className="bg-[#141218] border-transparent focus:border-purple-500 h-12" />
                      <div className="p-4 bg-purple-500/10 border border-purple-500/20 rounded-xl">
                        <p className="text-xs text-purple-300 leading-relaxed">
                          By registering, you agree to our Brand Terms & Conditions. You will gain immediate access to search and filter our curated list of North East creators.
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Navigation */}
                  <div className="flex justify-between mt-4 pt-6 border-t border-slate-800">
                    {step > 1 ? (
                      <Button type="button" variant="ghost" className="text-slate-400 hover:text-white" onClick={() => setStep(step - 1)}>
                        Back
                      </Button>
                    ) : (
                      <div />
                    )}
                    <Button
                      type="submit"
                      className="bg-gradient-to-r from-[#9333ea] to-[#a855f7] hover:from-[#7e22ce] hover:to-[#9333ea] text-white font-medium rounded-lg px-6 h-12"
                      loading={loading}
                      icon={step === 3 ? undefined : <ArrowRight className="h-4 w-4" />}
                      iconPosition="right"
                    >
                      {step === 3 ? "Complete Registration" : "Continue"}
                    </Button>
                  </div>
                </form>
              </div>
            </motion.div>
          </div>

          {/* Footer */}
          <div className="text-center text-[10px] text-slate-600 border-t border-white/5 pt-4">
            <p>Powered by <span className="text-slate-500">CreatorNE</span></p>
            <p>© All rights reserved.</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

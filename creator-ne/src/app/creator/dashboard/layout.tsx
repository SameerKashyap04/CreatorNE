"use client";

import DashboardLayout from "@/components/layout/DashboardLayout";

export default function CreatorLayout({ children }: { children: React.ReactNode }) {
  return (
    <DashboardLayout headerTitle="Creator Dashboard" headerDescription="Monitor your analytics, collaborations, and earnings">
      {children}
    </DashboardLayout>
  );
}

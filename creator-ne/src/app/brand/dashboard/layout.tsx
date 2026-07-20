"use client";

import DashboardLayout from "@/components/layout/DashboardLayout";

export default function BrandLayout({ children }: { children: React.ReactNode }) {
  return (
    <DashboardLayout headerTitle="Brand Dashboard" headerDescription="Manage your campaigns, collaborations, and creators">
      {children}
    </DashboardLayout>
  );
}

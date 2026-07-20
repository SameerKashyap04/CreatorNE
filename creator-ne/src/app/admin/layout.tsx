"use client";

import DashboardLayout from "@/components/layout/DashboardLayout";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <DashboardLayout headerTitle="Admin Control Panel" headerDescription="Manage users, platform settings, and monitor activity">
      {children}
    </DashboardLayout>
  );
}


import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { ThemeProvider } from "@/components/ThemeProvider";
import { AuthProvider } from "@/contexts/AuthContext";
import { ToastProvider } from "@/contexts/ToastContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "CreatorNE — North East India's Creator Discovery Platform",
    template: "%s | CreatorNE",
  },
  description:
    "Discover and collaborate with 2,000+ verified creators from Assam, Meghalaya, Manipur, and all 8 North East India states. The #1 creator marketplace for brands and influencers.",
  keywords: [
    "creator discovery", "North East India influencers", "brand collaboration",
    "influencer marketing Assam", "NE India creators", "CreatorNE",
  ],
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://creatorne.in",
    siteName: "CreatorNE",
    title: "CreatorNE — North East India's Creator Discovery Platform",
    description: "Discover and collaborate with 2,000+ verified creators from North East India.",
  },
  twitter: {
    card: "summary_large_image",
    title: "CreatorNE — North East India's Creator Discovery Platform",
    description: "The #1 creator marketplace for brands and influencers in North East India.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] antialiased selection:bg-brand-500/30`}>
        <ThemeProvider>
          <ToastProvider>
            <AuthProvider>
              <Navbar />
              <main className="relative z-0">
                {children}
              </main>
            </AuthProvider>
          </ToastProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { FeaturedCreators } from "@/components/sections/FeaturedCreators";
import { CategoriesSection } from "@/components/sections/Categories";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Testimonials } from "@/components/sections/Testimonials";
import { CTASection } from "@/components/sections/CTA";

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <FeaturedCreators />
      <CategoriesSection />
      <HowItWorks />
      <Testimonials />
      <CTASection />
      <Footer />
    </main>
  );
}

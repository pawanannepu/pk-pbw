// 1. External imports
// (None)

// 2. Internal imports
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/homepage/Hero";
import { Features } from "@/components/homepage/Features";
import { Testimonials } from "@/components/homepage/Testimonials";
import { BottomCTA } from "@/components/homepage/BottomCTA";
import { getSessionUser } from "@/lib/insforge-server";

// 3. Type definitions
// (None)

// 4. Component
export default async function HomePage() {
  const user = await getSessionUser();
  const isAuthenticated = !!user;

  return (
    <div className="min-h-screen flex flex-col bg-background selection:bg-accent-light selection:text-accent">
      <Navbar isAuthenticated={isAuthenticated} />
      <main className="flex-1 w-full max-w-[1240px] mx-auto border-x border-border bg-surface shadow-xs">
        <Hero isAuthenticated={isAuthenticated} />
        <Features />
        <Testimonials />
        <BottomCTA isAuthenticated={isAuthenticated} />
      </main>
      <Footer />
    </div>
  );
}

// 1. External imports
import Image from "next/image";
import Link from "next/link";
import { Play } from "lucide-react";

// 2. Internal imports
// (None)

// 3. Type definitions
type HeroProps = {
  isAuthenticated?: boolean;
};

// 4. Component
export function Hero({ isAuthenticated = false }: HeroProps) {
  return (
    <section className="relative w-full bg-hero-glow pt-16 pb-20 overflow-hidden border-b border-border">
      <div className="w-full px-6 lg:px-8 text-center">
        {/* Main Headings */}
        <h1 className="text-4xl sm:text-5xl lg:text-[56px] font-bold text-text-primary tracking-tight leading-[1.12] max-w-3xl mx-auto">
          Job hunting is hard.
          <br />
          Your tools shouldn’t be.
        </h1>

        {/* Subtitle */}
        <p className="mt-5 text-base sm:text-lg text-text-secondary max-w-xl mx-auto leading-relaxed">
          Stop applying blind. JobPilot finds the jobs, researches the companies, and
          gives you everything you need to stand out.
        </p>

        {/* Action Buttons */}
        <div className="mt-8 flex items-center justify-center gap-4 flex-wrap">
          <Link
            href={isAuthenticated ? "/dashboard" : "/login"}
            className="inline-flex items-center gap-2 bg-text-darkest hover:bg-text-black text-white text-sm font-medium px-6 py-2.5 rounded-lg shadow-sm transition-all hover:scale-[1.02]"
          >
            <span>{isAuthenticated ? "Go to Dashboard" : "Get Started"}</span>
            <Play className="w-3.5 h-3.5 fill-current" />
          </Link>
          <Link
            href="/find-jobs"
            className="inline-flex items-center justify-center bg-surface hover:bg-surface-secondary text-text-primary border border-border text-sm font-medium px-6 py-2.5 rounded-lg shadow-sm transition-all hover:scale-[1.02]"
          >
            Find Your First Match
          </Link>
        </div>

        {/* Dashboard Preview Mockup */}
        <div className="mt-14 max-w-[1040px] mx-auto px-2 sm:px-4">
          <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-border bg-surface">
            <Image
              src="/images/dashboard-demo.png"
              alt="JobPilot AI Dashboard Interface"
              width={1200}
              height={675}
              priority
              className="w-full h-auto object-contain block"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

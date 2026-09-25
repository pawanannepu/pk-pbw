// 1. External imports
import Link from "next/link";
import { Play } from "lucide-react";

// 2. Internal imports
// (None)

// 3. Type definitions
type BottomCTAProps = {
  isAuthenticated?: boolean;
};

// 4. Component
export function BottomCTA({ isAuthenticated = false }: BottomCTAProps) {
  return (
    <div className="w-full">
      {/* Decorative Texture Divider */}
      <div className="w-full h-14 bg-diagonal-pattern border-b border-border" />

      {/* Main CTA Banner */}
      <section className="w-full bg-cta-glow py-20 lg:py-28 px-6 lg:px-8 text-center border-b border-border">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-bold text-text-primary tracking-tight leading-[1.15] max-w-2xl mx-auto">
            Your next job search can feel a
            <br />
            lot less overwhelming
          </h2>

          <p className="mt-5 text-sm sm:text-base text-text-secondary max-w-xl mx-auto leading-relaxed">
            Set up your profile, upload your resume, and start finding matches in minutes.
          </p>

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
        </div>
      </section>

      {/* Decorative Texture Divider */}
      <div className="w-full h-14 bg-diagonal-pattern" />
    </div>
  );
}

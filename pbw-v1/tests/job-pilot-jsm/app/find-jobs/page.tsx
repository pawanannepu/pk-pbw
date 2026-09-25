// 1. External imports
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Search, MapPin, Sparkles, Filter, Briefcase } from "lucide-react";

// 2. Internal imports
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SignOutButton } from "@/components/auth/SignOutButton";
import { getSessionUser } from "@/lib/insforge-server";

export const metadata: Metadata = {
  title: "Find Jobs — JobPilot",
  description: "Discover curated job postings matched to your experience with AI scoring.",
};

// 3. Type definitions
type FindJobsPageProps = Record<string, never>;

// 4. Component
export default async function FindJobsPage({}: FindJobsPageProps) {
  const user = await getSessionUser();

  if (!user) {
    redirect("/login?redirect=/find-jobs");
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar activePath="/find-jobs" isAuthenticated={true} />

      <main className="flex-1 w-full max-w-[1440px] mx-auto px-6 lg:px-8 py-8">
        {/* Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-border">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-accent-muted text-accent text-xs font-medium mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Phase 3 Foundation</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-text-primary">
              Find Jobs & Match Scoring
            </h1>
            <p className="mt-1 text-sm text-text-secondary">
              Discover real-time listings from Adzuna scored against your candidate profile.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <SignOutButton />
          </div>
        </div>

        {/* Search Controls Preview Card */}
        <div className="mt-8 bg-surface border border-border rounded-2xl p-6 sm:p-8 shadow-xs">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
            {/* Job Title Input Mock */}
            <div className="md:col-span-5">
              <label className="block text-xs font-semibold uppercase text-text-dark tracking-wider mb-2">
                Job Title
              </label>
              <div className="relative">
                <Search className="w-4 h-4 text-text-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  disabled
                  placeholder="e.g. Frontend Engineer, Full Stack..."
                  className="w-full h-11 pl-10 pr-4 rounded-lg border border-border bg-surface-secondary text-sm text-text-primary placeholder:text-text-muted cursor-not-allowed opacity-90"
                />
              </div>
            </div>

            {/* Location Input Mock */}
            <div className="md:col-span-4">
              <label className="block text-xs font-semibold uppercase text-text-dark tracking-wider mb-2">
                Location
              </label>
              <div className="relative">
                <MapPin className="w-4 h-4 text-text-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  disabled
                  placeholder="Remote, New York, London..."
                  className="w-full h-11 pl-10 pr-4 rounded-lg border border-border bg-surface-secondary text-sm text-text-primary placeholder:text-text-muted cursor-not-allowed opacity-90"
                />
              </div>
            </div>

            {/* Action Button Mock */}
            <div className="md:col-span-3 flex items-end">
              <button
                type="button"
                disabled
                className="w-full h-11 mt-auto px-4 inline-flex items-center justify-center gap-2 rounded-lg bg-accent text-accent-foreground text-sm font-medium shadow-sm opacity-90 cursor-not-allowed"
              >
                <Search className="w-4 h-4" />
                <span>Find Jobs (Phase 3)</span>
              </button>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-border flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs text-text-secondary">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              <span>Adzuna API and GPT-4o Scoring Engine will activate in Phase 3.</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="font-medium text-text-dark">Features:</span>
              <span>10 Adzuna Discovery</span>
              <span>•</span>
              <span>11 Filters & Sort</span>
            </div>
          </div>
        </div>

        {/* Planned Architecture Overview */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-surface border border-border rounded-2xl p-6 shadow-xs">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-9 h-9 rounded-lg bg-accent-light text-accent flex items-center justify-center">
                <Briefcase className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-semibold text-text-primary">
                Adzuna Real-Time Discovery
              </h3>
            </div>
            <p className="text-xs text-text-secondary leading-relaxed">
              Fetches verified live job listings across major tech hubs, normalized into InsForge database records with salary estimates and job descriptions.
            </p>
          </div>

          <div className="bg-surface border border-border rounded-2xl p-6 shadow-xs">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-9 h-9 rounded-lg bg-success-lightest text-success-foreground flex items-center justify-center">
                <Filter className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-semibold text-text-primary">
                AI Match Score & Filtering
              </h3>
            </div>
            <p className="text-xs text-text-secondary leading-relaxed">
              Every role is evaluated with GPT-4o against your candidate profile, calculating match scores (0-100%), matching skills, and missing skills.
            </p>
          </div>
        </div>

        {/* Quick Links */}
        <div className="mt-8 flex items-center gap-4">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 bg-text-darkest hover:bg-text-black text-white text-xs font-medium px-4 py-2.5 rounded-lg transition-colors shadow-xs"
          >
            ← Back to Dashboard
          </Link>
          <Link
            href="/profile"
            className="inline-flex items-center gap-2 bg-surface hover:bg-surface-secondary text-text-primary border border-border text-xs font-medium px-4 py-2.5 rounded-lg transition-colors shadow-xs"
          >
            View Candidate Profile →
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}

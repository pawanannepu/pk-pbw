// 1. External imports
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import Link from "next/link";
import { LayoutDashboard, UserCheck, Sparkles } from "lucide-react";

// 2. Internal imports
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SignOutButton } from "@/components/auth/SignOutButton";
import { getSessionUser } from "@/lib/insforge-server";

export const metadata: Metadata = {
  title: "Dashboard — JobPilot",
  description: "Manage your jobs, view matches, and research companies.",
};

// 3. Type definitions
type DashboardPageProps = Record<string, never>;

// 4. Component
export default async function DashboardPage({}: DashboardPageProps) {
  const user = await getSessionUser();

  if (!user) {
    redirect("/login?redirect=/dashboard");
  }

  const userDisplayName =
    (user as { name?: string; email?: string }).name ||
    (user as { name?: string; email?: string }).email ||
    "JobPilot Member";

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar activePath="/dashboard" isAuthenticated={true} />

      <main className="flex-1 w-full max-w-[1440px] mx-auto px-6 lg:px-8 py-8">
        {/* Welcome Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-border">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-accent-muted text-accent text-xs font-medium mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Session Authenticated</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-text-primary">
              Welcome back, {userDisplayName}
            </h1>
            <p className="mt-1 text-sm text-text-secondary">
              Logged in with InsForge Auth. Your AI-assisted career workspace is ready.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <SignOutButton />
          </div>
        </div>

        {/* Foundation Notice Card */}
        <div className="mt-8 bg-surface border border-border rounded-2xl p-6 sm:p-8 shadow-xs">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-accent-light text-accent flex items-center justify-center shrink-0">
              <LayoutDashboard className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <h2 className="text-base font-semibold text-text-primary">
                Phase 1 Foundation Complete
              </h2>
              <p className="mt-1 text-sm text-text-secondary leading-relaxed">
                Authentication, session token management, and route security are operational.
                The full analytical dashboard (Features 14–17) will be connected with real Adzuna and PostHog metrics in Phase 5.
              </p>

              <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl border border-border bg-surface-secondary">
                  <div className="text-xs text-text-secondary font-medium">Jobs Found</div>
                  <div className="mt-2 text-2xl font-bold text-text-primary">0</div>
                  <div className="mt-1 text-xs text-text-muted">Awaiting Phase 3 (Find Jobs)</div>
                </div>
                <div className="p-4 rounded-xl border border-border bg-surface-secondary">
                  <div className="text-xs text-text-secondary font-medium">Avg. Match Rate</div>
                  <div className="mt-2 text-2xl font-bold text-text-primary">--%</div>
                  <div className="mt-1 text-xs text-text-muted">Awaiting Profile Setup</div>
                </div>
                <div className="p-4 rounded-xl border border-border bg-surface-secondary">
                  <div className="text-xs text-text-secondary font-medium">Companies Researched</div>
                  <div className="mt-2 text-2xl font-bold text-text-primary">0</div>
                  <div className="mt-1 text-xs text-text-muted">Awaiting Phase 4</div>
                </div>
              </div>

              <div className="mt-6 flex items-center gap-4 flex-wrap">
                <Link
                  href="/profile"
                  className="inline-flex items-center gap-2 bg-text-darkest hover:bg-text-black text-white text-xs font-medium px-4 py-2 rounded-lg transition-colors shadow-xs"
                >
                  <UserCheck className="w-3.5 h-3.5" />
                  <span>Next: Configure Profile (Phase 2)</span>
                </Link>
                <Link
                  href="/"
                  className="inline-flex items-center gap-2 bg-surface hover:bg-surface-secondary text-text-primary border border-border text-xs font-medium px-4 py-2 rounded-lg transition-colors shadow-xs"
                >
                  <span>Return to Homepage</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

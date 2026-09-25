// 1. External imports
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import Link from "next/link";
import { FileText, Briefcase, GraduationCap, Sparkles, CheckCircle2 } from "lucide-react";

// 2. Internal imports
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SignOutButton } from "@/components/auth/SignOutButton";
import { getSessionUser } from "@/lib/insforge-server";

export const metadata: Metadata = {
  title: "Profile — JobPilot",
  description: "Configure your career profile, upload resumes, and set job search preferences.",
};

// 3. Type definitions
type ProfilePageProps = Record<string, never>;

// 4. Component
export default async function ProfilePage({}: ProfilePageProps) {
  const user = await getSessionUser();

  if (!user) {
    redirect("/login?redirect=/profile");
  }

  const userDisplayName =
    (user as { name?: string; email?: string }).name ||
    (user as { name?: string; email?: string }).email ||
    "JobPilot Member";

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar activePath="/profile" isAuthenticated={true} />

      <main className="flex-1 w-full max-w-[1440px] mx-auto px-6 lg:px-8 py-8">
        {/* Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-border">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-accent-muted text-accent text-xs font-medium mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Phase 2 Foundation</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-text-primary">
              Candidate Profile
            </h1>
            <p className="mt-1 text-sm text-text-secondary">
              Managing career credentials for <span className="font-medium text-text-primary">{userDisplayName}</span>
            </p>
          </div>

          <div className="flex items-center gap-3">
            <SignOutButton />
          </div>
        </div>

        {/* Attention & Status Banner */}
        <div className="mt-8 bg-surface border border-border rounded-2xl p-6 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full border-4 border-accent-light flex items-center justify-center text-accent font-bold text-sm">
              0%
            </div>
            <div>
              <div className="text-sm font-semibold text-text-primary">
                Profile Needs Attention
              </div>
              <div className="text-xs text-text-secondary mt-0.5">
                Complete your details to unlock Adzuna AI job matching (Phase 2 & 3).
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[11px] font-medium bg-red-50 text-error px-2.5 py-1 rounded-full border border-red-200">
              RESUME REQUIRED
            </span>
            <span className="text-[11px] font-medium bg-surface-secondary text-text-secondary px-2.5 py-1 rounded-full border border-border">
              WORK HISTORY
            </span>
            <span className="text-[11px] font-medium bg-surface-secondary text-text-secondary px-2.5 py-1 rounded-full border border-border">
              SKILLS
            </span>
          </div>
        </div>

        {/* Profile Architecture Modules Preview */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Module 1: Resume Upload & AI Parsing */}
          <div className="bg-surface border border-border rounded-2xl p-6 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-accent-light text-accent flex items-center justify-center mb-4">
              <FileText className="w-5 h-5" />
            </div>
            <h3 className="text-base font-semibold text-text-primary">Resume Management</h3>
            <p className="mt-1 text-xs text-text-secondary leading-relaxed">
              Drag-and-drop PDF upload with GPT-4o auto-fill and professional PDF generation via @react-pdf/renderer.
            </p>
            <div className="mt-4 pt-4 border-t border-border flex items-center text-xs text-accent font-medium">
              <CheckCircle2 className="w-3.5 h-3.5 mr-1.5" />
              <span>Features 07 & 08 (Phase 2)</span>
            </div>
          </div>

          {/* Module 2: Professional & Work Experience */}
          <div className="bg-surface border border-border rounded-2xl p-6 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-info-light text-info-dark flex items-center justify-center mb-4">
              <Briefcase className="w-5 h-5" />
            </div>
            <h3 className="text-base font-semibold text-text-primary">Work Experience</h3>
            <p className="mt-1 text-xs text-text-secondary leading-relaxed">
              Up to 3 verified professional roles, responsibilities, and skill tags matched against job market demands.
            </p>
            <div className="mt-4 pt-4 border-t border-border flex items-center text-xs text-info-dark font-medium">
              <CheckCircle2 className="w-3.5 h-3.5 mr-1.5" />
              <span>Features 05 & 06 (Phase 2)</span>
            </div>
          </div>

          {/* Module 3: Education & Job Preferences */}
          <div className="bg-surface border border-border rounded-2xl p-6 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-success-lightest text-success-foreground flex items-center justify-center mb-4">
              <GraduationCap className="w-5 h-5" />
            </div>
            <h3 className="text-base font-semibold text-text-primary">Education & Preferences</h3>
            <p className="mt-1 text-xs text-text-secondary leading-relaxed">
              Degrees, target roles, remote preferences, salary ranges, and custom cover letter tone settings.
            </p>
            <div className="mt-4 pt-4 border-t border-border flex items-center text-xs text-success-foreground font-medium">
              <CheckCircle2 className="w-3.5 h-3.5 mr-1.5" />
              <span>Features 05 & 06 (Phase 2)</span>
            </div>
          </div>
        </div>

        {/* Quick Navigation Footer */}
        <div className="mt-8 flex items-center gap-4">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 bg-text-darkest hover:bg-text-black text-white text-xs font-medium px-4 py-2.5 rounded-lg transition-colors shadow-xs"
          >
            ← Back to Dashboard
          </Link>
          <Link
            href="/find-jobs"
            className="inline-flex items-center gap-2 bg-surface hover:bg-surface-secondary text-text-primary border border-border text-xs font-medium px-4 py-2.5 rounded-lg transition-colors shadow-xs"
          >
            Go to Find Jobs →
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}

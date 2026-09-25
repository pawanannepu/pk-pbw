// 1. External imports
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

// 2. Internal imports
import { OAuthButtons } from "@/components/auth/OAuthButtons";

export const metadata: Metadata = {
  title: "Sign In — JobPilot",
  description: "Sign in to JobPilot to access your AI job search assistant.",
};

// 3. Type definitions
type LoginPageProps = {
  searchParams: Promise<{ error?: string; redirect?: string }>;
};

const errorMessages: Record<string, string> = {
  oauth_failed: "Authentication was cancelled or failed with the provider. Please try again.",
  missing_verifier: "Security verification code expired. Please initiate login again.",
  exchange_failed: "Could not establish session. Please try logging in again.",
};

// 4. Component
export default async function LoginPage({ searchParams }: LoginPageProps) {
  const { error } = await searchParams;
  const displayError = error ? errorMessages[error] || "An unexpected login error occurred." : null;

  return (
    <div className="min-h-screen flex flex-col justify-between bg-hero-glow p-4 sm:p-6">
      {/* Top Bar / Logo Link */}
      <div className="w-full max-w-[1440px] mx-auto flex items-center justify-between">
        <Link
          href="/"
          className="inline-flex items-center gap-2 transition-opacity hover:opacity-85"
        >
          <Image
            src="/logo.png"
            alt="JobPilot"
            width={95}
            height={32}
            priority
          />
        </Link>
        <Link
          href="/"
          className="text-xs font-medium text-text-secondary hover:text-text-primary transition-colors"
        >
          ← Back to home
        </Link>
      </div>

      {/* Main Login Card */}
      <div className="w-full max-w-[420px] mx-auto my-auto">
        <div className="bg-surface border border-border rounded-2xl p-8 sm:p-10 shadow-lg text-center">
          {/* Header */}
          <div className="flex flex-col items-center">
            <h1 className="text-2xl font-bold tracking-tight text-text-primary">
              Welcome to JobPilot
            </h1>
            <p className="mt-2 text-sm text-text-secondary leading-relaxed max-w-[320px]">
              Sign in to manage your applications, research companies, and track your job matches.
            </p>
          </div>

          {/* Error Banner */}
          {displayError && (
            <div className="mt-6 p-3 rounded-lg bg-red-50 border border-red-200 text-error text-xs font-medium text-left">
              {displayError}
            </div>
          )}

          {/* Social Auth Providers */}
          <div className="mt-8">
            <OAuthButtons />
          </div>

          {/* Security Assurance */}
          <div className="mt-6 pt-6 border-t border-border flex items-center justify-center gap-2 text-text-muted text-xs">
            <svg
              className="w-3.5 h-3.5 text-success"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
              />
            </svg>
            <span>Encrypted OAuth 2.0 PKCE Session</span>
          </div>
        </div>

        {/* Legal Disclaimer */}
        <p className="mt-6 text-center text-xs text-text-muted leading-relaxed px-4">
          By signing in, you agree to our{" "}
          <Link href="/terms" className="underline hover:text-text-primary">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link href="/privacy" className="underline hover:text-text-primary">
            Privacy Policy
          </Link>
          .
        </p>
      </div>

      {/* Footer copyright placeholder */}
      <div className="text-center text-xs text-text-muted py-4">
        © {new Date().getFullYear()} JobPilot. All rights reserved.
      </div>
    </div>
  );
}

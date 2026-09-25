// 1. External imports
import Image from "next/image";
import Link from "next/link";

// 2. Internal imports
// (None)

// 3. Type definitions
type FooterProps = Record<string, never>;

// 4. Component
export function Footer({}: FooterProps) {
  return (
    <footer className="w-full bg-surface border-t border-border mt-auto">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-8 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-2.5 transition-opacity hover:opacity-90">
          <Image
            src="/logo.png"
            alt="JobPilot"
            width={83}
            height={28}
          />
        </Link>

        {/* Footer Navigation */}
        <div className="flex items-center gap-8">
          <Link
            href="/dashboard"
            className="text-xs font-medium text-text-secondary hover:text-text-primary transition-colors"
          >
            Dashboard
          </Link>
          <Link
            href="/privacy"
            className="text-xs font-medium text-text-secondary hover:text-text-primary transition-colors"
          >
            Privacy Policy
          </Link>
          <Link
            href="/terms"
            className="text-xs font-medium text-text-secondary hover:text-text-primary transition-colors"
          >
            Terms & Condition
          </Link>
        </div>
      </div>
    </footer>
  );
}

// 1. External imports
import Image from "next/image";
import Link from "next/link";

// 2. Internal imports
// (None)

// 3. Type definitions
type NavbarProps = {
  activePath?: string;
  isAuthenticated?: boolean;
};

// 4. Component
export function Navbar({ activePath, isAuthenticated = false }: NavbarProps) {
  return (
    <header className="sticky top-0 z-50 w-full bg-surface border-b border-border">
      <div className="max-w-[1440px] mx-auto h-16 px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 transition-opacity hover:opacity-90">
          <Image
            src="/logo.png"
            alt="JobPilot"
            width={95}
            height={32}
            priority
          />
        </Link>

        {/* Navigation Items */}
        <nav className="hidden md:flex items-center gap-8">
          <Link
            href="/dashboard"
            className={`text-sm font-medium transition-colors ${
              activePath === "/dashboard"
                ? "text-accent"
                : "text-text-dark hover:text-accent"
            }`}
          >
            Dashboard
          </Link>
          <Link
            href="/find-jobs"
            className={`text-sm font-medium transition-colors ${
              activePath === "/find-jobs"
                ? "text-accent"
                : "text-text-dark hover:text-accent"
            }`}
          >
            Find Jobs
          </Link>
          <Link
            href="/profile"
            className={`text-sm font-medium transition-colors ${
              activePath === "/profile"
                ? "text-accent"
                : "text-text-dark hover:text-accent"
            }`}
          >
            Profile
          </Link>
        </nav>

        {/* Right CTA */}
        <div className="flex items-center gap-4">
          <Link
            href={isAuthenticated ? "/dashboard" : "/login"}
            className="inline-flex items-center justify-center bg-text-darkest hover:bg-text-black text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors shadow-sm"
          >
            {isAuthenticated ? "Dashboard" : "Start for free"}
          </Link>
        </div>
      </div>
    </header>
  );
}

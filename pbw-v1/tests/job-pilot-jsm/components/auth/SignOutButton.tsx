"use client";

// 1. External imports
import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { LogOut, Loader2 } from "lucide-react";
import posthog from "posthog-js";

// 2. Internal imports
import { signOutAction } from "@/actions/auth";

// 3. Type definitions
type SignOutButtonProps = Record<string, never>;

// 4. Component
export function SignOutButton({}: SignOutButtonProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleSignOut = () => {
    startTransition(async () => {
      try {
        const result = await signOutAction();
        if (!result.success) return;

        posthog.capture("user_signed_out");
        posthog.reset();
        router.push("/login");
        router.refresh();
      } catch (error) {
        posthog.captureException(error);
        console.error("[SignOutButton] Sign out failed:", error);
      }
    });
  };

  return (
    <button
      onClick={handleSignOut}
      disabled={isPending}
      type="button"
      className="inline-flex items-center gap-2 text-xs font-medium text-text-secondary hover:text-error transition-colors px-3 py-1.5 rounded-lg border border-border bg-surface hover:bg-surface-secondary shadow-xs disabled:opacity-60 cursor-pointer"
    >
      {isPending ? (
        <Loader2 className="w-3.5 h-3.5 animate-spin" />
      ) : (
        <LogOut className="w-3.5 h-3.5" />
      )}
      <span>{isPending ? "Signing out..." : "Sign Out"}</span>
    </button>
  );
}

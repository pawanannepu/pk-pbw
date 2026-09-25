"use server";

import { cookies } from "next/headers";
import { createAuthActions } from "@insforge/sdk/ssr";
import { SeverityNumber } from "@opentelemetry/api-logs";
import { getPostHogClient } from "@/lib/posthog-server";
import { posthogLogger, posthogLoggerProvider } from "@/instrumentation";

async function captureOAuthEvent(
  distinctId: string,
  event: "oauth_sign_in_initiated" | "oauth_sign_in_failed",
  properties: Record<string, string>,
  error?: unknown,
) {
  try {
    const posthog = getPostHogClient();
    if (!posthog) return;

    posthog.capture({ distinctId, event, properties });
    if (error) posthog.captureException(error, distinctId);
    posthogLogger?.emit({
      body: "OAuth authorization request completed",
      severityNumber:
        event === "oauth_sign_in_failed" ? SeverityNumber.ERROR : SeverityNumber.INFO,
      attributes: {
        event: "oauth.authorization",
        status: event === "oauth_sign_in_failed" ? "failed" : "success",
        provider: properties.provider,
        failure_stage: properties.failure_stage,
        posthogDistinctId: distinctId,
        sessionId: properties.$session_id,
      },
    });
    await Promise.all([
      posthog.flush(),
      posthogLoggerProvider?.forceFlush() ?? Promise.resolve(),
    ]);
  } catch (analyticsError) {
    console.error("[actions/auth] PostHog capture failed:", analyticsError);
  }
}

export async function initiateOAuth(
  provider: "google" | "github",
  distinctId: string,
  sessionId: string,
): Promise<{
  success: boolean;
  url?: string;
  error?: string;
}> {
  try {
    const cookieStore = await cookies();
    const auth = createAuthActions({ cookies: cookieStore });

    const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
    const redirectTo = new URL("/api/auth/callback", appUrl).toString();

    const { data, error } = await auth.signInWithOAuth(provider, {
      redirectTo,
      skipBrowserRedirect: true,
    });

    if (error || !data?.url || !data?.codeVerifier) {
      console.error("[actions/auth] OAuth initiation failed:", error);
      await captureOAuthEvent(
        distinctId,
        "oauth_sign_in_failed",
        { provider, failure_stage: "initiation", $session_id: sessionId },
        error,
      );
      return {
        success: false,
        error: error?.message || "OAuth initialization failed",
      };
    }

    cookieStore.set("insforge_code_verifier", data.codeVerifier, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 600,
    });

    await captureOAuthEvent(distinctId, "oauth_sign_in_initiated", {
      provider,
      $session_id: sessionId,
    });

    return {
      success: true,
      url: data.url,
    };
  } catch (err) {
    console.error("[actions/auth] Unexpected error during OAuth initiate:", err);
    await captureOAuthEvent(
      distinctId,
      "oauth_sign_in_failed",
      { provider, failure_stage: "initiation", $session_id: sessionId },
      err,
    );
    return { success: false, error: "Failed to initiate login" };
  }
}

export async function signOutAction() {
  try {
    const cookieStore = await cookies();
    const auth = createAuthActions({ cookies: cookieStore });
    await auth.signOut();
    return { success: true };
  } catch (err) {
    console.error("[actions/auth] Sign out failed:", err);
    return { success: false, error: "Sign out failed" };
  }
}

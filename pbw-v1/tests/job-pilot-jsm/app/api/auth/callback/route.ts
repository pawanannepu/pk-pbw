import { cookies } from "next/headers";
import { NextResponse, type NextRequest } from "next/server";
import { createAuthActions } from "@insforge/sdk/ssr";
import { SeverityNumber } from "@opentelemetry/api-logs";
import { getPostHogClient } from "@/lib/posthog-server";
import { posthogLogger, posthogLoggerProvider } from "@/instrumentation";

async function captureCallbackFailure(distinctId: string, failureStage: string, error?: unknown) {
  try {
    const posthog = getPostHogClient();
    if (!posthog) return;

    posthog.capture({
      distinctId,
      event: "oauth_sign_in_failed",
      properties: { failure_stage: failureStage },
    });
    if (error) posthog.captureException(error, distinctId);
    posthogLogger?.emit({
      body: "OAuth callback completed",
      severityNumber: SeverityNumber.ERROR,
      attributes: {
        event: "oauth.callback",
        status: "failed",
        failure_stage: failureStage,
        posthogDistinctId: distinctId,
      },
    });
    await Promise.all([
      posthog.flush(),
      posthogLoggerProvider?.forceFlush() ?? Promise.resolve(),
    ]);
  } catch (analyticsError) {
    console.error("[auth/callback] PostHog capture failed:", analyticsError);
  }
}

export async function GET(request: NextRequest) {
  const callbackDistinctId = crypto.randomUUID();
  const code = request.nextUrl.searchParams.get("insforge_code");
  const oauthError = request.nextUrl.searchParams.get("error");

  if (oauthError || !code) {
    if (oauthError) {
      console.warn("[auth/callback] OAuth callback failed:", oauthError);
    }
    await captureCallbackFailure(callbackDistinctId, "callback_provider");
    return NextResponse.redirect(
      new URL("/login?error=oauth_failed", request.url)
    );
  }

  const cookieStore = await cookies();
  const codeVerifier = cookieStore.get("insforge_code_verifier")?.value;
  if (!codeVerifier) {
    await captureCallbackFailure(callbackDistinctId, "missing_verifier");
    return NextResponse.redirect(
      new URL("/login?error=missing_verifier", request.url)
    );
  }

  const response = NextResponse.redirect(new URL("/dashboard", request.url));
  const auth = createAuthActions({
    requestCookies: request.cookies,
    responseCookies: response.cookies,
  });

  const { data, error } = await auth.exchangeOAuthCode(code, codeVerifier);
  if (error || !data?.user) {
    if (error) {
      console.error("[auth/callback] OAuth code exchange failed:", error);
    }
    await captureCallbackFailure(callbackDistinctId, "code_exchange", error);
    return NextResponse.redirect(
      new URL("/login?error=exchange_failed", request.url)
    );
  }

  response.cookies.delete("insforge_code_verifier");

  try {
    const posthog = getPostHogClient();
    if (posthog) {
      const user = data.user as { id: string; email?: string; name?: string };
      posthog.identify({
        distinctId: user.id,
        properties: { email: user.email, name: user.name },
      });
      posthog.capture({
        distinctId: user.id,
        event: "user_signed_in",
        properties: { source: "oauth_callback" },
      });
      posthogLogger?.emit({
        body: "OAuth callback completed",
        severityNumber: SeverityNumber.INFO,
        attributes: {
          event: "oauth.callback",
          status: "success",
          posthogDistinctId: user.id,
        },
      });
      await Promise.all([
        posthog.flush(),
        posthogLoggerProvider?.forceFlush() ?? Promise.resolve(),
      ]);
    }
  } catch (analyticsError) {
    console.error("[auth/callback] PostHog capture failed:", analyticsError);
  }

  return response;
}

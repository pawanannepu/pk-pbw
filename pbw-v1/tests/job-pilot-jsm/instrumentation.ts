import { logs } from "@opentelemetry/api-logs";
import { OTLPLogExporter } from "@opentelemetry/exporter-logs-otlp-http";
import { resourceFromAttributes } from "@opentelemetry/resources";
import { BatchLogRecordProcessor, LoggerProvider } from "@opentelemetry/sdk-logs";

const posthogToken = process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN;
const posthogHost = process.env.NEXT_PUBLIC_POSTHOG_HOST;

if ((!posthogToken || !posthogHost) && process.env.NODE_ENV !== "production") {
  const missingVariable = !posthogToken
    ? "NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN"
    : "NEXT_PUBLIC_POSTHOG_HOST";

  throw new Error(
    `${missingVariable} variable required by PostHog is missing or un-configured, this causes events to be silently missed. This error stops appearing once ${missingVariable} is configured`,
  );
}

export const posthogLoggerProvider =
  posthogToken && posthogHost
    ? new LoggerProvider({
        resource: resourceFromAttributes({
          "service.name": "job-pilot-jsm",
          "deployment.environment": process.env.NODE_ENV ?? "unknown",
        }),
        processors: [
          new BatchLogRecordProcessor({
            exporter: new OTLPLogExporter({
              url: `${posthogHost}/i/v1/logs`,
              headers: {
                Authorization: `Bearer ${posthogToken}`,
                "Content-Type": "application/json",
              },
            }),
          }),
        ],
      })
    : null;

export const posthogLogger = posthogLoggerProvider?.getLogger("job-pilot-auth") ?? null;

export function register() {
  if (process.env.NEXT_RUNTIME === "nodejs" && posthogLoggerProvider) {
    logs.setGlobalLoggerProvider(posthogLoggerProvider);
  }
}

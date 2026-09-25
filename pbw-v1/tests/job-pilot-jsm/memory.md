# Memory — Feature 02 Auth & Core Foundation Routes

Last updated: 2026-09-25 13:36 IST

## What was built

- **Auth Server Actions & Route Handlers**:
  - `actions/auth.ts`: Server Actions `initiateOAuth(provider)` and `signOutAction()`. Generates PKCE verifier, saves `insforge_code_verifier` httpOnly cookie, and returns `{ success: true, url }`.
  - `app/api/auth/callback/route.ts`: PKCE callback handler exchanging `insforge_code` for session cookies (`insforge_access_token` and httpOnly `insforge_refresh_token`), deleting verifier, and redirecting to `/dashboard`.
  - `app/api/auth/refresh/route.ts`: Automated token refresh endpoint using `createRefreshAuthRouter()` from `@insforge/sdk/ssr`.
  - `app/(auth)/callback/page.tsx`: Compatibility route redirecting queries to `/api/auth/callback`.
- **Auth UI Components**:
  - `app/(auth)/login/page.tsx`: Dedicated login page with JobPilot branding, error alert handling, and security indicators.
  - `components/auth/OAuthButtons.tsx`: Interactive Google and GitHub login buttons with transition loading spinners and native browser redirect.
  - `components/auth/SignOutButton.tsx`: Client-side sign out button with loading state and router navigation.
- **Route Protection & Next.js 16 Session Proxy**:
  - `proxy.ts`: Next.js 16 App Router proxy using `updateSession()` from `@insforge/sdk/ssr/middleware`. Guards `/dashboard`, `/profile`, and `/find-jobs` (redirecting unauthenticated users to `/login?redirect=...`), and redirects `/find-job` to canonical `/find-jobs`.
- **Foundation Page Views**:
  - `app/dashboard/page.tsx`: Authenticated dashboard foundation page validating session with `getSessionUser()`, showing user greeting, milestone badges, and navigation.
  - `app/profile/page.tsx`: Authenticated candidate profile foundation page previewing Phase 2 features (Resume Upload, Work History, Education, Preferences).
  - `app/find-jobs/page.tsx`: Authenticated job discovery foundation page previewing Phase 3 search controls, Adzuna discovery, and GPT-4o scoring.
- **Session Integration**:
  - `lib/insforge-server.ts`: Added `getSessionUser()` helper for safe Server Component session checks.
  - `Navbar.tsx`, `Hero.tsx`, `BottomCTA.tsx`, and `app/page.tsx`: Updated with session awareness (routes to `/dashboard` when authenticated, `/login` when unauthenticated).
- **Documentation**:
  - `context/ui-registry.md`: Imprinted `LoginCard`, `OAuthButtons`, `SignOutButton`, and foundation views.
  - `context/progress-tracker.md`: Marked `02 Auth` complete.

## Decisions made

- **Next.js 16 Proxy Architecture**: Used `proxy.ts` (Next.js 16 convention replacing deprecated `middleware.ts`) paired with `@insforge/sdk/ssr/middleware` to keep auth cookies synchronized without bundling the full client.
- **Client-Driven OAuth Navigation**: `initiateOAuth` returns `{ success: true, url: data.url }` instead of calling `redirect(data.url)` inside a client-side transition, allowing `window.location.href` to navigate directly to Google/GitHub.
- **Foundation Routes First (Option A)**: Established foundation views for `/dashboard`, `/profile`, and `/find-jobs` to ensure zero 404s across all navigation links while keeping to the phased roadmap.
- **Route Canonicalization**: Plural `/find-jobs` is the canonical route; `/find-job` redirects automatically via `proxy.ts`.

## Problems solved

- **Turbopack RSC Stream Mismatch**: Resolved runtime error *"An unexpected response was received from the server at LoginPage"* by switching from a Server Action `redirect()` to returning the provider URL for full-page client redirection.
- **Navigation 404s**: Fixed 404 errors on `/dashboard`, `/profile`, and `/find-jobs` by creating corresponding page components with session validation.
- **Environment Configuration**: Corrected `NEXT_PUBLIC_INSFORGE_URL` in `.env.local` to point to the project `oss_host` URL instead of the API key string.

## Current state

- **Phase 1 Status**:
  - [x] 01 Homepage
  - [x] 02 Auth
  - [ ] 03 PostHog Initialization
  - [ ] 04 Database Schema
- All primary navigation routes (`/`, `/dashboard`, `/find-jobs`, `/profile`, `/login`) are operational.
- Typecheck (`tsc --noEmit`) and linter (`eslint`) pass with 0 errors and 0 warnings.

## Next session starts with

- **Feature 03 PostHog Initialization**:
  - Check PostHog CLI wizard setup (`npx -y @posthog/wizard@latest self-driving` was initiated in terminal).
  - Create `lib/posthog-client.ts` with `NEXT_PUBLIC_POSTHOG_KEY` and `NEXT_PUBLIC_POSTHOG_HOST`.
  - Create `lib/posthog-server.ts` with `flushAt: 1` and `flushInterval: 0`.
  - Wrap root layout `app/layout.tsx` with PostHog provider.
  - Call `posthog.identify()` on login and `posthog.reset()` on logout.

## Open questions

- Confirm PostHog project keys in `.env.local` once wizard/setup completes.

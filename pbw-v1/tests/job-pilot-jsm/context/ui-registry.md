# UI Registry

Living document. Updated after every component is built. Read this before building any new component — match existing patterns exactly before inventing new ones.

---

## How to Use

Before building any component:

1. Check if a similar component already exists here
2. If yes — match its exact classes
3. If no — build it following ui-rules.md and ui-tokens.md, then add it here

After building any component — update this file with the component name, file path, and exact classes used.

---

## Components

### Navbar

File: `components/layout/Navbar.tsx`
Last updated: 2026-09-24

| Property         | Class                                      |
| ---------------- | ------------------------------------------ |
| Background       | `bg-surface`                               |
| Border           | `border-b border-border`                   |
| Border radius    | `rounded-lg` (button)                      |
| Text — primary   | `text-text-primary`, `text-text-dark`      |
| Text — secondary | `text-text-secondary`                     |
| Spacing          | `h-16 px-6 lg:px-8 gap-8`                  |
| Hover state      | `hover:text-accent`, `hover:bg-text-black` |
| Shadow           | `shadow-sm`                                |
| Accent usage     | `text-accent` (active nav state)           |

**Pattern notes:**
Full-width top navigation bar with 1440px max-width container. Navigation links use `text-text-dark` with `hover:text-accent` and active state `text-accent`.

### Footer

File: `components/layout/Footer.tsx`
Last updated: 2026-09-24

| Property         | Class                                   |
| ---------------- | --------------------------------------- |
| Background       | `bg-surface`                            |
| Border           | `border-t border-border`                |
| Border radius    | none                                    |
| Text — primary   | `text-text-primary`                     |
| Text — secondary | `text-text-secondary`                   |
| Spacing          | `py-8 px-6 lg:px-8 gap-8`               |
| Hover state      | `hover:text-text-primary`               |
| Shadow           | none                                    |
| Accent usage     | none                                    |

**Pattern notes:**
Full-width footer with 1440px max-width container, small `text-xs` secondary links that highlight on hover.

### Hero

File: `components/homepage/Hero.tsx`
Last updated: 2026-09-24

| Property         | Class                                              |
| ---------------- | -------------------------------------------------- |
| Background       | `bg-hero-glow`                                     |
| Border           | `border-b border-border`                           |
| Border radius    | `rounded-lg` (buttons), `rounded-2xl` (mockup)     |
| Text — primary   | `text-text-primary`                                |
| Text — secondary | `text-text-secondary`                              |
| Spacing          | `pt-16 pb-20 px-6 lg:px-8 gap-4`                   |
| Hover state      | `hover:bg-text-black`, `hover:bg-surface-secondary`|
| Shadow           | `shadow-sm` (buttons), `shadow-2xl` (mockup)       |
| Accent usage     | Atmospheric glow background                        |

**Pattern notes:**
Atmospheric radial gradient glow with responsive display typography (56px) and high-elevation dashboard preview frame.

### Features

File: `components/homepage/Features.tsx`
Last updated: 2026-09-24

| Property         | Class                                                         |
| ---------------- | ------------------------------------------------------------- |
| Background       | `bg-surface`, `bg-diagonal-pattern`, `bg-surface-secondary/40`|
| Border           | `border-b border-border`, `divide-y divide-border`            |
| Border radius    | `rounded-xl`, `rounded-2xl` (graphic frames)                  |
| Text — primary   | `text-text-primary`                                           |
| Text — secondary | `text-text-secondary`                                         |
| Spacing          | `p-8 lg:p-12 xl:p-14`                                         |
| Hover state      | none                                                          |
| Shadow           | `shadow-md`, `shadow-xl`                                      |
| Accent usage     | `border-l-[3px] border-l-accent` (active feature)             |

**Pattern notes:**
Two-column feature comparison grid with tactile diagonal texture panels, left accent indicator for featured value proposition, and clean dividers.

### Testimonials

File: `components/homepage/Testimonials.tsx`
Last updated: 2026-09-24

| Property         | Class                        |
| ---------------- | ---------------------------- |
| Background       | `bg-surface`                 |
| Border           | `border-b border-border`     |
| Border radius    | `rounded-lg` (avatar)        |
| Text — primary   | `text-text-primary`          |
| Text — secondary | `text-text-secondary`        |
| Spacing          | `py-20 lg:py-28 px-6 lg:px-8`|
| Hover state      | none                         |
| Shadow           | `shadow-xs`                  |
| Accent usage     | `text-accent` (section tag)  |

**Pattern notes:**
Centered testimonial card with uppercase tracking-widest accent category tag and avatar display.

### BottomCTA

File: `components/homepage/BottomCTA.tsx`
Last updated: 2026-09-24

| Property         | Class                                              |
| ---------------- | -------------------------------------------------- |
| Background       | `bg-cta-glow`, `bg-diagonal-pattern`               |
| Border           | `border-b border-border`                           |
| Border radius    | `rounded-lg` (buttons)                             |
| Text — primary   | `text-text-primary`                                |
| Text — secondary | `text-text-secondary`                              |
| Spacing          | `py-20 lg:py-28 px-6 lg:px-8 gap-4`                |
| Hover state      | `hover:bg-text-black`, `hover:bg-surface-secondary`|
| Shadow           | `shadow-sm`                                        |
| Accent usage     | Atmospheric glow background                        |

**Pattern notes:**
Full-bleed conversion section wrapped between decorative diagonal hatched dividers.

### LoginCard

File: `app/(auth)/login/page.tsx`
Last updated: 2026-09-25

| Property         | Class                                 |
| ---------------- | ------------------------------------- |
| Background       | `bg-hero-glow` (page), `bg-surface` (card) |
| Border           | `border border-border`                |
| Border radius    | `rounded-2xl`                         |
| Text — primary   | `text-text-primary`                   |
| Text — secondary | `text-text-secondary`, `text-text-muted` |
| Spacing          | `p-8 sm:p-10 max-w-[420px]`           |
| Hover state      | `hover:text-text-primary` (links)     |
| Shadow           | `shadow-lg`                           |
| Accent usage     | none                                  |

**Pattern notes:**
Centered authentication card with high visual elevation (`shadow-lg`), atmospheric hero background glow, security badges, and responsive margins.

### OAuthButtons

File: `components/auth/OAuthButtons.tsx`
Last updated: 2026-09-25

| Property         | Class                                                     |
| ---------------- | --------------------------------------------------------- |
| Background       | `bg-surface` (Google), `bg-text-darkest` (GitHub)         |
| Border           | `border border-border` (Google)                           |
| Border radius    | `rounded-lg`                                              |
| Text — primary   | `text-text-primary` (Google), `text-white` (GitHub)       |
| Text — secondary | `text-text-secondary`                                    |
| Spacing          | `h-11 px-4 gap-3 space-y-3.5`                             |
| Hover state      | `hover:bg-surface-secondary`, `hover:bg-text-black`, `hover:scale-[1.01]` |
| Shadow           | `shadow-xs` (Google), `shadow-sm` (GitHub)                |
| Accent usage     | none                                                      |

**Pattern notes:**
Full-width OAuth trigger buttons with provider SVG icons, transition scales, disabled states, and animated loading indicators.

### SignOutButton

File: `components/auth/SignOutButton.tsx`
Last updated: 2026-09-25

| Property         | Class                                                     |
| ---------------- | --------------------------------------------------------- |
| Background       | `bg-surface`                                              |
| Border           | `border border-border`                                    |
| Border radius    | `rounded-lg`                                              |
| Text — primary   | `text-text-secondary`                                     |
| Text — secondary | `text-text-secondary`                                     |
| Spacing          | `px-3 py-1.5 gap-2`                                       |
| Hover state      | `hover:bg-surface-secondary`, `hover:text-error`           |
| Shadow           | `shadow-xs`                                               |
| Accent usage     | none                                                      |

**Pattern notes:**
Compact session termination button with subtle danger highlight (`hover:text-error`) and loading spinner state.

### DashboardFoundationView

File: `app/dashboard/page.tsx`
Last updated: 2026-09-25

| Property         | Class                                                                  |
| ---------------- | ---------------------------------------------------------------------- |
| Background       | `bg-background` (page), `bg-surface` (card), `bg-surface-secondary` (stat boxes) |
| Border           | `border border-border`, `border-b border-border`                       |
| Border radius    | `rounded-2xl` (card), `rounded-xl` (stat boxes/icons), `rounded-full` (badge) |
| Text — primary   | `text-text-primary`                                                    |
| Text — secondary | `text-text-secondary`, `text-text-muted`                               |
| Spacing          | `py-8 px-6 lg:px-8 gap-4`, card padding `p-6 sm:p-8`, stat box `p-4`   |
| Hover state      | `hover:bg-text-black`, `hover:bg-surface-secondary`                    |
| Shadow           | `shadow-xs`                                                            |
| Accent usage     | `text-accent`, `bg-accent-muted`, `bg-accent-light`                    |

**Pattern notes:**
Standard authenticated workspace view: 1440px max container, top header with session status badge, and high-elevation structured cards with nested secondary metric tiles.

### ProfileFoundationView

File: `app/profile/page.tsx`
Last updated: 2026-09-25

| Property         | Class                                                                  |
| ---------------- | ---------------------------------------------------------------------- |
| Background       | `bg-background` (page), `bg-surface` (cards), `bg-surface-secondary` (tags) |
| Border           | `border border-border`, `border border-red-200` (alert tags)           |
| Border radius    | `rounded-2xl` (cards), `rounded-xl` (icons), `rounded-full` (ring/tags) |
| Text — primary   | `text-text-primary`                                                    |
| Text — secondary | `text-text-secondary`, `text-error`                                    |
| Spacing          | `py-8 px-6 lg:px-8 gap-6`, card padding `p-6`                          |
| Hover state      | `hover:bg-text-black`, `hover:bg-surface-secondary`                    |
| Shadow           | `shadow-xs`                                                            |
| Accent usage     | `text-accent`, `bg-accent-muted`, `border-accent-light` (progress ring) |

**Pattern notes:**
Multi-column settings grid layout with circular percentage progress indicator, warning tags (`bg-red-50 text-error`), and icon header tiles.

### FindJobsFoundationView

File: `app/find-jobs/page.tsx`
Last updated: 2026-09-25

| Property         | Class                                                                  |
| ---------------- | ---------------------------------------------------------------------- |
| Background       | `bg-background` (page), `bg-surface` (cards), `bg-surface-secondary` (inputs) |
| Border           | `border border-border`, `border-t border-border`                       |
| Border radius    | `rounded-2xl` (cards), `rounded-lg` (inputs/buttons), `rounded-full`   |
| Text — primary   | `text-text-primary`, `text-text-dark` (labels), `text-accent-foreground` |
| Text — secondary | `text-text-secondary`, `text-text-muted` (placeholders)               |
| Spacing          | `py-8 px-6 lg:px-8 gap-4`, card padding `p-6 sm:p-8`                   |
| Hover state      | `hover:bg-text-black`, `hover:bg-surface-secondary`                    |
| Shadow           | `shadow-xs`, `shadow-sm`                                               |
| Accent usage     | `bg-accent`, `text-accent`, `bg-accent-muted`, `bg-accent-light`        |

**Pattern notes:**
Search controls card pattern: 12-column responsive input cluster, upper-case tracking-wider input labels, left-aligned search icons, and pulsing status indicator.



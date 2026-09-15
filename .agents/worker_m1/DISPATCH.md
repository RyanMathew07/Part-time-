# Dispatch: Worker M1 (Modern Next.js Marketplace Rebuild)

## Objective
Rebuild the PART-TIME gig and shift marketplace as a modern Next.js application (App Router, TypeScript, Tailwind CSS) satisfying all requirements in `ORIGINAL_REQUEST.md`, `PROJECT.md`, and the survey reports.

## MANDATORY INTEGRITY WARNING
DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. A teamwork_preview_auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.

## File Ownership
- **Exclusively Owned**:
  - `package.json`, `tsconfig.json`, `tailwind.config.ts`, `next.config.mjs`, `postcss.config.js`
  - `app/**` (`layout.tsx`, `page.tsx`, `globals.css`)
  - `components/**` (`layout/*`, `discovery/*`, `radar/*`, `lifecycle/*`, `chat/*`, `wallet/*`, `employer/*`)
  - `context/**` (`MarketplaceContext.tsx`)
  - `lib/**` (`soundEngine.ts`, `seedData.ts`, `utils.ts`)
  - `types/**` (`index.ts`)
  - `public/**`
- **FORBIDDEN**: You must NOT modify any test files under `tests/` or `TEST_READY.md`.

## Detailed Implementation Requirements

### 1. Project Setup & Configuration
- Initialize clean Next.js 14/15 App Router setup with TypeScript and Tailwind CSS.
- Dependencies needed: `next`, `react`, `react-dom`, `lucide-react`, `tailwindcss`, `postcss`, `autoprefixer`, `typescript`, `@types/react`, `@types/react-dom`, `@types/node`.
- Configure `tailwind.config.ts` with custom theme colors:
  - Stark monochrome: `#000000`, `#090a0f`, `#12131a`, `#181a24`
  - Safety accents: emerald (`#10b981`), amber (`#f59e0b`), cyan (`#06b6d4`), rose (`#f43f5e`)
  - 1px border utilities: `border-white/[0.08]` to `border-white/[0.15]`
  - Apple materials: `backdrop-blur-xl`, spring physics easing.

### 2. Types & Seed Data (`types/index.ts`, `lib/seedData.ts`, `lib/soundEngine.ts`)
- Strict TypeScript types for `UserProfile`, `JobShift`, `WalletState`, `WalletTransaction`, `ChatContact`, `ChatMessage`, `ActiveShift`, `RecentActivity`.
- Full seed data porting from `data.js`: Alex Chen (22, KYC verified), 6 jobs (Café, Promo, Events, Logistics, Retail, Delivery; wages ₹100, ₹500, ₹1k, ₹10k, ₹650, ₹450), active checkInPin `6767`, 4 employer chats (Arun, Akhila, Ryan, Toby), wallet balance ₹1,000 baseline.
- Procedural Web Audio engine: `playTap()`, `playSuccess()`, `playCashout()` synthesized using Web Audio API oscillators with safe user-gesture initialization.

### 3. Centralized Store (`context/MarketplaceContext.tsx`)
- Full reactive state provider with:
  - Jobs list, search filter, category filter, wage tier filter, radar radius filter (1, 5, 10, 25 km).
  - Selected job for side sheet / modal inspection.
  - Active shift state & universal OTP 6767 verification.
  - Chat threads with interactive quick chips ("🔑 Share PIN 6767" -> auto-confirms shift, "💰 Request Pay" -> employer auto-approves ₹500 payout).
  - Wallet balance, transaction history, instant simulated UPI cashout validation (deducts balance, adds transaction, plays cashout chime).
  - +HIRE shift creation action injecting new jobs dynamically into feed and radar map.

### 4. Dual-Experience Viewport Layout (`components/layout/`)
- `ViewportRouter.tsx`: Client-side responsive discriminator rendering `DesktopLayout` on screens >= 1024px and `MobileLayout` on screens < 768px.
- `DesktopLayout.tsx`: Full-width, multi-pane marketplace dashboard without mobile device chassis wrappers.
  - Left persistent navigation bar.
  - Center feed / active view (Home, Map, Chat, Activity, Wallet).
  - Right split-pane interactive radar map and docked quick-inspection side sheet.
- `MobileLayout.tsx`: Native-feeling mobile app shell.
  - Edge-to-edge `100dvh` container.
  - Mobile header with KYC tag and active shift Dynamic Island indicator.
  - Touch-first 5-tab bottom navigation dock (Home, Map, Chat, Recent, Wallet) with >= 44x44px touch targets.
  - Touch-friendly bottom sheets with drag handles.

### 5. Shift Discovery & Interactive Radar Map (`components/discovery/`, `components/radar/`)
- `SearchBar.tsx`: Instant multi-field search with clear button.
- `CategoryPills.tsx`: 7 category filter chips (All, Café, Events, Promo, Logistics, Retail, Delivery) with Raycast active glow.
- `WageTierFilter.tsx`: Wage vacancy chips (₹100, ₹500, ₹1k, ₹10k).
- `ShiftCard.tsx`: High-contrast card with wage telemetry, spots badge, distance tag, and quick apply button.
- `RadarCanvas.tsx`: Concentric scanning radar sweep grid, animated "You are Here" beacon, interactive wage pin markers showing job details on click.
- `RadiusControl.tsx`: Interactive slider (1, 5, 10, 25 km) filtering visible jobs.
- `ShiftInspector.tsx`: Side-sheet (desktop) and slide-up drawer (mobile) with complete shift details and 1-tap apply.

### 6. Shift Lifecycle, Wallet & Employer +HIRE (`components/lifecycle/`, `components/wallet/`, `components/employer/`)
- `OtpBanner.tsx`: Universal OTP 6767 check-in banner with click-to-copy.
- `ActiveShiftTracker.tsx`: Live shift status, timer, check-in verification with PIN 6767.
- `ApplyModal.tsx`: Shift application confirmation modal.
- `ChatView.tsx`: Employer chats (Arun, Akhila, Ryan, Toby) with quick chips.
- `WalletCard.tsx`: Holographic balance card (baseline ₹1,000).
- `CashoutModal.tsx`: UPI cashout modal with GPay, PhonePe, Paytm selectors, preset amount chips, UPI syntax validation, balance validation, and procedural cashout chime.
- `PostShiftModal.tsx`: Sub-60s +HIRE employer shift posting modal with title, category, wage, slots, location; instantly adds job to feed and radar.

### 7. Build & Verification Criteria
- Run `npm install` (or verify package setup), `npm run build`, and confirm zero TypeScript or ESLint errors.
- Document all verification results, commands executed, and output in your handoff report.
- Deliver handoff report to `d:/Documents/Antigravity/Part time/.agents/worker_m1/handoff.md` and message parent when complete.

## 2026-09-14T14:10:07Z
You are Worker M1 for the PART-TIME marketplace rebuild.
Your working directory is d:/Documents/Antigravity/Part time/.agents/worker_m1.
Read your dispatch at d:/Documents/Antigravity/Part time/.agents/worker_m1/DISPATCH.md.
Also read d:/Documents/Antigravity/Part time/.agents/ORIGINAL_REQUEST.md, d:/Documents/Antigravity/Part time/PROJECT.md, and the survey reports in d:/Documents/Antigravity/Part time/.agents/explorer_survey_1/survey_report.md and d:/Documents/Antigravity/Part time/.agents/explorer_survey_2/survey_report.md.


# Project: PART-TIME Gig and Shift Marketplace (Next.js Rebuild)

## Architecture
- **Framework**: Next.js (App Router), React 18/19, TypeScript (strict mode).
- **Styling**: Tailwind CSS with custom design tokens for the Uber/Apple/Raycast aesthetic.
  - Uber foundation: High-contrast typography (`Inter` / `system-ui`), stark monochrome `#000000` / `#090a0f` surfaces, functional safety accents (emerald `#10b981`, amber `#f59e0b`, cyan `#06b6d4`), bold telemetry cards.
  - Apple tactile craft: Spring physics transitions, backdrop blur materials (`backdrop-blur-xl`, `bg-black/40`), procedural Web Audio tactile chimes, smooth drawer/sheet physics.
  - Raycast dark precision: 1px borders (`rgba(255,255,255,0.08)` to `0.15`), dark chrome elevated surfaces (`#12131a`, `#181a24`), compact high-legibility badges.
- **Dual-Experience Viewport Segregation**:
  - **Desktop Web (>= 1024px)**: Full-width multi-pane marketplace dashboard. Left persistent navigation bar, central opportunity feed / active view, right split-pane interactive radar map and docked inspector side sheet. Zero mobile device frames or chassis wrappers!
  - **Mobile Web (< 768px)**: Native-feeling mobile app shell. Edge-to-edge `100dvh`, floating pill-shaped Apple Liquid Glass bottom navigation dock (Home, Map, Chat, Recent, Wallet), >= 44x44px touch targets, active sliding capsule indicator with radial glow, chat red dot notification badge, and swipeable bottom sheets with drag handles.
- **State Management**: React Context (`MarketplaceContext`) providing centralized reactive state for:
  - User profile, active role (Worker vs Employer), KYC status.
  - Job vacancies collection with dynamic addition.
  - Search query, selected category filter, selected wage tier filter.
  - Selected job for quick-inspection side sheet / modal.
  - Active shift status & OTP 6767 handshake state.
  - In-app chat threads & message delivery.
  - Holographic wallet balance, transaction ledger, and simulated UPI cashout.
- **Sound Engine**: Procedural Web Audio API synthesizer for tactile sensory feedback (`playTap`, `playSuccess`, `playCashout`).

## Feature Inventory
| # | Feature | Description | Milestone | Source |
|---|---------|-------------|-----------|--------|
| 1 | Next.js App Router Setup | Clean Next.js project with TypeScript strict mode, ESLint, PostCSS, Tailwind CSS | M1 | ORIGINAL_REQUEST §R1 |
| 2 | Design System Tokens | Custom Tailwind colors (Uber blacks, safety accents, Raycast 1px borders, Apple blurs) | M1 | ORIGINAL_REQUEST §R2 |
| 3 | Typed Domain Models | Strict TS interfaces: `UserProfile`, `JobShift`, `WalletState`, `WalletTransaction`, `ChatContact`, `RecentActivity`, `Notification` | M1 | Survey Explorer 1 & 2 |
| 4 | Seed Data Parity | Complete initial dataset matching legacy prototype (Alex Chen, 6 jobs, Arun/Akhila/Ryan/Toby chats, ₹1,000 wallet) | M1 | data.js parity |
| 5 | Procedural Web Audio Engine | Low-latency Web Audio synthesizer generating tap sweep, success chord, and cashout chime with lazy init | M1 | app.js parity |
| 6 | Centralized Marketplace Store | `MarketplaceContext` handling all state mutations, filters, applications, chat messages, and cashouts | M1 | PRD §4 |
| 7 | Responsive Shell & Layout Switcher | Viewport-aware layout rendering `DesktopLayout` on >=1024px and `MobileLayout` on <768px | M2 | ORIGINAL_REQUEST §R1 |
| 8 | Desktop Multi-Pane Dashboard | Full-width 3-pane layout: persistent sidebar nav, central view area, split-pane interactive radar map | M2 | ORIGINAL_REQUEST §R1 |
| 9 | Floating Liquid Glass Bottom Dock | Floating pill tab bar with 5 touch-optimized tabs (Home, Map, Chat, Recent, Wallet), Apple glass blur/sheen, active capsule glow, red dot badge, min 44px targets | M2 | ORIGINAL_REQUEST §R1 |
| 10 | Mobile Header & Dynamic Island | Mobile status header with KYC verification badge and active shift Dynamic Island widget | M2 | PRD §4.1 |
| 11 | Real-time Search Input | Multi-field search (title, employer, category, location) with instant filtering and clear action | M3 | ORIGINAL_REQUEST §R3 |
| 12 | Category Filter Chips | 7 filter pills (All, Café, Events, Promo, Logistics, Retail, Delivery) with active Raycast glow | M3 | ORIGINAL_REQUEST §R3 |
| 13 | Wage Vacancy Tiers | Filter pills for tiered wage vacancies (₹100, ₹500, ₹1k, ₹10k) with toggle state | M3 | ORIGINAL_REQUEST §R3 |
| 14 | Job Shift Opportunity Cards | High-contrast cards with wage telemetry, distance tag, spots badge, and quick apply action | M3 | ORIGINAL_REQUEST §R2 |
| 15 | Interactive Radar Map Canvas | Concentric scanning radar sweep grid, animated "You are Here" beacon, and interactive wage markers | M3 | ORIGINAL_REQUEST §R3 |
| 16 | Map Radius Slider | Adjustable radar radius selector (1, 5, 10, 25 km) filtering jobs by distance | M3 | PRD §4.2 |
| 17 | Quick-Inspection Sheet/Drawer | Desktop side inspector and mobile slide-up sheet displaying full job details and apply button | M3 | ORIGINAL_REQUEST §R1 |
| 18 | Universal OTP 6767 Banner | Persistent attendance check-in banner with universal code 6767 and click-to-copy interaction | M4 | ORIGINAL_REQUEST §R3 |
| 19 | 1-Tap Shift Application Modal | Application modal showing shift summary, location, wage, and confirm application action | M4 | PRD §4.1 |
| 20 | Mutual Handshake & Active Tracker | Active shift lifecycle state tracking, check-in verification via OTP 6767, live status indicator | M4 | ORIGINAL_REQUEST §R3 |
| 21 | In-App Employer Chat Threads | Messaging interface with employer directory (Arun, Akhila, Ryan, Toby) and message log | M4 | PRD §4.3 |
| 22 | Chat Action Quick Chips | Interactive quick chips: "🔑 Share PIN 6767", "💰 Request Pay", "📍 I've Arrived" with automated replies | M4 | app.js parity |
| 23 | Holographic Wallet Balance Card | High-contrast wallet card displaying available balance, KYC status, and instant deposit action | M4 | ORIGINAL_REQUEST §R3 |
| 24 | Shift Payment Receipts Ledger | Transaction list with badges (deposit, cashout, shift pay) and timestamp telemetry | M4 | PRD §4.4 |
| 25 | Instant Simulated UPI Cashout Modal | Cashout modal with GPay, PhonePe, Paytm selector, preset chips, UPI validation, and audio chime | M4 | ORIGINAL_REQUEST §R3 |
| 26 | +HIRE Rapid Shift Creation Modal | Sub-60s employer shift creation modal with title, category, wage, slots, location, coords | M4 | ORIGINAL_REQUEST §R3 |
| 27 | Dynamic Shift Feed & Map Injection | Newly created employer shifts immediately render in the active feed and appear on the radar map | M4 | app.js parity |
| 28 | Opaque-box E2E Test Suite (Tiers 1-4) | Comprehensive test suite verifying build, layouts, search/filters, radar, OTP, wallet, +HIRE | E2E | ORIGINAL_REQUEST AC |

## Milestones
| # | Name | Scope | Dependencies | Status |
|---|------|-------|-------------|--------|
| E2E | E2E Testing Suite (Tiers 1-4) | Requirements-driven test infrastructure & comprehensive test suites (Tiers 1-4), publishes `TEST_READY.md` | none | DONE |
| M1 | Next.js Foundation & Core Engine | Project initialization, TypeScript config, Tailwind tokens, domain types, seed data, sound engine, context store | none | DONE |
| M2 | Dual-Experience Responsive Architecture | Desktop multi-pane layout (no phone frames) & Mobile touch-first app shell with bottom dock (>=44px targets) | M1 | DONE |
| M3 | Discovery, Filters & Interactive Radar Map | Search, 7 categories, 4 wage tiers, shift cards, interactive radar canvas, radius slider, inspection sheet | M2 | DONE |
| M4 | Shift Lifecycle, OTP Handshake, Wallet & +HIRE | OTP 6767 check-in, chat quick chips, active shift tracking, holographic wallet, UPI cashout, +HIRE modal | M3 | DONE |
| M5 | 100% E2E Pass & Build Verification | Pass 100% of E2E tests (Tiers 1-4), zero TS/ESLint errors on `npm run build`, clean `npm run dev` | M4, E2E | DONE |
| M6 | Adversarial Coverage Hardening & Forensic Audit | White-box stress testing, boundary hardening, Forensic Integrity Audit (CLEAN) | M5 | DONE |

## Interface Contracts

### `types/index.ts` ↔ Components & Context
- `JobShift`: `{ id: string; title: string; category: CategoryType; company: string; wage: number; wageType: string; duration: string; spots: number; distance: string; distanceKm: number; rating: number; location: string; coords: { x: number; y: number }; urgent: boolean; tags: string[]; description: string; requirements: string[]; employerName: string; checkInPin: string; }`
- `UserProfile`: `{ name: string; role: 'worker' | 'employer'; age: number; isAgeVerified: boolean; kycStatus: 'verified' | 'pending' | 'unverified'; activeOtp: string; rating: number; completedShifts: number; reliability: number; }`
- `WalletState`: `{ balance: number; currency: string; upiId: string; transactions: WalletTransaction[]; }`
- `WalletTransaction`: `{ id: string; title: string; amount: number; type: 'credit' | 'debit'; timestamp: string; status: 'completed' | 'pending'; badge: string; method?: string; }`
- `ChatContact`: `{ id: string; name: string; role: string; avatar: string; unread: number; lastMessage: string; lastTime: string; messages: ChatMessage[]; }`

### `MarketplaceContext` ↔ UI Components
- `jobs: JobShift[]`: Filtered list based on search, category, wage, and map radius.
- `allJobs: JobShift[]`: Complete unfiltered list.
- `searchQuery: string`: Setter `setSearchQuery(q: string)`.
- `selectedCategory: CategoryType | 'All'`: Setter `setSelectedCategory(cat)`.
- `selectedWageTier: number | null`: Setter `setSelectedWageTier(tier)`.
- `radarRadiusKm: number`: Setter `setRadarRadiusKm(radius)`.
- `activeShift: ActiveShift | null`: Active working shift state.
- `applyToJob(jobId: string): void`: Applies to shift and updates status.
- `verifyCheckIn(pin: string): boolean`: Validates OTP 6767, activates active shift tracking.
- `cashoutWallet(amount: number, upiId: string, provider: string): { success: boolean; message: string }`: Validates balance & UPI format, deducts balance, triggers audio chime, appends transaction.
- `addJob(jobData: Omit<JobShift, 'id'>): void`: Injects new shift to `allJobs`.
- `sendMessage(contactId: string, text: string): void`: Sends chat message and triggers automated employer responses for `"🔑 Share PIN 6767"` and `"💰 Request Pay"`.

## Code Layout
```
/
├── app/
│   ├── layout.tsx             # Root HTML layout, font loading, dark theme styling
│   ├── page.tsx               # Entry page rendering ViewportRouter (Desktop vs Mobile)
│   ├── globals.css            # Tailwind directives, custom scrollbars, animations, radar grid
├── components/
│   ├── layout/
│   │   ├── ViewportRouter.tsx # Client-side responsive viewport discriminator
│   │   ├── DesktopLayout.tsx  # Desktop full-width multi-pane layout (no phone frames)
│   │   ├── MobileLayout.tsx   # Mobile touch-first app shell with sticky bottom dock
│   │   ├── NavigationSidebar.tsx # Desktop persistent left nav
│   │   ├── BottomDock.tsx     # Mobile touch-friendly bottom dock (>= 44px)
│   │   └── Header.tsx         # Unified header with role switch, wallet summary, KYC tag
│   ├── discovery/
│   │   ├── SearchBar.tsx      # Real-time search with clear button
│   │   ├── CategoryPills.tsx  # 7 category chips with Raycast glow
│   │   ├── WageTierFilter.tsx # ₹100, ₹500, ₹1k, ₹10k filter chips
│   │   ├── ShiftCard.tsx      # High-contrast opportunity card with telemetry
│   │   └── ShiftFeed.tsx      # Responsive grid/list of opportunities
│   ├── radar/
│   │   ├── RadarCanvas.tsx    # Concentric scanning sweep radar map with coordinates
│   │   ├── RadiusControl.tsx  # 1, 5, 10, 25 km radius selector
│   │   └── ShiftInspector.tsx # Desktop docked side-sheet & mobile drawer
│   ├── lifecycle/
│   │   ├── OtpBanner.tsx      # Universal OTP 6767 banner with click-to-copy
│   │   ├── ActiveShiftTracker.tsx # Live shift status, timer, check-in card
│   │   └── ApplyModal.tsx     # 1-tap apply confirmation sheet
│   ├── chat/
│   │   ├── ChatView.tsx       # Conversation view with contact directory
│   │   └── QuickActionChips.tsx # Quick action chips (OTP 6767, Request Pay, Arrived)
│   ├── wallet/
│   │   ├── WalletCard.tsx     # Holographic balance card
│   │   ├── CashoutModal.tsx   # Instant UPI cashout modal (GPay, PhonePe, Paytm)
│   │   └── TransactionHistory.tsx # Payment receipts ledger
│   ├── employer/
│   │   └── PostShiftModal.tsx # Sub-60s +HIRE shift creation modal
├── context/
│   └── MarketplaceContext.tsx # Centralized React state store and actions
├── lib/
│   ├── soundEngine.ts         # Procedural Web Audio API sound generator
│   ├── seedData.ts            # Typed initial dataset from legacy data.js
│   └── utils.ts               # Formatting (currency, distance, time, UPI regex)
├── types/
│   └── index.ts               # Domain TypeScript interfaces
├── tests/
│   ├── e2e-runner.js          # Opaque-box automated test runner
│   ├── tier1-smoke.test.ts    # Build, schema, and syntax unit tests
│   ├── tier2-viewport.test.ts # Desktop split layout vs Mobile dock tests
│   ├── tier3-features.test.ts # Search, filter, radar, OTP, wallet, +HIRE tests
│   └── tier4-journeys.test.ts # Full worker & employer end-to-end user journeys
├── package.json
├── tsconfig.json
├── tailwind.config.ts
└── next.config.mjs
```

# Original User Request

## Initial Request — 2026-09-14T13:55:43Z

Rebuild the PART-TIME gig and shift marketplace as a modern Next.js application (App Router, TypeScript, Tailwind CSS) with distinct, purpose-built interfaces for desktop web and mobile viewports, featuring an Uber-dominant utility aesthetic elevated by Apple tactile iOS gestures and Raycast dark-precision styling.

Working directory: d:/Documents/Antigravity/Part time
Integrity mode: demo

## Requirements

### R1. Next.js App Router Architecture & Dual-Experience Layout
Implement a clean Next.js App Router project in TypeScript and Tailwind CSS that delivers two dedicated, non-compromised experiences:
- **Desktop Web**: A full-width, multi-pane marketplace layout featuring a split-pane interactive map, persistent navigation, filtered opportunity listings, and quick-inspection side sheets. The desktop UI must fully leverage desktop real estate without mobile device frame wrappers.
- **Mobile Web**: A touch-first, fluid mobile layout with bottom navigation dock, swipeable modal sheets, clear touch targets (minimum 44px), and native-feeling viewport handling.

### R2. Uber-Dominant Design System with Apple & Raycast Craft
Establish a bespoke, high-polish visual design system eliminating generic AI styling:
- **Uber Foundation**: High-contrast typography, stark monochrome base paired with functional safety accents, bold category iconography, real-time map pin cards, and clear distance/route telemetry.
- **Apple Tactile Motion**: Smooth sheet physics, Spring animations, subtle backdrop blur materials, and clear sensory feedback for interactions.
- **Raycast Precision**: Crisp 1px border contrasts (`rgba(255,255,255,0.08)` to `0.15`), dark chrome surfaces, and compact, high-legibility badge tags for wages and KYC statuses.

### R3. Complete Marketplace & Shift Lifecycle Functionality
Implement the full end-to-end product workflow across both layouts:
- **Shift Discovery & Filters**: Real-time search, category filters (Café, Events, Promo, Logistics, Retail, Delivery), and tiered wage vacancies (₹100, ₹500, ₹1k, ₹10k).
- **Interactive Radar Map**: Live map interface with location beacon, adjustable radius slider, and interactive geo-tagged wage markers.
- **Mutual Handshake & OTP Verification**: On-site attendance check-in using universal OTP handshake code (`OTP 6767`) and live shift status tracking.
- **Holographic Wallet & Digital Cashout**: Balance tracking, shift payment receipts, and instant simulated UPI withdrawals (Google Pay, PhonePe, Paytm).
- **+HIRE Employer Shift Posting**: Quick shift creation modal allowing employers to post hourly gigs in under 60 seconds.

## Acceptance Criteria

### Build & Code Integrity
- [ ] `npm run build` completes successfully with zero TypeScript or ESLint errors
- [ ] The codebase runs cleanly in Next.js development server (`npm run dev`) on `localhost:3000`
- [ ] All components are written in modular TypeScript (`.tsx`) with strictly typed interfaces

### Viewport & Responsive Design
- [ ] Desktop screens (>= 1024px) render a full-width, multi-column dashboard with a split-pane map and zero phone frames
- [ ] Mobile screens (< 768px) render a dedicated full-screen mobile app layout with a bottom dock and native-feeling touch ergonomics
- [ ] All interactive elements meet touch-target standards (>= 44x44px) on mobile

### Visual System & Aesthetics
- [ ] Cohesive theme applying Uber-style typography, high-contrast dark palette, Raycast 1px borders, and Apple-inspired fluid sheet animations
- [ ] No generic AI layouts, unstyled buttons, or placeholder components

### Functional Integrity
- [ ] Category filtering, search bar, and wage cards dynamically update shift listings
- [ ] Map pins accurately reflect job locations and open preview sheets upon interaction
- [ ] Shift check-in with OTP 6767 activates active shift tracking
- [ ] Wallet balance updates accurately on shift completion and cashout requests

## Follow-up — 2026-09-15T08:32:44Z

Refactor and standardize all UI elements across the PART-TIME marketplace application to use shadcn/ui components conforming to the configured base-luma preset, fixing all type, style, and integration issues across the codebase.

Working directory: d:/Documents/Antigravity/Part time
Integrity mode: development

## Requirements

### R1. Comprehensive shadcn/ui Component Migration
Audit all interactive and display elements across all screens (discovery, map radar, shift lifecycle, employer postings, holographic wallet, navigation) and standardize them on shadcn/ui components adhering to the base-luma preset with Hugeicons and Base UI primitives.

### R2. Component Error Resolution and Polish
Identify and resolve all TypeScript errors, styling regressions, missing component variants, import discrepancies, and accessibility violations across the entire UI component tree.

### R3. Preserved Product Flow and Responsiveness
Ensure that all existing marketplace workflows (shift search/filtering, interactive radar map inspection, attendance check-in handshake, and simulated UPI cashout) remain fully functional on both desktop web and mobile viewport layouts.

## Acceptance Criteria

### Build & Type Safety
- [ ] `npm run build` completes successfully with zero TypeScript compilation errors and zero ESLint errors
- [ ] All UI primitives imported from `@/components/ui` strictly conform to the `base-luma` preset

### Component Consistency
- [ ] Buttons, inputs, dialogs, sheets, cards, tabs, sliders, badges, and avatars across all feature views use the unified shadcn component library
- [ ] All icons across the component library and views consistently use Hugeicons (`@hugeicons/react`)
- [ ] No unstyled raw HTML elements remain where a corresponding shadcn component exists

### Functional & Responsive Verification
- [ ] The full shift lifecycle (filter -> view details on map/sheet -> check-in with OTP 6767 -> wallet cashout) operates without runtime console exceptions
- [ ] Dual desktop multi-pane layout and mobile bottom-dock touch layout render correctly without layout breaks


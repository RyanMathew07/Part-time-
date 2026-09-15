# Orchestration Plan: Rebuilding PART-TIME Marketplace in Next.js

## Goal
Rebuild PART-TIME as a modern Next.js (App Router, TypeScript, Tailwind CSS) application featuring:
1. Distinct, purpose-built interfaces for Desktop (multi-pane, split map, no phone wrappers) and Mobile (bottom dock, tactile sheets, >=44px touch targets).
2. Uber-dominant utility aesthetic + Apple tactile motion + Raycast 1px precision styling.
3. Complete Shift Lifecycle: Discovery/Search/Filters, Interactive Radar Map, Universal OTP 6767 check-in & tracking, Holographic Wallet with simulated UPI cashout, and +HIRE employer shift posting.
4. Production quality: `npm run build` zero TS/ESLint errors, clean `npm run dev` at localhost:3000.

## Execution Pattern: Project Pattern with Dual Track

### Phase 0: Survey (Parallel Exploration)
- Spawn 3 Explorers / Spec Miners:
  - `explorer_1`: Survey existing legacy web prototype (`index.html`, `app.js`, `styles.css`, `data.js`) to extract full feature behaviors, data schema, job models, and state handling.
  - `explorer_2`: Survey PRD (`PRD.md`) and technical requirements (`ORIGINAL_REQUEST.md`), UI/UX specifications, animations, Raycast/Apple/Uber design system details.
  - `spec_miner_1`: Extract rigorous testable requirements, edge cases, acceptance criteria, OTP handshake mechanics, wallet transaction states, and viewport break behavior.
- Merge findings into `PROJECT.md` § Architecture, Feature Inventory, and Milestones.

### Phase 1: Dual Track Launch
- **Track A: E2E Testing Orchestrator**
  - Designs opaque-box test runner and test suites (Tier 1-4) covering all features.
  - Emits `TEST_READY.md`.
- **Track B: Implementation Orchestrator**
  - M1: Next.js Foundation & Design System (Tailwind, Lucide icons, dark theme tokens, Apple/Uber/Raycast styling primitives, TypeScript types & seed data).
  - M2: Dual-Layout Architecture (Desktop split-pane dashboard + Mobile app dock & sheet ergonomics).
  - M3: Core Marketplace Features (Interactive Radar Map, Search & Filtering, Shift Details modal/sheet).
  - M4: Shift Lifecycle & Wallet (+HIRE Employer creation, OTP 6767 Check-in & Live Shift Tracking, Holographic Wallet & UPI Cashout).
  - M5: Integration, Build Verification & 100% E2E Test Pass (Tiers 1-4).
  - M6: Adversarial Hardening (Tier 5) & Forensic Integrity Audit.

### Phase 2: Final Gate & Sentinel Victory Audit
- Verification of zero build/lint errors.
- Verification of dev server running cleanly.
- Forensic integrity audit (CLEAN).
- Final report to Sentinel.

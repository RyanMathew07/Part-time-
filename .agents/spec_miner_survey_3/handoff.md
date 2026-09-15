# Handoff Report: Specification Mining & Acceptance Criteria

**Agent**: Spec Miner Survey 3 (`.agents/spec_miner_survey_3`)  
**Recipient**: Parent Orchestrator (`4be7d9f4-bc0f-4ea7-90bb-1535c9eac401`)  
**Status**: Completed (Hard Handoff)  
**Deliverables**: `d:/Documents/Antigravity/Part time/.agents/spec_miner_survey_3/spec_report.md`

---

## 1. Observation

Direct observations extracted from authoritative specification and reference codebase files:

1. **Original User Request & Requirements** (`d:/Documents/Antigravity/Part time/.agents/ORIGINAL_REQUEST.md`):
   - Line 12–15: Mandates Next.js App Router, TypeScript, and Tailwind CSS delivering two distinct experiences:
     > "Desktop Web: A full-width, multi-pane marketplace layout featuring a split-pane interactive map, persistent navigation, filtered opportunity listings, and quick-inspection side sheets. The desktop UI must fully leverage desktop real estate without mobile device frame wrappers."
     > "Mobile Web: A touch-first, fluid mobile layout with bottom navigation dock, swipeable modal sheets, clear touch targets (minimum 44px), and native-feeling viewport handling."
   - Line 18–21: Design system blending "Uber Foundation" (high-contrast typography, monochrome base, safety accents), "Apple Tactile Motion" (smooth sheet physics, spring animations, backdrop blur), and "Raycast Precision" (crisp 1px border contrasts `rgba(255,255,255,0.08)` to `0.15`, dark chrome surfaces, badge tags).
   - Line 25–29: Core functional pillars: Shift Discovery & Filters (Café, Events, Promo, Logistics, Retail, Delivery; wage tiers ₹100, ₹500, ₹1k, ₹10k), Interactive Radar Map with location beacon and radius slider, Mutual Handshake with universal `OTP 6767`, Holographic Wallet with instant simulated UPI withdrawals (Google Pay, PhonePe, Paytm), and `+HIRE` employer shift posting.
   - Line 34–36: Build integrity criteria: `npm run build` zero TS/ESLint errors, clean `npm run dev` at `localhost:3000`.

2. **Product Requirements Document** (`d:/Documents/Antigravity/Part time/PRD.md`):
   - Lines 58–66: Mandatory age gate ($\text{Age} \ge 18$), profile customisation, dual-role switcher (Worker vs Employer), KYC document indicator (Aadhaar / ID Card).
   - Lines 88–95: Handshake Protocol: universal code `OTP 6767`, on-site employer verification initiates shift timer, Dynamic Island activates live shift tracker.
   - Lines 96–102: Interactive Map: rotating scanning sweep radar grid, "You are Here" animated beacon, holographic wage markers, radius slider (1, 5, 10, 25 km), slide-up preview sheet.
   - Lines 103–115: In-App Chat: directory with active employers (Arun, Akhila, Ryan, Toby), quick chips (`"🔑 Share PIN 6767"`, `"💰 Request Pay"`, `"📍 I've Arrived"`), automated payment release crediting ₹500.
   - Lines 122–129: Wallet: available balance ₹1,000 baseline, UPI VPA, cashout modal with GPay/PhonePe/Paytm, preset chips, ₹0 fee, Web Audio sound effect.
   - Lines 130–139: Employer `+ HIRE` modal with Title, Category, Wage, Duration, Slots, Location, Notes.

3. **Legacy Prototype Implementation** (`app.js`, `data.js`, `index.html`, `styles.css`):
   - `app.js` lines 23–101: Web Audio API procedural synthesizer (`playTap`, `playSuccess`, `playCashout`).
   - `app.js` lines 142–160: `toggleFrameMode` toggling `.expanded` dashboard view vs iPhone 15 Pro Max chassis.
   - `app.js` lines 539–574: Cashout validation: requires positive amount, amount $\le$ balance, valid UPI ID containing `@`.
   - `data.js` lines 71–197: Seed data for 6 initial job vacancies across 6 categories with specific wages (₹100, ₹500, ₹1,000, ₹10,000, ₹650, ₹450), coordinates, distance in km, and checkInPin `"6767"`.

---

## 2. Logic Chain

1. **Step 1 (Source Integration)**: Cross-referencing `ORIGINAL_REQUEST.md` with `PRD.md` reveals that while the legacy prototype simulated an iPhone 15 Pro Max inside a desktop browser (via `index.html` lines 41–50 and `app.js` line 158), the authoritative Next.js specification (`ORIGINAL_REQUEST.md` lines 14 & 39) explicitly forbids mobile device frame wrappers on desktop viewports ($\ge 1024\text{px}$).
2. **Step 2 (Layout Segregation)**: Consequently, the architecture must maintain two distinct layout renderers:
   - Desktop layout ($\ge 1024\text{px}$): Full-width multi-column split dashboard with persistent navigation and side-by-side radar map.
   - Mobile layout ($< 768\text{px}$): Edge-to-edge touch-first app with 5-tab sticky bottom dock, >= 44px touch targets, and slide-up bottom sheets.
3. **Step 3 (Behavioral Invariants)**: The legacy implementation in `app.js` establishes verified state transitions that must be preserved:
   - Clicking `"🔑 Share PIN 6767"` produces an automated response: `"PIN 6767 confirmed! Shift checked in successfully. Have a great shift!"`.
   - Clicking `"💰 Request Pay"` triggers an employer payout approval crediting ₹500 directly into the wallet.
   - Clicking the OTP banner copies `"6767"` to the clipboard.
   - Submitting `+ HIRE` injects the newly created shift immediately into the Home job grid and places a pin on the Interactive Radar Map.
   - Cashout strictly validates balance bounds and UPI syntax (`@` delimiter).
4. **Step 4 (Test Mapping)**: To guarantee zero regressions during the Next.js migration, verification must be structured into four sequential tiers: Tier 1 (Unit & Build Smoke: types, lint, formatters), Tier 2 (Viewport & Layout: desktop no-frame, mobile bottom dock & 44px targets), Tier 3 (Functional Integration: search/filters, radar map, OTP handshake, wallet cashout, +HIRE posting), and Tier 4 (End-to-End User Journeys).

---

## 3. Caveats

- **External Backend Services**: In alignment with demo/prototype mode requirements, payment gateway settlement (Razorpay/Cashfree) and real SMS dispatch are simulated client-side via in-memory React state and Web Audio sound effects.
- **Map Rendering**: The radar map operates using normalized relative coordinate percentages (`coords.x`, `coords.y`) over a procedural CSS radar grid, rather than requiring paid Google Maps / Mapbox API keys.
- **No other caveats**: All 28 features, 8 user stories, and 28 edge cases have been exhaustively documented.

---

## 4. Conclusion

The specification mining phase is 100% complete. The complete requirements inventory, acceptance criteria, verification specifications, test tier mappings (Tier 1–4), and edge cases are published in `spec_report.md`. The design rules and interaction invariants are fully ready for the E2E Test Suite Orchestrator (Track A) and the Implementation Orchestrator (Track B).

---

## 5. Verification Method

To independently verify the extracted specifications and their source grounding:

1. **Inspect Deliverable**:
   - View `d:/Documents/Antigravity/Part time/.agents/spec_miner_survey_3/spec_report.md` to verify the presence of:
     - 8 User Stories & Complete Feature Inventory
     - Features Discovered table (28 rows)
     - Core Verification Specifications (Build, Viewport, Search/Filter, Radar Map, OTP Handshake, Wallet, +HIRE)
     - 4-Tier Test Mapping
     - Edge Cases table (28 rows)
2. **Cross-Check Source Consistency**:
   - View `d:/Documents/Antigravity/Part time/.agents/ORIGINAL_REQUEST.md` lines 12–30 to confirm R1–R3 alignment.
   - View `d:/Documents/Antigravity/Part time/PRD.md` §4 to confirm functional parity.
   - View `d:/Documents/Antigravity/Part time/app.js` lines 453–462 & 539–574 to confirm OTP handshake and cashout validation logic.
3. **Invalidation Conditions**:
   - Any requirement mandating mobile frames on desktop screens >= 1024px invalidates the layout requirement.
   - Any failure of `npm run build` or ESLint errors in the target Next.js rebuild invalidates the build integrity gate.

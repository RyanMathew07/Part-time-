# Dispatch: E2E Test Writer (Opaque-box Test Suite)

## Objective
Build the comprehensive automated test suite and test runner in `tests/` per `TEST_INFRA.md`, derived from requirements in `ORIGINAL_REQUEST.md` and `d:/Documents/Antigravity/Part time/.agents/spec_miner_survey_3/spec_report.md`. Publish `TEST_READY.md` at project root upon completion.

## File Ownership
- **Exclusively Owned**: `tests/*`, `d:/Documents/Antigravity/Part time/TEST_READY.md`.
- **Read Only**: All other files, including `PROJECT.md`, `ORIGINAL_REQUEST.md`, `TEST_INFRA.md`, and survey reports.
- **FORBIDDEN**: You must NOT modify any application code under `app/`, `components/`, `context/`, `lib/`, or `types/`.

## Test Structure & Specifications
1. `tests/run-all-tests.js`: Test runner script that runs all test tiers, aggregates assertion results, outputs structured progress, and exits with code 0 (all pass) or 1 (failures).
2. `tests/tier1-smoke.test.js` (Tier 1: >=25 assertions):
   - Package configuration: Next.js, React, TypeScript, Tailwind, Lucide React dependencies present.
   - TypeScript types: `UserProfile`, `JobShift`, `WalletState`, `WalletTransaction`, `ChatContact` schemas.
   - Domain invariants: Age check (>=18), OTP code ("6767"), initial wallet balance (1000).
   - Utility functions: UPI regex validation, currency formatting, distance calculation.
3. `tests/tier2-viewport.test.js` (Tier 2: >=25 assertions):
   - ViewportRouter & Layout segregation: DesktopLayout (>=1024px) has NO mobile device frame, has persistent navigation and split map pane.
   - MobileLayout (<768px): 5-tab sticky bottom dock (Home, Map, Chat, Recent, Wallet), min 44x44px touch targets.
   - Style tokens: Raycast 1px borders, dark monochrome base (#000000 / #090a0f), safety accents (emerald, amber, cyan).
4. `tests/tier3-features.test.js` (Tier 3: >=15 assertions):
   - Search & filters: category chips (Café, Promo, Events, Logistics, Retail, Delivery), wage tiers (₹100, ₹500, ₹1k, ₹10k).
   - Radar map: concentric radar sweep, location beacon, wage markers, radius slider (1, 5, 10, 25 km).
   - Mutual handshake: OTP 6767 check-in verification, active shift tracking.
   - Chat quick chips: "🔑 Share PIN 6767", "💰 Request Pay" automated replies.
   - Holographic wallet: balance tracking, instant simulated UPI cashout validation (GPay, PhonePe, Paytm).
   - +HIRE employer modal: rapid shift creation and instant injection into feed & map.
5. `tests/tier4-journeys.test.js` (Tier 4: 5 scenarios):
   - Scenario 1: Worker end-to-end shift discovery, apply, OTP 6767 check-in, shift completion.
   - Scenario 2: Employer +HIRE 60-second posting and feed/map verification.
   - Scenario 3: Wallet cashout lifecycle with UPI validation and balance deduction.
   - Scenario 4: Desktop vs Mobile layout ergonomics verification.
   - Scenario 5: Boundary & error resilience (empty queries, invalid UPI, insufficient funds).

## Publication Requirement: `TEST_READY.md`
When tests are implemented, create `TEST_READY.md` at project root matching the template in `PROJECT.md` / `TEST_INFRA.md`.
## 2026-09-14T14:10:07Z
You are E2E Test Writer 1 for the PART-TIME marketplace rebuild.
Your working directory is d:/Documents/Antigravity/Part time/.agents/e2e_test_writer_1.
Read your dispatch at d:/Documents/Antigravity/Part time/.agents/e2e_test_writer_1/DISPATCH.md.
Also read d:/Documents/Antigravity/Part time/.agents/ORIGINAL_REQUEST.md, d:/Documents/Antigravity/Part time/TEST_INFRA.md, and d:/Documents/Antigravity/Part time/.agents/spec_miner_survey_3/spec_report.md.

Tasks:
1. Build the opaque-box automated test suite under tests/:
   - tests/run-all-tests.js (CLI runner reporting pass/fail with exit code 0 or 1)
   - tests/tier1-smoke.test.js (Tier 1: Feature & syntax coverage >=25 assertions)
   - tests/tier2-viewport.test.js (Tier 2: Boundary & layout checks >=25 assertions)
   - tests/tier3-features.test.js (Tier 3: Cross-feature integrations >=15 assertions)
   - tests/tier4-journeys.test.js (Tier 4: 5 full user scenarios)
2. Test runner must run cleanly via `node tests/run-all-tests.js`.
3. Publish d:/Documents/Antigravity/Part time/TEST_READY.md with test summary and coverage checklist.
4. You own ONLY tests/* and TEST_READY.md. DO NOT modify application source code in app/, components/, context/, lib/, or types/.
5. Write your handoff to d:/Documents/Antigravity/Part time/.agents/e2e_test_writer_1/handoff.md and send a message to parent when complete.

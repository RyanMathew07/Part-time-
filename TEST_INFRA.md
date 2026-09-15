# E2E Test Infra: PART-TIME Gig and Shift Marketplace

## Test Philosophy
- Opaque-box, requirement-driven. No dependency on implementation design.
- Verification mechanism derives directly from `ORIGINAL_REQUEST.md`, `PRD.md`, and `spec_report.md`.
- Methodology: Category-Partition + Boundary Value Analysis (BVA) + Pairwise Combinatorial Testing + Real-World Workload Testing.

## Feature Inventory
| # | Feature | Source | Tier 1 | Tier 2 | Tier 3 | Tier 4 |
|---|---------|--------|:------:|:------:|:------:|:------:|
| 1 | Next.js App Router Architecture | ORIGINAL_REQUEST §R1 | ✓ | ✓ | | |
| 2 | Strict TypeScript & Clean Build | ORIGINAL_REQUEST AC | ✓ | | | |
| 3 | Tailwind Design System Tokens | ORIGINAL_REQUEST §R2 | ✓ | ✓ | | |
| 4 | Domain Models & Seed Data Parity | PRD §4 / data.js | ✓ | | ✓ | |
| 5 | Web Audio Sound Engine | PRD §4.4 / app.js | ✓ | | ✓ | |
| 6 | Centralized Marketplace Store | PRD §4 | ✓ | | ✓ | |
| 7 | Desktop Full-Width Multi-Pane (No Frames) | ORIGINAL_REQUEST §R1 | | ✓ | ✓ | ✓ |
| 8 | Mobile Touch-First App Dock (>= 44px) | ORIGINAL_REQUEST §R1 | | ✓ | ✓ | ✓ |
| 9 | Real-time Search & Empty State | ORIGINAL_REQUEST §R3 | | ✓ | ✓ | |
| 10 | 7 Category Filter Chips | ORIGINAL_REQUEST §R3 | | ✓ | ✓ | |
| 11 | 4 Tiered Wage Vacancies (₹100–₹10k) | ORIGINAL_REQUEST §R3 | | ✓ | ✓ | |
| 12 | Shift Opportunity Cards & Telemetry | ORIGINAL_REQUEST §R2 | | ✓ | ✓ | |
| 13 | Interactive Radar Map Canvas & Pins | ORIGINAL_REQUEST §R3 | | ✓ | ✓ | ✓ |
| 14 | Radar Radius Slider (1, 5, 10, 25 km) | PRD §4.2 | | ✓ | ✓ | |
| 15 | Quick-Inspection Side Sheet / Drawer | ORIGINAL_REQUEST §R1 | | ✓ | ✓ | |
| 16 | Universal OTP 6767 Banner & Copy | ORIGINAL_REQUEST §R3 | | ✓ | ✓ | |
| 17 | 1-Tap Shift Apply Modal | PRD §4.1 | | ✓ | ✓ | ✓ |
| 18 | Mutual Handshake & Active Shift Tracking | ORIGINAL_REQUEST §R3 | | | ✓ | ✓ |
| 19 | In-App Employer Chat & Contact List | PRD §4.3 | | ✓ | ✓ | |
| 20 | Chat Quick Chips ("🔑 Share PIN 6767", "💰 Request Pay") | app.js parity | | | ✓ | ✓ |
| 21 | Holographic Wallet Balance Card | ORIGINAL_REQUEST §R3 | | ✓ | ✓ | |
| 22 | Instant Simulated UPI Cashout Modal | ORIGINAL_REQUEST §R3 | | ✓ | ✓ | ✓ |
| 23 | Cashout Validation (Balance, UPI Syntax) | app.js parity | ✓ | | ✓ | |
| 24 | +HIRE Rapid Shift Creation Modal | ORIGINAL_REQUEST §R3 | | ✓ | ✓ | ✓ |
| 25 | Shift Injection to Feed & Radar Map | app.js parity | | | ✓ | ✓ |

## Test Architecture
- **Test Runner**: Node.js automated test runner (`node tests/run-all-tests.js` or `npm test`) executing against source code, components, and synthetic browser simulation without external flakiness.
- **Pass/Fail Semantics**: Exit code 0 if all tests pass; exit code 1 if any assertions fail. Detailed tap-like summary.
- **Directory Layout**:
  - `tests/run-all-tests.js` (Orchestrator runner)
  - `tests/tier1-smoke.test.js` (T1: Feature & syntax coverage)
  - `tests/tier2-viewport.test.js` (T2: Boundary & layout checks)
  - `tests/tier3-features.test.js` (T3: Cross-feature integrations)
  - `tests/tier4-journeys.test.js` (T4: Full user scenarios)

## Real-World Application Scenarios (Tier 4)
| # | Scenario | Features Exercised | Complexity |
|---|----------|--------------------|------------|
| 1 | Job Seeker Onboarding to Shift Completion | Category filter, search, map inspection, 1-tap apply, OTP 6767 handshake, active shift tracker | High |
| 2 | Employer Urgent Hiring Workflow | Open +HIRE modal, fill 60s form, submit, verify immediate appearance in feed and radar map | High |
| 3 | Instant Wage Earning & UPI Cashout | Complete shift / request payout, balance increase, open cashout modal, select PhonePe, cashout, balance update | High |
| 4 | Dual-Viewport Ergonomics Transition | Desktop wide split-map experience verification vs Mobile touch-first dock & bottom sheet verification | Medium |
| 5 | Boundary & Edge Resilience | Empty searches, extreme radius, insufficient wallet funds, invalid UPI syntax, rapid filters | High |

## Coverage Thresholds
- Tier 1: Feature Coverage (>= 25 test assertions across components & logic)
- Tier 2: Boundary & Corner Cases (>= 25 boundary conditions tested)
- Tier 3: Cross-Feature Interactions (>= 15 interaction combinations tested)
- Tier 4: Real-World Scenarios (5 complete end-to-end user journeys)
- Expected Total: >= 70 comprehensive test assertions

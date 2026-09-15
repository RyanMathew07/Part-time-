# Orchestrator Plan: shadcn/ui Component Migration & Polish

## Objective
Refactor and standardize all UI elements across the PART-TIME marketplace application to use shadcn/ui components conforming to the configured base-luma preset, fixing all type, style, and integration issues across the codebase.

## Step-by-Step Plan

### Step 1: Survey & Specification Extraction (Phase 0)
- Dispatch 3 Explorers / Spec Miners in parallel:
  1. `spec_miner_luma`: Investigate `components.json`, Tailwind config, packages (`@hugeicons/react`, Base UI primitives), and extract base-luma preset specifications, component schemas, and architectural guidelines.
  2. `explorer_ui_primitives`: Audit `@/components/ui/` directory. Check existing primitives, missing primitives required by acceptance criteria (buttons, inputs, dialogs, sheets, cards, tabs, sliders, badges, avatars), base-luma compliance, and Hugeicons usage.
  3. `explorer_views_audit`: Audit all views across discovery, radar, lifecycle, chat, wallet, employer, and layout. Identify all raw HTML elements needing replacement with shadcn components, icon discrepancies, and type/style issues.
- Outputs: Detailed survey reports in respective agent folders.

### Step 2: Survey Synthesis & Decomposition (Phase 1)
- Synthesize the 3 survey reports.
- Update `PROJECT.md` Feature Inventory with the new shadcn migration tasks.
- Define explicit milestones and file write boundaries.

### Step 3: Implementation Track (Phase 2)
- Worker implementation:
  - Migrate and build missing/updated shadcn primitives in `@/components/ui` adhering to `base-luma` and Base UI.
  - Standardize all icons to `@hugeicons/react`.
  - Refactor all feature views to use the shadcn components (eliminate raw unstyled HTML).
  - Resolve all TypeScript compilation errors and styling regressions.
  - Verify that full shift lifecycle, OTP 6767 check-in, map inspection, and UPI cashout remain 100% operational.
  - Execute `npm run build` and test suites to verify zero errors.

### Step 4: Verification & Gating (Phase 3)
- Dispatch 2 independent Reviewers:
  - Reviewer 1: Architecture, Type Safety, base-luma preset & Hugeicons compliance.
  - Reviewer 2: Functional UX, shift lifecycle flow, dual viewport responsiveness.
- Dispatch 2 Challengers:
  - Challenger 1: Build verification, automated test suite run, and state transitions.
  - Challenger 2: Ergonomics, responsive layout integrity, zero unstyled elements.
- Dispatch Forensic Auditor:
  - Verify genuine implementation, absence of hardcoded bypasses or facades.
- Gate evaluation in `GATE_STATUS.md`.

### Step 5: Handoff & Completion (Phase 4)
- Document final status in `handoff.md`.
- Notify parent / sentinel via `send_message`.

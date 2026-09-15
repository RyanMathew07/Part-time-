# Context for worker_luma_2 (Replacement Worker)

## Situation
`worker_luma` completed Tasks 1-4 and Clusters 1-3 (18 files total: primitives, ThemeToggle, SearchBar, CategoryPills, WageTierFilter, ShiftCard, ShiftFeed, RadarCanvas, RadiusControl, ShiftInspector, OtpBanner, ActiveShiftTracker, ApplyModal, ChatView, QuickActionChips, WalletCard, CashoutModal, TransactionHistory, PostShiftModal, and Header.tsx), but stalled while finishing Cluster 4.
You are the replacement worker starting from this state.

## Remaining Tasks
1. Complete Cluster 4 remaining layout files:
   - `components/layout/NavigationSidebar.tsx`: Standardize with Hugeicons and shadcn `Button`, `Badge`.
   - `components/layout/BottomDock.tsx`: Standardize with Hugeicons, ensure >=44px touch targets.
   - `components/layout/DesktopLayout.tsx` & `MobileLayout.tsx`: Standardize modal containers / layout wrappers.
   - `components/layout/AccountModal.tsx` (if present) / any remaining layout files.
   - Check `app/layout.tsx` and `app/page.tsx` for any remaining `lucide-react` icons.
2. Check for any remaining `lucide-react` imports across all `components/` and `app/` files. All UI views must use `@hugeicons/react`.
   CRITICAL INVARIANT: DO NOT remove `lucide-react` from `package.json` (required for test assertion T1.05 in `tests/tier1-smoke.test.js`).
3. Check for any remaining unstyled raw HTML elements (`<button>`, `<select>`, `<textarea>`, `<img>`, raw spans) and replace with shadcn equivalents (`Button`, `Select`, `Textarea`, `Avatar`, `Badge`).
4. Update `PROJECT.md` at project root with Features 29-32 and Milestone M7.
5. Verification:
   - `npx tsc --noEmit` -> 0 errors.
   - `npm run build` -> Exit code 0, clean build.
   - `node tests/run-all-tests.js` -> 134/134 assertions pass (100%).
6. Deliver handoff report:
   `d:/Documents/Antigravity/Part time/.agents/worker_luma_2/handoff.md`

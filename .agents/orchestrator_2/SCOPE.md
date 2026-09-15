# Scope: Milestone M7 — base-luma shadcn/ui Migration & Polish

## Architecture
- **Preset**: `base-luma` (preset code `b1VlJAwK`), `@base-ui/react` v1.8.0 primitives, `@hugeicons/react` v1.1.10 renderer with `@hugeicons/core-free-icons` v4.3.3.
- **Styling Tokens**: Tailwind CSS v3.4.14 with `tw-animate-css` plugin, high-radius soft pill geometry (`rounded-4xl`, `rounded-3xl`), dynamic CSS variable color references (`var(--primary)`, `var(--secondary)`).
- **Icon Strategy**: Standardize all 24 view components and layout elements on `@hugeicons/react` with `<HugeiconsIcon icon={...} />`. Retain `lucide-react` in `package.json` to satisfy test assertion T1.05.
- **Primitive Engine**: Headless Base UI (`@base-ui/react`), using `render` prop for composition (not `asChild`) and `nativeButton={false}` on non-button trigger overrides.

## Feature Inventory
| # | Feature | Description | Milestone | Source |
|---|---------|-------------|-----------|--------|
| 29 | base-luma UI Primitives Tailwind v3 Compatibility | Fix `card.tsx` gap/padding vars, `slider.tsx` single-value scalar handling, `separator.tsx` / `tabs.tsx` orientation data-attributes, `badge.tsx` svg sizing, and register `tw-animate-css` in `tailwind.config.ts` | M7 | spec_miner_luma & explorer_ui_primitives |
| 30 | Missing UI Primitives (`textarea`, `select`, `switch`) | Create `components/ui/textarea.tsx`, `components/ui/select.tsx`, and `components/ui/switch.tsx` using `@base-ui/react` and `base-luma` styling tokens | M7 | explorer_ui_primitives |
| 31 | Hugeicons Standardization across Views | Replace all 46 legacy `lucide-react` icons across 24 view and layout files with `@hugeicons/core-free-icons` and `HugeiconsIcon` | M7 | explorer_views_audit |
| 32 | Raw HTML Element Replacement | Replace raw unstyled `<button>`, `<select>`, `<textarea>`, `<img>`, raw badge spans, and raw custom modal/card containers with shadcn components | M7 | explorer_views_audit |

## Milestones
| # | Name | Scope | Dependencies | Status |
|---|------|-------|-------------|--------|
| M7 | base-luma shadcn/ui Migration & Polish | Primitives fixes, missing primitives, Hugeicons migration, raw HTML replacement, build & test verification | M1-M6 | IN_PROGRESS |

## Sub-Milestones / Work Items for M7
1. **M7.1 - Configuration & Primitive Fixes**:
   - In `tailwind.config.ts`: Add `plugins: [require('tw-animate-css')]`, map `primary` to `var(--primary)` and `secondary` to `var(--secondary)`.
   - In `components/ui/card.tsx`: Replace Tailwind v4 `--spacing` variables with standard Tailwind v3 classes (`gap-6 data-[size=sm]:gap-4`, `p-6 data-[size=sm]:p-4`).
   - In `components/ui/slider.tsx`: Fix single scalar value handling and unbracketed orientation selectors.
   - In `components/ui/separator.tsx` & `tabs.tsx`: Replace `data-horizontal`/`data-vertical` with `data-[orientation=horizontal]` and `data-[orientation=vertical]`.
   - In `components/ui/badge.tsx`: Replace `[&>svg]:size-3!` with `[&>svg]:size-3`.
   - Create `components/ui/textarea.tsx`, `components/ui/select.tsx`, and `components/ui/switch.tsx`.
   - Update `components/ui/ThemeToggle.tsx` to use the new `Switch` primitive and Hugeicons (`Sun01Icon`, `Moon01Icon`).

2. **M7.2 - Discovery & Radar Views Migration**:
   - `components/discovery/SearchBar.tsx`: Use `Input`, `Button`, `Search01Icon`, `Cancel01Icon`.
   - `components/discovery/CategoryPills.tsx`: Use `Button` (or `Badge`), Hugeicons for categories.
   - `components/discovery/WageTierFilter.tsx`: Use `Button` / `Badge` variants.
   - `components/discovery/ShiftCard.tsx`: Use `Card`, `CardHeader`, `CardTitle`, `CardDescription`, `CardContent`, `CardFooter`, `Badge`, `Avatar`, `Button`, Hugeicons.
   - `components/discovery/ShiftFeed.tsx`: Standardize layout and empty states.
   - `components/radar/RadarCanvas.tsx`: Retain canvas logic, standardize labels/badges and Hugeicons (`Target01Icon`, `Location01Icon`).
   - `components/radar/RadiusControl.tsx`: Use shadcn `Slider` and `Badge`.
   - `components/radar/ShiftInspector.tsx`: Use shadcn `Sheet` / `Card`, `Badge`, `Button`, Hugeicons.

3. **M7.3 - Lifecycle, Chat, Wallet & Employer Views Migration**:
   - `components/lifecycle/OtpBanner.tsx`: Use `Card`, `Badge`, `Button`, Hugeicons (`Key01Icon`, `Copy01Icon`, `Tick01Icon`).
   - `components/lifecycle/ActiveShiftTracker.tsx`: Use `Card`, `Badge`, `Button`, Hugeicons.
   - `components/lifecycle/ApplyModal.tsx`: Use shadcn `Dialog`, `DialogContent`, `DialogHeader`, `DialogFooter`, `Button`, `Badge`.
   - `components/chat/ChatView.tsx`: Use `Card`, `Avatar`, `AvatarImage`, `AvatarFallback`, `Input`, `Button`, Hugeicons.
   - `components/chat/QuickActionChips.tsx`: Use shadcn `Button` variants (`outline` / `secondary`).
   - `components/wallet/WalletCard.tsx`: Use `Card`, `Badge`, `Button`, Hugeicons (`Wallet01Icon`, `ArrowUpRight01Icon`, `ShieldTickIcon`).
   - `components/wallet/CashoutModal.tsx`: Use shadcn `Dialog`, `Input`, `Button`, `Badge`, Hugeicons.
   - `components/wallet/TransactionHistory.tsx`: Use `Card`, `Badge`, Hugeicons.
   - `components/employer/PostShiftModal.tsx`: Use shadcn `Dialog`, `Input`, `Textarea`, `Select`, `Button`.

4. **M7.4 - Layouts, Navigation & Root Pages Migration**:
   - `components/layout/Header.tsx`: Use `Avatar`, `Badge`, `Button`, `ThemeToggle`, Hugeicons.
   - `components/layout/NavigationSidebar.tsx`: Use `Button`, `Badge`, Hugeicons.
   - `components/layout/BottomDock.tsx`: Standardize buttons (>=44px touch targets), `Badge`, Hugeicons.
   - `components/layout/DesktopLayout.tsx` & `MobileLayout.tsx`: Standardize layout containers and modals.
   - `app/layout.tsx` & `app/page.tsx`: Standardize header/main wrappers and any remaining icons.

5. **M7.5 - Quality & Verification Gate**:
   - Run `npx tsc --noEmit` -> 0 errors.
   - Run `npm run build` -> Exit code 0, clean build.
   - Run `node tests/run-all-tests.js` -> 134/134 assertions passing (100%).
   - Verify zero unstyled raw HTML elements remain.
   - Verify all 24 views exclusively import Hugeicons.
   - Dual-reviewer, dual-challenger, and forensic auditor inspection.

# Feature Views & Icons Audit Report

## 1. Observation

A comprehensive audit was performed across all 25 view files, layouts, and modals in `components/discovery/`, `components/radar/`, `components/lifecycle/`, `components/chat/`, `components/wallet/`, `components/employer/`, `components/layout/`, `components/ui/`, and `app/`.

### 1.1 Command Executions & Baseline Status
- **Automated Test Suite**:
  Command: `npm test` (`node tests/run-all-tests.js`)
  Result: `134/134` assertions passed (100.0% rate across Tiers 1-4).
  - Tier 1: Feature & Syntax Smoke Tests (40/40 passed)
  - Tier 2: Boundary & Viewport Layout Tests (31/31 passed)
  - Tier 3: Cross-Feature Integration Tests (30/30 passed)
  - Tier 4: Real-World User Scenarios (33/33 passed)
- **TypeScript Static Verification**:
  Command: `npx tsc --noEmit`
  Result: Exit code 0, 0 compilation errors across the entire codebase.

---

### 1.2 Icon Audit: Lucide-React, Inline SVGs & Emoji Usage
Every single feature view currently imports from `lucide-react`. Exactly 24 view files import Lucide icons, totaling 46 unique icon components. Zero feature views currently import `@hugeicons/react` or `@hugeicons/core-free-icons` (only `components/ui/dialog.tsx` and `components/ui/sheet.tsx` currently import `HugeiconsIcon` and `Cancel01Icon`).

#### File-by-File Icon Inventory
| # | File Path | Current Lucide / SVG / Emoji Icons | Verified Hugeicons Replacement (`@hugeicons/core-free-icons`) |
|---|-----------|-----------------------------------|----------------------------------------------------------------|
| 1 | `components/discovery/CategoryPills.tsx:9-16` | `Sparkles`, `Coffee`, `Megaphone`, `Calendar`, `Boxes`, `ShoppingBag`, `Zap` | `SparklesIcon`, `Coffee01Icon`, `Megaphone01Icon`, `Calendar01Icon`, `PackageIcon`, `ShoppingBag01Icon`, `FlashIcon` |
| 2 | `components/discovery/SearchBar.tsx:4` | `Search`, `X` | `Search01Icon`, `Cancel01Icon` |
| 3 | `components/discovery/ShiftCard.tsx:10` | `Star`, `MapPin`, `Users`, `Zap`, `MessageSquare`, `ArrowUpRight`, `Clock` | `StarIcon`, `Location01Icon`, `UserGroupIcon`, `FlashIcon`, `Comment01Icon`, `ArrowUpRight01Icon`, `Clock01Icon` |
| 4 | `components/discovery/ShiftFeed.tsx:7` | `SearchX`, `RotateCcw` | `SearchRemoveIcon`, `RotateLeft01Icon` |
| 5 | `components/discovery/WageTierFilter.tsx:8` | `Coins` | `Coins01Icon` (or `IndianRupeeIcon`) |
| 6 | `components/radar/RadarCanvas.tsx:8` | `Compass`, `Navigation` | `Compass01Icon`, `Navigation01Icon` |
| 7 | `components/radar/RadiusControl.tsx:7` | `Radar` | `Radar01Icon` |
| 8 | `components/radar/ShiftInspector.tsx:10-19` | `X`, `Star`, `MapPin`, `Clock`, `Users`, `MessageSquare`, `ArrowUpRight`, `ShieldCheck`, `Zap` | `Cancel01Icon`, `StarIcon`, `Location01Icon`, `Clock01Icon`, `UserGroupIcon`, `Comment01Icon`, `ArrowUpRight01Icon`, `ShieldCheckIcon`, `FlashIcon` |
| 9 | `components/lifecycle/ActiveShiftTracker.tsx:11-14` | `Clock`, `ShieldCheck`, `CheckCircle2` | `Clock01Icon`, `ShieldCheckIcon`, `Tick02Icon` (or `CheckmarkCircle02Icon`) |
| 10 | `components/lifecycle/ApplyModal.tsx:15` | `MapPin`, `Clock`, `ArrowRight` | `Location01Icon`, `Clock01Icon`, `ArrowRight01Icon` |
| 11 | `components/lifecycle/OtpBanner.tsx:8` | `KeyRound`, `Copy`, `Check` | `Key01Icon`, `Copy01Icon`, `Tick02Icon` |
| 12 | `components/chat/ChatView.tsx:12-18` | `Send`, `Phone`, `ArrowLeft`, `Search`, `CheckCheck`, `Building` | `SentIcon` (or `Send01Icon`), `Call02Icon`, `ArrowLeft01Icon`, `Search01Icon`, `TickDouble02Icon`, `Building01Icon` |
| 13 | `components/chat/QuickActionChips.tsx:6,15-28` | `KeyRound`, `DollarSign`, `MapPin`, Emoji strings: `🔑`, `💰`, `📍` | `Key01Icon`, `Dollar01Icon` (or `Coins01Icon`/`IndianRupeeIcon`), `Location01Icon` |
| 14 | `components/wallet/CashoutModal.tsx:16-19,25-63` | `AlertCircle`, `ShieldCheck`, `ArrowRight`, 4 custom inline SVGs (GPay, PhonePe, Paytm, BHIM) | `AlertCircleIcon`, `ShieldCheckIcon`, `ArrowRight01Icon`. Standardize provider icons to Hugeicons payment symbols (e.g. `GoogleIcon`, `SmartPhone01Icon`, `CreditCardIcon`, `RupeeCircleIcon`) or retain styled branded SVG vectors |
| 15 | `components/wallet/TransactionHistory.tsx:7-13,20-34` | `ArrowDownLeft`, `ArrowUpRight`, `Coffee`, `Sparkles`, `Award`, `Receipt` | `ArrowDownLeft01Icon`, `ArrowUpRight01Icon`, `Coffee01Icon`, `SparklesIcon`, `Award01Icon`, `Invoice01Icon` (or `ReceiptIndianRupeeIcon`) |
| 16 | `components/wallet/WalletCard.tsx:10-15` | `Wallet`, `ArrowUpRight`, `ShieldCheck`, `CreditCard`, `Building` | `Wallet01Icon`, `ArrowUpRight01Icon`, `ShieldCheckIcon`, `CreditCardIcon`, `Building01Icon` |
| 17 | `components/employer/PostShiftModal.tsx:16-21` | `Clock`, `MapPin`, `Coins`, `Users`, `FileText` | `Clock01Icon`, `Location01Icon`, `Coins01Icon`, `UserGroupIcon`, `File01Icon` (or `Note01Icon`) |
| 18 | `components/layout/AccountModal.tsx:16-19` | `ShieldCheck`, `Star`, `Briefcase` | `ShieldCheckIcon`, `StarIcon`, `Briefcase01Icon` |
| 19 | `components/layout/BottomDock.tsx:8-13` | `Sparkles`, `Compass`, `MessageSquare`, `History`, `Wallet` | `SparklesIcon`, `Compass01Icon`, `Comment01Icon`, `Clock01Icon` (or `Clock02Icon`), `Wallet01Icon` |
| 20 | `components/layout/DesktopLayout.tsx:7,85,185` | `Compass`, `MapPin` | `Compass01Icon`, `Location01Icon` |
| 21 | `components/layout/Header.tsx:11-14` | `ShieldCheck`, `PlusCircle`, `KeyRound` | `ShieldCheckIcon`, `PlusSignCircleIcon` (or `AddCircleIcon`), `Key01Icon` |
| 22 | `components/layout/MobileLayout.tsx` | No direct Lucide imports (uses sub-components) | N/A |
| 23 | `components/layout/NavigationSidebar.tsx:11-21` | `Sparkles`, `Compass`, `MessageSquare`, `History`, `Wallet`, `PlusCircle`, `Volume2`, `VolumeX`, `ShieldCheck`, `Star` | `SparklesIcon`, `Compass01Icon`, `Comment01Icon`, `Clock01Icon`, `Wallet01Icon`, `PlusSignCircleIcon`, `VolumeHighIcon`, `VolumeMute01Icon`, `ShieldCheckIcon`, `StarIcon` |
| 24 | `components/layout/ToastContainer.tsx:6-13,19-42` | `KeyRound`, `Compass`, `Sun`, `Moon`, `Phone`, `DollarSign`, `CheckCircle2`, Emoji aliases: `'🔑'`, `'🧭'`, `'☀️'`, `'🌙'`, `'📞'`, `'💰'`, `'✅'` | `Key01Icon`, `Compass01Icon`, `Sun01Icon`, `Moon02Icon`, `Call02Icon`, `Dollar01Icon` (or `IndianRupeeIcon`), `Tick02Icon` |
| 25 | `components/ui/ThemeToggle.tsx:6,33-38,71-75,96-100,121-126` | `Sun`, `Moon` | `Sun01Icon`, `Moon02Icon` |

---

### 1.3 Raw HTML Elements vs shadcn/ui Component Inventory
The codebase has partially migrated some primitives (`Input`, `Button`, `Dialog`), but contains multiple instances of unstyled raw HTML elements and custom divs that should be replaced with shadcn/ui components (`Button`, `Input`, `Dialog`, `Sheet`, `Card`, `Tabs`, `Slider`, `Badge`, `Avatar`).

#### Detailed File-by-File Inventory:
1. **`components/radar/RadarCanvas.tsx`**:
   - **Line 175**: `<button key={job.id} onClick={() => handlePinClick(job)} style={{ left: \`${job.coords.x}%\`, top: \`${job.coords.y}%\` }} ...>`
     - *Issue*: Unstyled raw HTML `<button>` for map wage pins.
     - *Target*: Replace with shadcn `Button` (`variant="ghost"`, unstyled/custom pin classes).
   - **Line 165**: `<span className="mt-1 px-2 py-0.5 rounded-full bg-black/90 text-[9px] font-mono ...">You are here</span>`
     - *Issue*: Raw span badge.
     - *Target*: Replace with shadcn `Badge`.

2. **`components/radar/RadiusControl.tsx`**:
   - **Lines 28-44**: RADIUS_OPTIONS `[1, 5, 10, 25]` rendered as custom button chips inside a rounded pill div.
     - *Issue*: Custom tab/pill selector for radius distance.
     - *Target*: Can be standardized with shadcn `Tabs` (`TabsList`, `TabsTrigger`) or connected to shadcn `Slider` (`@/components/ui/slider`).

3. **`components/radar/ShiftInspector.tsx`**:
   - **Lines 68-73**: `<div className={isMobileDrawer ? '... rounded-t-3xl ...' : '... rounded-2xl ...'}>`
     - *Issue*: Custom drawer div for mobile slide-up sheet and custom card div for desktop.
     - *Target*: For mobile drawer, wrap with shadcn `Sheet` / `SheetContent` (`side="bottom"`). For desktop pane, wrap with shadcn `Card`.
   - **Lines 84-88**: `<img src={selectedJob.employerAvatar} alt={selectedJob.employer} className="w-12 h-12 rounded-full object-cover ..." />`
     - *Issue*: Raw HTML `<img>` avatar.
     - *Target*: Replace with shadcn `Avatar`, `AvatarImage`, `AvatarFallback`.
   - **Line 133**: `<span className="flex items-center gap-1 text-[11px] font-medium text-black dark:text-white">... Priority urgent</span>`
     - *Issue*: Raw span badge.
     - *Target*: Replace with shadcn `Badge` (`variant="default"`).
   - **Lines 143, 153, 161, 171, 181**: Multiple custom telemetry card divs (`p-3 rounded-2xl bg-[#efefef]...`).
     - *Target*: Standardize as sub-card items or `Card`.

4. **`components/discovery/ShiftCard.tsx`**:
   - **Lines 56-65**: `<div onClick={handleCardClick} className="group relative rounded-2xl p-5 ... bg-white dark:bg-[#161616] ...">`
     - *Issue*: Custom card container div.
     - *Target*: Replace with shadcn `Card` (`@/components/ui/card`).
   - **Lines 69-73**: `<img src={job.employerAvatar} alt={job.employer} className="w-11 h-11 rounded-2xl object-cover shrink-0 ..." />`
     - *Issue*: Raw HTML `<img>` avatar.
     - *Target*: Replace with shadcn `Avatar`, `AvatarImage`, `AvatarFallback`.

5. **`components/discovery/ShiftFeed.tsx`**:
   - **Lines 65-83**: `<div className="flex flex-col items-center justify-center py-12 px-4 text-center rounded-2xl bg-white border border-[#efefef] dark:bg-[#121212] dark:border-[#282828]">`
     - *Issue*: Custom empty state card div.
     - *Target*: Replace with shadcn `Card` (`CardContent`).

6. **`components/lifecycle/ActiveShiftTracker.tsx`**:
   - **Lines 43**: `<div className="w-full bg-white border border-[#efefef] dark:bg-[#121212] ... rounded-2xl p-4 shadow-sm ...">`
     - *Issue*: Custom card div for active shift tracking.
     - *Target*: Replace with shadcn `Card`.
   - **Line 84, 137**: Custom sub-card status blocks (`p-3.5 bg-[#f3f3f3] ... rounded-2xl`).
     - *Target*: Replace with `Card` / `CardContent`.

7. **`components/lifecycle/OtpBanner.tsx`**:
   - **Line 25**: `<div className="w-full bg-white border border-[#efefef] ... rounded-2xl p-4 md:p-5 ...">`
     - *Issue*: Custom card container.
     - *Target*: Replace with shadcn `Card`.

8. **`components/wallet/CashoutModal.tsx`**:
   - **Lines 195-201**:
     ```tsx
     <button
       type="button"
       onClick={handleFullBalance}
       className="text-black dark:text-white font-medium hover:underline text-xs"
     >
       Full balance ({formatCurrency(wallet.balance)})
     </button>
     ```
     - *Issue*: Raw unstyled HTML `<button>`.
     - *Target*: Replace with shadcn `Button` (`variant="link"` / `variant="ghost"` with custom padding).
   - **Lines 257, 264**: Error and zero-fee guarantee custom divs (`p-3 rounded-2xl bg-[#efefef]...`).
     - *Target*: Standardize styling with `Card` or alert container.

9. **`components/wallet/TransactionHistory.tsx`**:
   - **Line 38**: `<div className="w-full bg-white border border-[#efefef] ... rounded-2xl p-5 shadow-sm ...">`
     - *Issue*: Custom card container.
     - *Target*: Replace with shadcn `Card`, `CardHeader`, `CardContent`.
   - **Line 84**: `<span className="text-[10px] font-mono font-medium px-2.5 py-0.5 rounded-full bg-[#efefef] text-[#5e5e5e] dark:bg-[#1a1a1a] dark:text-[#afafaf]">{tx.status}</span>`
     - *Issue*: Raw span status badge.
     - *Target*: Replace with shadcn `Badge` (`variant="secondary"`).
   - **Line 63**: `<div className="w-9 h-9 rounded-full flex items-center justify-center shrink-0 bg-[#efefef] ...">`
     - *Target*: Standardize as `Avatar` / `AvatarFallback`.

10. **`components/wallet/WalletCard.tsx`**:
    - **Line 26**: `<div className="relative w-full rounded-2xl p-6 bg-black text-white dark:bg-[#121212] ...">`
      - *Issue*: Custom holographic balance card div.
      - *Target*: Replace with shadcn `Card`.

11. **`components/employer/PostShiftModal.tsx`**:
    - **Lines 135-146**:
      ```tsx
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value as CategoryType)}
        className="w-full px-4 py-2.5 bg-[#efefef] text-black text-xs rounded-full border border-transparent focus:outline-none focus:border-black dark:bg-[#1a1a1a] dark:text-white dark:focus:border-white transition-colors duration-150 ease-out"
      >
        {CATEGORY_OPTIONS.map((opt) => (
          <option key={opt.id} value={opt.id} className="bg-white text-black dark:bg-[#121212] dark:text-white">
            {opt.label}
          </option>
        ))}
      </select>
      ```
      - *Issue*: Raw unstyled HTML `<select>` with `<option>`.
      - *Target*: Standardize using shadcn Select component or base-luma styled select/tabs.
    - **Lines 220-226**:
      ```tsx
      <textarea
        rows={2}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Brief shift responsibilities, dress code, refreshments..."
        className="w-full px-4 py-2.5 bg-[#efefef] text-black placeholder-[#afafaf] text-xs rounded-2xl border border-transparent focus:outline-none focus:border-black resize-none dark:bg-[#1a1a1a] dark:text-white dark:placeholder-[#707070] dark:focus:border-white transition-colors"
      />
      ```
      - *Issue*: Raw HTML `<textarea>`.
      - *Target*: Replace with shadcn `Textarea` or styled input primitive.

12. **`components/layout/BottomDock.tsx`**:
    - **Line 69**: `<span className="absolute -top-1.5 -right-2.5 px-1.5 py-0.2 rounded-full bg-black dark:bg-white text-white dark:text-black text-[9px] font-mono font-medium leading-tight">{tab.unread}</span>`
      - *Issue*: Raw span badge for unread chat count.
      - *Target*: Replace with shadcn `Badge`.

13. **`components/layout/NavigationSidebar.tsx`**:
    - **Lines 202-215**:
      ```tsx
      <button
        onClick={toggleSound}
        aria-label={`Sound ${soundEnabled ? 'on' : 'off'}`}
        className="flex items-center gap-1.5 hover:text-black dark:hover:text-white transition-colors"
      >
      ...
      </button>
      ```
      - *Issue*: Raw unstyled HTML `<button>`.
      - *Target*: Replace with shadcn `Button` (`variant="ghost"`, size sm/xs).

14. **`components/layout/DesktopLayout.tsx` & `MobileLayout.tsx`**:
    - `DesktopLayout.tsx:117-149` and `MobileLayout.tsx:90-117`:
      - *Issue*: Recent activity item cards and status tags:
        `<span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-mono font-medium mt-1 ...">{act.status}</span>`
      - *Target*: Replace with shadcn `Card` and shadcn `Badge`.
    - `DesktopLayout.tsx:54` & `MobileLayout.tsx:45`: Search & Filter box `div className="flex flex-col gap-3.5 p-5 bg-white ... rounded-2xl"`.
      - *Target*: Standardize as `Card`.

15. **`components/ui/ThemeToggle.tsx`**:
    - **Line 51**: `<button type="button" role="switch" ...>` (custom full switch).
    - **Line 85**: `<button type="button" role="switch" ...>` (custom compact switch).
      - *Issue*: Raw HTML `<button>` switch implementations.
      - *Target*: Standardize on shadcn `Button` or base-ui Switch primitive.

---

### 1.4 Core Marketplace Workflow & Preservation Contracts

#### 1. Shift Search & Filtering
- **Components Involved**: `SearchBar.tsx`, `CategoryPills.tsx`, `WageTierFilter.tsx`, `ShiftFeed.tsx`.
- **State Hooks**:
  - `searchQuery` & `setSearchQuery(q: string)`
  - `selectedCategory` & `setSelectedCategory(cat: CategoryType)`
  - `selectedWageTier` & `setSelectedWageTier(tier: WageTierType | null)`
  - `radarRadiusKm` & `setRadarRadiusKm(r: number)`
  - `jobs: JobShift[]`: Filtered dynamically by `searchQuery`, `selectedCategory`, `selectedWageTier`, and `distanceKm <= radarRadiusKm`.
- **Preservation Contract**:
  - `SearchBar`: Must clear query on `handleClear()`, play `sounds.playTap()`, and maintain `aria-label="Clear search"`.
  - `CategoryPills`: Categories array `['All', 'Cafe', 'Promotion', 'Events', 'Logistics', 'Retail', 'Delivery']`. Clicking sets category and plays tap sound.
  - `WageTierFilter`: Tiers `[100, 500, 1000, 10000]`. Clicking toggles tier on/off (`null`).
  - `ShiftFeed`: Displays `jobs.length` and active filter count. "Reset filters" resets search to `''`, category to `'All'`, and wage tier to `null`.

#### 2. Interactive Radar Map Inspection & Radius Slider
- **Components Involved**: `RadarCanvas.tsx`, `RadiusControl.tsx`, `ShiftInspector.tsx`.
- **Canvas Physics & Coordinates**:
  - Canvas renders concentric rings scaled to `radarRadiusKm` (1, 5, 10, 25 km) with scanning radar sweep.
  - Wage pins are mapped from `job.coords.x%` and `job.coords.y%`.
- **Preservation Contract**:
  - Clicking a pin calls `handlePinClick(job)`: plays tap sound and updates `setSelectedJob(job)`.
  - Selected pin highlights with `scale-110 z-20` and distinct border.
  - `RadiusControl`: Must support selecting 1, 5, 10, 25 km, call `setRadarRadiusKm`, and show toast `"Radar radius set to X km"`.
  - `ShiftInspector`: Renders details for `selectedJob`. Quick apply button triggers `setIsApplyModalOpen(true)`. Chat hirer button resolves corresponding chat in `chats` by employer name, sets `setActiveChatId`, and switches `activeTab` to `'chat'`.

#### 3. Attendance Check-in Handshake with OTP 6767
- **Components Involved**: `OtpBanner.tsx`, `ActiveShiftTracker.tsx`, `Header.tsx`, `ChatView.tsx`, `QuickActionChips.tsx`.
- **State Hooks**:
  - `user.activeOtp`: `'6767'`
  - `activeShift: ActiveShift | null`
  - `verifyCheckIn(pin: string): boolean`: Validates PIN === `'6767'`. On success sets `isCheckedIn = true`, starts active shift timer, plays success sound, shows toast `"Handshake verified! On-site check-in complete."`.
  - `completeShift(jobId: string, wage: number): void`: Completes active shift, adds wage to `wallet.balance`, appends credit transaction to `wallet.transactions`, clears active shift.
- **Preservation Contract**:
  - `OtpBanner`: Copying code copies `'6767'` to clipboard, plays tap sound, displays `"Universal PIN 6767 copied to clipboard!"` toast.
  - `ActiveShiftTracker`: Must support both quick verify (`verifyCheckIn('6767')`) and manual 4-digit input (`pinInput`). Upon completion, calls `completeShift`.
  - `Header` Dynamic Island: When `activeShift` is present, clicking copies PIN 6767 to clipboard.
  - `QuickActionChips`: Clicking `"Share PIN 6767"` sends message `"Here is my Universal Check-in PIN: 6767"` which triggers automated employer reply.

#### 4. Simulated UPI Cashout in Holographic Wallet
- **Components Involved**: `WalletCard.tsx`, `CashoutModal.tsx`, `TransactionHistory.tsx`.
- **State Hooks**:
  - `wallet: WalletState` (`balance`, `currency`, `upiId`, `linkedBank`, `transactions`)
  - `cashoutWallet(amount: number, upiId: string, provider: string): { success: boolean; message: string }`: Validates `amount > 0`, `amount <= wallet.balance`, `isValidUpiId(upiId)`. On success, subtracts balance, records debit transaction, plays cashout chime sound, shows toast, closes modal.
- **Preservation Contract**:
  - `CashoutModal`: Must support selecting payment rail (`'Google Pay'`, `'PhonePe'`, `'Paytm'`, `'BHIM UPI'`).
  - Presets: `₹100`, `₹250`, `₹500`, `₹1000`, and "Full balance" shortcut.
  - Validation: Real-time validation preventing submission of amounts > `wallet.balance` or invalid UPI addresses.

#### 5. +HIRE Shift Creation
- **Components Involved**: `PostShiftModal.tsx`, `Header.tsx`, `NavigationSidebar.tsx`.
- **State Hooks**:
  - `addJob(jobData: Omit<JobShift, 'id'>)`: Adds new shift to `allJobs` with unique ID, randomized valid coordinates (22-77%), and urgent badge.
  - Form fields: `title`, `category`, `wage`, `duration`, `slots`, `location`, `description`.
- **Preservation Contract**:
  - Validation: Requires non-empty `title`, `wage > 0`, non-empty `location`.
  - Form submission calls `addJob`, plays success sound, shows toast, and resets fields. Newly added shift immediately appears in feed and radar canvas.

#### 6. Dual Viewport Layout & Touch Ergonomics
- **Components Involved**: `ViewportRouter.tsx`, `DesktopLayout.tsx`, `MobileLayout.tsx`, `BottomDock.tsx`.
- **Preservation Contract**:
  - Breakpoint: `lg` (1024px). Desktop (`>= 1024px`) renders full-width 3-column marketplace dashboard with persistent `NavigationSidebar`, central scrollable feed, and split-pane interactive `RadarCanvas` + `ShiftInspector`. No phone device frames.
  - Mobile (`< 1024px`): Renders edge-to-edge layout with `BottomDock` sticky navigation tabs (Home, Map, Chat, Recent, Wallet), slide-up drawer for `ShiftInspector`, and `pb-24` viewport padding.
  - Touch Targets: Every interactive button, pill, input, and dock item on mobile must maintain `>= 44x44px` touch targets (Apple HIG compliance).

---

## 2. Logic Chain

1. **Step 1 (Icon Consistency Assessment)**:
   - *Observation*: 24 files import from `lucide-react`, while only 2 primitive files (`dialog.tsx`, `sheet.tsx`) import from `@hugeicons/react` and `@hugeicons/core-free-icons`.
   - *Reasoning*: The project requirements mandate standardizing all icons across the codebase to `@hugeicons/react`. Retaining `lucide-react` across all 24 feature views creates visual inconsistency and dual icon bundle bloat.
   - *Actionable Conclusion*: All 46 Lucide icons must be migrated to their exact `@hugeicons/core-free-icons` counterparts using the `<HugeiconsIcon icon={IconSymbol} />` pattern.

2. **Step 2 (Component Library Standardization Assessment)**:
   - *Observation*: Unstyled raw HTML elements were identified: `<button>` in `RadarCanvas.tsx`, `CashoutModal.tsx`, `NavigationSidebar.tsx`, `ThemeToggle.tsx`; `<select>` and `<textarea>` in `PostShiftModal.tsx`; raw `<img>` tags in `ShiftCard.tsx` and `ShiftInspector.tsx`; raw `<span>` badges in `BottomDock.tsx`, `TransactionHistory.tsx`, `DesktopLayout.tsx`, `MobileLayout.tsx`, and `RadarCanvas.tsx`; and custom card/drawer divs in `ShiftCard.tsx`, `ShiftFeed.tsx`, `ActiveShiftTracker.tsx`, `ShiftInspector.tsx`, `WalletCard.tsx`, and `TransactionHistory.tsx`.
   - *Reasoning*: The project architecture specifies shadcn/ui components (`Button`, `Input`, `Dialog`, `Sheet`, `Card`, `Tabs`, `Slider`, `Badge`, `Avatar`) conforming to the `base-luma` preset. Using raw HTML tags bypasses design token inheritance, accessibility attributes, and base-ui focus ring behaviors.
   - *Actionable Conclusion*: Each of the identified raw HTML elements must be replaced by its corresponding shadcn/ui primitive.

3. **Step 3 (Interaction & State Preservation Assessment)**:
   - *Observation*: All 6 core workflows (`search/filter`, `radar/radius`, `OTP 6767 check-in`, `wallet cashout`, `+HIRE posting`, and `dual-viewport navigation`) rely directly on `useMarketplace()` context hooks, specific event handlers (`e.stopPropagation()`), audio feedback (`sounds.playTap()`, `playSuccess()`, `playCashout()`), and exact string matchers (`"Here is my Universal Check-in PIN: 6767"`).
   - *Reasoning*: Replacing raw elements with shadcn components must not break form event signatures, click propagation guards, or automated message trigger patterns in the chat system.
   - *Actionable Conclusion*: Implementers must preserve the defined interface contracts and prop bindings during the UI component migration.

4. **Step 4 (Build & TypeScript Safety Assessment)**:
   - *Observation*: `npx tsc --noEmit` and `npm test` execute cleanly with 0 errors and 134/134 passing assertions.
   - *Reasoning*: The existing codebase has strict type definitions and clean contracts.
   - *Actionable Conclusion*: Any migration to `@hugeicons/react` and shadcn primitives must preserve this 0-error type safety and 100% test pass rate.

---

## 3. Caveats

1. **Brand SVGs in CashoutModal**: The UPI rail selector in `CashoutModal.tsx` currently uses customized inline SVGs with authentic brand colors for Google Pay, PhonePe, and Paytm. Replacing these with generic Hugeicons financial icons (`SmartPhone01Icon`, `CreditCardIcon`, `RupeeCircleIcon`) is an option, but retaining the crisp branded SVGs (wrapped in accessible containers) preserves superior visual fidelity. Both options are documented.
2. **PostShiftModal Form Controls**: The `<select>` element in `PostShiftModal.tsx` currently functions natively with 6 categories. Replacing it with a custom shadcn `Select` requires ensuring that form state bindings and mobile dropdown behavior remain smooth on touch screens.
3. **Canvas Animation Loop in RadarCanvas**: `RadarCanvas.tsx` uses an internal `requestAnimationFrame` canvas render loop for the concentric sweep. While the wage pin buttons overlaying the canvas should use shadcn `Button`, the underlying 2D HTML5 canvas itself must remain untouched to preserve sweep performance.

---

## 4. Conclusion

The views and UI architecture are functional and well-structured, but contain significant opportunities for UI standardization:
1. **24 feature view files** require icon migration from `lucide-react` to `@hugeicons/react` / `@hugeicons/core-free-icons`.
2. **15 distinct component areas** contain unstyled raw HTML elements (`<button>`, `<select>`, `<textarea>`, `<img>`, raw span badges, custom modal/card divs) that should be replaced with shadcn `Button`, `Input`, `Dialog`, `Sheet`, `Card`, `Tabs`, `Badge`, and `Avatar`.
3. All 6 core marketplace workflows and touch target standards (>=44px) have verified contracts and must be strictly preserved during the component refactoring.

---

## 5. Verification Method

To independently verify all findings and confirm that subsequent refactoring maintains system integrity:

1. **Verify Icon Imports Across Views**:
   ```powershell
   Get-ChildItem -Path components, app -Recurse -Include *.tsx, *.ts | Select-String -Pattern "from 'lucide-react'"
   ```
   *Expected Current Output*: 24 files importing from `lucide-react`.
   *Target Output After Migration*: 0 files importing from `lucide-react`.

2. **Verify Hugeicons Imports**:
   ```powershell
   Get-ChildItem -Path components, app -Recurse -Include *.tsx, *.ts | Select-String -Pattern "from '@hugeicons/react'"
   ```
   *Target Output After Migration*: All view components import `HugeiconsIcon` from `@hugeicons/react` and icon definitions from `@hugeicons/core-free-icons`.

3. **Verify TypeScript Compilation**:
   ```powershell
   npx tsc --noEmit
   ```
   *Expected Output*: Exit code 0, 0 errors.

4. **Verify Automated Test Suite (134 Assertions across Tiers 1-4)**:
   ```powershell
   npm test
   ```
   *Expected Output*:
   - Tier 1: Feature & Syntax Smoke Tests (40/40 PASS)
   - Tier 2: Boundary & Viewport Layout Tests (31/31 PASS)
   - Tier 3: Cross-Feature Integration Tests (30/30 PASS)
   - Tier 4: Real-World User Scenarios (33/33 PASS)
   - 100% assertions passed.

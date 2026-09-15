# Comprehensive Prototype Survey & Architectural Migration Report
**Project**: PART-TIME Marketplace Rebuild  
**Investigator**: Explorer 1 (`explorer_survey_1`)  
**Target Specification**: Next.js App Router, TypeScript, Tailwind CSS (`ORIGINAL_REQUEST.md`)  
**Date**: 2026-09-14  

---

## 1. Executive Summary

The existing prototype is a single-page vanilla web application constructed across four main files: `index.html` (637 lines), `app.js` (930 lines), `data.js` (393 lines), and `styles.css` (2,161 lines). While it successfully prototypes the functional mechanics of a hyper-local shift marketplace—including keyword search, category filtering, an interactive radar map with job pins, universal check-in PIN verification (`OTP 6767`), a holographic wallet with instant UPI cashout, employer vacancy posting (`+HIRE`), and multi-contact simulated chat—its architectural realization suffers from fundamental structural limitations that prevent it from functioning as a true dual-experience web product.

Specifically:
1. **Phone Frame Dependency**: The desktop UI is trapped inside an artificial iPhone 15 Pro Max titanium chassis (`.iphone-wrapper`, `.device-frame` at 430px wide) with fake physical hardware buttons and an expand toggle that merely widens the frame to 1,060px. There are zero CSS `@media` responsive breakpoints.
2. **Imperative DOM Mutation**: The application manages state via a single mutable global object (`state` in `app.js:5-21`) and manually wipes and rewrites inner HTML chunks (`grid.innerHTML = ...`), producing fragile DOM lifecycle coupling.
3. **Aesthetic Misalignment**: The styling relies heavily on saturated glowing multi-colored gradients, liquid background orbs, and skeuomorphic iOS hardware replicas ("Liquid Glassmorphism"), diverging from the desired **Uber-dominant utility aesthetic elevated by Apple tactile iOS gestures and Raycast dark-precision styling**.

This report catalogs all data models, user flows, business logic calculations, and DOM structures, providing a strict blueprint for migration to a modern, type-safe Next.js App Router application.

---

## 2. Legacy File Matrix & Inventory

| File Path | Lines | File Size | Primary Responsibility & Contents |
| :--- | :--- | :--- | :--- |
| `data.js` | 393 | 12.8 KB | Canonical seed mock data: `INITIAL_DATA` containing `user`, `wallet`, `jobs` (6 shift entries), `chats` (4 threads), `recentActivities` (4 records), and `notifications` (4 items). |
| `index.html` | 637 | 35.1 KB | Single-page layout containing the iPhone frame chassis, dynamic island, app header, KYC status banner, 5 main view panels (`#view-home`, `#view-map`, `#view-chat`, `#view-recent`, `#view-wallet`), 5-tab bottom dock, and 6 modal overlays. |
| `app.js` | 930 | 33.8 KB | Runtime state manager, Web Audio API procedural sound synthesizer (`SoundEngine`), view tab switcher, DOM rendering functions, event listeners, form handlers, and simulated bot chat replies. |
| `styles.css` | 2,161 | 49.5 KB | Monolithic CSS containing design tokens (`:root`, `[data-theme="light"]`), fluid ambient orb animations, hardware button styling, card glassmorphism, radar animations, modal overlays, and toast keyframes. |

---

## 3. Data Models & Entity Schemas

From `data.js` and `app.js`, the product operates on seven distinct data entities:

### 3.1 `User` Entity
Represents the logged-in profile (defaults to Alex Chen, verified student/freelancer):
```typescript
interface UserProfile {
  name: string;                   // "Alex Chen"
  role: string;                   // "Freelance Specialist & Shift Worker"
  userType: "employee" | "employer"; // Active operational mode
  avatar: string;                 // Unsplash portrait URL
  phone: string;                  // "+91 98765 43210"
  email: string;                  // "alex.chen@parttime.io"
  upiId: string;                  // "alexchen@okaxis"
  age: number;                    // 22 (enforces Age >= 18 rule)
  isAgeVerified: boolean;         // true
  kycStatus: "verified" | "pending" | "unverified";
  kycIdType: string;              // "Aadhaar Card (Verified)"
  kycDocNumber: string;           // "•••• •••• 8839"
  hourlyRateRange: {
    min: number;                  // 250 (₹)
    max: number;                  // 1200 (₹)
  };
  skills: string[];               // ["Barista & Brewing", "Event Management", ...]
  activeOtp: string;              // "6767"
  completedGigsCount: number;     // 28
  rating: number;                 // 4.95
}
```

### 3.2 `Job` / `ShiftVacancy` Entity
Represents open shift postings in the marketplace:
```typescript
interface JobShift {
  id: string;                     // "job-101" to "job-106", or "job-${Date.now()}"
  title: string;                  // e.g. "Express Flyer & Promo Distributor"
  employer: string;               // e.g. "Arun's Cafe & Roasters"
  employerAvatar: string;         // Avatar image URL
  employerRating: number;         // e.g. 4.8
  category: "Cafe" | "Promotion" | "Events" | "Logistics" | "Retail" | "Delivery";
  wage: number;                   // 100, 500, 1000, 10000, 650, 450
  wageUnit: string;               // "per hour", "4-hour shift", "single day", "weekend gig"
  duration: string;               // "2 Hours", "4 Hours", "6 Hours", "2 Days"
  timeSlot: string;               // "Today, 4:00 PM - 6:00 PM"
  distanceKm: number;             // 0.8, 1.4, 2.8, 4.5, 1.9, 1.1
  location: string;               // e.g. "Metro Station Exit 3, Indiranagar"
  coords: {
    x: number;                    // 0-100 (% horizontal position on radar map)
    y: number;                    // 0-100 (% vertical position on radar map)
  };
  tags: string[];                 // ["Instant Payout", "Urgent", "No Exp Required"]
  description: string;            // Shift duties and prerequisites
  openSlots: number;              // Available vacancies (1 to 5)
  checkInPin: string;             // "6767"
  isUrgent: boolean;              // Priority flag
  badgeColor: "cyan" | "amber" | "emerald" | "purple" | "indigo" | "rose";
}
```

### 3.3 `Wallet` & `Transaction` Entity
Tracks real-time earnings, payouts, and withdrawal ledgers:
```typescript
interface WalletTransaction {
  id: string;                     // "tx-101" to "tx-104", or "tx-${Date.now()}"
  title: string;                  // e.g. "Akhila's Brew Lab - Evening Shift"
  category: "Shift Payout" | "Withdrawal" | "Micro Shift" | "Bonus Payout" | "Shift Settlement" | "GPay / UPI Withdrawal";
  amount: number;                 // e.g. 500, 300, 100, 700
  type: "credit" | "debit";
  date: string;                   // "Today, 11:30 AM", "Just now"
  status: "Completed" | "Pending" | "Failed";
  icon: "coffee" | "arrow-up-right" | "sparkles" | "award";
}

interface WalletState {
  balance: number;                // Baseline: 1000 (₹)
  currency: string;               // "₹"
  upiId: string;                  // "alexchen@okaxis"
  linkedBank: string;             // "HDFC Bank •••• 4091"
  transactions: WalletTransaction[];
}
```

### 3.4 `ChatContact` & `ChatMessage` Entity
Manages communication threads between workers and hiring managers:
```typescript
interface ChatMessage {
  id: string;                     // "m1", "m-reply-172632...", etc.
  sender: "me" | "them";
  text: string;
  time: string;                   // "2:15 PM", "Just now"
}

interface ChatContact {
  id: string;                     // "chat-arun", "chat-akhila", "chat-ryan", "chat-toby"
  contactName: string;            // "Arun", "Akhila", "Ryan", "Toby"
  role: string;                   // "Cafe Shift Manager", "Head Roaster & Store Lead", etc.
  company: string;                // "Arun's Cafe & Roasters", "Akhila's Brew Lab", etc.
  avatar: string;
  status: "online" | "away" | "offline";
  unreadCount: number;
  lastMessageTime: string;
  jobReference: string;           // "Express Flyer & Promo (₹100/hr)"
  messages: ChatMessage[];
}
```

### 3.5 `RecentActivity` Entity
Audit trail of shift applications and completed assignments:
```typescript
interface RecentActivity {
  id: string;                     // "act-1" to "act-4", or "act-${Date.now()}"
  title: string;                  // e.g. "Barista Shift - Akhila's Brew Lab"
  type: "Completed Shift" | "Application Accepted" | "Application Sent" | "Completed Project";
  wage: string;                   // "₹500", "₹1,000", "₹100/hr", "₹10,000"
  date: string;                   // "Today, 11:30 AM", "Starts Tomorrow, 9:00 AM"
  status: "Settled" | "Scheduled" | "Under Review" | "Confirmed";
  statusColor: "emerald" | "cyan" | "amber";
  pinUsed: string;                // "6767" | "Pending"
}
```

### 3.6 `Notification` Entity
In-app notification items displayed in the header drop-sheet:
```typescript
interface AppNotification {
  id: string;                     // "notif-1" to "notif-4"
  title: string;                  // "Payment Received! 💰", "Shift Check-in PIN Active 🔑"
  message: string;
  time: string;                   // "25m ago", "1h ago"
  type: "wallet" | "security" | "job" | "kyc";
  unread: boolean;
}
```

---

## 4. Existing Interactions, User Flows & Business Logic

### 4.1 Search & Category Filtering (`app.js:194-224`)
- **Category Filter**: Category chips are clicked (`All`, `Cafe`, `Promotion`, `Events`, `Logistics`, `Retail`, `Delivery`). Updates `state.selectedCategory`.
- **Search Query**: Real-time input on `#search-jobs-input`. Filters jobs case-insensitively across:
  $$\text{matchesSearch} = \text{title} \lor \text{employer} \lor \text{category} \lor \text{location}$$
- **Empty State**: If `filtered.length === 0`, renders an empty search illustration prompting queries like `"Cafe"` or `"Flyer"`.
- **Results Count**: Dynamically updates text banner (e.g. `Showing 6 gigs nearby`).

### 4.2 Standard Wage Tiers
Derived from the PRD and seed dataset:
1. **₹100 Tier** (`job-101`): Rapid flyer & promo distribution (micro-task, per hour).
2. **₹500 Tier** (`job-102`): Artisan coffee barista & counter support (4-hour shift).
3. **₹1,000 Tier** (`job-103`): VIP Tech Summit usher & registration (single day).
4. **₹10,000 Tier** (`job-104`): Multi-day weekend expo booth coordinator (2-day weekend gig).
5. **₹450 - ₹650 Tier** (`job-105`, `job-106`): Dark store order packer & retail merchandising.

### 4.3 Interactive Radar Map & Pin Selection (`app.js:302-352`)
- Pins are positioned absolutely within a 100% $\times$ 100% container using percentage coordinates (`coords.x%`, `coords.y%`).
- Center features an animated `"You are Here"` beacon with pulsating concentric radar waves (`@keyframes radarWave`).
- Clicking any `.map-pin` extracts the associated `jobId` and slides up `#map-job-sheet` populated with:
  - Employer avatar, employer name, star rating
  - Formatted wage badge (`₹500 / 4-hour shift`)
  - Distance (`1.4 km away • 12th Main Road, Koramangala`)
  - Actions: **Quick Apply (PIN 6767)** (triggers application modal) and **Chat button** (navigates to Chat tab).
- **Radius Selector**: Clicking `#map-radius-selector` cycles through `[1, 5, 10, 25]` km radius, updating the header badge and triggering feedback toast.

### 4.4 Mutual Handshake & OTP Check-in Verification (`OTP 6767`)
- **Universal Code**: `6767` is the universal attendance handshake token.
- **Exposure Surfaces**:
  1. Top status banner (`#banner-otp`): Displays `PIN: 6767`; clicking copies to clipboard via `navigator.clipboard.writeText('6767')`.
  2. Dynamic Island: Displays `Starts in 35m • PIN 6767`.
  3. Job Application modal (`#modal-apply-confirm`): Prominently presents `PIN: 6767` with note: *"When your application is confirmed, present your Universal Check-in PIN to the shift manager"*.
  4. Chat quick chips: Contains `"🔑 Share PIN 6767"`. Clicking triggers an immediate bot auto-reply after 1400ms:
     > `"PIN 6767 confirmed! Shift checked in successfully. Have a great shift!"`
  5. Recent Activity: Records each shift with `pinUsed: "6767"`.

### 4.5 Holographic Wallet & Instant Digital Cashout (`app.js:495-575`)
- **Baseline Balance**: ₹1,000.
- **Card Presentation**: Holographic gradient card showing available earnings, account holder (`ALEX CHEN`), KYC status badge, and linked VPA (`alexchen@okaxis`).
- **Cashout Trigger**: `#btn-open-cashout` opens `#modal-cashout`.
- **Validation Rules**:
  1. Amount must be a valid positive number ($> 0$).
  2. Amount cannot exceed current available balance ($\text{amount} \le \text{wallet.balance}$).
  3. UPI ID must contain an `@` symbol (e.g. `alexchen@okaxis`).
- **Cashout Execution**:
  1. Deducts amount: $\text{balance} \leftarrow \text{balance} - \text{amount}$.
  2. Unshifts debit transaction: `{ category: "GPay / UPI Withdrawal", type: "debit", amount, ... }`.
  3. Synthesizes Web Audio cashout arpeggio (`playCashout()`).
  4. Triggers celebratory toast: `₹500 successfully sent to alexchen@okaxis via Google Pay!`.
- **In-Chat Payout**: In Chat, clicking `"💰 Request Pay"` triggers an employer reply after 1400ms approving ₹500 payout, which invokes `addWalletCredit(500, "...")`, immediately adding ₹500 to wallet balance.

### 4.6 Employer "+ HIRE" Shift Creation Modal (`app.js:627-667`)
- Activated by `#btn-open-hire` in the header bar.
- Collects: Title, Category (Select dropdown), Wage (₹), Duration, Slots available, Location / Landmark, Description & Shift Notes.
- On Submission:
  - Generates a new job object with random radar coordinates ($x, y \in [20, 80]$).
  - Prepends to `state.jobs`.
  - Immediately re-renders the Home job grid (`renderJobs()`) and Radar Map (`renderMap()`).
  - Resets form and displays confirmation toast: `Vacancy "[Title]" published live for ₹[Wage]!`.

### 4.7 In-App Chat Simulation (`app.js:354-473`)
- Pre-populated contacts:
  - **Arun** (*Arun's Cafe & Roasters*, Online)
  - **Akhila** (*Akhila's Brew Lab*, Online)
  - **Ryan** (*Ryan's Media Con*, Away)
  - **Toby** (*Toby Logistics & Events*, Offline)
- Includes search filter for conversations.
- Contextual canned bot replies triggered via keyword heuristics:
  - If text includes `"6767"` or `"PIN"` $\rightarrow$ Check-in confirmation.
  - If text includes `"Request Pay"` or `"completed"` $\rightarrow$ Payment approved + ₹500 wallet credit.
  - If text includes `"Arrived"` $\rightarrow$ Location arrival instructions.
  - Default $\rightarrow$ `"Received! Looking forward to your shift. Please have the OTP 6767 ready."`

### 4.8 Procedural Web Audio Engine (`app.js:23-101`)
- Emits three synthesized sound effects using `window.AudioContext`:
  1. `playTap()`: Fast sine wave pitch sweep (600Hz down to 200Hz over 40ms, gain 0.08).
  2. `playSuccess()`: Ascending major triad chord (523.25Hz [C5], 659.25Hz [E5], 783.99Hz [G5] over 350ms, gain 0.12).
  3. `playCashout()`: Multi-note melodic arpeggio (587.33Hz [D5], 739.99Hz [F#5], 880Hz [A5], 1174.66Hz [D6], 180ms per note).

---

## 5. Architectural & Implementation Gaps vs Next.js Target Requirements

A point-by-point comparison between the prototype and `ORIGINAL_REQUEST.md`:

| Requirement Domain | Legacy Prototype (`index.html` / `app.js` / `styles.css`) | Next.js App Router + TS + Tailwind Target (`ORIGINAL_REQUEST.md`) | Critical Gaps Identified |
| :--- | :--- | :--- | :--- |
| **R1. Desktop Layout** | Wraps entire application in a simulated iPhone 15 Pro Max chassis (`.iphone-wrapper`, 430px wide) with fake titanium physical buttons. Has a button to expand width to 1,060px, but it remains a centered floating phone card. | Full-width, multi-pane marketplace layout featuring a split-pane interactive map, persistent navigation, filtered opportunity listings, and quick-inspection side sheets. **Zero device frame wrappers**. | **HIGH**: Current prototype has no desktop layout. Desktop must be completely built from scratch as a wide-screen dashboard (>= 1024px) utilizing split views. |
| **R1. Mobile Layout** | Fixed at 430px $\times$ 932px with simulated Dynamic Island, iOS clock, battery bar, and home indicator bar. Not truly responsive to arbitrary mobile screen sizes. | Native-feeling touch-first mobile layout (< 768px) with bottom navigation dock, swipeable modal sheets, and clear touch targets (minimum 44px). | **MEDIUM**: Must replace fake chassis status bar / home indicator with standard responsive mobile viewport layout and native mobile touch ergonomics. |
| **R2. Visual Styling & Aesthetics** | "Liquid Glassmorphism": heavy colored glowing orbs in background, bright saturated gradients, neon borders, and cartoonish dynamic island. | **Uber-dominant utility aesthetic elevated by Apple tactile iOS gestures and Raycast dark-precision styling**: stark monochrome base, functional safety accents, 1px borders (`rgba(255,255,255,0.08-0.15)`), dark chrome surfaces, and compact badge tags. | **HIGH**: Needs complete restyling into dark chrome/monochrome with crisp 1px borders, subtle Apple spring physics, and high-legibility typography without glowing orbs. |
| **R3. Map Experience** | Simple percentage coordinate dots on a CSS radial gradient background (`coords.x%`, `coords.y%`) inside a small container. | Interactive Radar Map with location beacon, adjustable radius slider, interactive geo-tagged wage markers, and quick inspection sheets that integrate into desktop split-pane and mobile bottom-sheet. | **MEDIUM**: Map pins need clear telemetry, distance metrics, smooth pan/zoom or radar sweep, and responsive docking in both desktop split-pane and mobile sheet. |
| **Code Structure & Language** | Vanilla JavaScript ES6 (`data.js`, `app.js`), global mutable state, manual DOM manipulation (`innerHTML` templates). | Next.js 15+ App Router (`app/page.tsx`, `components/`), TypeScript (`.tsx`) with strictly typed interfaces, Tailwind CSS utility classes, zero ESLint/TS errors. | **HIGH**: Total rewrite of UI into modular React components, typed props, custom hooks, and centralized state. |
| **State Management** | Single mutable object `const state = { ... }`. Functions directly modify `state.jobs.unshift(...)` and manually call re-render functions (`renderJobs()`, `renderMap()`). | React state management (`useState`, `useReducer`, or React Context) with immutable state updates, reactive derived state, and local persistence. | **MEDIUM**: Need a unified state provider (e.g., `MarketplaceContext` or custom hook) for shifts, wallet, active OTP, chats, and filters. |
| **Build & Tooling** | No package manager, no `package.json`, no build scripts, no TypeScript compiler. | `package.json` with Next.js, React 19, TypeScript, Tailwind CSS, Lucide icons, `npm run build` passing cleanly. | **HIGH**: Next.js App Router project infrastructure must be scaffolded. |

---

## 6. Proposed Architecture & Component Blueprint for Next.js

To satisfy `ORIGINAL_REQUEST.md`, the new codebase should be organized cleanly under the Next.js App Router convention:

```
src/ (or root)
├── app/
│   ├── layout.tsx              # Root layout with fonts, metadata, global styles
│   ├── page.tsx                # Dual-experience root (renders DesktopDashboard or MobileApp)
│   └── globals.css             # Tailwind imports, dark theme variables, Raycast border utilities
├── components/
│   ├── common/
│   │   ├── Badge.tsx           # Raycast-style high-contrast tags (wage, KYC, urgent)
│   │   ├── Avatar.tsx          # User & employer avatars with status indicators
│   │   ├── SoundEngine.ts      # Web Audio API procedural sound engine
│   │   └── Toast.tsx           # Non-intrusive feedback toast notifications
│   ├── desktop/
│   │   ├── DesktopLayout.tsx   # Multi-pane marketplace dashboard (>= 1024px)
│   │   ├── DesktopSidebar.tsx  # Persistent left navigation & user telemetry
│   │   ├── DesktopJobList.tsx  # Search, category pills, and shift card grid
│   │   ├── DesktopMapPane.tsx  # Split-pane interactive radar map & pin inspector
│   │   └── DesktopSideSheet.tsx# Quick inspection slide-out panel for selected shift
│   ├── mobile/
│   │   ├── MobileLayout.tsx    # Touch-first mobile viewport wrapper (< 768px)
│   │   ├── MobileHeader.tsx    # Compact Uber-style header with KYC & OTP tag
│   │   ├── MobileBottomDock.tsx# Fixed 5-tab bottom navigation dock
│   │   ├── MobileHomeView.tsx  # Search, categories, job cards
│   │   ├── MobileMapView.tsx   # Radar map with bottom slide-up sheet
│   │   ├── MobileChatView.tsx  # Touch-optimized conversation threads
│   │   ├── MobileRecentView.tsx# Chronological shift audit log
│   │   └── MobileWalletView.tsx# Holographic card & cashout drawer
│   ├── modals/
│   │   ├── HireShiftModal.tsx  # +HIRE employer 60-second vacancy post form
│   │   ├── CashoutModal.tsx    # Instant UPI withdrawal with presets & GPay/PhonePe
│   │   ├── ApplyConfirmModal.tsx # Shift application confirmation & OTP 6767 display
│   │   ├── AccountModal.tsx    # KYC & worker role switcher
│   │   └── NotifsSheet.tsx     # Notifications drawer
│   └── map/
│       ├── RadarMap.tsx        # Shared interactive map canvas with beacon & pins
│       └── WagePinMarker.tsx   # Interactive geo-tagged wage pin ($100, $500, $1k, $10k)
├── context/
│   └── MarketplaceContext.tsx  # Unified reactive store for shifts, wallet, chats, OTP
├── types/
│   └── marketplace.ts          # Strict TypeScript interface definitions
└── data/
    └── seedData.ts             # Initial seed data translated from data.js
```

---

## 7. Survey Verification Summary

All findings in this report have been verified directly against the prototype files:
- `data.js`: Verified exact keys for user (age 22, verified KYC, activeOtp 6767), 6 initial jobs with wages [100, 500, 1000, 10000, 650, 450], wallet balance ₹1,000, 4 chats, 4 activities, 4 notifications.
- `index.html`: Verified the phone frame chassis `#device-frame` (width 430px, max-height 94vh) and the presence of fake hardware buttons (`.iphone-btn-action`, `.iphone-btn-vol-up`, `.iphone-btn-vol-down`, `.iphone-btn-power`).
- `app.js`: Verified the Web Audio procedural frequencies, event listeners, cashout deduction, and OTP 6767 validation flow.
- `styles.css`: Verified absence of responsive `@media` query breakpoints and the implementation of `.device-frame.expanded` (1,060px).

This survey provides the complete empirical foundation for the upcoming Next.js App Router implementation.

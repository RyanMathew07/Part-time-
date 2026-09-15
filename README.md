# PART-TIME 💎 Liquid Glass Employer & Employee Marketplace

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![UI Theme](https://img.shields.io/badge/Design-Liquid%20Glass%20%2F%20Black%20Crystal-black?style=flat&logo=apple)](https://github.com/RyanMathew07/Part-time-)
[![Build Status](https://img.shields.io/badge/Next.js-14.2%20App%20Router-black?logo=next.js)](https://nextjs.org/)
[![Tests](https://img.shields.io/badge/Test%20Suite-134%2F134%20Passing%20(100%25)-brightgreen)](#testing-and-verification)
[![Viewport](https://img.shields.io/badge/Viewport-Dual%20Desktop%20%26%20Mobile-blueviolet)](#architecture)

A hyper-aesthetic, ultra-fluid **Liquid Glassmorphism** web application and Next.js marketplace engineered for on-demand part-time employment, micro-gigs, and shift discovery.

---

## ✨ Features & Highlights

- 💎 **Apple Liquid Glass Design System**:
  - Translucent neutral glass material (`rgba(255, 255, 255, 0.06)`), frosted optical blur (`backdrop-filter: blur(24px) saturate(180%)`), and precision hairline borders (`1px solid rgba(255, 255, 255, 0.14)`).
  - Physical glass thickness with dual-tone inset highlights (`inset 0 1px 1px rgba(255,255,255,0.25)`, `inset 0 -1px 1px rgba(0,0,0,0.3)`), outer lift shadows, and a 1px specular curvature sheen line.
  - Deep pitch-black (`#000000`) monochrome palette with functional safety accents (Emerald, Amber, Cyan) and seamless dark/light theme switching.
- 📱 **Floating Liquid Glass Bottom Navigation Dock**:
  - Centered floating capsule tab bar (`max-w-[364px]`, `34px` border radius) with bottom-edge elevation and generous side margins.
  - 5 tactile touch targets (Home, Map, Chat, Recent, Wallet) with 1.8px-stroke line icons and `active:scale-90` haptic compression.
  - Active state sliding capsule in solid white/light-gray with soft radial glow and contrasting dark typography/iconography.
  - Red notification dot badge (`#ef4444`) on the Chat tab positioned at the base of the icon.
- 🖥️ **Dual-Experience Viewport Segregation**:
  - **Desktop Viewport (≥ 1024px)**: Full-width multi-pane dashboard with persistent left navigation sidebar, central opportunity feed, and interactive right split-pane radar map with docked job inspector. Zero mobile phone frames or chassis wrappers!
  - **Mobile Viewport (< 768px)**: Edge-to-edge native-feeling `100dvh` mobile container with dynamic island telemetry, swipeable bottom sheets with drag handles, and floating liquid glass dock.
- 🛡️ **Security, KYC & Attendance Handshake**:
  - Built-in legal compliance threshold enforcing `Age ≥ 18 Verified`.
  - Universal One-Time PIN attendance handshake code (`OTP 6767`) for on-site shift start confirmation and live attendance status tracking.
- 🗺️ **Interactive Radar Map**:
  - Concentric scanning radar sweep grid, animated "You are Here" beacon, adjustable distance radius slider (1–25 km), and interactive geo-tagged wage pins.
- 💬 **Live Employer Messaging**:
  - Real-time in-app chat threads with employers (**Arun, Akhila, Ryan, Toby**), quick action chips (`🔑 Share PIN 6767`, `💰 Request Pay`, `📍 I've Arrived`), and automated responses.
- 💳 **Holographic Wallet & Instant Cashout**:
  - Dynamic balance card with transaction history ledger and simulated UPI instant cashout supporting **Google Pay, PhonePe, and Paytm**.
- 🔊 **Web Audio Haptics Engine**:
  - Low-latency procedural Web Audio synthesizer generating tap clicks, success chords, and cashout chimes without external audio assets.

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18.x or higher
- npm 9.x or higher

### Installation

```bash
# Clone the repository
git clone https://github.com/RyanMathew07/Part-time-.git
cd Part-time-

# Install dependencies
npm install
```

### Running the Next.js App

```bash
# Start Next.js development server
npm run dev

# Or build and run production server
npm run build
npm start
```
The app will be available at [http://localhost:3000](http://localhost:3000) (or `http://localhost:3001` if port 3000 is occupied).

### Running Standalone Static Version

You can also run the zero-dependency vanilla HTML/CSS/JS version directly:

```powershell
# Using PowerShell dev server
powershell -ExecutionPolicy Bypass -File .\serve.ps1 -Port 8080

# Or open standalone.html directly in any modern browser
```

---

## 🧪 Testing and Verification

The project includes an opaque-box test suite with 100% coverage across 4 rigorous tiers:

```bash
# Run all automated tests
npm test

# Run viewport ergonomics challenge
node tests/viewport-ergonomics-challenge.test.js

# Run adversarial state & boundary stress tests
node tests/stress-tests.js
```

### Test Scorecard

| Test Suite | Passed | Total | Rate | Status |
| :--- | :---: | :---: | :---: | :---: |
| **Tier 1: Feature & Syntax Smoke Tests** | 40 | 40 | 100.0% | PASS |
| **Tier 2: Boundary & Viewport Layout Tests** | 31 | 31 | 100.0% | PASS |
| **Tier 3: Cross-Feature Integration Tests** | 30 | 30 | 100.0% | PASS |
| **Tier 4: Real-World User Scenarios** | 33 | 33 | 100.0% | PASS |
| **Viewport Ergonomics Challenge** | 81 | 81 | 100.0% | PASS |
| **Adversarial State & Stress Tests** | 101 | 101 | 100.0% | PASS |
| **Total Automated Assertions** | **316** | **316** | **100.0%** | **PASS** |

---

## 📂 Project Structure

```
├── app/
│   ├── globals.css            # Tailwind directives, Apple glass tokens, custom scrollbars
│   ├── layout.tsx             # Root layout with fonts and dark theme support
│   └── page.tsx               # ViewportRouter entry (Desktop vs Mobile)
├── components/
│   ├── chat/                  # ChatView, QuickActionChips
│   ├── discovery/             # CategoryPills, SearchBar, ShiftCard, ShiftFeed, WageTierFilter
│   ├── employer/              # PostShiftModal (+HIRE)
│   ├── layout/                # BottomDock (Liquid Glass), DesktopLayout, Header, MobileLayout, NavigationSidebar
│   ├── lifecycle/             # ActiveShiftTracker, ApplyModal, OtpBanner
│   ├── radar/                 # RadarCanvas, RadiusControl, ShiftInspector
│   ├── ui/                    # Base UI primitives (button, badge, card, dialog, avatar, etc.)
│   └── wallet/                # CashoutModal, TransactionHistory, WalletCard
├── context/
│   └── MarketplaceContext.tsx # Centralized reactive state store
├── lib/
│   ├── soundEngine.ts         # Procedural Web Audio API sound synthesizer
│   └── utils.ts               # Formatting, distance, and helper utilities
├── tests/                     # 4-tier automated test suite and stress tests
├── index.html                 # Modular static HTML5 distribution
├── styles.css                 # Liquid Glassmorphism CSS design system
├── app.js                     # Static application engine
├── standalone.html            # Self-contained bundled single-file distribution
├── serve.ps1                  # Zero-dependency local PowerShell web server
└── README.md                  # Project documentation
```

---

## 📄 License
MIT License. Free for personal and commercial exploration.
## 2026-09-14T13:56:38Z

You are the Project Orchestrator for rebuilding the PART-TIME gig and shift marketplace as a modern Next.js application (App Router, TypeScript, Tailwind CSS).

Your Working Directory: d:/Documents/Antigravity/Part time/.agents/orchestrator_1
Project Root: d:/Documents/Antigravity/Part time
Authoritative Requirements: d:/Documents/Antigravity/Part time/.agents/ORIGINAL_REQUEST.md

USER SPECIFICATION:
Rebuild the PART-TIME gig and shift marketplace as a modern Next.js application (App Router, TypeScript, Tailwind CSS) with distinct, purpose-built interfaces for desktop web and mobile viewports, featuring an Uber-dominant utility aesthetic elevated by Apple tactile iOS gestures and Raycast dark-precision styling.

Integrity mode: demo

Key Requirements to satisfy:
1. R1. Next.js App Router Architecture & Dual-Experience Layout
- Desktop Web: full-width, multi-pane marketplace layout featuring a split-pane interactive map, persistent navigation, filtered opportunity listings, and quick-inspection side sheets. No mobile device frame wrappers on desktop!
- Mobile Web: touch-first, fluid mobile layout with bottom navigation dock, swipeable modal sheets, clear touch targets (min 44px), native-feeling viewport handling.
2. R2. Uber-Dominant Design System with Apple & Raycast Craft
- Uber foundation: high-contrast typography, stark monochrome base with safety accents, bold category iconography, real-time map pin cards, distance/route telemetry.
- Apple tactile motion: smooth sheet physics, Spring animations, subtle backdrop blur materials, sensory feedback.
- Raycast precision: crisp 1px border contrasts (rgba(255,255,255,0.08) to 0.15), dark chrome surfaces, compact high-legibility badge tags for wages and KYC statuses.
3. R3. Complete Marketplace & Shift Lifecycle Functionality
- Shift Discovery & Filters: real-time search, category filters (Café, Events, Promo, Logistics, Retail, Delivery), tiered wage vacancies (₹100, ₹500, ₹1k, ₹10k).
- Interactive Radar Map: live map interface with location beacon, adjustable radius slider, interactive geo-tagged wage markers.
- Mutual Handshake & OTP Verification: on-site attendance check-in using universal OTP handshake code (OTP 6767) and live shift status tracking.
- Holographic Wallet & Digital Cashout: balance tracking, shift payment receipts, instant simulated UPI withdrawals (Google Pay, PhonePe, Paytm).
- +HIRE Employer Shift Posting: quick shift creation modal allowing employers to post hourly gigs in under 60 seconds.

Acceptance Criteria:
- npm run build completes successfully with zero TypeScript or ESLint errors
- Codebase runs cleanly in Next.js dev server on localhost:3000
- All components written in modular TypeScript (.tsx) with strictly typed interfaces
- Desktop (>= 1024px) renders full-width multi-column dashboard with split-pane map and zero phone frames
- Mobile (< 768px) renders dedicated full-screen mobile app layout with bottom dock and native-feeling touch ergonomics (>= 44px touch targets)
- Cohesive Uber/Apple/Raycast theme, zero generic AI layouts/unstyled elements
- All interactive features functioning end-to-end (filters, map pins, OTP 6767 check-in, wallet balance & cashout)

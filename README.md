# PART-TIME ðŸ’Ž Liquid Glass Employer & Employee Marketplace

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![UI Theme](https://img.shields.io/badge/Design-Liquid%20Glass%20%2F%20Black%20Crystal-black?style=flat&logo=apple)](https://github.com/RyanMathew07/Part-time-)
[![Framerate](https://img.shields.io/badge/Performance-60%20FPS%20GPU%20Composited-brightgreen)](#performance)
[![Device Showcase](https://img.shields.io/badge/Frame-iPhone%2015%20Pro%20Max-lightgrey)](#showcase)

A hyper-aesthetic, ultra-fluid **Liquid Glassmorphism** web application designed for on-demand part-time employment, based on hand-drawn marketplace wireframes.

Crafted with pure HTML5, CSS3, and modern vanilla JavaScript â€” with **zero runtime dependencies** and built-in hardware acceleration for smooth 30â€“60+ FPS performance even on budget devices.

---

## âœ¨ Features & Highlights

- ðŸ’Ž **Liquid Glass & Black Crystal Design**: Specular rim lighting, refractive frosted backdrops, and deep pitch-black (\#000000\) crystal theme with smooth dark/light mode switching.
- ðŸ“± **iPhone 15 Pro Max Experience**: Authentic 6.7-inch Titanium frame, iOS 18 status bar, tactile physical hardware buttons (Action Button, Volume, Power), and an interactive **Dynamic Island** with live shift countdown and soundwave animations.
- âš¡ **Universal 30â€“60+ FPS Performance**: Engineered specifically for low-overhead GPU layer compositing (\	ranslate3d\), optimized 18px backdrop blurs (70% fill-rate reduction), and CSS layout containment (\contain: layout style paint\).
- ðŸ” **Security & KYC**: Built-in verification badge (\Age â‰¥ 18 Verified\) and universal One-Time PIN check-in handshake code (\OTP 6767\) for on-site job start confirmation.
- ðŸ§­ **5-Tab Navigation Dock**:
  - ðŸ  **Home Feed**: Live search bar, category chips (CafÃ©, Promo, Events, Logistics, Retail, Delivery), and wage vacancy cards (â‚¹100, â‚¹500, â‚¹1,000, â‚¹10,000).
  - ðŸ—ºï¸ **Radar Map**: Pulsing "You are Here" beacon, radius range slider, and interactive wage pins with slide-up preview sheets.
  - ðŸ’¬ **Live Chat**: Simulated real-time messaging with employers (**Arun, Akhila, Ryan, Toby**), quick PIN 6767 sharing, and automatic pay release.
  - ðŸ•’ **Recent Shifts**: Timeline of completed gigs, scheduled shifts, and payment receipts.
  - ðŸ’³ **Holographic Wallet**: Balance card (â‚¹1,000) with interactive instant cashout modal supporting **Google Pay, PhonePe, and Paytm**.
- ðŸ”Š **Web Audio Haptics**: Procedural audio feedback for button clicks, cashout chimes, and haptic interactions without external audio assets.

---

## ðŸš€ Quick Start

No installations or build tools required!

### Option 1: Standalone Single File (Instant)
Double-click \standalone.html\ to run the entire app directly in any modern browser (Chrome, Edge, Safari, Firefox).

### Option 2: Local Server
Open PowerShell in the repository root and run:
\\\powershell
powershell -ExecutionPolicy Bypass -File .\serve.ps1 -Port 8080
\\\
This automatically launches your browser at \http://localhost:8080/\.

---

## ðŸ“ Project Structure

\\\
â”œâ”€â”€ index.html       # Main modular entry point with iPhone 15 Pro Max chassis
â”œâ”€â”€ styles.css       # Liquid Glassmorphism, Black Crystal theme, and GPU animations
â”œâ”€â”€ data.js          # Mock database for jobs, categories, chats, and wallet
â”œâ”€â”€ app.js           # Interactive state management, audio synth, and navigation
â”œâ”€â”€ standalone.html  # Self-contained bundled single-file distribution
â”œâ”€â”€ serve.ps1        # Zero-dependency local dev server
â””â”€â”€ README.md        # Documentation
\\\

---

## ðŸ“„ License
MIT License. Free for personal and commercial exploration.
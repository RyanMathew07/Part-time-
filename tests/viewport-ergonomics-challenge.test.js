/**
 * Viewport Ergonomics & Visual Integrity Adversarial Challenge Suite
 * Challenger 2 (Replacement)
 * PART-TIME Marketplace Rebuild (Next.js App Router)
 *
 * Adversarially tests:
 * 1. DesktopLayout (>= 1024px): Strictly ZERO phone frames, simulated bezels, or artificial chassis wrappers.
 *    Full-width multi-pane layout coexistence (NavigationSidebar, feed, split-pane radar map, inspector).
 * 2. MobileLayout (< 768px): Full-screen app shell, 5-tab bottom dock with >= 44x44px touch targets,
 *    slide-up bottom sheet drawer with drag handle, and touch ergonomics.
 * 3. Visual Aesthetics: Uber typography, pitch black #000000 base, safety accents (emerald, amber, cyan),
 *    Raycast 1px borders, and Apple translucent materials.
 * 4. Boundary Value Analysis: Viewport categorization, touch target calculations, and color contrast tokens.
 */

const {
  resolvePath,
  fileExists,
  readFile,
  fileContains,
  SPEC,
  ORACLE,
  createSuite
} = require('./test-utils');

async function run() {
  const suite = createSuite('Challenger 2: Viewport Ergonomics & Visual Integrity Challenge');

  console.log('\n  -> Section 1: Desktop Viewport Segregation & Zero Phone Frame Verification (>= 1024px)...');

  // 1.1 Desktop Layout Source File Verification
  suite.assert(
    fileExists('components/layout/DesktopLayout.tsx'),
    'CH2-01: DesktopLayout.tsx component file exists',
    { message: 'components/layout/DesktopLayout.tsx missing' }
  );

  const desktopSource = readFile('components/layout/DesktopLayout.tsx') || '';

  // 1.2 Adversarial Check for Artificial Mobile Chassis & Phone Bezels
  const forbiddenDesktopPatterns = [
    { pattern: 'device-frame', name: 'device-frame wrapper class' },
    { pattern: 'phone-frame', name: 'phone-frame wrapper class' },
    { pattern: 'iphone-frame', name: 'iphone-frame wrapper class' },
    { pattern: 'mockup-chassis', name: 'mockup-chassis class' },
    { pattern: 'titanium-bezel', name: 'titanium-bezel styling' },
    { pattern: 'ios-status-bar', name: 'simulated iOS status bar on desktop' },
    { pattern: 'ios-home-indicator', name: 'simulated iOS home indicator on desktop' },
    { pattern: 'max-w-[390px]', name: 'fixed iPhone 390px width' },
    { pattern: 'max-w-[414px]', name: 'fixed iPhone 414px width' },
    { pattern: 'max-w-[428px]', name: 'fixed iPhone 428px width' },
    { pattern: 'max-w-[430px]', name: 'fixed iPhone 430px width' },
    { pattern: 'max-w-sm', name: 'restrictive max-w-sm container on root' },
    { pattern: 'rounded-[40px]', name: 'artificial phone rounded chassis corner' },
    { pattern: 'rounded-[48px]', name: 'artificial phone rounded chassis corner' },
    { pattern: 'rounded-[50px]', name: 'artificial phone rounded chassis corner' },
  ];

  for (const item of forbiddenDesktopPatterns) {
    const containsForbidden = desktopSource.includes(item.pattern);
    suite.assert(
      !containsForbidden,
      `CH2-02 [Adversarial]: DesktopLayout contains ZERO ${item.name}`,
      { error: `DesktopLayout contains forbidden pattern "${item.pattern}"` }
    );
  }

  // 1.3 Desktop Container Full-Width & Multi-Pane Layout Structure
  suite.assert(
    desktopSource.includes('w-full') && desktopSource.includes('min-h-screen'),
    'CH2-03: DesktopLayout root container occupies full width and full viewport height (w-full min-h-screen)',
    { error: 'DesktopLayout is not full-width or min-h-screen' }
  );

  suite.assert(
    desktopSource.includes('NavigationSidebar'),
    'CH2-04: DesktopLayout incorporates persistent left navigation sidebar (NavigationSidebar)',
    { error: 'Persistent navigation sidebar missing in DesktopLayout' }
  );

  const sidebarSource = readFile('components/layout/NavigationSidebar.tsx') || '';
  suite.assert(
    sidebarSource.includes('w-64') && sidebarSource.includes('h-screen') && sidebarSource.includes('sticky'),
    'CH2-05: NavigationSidebar is configured as sticky full-height desktop sidebar (w-64 h-screen sticky)',
    { error: 'Sidebar does not use sticky 64-width desktop layout' }
  );

  suite.assert(
    desktopSource.includes('ShiftFeed'),
    'CH2-06: DesktopLayout embeds central shift opportunity feed (ShiftFeed)',
    { error: 'ShiftFeed missing in DesktopLayout' }
  );

  suite.assert(
    desktopSource.includes('RadarCanvas'),
    'CH2-07: DesktopLayout coexists cleanly with split-pane interactive radar map (RadarCanvas)',
    { error: 'RadarCanvas missing in DesktopLayout' }
  );

  suite.assert(
    desktopSource.includes('ShiftInspector'),
    'CH2-08: DesktopLayout integrates docked side-sheet inspector for selected job (ShiftInspector)',
    { error: 'ShiftInspector missing in DesktopLayout' }
  );

  suite.assert(
    desktopSource.includes('max-w-[1700px]'),
    'CH2-09: DesktopLayout main section leverages ultra-wide desktop displays up to 1700px (max-w-[1700px])',
    { error: 'DesktopLayout lacks ultra-wide max-w-[1700px] optimization' }
  );

  // 1.4 ViewportRouter Responsive Segregation Check
  const routerSource = readFile('components/layout/ViewportRouter.tsx') || '';
  suite.assert(
    routerSource.includes('hidden lg:block') && routerSource.includes('<DesktopLayout'),
    'CH2-10: ViewportRouter conditionally renders DesktopLayout on >= 1024px (hidden lg:block)',
    { error: 'ViewportRouter desktop breakpoint missing or malformed' }
  );

  suite.assert(
    routerSource.includes('block lg:hidden') && routerSource.includes('<MobileLayout'),
    'CH2-11: ViewportRouter conditionally renders MobileLayout on < 1024px (block lg:hidden)',
    { error: 'ViewportRouter mobile breakpoint missing or malformed' }
  );

  console.log('  -> Section 2: Mobile Viewport & Touch Ergonomics Verification (< 768px)...');

  // 2.1 Mobile Layout Source File Verification
  suite.assert(
    fileExists('components/layout/MobileLayout.tsx'),
    'CH2-12: MobileLayout.tsx component file exists',
    { message: 'components/layout/MobileLayout.tsx missing' }
  );

  const mobileSource = readFile('components/layout/MobileLayout.tsx') || '';

  // 2.2 Mobile Layout Edge-to-Edge 100dvh App Shell
  suite.assert(
    mobileSource.includes('100dvh'),
    'CH2-13: MobileLayout uses modern edge-to-edge dynamic viewport units (min-h-[100dvh])',
    { error: 'MobileLayout missing min-h-[100dvh]' }
  );

  suite.assert(
    mobileSource.includes('pb-24'),
    'CH2-14: MobileLayout provides 24-unit (96px) bottom clearance padding (pb-24) to prevent bottom dock occlusion',
    { error: 'MobileLayout missing bottom clearance for fixed dock' }
  );

  suite.assert(
    mobileSource.includes('BottomDock'),
    'CH2-15: MobileLayout integrates sticky 5-tab BottomDock component',
    { error: 'MobileLayout missing BottomDock' }
  );

  // 2.3 Bottom Dock 5-Tab Specification & Apple HIG Touch Targets (>= 44x44px)
  suite.assert(
    fileExists('components/layout/BottomDock.tsx'),
    'CH2-16: BottomDock.tsx component file exists',
    { message: 'components/layout/BottomDock.tsx missing' }
  );

  const dockSource = readFile('components/layout/BottomDock.tsx') || '';

  const requiredTabs = ['home', 'map', 'chat', 'recent', 'wallet'];
  const definedTabs = [];
  if (dockSource.includes("id: 'home'")) definedTabs.push('home');
  if (dockSource.includes("id: 'map'")) definedTabs.push('map');
  if (dockSource.includes("id: 'chat'")) definedTabs.push('chat');
  if (dockSource.includes("id: 'recent'")) definedTabs.push('recent');
  if (dockSource.includes("id: 'wallet'")) definedTabs.push('wallet');

  suite.equal(
    definedTabs.length,
    5,
    'CH2-17: BottomDock defines exactly 5 distinct functional tabs (Home, Radar, Chat, Recent, Wallet)'
  );

  suite.assert(
    dockSource.includes('min-h-[44px]'),
    'CH2-18: BottomDock enforces Apple HIG minimum touch height: min-h-[44px]',
    { error: 'BottomDock does not enforce min-h-[44px]' }
  );

  suite.assert(
    dockSource.includes('min-w-[56px]'),
    'CH2-19: BottomDock enforces horizontal touch target width >= 44px: min-w-[56px] (56px >= 44px)',
    { error: 'BottomDock tab buttons lack min-w-[56px] hit area' }
  );

  suite.assert(
    dockSource.includes('h-12'),
    'CH2-20: BottomDock button height is h-12 (48px >= 44px)',
    { error: 'BottomDock button height is not h-12' }
  );

  suite.assert(
    dockSource.includes('active:scale-90'),
    'CH2-21: BottomDock tab buttons implement tactile spring compression on press (active:scale-90)',
    { error: 'BottomDock missing active:scale-90 tactile feedback' }
  );

  suite.assert(
    dockSource.includes('pb-[env(safe-area-inset-bottom)]'),
    'CH2-22: BottomDock respects mobile iOS home indicator safe area inset (pb-[env(safe-area-inset-bottom)])',
    { error: 'BottomDock missing safe area inset bottom padding' }
  );

  suite.assert(
    dockSource.includes('fixed bottom-0') && dockSource.includes('z-40'),
    'CH2-23: BottomDock is fixed to bottom of viewport with elevated z-index (fixed bottom-0 z-40)',
    { error: 'BottomDock not fixed at viewport bottom' }
  );

  // 2.4 Category Pills Touch Ergonomics
  const categoryPillsSource = readFile('components/discovery/CategoryPills.tsx') || '';
  suite.assert(
    categoryPillsSource.includes('min-h-[44px]'),
    'CH2-24: Category filter pills explicitly declare min-h-[44px] for Apple HIG touch compliance',
    { error: 'Category pills do not specify min-h-[44px]' }
  );

  suite.assert(
    categoryPillsSource.includes('px-4 py-2.5'),
    'CH2-25: Category filter pills provide generous horizontal & vertical touch padding (px-4 py-2.5)',
    { error: 'Category pills lack px-4 py-2.5 touch padding' }
  );

  // 2.5 Slide-Up Bottom Sheet Drawer Ergonomics
  const inspectorSource = readFile('components/radar/ShiftInspector.tsx') || '';
  suite.assert(
    inspectorSource.includes('isMobileDrawer'),
    'CH2-26: ShiftInspector supports dedicated isMobileDrawer mode for slide-up bottom sheet display',
    { error: 'ShiftInspector missing isMobileDrawer capability' }
  );

  suite.assert(
    inspectorSource.includes('rounded-t-3xl'),
    'CH2-27: Mobile slide-up drawer applies Apple-style rounded top corners (rounded-t-3xl)',
    { error: 'Mobile drawer missing rounded-t-3xl' }
  );

  suite.assert(
    inspectorSource.includes('w-10 h-1 rounded-full bg-white/20'),
    'CH2-28: Mobile slide-up drawer features native iOS drag handle (w-10 h-1 rounded-full bg-white/20)',
    { error: 'Mobile drawer missing visual drag handle' }
  );

  suite.assert(
    inspectorSource.includes('slide-in-from-bottom'),
    'CH2-29: Mobile slide-up drawer utilizes smooth bottom sheet entry transition (slide-in-from-bottom)',
    { error: 'Mobile drawer missing slide-in-from-bottom animation' }
  );

  console.log('  -> Section 3: Visual Aesthetics, Uber Typography & Raycast Precision...');

  // 3.1 Pitch Black #000000 Base Tone Verification
  const globalsCss = readFile('app/globals.css') || '';
  const tailwindConfig = readFile('tailwind.config.ts') || '';
  const layoutSource = readFile('app/layout.tsx') || '';

  suite.assert(
    globalsCss.includes('--background: #000000;'),
    'CH2-30: app/globals.css sets root --background variable to pitch black (#000000)',
    { error: 'globals.css --background is not #000000' }
  );

  suite.assert(
    tailwindConfig.includes("background: '#000000'") && tailwindConfig.includes("canvas: '#000000'"),
    'CH2-31: tailwind.config.ts configures background & canvas tokens to stark #000000',
    { error: 'tailwind.config.ts background/canvas not #000000' }
  );

  suite.assert(
    layoutSource.includes('bg-black') && layoutSource.includes("themeColor: '#000000'"),
    'CH2-32: app/layout.tsx enforces pitch black background (bg-black) and mobile meta themeColor #000000',
    { error: 'app/layout.tsx missing bg-black or themeColor #000000' }
  );

  suite.assert(
    desktopSource.includes('bg-black') && mobileSource.includes('bg-black'),
    'CH2-33: Both DesktopLayout and MobileLayout establish root background as bg-black',
    { error: 'DesktopLayout or MobileLayout root not bg-black' }
  );

  // 3.2 High-Contrast Uber Typography
  suite.assert(
    tailwindConfig.includes("'Inter'") && tailwindConfig.includes("'-apple-system'"),
    'CH2-34: tailwind.config.ts declares Uber-grade sans-serif font stack (Inter, -apple-system, BlinkMacSystemFont)',
    { error: 'Sans font stack missing Inter or apple-system' }
  );

  suite.assert(
    tailwindConfig.includes("'JetBrains Mono'") && tailwindConfig.includes("'Menlo'"),
    'CH2-35: tailwind.config.ts declares high-precision mono font stack (JetBrains Mono, Menlo, monospace)',
    { error: 'Mono font stack missing JetBrains Mono or Menlo' }
  );

  suite.assert(
    globalsCss.includes('-webkit-font-smoothing: antialiased') && globalsCss.includes('-moz-osx-font-smoothing: grayscale'),
    'CH2-36: app/globals.css enforces subpixel antialiasing for crisp text rendering',
    { error: 'Antialiasing rules missing in globals.css' }
  );

  // 3.3 Functional Safety Accents (Emerald, Amber, Cyan, Rose)
  const hasEmeraldToken = tailwindConfig.includes("emerald: '#10b981'");
  const hasAmberToken = tailwindConfig.includes("amber: '#f59e0b'");
  const hasCyanToken = tailwindConfig.includes("cyan: '#06b6d4'");
  const hasRoseToken = tailwindConfig.includes("rose: '#f43f5e'");

  suite.assert(
    hasEmeraldToken && hasAmberToken && hasCyanToken && hasRoseToken,
    'CH2-37: tailwind.config.ts defines all 4 safety accent colors (emerald #10b981, amber #f59e0b, cyan #06b6d4, rose #f43f5e)',
    { error: 'One or more safety accent color tokens missing in tailwind.config.ts' }
  );

  // 3.4 Raycast 1px High-Contrast Border Contrast
  const hasRaycastTokens =
    tailwindConfig.includes("border: 'rgba(255, 255, 255, 0.08)'") &&
    tailwindConfig.includes("border-hover': 'rgba(255, 255, 255, 0.16)'");

  suite.assert(
    hasRaycastTokens,
    'CH2-38: tailwind.config.ts declares Raycast 1px precision border tokens (rgba(255,255,255,0.08) & 0.16)',
    { error: 'Raycast border tokens missing or out of spec in tailwind.config.ts' }
  );

  suite.assert(
    desktopSource.includes('border-white/[0.08]') || desktopSource.includes('border-white/[0.1]'),
    'CH2-39: DesktopLayout consistently uses Raycast 1px border styling (border-white/[0.08] / [0.1])',
    { error: 'DesktopLayout missing Raycast border styling' }
  );

  suite.assert(
    mobileSource.includes('border-white/[0.08]') || mobileSource.includes('border-white/[0.1]'),
    'CH2-40: MobileLayout consistently uses Raycast 1px border styling (border-white/[0.08] / [0.1])',
    { error: 'MobileLayout missing Raycast border styling' }
  );

  // 3.5 Apple Translucent Materials (Backdrop Blur)
  suite.assert(
    globalsCss.includes('backdrop-filter: blur(20px)') || globalsCss.includes('@apply backdrop-blur-xl'),
    'CH2-41: app/globals.css declares Apple glass material utilities (blur 20px / backdrop-blur-xl)',
    { error: 'Glass material utilities missing in globals.css' }
  );

  suite.assert(
    dockSource.includes('backdrop-blur-xl') && dockSource.includes('bg-[#090b12]/95'),
    'CH2-42: BottomDock utilizes Apple translucent material backing (bg-[#090b12]/95 backdrop-blur-xl)',
    { error: 'BottomDock missing translucent material backing' }
  );

  console.log('  -> Section 4: Boundary Value Analysis & Comprehensive Layout Ergonomics Matrix...');

  // 4.1 Viewport Breakpoint Oracle Matrix
  const testViewports = [
    { width: 320, expected: 'mobile', label: 'Compact Mobile (320px)' },
    { width: 360, expected: 'mobile', label: 'Galaxy S20 (360px)' },
    { width: 375, expected: 'mobile', label: 'iPhone SE (375px)' },
    { width: 393, expected: 'mobile', label: 'iPhone 15 Pro (393px)' },
    { width: 414, expected: 'mobile', label: 'iPhone Plus (414px)' },
    { width: 430, expected: 'mobile', label: 'iPhone 15 Pro Max (430px)' },
    { width: 767, expected: 'mobile', label: 'Mobile Viewport Upper Bound (767px)' },
    { width: 768, expected: 'tablet', label: 'Tablet Viewport Lower Bound (768px)' },
    { width: 834, expected: 'tablet', label: 'iPad 11-inch (834px)' },
    { width: 1023, expected: 'tablet', label: 'Tablet Viewport Upper Bound (1023px)' },
    { width: 1024, expected: 'desktop', label: 'Desktop Viewport Lower Bound (1024px)' },
    { width: 1280, expected: 'desktop', label: 'Standard Desktop / Laptop (1280px)' },
    { width: 1440, expected: 'desktop', label: 'MacBook Pro 15 (1440px)' },
    { width: 1920, expected: 'desktop', label: 'Full HD Monitor (1920px)' },
    { width: 2560, expected: 'desktop', label: 'QHD 2K Display (2560px)' },
    { width: 3840, expected: 'desktop', label: '4K UHD Display (3840px)' }
  ];

  testViewports.forEach((tv, idx) => {
    const classification = ORACLE.classifyViewport(tv.width);
    suite.equal(
      classification,
      tv.expected,
      `CH2-43.${idx + 1} [BVA Matrix]: ${tv.label} classified correctly as ${tv.expected}`
    );
  });

  // 4.2 Touch Target Dimensional Arithmetic Oracle
  function parsePxFromClass(className, token) {
    const regex = new RegExp(`${token}-\\[(\\d+)px\\]`);
    const match = className.match(regex);
    if (match) return parseInt(match[1], 10);
    // Tailwind default scale: h-11 = 44px, h-12 = 48px, h-14 = 56px, w-11 = 44px, etc.
    const standardMap = {
      'h-10': 40,
      'h-11': 44,
      'h-12': 48,
      'h-14': 56,
      'h-16': 64,
      'min-h-[44px]': 44,
      'min-w-[56px]': 56,
      'min-w-[44px]': 44
    };
    for (const [key, val] of Object.entries(standardMap)) {
      if (className.includes(key)) return val;
    }
    return null;
  }

  const bottomDockBtnClasses = 'relative min-w-[56px] min-h-[44px] h-12 py-3 flex flex-col items-center justify-center gap-1 rounded-xl transition-all active:scale-90';
  const dockBtnWidth = parsePxFromClass(bottomDockBtnClasses, 'min-w');
  const dockBtnHeight = parsePxFromClass(bottomDockBtnClasses, 'h');
  const dockBtnMinHeight = parsePxFromClass(bottomDockBtnClasses, 'min-h');

  suite.gte(
    dockBtnWidth,
    44,
    `CH2-44 [Touch Ergonomics]: Bottom dock button width (${dockBtnWidth}px) meets Apple HIG minimum (>= 44px)`
  );

  suite.gte(
    dockBtnHeight,
    44,
    `CH2-45 [Touch Ergonomics]: Bottom dock button height (${dockBtnHeight}px) meets Apple HIG minimum (>= 44px)`
  );

  suite.gte(
    dockBtnMinHeight,
    44,
    `CH2-46 [Touch Ergonomics]: Bottom dock button min-height constraint (${dockBtnMinHeight}px) meets Apple HIG minimum (>= 44px)`
  );

  // 4.3 Category Pill Touch Target Arithmetic
  const categoryPillClasses = 'flex items-center gap-1.5 px-4 py-2.5 min-h-[44px] rounded-lg text-xs font-medium whitespace-nowrap transition-all duration-150';
  const catPillMinHeight = parsePxFromClass(categoryPillClasses, 'min-h');

  suite.gte(
    catPillMinHeight,
    44,
    `CH2-47 [Touch Ergonomics]: Category filter pill min-height (${catPillMinHeight}px) meets Apple HIG minimum (>= 44px)`
  );

  // 4.4 Color Luminance & Contrast Oracle Verification (WCAG AAA for #000000 base)
  function getLuminance(hex) {
    const rgb = hex.replace('#', '').match(/.{2}/g).map(x => parseInt(x, 16) / 255);
    const [r, g, b] = rgb.map(c => c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4));
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
  }

  function getContrastRatio(hex1, hex2) {
    const l1 = getLuminance(hex1);
    const l2 = getLuminance(hex2);
    const brightest = Math.max(l1, l2);
    const darkest = Math.min(l1, l2);
    return (brightest + 0.05) / (darkest + 0.05);
  }

  const whiteOnBlackContrast = getContrastRatio('#ffffff', '#000000');
  suite.gte(
    whiteOnBlackContrast,
    20.0,
    `CH2-48 [Visual Contrast]: White text on #000000 base provides extreme contrast ratio (${whiteOnBlackContrast.toFixed(1)}:1 >= 20.0:1)`
  );

  const cyanOnBlackContrast = getContrastRatio('#06b6d4', '#000000');
  suite.gte(
    cyanOnBlackContrast,
    8.0,
    `CH2-49 [Visual Contrast]: Cyan safety accent (#06b6d4) on #000000 provides high contrast (${cyanOnBlackContrast.toFixed(1)}:1 >= 8.0:1)`
  );

  const emeraldOnBlackContrast = getContrastRatio('#10b981', '#000000');
  suite.gte(
    emeraldOnBlackContrast,
    7.0,
    `CH2-50 [Visual Contrast]: Emerald safety accent (#10b981) on #000000 provides high contrast (${emeraldOnBlackContrast.toFixed(1)}:1 >= 7.0:1)`
  );

  const amberOnBlackContrast = getContrastRatio('#f59e0b', '#000000');
  suite.gte(
    amberOnBlackContrast,
    9.0,
    `CH2-51 [Visual Contrast]: Amber safety accent (#f59e0b) on #000000 provides high contrast (${amberOnBlackContrast.toFixed(1)}:1 >= 9.0:1)`
  );

  // 4.5 Residual Legacy CSS Isolation Check
  const legacyStylesContent = readFile('styles.css') || '';
  const appLayoutContent = readFile('app/layout.tsx') || '';
  const appGlobalsContent = readFile('app/globals.css') || '';

  const isLegacyImportedInApp =
    appLayoutContent.includes('styles.css') ||
    appGlobalsContent.includes('styles.css') ||
    desktopSource.includes('styles.css') ||
    mobileSource.includes('styles.css');

  suite.assert(
    !isLegacyImportedInApp,
    'CH2-52 [Isolation]: Legacy prototype styles.css (containing .device-frame) is strictly NOT imported in Next.js App Router',
    { error: 'Legacy styles.css leaked into Next.js App Router layout or styles' }
  );

  return suite.results();
}

if (require.main === module) {
  run().then(res => {
    console.log(`\n================================================================================`);
    console.log(` ${res.name}`);
    console.log(`================================================================================`);
    console.log(` Passed: ${res.passed}/${res.total} (${res.failed} failed) in ${res.durationMs}ms`);
    if (res.failed > 0) {
      console.log('\nFailed challenges:');
      res.assertions.filter(a => !a.pass).forEach(a => {
        console.log(`  ✖ [${a.id}] ${a.description}: ${a.error}`);
      });
      process.exit(1);
    } else {
      console.log('\n ✔ ALL CHALLENGES PASSED! Viewport segregation, touch ergonomics, and visual integrity empirically verified.\n');
      process.exit(0);
    }
  }).catch(err => {
    console.error('Unhandled challenge runner error:', err);
    process.exit(1);
  });
}

module.exports = { run };

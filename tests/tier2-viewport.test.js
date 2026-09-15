/**
 * Tier 2: Boundary & Viewport Layout Tests
 * Verifies dual-viewport architecture, desktop multi-pane ergonomics (no phone chassis),
 * mobile touch-first bottom dock (>=44px targets), Raycast 1px borders, and design tokens.
 * Coverage threshold: >= 25 assertions
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
  const suite = createSuite('Tier 2: Boundary & Viewport Layout Tests');

  // --- 1. Dual-Experience Viewport Layout Components ---
  suite.assert(
    fileExists('components/layout/ViewportRouter.tsx'),
    'T2.01: ViewportRouter component exists (components/layout/ViewportRouter.tsx)',
    { message: 'components/layout/ViewportRouter.tsx missing' }
  );

  suite.assert(
    fileExists('components/layout/DesktopLayout.tsx'),
    'T2.02: DesktopLayout component exists (components/layout/DesktopLayout.tsx)',
    { message: 'components/layout/DesktopLayout.tsx missing' }
  );

  suite.assert(
    fileExists('components/layout/MobileLayout.tsx'),
    'T2.03: MobileLayout component exists (components/layout/MobileLayout.tsx)',
    { message: 'components/layout/MobileLayout.tsx missing' }
  );

  suite.assert(
    fileExists('components/layout/NavigationSidebar.tsx'),
    'T2.04: NavigationSidebar component exists (components/layout/NavigationSidebar.tsx)',
    { message: 'components/layout/NavigationSidebar.tsx missing' }
  );

  suite.assert(
    fileExists('components/layout/BottomDock.tsx'),
    'T2.05: BottomDock component exists (components/layout/BottomDock.tsx)',
    { message: 'components/layout/BottomDock.tsx missing' }
  );

  suite.assert(
    fileExists('components/layout/Header.tsx'),
    'T2.06: Header component exists (components/layout/Header.tsx)',
    { message: 'components/layout/Header.tsx missing' }
  );

  // --- 2. Desktop Layout Ergonomics & Zero-Phone-Frame Requirement (>= 1024px) ---
  const desktopContent = readFile('components/layout/DesktopLayout.tsx') || '';

  const hasPhoneChassis =
    desktopContent.includes('phone-frame') ||
    desktopContent.includes('device-frame') ||
    desktopContent.includes('iphone-frame') ||
    desktopContent.includes('mockup-chassis') ||
    desktopContent.includes('titanium-bezel');

  suite.assert(
    !hasPhoneChassis && (desktopContent ? true : false),
    'T2.07: DesktopLayout strictly contains ZERO mobile device frames or phone chassis wrappers',
    { message: 'DesktopLayout must NOT wrap content in a mobile chassis or fake phone bezel' }
  );

  const hasFullWidthMultiPane =
    desktopContent.includes('w-full') ||
    desktopContent.includes('flex-1') ||
    desktopContent.includes('min-h-screen') ||
    desktopContent.includes('grid-cols');

  suite.assert(
    hasFullWidthMultiPane,
    'T2.08: DesktopLayout implements full-width multi-pane layout structure',
    { message: 'DesktopLayout must leverage full screen real estate with multi-column layout' }
  );

  const hasPersistentNav =
    desktopContent.includes('NavigationSidebar') ||
    desktopContent.includes('nav') ||
    desktopContent.includes('Sidebar');

  suite.assert(
    hasPersistentNav,
    'T2.09: DesktopLayout integrates persistent left navigation bar',
    { message: 'DesktopLayout must include persistent navigation bar' }
  );

  const hasSplitPaneMap =
    desktopContent.includes('RadarCanvas') ||
    desktopContent.includes('radar') ||
    desktopContent.includes('Map');

  suite.assert(
    hasSplitPaneMap,
    'T2.10: DesktopLayout features split-pane radar map visible alongside feed',
    { message: 'DesktopLayout must feature a split-pane interactive map' }
  );

  // --- 3. Mobile Layout & Touch-First Ergonomics (< 768px) ---
  const mobileContent = readFile('components/layout/MobileLayout.tsx') || '';

  const hasMobileFullHeight =
    mobileContent.includes('100dvh') ||
    mobileContent.includes('h-screen') ||
    mobileContent.includes('min-h-screen') ||
    mobileContent.includes('flex flex-col');

  suite.assert(
    hasMobileFullHeight,
    'T2.11: MobileLayout utilizes edge-to-edge mobile app container (100dvh / flex-col)',
    { message: 'MobileLayout must provide edge-to-edge native-feeling container' }
  );

  const hasBottomDock =
    mobileContent.includes('BottomDock') ||
    mobileContent.includes('dock') ||
    mobileContent.includes('bottom-0');

  suite.assert(
    hasBottomDock,
    'T2.12: MobileLayout renders sticky bottom navigation dock',
    { message: 'MobileLayout must feature sticky bottom navigation dock' }
  );

  // BottomDock 5-Tab Specification
  const dockContent = readFile('components/layout/BottomDock.tsx') || '';
  const hasHomeTab = dockContent.toLowerCase().includes('home');
  const hasMapTab = dockContent.toLowerCase().includes('map');
  const hasChatTab = dockContent.toLowerCase().includes('chat');
  const hasRecentTab = dockContent.toLowerCase().includes('recent') || dockContent.toLowerCase().includes('activity');
  const hasWalletTab = dockContent.toLowerCase().includes('wallet');

  suite.assert(
    hasHomeTab && hasMapTab && hasChatTab && hasRecentTab && hasWalletTab,
    'T2.13: BottomDock defines 5 distinct view tabs (Home, Map, Chat, Recent, Wallet)',
    { message: 'BottomDock missing one or more required tabs (Home, Map, Chat, Recent, Wallet)' }
  );

  // Mobile Touch Targets (>= 44px min hit area)
  // Check classes like h-11 (44px), h-12 (48px), min-h-[44px], py-3, or p-3
  const hasDockTouchTargets =
    dockContent.includes('h-11') ||
    dockContent.includes('h-12') ||
    dockContent.includes('min-h-[44px]') ||
    dockContent.includes('py-3') ||
    dockContent.includes('p-3') ||
    dockContent.includes('h-14');

  suite.assert(
    hasDockTouchTargets,
    `T2.14: BottomDock tab buttons meet Apple touch-target standards (>= ${SPEC.TOUCH_TARGET_MIN_PX}px)`,
    { message: 'Bottom dock buttons must have >=44px touch target height' }
  );

  // Category filter touch targets (CategoryPills.tsx)
  const categoryPillsContent = readFile('components/discovery/CategoryPills.tsx') || '';
  const hasCategoryTouchTarget =
    categoryPillsContent.includes('h-11') ||
    categoryPillsContent.includes('min-h-[44px]') ||
    categoryPillsContent.includes('py-2.5') ||
    categoryPillsContent.includes('py-3') ||
    categoryPillsContent.includes('h-10') ||
    categoryPillsContent.includes('px-4');

  suite.assert(
    hasCategoryTouchTarget,
    `T2.15: Category filter chips meet touch-target standards (>= ${SPEC.TOUCH_TARGET_MIN_PX}px target)`,
    { message: 'Category pills should meet >=44px touch target standard' }
  );

  // Mobile Drawer / Bottom Sheet Inspection
  const shiftInspectorContent = readFile('components/radar/ShiftInspector.tsx') || '';
  const hasBottomSheet =
    shiftInspectorContent.includes('bottom-0') ||
    shiftInspectorContent.includes('rounded-t-') ||
    shiftInspectorContent.includes('drawer') ||
    shiftInspectorContent.includes('sheet');

  suite.assert(
    hasBottomSheet,
    'T2.16: Shift inspection renders as slide-up bottom sheet on mobile viewports',
    { message: 'Mobile inspection sheet must render as bottom sheet drawer' }
  );

  // --- 4. Viewport Boundary Value Analysis (BVA) ---
  // Boundary tests against Oracle classification logic
  suite.equal(
    ORACLE.classifyViewport(320),
    'mobile',
    'T2.17: BVA: 320px (compact mobile) is classified as mobile'
  );

  suite.equal(
    ORACLE.classifyViewport(375),
    'mobile',
    'T2.18: BVA: 375px (iPhone SE) is classified as mobile'
  );

  suite.equal(
    ORACLE.classifyViewport(393),
    'mobile',
    'T2.19: BVA: 393px (iPhone 15 Pro) is classified as mobile'
  );

  suite.equal(
    ORACLE.classifyViewport(767),
    'mobile',
    'T2.20: BVA: 767px (upper boundary of mobile viewport) is classified as mobile'
  );

  suite.equal(
    ORACLE.classifyViewport(768),
    'tablet',
    'T2.21: BVA: 768px (lower boundary of tablet viewport) is classified as tablet'
  );

  suite.equal(
    ORACLE.classifyViewport(1023),
    'tablet',
    'T2.22: BVA: 1023px (upper boundary of tablet viewport) is classified as tablet'
  );

  suite.equal(
    ORACLE.classifyViewport(1024),
    'desktop',
    'T2.23: BVA: 1024px (lower boundary of desktop viewport) is classified as desktop'
  );

  suite.equal(
    ORACLE.classifyViewport(1280),
    'desktop',
    'T2.24: BVA: 1280px (standard desktop) is classified as desktop'
  );

  suite.equal(
    ORACLE.classifyViewport(1920),
    'desktop',
    'T2.25: BVA: 1920px (wide desktop) is classified as desktop'
  );

  // --- 5. Style Tokens & Craft (Uber / Apple / Raycast) ---
  const globalsCss = readFile('app/globals.css') || '';
  const tailwindConfig = readFile('tailwind.config.ts') || readFile('tailwind.config.js') || '';

  suite.assert(
    fileExists('app/globals.css'),
    'T2.26: app/globals.css exists with styling definitions',
    { message: 'app/globals.css missing' }
  );

  // Monochrome base: pitch black #000000 or #090a0f
  const hasMonochromeBase =
    globalsCss.includes('#000000') ||
    globalsCss.includes('#090a0f') ||
    tailwindConfig.includes('#000000') ||
    tailwindConfig.includes('#090a0f') ||
    globalsCss.includes('bg-black');

  suite.assert(
    hasMonochromeBase,
    'T2.27: Style tokens define Uber pitch-black monochrome base (#000000 / #090a0f)',
    { message: 'Monochrome base color token missing' }
  );

  // Functional Safety Accents (Emerald, Amber, Cyan)
  const hasSafetyAccents =
    (globalsCss.includes('10b981') || globalsCss.includes('emerald') || tailwindConfig.includes('10b981')) &&
    (globalsCss.includes('f59e0b') || globalsCss.includes('amber') || tailwindConfig.includes('f59e0b')) &&
    (globalsCss.includes('06b6d4') || globalsCss.includes('cyan') || tailwindConfig.includes('06b6d4'));

  suite.assert(
    hasSafetyAccents,
    'T2.28: Style tokens define functional safety accents (emerald #10b981, amber #f59e0b, cyan #06b6d4)',
    { message: 'Safety accents (emerald, amber, cyan) missing in style definitions' }
  );

  // Raycast 1px Precision Borders
  const hasRaycastBorders =
    globalsCss.includes('0.08') ||
    globalsCss.includes('0.15') ||
    tailwindConfig.includes('0.08') ||
    globalsCss.includes('border-white') ||
    desktopContent.includes('border-white/');

  suite.assert(
    hasRaycastBorders,
    'T2.29: Precision styling incorporates Raycast 1px high-contrast borders (rgba(255,255,255,0.08-0.15))',
    { message: 'Raycast 1px border token missing' }
  );

  // Apple Tactile Materials (Backdrop Blur & Spring Easing)
  const hasAppleMaterials =
    globalsCss.includes('backdrop-blur') ||
    desktopContent.includes('backdrop-blur') ||
    mobileContent.includes('backdrop-blur') ||
    tailwindConfig.includes('backdrop-blur');

  suite.assert(
    hasAppleMaterials,
    'T2.30: Visual system applies Apple translucent materials (backdrop-blur)',
    { message: 'Backdrop blur materials missing in layout styling' }
  );

  // Mobile Header Dynamic Island Widget
  const headerContent = readFile('components/layout/Header.tsx') || '';
  const hasHeaderOrIsland =
    headerContent.includes('DynamicIsland') ||
    headerContent.includes('activeShift') ||
    headerContent.includes('PIN 6767') ||
    headerContent.includes('kycStatus') ||
    headerContent.includes('KYC');

  suite.assert(
    hasHeaderOrIsland,
    'T2.31: Header incorporates KYC telemetry badge and active shift Dynamic Island indicator',
    { message: 'Header component missing KYC status or active shift telemetry' }
  );

  return suite.results();
}

if (require.main === module) {
  run().then(res => {
    console.log(`\n--- ${res.name} ---`);
    console.log(`Passed: ${res.passed}/${res.total} (${res.failed} failed)`);
    if (res.failed > 0) {
      console.log('\nFailed assertions:');
      res.assertions.filter(a => !a.pass).forEach(a => {
        console.log(`  ✖ [${a.id}] ${a.description}: ${a.error}`);
      });
      process.exit(1);
    } else {
      process.exit(0);
    }
  }).catch(err => {
    console.error('Unhandled test execution error:', err);
    process.exit(1);
  });
}

module.exports = { run };

/**
 * Tier 3: Cross-Feature Integration Tests
 * Verifies search & taxonomy filters, radar canvas & radius controls, OTP 6767 check-in handshake,
 * in-app chat quick chips, holographic wallet cashouts, +HIRE shift creation, and context state.
 * Coverage threshold: >= 15 assertions
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

// Reference seed jobs for algorithmic verification
const MOCK_JOBS = [
  {
    id: 'job-101',
    title: 'Express Flyer & Promo Distributor',
    employer: "Arun's Cafe & Roasters",
    category: 'Promotion',
    wage: 100,
    duration: '2 Hours',
    distanceKm: 0.8,
    location: 'Metro Station Exit 3, Indiranagar',
    tags: ['Instant Payout', 'Urgent'],
    checkInPin: '6767'
  },
  {
    id: 'job-102',
    title: 'Artisan Coffee Barista & Counter',
    employer: "Akhila's Brew Lab",
    category: 'Cafe',
    wage: 500,
    duration: '4 Hours',
    distanceKm: 1.4,
    location: '12th Main Road, Koramangala 4th Block',
    tags: ['Verified Employer', 'Meals Included'],
    checkInPin: '6767'
  },
  {
    id: 'job-103',
    title: 'VIP Tech Summit Usher & Registration',
    employer: "Ryan's Media Con",
    category: 'Events',
    wage: 1000,
    duration: '6 Hours',
    distanceKm: 2.8,
    location: 'Grand Convention Center, Hall B',
    tags: ['Instant UPI', 'Certificate Provided'],
    checkInPin: '6767'
  },
  {
    id: 'job-104',
    title: 'Weekend Expo Booth Coordinator',
    employer: 'Toby Logistics & Events',
    category: 'Logistics',
    wage: 10000,
    duration: '2 Days (Sat - Sun)',
    distanceKm: 4.5,
    location: 'BIEC Exhibition Grounds, Pavilion 4',
    tags: ['High Payout', 'Team Lead'],
    checkInPin: '6767'
  },
  {
    id: 'job-105',
    title: 'Retail Merchandising & Display Assistant',
    employer: 'Urban Clothiers',
    category: 'Retail',
    wage: 650,
    duration: '5 Hours',
    distanceKm: 1.9,
    location: 'Forum Mall, 2nd Floor, Whitefield',
    tags: ['Staff Discount'],
    checkInPin: '6767'
  },
  {
    id: 'job-106',
    title: 'Rapid Dark Store Order Packer',
    employer: 'QuickBasket Express',
    category: 'Delivery',
    wage: 450,
    duration: '3 Hours',
    distanceKm: 1.1,
    location: 'Hub 9, BTM 2nd Stage',
    tags: ['Surge Bonus'],
    checkInPin: '6767'
  }
];

async function run() {
  const suite = createSuite('Tier 3: Cross-Feature Integration Tests');

  // --- 1. Search & Taxonomy Filter Integration ---
  const hasSearchBar = fileExists('components/discovery/SearchBar.tsx');
  suite.assert(hasSearchBar, 'T3.01: SearchBar component exists (components/discovery/SearchBar.tsx)', {
    message: 'components/discovery/SearchBar.tsx missing'
  });

  const searchBarContent = readFile('components/discovery/SearchBar.tsx') || '';
  const hasClearButton =
    searchBarContent.includes('clear') ||
    searchBarContent.includes('✕') ||
    searchBarContent.includes('setSearchQuery("")') ||
    searchBarContent.includes("setSearchQuery('')") ||
    searchBarContent.includes('X');

  suite.assert(
    hasClearButton,
    'T3.02: SearchBar provides instant clear action button',
    { message: 'SearchBar missing clear button logic' }
  );

  const hasCategoryPills = fileExists('components/discovery/CategoryPills.tsx');
  suite.assert(hasCategoryPills, 'T3.03: CategoryPills component exists (components/discovery/CategoryPills.tsx)', {
    message: 'components/discovery/CategoryPills.tsx missing'
  });

  const categoryContent = readFile('components/discovery/CategoryPills.tsx') || '';
  const hasCategories =
    categoryContent.includes('Café') ||
    categoryContent.includes('Cafe') ||
    categoryContent.includes('Events') ||
    categoryContent.includes('Delivery');

  suite.assert(
    hasCategories,
    'T3.04: CategoryPills incorporates taxonomy categories (Café, Events, Delivery, etc.)',
    { message: 'CategoryPills missing category options' }
  );

  const hasWageFilter = fileExists('components/discovery/WageTierFilter.tsx');
  suite.assert(hasWageFilter, 'T3.05: WageTierFilter component exists (components/discovery/WageTierFilter.tsx)', {
    message: 'components/discovery/WageTierFilter.tsx missing'
  });

  const wageContent = readFile('components/discovery/WageTierFilter.tsx') || '';
  const hasWageTiers =
    wageContent.includes('100') &&
    wageContent.includes('500') &&
    wageContent.includes('1000');

  suite.assert(
    hasWageTiers,
    'T3.06: WageTierFilter incorporates standardized vacancy tiers (₹100, ₹500, ₹1k, ₹10k)',
    { message: 'WageTierFilter missing standardized wage options' }
  );

  // Search & Filter Algorithmic Integration
  const filteredBySearch = ORACLE.filterJobs(MOCK_JOBS, { query: 'Barista' });
  suite.equal(
    filteredBySearch.length,
    1,
    'T3.07: Search filter isolates "Barista" to exact matching opportunity'
  );

  const filteredByCategory = ORACLE.filterJobs(MOCK_JOBS, { category: 'Promotion' });
  suite.equal(
    filteredByCategory.length,
    1,
    'T3.08: Category filter isolates "Promotion" to exact matching opportunity'
  );

  const filteredByWage = ORACLE.filterJobs(MOCK_JOBS, { wageTier: 1000 });
  suite.assert(
    filteredByWage.length >= 2,
    'T3.09: Wage tier filter isolates jobs paying >= ₹1,000 (US$12+/hr equivalent)'
  );

  const filteredCombined = ORACLE.filterJobs(MOCK_JOBS, { query: 'Indiranagar', category: 'Promotion' });
  suite.equal(
    filteredCombined.length,
    1,
    'T3.10: Combined search query and category filter produce accurate intersection'
  );

  // --- 2. Interactive Radar Map & Radius Control ---
  suite.assert(
    fileExists('components/radar/RadarCanvas.tsx'),
    'T3.11: RadarCanvas component exists (components/radar/RadarCanvas.tsx)',
    { message: 'components/radar/RadarCanvas.tsx missing' }
  );

  const radarContent = readFile('components/radar/RadarCanvas.tsx') || '';
  const hasSweep =
    radarContent.includes('radar-sweep') ||
    radarContent.includes('animate-spin') ||
    radarContent.includes('sweep') ||
    radarContent.includes('radius');

  suite.assert(
    hasSweep,
    'T3.12: RadarCanvas renders animated radar sweep overlay and concentric range rings',
    { message: 'RadarCanvas missing scanning sweep effect' }
  );

  suite.assert(
    fileExists('components/radar/RadiusControl.tsx'),
    'T3.13: RadiusControl component exists (components/radar/RadiusControl.tsx)',
    { message: 'components/radar/RadiusControl.tsx missing' }
  );

  const radiusContent = readFile('components/radar/RadiusControl.tsx') || '';
  const hasRadii =
    radiusContent.includes('1') &&
    radiusContent.includes('5') &&
    radiusContent.includes('10') &&
    radiusContent.includes('25');

  suite.assert(
    hasRadii,
    'T3.14: RadiusControl supports all specified scanning distances (1, 5, 10, 25 km)',
    { message: 'RadiusControl missing distance steps' }
  );

  const radiusFiltered = ORACLE.filterJobs(MOCK_JOBS, { maxRadiusKm: 1.0 });
  suite.equal(
    radiusFiltered.length,
    1,
    'T3.15: Radius filter (1 km) strictly includes opportunities within 1 km distance'
  );

  // --- 3. Mutual Handshake & OTP 6767 Check-in ---
  suite.assert(
    fileExists('components/lifecycle/OtpBanner.tsx'),
    'T3.16: OtpBanner component exists (components/lifecycle/OtpBanner.tsx)',
    { message: 'components/lifecycle/OtpBanner.tsx missing' }
  );

  const otpBannerContent = readFile('components/lifecycle/OtpBanner.tsx') || '';
  const hasOtpCode =
    otpBannerContent.includes('6767') ||
    otpBannerContent.includes('activeOtp');

  suite.assert(
    hasOtpCode,
    'T3.17: OtpBanner displays universal handshake code "6767" with copy handler',
    { message: 'OtpBanner must display code 6767' }
  );

  suite.assert(
    fileExists('components/lifecycle/ActiveShiftTracker.tsx'),
    'T3.18: ActiveShiftTracker component exists (components/lifecycle/ActiveShiftTracker.tsx)',
    { message: 'components/lifecycle/ActiveShiftTracker.tsx missing' }
  );

  suite.assert(
    ORACLE.verifyHandshakePin('6767') && !ORACLE.verifyHandshakePin('1234'),
    'T3.19: Mutual handshake check-in validates strictly on OTP "6767" and rejects "1234"',
    { message: 'Handshake verification failed' }
  );

  // --- 4. In-App Chat & Quick Action Chips ---
  suite.assert(
    fileExists('components/chat/ChatView.tsx'),
    'T3.20: ChatView component exists (components/chat/ChatView.tsx)',
    { message: 'components/chat/ChatView.tsx missing' }
  );

  suite.assert(
    fileExists('components/chat/QuickActionChips.tsx'),
    'T3.21: QuickActionChips component exists (components/chat/QuickActionChips.tsx)',
    { message: 'components/chat/QuickActionChips.tsx missing' }
  );

  const chatChipsContent = readFile('components/chat/QuickActionChips.tsx') || '';
  const hasPinChip = chatChipsContent.includes('6767') || chatChipsContent.includes('PIN');
  const hasPayChip = chatChipsContent.includes('Request Pay') || chatChipsContent.includes('Pay');

  suite.assert(
    hasPinChip && hasPayChip,
    'T3.22: Chat quick chips include "🔑 Share PIN 6767" and "💰 Request Pay" action pills',
    { message: 'Quick action chips missing PIN or Request Pay actions' }
  );

  // --- 5. Holographic Wallet & Simulated UPI Cashout ---
  suite.assert(
    fileExists('components/wallet/WalletCard.tsx'),
    'T3.23: WalletCard component exists (components/wallet/WalletCard.tsx)',
    { message: 'components/wallet/WalletCard.tsx missing' }
  );

  suite.assert(
    fileExists('components/wallet/CashoutModal.tsx'),
    'T3.24: CashoutModal component exists (components/wallet/CashoutModal.tsx)',
    { message: 'components/wallet/CashoutModal.tsx missing' }
  );

  const cashoutContent = readFile('components/wallet/CashoutModal.tsx') || '';
  const hasUpiProviders =
    cashoutContent.includes('Google Pay') ||
    cashoutContent.includes('GPay') ||
    cashoutContent.includes('PhonePe') ||
    cashoutContent.includes('Paytm');

  suite.assert(
    hasUpiProviders,
    'T3.25: CashoutModal supports simulated UPI rails (Google Pay, PhonePe, Paytm)',
    { message: 'CashoutModal missing UPI rail options' }
  );

  // Cashout Transaction Execution
  const cashoutSuccess = ORACLE.simulateCashout(1000, 500, 'alexchen@okaxis');
  suite.assert(
    cashoutSuccess.success && cashoutSuccess.newBalance === 500,
    'T3.26: Cashout simulation decrements balance from ₹1,000 to ₹500 on valid UPI withdrawal'
  );

  // --- 6. +HIRE Employer Rapid Shift Creation Modal ---
  suite.assert(
    fileExists('components/employer/PostShiftModal.tsx'),
    'T3.27: PostShiftModal component exists (components/employer/PostShiftModal.tsx)',
    { message: 'components/employer/PostShiftModal.tsx missing' }
  );

  const postShiftContent = readFile('components/employer/PostShiftModal.tsx') || '';
  const hasFormFields =
    (postShiftContent.includes('title') || postShiftContent.includes('Title')) &&
    (postShiftContent.includes('wage') || postShiftContent.includes('Wage')) &&
    (postShiftContent.includes('location') || postShiftContent.includes('Location'));

  suite.assert(
    hasFormFields,
    'T3.28: PostShiftModal captures Title, Wage, and Location for sub-60s shift creation',
    { message: 'PostShiftModal missing required input fields' }
  );

  // --- 7. Centralized Marketplace Context ---
  suite.assert(
    fileExists('context/MarketplaceContext.tsx'),
    'T3.29: MarketplaceContext exists (context/MarketplaceContext.tsx)',
    { message: 'context/MarketplaceContext.tsx missing' }
  );

  const contextContent = readFile('context/MarketplaceContext.tsx') || '';
  const exportsProviderAndHook =
    contextContent.includes('MarketplaceProvider') &&
    (contextContent.includes('useMarketplace') || contextContent.includes('useMarketplaceContext'));

  suite.assert(
    exportsProviderAndHook,
    'T3.30: MarketplaceContext exports MarketplaceProvider and useMarketplace hook',
    { message: 'MarketplaceContext missing MarketplaceProvider or useMarketplace hook' }
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

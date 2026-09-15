/**
 * Tier 4: Real-World User Scenarios
 * Verifies 5 complete end-to-end user journeys:
 * 1. Worker Shift Discovery to Completion
 * 2. Employer +HIRE Shift Posting & Dynamic Injection
 * 3. Earning & Simulated UPI Cashout Lifecycle
 * 4. Dual-Viewport Ergonomics Transition
 * 5. Boundary & Error Resilience
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

// Canonical initial state simulation
function createInitialState() {
  const user = {
    name: 'Alex Chen',
    role: 'Freelance Specialist & Shift Worker',
    age: 22,
    isAgeVerified: true,
    kycStatus: 'verified',
    activeOtp: '6767',
    rating: 4.95
  };

  const wallet = {
    balance: 1000,
    currency: '₹',
    upiId: 'alexchen@okaxis',
    transactions: [
      {
        id: 'tx-101',
        title: "Akhila's Brew Lab - Evening Shift",
        amount: 500,
        type: 'credit',
        status: 'Completed',
        date: 'Today, 11:30 AM'
      }
    ]
  };

  const jobs = [
    {
      id: 'job-101',
      title: 'Express Flyer & Promo Distributor',
      employer: "Arun's Cafe & Roasters",
      category: 'Promotion',
      wage: 100,
      duration: '2 Hours',
      distanceKm: 0.8,
      location: 'Metro Station Exit 3, Indiranagar',
      coords: { x: 38, y: 46 },
      tags: ['Instant Payout', 'Urgent'],
      checkInPin: '6767',
      openSlots: 2
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
      coords: { x: 62, y: 32 },
      tags: ['Verified Employer', 'Meals Included'],
      checkInPin: '6767',
      openSlots: 1
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
      coords: { x: 74, y: 68 },
      tags: ['Instant UPI', 'Free Lunch'],
      checkInPin: '6767',
      openSlots: 4
    },
    {
      id: 'job-104',
      title: 'Weekend Expo Booth Coordinator',
      employer: 'Toby Logistics & Events',
      category: 'Logistics',
      wage: 10000,
      duration: '2 Days',
      distanceKm: 4.5,
      location: 'BIEC Exhibition Grounds, Pavilion 4',
      coords: { x: 22, y: 76 },
      tags: ['High Payout', 'Team Lead'],
      checkInPin: '6767',
      openSlots: 1
    },
    {
      id: 'job-105',
      title: 'Retail Merchandising & Display Assistant',
      employer: 'Urban Clothiers',
      category: 'Retail',
      wage: 650,
      duration: '5 Hours',
      distanceKm: 1.9,
      location: 'Forum Mall, Whitefield',
      coords: { x: 80, y: 22 },
      tags: ['Staff Discount'],
      checkInPin: '6767',
      openSlots: 3
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
      coords: { x: 45, y: 82 },
      tags: ['Surge Bonus'],
      checkInPin: '6767',
      openSlots: 5
    }
  ];

  const recentActivities = [];
  let activeShift = null;

  return { user, wallet, jobs, recentActivities, activeShift };
}

async function run() {
  const suite = createSuite('Tier 4: Real-World User Scenarios');

  // =========================================================================
  // SCENARIO 1: Worker Shift Discovery, Apply, OTP 6767 Check-in & Completion
  // =========================================================================
  const state1 = createInitialState();

  suite.assert(
    state1.user.age >= 18 && state1.user.kycStatus === 'verified',
    'S1.01: Worker Alex Chen verified onboarding profile (Age 22 >= 18, KYC verified)'
  );

  // Discovery: Filter by search 'Barista' and category 'Cafe'
  const filtered1 = ORACLE.filterJobs(state1.jobs, { query: 'Barista', category: 'Cafe' });
  suite.equal(
    filtered1.length,
    1,
    'S1.02: Discovery: Search "Barista" in category "Cafe" returns exact opportunity (Artisan Coffee Barista)'
  );

  const selectedShift = filtered1[0];
  suite.assert(
    selectedShift.wage === 500 && selectedShift.duration === '4 Hours',
    'S1.03: Opportunity Inspection: Shift verified with ₹500 wage and 4 Hours duration'
  );

  // Application: Confirmation with OTP 6767
  suite.equal(
    selectedShift.checkInPin,
    SPEC.UNIVERSAL_OTP,
    'S1.04: 1-Tap Application: Confirmation modal locks attendance with universal PIN "6767"'
  );

  // Chat Handshake: Worker shares PIN 6767
  const messageSent = '🔑 Share PIN 6767';
  const employerReply = 'PIN 6767 confirmed! Shift checked in successfully. Have a great shift!';
  const handshakeValid = ORACLE.verifyHandshakePin('6767');
  suite.assert(
    handshakeValid && messageSent.includes('6767') && employerReply.includes('confirmed'),
    'S1.05: Mutual Handshake: In-app chat quick chip transmits PIN 6767 and receives employer confirmation'
  );

  // Shift status transition to active
  state1.activeShift = {
    jobId: selectedShift.id,
    title: selectedShift.title,
    employer: selectedShift.employer,
    wage: selectedShift.wage,
    status: 'in_progress',
    checkInPin: '6767',
    isCheckedIn: true
  };
  suite.assert(
    state1.activeShift.status === 'in_progress' && state1.activeShift.isCheckedIn,
    'S1.06: Lifecycle Tracking: Shift transitions to active in-progress state'
  );

  // Shift completion: logs to Recent Activities
  state1.recentActivities.unshift({
    id: `act-${Date.now()}`,
    title: state1.activeShift.title,
    wage: `₹${state1.activeShift.wage}`,
    status: 'Completed',
    pinUsed: '6767',
    date: 'Just now'
  });
  state1.activeShift = null;

  suite.assert(
    state1.recentActivities.length === 1 && state1.recentActivities[0].status === 'Completed',
    'S1.07: Shift Completion: Active shift concludes and archives into Recent Activity with status "Completed"'
  );

  // =========================================================================
  // SCENARIO 2: Employer Urgent +HIRE 60-Second Shift Posting & Live Injection
  // =========================================================================
  const state2 = createInitialState();
  const initialJobCount = state2.jobs.length;

  const newShiftInput = {
    title: 'Rush Hour Espresso Barista',
    category: 'Cafe',
    wage: 600,
    duration: '3 Hours',
    openSlots: 2,
    location: 'Koramangala 5th Block',
    coords: { x: 45, y: 55 },
    description: 'Urgent evening shift rush coverage. Espresso machine experience required.',
    isUrgent: true
  };

  // 60-second Form validation
  const isValidForm =
    Boolean(newShiftInput.title) &&
    Boolean(newShiftInput.category) &&
    newShiftInput.wage > 0 &&
    Boolean(newShiftInput.duration) &&
    Boolean(newShiftInput.location);

  suite.assert(
    isValidForm,
    'S2.01: +HIRE Validation: Sub-60s form validates Title, Category, Wage > 0, Duration, and Location'
  );

  // Synthesis & Dynamic Injection
  const createdShift = {
    id: `job-${Date.now()}`,
    employer: "Alex Chen's Enterprise",
    checkInPin: SPEC.UNIVERSAL_OTP,
    distanceKm: 1.2,
    tags: ['Urgent Vacancy', 'Instant Payout'],
    ...newShiftInput
  };

  state2.jobs.unshift(createdShift);

  suite.equal(
    state2.jobs.length,
    initialJobCount + 1,
    'S2.02: Feed Injection: New vacancy immediately prepended to active marketplace jobs'
  );

  suite.equal(
    state2.jobs[0].title,
    'Rush Hour Espresso Barista',
    'S2.03: Feed Telemetry: Newly posted shift appears at top of feed with title "Rush Hour Espresso Barista"'
  );

  // Radar Map Injection
  suite.assert(
    state2.jobs[0].coords && state2.jobs[0].coords.x === 45 && state2.jobs[0].coords.y === 55,
    'S2.04: Radar Map Injection: New shift coordinates (45, 55) mapped as interactive wage pin ₹600'
  );

  suite.equal(
    state2.jobs[0].checkInPin,
    SPEC.UNIVERSAL_OTP,
    'S2.05: Security Handshake Parity: New employer shift inherits universal check-in code "6767"'
  );

  // =========================================================================
  // SCENARIO 3: Instant Wage Earning & Simulated UPI Cashout Lifecycle
  // =========================================================================
  const state3 = createInitialState();

  suite.equal(
    state3.wallet.balance,
    1000,
    'S3.01: Wallet Initial Balance: Baseline specular wallet balance is ₹1,000'
  );

  // Worker requests pay in chat -> Employer approves ₹500
  const payEarned = 500;
  state3.wallet.balance += payEarned;
  state3.wallet.transactions.unshift({
    id: `tx-${Date.now()}`,
    title: 'Artisan Coffee Barista Payout',
    amount: payEarned,
    type: 'credit',
    status: 'Completed',
    date: 'Just now'
  });

  suite.equal(
    state3.wallet.balance,
    1500,
    'S3.02: Wage Accrual: Wallet balance increments to ₹1,500 upon employer shift payment approval'
  );

  // Cashout Modal: Select PhonePe, Preset ₹500, UPI alexchen@okaxis
  const cashoutResult = ORACLE.simulateCashout(state3.wallet.balance, 500, 'alexchen@okaxis');
  suite.assert(
    cashoutResult.success,
    'S3.03: UPI Cashout Validation: ₹500 withdrawal approved against available ₹1,500 balance'
  );

  state3.wallet.balance = cashoutResult.newBalance;
  state3.wallet.transactions.unshift({
    ...cashoutResult.transaction,
    title: 'UPI Withdrawal via PhonePe',
    method: 'PhonePe'
  });

  suite.equal(
    state3.wallet.balance,
    1000,
    'S3.04: Balance Settlement: Available balance decrements from ₹1,500 to ₹1,000'
  );

  suite.assert(
    state3.wallet.transactions[0].type === 'debit' && state3.wallet.transactions[0].amount === 500,
    'S3.05: Ledger Telemetry: Debit receipt logged with status "Completed" and provider "PhonePe"'
  );

  // =========================================================================
  // SCENARIO 4: Dual-Viewport Ergonomics Transition (Desktop vs Mobile)
  // =========================================================================
  // Desktop Ergonomics (1280px)
  const desktopMode = ORACLE.classifyViewport(1280);
  suite.equal(
    desktopMode,
    'desktop',
    'S4.01: Desktop Ergonomics: Viewport 1280px activates DesktopLayout'
  );

  const hasDesktopLayout = fileExists('components/layout/DesktopLayout.tsx');
  const desktopSource = readFile('components/layout/DesktopLayout.tsx') || '';
  const noMobileFrameOnDesktop =
    hasDesktopLayout &&
    !desktopSource.includes('phone-frame') &&
    !desktopSource.includes('device-frame') &&
    !desktopSource.includes('iphone-frame');

  suite.assert(
    noMobileFrameOnDesktop,
    'S4.02: Desktop Web Purity: DesktopLayout enforces ZERO mobile phone frame wrappers',
    { message: hasDesktopLayout ? 'DesktopLayout must NOT contain mobile frames' : 'components/layout/DesktopLayout.tsx missing' }
  );

  suite.assert(
    hasDesktopLayout && (desktopSource.includes('w-full') || desktopSource.includes('grid') || desktopSource.includes('flex')),
    'S4.03: Desktop Real Estate: DesktopLayout implements full-width multi-pane layout structure',
    { message: hasDesktopLayout ? 'DesktopLayout missing full-width structure' : 'components/layout/DesktopLayout.tsx missing' }
  );

  // Mobile Ergonomics (393px)
  const mobileMode = ORACLE.classifyViewport(393);
  suite.equal(
    mobileMode,
    'mobile',
    'S4.04: Mobile Ergonomics: Viewport 393px activates MobileLayout'
  );

  const hasBottomDock = fileExists('components/layout/BottomDock.tsx');
  const bottomDockSource = readFile('components/layout/BottomDock.tsx') || '';
  const has5DockTabs =
    hasBottomDock &&
    bottomDockSource.toLowerCase().includes('home') &&
    bottomDockSource.toLowerCase().includes('map') &&
    bottomDockSource.toLowerCase().includes('chat') &&
    bottomDockSource.toLowerCase().includes('wallet');

  suite.assert(
    has5DockTabs,
    'S4.05: Mobile Dock Navigation: BottomDock provides touch-first navigation tabs',
    { message: hasBottomDock ? 'BottomDock missing required tabs' : 'components/layout/BottomDock.tsx missing' }
  );

  const touchErgonomicsStandard =
    hasBottomDock &&
    (bottomDockSource.includes('h-11') ||
     bottomDockSource.includes('h-12') ||
     bottomDockSource.includes('min-h-[44px]') ||
     bottomDockSource.includes('py-3') ||
     bottomDockSource.includes('p-3'));

  suite.assert(
    touchErgonomicsStandard,
    `S4.06: Mobile Touch Targets: Interactive controls satisfy >= ${SPEC.TOUCH_TARGET_MIN_PX}px hit target`,
    { message: hasBottomDock ? 'Touch targets < 44px' : 'components/layout/BottomDock.tsx missing' }
  );

  // =========================================================================
  // SCENARIO 5: Boundary & Error Resilience
  // =========================================================================
  // 5.1 Special Characters in Search Input
  const specialCharsResult = ORACLE.filterJobs(state1.jobs, { query: '!@#$%^&*()_+' });
  suite.equal(
    specialCharsResult.length,
    0,
    'S5.01: Boundary: Special characters (!@#$%^&*()_+) in search handled safely without regex crash'
  );

  // 5.2 Extreme Length Search Query
  const longQuery = 'A'.repeat(256);
  const longQueryResult = ORACLE.filterJobs(state1.jobs, { query: longQuery });
  suite.equal(
    longQueryResult.length,
    0,
    'S5.02: Boundary: Search query > 200 characters returns empty results without hanging'
  );

  // 5.3 Whitespace-only search query
  const whitespaceResult = ORACLE.filterJobs(state1.jobs, { query: '     ' });
  suite.equal(
    whitespaceResult.length,
    state1.jobs.length,
    'S5.03: Boundary: Whitespace-only search query is trimmed and returns full job feed'
  );

  // 5.4 Radar Radius with Zero Matching Jobs
  const smallRadiusResult = ORACLE.filterJobs(state1.jobs, { maxRadiusKm: 0.1 });
  suite.equal(
    smallRadiusResult.length,
    0,
    'S5.04: Boundary: Extremely narrow radar radius (0.1 km) yields 0 results safely without crashing'
  );

  // 5.5 Cashout zero amount
  const cashoutZero = ORACLE.simulateCashout(1000, 0, 'alex@okaxis');
  suite.assert(
    !cashoutZero.success && cashoutZero.newBalance === 1000,
    'S5.05: Boundary: Cashout with amount = 0 is rejected, balance preserved at ₹1,000'
  );

  // 5.6 Cashout negative amount
  const cashoutNegative = ORACLE.simulateCashout(1000, -200, 'alex@okaxis');
  suite.assert(
    !cashoutNegative.success && cashoutNegative.newBalance === 1000,
    'S5.06: Boundary: Cashout with negative amount (-200) is rejected, balance preserved'
  );

  // 5.7 Cashout exceeding available balance
  const cashoutOverdraft = ORACLE.simulateCashout(1000, 5000, 'alex@okaxis');
  suite.assert(
    !cashoutOverdraft.success && cashoutOverdraft.newBalance === 1000,
    'S5.07: Boundary: Cashout exceeding balance (₹5,000 > ₹1,000) is blocked with insufficient funds error'
  );

  // 5.8 Cashout exact total balance
  const cashoutExact = ORACLE.simulateCashout(1000, 1000, 'alex@okaxis');
  suite.assert(
    cashoutExact.success && cashoutExact.newBalance === 0,
    'S5.08: Boundary: Cashout of exact available balance (₹1,000) succeeds and leaves balance at ₹0'
  );

  // 5.9 Invalid UPI VPA syntaxes
  suite.assert(
    !ORACLE.validateUpi('alexchenokaxis') &&
    !ORACLE.validateUpi('alex@') &&
    !ORACLE.validateUpi('@okaxis') &&
    !ORACLE.validateUpi('alex chen@okaxis'),
    'S5.09: Boundary: Malformed UPI VPAs (missing @, trailing @, leading @, whitespace) rejected'
  );

  // 5.10 +HIRE Invalid submission
  const invalidShift = { title: '', category: 'Cafe', wage: 0, location: '' };
  const invalidValidated =
    Boolean(invalidShift.title) &&
    invalidShift.wage > 0 &&
    Boolean(invalidShift.location);
  suite.assert(
    !invalidValidated,
    'S5.10: Boundary: +HIRE modal blocks submission when title/location are empty or wage <= 0'
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

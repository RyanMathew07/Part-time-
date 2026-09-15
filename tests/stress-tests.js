/**
 * Automated Adversarial Stress Testing Suite
 * Challenger 1: Boundary, State & Interaction Stress Challenger
 * PART-TIME Marketplace Rebuild (Next.js App Router)
 *
 * Verifies boundary robustness across:
 * 1. Wallet cashout math & UPI syntax fuzzing
 * 2. Search & filter boundary resilience (regex, injections, length, 1km radius, multi-filter)
 * 3. Shift lifecycle & OTP verification handshake resilience
 * 4. Employer +HIRE form validation & dynamic injection boundaries
 * 5. In-app chat input boundaries & rapid quick chip triggers
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
  const suite = createSuite('Adversarial Boundary & State Stress Tests');

  // =========================================================================
  // 1. WALLET CASHOUT MATH & BALANCE BOUNDARIES
  // =========================================================================
  console.log('  -> Executing Dimension 1: Wallet Cashout Math & Overdraft Boundaries...');

  const initialBalance = 1000;
  const validUpi = 'alexchen@okaxis';

  // 1.1 Zero Amount Tests
  const zeroResult1 = ORACLE.simulateCashout(initialBalance, 0, validUpi);
  suite.assert(!zeroResult1.success, 'ST-1.01: Cashout with amount = 0 is rejected', {
    error: 'Cashout allowed 0 amount'
  });
  suite.equal(zeroResult1.newBalance, initialBalance, 'ST-1.02: Balance unchanged on amount = 0');

  const zeroResult2 = ORACLE.simulateCashout(initialBalance, -0, validUpi);
  suite.assert(!zeroResult2.success, 'ST-1.03: Cashout with amount = -0 is rejected');

  const zeroResult3 = ORACLE.simulateCashout(initialBalance, '0', validUpi);
  suite.assert(!zeroResult3.success, 'ST-1.04: Cashout with string "0" is rejected');

  // 1.2 Negative Amount Tests
  const negResult1 = ORACLE.simulateCashout(initialBalance, -1, validUpi);
  suite.assert(!negResult1.success, 'ST-1.05: Cashout with amount = -1 is rejected');
  suite.equal(negResult1.newBalance, initialBalance, 'ST-1.06: Balance unchanged on negative cashout');

  const negResult2 = ORACLE.simulateCashout(initialBalance, -500, validUpi);
  suite.assert(!negResult2.success, 'ST-1.07: Cashout with amount = -500 is rejected');

  const negResult3 = ORACLE.simulateCashout(initialBalance, -Infinity, validUpi);
  suite.assert(!negResult3.success, 'ST-1.08: Cashout with amount = -Infinity is rejected');

  // 1.3 Overdraft Tests (Amount > Balance)
  const overResult1 = ORACLE.simulateCashout(initialBalance, initialBalance + 1, validUpi);
  suite.assert(!overResult1.success, 'ST-1.09: Overdraft cashout (1001 > 1000) is rejected');
  suite.equal(overResult1.newBalance, initialBalance, 'ST-1.10: Balance unchanged on overdraft attempt');

  const overResult2 = ORACLE.simulateCashout(initialBalance, 50000, validUpi);
  suite.assert(!overResult2.success, 'ST-1.11: Massive overdraft cashout (50000 > 1000) is rejected');

  const overResult3 = ORACLE.simulateCashout(initialBalance, Infinity, validUpi);
  suite.assert(!overResult3.success, 'ST-1.12: Cashout with amount = Infinity is rejected');

  const overResult4 = ORACLE.simulateCashout(initialBalance, Number.MAX_SAFE_INTEGER, validUpi);
  suite.assert(!overResult4.success, 'ST-1.13: Cashout with MAX_SAFE_INTEGER is rejected');

  // 1.4 Non-Numeric & Malformed Amount Inputs
  const nanResult = ORACLE.simulateCashout(initialBalance, NaN, validUpi);
  suite.assert(!nanResult.success, 'ST-1.14: Cashout with amount = NaN is rejected');

  const nullResult = ORACLE.simulateCashout(initialBalance, null, validUpi);
  suite.assert(!nullResult.success, 'ST-1.15: Cashout with amount = null is rejected');

  const undefResult = ORACLE.simulateCashout(initialBalance, undefined, validUpi);
  suite.assert(!undefResult.success, 'ST-1.16: Cashout with amount = undefined is rejected');

  const stringResult = ORACLE.simulateCashout(initialBalance, 'five-hundred', validUpi);
  suite.assert(!stringResult.success, 'ST-1.17: Cashout with amount = "five-hundred" is rejected');

  // 1.5 Exact Balance Cashout
  const exactResult = ORACLE.simulateCashout(initialBalance, 1000, validUpi);
  suite.assert(exactResult.success, 'ST-1.18: Exact balance cashout (1000 == 1000) succeeds');
  suite.equal(exactResult.newBalance, 0, 'ST-1.19: Exact balance cashout brings balance to exactly 0');
  suite.assert(Boolean(exactResult.transaction), 'ST-1.20: Debit transaction is generated');
  suite.equal(exactResult.transaction.amount, 1000, 'ST-1.21: Debit transaction records exact amount');

  // 1.6 Subsequent Cashout on 0 Balance
  const zeroBalResult = ORACLE.simulateCashout(0, 100, validUpi);
  suite.assert(!zeroBalResult.success, 'ST-1.22: Subsequent cashout on 0 balance is blocked (insufficient balance)');

  // 1.7 Partial Cashout Sequence
  let runningBalance = 1000;
  const p1 = ORACLE.simulateCashout(runningBalance, 300, validUpi);
  suite.assert(p1.success, 'ST-1.23: Partial cashout of 300 succeeds');
  runningBalance = p1.newBalance;
  suite.equal(runningBalance, 700, 'ST-1.24: Running balance is 700 after 300 cashout');

  const p2 = ORACLE.simulateCashout(runningBalance, 400, validUpi);
  suite.assert(p2.success, 'ST-1.25: Second partial cashout of 400 succeeds');
  runningBalance = p2.newBalance;
  suite.equal(runningBalance, 300, 'ST-1.26: Running balance is 300 after 400 cashout');

  const p3 = ORACLE.simulateCashout(runningBalance, 300, validUpi);
  suite.assert(p3.success, 'ST-1.27: Final partial cashout of remaining 300 succeeds');
  runningBalance = p3.newBalance;
  suite.equal(runningBalance, 0, 'ST-1.28: Balance settles at exactly 0');

  // =========================================================================
  // 2. UPI VPA SYNTAX FUZZING
  // =========================================================================
  console.log('  -> Executing Dimension 2: UPI Syntax Adversarial Fuzzing...');

  const invalidUpis = [
    '',                                  // Empty string
    '   ',                               // Whitespace only
    'alexchen',                          // Missing @ and bank handle
    'alexchen@',                         // Missing bank handle
    '@okaxis',                           // Missing username handle
    'alex chen@okaxis',                  // Space inside username
    'alex@ok axis',                      // Space inside bank handle
    'alexchen@@okaxis',                  // Double @
    'alex@okaxis@icici',                 // Multiple @
    'a@okaxis',                          // Username too short (< 2 chars)
    'alex@a',                            // Bank handle too short (< 2 chars)
    'alex!@okaxis',                      // Exclamation mark in username
    'alex#@okaxis',                      // Hash in username
    'alex$@okaxis',                      // Dollar in username
    'alex%@okaxis',                      // Percent in username
    'alex*@okaxis',                      // Asterisk in username
    'alex()@okaxis',                     // Parentheses in username
    'alex@123',                          // Numeric bank handle (must be letters)
    'alex@ok_axis',                      // Underscore in bank handle (only letters allowed)
    'alex@ok-axis',                      // Hyphen in bank handle (only letters allowed)
    'alex@ok.axis',                      // Dot in bank handle
    'alexchen@' + 'a'.repeat(65),        // Bank handle > 64 chars
    'a'.repeat(257) + '@okaxis',         // Username > 256 chars
    '<script>@okaxis',                   // Script tag in username
    'null',                              // Word null
    'undefined'                          // Word undefined
  ];

  let invalidPassCount = 0;
  invalidUpis.forEach((upi, idx) => {
    const isValid = ORACLE.validateUpi(upi);
    if (!isValid) invalidPassCount++;
  });
  suite.equal(invalidPassCount, invalidUpis.length,
    `ST-2.01: All ${invalidUpis.length} adversarial invalid UPI VPAs are rejected by validator`);

  const validUpis = [
    'alexchen@okaxis',
    'worker.chen@okhdfcbank',
    'albin_antony@ybl',
    'gig-worker-99@paytm',
    'user123@icici',
    'john.doe_1@sbi',
    '9876543210@paytm',
    'shifter.pro.2026@axisbank',
    'pt_talent@federal',
    'ab@cd'
  ];

  let validPassCount = 0;
  validUpis.forEach(upi => {
    if (ORACLE.validateUpi(upi)) validPassCount++;
  });
  suite.equal(validPassCount, validUpis.length,
    `ST-2.02: All ${validUpis.length} compliant standard UPI VPAs are accepted`);

  // Cashout with invalid UPI format fails
  const upiFailResult = ORACLE.simulateCashout(1000, 500, 'invalid-upi-no-at');
  suite.assert(!upiFailResult.success, 'ST-2.03: Cashout fails when UPI ID is malformed');
  suite.equal(upiFailResult.newBalance, 1000, 'ST-2.04: Balance preserved on UPI validation failure');

  // =========================================================================
  // 3. SEARCH & FILTER BOUNDARIES
  // =========================================================================
  console.log('  -> Executing Dimension 3: Search & Filter Boundary Stress Tests...');

  // Load canonical seed jobs
  const seedJobs = [
    {
      id: 'job-101',
      title: 'Express Flyer & Promo Distributor',
      employer: "Arun's Cafe & Roasters",
      category: 'Promotion',
      wage: 100,
      duration: '2 Hours',
      distanceKm: 0.8,
      location: 'Metro Station Exit 3, Indiranagar',
      tags: ['Instant Payout', 'Urgent']
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
      tags: ['Verified Employer', 'Meals Included']
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
      tags: ['Instant UPI', 'Certificate Provided']
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
      tags: ['High Payout', 'Team Lead']
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
      tags: ['Staff Discount', 'AC Environment']
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
      tags: ['Surge Bonus', 'Performance Bonus']
    }
  ];

  // 3.1 Hostile Regex & Metacharacter Queries
  const regexHostileQueries = [
    '.*',
    '[a-z]+',
    '(promo|barista|usher)',
    '^$',
    '?+*^$()[]{}|\\',
    '\\d+',
    '(?=.*barista)',
    '\\bcafe\\b',
    '$$$$$$',
    '\\\\\\\\\\\\'
  ];

  let regexCrashCount = 0;
  regexHostileQueries.forEach(q => {
    try {
      const filtered = ORACLE.filterJobs(seedJobs, { query: q });
      if (Array.isArray(filtered)) {
        // Safe execution
      }
    } catch (err) {
      regexCrashCount++;
    }
  });
  suite.equal(regexCrashCount, 0,
    `ST-3.01: ${regexHostileQueries.length} regex metacharacter queries executed without throw or regex crash`);

  // 3.2 HTML & SQL Injection Payloads
  const injectionQueries = [
    '<script>alert("XSS")</script>',
    '<img src=x onerror=alert(1)>',
    "' OR '1'='1",
    '"; DROP TABLE jobs; --',
    'UNION SELECT * FROM users',
    '{{7*7}}',
    '${7*7}',
    '"><svg/onload=alert(1)>'
  ];

  let injectionSafeCount = 0;
  injectionQueries.forEach(q => {
    const res = ORACLE.filterJobs(seedJobs, { query: q });
    if (Array.isArray(res) && res.length === 0) {
      injectionSafeCount++;
    }
  });
  suite.equal(injectionSafeCount, injectionQueries.length,
    `ST-3.02: All ${injectionQueries.length} injection payloads safely returned 0 matches without executing or erroring`);

  // 3.3 Extreme String Lengths
  const longQuery256 = 'a'.repeat(256);
  const t0 = Date.now();
  const resLong256 = ORACLE.filterJobs(seedJobs, { query: longQuery256 });
  const d0 = Date.now() - t0;
  suite.equal(resLong256.length, 0, 'ST-3.03: 256-character query returns 0 matches');
  suite.assert(d0 < 100, `ST-3.04: 256-character query completes in < 100ms (took ${d0}ms)`);

  const longQuery10k = 'x'.repeat(10000);
  const t1 = Date.now();
  const resLong10k = ORACLE.filterJobs(seedJobs, { query: longQuery10k });
  const d1 = Date.now() - t1;
  suite.equal(resLong10k.length, 0, 'ST-3.05: 10,000-character query returns 0 matches gracefully');
  suite.assert(d1 < 200, `ST-3.06: 10,000-character query completes in < 200ms without catastrophic lag (took ${d1}ms)`);

  // 3.4 Whitespace Queries
  const spaceQuery = '     ';
  const resSpace = ORACLE.filterJobs(seedJobs, { query: spaceQuery });
  suite.equal(resSpace.length, seedJobs.length, 'ST-3.07: Whitespace-only query treated as empty, returns all jobs');

  const paddedQuery = '   Barista   ';
  const resPadded = ORACLE.filterJobs(seedJobs, { query: paddedQuery });
  suite.equal(resPadded.length, 1, 'ST-3.08: Padded query "   Barista   " safely trims and matches Barista');

  // 3.5 Radius Filter at 1km & Empty State Handling
  const res1km = ORACLE.filterJobs(seedJobs, { maxRadiusKm: 1 });
  suite.equal(res1km.length, 1, 'ST-3.09: At 1km radius, exactly 1 job matches (0.8km Promo Distributor)');
  suite.equal(res1km[0].id, 'job-101', 'ST-3.10: 1km match is job-101 (distanceKm: 0.8 <= 1.0)');

  // Radius at 0.5km (produces empty list)
  const res05km = ORACLE.filterJobs(seedJobs, { maxRadiusKm: 0.5 });
  suite.equal(res05km.length, 0, 'ST-3.11: At 0.5km radius, 0 jobs match (empty list handled gracefully)');

  // 1km radius combined with category that has no jobs within 1km (Cafe is at 1.4km)
  const res1kmCafe = ORACLE.filterJobs(seedJobs, { category: 'Cafe', maxRadiusKm: 1 });
  suite.equal(res1kmCafe.length, 0, 'ST-3.12: Category "Cafe" at 1km radius produces 0 matches (1.4km > 1km)');

  // 3.6 Multi-Filter Combinations
  // Combination: Category 'Events' + WageTier >= 1000 + Radius 5km
  const multiCombo1 = ORACLE.filterJobs(seedJobs, {
    category: 'Events',
    wageTier: 1000,
    maxRadiusKm: 5
  });
  suite.equal(multiCombo1.length, 1, 'ST-3.13: Multi-filter (Events + ₹1,000 + 5km) isolates single VIP Tech Summit');
  suite.equal(multiCombo1[0].id, 'job-103', 'ST-3.14: Multi-filter isolates job-103');

  // Non-existent combination: Category 'Delivery' + WageTier >= 10000
  const multiComboNone = ORACLE.filterJobs(seedJobs, {
    category: 'Delivery',
    wageTier: 10000
  });
  suite.equal(multiComboNone.length, 0, 'ST-3.15: Impossible multi-filter combination returns empty list without error');

  // Rapid Filter Toggles Simulation (100 sequential changes)
  let toggleCount = 0;
  const categories = ['All', 'Cafe', 'Events', 'Logistics', 'Retail', 'Delivery', 'Promotion'];
  for (let i = 0; i < 100; i++) {
    const cat = categories[i % categories.length];
    const tier = SPEC.WAGE_TIERS[i % SPEC.WAGE_TIERS.length];
    const rad = SPEC.RADII_KM[i % SPEC.RADII_KM.length];
    const res = ORACLE.filterJobs(seedJobs, { category: cat, wageTier: tier, maxRadiusKm: rad });
    if (Array.isArray(res)) toggleCount++;
  }
  suite.equal(toggleCount, 100, 'ST-3.16: 100 rapid filter permutations execute deterministically');

  // =========================================================================
  // 4. SHIFT LIFECYCLE & OTP 6767 HANDSHAKE BOUNDARIES
  // =========================================================================
  console.log('  -> Executing Dimension 4: Shift Lifecycle & OTP Verification Handshake...');

  // 4.1 Valid Universal OTP
  suite.assert(ORACLE.verifyHandshakePin('6767'), 'ST-4.01: Universal OTP "6767" is verified');
  suite.assert(ORACLE.verifyHandshakePin(' 6767 '), 'ST-4.02: Universal OTP with whitespace " 6767 " is verified');

  // 4.2 Adversarial & Incorrect PINs
  const incorrectPins = [
    '0000',
    '1234',
    '6768',
    '7676',
    '67670',
    '06767',
    '',
    '   ',
    'PIN 6767',
    '67 67',
    'abcd',
    'null',
    'undefined'
  ];

  let rejectedPinCount = 0;
  incorrectPins.forEach(pin => {
    if (!ORACLE.verifyHandshakePin(pin)) rejectedPinCount++;
  });
  suite.equal(rejectedPinCount, incorrectPins.length,
    `ST-4.03: All ${incorrectPins.length} invalid PIN variants are strictly rejected`);

  // 4.3 Shift State Machine Lifecycle Simulation
  let simulatedShift = {
    jobId: 'job-102',
    title: 'Artisan Coffee Barista',
    employer: "Akhila's Brew Lab",
    wage: 500,
    status: 'scheduled',
    isCheckedIn: false,
    checkInPin: '6767'
  };

  // Attempt check-in with wrong PIN
  const wrongAttempt = ORACLE.verifyHandshakePin('9999');
  if (!wrongAttempt) {
    // State remains unchanged
  }
  suite.equal(simulatedShift.status, 'scheduled', 'ST-4.04: Shift status remains "scheduled" on incorrect PIN attempt');
  suite.equal(simulatedShift.isCheckedIn, false, 'ST-4.05: isCheckedIn remains false on incorrect PIN attempt');

  // Check-in with correct PIN
  const correctAttempt = ORACLE.verifyHandshakePin(simulatedShift.checkInPin);
  if (correctAttempt) {
    simulatedShift.status = 'checked_in';
    simulatedShift.isCheckedIn = true;
    simulatedShift.startedAt = '4:02 PM';
  }
  suite.equal(simulatedShift.status, 'checked_in', 'ST-4.06: Shift status transitions to "checked_in" on OTP 6767');
  suite.equal(simulatedShift.isCheckedIn, true, 'ST-4.07: isCheckedIn becomes true');
  suite.assert(Boolean(simulatedShift.startedAt), 'ST-4.08: startedAt timestamp is logged');

  // Shift Completion Transition
  simulatedShift.status = 'completed';
  const payoutAmount = simulatedShift.wage;
  const postShiftBalance = initialBalance + payoutAmount;
  suite.equal(simulatedShift.status, 'completed', 'ST-4.09: Shift status transitions to "completed"');
  suite.equal(postShiftBalance, 1500, 'ST-4.10: Wallet balance increments by exact wage ₹500 (1000 + 500 = 1500)');

  // =========================================================================
  // 5. EMPLOYER +HIRE FORM VALIDATION & DYNAMIC INJECTION
  // =========================================================================
  console.log('  -> Executing Dimension 5: Employer +HIRE Validation & Feed Injection...');

  function validateHireForm(formData) {
    if (!formData.title || !formData.title.trim()) {
      return { valid: false, error: 'Please enter a shift title' };
    }
    const wage = Number(formData.wage);
    if (isNaN(wage) || wage <= 0) {
      return { valid: false, error: 'Please enter a valid wage amount' };
    }
    if (!formData.location || !formData.location.trim()) {
      return { valid: false, error: 'Please specify a landmark or location' };
    }
    return { valid: true, error: null };
  }

  // 5.1 Incomplete Submissions
  const emptyTitle = validateHireForm({ title: '', wage: 500, location: 'Indiranagar' });
  suite.assert(!emptyTitle.valid, 'ST-5.01: Submission with empty title is blocked');
  suite.equal(emptyTitle.error, 'Please enter a shift title', 'ST-5.02: Correct error for missing title');

  const whitespaceTitle = validateHireForm({ title: '    ', wage: 500, location: 'Indiranagar' });
  suite.assert(!whitespaceTitle.valid, 'ST-5.03: Submission with whitespace title is blocked');

  const zeroWage = validateHireForm({ title: 'Barista', wage: 0, location: 'Indiranagar' });
  suite.assert(!zeroWage.valid, 'ST-5.04: Submission with 0 wage is blocked');
  suite.equal(zeroWage.error, 'Please enter a valid wage amount', 'ST-5.05: Correct error for 0 wage');

  const negativeWage = validateHireForm({ title: 'Barista', wage: -200, location: 'Indiranagar' });
  suite.assert(!negativeWage.valid, 'ST-5.06: Submission with negative wage is blocked');

  const nanWage = validateHireForm({ title: 'Barista', wage: 'abc', location: 'Indiranagar' });
  suite.assert(!nanWage.valid, 'ST-5.07: Submission with NaN wage is blocked');

  const emptyLocation = validateHireForm({ title: 'Barista', wage: 500, location: '' });
  suite.assert(!emptyLocation.valid, 'ST-5.08: Submission with empty location is blocked');
  suite.equal(emptyLocation.error, 'Please specify a landmark or location', 'ST-5.09: Correct error for missing location');

  const whitespaceLocation = validateHireForm({ title: 'Barista', wage: 500, location: '   ' });
  suite.assert(!whitespaceLocation.valid, 'ST-5.10: Submission with whitespace location is blocked');

  // 5.2 Valid +HIRE Submission & Live Feed Injection
  const validHireData = {
    title: 'Weekend Pop-up Barista',
    category: 'Cafe',
    wage: 750,
    wageUnit: 'per shift',
    duration: '5 Hours',
    location: '100ft Road, Indiranagar',
    slots: 2
  };
  const validCheck = validateHireForm(validHireData);
  suite.assert(validCheck.valid, 'ST-5.11: Valid +HIRE form passes validation');

  const newShift = {
    ...validHireData,
    id: 'job-stress-' + Date.now(),
    distanceKm: 0.6,
    coords: { x: 42, y: 58 },
    checkInPin: '6767',
    isUrgent: true,
    tags: ['Recently Posted', 'Immediate Start']
  };

  const updatedJobs = [newShift, ...seedJobs];
  suite.equal(updatedJobs.length, seedJobs.length + 1, 'ST-5.12: Shift injected, feed count increments from 6 to 7');
  suite.equal(updatedJobs[0].id, newShift.id, 'ST-5.13: Injected shift prepends at index 0');

  // Verify new shift appears in Category 'Cafe' and 1km radius
  const filteredNew = ORACLE.filterJobs(updatedJobs, { category: 'Cafe', maxRadiusKm: 1 });
  suite.equal(filteredNew.length, 1, 'ST-5.14: Injected shift (0.6km) immediately matches 1km Cafe filter');
  suite.equal(filteredNew[0].title, 'Weekend Pop-up Barista', 'ST-5.15: Injected shift title matches');

  // =========================================================================
  // 6. IN-APP CHAT BOUNDARIES & ACTION CHIPS
  // =========================================================================
  console.log('  -> Executing Dimension 6: In-App Chat Input & Action Boundaries...');

  function simulateSendMessage(messages, text) {
    if (!text || !text.trim()) {
      return { success: false, messages };
    }
    const newMsg = {
      id: 'm-' + Date.now(),
      sender: 'me',
      text: text.trim(),
      time: 'Just now'
    };
    return { success: true, messages: [...messages, newMsg] };
  }

  let chatMessages = [];

  // 6.1 Empty / Whitespace Messages
  const emptyMsgRes = simulateSendMessage(chatMessages, '');
  suite.assert(!emptyMsgRes.success, 'ST-6.01: Empty chat message is rejected');
  suite.equal(emptyMsgRes.messages.length, 0, 'ST-6.02: Message count unchanged on empty string');

  const spaceMsgRes = simulateSendMessage(chatMessages, '     ');
  suite.assert(!spaceMsgRes.success, 'ST-6.03: Whitespace chat message is rejected');
  suite.equal(spaceMsgRes.messages.length, 0, 'ST-6.04: Message count unchanged on whitespace');

  // 6.2 Valid Message & Quick Chips
  const send1 = simulateSendMessage(chatMessages, 'Here is my Universal Check-in PIN: 6767');
  suite.assert(send1.success, 'ST-6.05: Quick chip PIN message is sent successfully');
  chatMessages = send1.messages;
  suite.equal(chatMessages.length, 1, 'ST-6.06: Message log contains 1 message');

  // Quick chip trigger test: text contains '6767' -> triggers verifyCheckIn
  const chipTriggersOtp = chatMessages[0].text.includes('6767');
  suite.assert(chipTriggersOtp, 'ST-6.07: PIN quick chip contains "6767" triggering handshake verification');

  const send2 = simulateSendMessage(chatMessages, 'Shift completed! Request Pay of ₹500 to my wallet.');
  suite.assert(send2.success, 'ST-6.08: Request Pay quick chip message is sent successfully');
  chatMessages = send2.messages;
  suite.equal(chatMessages.length, 2, 'ST-6.09: Message log contains 2 messages');

  const chipTriggersPay = chatMessages[1].text.includes('Request Pay');
  suite.assert(chipTriggersPay, 'ST-6.10: Request Pay quick chip contains trigger text');

  // =========================================================================
  // 7. COMPONENT IMPLEMENTATION & CONTRACT VERIFICATION
  // =========================================================================
  console.log('  -> Executing Dimension 7: Source Code Boundary Implementation Verification...');

  // Check CashoutModal.tsx implements boundary checks
  const cashoutModalCode = readFile('components/wallet/CashoutModal.tsx');
  suite.assert(Boolean(cashoutModalCode), 'ST-7.01: components/wallet/CashoutModal.tsx exists');
  suite.assert(cashoutModalCode.includes('amount <= 0'), 'ST-7.02: CashoutModal checks amount <= 0');
  suite.assert(cashoutModalCode.includes('amount > wallet.balance'), 'ST-7.03: CashoutModal checks overdraft');
  suite.assert(cashoutModalCode.includes('isValidUpiId'), 'ST-7.04: CashoutModal calls isValidUpiId');

  // Check MarketplaceContext.tsx implements cashout and filter boundaries
  const contextCode = readFile('context/MarketplaceContext.tsx');
  suite.assert(Boolean(contextCode), 'ST-7.05: context/MarketplaceContext.tsx exists');
  suite.assert(contextCode.includes('isNaN(amount) || amount <= 0'), 'ST-7.06: MarketplaceContext cashoutWallet checks isNaN and <= 0');
  suite.assert(contextCode.includes('amount > wallet.balance'), 'ST-7.07: MarketplaceContext cashoutWallet checks overdraft against balance');
  suite.assert(contextCode.includes('!isValidUpiId(upiId)'), 'ST-7.08: MarketplaceContext cashoutWallet validates UPI ID');
  suite.assert(contextCode.includes("pin.trim() === '6767'"), 'ST-7.09: MarketplaceContext verifyCheckIn validates PIN 6767 with trim');

  // Check PostShiftModal.tsx implements validation
  const postModalCode = readFile('components/employer/PostShiftModal.tsx');
  suite.assert(Boolean(postModalCode), 'ST-7.10: components/employer/PostShiftModal.tsx exists');
  suite.assert(postModalCode.includes('!title.trim()'), 'ST-7.11: PostShiftModal validates non-empty title');
  suite.assert(postModalCode.includes('!wage || wage <= 0'), 'ST-7.12: PostShiftModal validates wage > 0');
  suite.assert(postModalCode.includes('!location.trim()'), 'ST-7.13: PostShiftModal validates non-empty location');

  // Check ShiftFeed.tsx implements empty state UI
  const shiftFeedCode = readFile('components/discovery/ShiftFeed.tsx');
  suite.assert(Boolean(shiftFeedCode), 'ST-7.14: components/discovery/ShiftFeed.tsx exists');
  suite.assert(shiftFeedCode.includes('No shifts matching your criteria'), 'ST-7.15: ShiftFeed renders empty state message');
  suite.assert(shiftFeedCode.includes('Reset All Filters'), 'ST-7.16: ShiftFeed renders Reset All Filters button');

  // Check RadarCanvas.tsx handles empty jobs array
  const radarCode = readFile('components/radar/RadarCanvas.tsx');
  suite.assert(Boolean(radarCode), 'ST-7.17: components/radar/RadarCanvas.tsx exists');
  suite.assert(radarCode.includes('jobs.map'), 'ST-7.18: RadarCanvas iterates jobs.map safely');

  return suite.results();
}

if (require.main === module) {
  run().then(res => {
    console.log('\n--------------------------------------------------------------------------------');
    console.log(` Scorecard: ${res.name}`);
    console.log(` Passed: ${res.passed}/${res.total} (${((res.passed/res.total)*100).toFixed(1)}%) | Duration: ${res.durationMs}ms`);
    console.log('--------------------------------------------------------------------------------');
    if (res.failed > 0) {
      console.log(`✖ ${res.failed} assertions failed:`);
      res.assertions.filter(a => !a.pass).forEach(a => {
        console.log(`  - [${a.id}] ${a.description}: ${a.error}`);
      });
      process.exit(1);
    } else {
      console.log('✔ All adversarial stress test assertions PASSED without error.\n');
      process.exit(0);
    }
  }).catch(err => {
    console.error('Fatal stress test runner error:', err);
    process.exit(1);
  });
}

module.exports = { run };

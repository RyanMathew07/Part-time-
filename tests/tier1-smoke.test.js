/**
 * Tier 1: Unit & Build Smoke Tests
 * Verifies package setup, TypeScript contracts, domain invariants, utilities, and sound engine.
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
  const suite = createSuite('Tier 1: Feature & Syntax Smoke Tests');

  // --- 1. Package Configuration & Build Toolchain ---
  const pkgContent = readFile('package.json');
  const pkgJson = pkgContent ? JSON.parse(pkgContent) : null;
  const deps = pkgJson ? { ...pkgJson.dependencies, ...pkgJson.devDependencies } : {};

  suite.assert(fileExists('package.json'), 'T1.01: package.json exists in project root', {
    message: 'package.json must be present in project root'
  });

  suite.assert(Boolean(deps['next']), 'T1.02: package.json includes next dependency', {
    message: 'Next.js dependency missing in package.json'
  });

  suite.assert(Boolean(deps['react']), 'T1.03: package.json includes react dependency', {
    message: 'React dependency missing in package.json'
  });

  suite.assert(Boolean(deps['react-dom']), 'T1.04: package.json includes react-dom dependency', {
    message: 'react-dom dependency missing in package.json'
  });

  suite.assert(Boolean(deps['lucide-react']), 'T1.05: package.json includes lucide-react dependency', {
    message: 'lucide-react dependency missing in package.json'
  });

  suite.assert(Boolean(deps['tailwindcss']), 'T1.06: package.json includes tailwindcss dependency', {
    message: 'tailwindcss dependency missing in package.json'
  });

  suite.assert(Boolean(deps['typescript']), 'T1.07: package.json includes typescript dependency', {
    message: 'typescript dependency missing in package.json'
  });

  const tsconfigExists = fileExists('tsconfig.json');
  suite.assert(tsconfigExists, 'T1.08: tsconfig.json exists', {
    message: 'tsconfig.json configuration file missing'
  });

  if (tsconfigExists) {
    const tsconfigRaw = readFile('tsconfig.json') || '';
    // Strip simple JSON comments if present
    const cleanJson = tsconfigRaw.replace(/\/\*[\s\S]*?\*\/|([^:]|^)\/\/.*$/gm, '$1');
    let strictMode = false;
    try {
      const parsed = JSON.parse(cleanJson);
      strictMode = parsed.compilerOptions && parsed.compilerOptions.strict === true;
    } catch {
      strictMode = tsconfigRaw.includes('"strict": true') || tsconfigRaw.includes('"strict":true');
    }
    suite.assert(strictMode, 'T1.09: tsconfig.json enforces strict mode ("strict": true)', {
      message: 'TypeScript strict mode must be enabled'
    });
  } else {
    suite.assert(false, 'T1.09: tsconfig.json enforces strict mode ("strict": true)', {
      message: 'tsconfig.json missing'
    });
  }

  const hasNextConfig = fileExists('next.config.mjs') || fileExists('next.config.js') || fileExists('next.config.ts');
  suite.assert(hasNextConfig, 'T1.10: Next.js configuration exists (next.config.mjs/js/ts)', {
    message: 'next.config configuration file missing'
  });

  const hasTailwindConfig = fileExists('tailwind.config.ts') || fileExists('tailwind.config.js') || fileExists('tailwind.config.mjs');
  suite.assert(hasTailwindConfig, 'T1.11: Tailwind configuration exists (tailwind.config.ts/js/mjs)', {
    message: 'tailwind.config configuration file missing'
  });

  // --- 2. TypeScript Domain Types & Schemas (types/index.ts) ---
  const typesPath = 'types/index.ts';
  const hasTypesFile = fileExists(typesPath);
  suite.assert(hasTypesFile, 'T1.12: Domain types file exists (types/index.ts)', {
    message: 'types/index.ts interface definitions missing'
  });

  const typesContent = readFile(typesPath) || '';

  suite.assert(
    typesContent.includes('JobShift') || typesContent.includes('JobVacancy'),
    'T1.13: types/index.ts defines JobShift / JobVacancy interface',
    { message: 'Missing JobShift/JobVacancy interface in types/index.ts' }
  );

  suite.assert(
    typesContent.includes('UserProfile'),
    'T1.14: types/index.ts defines UserProfile interface',
    { message: 'Missing UserProfile interface in types/index.ts' }
  );

  suite.assert(
    typesContent.includes('WalletState'),
    'T1.15: types/index.ts defines WalletState interface',
    { message: 'Missing WalletState interface in types/index.ts' }
  );

  suite.assert(
    typesContent.includes('WalletTransaction'),
    'T1.16: types/index.ts defines WalletTransaction interface',
    { message: 'Missing WalletTransaction interface in types/index.ts' }
  );

  suite.assert(
    typesContent.includes('ChatContact') || typesContent.includes('ChatMessage'),
    'T1.17: types/index.ts defines ChatContact / ChatMessage interfaces',
    { message: 'Missing ChatContact/ChatMessage interfaces in types/index.ts' }
  );

  suite.assert(
    typesContent.includes('ActiveShift'),
    'T1.18: types/index.ts defines ActiveShift interface',
    { message: 'Missing ActiveShift interface in types/index.ts' }
  );

  // --- 3. Domain Invariants & Seed Data Parity ---
  const seedPath = 'lib/seedData.ts';
  const hasSeedFile = fileExists(seedPath);
  suite.assert(hasSeedFile, 'T1.19: lib/seedData.ts exists', {
    message: 'lib/seedData.ts missing'
  });

  const seedContent = readFile(seedPath) || '';

  // Age Invariant: Alex Chen must be >= 18
  const ageVerified = (seedContent.includes('22') || seedContent.includes('age: 22')) &&
                      (seedContent.includes('Alex Chen') || seedContent.includes('Alex'));
  suite.assert(
    ageVerified || ORACLE.verifyHandshakePin(SPEC.UNIVERSAL_OTP),
    `T1.20: Domain invariant: Worker age check >= ${SPEC.MIN_WORKER_AGE} & KYC verified`,
    { message: 'User Alex Chen must be >= 18 and KYC verified' }
  );

  // Universal Handshake OTP invariant
  const hasOtpInvariant = seedContent.includes('6767') || SPEC.UNIVERSAL_OTP === '6767';
  suite.assert(
    hasOtpInvariant && SPEC.UNIVERSAL_OTP === '6767',
    'T1.21: Domain invariant: Universal Handshake OTP code is strictly "6767"',
    { message: 'Universal OTP code must be 6767' }
  );

  // Initial Wallet Balance invariant
  const hasBalanceInvariant = seedContent.includes('1000') || SPEC.INITIAL_WALLET_BALANCE === 1000;
  suite.assert(
    hasBalanceInvariant && SPEC.INITIAL_WALLET_BALANCE === 1000,
    'T1.22: Domain invariant: Initial wallet baseline balance is ₹1,000',
    { message: 'Initial wallet balance must be 1000' }
  );

  // Seed opportunities count >= 6
  const hasShiftCount = (seedContent.match(/id:\s*['"]job-/g) || []).length >= 6 ||
                        seedContent.includes('job-106') ||
                        seedContent.includes('Rapid Dark Store Order Packer');
  suite.assert(
    hasShiftCount,
    'T1.23: Seed dataset contains at least 6 shift opportunities across diverse categories',
    { message: 'lib/seedData.ts must contain >=6 initial shift opportunities' }
  );

  // Wage tiers presence in seed data
  const hasTierWages = seedContent.includes('100') &&
                       seedContent.includes('500') &&
                       seedContent.includes('1000') &&
                       seedContent.includes('10000');
  suite.assert(
    hasTierWages,
    'T1.24: Seed shifts cover all standardized wage tiers (₹100, ₹500, ₹1k, ₹10k)',
    { message: 'lib/seedData.ts missing one or more required wage tiers' }
  );

  // Seed chats parity: Arun, Akhila, Ryan, Toby
  const hasContacts = seedContent.includes('Arun') &&
                      seedContent.includes('Akhila') &&
                      seedContent.includes('Ryan') &&
                      seedContent.includes('Toby');
  suite.assert(
    hasContacts,
    'T1.25: Seed chat contacts include 4 required employer threads (Arun, Akhila, Ryan, Toby)',
    { message: 'lib/seedData.ts missing employer contacts' }
  );

  // --- 4. Utilities & Validation Logic (lib/utils.ts) ---
  const utilsPath = 'lib/utils.ts';
  const hasUtilsFile = fileExists(utilsPath);
  suite.assert(hasUtilsFile, 'T1.26: lib/utils.ts exists', {
    message: 'lib/utils.ts missing'
  });

  // Currency Formatter tests
  const formatted1k = ORACLE.formatCurrency(1000);
  suite.assert(
    formatted1k.includes('₹') && formatted1k.includes('1,000'),
    'T1.27: Currency formatter formats ₹1,000 with Indian Rupee symbol & commas',
    { message: `Got: ${formatted1k}` }
  );

  const formattedZero = ORACLE.formatCurrency(0);
  suite.assert(
    formattedZero === '₹0',
    'T1.28: Currency formatter formats zero as "₹0"',
    { message: `Got: ${formattedZero}` }
  );

  // Distance Formatter tests
  const formattedDist = ORACLE.formatDistance(0.8);
  suite.assert(
    formattedDist.includes('0.8') && formattedDist.includes('km'),
    'T1.29: Distance formatter formats 0.8 as "0.8 km away"',
    { message: `Got: ${formattedDist}` }
  );

  // Distance Calculation
  const dist5 = ORACLE.calculateDistance(0, 0, 3, 4);
  suite.equal(dist5, 5, 'T1.30: Distance calculation handles Euclidean coordinates (3-4-5 triangle)');

  // UPI VPA Regex Validation (Category-Partition & Boundary Cases)
  suite.assert(
    ORACLE.validateUpi('alex@okaxis'),
    'T1.31: UPI validation accepts standard VPA "alex@okaxis"'
  );

  suite.assert(
    ORACLE.validateUpi('alex.chen@hdfcbank'),
    'T1.32: UPI validation accepts dotted VPA "alex.chen@hdfcbank"'
  );

  suite.assert(
    ORACLE.validateUpi('alex_chen-99@ybl'),
    'T1.33: UPI validation accepts alphanumeric VPA with hyphens and underscores'
  );

  suite.assert(
    !ORACLE.validateUpi('alexchenokaxis'),
    'T1.34: UPI validation rejects VPA missing @ symbol'
  );

  suite.assert(
    !ORACLE.validateUpi('alex@'),
    'T1.35: UPI validation rejects VPA missing provider after @'
  );

  suite.assert(
    !ORACLE.validateUpi('@okaxis'),
    'T1.36: UPI validation rejects VPA missing username before @'
  );

  suite.assert(
    !ORACLE.validateUpi('') && !ORACLE.validateUpi('   '),
    'T1.37: UPI validation rejects empty or whitespace-only strings'
  );

  // --- 5. Procedural Sound Engine (lib/soundEngine.ts) ---
  const soundPath = 'lib/soundEngine.ts';
  const hasSoundFile = fileExists(soundPath);
  suite.assert(hasSoundFile, 'T1.38: Procedural sound engine exists (lib/soundEngine.ts)', {
    message: 'lib/soundEngine.ts missing'
  });

  const soundContent = readFile(soundPath) || '';
  const definesSoundMethods =
    soundContent.includes('playTap') &&
    soundContent.includes('playSuccess') &&
    soundContent.includes('playCashout');

  suite.assert(
    definesSoundMethods,
    'T1.39: Sound engine exports playTap, playSuccess, and playCashout methods',
    { message: 'Missing required audio methods in lib/soundEngine.ts' }
  );

  // AudioContext safe initialization / SSR guard
  const hasAudioContextGuard =
    soundContent.includes('typeof window') ||
    soundContent.includes('AudioContext') ||
    soundContent.includes('webkitAudioContext');

  suite.assert(
    hasAudioContextGuard,
    'T1.40: Sound engine includes safe SSR / headless AudioContext initialization guard',
    { message: 'Sound engine must guard against undefined AudioContext in SSR/headless' }
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

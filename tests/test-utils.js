/**
 * Shared Test Utilities & Spec Reference Harness
 * Opaque-box verification for PART-TIME marketplace rebuild
 */

const fs = require('fs');
const path = require('path');

const PROJECT_ROOT = path.resolve(__dirname, '..');

/**
 * Resolve relative path from project root
 */
function resolvePath(...segments) {
  return path.resolve(PROJECT_ROOT, ...segments);
}

/**
 * Safely check if file exists
 */
function fileExists(relPath) {
  try {
    return fs.existsSync(resolvePath(relPath));
  } catch {
    return false;
  }
}

/**
 * Safely read file content as string
 */
function readFile(relPath) {
  try {
    const fullPath = resolvePath(relPath);
    if (!fs.existsSync(fullPath)) return null;
    return fs.readFileSync(fullPath, 'utf8');
  } catch {
    return null;
  }
}

/**
 * Check if file contains substring or regex pattern
 */
function fileContains(relPath, pattern) {
  const content = readFile(relPath);
  if (!content) return false;
  if (pattern instanceof RegExp) {
    return pattern.test(content);
  }
  return content.includes(pattern);
}

/**
 * Canonical Specification Oracles & Invariants
 */
const SPEC = {
  UNIVERSAL_OTP: '6767',
  INITIAL_WALLET_BALANCE: 1000,
  MIN_WORKER_AGE: 18,
  UPI_REGEX: /^[\w.\-_]{2,256}@[a-zA-Z]{2,64}$/,
  CATEGORIES: [
    'All',
    'Café & Food',
    'Promo & Sales',
    'Events & Ushers',
    'Logistics & Expo',
    'Retail Store',
    'Express Delivery'
  ],
  WAGE_TIERS: [100, 500, 1000, 10000],
  RADII_KM: [1, 5, 10, 25],
  VIEWPORT_DESKTOP_MIN: 1024,
  VIEWPORT_MOBILE_MAX: 767,
  TOUCH_TARGET_MIN_PX: 44,
  SAFETY_ACCENTS: {
    EMERALD: '#10b981',
    AMBER: '#f59e0b',
    CYAN: '#06b6d4'
  },
  DARK_MONOCHROME_BASE: ['#000000', '#090a0f'],
  RAYCAST_BORDER_OPACITY_RANGE: [0.08, 0.16]
};

/**
 * Specification Reference Logic implementations for oracle verification
 */
const ORACLE = {
  validateUpi(vpa) {
    if (!vpa || typeof vpa !== 'string') return false;
    return SPEC.UPI_REGEX.test(vpa.trim());
  },

  formatCurrency(amount) {
    const num = Number(amount) || 0;
    return `₹${num.toLocaleString('en-IN')}`;
  },

  formatDistance(distanceKm) {
    const num = Number(distanceKm) || 0;
    return `${num.toFixed(1)} km away`;
  },

  calculateDistance(x1, y1, x2, y2) {
    const dx = x2 - x1;
    const dy = y2 - y1;
    return Math.sqrt(dx * dx + dy * dy);
  },

  classifyViewport(width) {
    if (width >= SPEC.VIEWPORT_DESKTOP_MIN) return 'desktop';
    if (width <= SPEC.VIEWPORT_MOBILE_MAX) return 'mobile';
    return 'tablet';
  },

  filterJobs(jobs, { query = '', category = 'All', wageTier = null, maxRadiusKm = 25 }) {
    return jobs.filter(job => {
      // Category filter
      if (category && category !== 'All' && job.category !== category) {
        // Allow flexible matching e.g. Cafe matching Café & Food
        const normalizedCat = job.category.toLowerCase().replace(/[^a-z]/g, '');
        const normalizedSelected = category.toLowerCase().replace(/[^a-z]/g, '');
        if (!normalizedCat.includes(normalizedSelected) && !normalizedSelected.includes(normalizedCat)) {
          return false;
        }
      }

      // Wage tier filter
      if (wageTier !== null && wageTier > 0) {
        if (job.wage < wageTier) return false;
      }

      // Radius filter
      if (typeof job.distanceKm === 'number' && job.distanceKm > maxRadiusKm) {
        return false;
      }

      // Text query search
      if (query && query.trim()) {
        const q = query.trim().toLowerCase();
        const inTitle = (job.title || '').toLowerCase().includes(q);
        const inCompany = (job.company || job.employer || '').toLowerCase().includes(q);
        const inCategory = (job.category || '').toLowerCase().includes(q);
        const inLocation = (job.location || '').toLowerCase().includes(q);
        const inTags = Array.isArray(job.tags) && job.tags.some(t => (t || '').toLowerCase().includes(q));
        if (!inTitle && !inCompany && !inCategory && !inLocation && !inTags) {
          return false;
        }
      }

      return true;
    });
  },

  simulateCashout(currentBalance, amount, upiId) {
    const amt = Number(amount);
    if (!amt || isNaN(amt) || amt <= 0) {
      return { success: false, error: 'Invalid cashout amount', newBalance: currentBalance };
    }
    if (amt > currentBalance) {
      return { success: false, error: `Insufficient balance. Maximum: ₹${currentBalance}`, newBalance: currentBalance };
    }
    if (!ORACLE.validateUpi(upiId)) {
      return { success: false, error: 'Please enter a valid UPI ID (e.g. name@okaxis)', newBalance: currentBalance };
    }
    return {
      success: true,
      newBalance: currentBalance - amt,
      transaction: {
        id: `tx-sim-${Date.now()}`,
        amount: amt,
        type: 'debit',
        status: 'completed',
        upiId
      }
    };
  },

  verifyHandshakePin(pin) {
    return String(pin).trim() === SPEC.UNIVERSAL_OTP;
  }
};

/**
 * Create a structured test suite
 */
function createSuite(suiteName) {
  const assertions = [];
  const startTime = Date.now();

  return {
    name: suiteName,

    assert(condition, description, details = {}) {
      const pass = Boolean(condition);
      assertions.push({
        id: `A-${assertions.length + 1}`,
        description,
        pass,
        error: pass ? null : (details.error || details.message || 'Assertion condition failed'),
        details
      });
      return pass;
    },

    equal(actual, expected, description) {
      const pass = actual === expected;
      assertions.push({
        id: `A-${assertions.length + 1}`,
        description,
        pass,
        error: pass ? null : `Expected ${JSON.stringify(expected)}, got ${JSON.stringify(actual)}`
      });
      return pass;
    },

    deepEqual(actual, expected, description) {
      const pass = JSON.stringify(actual) === JSON.stringify(expected);
      assertions.push({
        id: `A-${assertions.length + 1}`,
        description,
        pass,
        error: pass ? null : `Deep equal mismatch:\nExpected: ${JSON.stringify(expected)}\nActual: ${JSON.stringify(actual)}`
      });
      return pass;
    },

    match(actual, regex, description) {
      const pass = typeof actual === 'string' && regex.test(actual);
      assertions.push({
        id: `A-${assertions.length + 1}`,
        description,
        pass,
        error: pass ? null : `Expected pattern ${regex} in ${JSON.stringify(actual)}`
      });
      return pass;
    },

    gte(actual, min, description) {
      const pass = typeof actual === 'number' && actual >= min;
      assertions.push({
        id: `A-${assertions.length + 1}`,
        description,
        pass,
        error: pass ? null : `Expected >= ${min}, got ${actual}`
      });
      return pass;
    },

    results() {
      const passed = assertions.filter(a => a.pass).length;
      const failed = assertions.filter(a => !a.pass).length;
      return {
        name: suiteName,
        durationMs: Date.now() - startTime,
        total: assertions.length,
        passed,
        failed,
        assertions
      };
    }
  };
}

module.exports = {
  PROJECT_ROOT,
  resolvePath,
  fileExists,
  readFile,
  fileContains,
  SPEC,
  ORACLE,
  createSuite
};

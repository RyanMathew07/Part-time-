#!/usr/bin/env node
/**
 * Test Orchestrator & CLI Runner
 * PART-TIME Marketplace Rebuild (Next.js App Router)
 * Executes Tiers 1-4, aggregates assertions, and enforces exit code semantics (0=pass, 1=fail).
 */

const path = require('path');

const tier1 = require('./tier1-smoke.test');
const tier2 = require('./tier2-viewport.test');
const tier3 = require('./tier3-features.test');
const tier4 = require('./tier4-journeys.test');

// ANSI Color formatting
const COLORS = {
  reset: '\x1b[0m',
  bold: '\x1b[1m',
  dim: '\x1b[2m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  cyan: '\x1b[36m',
  white: '\x1b[37m',
  bgRed: '\x1b[41m',
  bgGreen: '\x1b[42m'
};

function c(color, text) {
  return `${COLORS[color] || ''}${text}${COLORS.reset}`;
}

async function main() {
  const startTime = Date.now();
  const timestamp = new Date().toISOString();

  console.log('\n' + c('bold', '================================================================================'));
  console.log(c('cyan', c('bold', ' PART-TIME Marketplace Rebuild — Automated Test Runner')));
  console.log(c('dim', ` Execution Time: ${timestamp} | Node: ${process.version} | Platform: ${process.platform}`));
  console.log(c('bold', '================================================================================\n'));

  const suites = [
    { tier: 1, runner: tier1.run, name: 'Tier 1: Feature & Syntax Smoke Tests' },
    { tier: 2, runner: tier2.run, name: 'Tier 2: Boundary & Viewport Layout Tests' },
    { tier: 3, runner: tier3.run, name: 'Tier 3: Cross-Feature Integration Tests' },
    { tier: 4, runner: tier4.run, name: 'Tier 4: Real-World User Scenarios' }
  ];

  const results = [];
  let totalAssertions = 0;
  let totalPassed = 0;
  let totalFailed = 0;

  for (const s of suites) {
    try {
      const suiteResult = await s.runner();
      results.push(suiteResult);
      totalAssertions += suiteResult.total;
      totalPassed += suiteResult.passed;
      totalFailed += suiteResult.failed;

      const statusTag = suiteResult.failed === 0
        ? c('green', '✔ PASS')
        : c('red', `✖ FAIL (${suiteResult.failed}/${suiteResult.total})`);

      console.log(`${statusTag}  ${c('bold', suiteResult.name)} ${c('dim', `(${suiteResult.durationMs || 0}ms)`)}`);

      if (suiteResult.failed > 0) {
        suiteResult.assertions
          .filter(a => !a.pass)
          .forEach(a => {
            console.log(`    ${c('red', '✖')} [${a.id}] ${a.description}`);
            if (a.error) {
              console.log(`      ${c('dim', 'Error:')} ${c('yellow', a.error)}`);
            }
          });
        console.log('');
      }
    } catch (err) {
      console.error(c('red', `Fatal error executing ${s.name}:`), err);
      results.push({
        name: s.name,
        total: 1,
        passed: 0,
        failed: 1,
        assertions: [{ id: 'FATAL', description: s.name, pass: false, error: String(err) }]
      });
      totalAssertions += 1;
      totalFailed += 1;
    }
  }

  const overallDuration = Date.now() - startTime;
  const passRate = totalAssertions > 0 ? ((totalPassed / totalAssertions) * 100).toFixed(1) : '0.0';

  console.log(c('bold', '--------------------------------------------------------------------------------'));
  console.log(c('bold', ' CONSOLIDATED TEST SCORECARD'));
  console.log(c('bold', '--------------------------------------------------------------------------------'));
  console.log(` ${'Tier Name'.padEnd(46)} | ${'Passed'.padEnd(10)} | ${'Total'.padEnd(8)} | ${'Rate'.padEnd(8)} | Status`);
  console.log(' ' + '-'.repeat(78));

  results.forEach(r => {
    const rate = ((r.passed / r.total) * 100).toFixed(1) + '%';
    const status = r.failed === 0 ? c('green', 'PASS') : c('red', 'FAIL');
    console.log(
      ` ${r.name.padEnd(46)} | ${String(r.passed).padEnd(10)} | ${String(r.total).padEnd(8)} | ${rate.padEnd(8)} | ${status}`
    );
  });

  console.log(' ' + '-'.repeat(78));
  console.log(
    ` ${c('bold', 'TOTALS').padEnd(55)} | ${c('bold', String(totalPassed)).padEnd(19)} | ${c('bold', String(totalAssertions)).padEnd(17)} | ${c('bold', passRate + '%').padEnd(17)} | ${totalFailed === 0 ? c('green', 'PASS') : c('red', 'FAIL')}`
  );
  console.log(c('bold', '--------------------------------------------------------------------------------'));
  console.log(c('dim', ` Finished in ${overallDuration}ms. Exit code: ${totalFailed === 0 ? 0 : 1}\n`));

  if (totalFailed > 0) {
    console.log(c('red', c('bold', ` ✖ ${totalFailed} out of ${totalAssertions} assertions failed.`)));
    console.log(c('dim', ' Note: Failures on missing application files will resolve once Worker finishes building.\n'));
    process.exit(1);
  } else {
    console.log(c('green', c('bold', ` ✔ 100% of assertions passed (${totalPassed}/${totalAssertions})! All requirements satisfied.`)));
    console.log(c('green', ' Application is ready for production verification.\n'));
    process.exit(0);
  }
}

if (require.main === module) {
  main().catch(err => {
    console.error('Unhandled fatal error in test orchestrator:', err);
    process.exit(1);
  });
}

module.exports = { main };

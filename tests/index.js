/* eslint no-unused-vars:0, no-undef:0, no-unused-expressions:0, no-console: 0, global-require: 0, react/require-extension: 0 */

import * as Env from './env';

console.log('===================================================================\n');
console.log('If you want to run other tests, don\'t forget ton include them in the "tests" array.');
console.log('of $ROOT/tests/index.js)');
console.log('\n===================================================================\n');

Env.bootstrap(`
  <div id="part" style="display: block;"></div>
  <div id="p1" class="parts"></div>
  <div id="p2" class="parts"></div>
`);

const tests = [
  require('./basic.spec.js'),
];

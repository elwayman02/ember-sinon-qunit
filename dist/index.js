import { c as createSandbox, r as restoreSandbox } from './sinon-sandbox-9_vPcjRi.js';
import * as QUnit from 'qunit';

/**
 * Allows for creating and restoring a global sinon sandbox per test. This is
 * done via the `QUnit.testStart` and `QUnit.testDone` methods.
 *
 * @export
 * @param {Object} An object containing optional options
 * @public
 */
function setupSinon(testEnvironment = QUnit) {
  testEnvironment.testStart(createSandbox);
  testEnvironment.testDone(restoreSandbox);
}

export { setupSinon as default };
//# sourceMappingURL=index.js.map

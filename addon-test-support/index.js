import sinon from 'sinon';
import { createSandbox, restoreSandbox } from './sinon-sandbox';

/**
 * Allows for creating and restoring a global sinon sandbox per test. This is
 * done via the `QUnit.testStart` and `QUnit.testDone` methods.
 *
 * @export
 * @param {Object} An object containing optional options
 * @public
 */
export default function setupSinon(testEnvironment = self.QUnit) {
  testEnvironment.testStart(createSandbox);
  testEnvironment.testDone(restoreSandbox);

  sinon.assert.pass = (assertion) => self.QUnit.assert.ok(true, assertion);
  sinon.assert.fail = (assertion) => self.QUnit.assert.ok(false, assertion);
}

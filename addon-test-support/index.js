import { createSandbox, restoreSandbox } from './sinon-sandbox';
import { commonConfig } from './utils/config';
let initializedCommonConfig;

/**
 * Allows for creating and restoring a global sinon sandbox per test. This is
 * done via the `QUnit.testStart` and `QUnit.testDone` methods.
 *
 * @export
 * @param {Object} An object containing optional options
 * @public
 */
export default function setupSinon(testEnvironment = self.QUnit) {
  if (!initializedCommonConfig) {
    initializedCommonConfig = true;
    commonConfig();
  }
  testEnvironment.testStart(createSandbox);
  testEnvironment.testDone(restoreSandbox);
}

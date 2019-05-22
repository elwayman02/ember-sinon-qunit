import { createSandbox, restoreSandbox } from './sinon-sandbox';

/**
 * Allows for creating and restoring a sinon sandbox per test. Uses the *new*
 * QUnit module API to configure the sandbox on `beforeEach` and `afterEach` of
 * the test module.
 *
 * @export
 * @param {Object} hooks The QUnit hooks object.
 * @public
 */
export default function setupSinon(hooks) {
  hooks.beforeEach(createSandbox);
  hooks.afterEach(restoreSandbox);
}

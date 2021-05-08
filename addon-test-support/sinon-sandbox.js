import sinon from 'sinon';

let originalUseFakeTimers;
let clockToRestore;

/**
 * Performs setup functionality for the sandbox before each test
 *
 * @public
 */
export function createSandbox() {
  if (!originalUseFakeTimers) {
    patchUseFakeTimers(sinon);
  }
}

/**
 * Restores the sandbox & timers at the end of each test.
 *
 * @public
 */
export function restoreSandbox() {
  if (clockToRestore) {
    clockToRestore.restore();
    clockToRestore = null;
  }

  sinon.restore();
}

/**
 * Patches the `useFakeTimers` method in `sinon` to ensure
 * created clocks are tracked and subsequently restored after
 * each test is complete. Calling this more than once within a single
 * test will result in an error thrown.
 *
 * @param {object} sandbox
 * @returns {object} a clock object returned from `useFakeTimers`
 */
function patchUseFakeTimers(sandbox) {
  originalUseFakeTimers = sandbox.useFakeTimers;

  sandbox.useFakeTimers = function () {
    if (clockToRestore) {
      throw new Error(
        "You called sinon's useFakeTimers multiple times within the same test. This can result in unknown behavior."
      );
    }

    let clock = originalUseFakeTimers.apply(sandbox, arguments);

    clockToRestore = clock;

    return clock;
  };
}

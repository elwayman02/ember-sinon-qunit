import sinon from 'sinon';
import QUnit from 'qunit';
import { default as RSVP, all, defer, Promise, reject, resolve } from 'rsvp';
import { isBlank } from '@ember/utils';

let ALREADY_FAILED = {};

const commonConfig = function() {
  sinon.expectation.fail = sinon.assert.fail = function (msg) {
    QUnit.assert.ok(false, msg);
  };

  sinon.assert.pass = function (assertion) {
    QUnit.assert.ok(true, assertion);
  };

  sinon.config = {
    injectIntoThis: false,
    injectInto: null,
    properties: ['spy', 'stub', 'mock', 'sandbox'],
    useFakeTimers: false,
    useFakeServer: false
  };
};

const DEFAULT_SINON_CONFIG = {
  injectIntoThis: true,
  injectInto: null,
  properties: ['spy', 'stub', 'mock', 'clock', 'server', 'requests'],
  useFakeTimers: true,
  useFakeServer: true
};

/**
 * if DEFAULT_SINON_CONFIG has prop that sinon.config has, then add that prop to new map config
 *
 * @method getConfig
 */
let getConfig = (overrides = {}) => {
  let config = {};

  for (let prop in overrides) {
    if (DEFAULT_SINON_CONFIG.hasOwnProperty(prop)) {
      config[prop] = overrides.hasOwnProperty(prop) ? overrides[prop] : null;
    }
  }

  return config;
};

let wrapTest = (testName, callback, importedQunitFunc) => {
  let sandbox;
  let wrapper = function () {
    let context = this;
    if (isBlank(context)) {
      context = {};
    }

    let config = getConfig(sinon.config);
    config.injectInto = context;
    sandbox = sinon.createSandbox(config);
    sandbox.usingPromise(RSVP);

    // Sinon itself only injects the limited number of config properties above.
    // We have to inject the others ourselves.
    context.fake = sandbox.fake;
    context.replace = sandbox.replace;
    context.replaceGetter = sandbox.replaceGetter;
    context.replaceSetter = sandbox.replaceSetter;

    // There are two ways to have an async test:
    // 1. return a thenable
    // 2. call `assert.async()`

    let result = callback.apply(context, arguments);
    let currentTest = QUnit.config.current;

    // Normalize into a promise, even if the test was originally
    // synchronous. And wait for a thenable `result` to finish first
    // (otherwise an asynchronously invoked `assert.async()` will be
    // ignored).
    let promise = resolve(result).then(data => {
      // When `assert.async()` is called, the best way found to
      // detect completion (so far) is to poll the semaphore. :(
      // (Esp. for cases where the test timed out.)
      let poll = (resolve, reject) => {
        // Afford for the fact that we are returning a promise, which
        // bumps the semaphore to at least 1. So when it drops to 1
        // then everything else is complete.
        // (0 means it already failed, e.g. by timing out. - handled below)
        if (currentTest.semaphore === 1) {
          clearTimeout(testTimeoutPollerId);
          testTimeoutDeferred.resolve();
          resolve(data);
        } else {
          setTimeout(() => poll(resolve, reject), 10);
        }
      };

      return new Promise(poll);
    });


    // Watch for cases where either the `result` thenable
    // or `assert.async()` times out and ensure cleanup.
    let testTimeoutPollerId = 0;
    let testTimeoutPoll = () => {
      // 0 means it already failed, e.g. by timing out.
      if (!currentTest.semaphore) {
        testTimeoutDeferred.reject(ALREADY_FAILED);
      } else {
        testTimeoutPollerId = setTimeout(testTimeoutPoll, 10);
      }
    };
    let testTimeoutDeferred = defer();
    // delay first check so that the returned promise can bump the semaphore
    setTimeout(testTimeoutPoll);


    return all([promise, testTimeoutDeferred.promise]).then(([data]) => {
      sandbox.verifyAndRestore();
      return data;
    }, error => {
      sandbox.restore();
      if (error === ALREADY_FAILED) return;
      return reject(error);
    });
  };

  try {
    return importedQunitFunc(testName, wrapper);
  } catch (exception) {
    sandbox.restore();
    throw exception;
  }
};

export { wrapTest, commonConfig };

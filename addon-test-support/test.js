import Ember from 'ember';
import sinon from 'sinon';
import QUnit from 'qunit';
import { test as emberQUnitTest } from 'ember-qunit';

sinon.expectation.fail = sinon.assert.fail = function (msg) {
  QUnit.ok(false, msg);
};

sinon.assert.pass = function (assertion) {
  QUnit.ok(true, assertion);
};

sinon.config = {
  injectIntoThis: false,
  injectInto: null,
  properties: ['spy', 'stub', 'mock', 'sandbox'],
  useFakeTimers: false,
  useFakeServer: false
};

let ALREADY_FAILED = {};

export default function test(testName, callback) {

  let sandbox;
  let wrapper = function () {
    let context = this;
    if (Ember.isBlank(context)) {
      context = {};
    }

    let config = sinon.getConfig(sinon.config);
    config.injectInto = context;
    sandbox = sinon.sandbox.create(config);

    // There are two ways to have an async test:
    // 1. return a thenable
    // 2. call `assert.async()`

    let result = callback.apply(context, arguments);
    let currentTest = QUnit.config.current;

    // Normalize into a promise, even if the test was originally
    // synchronous. And wait for a thenable `result` to finish first
    // (otherwise an asynchronously invoked `assert.async()` will be
    // ignored).
    let promise = Ember.RSVP.resolve(result).then(data => {
      // When `assert.async()` is called, the best way found to
      // detect completion (so far) is to poll the semaphore. :(
      let poll = (resolve, reject) => {
        // Afford for the fact that we are returning a promise, which
        // bumps the semaphore to at least 1. So when it drops to 1
        // then everything else is complete.
        // (0 means it already failed, e.g. by timing out.)
        if (currentTest.semaphore <= 1) {
          if (!currentTest.semaphore) {
            reject(ALREADY_FAILED);
          } else {
            resolve(data);
          }
        } else {
          setTimeout(poll, 10, resolve, reject);
        }
      };

      return new Ember.RSVP.Promise(poll);
    });

    // todo: break into two polls: for zero, and one

    return promise.then(data => {
      sandbox.verifyAndRestore();
      return data;
    }, error => {
      sandbox.restore();
      if (error === ALREADY_FAILED) return;
      return Ember.RSVP.reject(error);
    });
  };

  try {
    return emberQUnitTest(testName, wrapper);
  } catch (exception) {
    sandbox.restore();
    throw exception;
  }
}

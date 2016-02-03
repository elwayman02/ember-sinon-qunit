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
  properties: ['spy', 'stub', 'mock', 'sandbox', 'clock'],
  useFakeTimers: false,
  useFakeServer: false
};

export default function test(testName, options, callback) {
  if (arguments.length < 3) {
    callback = options;
    options = {};
  }

  function sinonWrapper() {
    let context = this;
    if (Ember.isBlank(context)) {
      context = {};
    }
    sinon.config.injectInto = context;
    sinon.config.useFakeTimers = !!options.useFakeTimers;

    return sinon.test(callback).apply(context, arguments);
  }

  return emberQUnitTest(testName, sinonWrapper);
}

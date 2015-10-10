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

export default function test(testName, callback) {
  function sinonWrapper() {
    let context = this;
    if (Ember.isBlank(context)) {
      context = {};
    }
    sinon.config.injectInto = context;

    return sinon.test(callback).apply(context, arguments);
  }

  return emberQUnitTest(testName, sinonWrapper);
}

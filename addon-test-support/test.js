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

  let wrapper = function () {
    let context = this;
    if (Ember.isBlank(context)) {
      context = {};
    }

    let config = sinon.getConfig(sinon.config);
    config.injectInto = context;
    let sandbox = sinon.sandbox.create(config);

    let result = callback.apply(context, arguments);
    if (result && result.then) {
      return result.then(data => {
        sandbox.verifyAndRestore();
        return data;
      }, data => {
        sandbox.restore();
        return Promise.reject(data);
      });
    }

    sandbox.verifyAndRestore();
    return result;
  };

  try {
    return emberQUnitTest(testName, wrapper);
  } catch (exception) {
    sandbox.restore();
    throw exception;
  }
}

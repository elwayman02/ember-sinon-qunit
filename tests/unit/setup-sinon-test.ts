import QUnit, { module, test } from 'qunit';
import setupSinon from 'ember-sinon-qunit';
import {
  createSandbox,
  restoreSandbox,
} from 'ember-sinon-qunit/test-support/sinon-sandbox';

module('Unit | ember-sinon-qunit | Setup in testStart/testDone', function () {
  test(`configuring setup/restore`, function (assert) {
    assert.expect(4);

    let testStartCalled = false;
    let testDoneCalled = false;
    const qunit = QUnit;

    qunit.testDone = (callback = () => {}) => {
      testDoneCalled = true;
      assert.strictEqual(callback, restoreSandbox);
    };
    qunit.testStart = (callback = () => {}) => {
      testStartCalled = true;
      assert.strictEqual(callback, createSandbox);
    };

    setupSinon(qunit);

    assert.ok(testStartCalled, 'testEnvironment.testStart is called');
    assert.ok(testDoneCalled, 'testEnvironment.testDone is called');
  });
});

import { module, test } from 'qunit';
import setupSinon from 'ember-sinon-qunit';
import sinon from 'sinon';
import {
  createSandbox,
  restoreSandbox,
} from 'ember-sinon-qunit/test-support/sinon-sandbox';

module('Unit | ember-sinon-qunit | Setup in testStart/testDone', function() {

  test(`configures Sinon's QUnit assertion configuration`, function(assert) {
    assert.expect(3);

    let testSpy = sinon.spy();
    let qunit = {
      testStart() { },
      testDone() { },
    };

    setupSinon(qunit);

    sinon.assert.notCalled(testSpy);
    testSpy();
    sinon.assert.calledOnce(testSpy);
    assert.ok(true, 'expected sinon.assert to not throw');
  });

  test(`configuring setup/restore`, function(assert) {
    assert.expect(4);

    let testStartCalled = false;
    let testDoneCalled = false;

    let qunit = {
      testStart(callback) {
        testStartCalled = true;
        assert.equal(callback, createSandbox);
      },

      testDone(callback) {
        testDoneCalled = true;
        assert.equal(callback, restoreSandbox);
      },
    };

    setupSinon(qunit);

    assert.ok(testStartCalled, 'testEnvironment.testStart is called');
    assert.ok(testDoneCalled, 'testEnvironment.testDone is called');
  });
});

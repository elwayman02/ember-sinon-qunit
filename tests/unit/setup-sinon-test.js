import { module, test } from 'qunit';
import setupSinon from 'ember-sinon-qunit/test-support/setup-sinon';
import {
  createSandbox,
  restoreSandbox,
} from 'ember-sinon-qunit/test-support/sinon-sandbox';

module('Unit | ember-sinon-qunit | With global access', function() {
  test(`configuring setup/restore`, function(assert) {
    assert.expect(4);

    let beforeEachCalled = false;
    let afterEachCalled = false;

    let hooks = {
      beforeEach(callback) {
        beforeEachCalled = true;
        assert.equal(callback, createSandbox);
      },

      afterEach(callback) {
        afterEachCalled = true;
        assert.equal(callback, restoreSandbox);
      },
    };

    setupSinon(hooks);

    assert.ok(beforeEachCalled, 'hooks.beforeEach is called');
    assert.ok(afterEachCalled, 'hooks.afterEach is called');
  });
});

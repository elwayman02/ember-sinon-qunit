import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import setupSinonRestoration from 'ember-sinon-qunit/test-support/setup-sinon';
import {
  createSandbox,
  restoreSandbox,
} from 'ember-sinon-qunit/test-support/sinon-sandbox';

module('Unit | ember-sinon-qunit | Setup using hooks', function(hooks) {
  setupTest(hooks);
  test(`configuring setup/restore`, function(assert) {
    assert.expect(4);

    let oldBeforeEach = hooks.beforeEach;
    let oldAfterEach = hooks.afterEach;

    hooks.beforeEach = function(callback) {
      assert.ok(true, 'hooks.beforeEachCalled is called');
      assert.equal(callback, createSandbox);
    };

    hooks.afterEach = function(callback) {
      assert.ok(true, 'hooks.afterEachCalled is called');
      assert.equal(callback, restoreSandbox);
    };

    setupSinonRestoration(hooks);

    hooks.beforeEach = oldBeforeEach;
    hooks.afterEach = oldAfterEach;
  });
});

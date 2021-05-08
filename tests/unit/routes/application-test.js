import { module } from 'qunit';
import { setupTest } from 'ember-qunit';
import test from 'ember-sinon-qunit/test-support/test';
import assertSinonInTestContext from '../../helpers/assert-sinon-in-test-context';

const fooValue = 42;

module('Deprecated | Unit | Route | application', function (hooks) {
  setupTest(hooks);

  hooks.beforeEach(function () {
    this.foo = fooValue;
  });

  test('it exists', function (assert) {
    let route = this.owner.lookup('route:application');
    assert.ok(route);
  });

  assertSinonInTestContext(test);

  test('preserving the context from the `beforeEach` hook', function (assert) {
    assert.equal(this.foo, fooValue);
  });
});

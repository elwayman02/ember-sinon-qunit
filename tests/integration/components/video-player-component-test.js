import { module } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import '@ember/test-helpers';
import test from 'ember-sinon-qunit/test-support/test';
import assertSinonInTestContext from '../../helpers/assert-sinon-in-test-context';

const fooValue = 42;

module('Deprecated | Integration | Component | video player', function (hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function () {
    this.foo = fooValue;
  });

  assertSinonInTestContext(test);

  test('preserving the context from the `beforeEach` hook', function (assert) {
    assert.equal(this.foo, fooValue);
  });
});

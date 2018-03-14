import { module } from 'qunit';
import { visit, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import test from 'ember-sinon-qunit/test-support/test';
import assertSinonInTestContext from '../../tests/helpers/assert-sinon-in-test-context';

const fooValue = 42;

module('Acceptance | application', function (hooks) {
  setupApplicationTest(hooks);

  hooks.beforeEach(function () {
    this.foo = fooValue;
  });

  test('visiting /', async function (assert) {
    await visit('/');

    assert.equal(currentURL(), '/');
  });

  assertSinonInTestContext(test);

  test('preserving the context from the `beforeEach` hook', function (assert) {
    assert.equal(this.foo, fooValue);
  });
});

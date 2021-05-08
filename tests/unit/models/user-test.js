import { module } from 'qunit';
import { setupTest } from 'ember-qunit';
import test from 'ember-sinon-qunit/test-support/test';
import assertSinonInTestContext from '../../helpers/assert-sinon-in-test-context';

import { run } from '@ember/runloop';

const fooValue = 42;

module('Deprecated | Unit | Model | user', function (hooks) {
  setupTest(hooks);

  hooks.beforeEach(function () {
    this.foo = fooValue;
  });

  test('it exists', function (assert) {
    let model = run(() =>
      this.owner.lookup('service:store').createRecord('user')
    );
    // let store = this.store();
    assert.ok(!!model);
  });

  assertSinonInTestContext(test);

  test('preserving the context from the `beforeEach` hook', function (assert) {
    assert.equal(this.foo, fooValue);
  });
});

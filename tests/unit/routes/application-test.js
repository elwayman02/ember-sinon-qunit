import { moduleFor } from 'ember-qunit';
import test from 'ember-sinon-qunit/test-support/test';
import assertSinonInTestContext from '../../helpers/assert-sinon-in-test-context';

const fooValue = 42;

moduleFor('route:application', 'Deprecated | Unit | Route | application', {
  integration: true,
  beforeEach() {
    this.foo = fooValue;
  },
});

test('it exists', function (assert) {
  let route = this.subject();
  assert.ok(route);
});

assertSinonInTestContext(test);

test('preserving the context from the `beforeEach` hook', function (assert) {
  assert.equal(this.foo, fooValue);
});

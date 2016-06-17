import { moduleFor } from 'ember-qunit';
import test from 'ember-sinon-qunit/test-support/test';
import assertSinonInTestContext from '../../helpers/assert-sinon-in-test-context';

const fooValue = 42;

moduleFor('route:application', 'Unit | Route | application', {
  // Specify the other units that are required for this test.
  // needs: ['controller:foo']
  beforeEach() {
    this.foo = fooValue;
  }
});

test('it exists', function(assert) {
  let route = this.subject();
  assert.ok(route);
});

assertSinonInTestContext(test);

test('preserving the context from the `beforeEach` hook', function (assert) {
  debugger;
  assert.ok(this.foo);
  assert.equal(this.foo, fooValue);
});

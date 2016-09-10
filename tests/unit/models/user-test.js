import { moduleForModel } from 'ember-qunit';
import test from 'ember-sinon-qunit/test-support/test';
import assertSinonInTestContext from '../../helpers/assert-sinon-in-test-context';

const fooValue = 42;

moduleForModel('user', 'Unit | Model | user', {
  // Specify the other units that are required for this test.
  needs: [],
  beforeEach() {
    this.foo = fooValue;
  }
});

test('it exists', function(assert) {
  let model = this.subject();
  // let store = this.store();
  assert.ok(!!model);
});

assertSinonInTestContext(test);

test('preserving the context from the `beforeEach` hook', function (assert) {
  assert.ok(this.foo);
  assert.equal(this.foo, fooValue);
});

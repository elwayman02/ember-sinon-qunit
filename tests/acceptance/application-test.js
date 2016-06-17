import { skip } from 'qunit';
import moduleForAcceptance from '../../tests/helpers/module-for-acceptance';
import assertSinonInTestContext from '../../tests/helpers/assert-sinon-in-test-context';
import test from 'ember-sinon-qunit/test-support/test';

const fooValue = 42;

moduleForAcceptance('Acceptance | application', {
  beforeEach() {
    this.foo = fooValue;
  }
});

test('visiting /', function(assert) {
  visit('/');

  andThen(function() {
    assert.equal(currentURL(), '/');
  });
});

assertSinonInTestContext(test);

// Currently, the context of `moduleForAcceptance` is not shared by
// ember-sinon-qunit's `test` context
// (See: https://github.com/elwayman02/ember-sinon-qunit/issues/25#issuecomment-222022526)
skip('preserving the context from the `beforeEach` hook', function (assert) {
  assert.ok(this.foo);
  assert.equal(this.foo, fooValue);
});

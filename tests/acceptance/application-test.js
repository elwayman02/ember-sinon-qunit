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

test('preserving the context from the `beforeEach` hook', function (assert) {
  assert.equal(this.foo, fooValue);
});

import { module, skip } from 'qunit';
import { isPresent } from 'ember-utils';
import test from 'dummy/tests/ember-sinon-qunit/test';
import assertSinonInTestContext from '../helpers/assert-sinon-in-test-context';

module('Unit | ember-sinon-qunit', {
  beforeEach() {
    this.foo = 'foo';
  }
});

assertSinonInTestContext(test);

// Currently, the context of `module` is not shared by
// ember-sinon-qunit's `test` context
// (See: https://github.com/elwayman02/ember-sinon-qunit/issues/25#issuecomment-222022526)
skip('does not destroy context from beforeEach', function (assert) {
  assert.ok(isPresent(this.foo), 'this.foo exists');
});

test('does not fake timers by default', function (assert) {
  assert.notEqual(Date.now(), 0, 'Date.now() is not reset');
});

test('does fake timers on request', { useFakeTimers: true }, function (assert) {
  assert.equal(Ember.typeOf(this.clock), 'object', 'clock exists');

  assert.equal(Date.now(), 0, 'Date.now() is set to 0');
  this.clock.tick(1234);
  assert.equal(Date.now(), 1234, 'Date.now() is set to 1234');
});

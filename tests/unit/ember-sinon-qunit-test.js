import { module, skip } from 'qunit';
import { isPresent } from 'ember-utils';
import test from 'ember-sinon-qunit/test-support/test';
import assertSinonInTestContext from '../helpers/assert-sinon-in-test-context';
import Ember from 'ember';

let origMethod;
let obj;
module('Unit | ember-sinon-qunit', {
  beforeEach() {
    this.foo = 'foo';

    origMethod = () => {};
    obj = {
      method: origMethod
    };
  },

  afterEach(assert) {
    assert.equal(obj.method, origMethod, 'stub was reset');
  }
});

assertSinonInTestContext(test);

// Currently, the context of `module` is not shared by
// ember-sinon-qunit's `test` context
// (See: https://github.com/elwayman02/ember-sinon-qunit/issues/25#issuecomment-222022526)
skip('does not destroy context from beforeEach', function (assert) {
  assert.ok(isPresent(this.foo), 'this.foo exists');
});

test('async with assert.async()', function (assert) {
  assert.expect(2);
  this.stub(obj, 'method');

  const done = assert.async();
  setTimeout(() => {
    assert.notEqual(obj.method, origMethod, 'stub not reset yet');
    done();
  });
});

test('async with Promise', function (assert) {
  assert.expect(2);
  this.stub(obj, 'method');

  return Ember.RSVP.resolve().then(() => {
    assert.notEqual(obj.method, origMethod);
  });
});

test('async with Promise and assert.async()', function (assert) {
  assert.expect(3);
  this.stub(obj, 'method');

  return Ember.RSVP.resolve().then(() => {
    assert.notEqual(obj.method, origMethod, 'stub not reset yet');
    const done = assert.async();
    setTimeout(() => {
      assert.notEqual(obj.method, origMethod, 'stub not reset yet');
      done();
    });
  });
});


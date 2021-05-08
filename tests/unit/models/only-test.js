import { module } from 'qunit';
import test from 'ember-sinon-qunit/test-support/test';
import only from 'ember-sinon-qunit/test-support/only';

module('Deprecated | Unit | Utils | only');

test('can import only', function (assert) {
  assert.equal(typeof only, 'function', 'can import `only');
});

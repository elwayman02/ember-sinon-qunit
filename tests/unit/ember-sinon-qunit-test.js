import { module, skip } from 'qunit';
import { isPresent } from 'ember-utils';
import test from 'ember-sinon-qunit/test-support/test';
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

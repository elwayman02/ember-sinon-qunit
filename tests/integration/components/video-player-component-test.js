import { moduleForComponent } from 'ember-qunit';
import test from 'dummy/tests/ember-sinon-qunit/test';
import hbs from 'htmlbars-inline-precompile';
import assertSinonInTestContext from '../../helpers/assert-sinon-in-test-context';

const fooValue = 42;

moduleForComponent('video-player', 'Integration | Component | video player', {
  integration: true,
  beforeEach() {
    this.foo = fooValue;
  }
});

assertSinonInTestContext(test);

test('preserving the context from the `beforeEach` hook', function (assert) {
  debugger;
  assert.ok(this.foo);
  assert.equal(this.foo, fooValue);
});

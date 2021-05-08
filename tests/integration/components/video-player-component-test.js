import { moduleForComponent } from 'ember-qunit';
import test from 'ember-sinon-qunit/test-support/test';
import assertSinonInTestContext from '../../helpers/assert-sinon-in-test-context';

const fooValue = 42;

moduleForComponent(
  'video-player',
  'Deprecated | Integration | Component | video player',
  {
    integration: true,
    beforeEach() {
      this.foo = fooValue;
    },
  }
);

assertSinonInTestContext(test);

test('preserving the context from the `beforeEach` hook', function (assert) {
  assert.equal(this.foo, fooValue);
});

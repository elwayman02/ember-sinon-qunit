import { module, test } from 'qunit';
import sinon from 'sinon';
import {
  createSandbox,
  restoreSandbox,
} from 'ember-sinon-qunit/test-support/sinon-sandbox';

module(`Unit | ember-sinon-qunit`, function () {
  test('`restoreSandbox` resets sinon', function (assert) {
    assert.expect(2);

    const foo = () => true;
    const bar = { foo };

    createSandbox();

    sinon.stub(bar, 'foo');

    assert.notEqual(bar.foo, foo);

    restoreSandbox();

    assert.strictEqual(bar.foo, foo);
  });

  test('`sinon.restore()` can still be called explicitly', function (assert) {
    assert.expect(2);

    const foo = () => true;
    const bar = { foo };

    createSandbox();

    sinon.stub(bar, 'foo');

    assert.notEqual(bar.foo, foo);

    sinon.restore();

    assert.strictEqual(bar.foo, foo);

    restoreSandbox();
  });

  test('using useFakeTimers API continues to work', function (assert) {
    assert.expect(1);

    createSandbox();

    let clock = sinon.useFakeTimers();

    assert.ok(
      clock,
      'The clock API continues to work after forced sandboxing.'
    );

    restoreSandbox();
  });

  test('using sinon.useFakeTimers correctly restores clocks', function (assert) {
    assert.expect(2);

    createSandbox();

    let clock = sinon.useFakeTimers();

    clock.tick(10000);

    assert.strictEqual(Date.now(), 10000);

    restoreSandbox();

    assert.notEqual(Date.now(), 10000);
  });

  test('using sinon.useFakeTimers multiple times in a single test throws', function (assert) {
    assert.expect(1);

    createSandbox();

    sinon.useFakeTimers();

    assert.throws(() => {
      sinon.useFakeTimers();
    }, /You called sinon's useFakeTimers multiple times within the same test\. This can result in unknown behavior\./);

    restoreSandbox();
  });
});

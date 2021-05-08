import { typeOf } from '@ember/utils';

const obj = {
  foo() {},
  bar() {},
  baz() {},
};

/**
 * Performs a series of assertions for the presence of sinon functionality
 * in whatever module variant that the `test` context is currently being
 * brought into (e.g. `module`, `moduleFor`, `moduleForComponent`)
 */
export default function assertSinonInTestContext(test) {
  test('brings spy() into test context', function (assert) {
    assert.equal(typeOf(this.spy), 'function', 'spy exists');

    const spy = this.spy(obj, 'foo');
    obj.foo();

    assert.ok(spy.calledOnce, 'spy registered call');
  });

  test('brings stub() into test context', function (assert) {
    assert.equal(typeOf(this.stub), 'function', 'stub exists');

    const stub = this.stub(obj, 'bar');
    obj.bar();

    assert.ok(stub.calledOnce, 'stub registered call');
  });

  test('brings mock() into test context', function (assert) {
    assert.equal(typeOf(this.mock), 'function', 'mock exists');

    const mock = this.mock(obj);
    mock.expects('baz').once();
    obj.baz();

    mock.verify();
  });

  test('brings fake() into test context', function (assert) {
    assert.equal(typeOf(this.fake), 'function', 'fake exists');

    const fake = this.fake.returns('paz');
    const result = fake();

    assert.ok(fake.calledOnce, 'fake registered the call');
    assert.equal(result, 'paz');
  });

  test('brings replace() into test context', function (assert) {
    assert.equal(typeOf(this.replace), 'function', 'replace exists');

    const stub = this.stub();
    this.replace(obj, 'baz', stub);
    obj.baz();

    assert.ok(stub.calledOnce, 'replaced() stub registered call');
  });

  test('brings replaceGetter() into test context', function (assert) {
    assert.equal(
      typeOf(this.replaceGetter),
      'function',
      'replaceGetter exists'
    );

    const thing = {
      get y() {
        return 'yo';
      },
    };

    const stub = this.stub().returns('oy');
    this.replaceGetter(thing, 'y', stub);
    thing.y;

    assert.ok(stub.calledOnce, 'replacedGetter() stub registered call');
  });

  test('brings replaceSetter() into test context', function (assert) {
    assert.equal(
      typeOf(this.replaceSetter),
      'function',
      'replaceSetter exists'
    );

    const thing = {
      set y(val) {
        //this._y = val;
      },
    };

    const stub = this.stub();
    this.replaceSetter(thing, 'y', stub);
    thing.y = 1;

    assert.ok(stub.calledOnce, 'replacedSetter() stub registered call');
  });

  test('brings sandbox() into test context', function (assert) {
    assert.equal(typeOf(this.sandbox), 'object', 'sandbox exists');
    assert.equal(
      this.sandbox.injectInto,
      this,
      'sandbox was injected into context'
    );
    const keys = this.sandbox.injectedKeys;
    assert.equal(keys.length, 4, '4 keys were injected');
    assert.equal(keys[0], 'spy', 'spy is injected');
    assert.equal(keys[1], 'stub', 'stub is injected');
    assert.equal(keys[2], 'mock', 'mock is injected');
    assert.equal(keys[3], 'sandbox', 'sandbox is injected');
  });

  test('sinon sandbox cleans up after itself', function (assert) {
    const spy = this.spy(obj, 'foo');
    const stub = this.stub(obj, 'bar');

    assert.ok(!spy.called, 'spy has no registered calls');
    assert.ok(!stub.called, 'stub has no registered calls');
  });
}

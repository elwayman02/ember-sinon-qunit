import Ember from 'ember';
import { module } from 'qunit';
import test from 'ember-sinon-qunit/test';

let obj = {
  foo: Ember.K,
  bar: Ember.K,
  baz: Ember.K
};

module('Unit | ember-sinon-qunit');

test('brings spy() into test context', function (assert) {
  assert.equal(Ember.typeOf(this.spy), 'function', 'spy exists');

  const spy = this.spy(obj, 'foo');
  obj.foo();

  assert.ok(spy.calledOnce, 'spy registered call');
});

test('brings stub() into test context', function (assert) {
  assert.equal(Ember.typeOf(this.stub), 'function', 'stub exists');

  const stub = this.stub(obj, 'bar');
  obj.bar();

  assert.ok(stub.calledOnce, 'stub registered call');
});

test('brings mock() into test context', function (assert) {
  assert.equal(Ember.typeOf(this.mock), 'function', 'mock exists');

  const mock = this.mock(obj);
  mock.expects('baz').once();
  obj.baz();

  mock.verify();
});

test('brings sandbox() into test context', function (assert) {
  assert.equal(Ember.typeOf(this.sandbox), 'object', 'sandbox exists');
  assert.equal(this.sandbox.injectInto, this, 'sandbox was injected into this');
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

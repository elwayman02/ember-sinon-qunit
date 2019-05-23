Ember Sinon QUnit
=================

[![Build Status](https://travis-ci.org/elwayman02/ember-sinon-qunit.svg?branch=master)](https://travis-ci.org/elwayman02/ember-sinon-qunit)
[![Ember Observer Score](http://emberobserver.com/badges/ember-sinon-qunit.svg)](http://emberobserver.com/addons/ember-sinon-qunit)
[![Code Climate](https://codeclimate.com/github/elwayman02/ember-sinon-qunit/badges/gpa.svg)](https://codeclimate.com/github/elwayman02/ember-sinon-qunit)
[![Codacy Badge](https://api.codacy.com/project/badge/8c6fbb028801423fbd4b1bfe17c9b1a0)](https://www.codacy.com/app/hawker-jordan/ember-sinon-qunit)

This addon integrates [`sinon`](http://jhawk.co/sinonjs) & [`ember-qunit`](http://jhawk.co/ember-qunit) 
via [`ember-sinon`](http://jhawk.co/ember-sinon), originally inspired by [`sinon-qunit`](http://jhawk.co/sinon-qunit).

Why not simply use `ember-sinon` alone? Two reasons:

1. `ember-sinon` does not handle cleanup of `ember-qunit` tests. While `sinon` 
[sandboxes itself](https://sinonjs.org/guides/migrating-to-5.0), it's up to the user to 
consistently clean up `sinon` after each test. `ember-sinon-qunit` automatically 
restores `sinon`'s state to ensure nothing is leaked between tests. All spies/stubs created
will be automatically restored to their original methods at the end of each test.
2. `sinon` is a framework-agnostic library; as such, `ember-sinon` should be as well. This addon exists to enable
`ember-sinon` to remove its `qunit` specific functionality, making it easier to utilize `ember-sinon` 
with other addons like [`ember-cli-mocha`](http://jhawk.co/ember-cli-mocha), for example.


Compatibility
------------------------------------------------------------------------------

* Sinon.js v5.0.0 or above
* Ember.js v3.4 or above
* Ember CLI v2.13 or above
* Node.js v8 or above


Installation
------------------------------------------------------------------------------

```
ember install ember-sinon-qunit
```

Usage
------------------------------------------------------------------------------

`ember-sinon-qunit` supports two different versions of the Ember-QUnit API:

1. The new QUnit hooks API, which takes a `hooks` object then wires up 
setup and restoration to `beforeEach` and `afterEach` of the module, respectively.
1. The classic API, which automatically wires up setup and restoration 
to `QUnit.testStart` and `QUnit.testDone` respectively.

### QUnit `hooks` API

To use, import the setup method from within your test file and execute it.

```js
import { setupSinon } from 'ember-sinon-qunit/test-support';

...

module('my module', function(hooks) {
  setupSinon(hooks);

  test('my test', function(assert) {
    ...
  })
})
```

This will automatically wire-up `sinon`'s setup & restoration to the module's `beforeEach` and `afterEach` respectively.

### Classic API

To use, import the setup method from within your `tests/test-helper.js` file and execute it.

```js
import setupSinon from 'ember-sinon-qunit/test-support/setup-global-sinon';

...

setupSinon();
```

This will automatically wire-up `sinon`'s setup & restoration to QUnit `testStart` and `testDone` respectively.

#### Accessing `sinon` from Within Tests

In each test you are able to access `sinon` via the `sinon` object available as an import in your tests:

```js
import sinon from 'sinon';

...

test('very important test happening here', function(assert) {
  const spy = sinon.spy();

  ...
});
```

The `sinon` object's state is automatically self-contained to each specific test, allowing you to 
safely create mocks for your tests without worrying about any overrides leaking between each test.

Migrating To `ember-sinon-qunit`
------------------------------------------------------------------------------

The above functionality replaces previous features within `ember-sinon-qunit`, 
as well as the sister addons [`ember-sinon-sinoff`](https://github.com/scalvert/ember-sinon-sinoff) 
and [`ember-sinon-sandbox`](https://github.com/scalvert/ember-sinon-sandbox). 
Below, you will find simple instructions for migrating from each of these feature sets to the new patterns.

### Migration from `sinon` 5+

1. Import and consume `setupSinon` for the [Hooks API](#qunit-hooks-api) or [Classic API](#classic-api).
1. Remove any manual calls to `sinon.restore()`. It won't hurt to leave them, but they are redundant now!

### Migration from older versions of `sinon`

1. Import and consume `setupSinon` for the [Hooks API](#qunit-hooks-api) or [Classic API](#classic-api).
1. Remove calls to `sinon.createSandbox()`. Anywhere you used the `sandbox` object returned by this method, 
you can now use `sinon` directly. See the [`sinon` Migration Guide](https://sinonjs.org/guides/migrating-to-5.0) 
for more information.
1. Remove any manual `restore()` calls for your sandboxes.

### Migration from older versions of `ember-sinon-qunit`

1. Revert to using the standard [`ember-qunit`](https://github.com/emberjs/ember-qunit) test import: 
`import { test } from 'qunit';`
1. Import and consume `setupSinon` for the [Hooks API](#qunit-hooks-api) or [Classic API](#classic-api).

### Migration from `ember-sinon-sinoff` or `ember-sinon-sandbox`

1. `import sinon from 'sinon';` within each test that currently uses a `sandbox`.
1. Replace `this.sandbox` with the imported `sinon` object.
1. Rename `setupSinonSinoff`/`setupSinonSandbox` to `setupSinon`.
1. Import `setupSinon` for the [Hooks API](#qunit-hooks-api) or [Classic API](#classic-api).

Deprecated Features
------------------------------------------------------------------------------

*Note: The following features are **deprecated** and should not be used, as they will be removed in a future major release.*

Import `ember-sinon-qunit`'s `test` method into your tests in place of Ember-QUnit's test. This creates a `sinon` `sandbox`
around that test via `sinon`'s `test` API. Then, you can access the following `sinon` functions via `this` within the test callback:
* `spy`, 
* `stub`, 
* `mock`, 
* `fake`,
* `replace`
* `replaceGetter`
* `replaceSetter`
* `sandbox`

```javascript
import { module } from 'qunit';
import test from 'ember-sinon-qunit/test-support/test';
import { setupTest } from 'ember-qunit';

module('Unit | Route | foo', function(hooks) {
  setupTest(hooks);

  test('fooTransition action transitions to bar route', function (assert) {
    let route = this.owner.lookup('route:foo');
    const stub = this.stub(route, 'transitionTo');
    
    route.send('fooTransition');
    
    assert.ok(stub.calledOnce, 'transitionTo was called once');
    assert.ok(stub.calledWithExactly('bar'), 'bar was passed to transitionTo');
  });
});
```

That's it! You can use this `test` method in place of all `ember-qunit` tests if you want, without any 
loss of functionality. Or, you can import them both into the same test to be used only when you need `sinon`:

```javascript
import { module } from 'qunit';
import test from 'ember-sinon-qunit/test-support/test';
import { setupTest } from 'ember-qunit';
```

Contributing
------------------------------------------------------------------------------

See the [Contributing](CONTRIBUTING.md) guide for details.


License
------------------------------------------------------------------------------

This project is licensed under the [MIT License](LICENSE.md).

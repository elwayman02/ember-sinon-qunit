Ember Sinon QUnit
=================

[![Build Status](https://travis-ci.org/elwayman02/ember-sinon-qunit.svg?branch=master)](https://travis-ci.org/elwayman02/ember-sinon-qunit)
[![Ember Observer Score](http://emberobserver.com/badges/ember-sinon-qunit.svg)](http://emberobserver.com/addons/ember-sinon-qunit)
[![Code Climate](https://codeclimate.com/github/elwayman02/ember-sinon-qunit/badges/gpa.svg)](https://codeclimate.com/github/elwayman02/ember-sinon-qunit)
[![Codacy Badge](https://api.codacy.com/project/badge/8c6fbb028801423fbd4b1bfe17c9b1a0)](https://www.codacy.com/app/hawker-jordan/ember-sinon-qunit)

This addon integrates [Sinon](http://jhawk.co/sinonjs) & [Ember-QUnit](http://jhawk.co/ember-qunit) 
via [Ember-Sinon](http://jhawk.co/ember-sinon), as inspired by [Sinon-QUnit](http://jhawk.co/sinon-qunit).

Why not simply use Ember-Sinon alone? Two reasons:

1. Ember-Sinon does not handle cleanup of Ember-QUnit tests. Ember-Sinon-QUnit automatically 
restores the Sinon sandbox to ensure nothing is leaked between tests. All spies/stubs created
via sandboxing will be automatically restored to their original methods at the end of each test.
2. Sinon is a framework-agnostic library; as such, Ember-Sinon should be as well. This addon exists to enable
Ember-Sinon to remove its QUnit specific functionality, making it easier to utilize Ember-Sinon 
with other addons like [Ember-CLI-Mocha](http://jhawk.co/ember-cli-mocha), for example.


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

Ember-Sinon-QUnit supports two different versions of the Ember-QUnit API:

1. The new QUnit hooks API, which takes a `hooks` object then wires up sandbox 
creation and restoration to `beforeEach` and `afterEach` of the module, respectively.
1. The classic API, which automatically wires up sandbox creation and restoration 
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

This will automatically wire-up the sandbox setup & restoration to the module's `beforeEach` and `afterEach` respectively.

### Classic API

To use, import the setup method from within your `tests/test-helper.js` file and execute it.

```js
import setupSinon from 'ember-sinon-qunit/test-support/setup-global-sinon';

...

setupSinon();
```

This will automatically wire-up the sandbox setup & restoration to QUnit `testStart` and `testDone` respectively.

#### Accessing Sinon from Within Tests

In each test you will be able to access the same sandboxed version of sinon via the `sinon` object available as an import in your tests:

```js
import sinon from 'sinon';

...

test('very important test happening here', function(assert) {
  const spy = sinon.spy();

  ...
});
```

The `sinon` object is automatically sandboxed to each specific test, allowing you to 
safely create mocks for your tests without worrying about any overrides leaking between each test.

Migrating To Ember-Sinon-QUnit
------------------------------------------------------------------------------

The above functionality replaces previous features within Ember-Sinon-QUnit, 
as well as the sister addons [`ember-sinon-sinoff`](https://github.com/scalvert/ember-sinon-sinoff) 
and [`ember-sinon-sandbox`](https://github.com/scalvert/ember-sinon-sandbox). 
Below, you will find simple instructions for migrating from each of these feature sets to the new patterns.

### Migration from Sinon 5+

1. Import and consume `setupSinon` for the [Hooks API](#qunit-hooks-api) or [Classic API](#classic-api).
1. Remove any manual calls to `sinon.restore()`. It won't hurt to leave them, but they are redundant now!

### Migration from older versions of Sinon

1. Import and consume `setupSinon` for the [Hooks API](#qunit-hooks-api) or [Classic API](#classic-api).
1. Remove calls to `sinon.createSandbox()`. Anywhere you used the `sandbox` object returned by this method, 
you can now use `sinon` directly. See the [Sinon Migration Guide](https://sinonjs.org/guides/migrating-to-5.0) 
for more information.
1. Remove any manual `restore()` calls for your sandboxes.

### Migration from older versions of Ember-Sinon-QUnit

1. Revert to using the standard [`ember-qunit`](https://github.com/emberjs/ember-qunit) test import: 
`import { test } from 'qunit';`
1. Import and consume `setupSinon` for the [Hooks API](#qunit-hooks-api) or [Classic API](#classic-api).

### Migration from Ember-Sinon-Sinoff or Ember-Sinon-Sandbox

1. `import sinon from 'sinon';` within each test that currently uses a `sandbox`.
1. Replace `this.sandbox` with the imported `sinon` object.
1. Rename `setupSinonSinoff`/`setupSinonSandbox` to `setupSinon`.
1. Import `setupSinon` for the [Hooks API](#qunit-hooks-api) or [Classic API](#classic-api).

Deprecated Features
------------------------------------------------------------------------------

*Note: The following features are **deprecated** and should not be used, as they will be removed in a future major release.*

Import Ember-Sinon-QUnit's `test` method into your tests in place of Ember-QUnit's test. This creates a Sinon `sandbox`
around that test via Sinon's `test` API. Then, you can access the following Sinon functions via `this` within the test callback:
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

That's it! You can use this `test` method in place of all Ember-QUnit tests if you want, without any 
loss of functionality. Or, you can import them both into the same test to be used only when you need Sinon:

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

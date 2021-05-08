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
* Ember.js v3.16 or above
* Ember CLI v2.13 or above
* Node.js v12 or above


Installation
------------------------------------------------------------------------------

```
ember install ember-sinon-qunit
```


Usage
------------------------------------------------------------------------------

To use, import the setup method into your `tests/test-helper.js` file and execute it.

```js
import { setApplication } from '@ember/test-helpers'; 
import { start } from 'ember-qunit'; 
import Application from '../app'; 
import config from '../config/environment'; 
import setupSinon from 'ember-sinon-qunit';
 
setApplication(Application.create(config.APP)); 
 
setupSinon();
 
start(); 
```

This will automatically wire-up `sinon`'s setup & restoration to QUnit's `testStart` and `testDone` respectively.

#### Accessing `sinon` Within Tests

In each test you are able to access `sinon` via the `sinon` object available as an import in your tests:

```js
import { module } from 'qunit';
import { test } from 'ember-qunit';
import sinon from 'sinon';

module('Example test', function(hooks) {
  hooks.beforeEach(function() {
    this.testStub = sinon.stub();
  });

  test('sinon is wired up correctly', function(assert) {
    this.testStub();

    assert.ok(this.testStub.calledOnce, 'stub was called once');
  });

  test('sinon state restored after every test run', function(assert) {
    assert.ok(this.testStub.notCalled, 'stub cleaned up after each test run');
  });
});
```

The `sinon` object's state is automatically self-contained to each specific test, allowing you to 
safely create mocks for your tests without worrying about any overrides leaking between each test.

#### Using sinon with the `@action` decorator

The `@action` decorator is used with methods to bind them to the `this` of the class. The `@action`
does this by wrapping the method in a property with the `getter` of the property returning the
original method bound to `this`. That means when you wish to stub or spy the method, you have to treat it as a
property not a method.

```js
let stubAction = sinon.stub(service, "methodToStub").get(
    function() { 
        return null; 
    }
);

let spyAction = sinon.spy(service, "methodToStub", ["get"]);

assert.ok(stubAction.get.calledOnce);
assert.ok(spyAction.get.calledOnce);
```

Migrating To `ember-sinon-qunit`
------------------------------------------------------------------------------

| Read this [post](https://www.jordanhawker.com/p/187541610821) to learn more about the overhaul of this package. |
| --- |

The above functionality replaces previous features within `ember-sinon-qunit`, 
as well as the sister addons [`ember-sinon-sinoff`](https://github.com/scalvert/ember-sinon-sinoff) 
and [`ember-sinon-sandbox`](https://github.com/scalvert/ember-sinon-sandbox). 
Below, you will find simple instructions for migrating from each of these feature sets to the new patterns.

### Migration from `sinon` 5+

1. Import and consume `setupSinon`.
1. Remove any manual calls to `sinon.restore()`. It won't hurt to leave them, but they are redundant now!

### Migration from older versions of `sinon`

1. Import and consume `setupSinon`.
1. Remove calls to `sinon.createSandbox()`. Anywhere you used the `sandbox` object returned by this method, 
you can now use `sinon` directly. See the [`sinon` Migration Guide](https://sinonjs.org/guides/migrating-to-5.0) 
for more information.
1. Remove any manual `restore()` calls for your sandboxes.

### Migration from older versions of `ember-sinon-qunit`

1. Revert to using the standard [`ember-qunit`](https://github.com/emberjs/ember-qunit) test import: 
`import { test } from 'qunit';`
1. Import and consume `setupSinon`.

### Migration from `ember-sinon-sinoff` or `ember-sinon-sandbox`

1. `import sinon from 'sinon';` within each test that currently uses a `sandbox`.
1. Replace `this.sandbox` with the imported `sinon` object.
1. Remove references to `setupSinonSinoff`/`setupSinonSandbox` from your tests.
1. Import and consume `setupSinon`.

Or, if you'd like to save some effort, try the following codemod [`ember-sinon-qunit-codemod`](https://github.com/sunwrobert/ember-sinon-qunit-codemod): 

```bash
cd my-ember-app-or-addon
npx ember-sinon-qunit-codemod tests
```

Contributing
------------------------------------------------------------------------------

See the [Contributing](CONTRIBUTING.md) guide for details.


License
------------------------------------------------------------------------------

This project is licensed under the [MIT License](LICENSE.md).

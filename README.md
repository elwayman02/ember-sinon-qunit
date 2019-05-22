Ember Sinon QUnit
=================

[![Build Status](https://travis-ci.org/elwayman02/ember-sinon-qunit.svg?branch=master)](https://travis-ci.org/elwayman02/ember-sinon-qunit)
[![Ember Observer Score](http://emberobserver.com/badges/ember-sinon-qunit.svg)](http://emberobserver.com/addons/ember-sinon-qunit)
[![Code Climate](https://codeclimate.com/github/elwayman02/ember-sinon-qunit/badges/gpa.svg)](https://codeclimate.com/github/elwayman02/ember-sinon-qunit)
[![Codacy Badge](https://api.codacy.com/project/badge/8c6fbb028801423fbd4b1bfe17c9b1a0)](https://www.codacy.com/app/hawker-jordan/ember-sinon-qunit)

This addon integrates [Sinon](http://jhawk.co/sinonjs) & [Ember-QUnit](http://jhawk.co/ember-qunit) 
via [Ember-Sinon](http://jhawk.co/ember-sinon), as inspired by [Sinon-QUnit](http://jhawk.co/sinon-qunit).

Why not simply use Ember-Sinon? Two reasons:

1. Ember-Sinon does not handle cleanup of Ember-QUnit tests. Ember-Sinon-QUnit provides a test method 
that wraps Ember-QUnit while making each test callback a sandboxed Sinon environment. All spies/stubs created
via the sandbox will be automatically restored to their original methods at the end of each test.
2. Sinon is a framework-agnostic library; as such, Ember-Sinon should be as well. This addon exists to enable
Ember-Sinon to remove its QUnit specific functionality, making it easier to utilize Ember-Sinon 
with other addons like [Ember-CLI-Mocha](http://jhawk.co/ember-cli-mocha), for example.


Compatibility
------------------------------------------------------------------------------

* Ember.js v2.18 or above
* Ember CLI v2.13 or above
* Node.js v8 or above


Installation
------------------------------------------------------------------------------

```
ember install ember-sinon-qunit
```


Usage
------------------------------------------------------------------------------

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

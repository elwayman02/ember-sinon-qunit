// backwards compatibility
import only from 'ember-sinon-qunit/test-support/only';
export default function () {
  console.warn("Using deprecated import path for ember-sinon-qunit; use `import test from 'ember-sinon-qunit/test-support/only';` instead.");
  return only.apply(this, arguments);
}
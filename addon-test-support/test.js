import { deprecate } from '@ember/debug';
import { test as emberQUnitTest } from 'ember-qunit';
import { wrapTest, commonConfig } from './utils/config';

// Global sinon config setup
commonConfig();

export default function test(testName, callback) {
  deprecate('This pattern is now deprecated. Please import the `setupSinon` method instead.', {
    id: 'ember-sinon-qunit.test'
  });
  wrapTest(testName, callback, emberQUnitTest);
}

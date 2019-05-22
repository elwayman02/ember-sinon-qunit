import { deprecate } from '@ember/debug';
import { only as emberQUnitOnly } from 'ember-qunit';
import { wrapTest, commonConfig } from './utils/config';

// Global sinon config setup
commonConfig();

export default function only(testName, callback) {
  deprecate('This pattern is now deprecated. Please import the `setupSinon` method instead.', {
    id: 'ember-sinon-qunit.only'
  });
  wrapTest(testName, callback, emberQUnitOnly);
}

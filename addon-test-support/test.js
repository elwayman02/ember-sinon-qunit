import { test as emberQUnitTest } from 'ember-qunit';
import { wrapTest, commonConfig } from './utils/config';

// Global sinon config setup
commonConfig();

export default function test(testName, callback) {
  wrapTest(testName, callback, emberQUnitTest);
}

import { only as emberQUnitOnly } from 'ember-qunit';
import { wrapTest, commonConfig } from './utils/config';

// Global sinon config setup
commonConfig();

export default function only(testName, callback) {
  wrapTest(testName, callback, emberQUnitOnly);
}
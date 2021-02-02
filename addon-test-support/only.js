import { deprecate } from '@ember/application/deprecations';
import { only as emberQUnitOnly } from 'ember-qunit';
import { wrapTest, commonConfig } from './utils/config';

// Global sinon config setup
commonConfig();

export default function only(testName, callback) {
  deprecate('This pattern is now deprecated. Please import the `setupSinon` method instead.', false, {
    id: 'ember-sinon-qunit.only',
    until: '5.0.0',
    url: 'https://github.com/elwayman02/ember-sinon-qunit#migration-from-older-versions-of-ember-sinon-qunit'
  });
  wrapTest(testName, callback, emberQUnitOnly);
}

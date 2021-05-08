import { computed } from '@ember/object';
import Model from '@ember-data/model';
import { attr } from '@ember-data/model';

export default Model.extend({
  firstName: attr('string'),
  lastName: attr('string'),

  fullName: computed('firstName', 'lastName', function () {
    return `${this.firstName} ${this.lastName}`;
  }),
});

import Model from '@ember-data/model';
import { attr } from '@ember-data/model';
import { tracked } from '@glimmer/tracking';

export default class UserModel extends Model {
  @tracked
  firstName = attr('string');

  @tracked
  lastName = attr('string');

  fullName() {
    return `${this.firstName} ${this.lastName}`;
  }
}

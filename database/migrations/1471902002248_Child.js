'use strict';

const Schema = use('Schema');

class ChildSchema extends Schema {

  up() {
    this.create('children', (table) => {
      table.increments();
      table.string('name');
      table.integer('age');
      table.json('care_details');
      table.integer('profile_id').references('profiles.id');
      table.timestamps();
    });
  }

  down() {
    this.drop('children');
  }

}

module.exports = ChildSchema;

'use strict';

const Schema = use('Schema');

class RatingSchema extends Schema {

  up() {
    this.create('ratings', (table) => {
      table.increments();
      table.integer('value');
      table.integer('profile_id').references('profiles.id');
      table.timestamps();
    });
  }

  down() {
    this.drop('ratings');
  }

}

module.exports = RatingSchema;

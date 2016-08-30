'use strict';

const Schema = use('Schema');

class RatingAddUserSchema extends Schema {

  up() {
    this.table('ratings', (table) => {
      table.integer('user_id').references('users.id');
    });
  }

  down() {
    this.table('ratings', (table) => {
      table.dropColumn('user_id');
    });
  }

}

module.exports = RatingAddUserSchema;

'use strict';

const Schema = use('Schema');

class LikeSchema extends Schema {

  up() {
    this.create('likes', (table) => {
      table.increments();
      table.integer('user_id').references('users.id');
      table.integer('profile_id').references('profiles.id');
      table.boolean('like');
      table.timestamps();
    });
  }

  down() {
    this.drop('likes');
  }

}

module.exports = LikeSchema;

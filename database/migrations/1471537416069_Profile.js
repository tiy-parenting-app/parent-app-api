'use strict';

const Schema = use('Schema');

class ProfileSchema extends Schema {

  up() {
    this.create('profiles', (table) => {
      table.increments();
      table.string('user_pic_url');
      table.string('first_name');
      table.string('last_name');
      table.text('user_blurb');
      table.string('location');
      table.string('sitter_rate');
      table.string('looking_for');
      table.string('phone_number');
      table.text('user_about');
      table.boolean('number_is_secret');
      table.boolean('child_is_unlocked');
      table.integer('user_id').references('users.id');
      table.timestamps();
    });
  }

  down() {
    this.drop('profiles');
  }

}

module.exports = ProfileSchema;

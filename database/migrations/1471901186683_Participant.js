'use strict';

const Schema = use('Schema');

class ParticipantSchema extends Schema {

  up() {
    this.create('participants', (table) => {
      table.increments();
      table.boolean('read');
      table.boolean('is_liked');
      
      table.integer('conversation_id').references('conversations.id');
      table.integer('user_id').references('users.id');
      table.timestamps();
    });
  }

  down() {
    this.drop('participants');
  }

}

module.exports = ParticipantSchema;

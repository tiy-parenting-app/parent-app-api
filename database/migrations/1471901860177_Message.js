'use strict';

const Schema = use('Schema');

class MessageSchema extends Schema {

  up() {
    this.create('messages', (table) => {
      table.increments();
      table.text('text');
      table.integer('participant_id').references('participants.id');
      table.integer('conversation_id').references('conversations.id');
      table.timestamps();
    });
  }

  down() {
    this.drop('messages');
  }

}

module.exports = MessageSchema;

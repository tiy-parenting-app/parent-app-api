'use strict';

const Schema = use('Schema');

class ConversationSchema extends Schema {

  up() {
    this.create('conversations', (table) => {
      table.increments();
      
      
      table.timestamps();
    });
  }

  down() {
    this.drop('conversations');
  }

}

module.exports = ConversationSchema;

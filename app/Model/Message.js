'use strict';

const Lucid = use('Lucid');

class Message extends Lucid {

  participant() {
    return this.belongsTo('App/Model/Participant', 'id', 'participant_id');
  }
  conversation() {
    return this.belongsTo('App/Model/Conversation', 'id', 'conversation_id');
  }
}

module.exports = Message;

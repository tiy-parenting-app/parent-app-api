'use strict';

const Lucid = use('Lucid');

class Message extends Lucid {

  messages() {
    return this.hasMany('App/Model/Message', 'id', 'conversation_id');
  }
  conversation() {
    return this.belongsTo('App/Model/Conversation', 'id', 'conversation_id');
  }
  participants() {
    return this.hasMany('App/Model/Participant', 'id', 'conversation_id');
  }
}

module.exports = Message;

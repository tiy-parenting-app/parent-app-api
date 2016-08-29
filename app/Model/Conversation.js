'use strict';

const Lucid = use('Lucid');

class Conversation extends Lucid {


  messages() {
    return this.hasMany('App/Model/Message', 'id', 'conversation_id');
  }
  participants() {
    return this.hasMany('App/Model/Participant', 'id', 'conversation_id');
  }
}

module.exports = Conversation;

'use strict'

const Lucid = use('Lucid')

class Conversation extends Lucid {


  message() {
    return this.hasMany('App/Model/Message', 'id', 'conversation_id');
  }
  participant() {
    return this.hasMany('App/Model/Participant', 'id', 'conversation_id');
  }
}

module.exports = Conversation

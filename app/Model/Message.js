'use strict';

const Lucid = use('Lucid');

class Message extends Lucid {

  participant() {
    return this.belongsTo('App/Model/Participant', 'id', 'participant_id');
  }
  participants() {
    return this.hasMany('App/Model/Participant', 'id', 'conversation_id');
  }
}

module.exports = Message;

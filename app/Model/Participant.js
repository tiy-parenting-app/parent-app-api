'use strict'

const Lucid = use('Lucid')

class Participant extends Lucid {


  messages() {
    return this.hasMany('App/Model/Message', 'id', 'participant_id');
  }
  conversation() {
    return this.belongsTo('App/Model/Conversation', 'id', 'conversation_id');
  }
  user() {
    return this.belongsTo('App/Model/User', 'id', 'user_id');
  }
}

module.exports = Participant

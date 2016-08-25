'use strict';

const Lucid = use('Lucid');

class User extends Lucid {

  apiTokens() {
    return this.hasMany('App/Model/Token');
  }

  profile() {
    return this.hasOne('App/Model/Profile');
  }

  participants() {
    return this.hasMany('App/Model/Participant');
  }

  conversations() {
    return this.hasManyThrough(
      'App/Model/Conversation', 'App/Model/Participant',
      'id', 'user_id',
      'conversation_id', 'id');
  }

}

module.exports = User;

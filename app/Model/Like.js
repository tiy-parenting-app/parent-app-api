'use strict';

const Lucid = use('Lucid');

class Like extends Lucid {


  user() {
    return this.belongsTo('App/Model/User', 'id', 'user_id');
  }
  profile() {
    return this.belongsTo('App/Model/Profile', 'id', 'profile_id');
  }
}

module.exports = Like;

'use strict';

const Lucid = use('Lucid');

class Profile extends Lucid {


  user() {
    return this.belongsTo('App/Model/User', 'id', 'user_id');
  }

  children() {
    return this.hasMany('App/Model/Child');
  }
}

module.exports = Profile;

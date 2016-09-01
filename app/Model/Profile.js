'use strict';

const Lucid = use('Lucid');

class Profile extends Lucid {


  user() {
    return this.belongsTo('App/Model/User', 'id', 'user_id');
  }

  children() {
    return this.hasMany('App/Model/Child');
  }

  ratings() {
    return this.hasMany('App/Model/Rating');
  }

  likes() {
    return this.hasMany('App/Model/Likes');
  }
}

module.exports = Profile;

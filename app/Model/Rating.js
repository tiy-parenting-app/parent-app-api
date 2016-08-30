'use strict';

const Lucid = use('Lucid');

class Rating extends Lucid {


  profile() {
    return this.belongsTo('App/Model/Profile', 'id', 'profile_id');
  }

  user() {
    return this.belongsTo('App/Model/User', 'id', 'user_id');
  }
}

module.exports = Rating;

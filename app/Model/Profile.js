'use strict'

const Lucid = use('Lucid')

class Profile extends Lucid {


  user() {
    return this.belongsTo('App/Model/User', 'id', 'user_id');
  }
}

module.exports = Profile

'use strict'

const Lucid = use('Lucid')

class Rating extends Lucid {


  profile() {
    return this.belongsTo('App/Model/Profile', 'id', 'profile_id');
  }
}

module.exports = Rating

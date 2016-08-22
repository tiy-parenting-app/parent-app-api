'use strict'

const Lucid = use('Lucid')

class Child extends Lucid {


  profile() {
    return this.belongsTo('App/Model/Profile', 'id', 'profile_id');
  }
}

module.exports = Child

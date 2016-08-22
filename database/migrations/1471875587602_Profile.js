'use strict';

const Schema = use('Schema');

class ProfileSchema extends Schema {

  up() {
    this.create('profiles', (table) => {
      table.increments();
      table.boolean('isParent');
      table.string('userPicUrl');
      table.string('firstName');
      table.string('lastName');
      table.text('userBlurb');
      table.string('location');
      table.integer('rating');
      table.boolean('isLiked');
      table.integer('sitterRate');
      table.string('lookingFor');
      table.string('phoneNumber');
      table.text('userAbout');
      table.boolean('numberIsSecret');
      table.boolean('isConnected');
      table.boolean('childIsUnlocked');
      table.timestamps();
    });
  }

  down() {
    this.drop('profiles');
  }

}

module.exports = ProfileSchema;

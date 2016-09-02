'use strict';

const Schema = use('Schema');

class ProfileAddImageSchema extends Schema {

  up() {
    this.table('profiles', (table) => {
      table.string('user_pic_extension');
    });
  }

  down() {
    this.table('profiles', (table) => {
      table.dropColumn('user_pic_extension');
    });
  }

}

module.exports = ProfileAddImageSchema;

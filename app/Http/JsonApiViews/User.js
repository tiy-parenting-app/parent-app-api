const JsonApiView = require('adonis-jsonapi/src/JsonApiView');

class User extends JsonApiView {
  get attributes() {
    return ['username', 'email'];
  }

  profile() {
    return this.belongsTo('App/Http/JsonApiViews/Profile', {
      included: true,
      excludeRelation: 'user',
    });
  }
}

module.exports = User;

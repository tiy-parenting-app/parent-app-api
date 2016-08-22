const JsonApiView = require('adonis-jsonapi/src/JsonApiView');

class Rating extends JsonApiView {
  get attributes() {
    return ['value'];
  }

  profile() {
    return this.belongsTo('App/Http/JsonApiViews/Profile', true);
  }
}

module.exports = Rating;

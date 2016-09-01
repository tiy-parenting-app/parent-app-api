const JsonApiView = require('adonis-jsonapi/src/JsonApiView');

class Like extends JsonApiView {
  get attributes() {
    return ['like'];
  }

  user() {
    return this.belongsTo('App/Http/JsonApiViews/User', {
      included: false,
      excludeRelation: 'likes'
    });
  }

  profile() {
    return this.belongsTo('App/Http/JsonApiViews/Profile', {
      included: false,
      excludeRelation: 'likes'
    });
  }

}

module.exports = Like;

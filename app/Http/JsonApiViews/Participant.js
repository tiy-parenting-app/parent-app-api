const JsonApiView = require('adonis-jsonapi/src/JsonApiView');

class Participant extends JsonApiView {
  get attributes() {
    return ['read', 'is_liked'];
  }

  messages() {
    return this.hasMany('App/Http/JsonApiViews/Message', {
      included: false,
      excludeRelation: 'participant',
    });
  }

  conversation() {
    return this.hasMany('App/Http/JsonApiViews/Conversation', {
      included: false,
      excludeRelation: 'participant',
    });
  }

  user() {
    return this.belongsTo('App/Http/JsonApiViews/User', {
      included: false,
      excludeRelation: 'participants',
    });
  }

}

module.exports = Participant;

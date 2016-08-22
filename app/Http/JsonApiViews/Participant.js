const JsonApiView = require('adonis-jsonapi/src/JsonApiView');

class Participant extends JsonApiView {
  get attributes() {
    return ['read', 'is_liked'];
  }

  messages() {
    return this.hasMany('App/Http/JsonApiViews/Message', true);
  }

  conversation() {
    return this.belongsTo('App/Http/JsonApiViews/Conversation', true);
  }

  user() {
    return this.belongsTo('App/Http/JsonApiViews/User', true);
  }
}

module.exports = Participant;

const JsonApiView = require('adonis-jsonapi/src/JsonApiView');

class Conversation extends JsonApiView {
  get attributes() {
    return [];
  }

  messages() {
    return this.hasMany('App/Http/JsonApiViews/Message', false);
  }

  participants() {
    return this.hasMany('App/Http/JsonApiViews/Participant', false);
  }
}

module.exports = Conversation;

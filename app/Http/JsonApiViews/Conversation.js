const JsonApiView = require('adonis-jsonapi/src/JsonApiView');

class Conversation extends JsonApiView {
  get attributes() {
    return [];
  }

  message() {
    return this.hasMany('App/Http/JsonApiViews/Message', true);
  }

  participant() {
    return this.hasMany('App/Http/JsonApiViews/Participant', true);
  }
}

module.exports = Conversation;

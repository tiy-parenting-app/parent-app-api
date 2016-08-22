const JsonApiView = require('adonis-jsonapi/src/JsonApiView');

class Message extends JsonApiView {
  get attributes() {
    return ['text'];
  }

  participant() {
    return this.belongsTo('App/Http/JsonApiViews/Participant', true);
  }

  conversation() {
    return this.belongsTo('App/Http/JsonApiViews/Conversation', true);
  }
}

module.exports = Message;

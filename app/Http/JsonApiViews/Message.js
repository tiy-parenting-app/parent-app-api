const JsonApiView = require('adonis-jsonapi/src/JsonApiView');

class Message extends JsonApiView {
  get attributes() {
    return ['text'];
  }

  participant() {
    return this.belongsTo('App/Http/JsonApiViews/Participant', {
      included: false,
      excludeRelation: 'messages',
    });
  }

  conversation() {
    return this.belongsTo('App/Http/JsonApiViews/Conversation', {
      included: false,
      excludeRelation: 'messages',
    });
  }

}

module.exports = Message;

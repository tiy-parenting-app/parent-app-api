const JsonApiView = require('adonis-jsonapi/src/JsonApiView');

class Message extends JsonApiView {
  get attributes() {
    return ['text'];
  }

  participant() {
    return this.belongsTo('App/Http/JsonApiViews/Participant', {
      included: true,
      excludeRelation: 'messages'
    });
  }

  conversation() {
    return this.belongsTo('App/Http/JsonApiViews/Conversation', {
      included: true,
      excludeRelation: 'messages'
    });
  }

}

module.exports = Message;

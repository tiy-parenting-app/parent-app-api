const JsonApiView = require('adonis-jsonapi/src/JsonApiView');

class Conversation extends JsonApiView {
  get attributes() {
    return [];
  }

  messages() {
    return this.hasMany('App/Http/JsonApiViews/Message', {
      included: true,
      excludeRelation: 'conversation',
    });
  }

  participants() {
    return this.hasMany('App/Http/JsonApiViews/Participant', {
      included: true,
      excludeRelation: 'conversation',
    });
  }

}

module.exports = Conversation;

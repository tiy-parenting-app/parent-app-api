const JsonApiView = require('adonis-jsonapi/src/JsonApiView');

class Conversation extends JsonApiView {
  get attributes() {
    return [];
  }

  messages() {
    return this.hasMany('App/Http/JsonApiViews/Message', {
      included: false,
      excludeRelation: 'conversation',
    });
  }

  participants() {
    return this.hasMany('App/Http/JsonApiViews/Participant', {
      included: false,
      excludeRelation: 'conversation',
    });
  }

}

module.exports = Conversation;

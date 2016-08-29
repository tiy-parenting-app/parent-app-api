'use strict';

const Conversation = use('App/Model/Conversation');

class ConversationController {

  * index(request, response) {
    const user = request.authUser;
    const conversations = yield user.conversations()
      .with('participants.user', 'messages.participant').fetch();
    response.send(conversations);
    response.jsonApi('Conversation', conversations);
  }

  * store(request, response) {
    const conversation = yield Conversation.create();

    response.jsonApi('Conversation', conversation);
  }

  * show(request, response) {
    const id = request.param('id');
    const conversation = yield Conversation.with('participants.user', 'messages.participant')
      .where({ id }).firstOrFail();

    response.jsonApi('Conversation', conversation);
  }

  * update(request, response) {
    const id = request.param('id');
    request.jsonApi.assertId(id);

    const input = request.jsonApi.getAttributesSnakeCase(attributes);
    const foreignKeys = {
    };

    const conversation = yield Conversation.with('participants.user', 'messages')
      .where({ id }).firstOrFail();

    conversation.fill(Object.assign({}, input, foreignKeys));
    conversation.save();

    response.jsonApi('Conversation', conversation);
  }

  * destroy(request, response) {
    const id = request.param('id');

    const conversation = yield Conversation.query().where({ id }).firstOrFail();
    yield conversation.delete();

    response.status(204).send();
  }

}

module.exports = ConversationController;

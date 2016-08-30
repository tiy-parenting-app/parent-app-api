'use strict';

const Conversation = use('App/Model/Conversation');
const Database = use('Database');

class ConversationController {

  * index(request, response) {
    const userQuery = request.input('filter.user');
    const user = request.authUser;

    if (userQuery) {
      let conversation;
      try {
        conversation = yield user.conversations()
          .with('participants.user', 'messages.participant')
          .join(Database.raw('participants as other_p'), 'other_p.conversation_id', 'conversations.id')
          .where('other_p.user_id', userQuery)
          .firstOrFail();
      } catch (e) {
        conversation = yield Conversation.create({
          created_at: new Date(),
        });
        yield conversation.participants().create({
          user_id: userQuery,
        });
        yield conversation.participants().create({
          user_id: user.id,
        });

        yield conversation.related('participants.user', 'messages.participant').load();
      }

      response.jsonApi('Conversation', conversation);
    } else {
      const conversations = yield user.conversations()
        .with('participants.user', 'messages.participant').fetch();

      response.jsonApi('Conversation', conversations);
    }
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

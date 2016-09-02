
'use strict';

const Message = use('App/Model/Message');
const Participant = use('App/Model/Participant');
const Event = use('Event');
const attributes = ['text'];

class MessageController {

  * index(request, response) {
    const messages = yield Message.with('participant', 'conversation').fetch();

    response.jsonApi('Message', messages);
  }

  * store(request, response) {
    const input = request.jsonApi.getAttributesSnakeCase(attributes);
    const conversation_id = parseInt(request.input('data.relationships.conversation.data.id'));
    const participant = yield Participant
      .query().where({ user_id: request.currentUser.id, conversation_id }).first();

    const foreignKeys = {
      participant_id: participant.id,
      conversation_id,
    };
    const message = yield Message.create(Object.assign({}, input, foreignKeys));
    yield message.related('conversation', 'participant').load();
    Event.fire('message.create', message);

    response.jsonApi('Message', message);
  }

  * show(request, response) {
    const id = request.param('id');
    const message = yield Message.with('participant', 'conversation').where({ id }).firstOrFail();

    response.jsonApi('Message', message);
  }

  * update(request, response) {
    const id = request.param('id');
    request.jsonApi.assertId(id);

    const input = request.jsonApi.getAttributesSnakeCase(attributes);
    const conversation_id = parseInt(request.input('data.relationships.conversation.data.id'));
    const participant = yield Participant
      .query().where({ user_id: request.currentUser.id, conversation_id }).first();

    const foreignKeys = {
      participant_id: participant.id,
      conversation_id,
    };

    const message = yield Message.with('participant', 'conversation').where({ id }).firstOrFail();
    message.fill(Object.assign({}, input, foreignKeys));
    yield message.save();

    response.jsonApi('Message', message);
  }

  * destroy(request, response) {
    const id = request.param('id');

    const message = yield Message.query().where({ id }).firstOrFail();
    yield message.delete();

    response.status(204).send();
  }

}

module.exports = MessageController;

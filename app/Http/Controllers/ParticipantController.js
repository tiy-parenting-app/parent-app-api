'use strict';

const Participant = use('App/Model/Participant');
const attributes = ['read', 'is-liked'];

class ParticipantController {

  * index(request, response) {
    const participants = yield Participant.with('messages', 'conversation', 'user').fetch();

    response.jsonApi('Participant', participants);
  }

  * store(request, response) {
    const input = request.jsonApi.getAttributesSnakeCase(attributes);
    const foreignKeys = {
      conversation_id: conversation,
      user_id: user,
    };
    const participant = yield Participant.create(Object.assign({}, input, foreignKeys));

    response.jsonApi('Participant', participant);
  }

  * show(request, response) {
    const id = request.param('id');
    const participant = yield Participant.with('messages', 'conversation', 'user').where({ id }).firstOrFail();

    response.jsonApi('Participant', participant);
  }

  * update(request, response) {
    const id = request.param('id');
    request.jsonApi.assertId(id);

    const input = request.jsonApi.getAttributesSnakeCase(attributes);
    const foreignKeys = {
      conversation_id: conversation,
      user_id: user,
    };

    const participant = yield Participant.with('messages', 'conversation', 'user').where({ id }).firstOrFail();
    participant.fill(Object.assign({}, input, foreignKeys));
    yield participant.save();

    response.jsonApi('Participant', participant);
  }

  * destroy(request, response) {
    const id = request.param('id');

    const participant = yield Participant.query().where({ id }).firstOrFail();
    yield participant.delete();

    response.status(204).send();
  }

}

module.exports = ParticipantController;

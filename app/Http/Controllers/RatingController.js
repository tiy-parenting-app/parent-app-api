'use strict';

const Rating = use('App/Model/Rating');
const attributes = ['value'];

class RatingController {

  * index(request, response) {
    const ratings = yield request.authUser.ratings().fetch();

    response.jsonApi('Rating', ratings);
  }

  * store(request, response) {
    const input = request.jsonApi.getAttributesSnakeCase(attributes);
    const foreignKeys = {
      profile_id: request.input('data.relationships.profile.data.id'),
      user_id: request.authUser.id,
    };
    const rating = yield Rating.create(Object.assign({}, input, foreignKeys));

    response.jsonApi('Rating', rating);
  }

  * show(request, response) {
    const id = request.param('id');
    const userId = request.authUser.id;
    const rating = yield Rating.with('profile').where({ id, user_id: userId }).firstOrFail();

    response.jsonApi('Rating', rating);
  }

  * update(request, response) {
    const id = request.param('id');
    request.jsonApi.assertId(id);

    const input = request.jsonApi.getAttributesSnakeCase(attributes);
    const foreignKeys = {
      profile_id: request.input('data.relationships.profile.data.id'),
      user_id: request.authUser.id,
    };

    const userId = request.authUser.id;
    const rating = yield Rating.with('profile').where({ id, user_id: userId }).firstOrFail();
    yield rating.update(Object.assign({}, input, foreignKeys));

    response.jsonApi('Rating', rating);
  }

  * destroy(request, response) {
    const id = request.param('id');

    const userId = request.authUser.id;
    const rating = yield Rating.with('profile').where({ id, user_id: userId }).firstOrFail();
    yield rating.delete();

    response.status(204).send();
  }

}

module.exports = RatingController;

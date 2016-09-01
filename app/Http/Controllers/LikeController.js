'use strict';

const Like = use('App/Model/Like');
const attributes = ['like'];

class LikeController {

  * index(request, response) {
    const likes = yield request.authUser.likes().fetch();

    response.jsonApi('Like', likes);
  }

  * store(request, response) {
    const input = request.jsonApi.getAttributesSnakeCase(attributes);
    const foreignKeys = {
      profile_id: request.input('data.relationships.profile.data.id'),
      user_id: request.authUser.id,
    };
    const like = yield Like.findOrCreate(foreignKeys, foreignKeys);
    like.fill(Object.assign({}, input, foreignKeys));
    yield like.save();

    response.jsonApi('Like', like);
  }

  * show(request, response) {
    const id = request.param('id');
    const userId = request.authUser.id;
    const like = yield Like.with('profile').where({ id, user_id: userId }).firstOrFail();

    response.jsonApi('Like', like);
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
    const like = yield Like.with('profile').where({ id, user_id: userId }).firstOrFail();
    yield like.update(Object.assign({}, input, foreignKeys));

    response.jsonApi('Like', like);
  }

  * destroy(request, response) {
    const id = request.param('id');

    const userId = request.authUser.id;
    const like = yield Like.with('profile').where({ id, user_id: userId }).firstOrFail();
    yield like.delete();

    response.status(204).send();
  }

}

module.exports = LikeController;

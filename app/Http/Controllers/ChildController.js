'use strict';

const Child = use('App/Model/Child');
const attributes = ['name', 'age', 'care-details'];

class ChildController {

  * index(request, response) {
    const children = yield Child.with('profile').fetch();

    response.jsonApi('Child', children);
  }

  * store(request, response) {
    const input = request.jsonApi.getAttributesSnakeCase(attributes);
    const foreignKeys = {
      profile_id: profile,
    };
    const child = yield Child.create(Object.assign({}, input, foreignKeys));

    response.jsonApi('Child', child);
  }

  * show(request, response) {
    const id = request.param('id');
    const child = yield Child.with('profile').where({ id }).firstOrFail();

    response.jsonApi('Child', child);
  }

  * update(request, response) {
    const id = request.param('id');
    request.jsonApi.assertId(id);

    const input = request.jsonApi.getAttributesSnakeCase(attributes);
    const foreignKeys = {
      profile_id: profile,
    };

    const child = yield Child.with('profile').where({ id }).firstOrFail();
    yield child.update(Object.assign({}, input, foreignKeys));

    response.jsonApi('Child', child);
  }

  * destroy(request, response) {
    const id = request.param('id');

    const child = yield Child.query().where({ id }).firstOrFail();
    yield child.delete();

    response.status(204).send();
  }

}

module.exports = ChildController;

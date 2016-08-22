'use strict';

const Hash = use('Hash');
const User = use('App/Model/User');
const attributes = ['email', 'password'];

class UserController {

  * store(request, response) {
    const { email, password } = request.jsonApi.getAttributesSnakeCase(attributes);
    const user = yield User.create({
      email,
      password: yield Hash.make(password),
    });

    response.jsonApi('User', user);
  }

  * show(request, response) {
    const id = request.param('id');
    const user = yield User.with().where({ id }).firstOrFail();

    response.jsonApi('User', user);
  }

  * update(request, response) {
    const id = request.param('id');
    request.jsonApi.assertId(id);

    const input = request.jsonApi.getAttributesSnakeCase(attributes);

    const user = yield User.with().where({ id }).firstOrFail();
    yield user.update(input);

    response.jsonApi('User', user);
  }

}

module.exports = UserController;

'use strict';

const Hash = use('Hash');
const User = use('App/Model/User');
const attributes = ['email', 'password'];

class UserController {

  * index(request, response) {
    const users = yield User.with('profile').fetch();

    response.jsonApi('User', users);
  }

  * show(request, response) {
    const id = request.param('id');
    const user = yield User.with('profile').where({ id }).firstOrFail();

    console.log(user.toJSON());

    response.jsonApi('User', user);
  }

  * store(request, response) {
    const { email, password, account_type } = request.jsonApi.getAttributesSnakeCase(attributes);
    const user = yield User.create({
      account_type,
      email,
      password: yield Hash.make(password),
    });
    yield user.profile().create();

    response.jsonApi('User', user);
  }

  * current(request, response) {
    const user = request.authUser;
    yield user.related('profile').load();

    response.jsonApi('User', user);
  }

  * update(request, response) {
    const id = request.param('id');
    request.jsonApi.assertId(id);

    const input = request.jsonApi.getAttributesSnakeCase(attributes);

    const user = yield User.with().where({ id }).firstOrFail();
    user.fill(input);
    user.save();

    response.jsonApi('User', user);
  }

}

module.exports = UserController;

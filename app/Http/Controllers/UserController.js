'use strict';

const Hash = use('Hash');
const User = use('App/Model/User');
const attributes = ['email', 'password', 'account-type'];

class UserController {

  * index(request, response) {
    const typeFilter = request.input('filter.account-type');

    if (typeFilter) {
      const users = yield User.with('profile.children')
        .where('users.account_type', typeFilter)
        .fetch();

      response.jsonApi('User', users);
    }

    const users = yield User.with('profile.children').fetch();

    response.jsonApi('User', users);
  }

  * show(request, response) {
    const id = request.param('id');
    const user = yield User.with('profile.children').where({ id }).firstOrFail();

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
    yield user.related('profile.children').load();

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

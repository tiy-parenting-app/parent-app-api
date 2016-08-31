'use strict';
const snakeCaseKeys = require('snakecase-keys');
const Profile = use('App/Model/Profile');
const attributes = [
  'user-pic-url',
  'first-name',
  'last-name',
  'user-blurb',
  'location',
  'sitter-rate',
  'looking-for',
  'phone-number',
  'user-about',
  'number-is-secret',
  'child-is-unlocked',
];
const File = use('File');

class ProfileController {

  * index(request, response) {
    const typeFilter = request.input('filter.account-type');

    if (typeFilter) {
      const profiles = yield Profile.with('user', 'children')
        .join('users', 'users.id', 'profiles.user_id')
        .where('users.account_type', typeFilter)
        .select('profiles.*')
        .fetch();

      return response.jsonApi('Profile', profiles);
    }

    const profiles = yield Profile.with('user', 'children').fetch();

    response.jsonApi('Profile', profiles);
  }

  * store(request, response) {
    const input = request.jsonApi.getAttributesSnakeCase(attributes);
    const foreignKeys = {
      user_id: request.authUser.id,
    };
    const profile = yield Profile.create(Object.assign({}, input, foreignKeys));

    response.jsonApi('Profile', profile);
  }

  * show(request, response) {
    const id = request.param('id');
    const profile = yield Profile.with('user', 'children').where({ id }).firstOrFail();

    response.jsonApi('Profile', profile);
  }

  * update(request, response) {
    const id = request.param('id');
    request.jsonApi.assertId(id);

    const input = request.jsonApi.getAttributesSnakeCase(attributes);

    const profile = yield Profile.with('user', 'children').where({ id }).firstOrFail();
    profile.fill(input);
    yield profile.save();

    response.jsonApi('Profile', profile);
  }

  * updateUpload(request, response) {
    const id = request.param('id');
    const attrs = snakeCaseKeys(request.all());

    const profilePic = request.file('uploadFile', {
        maxSize: '10mb',
        allowedExtensions: ['jpg', 'png', 'jpeg']
    });

    yield File.upload(profilePic.clientName(), profilePic);

    attrs.user_pic_url = `/uploads/${profilePic.clientName()}`;

    const profile = yield Profile.with('user', 'children').where({ id }).firstOrFail();
    profile.fill(attrs);
    yield profile.save();

    response.jsonApi('Profile', profile);
  }

  * destroy(request, response) {
    const id = request.param('id');

    const profile = yield Profile.query().where({ id }).firstOrFail();
    yield profile.delete();

    response.status(204).send();
  }

}

module.exports = ProfileController;

const Profile = use('App/Model/Profile');
const File = use('File');

class ImageController {
  * show(request, response) {
    const id = request.param('id');
    const profile = yield Profile.with().where({
      id,
    }).firstOrFail();

    const stream = File.getStream(profile.user_pic_url);

    stream.pipe(response.response);
  }
}

module.exports = ImageController;

const JsonApiView = require('adonis-jsonapi/src/JsonApiView');

class Profile extends JsonApiView {
  get attributes() {
    return ['isParent', 'userPicUrl', 'firstName', 'lastName', 'userBlurb', 'location', 'rating', 'isLiked', 'sitterRate', 'lookingFor', 'phoneNumber', 'userAbout', 'numberIsSecret', 'isConnected', 'childIsUnlocked'];
  }
}

module.exports = Profile;

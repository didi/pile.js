'use strict';

var _uploadImage = require('./uploadImage');

var _uploadImage2 = _interopRequireDefault(_uploadImage);

var _uploadImageArray = require('./uploadImageArray');

var _uploadImageArray2 = _interopRequireDefault(_uploadImageArray);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = {
  UploadImage: _uploadImage2.default,
  UploadImageArray: _uploadImageArray2.default
};
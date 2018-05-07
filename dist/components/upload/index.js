'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _uploadImage = require('./uploadImage');

var _uploadImage2 = _interopRequireDefault(_uploadImage);

var _uploadImageArray = require('./uploadImageArray');

var _uploadImageArray2 = _interopRequireDefault(_uploadImageArray);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  UploadImage: _uploadImage2.default,
  UploadImageArray: _uploadImageArray2.default
};
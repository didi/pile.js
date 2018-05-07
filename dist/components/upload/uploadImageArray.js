'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

require('./lib/binaryFile');

require('./lib/exif');

require('./lib/canvasResize');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/* global Blob */
// 早期版本的浏览器需要用BlobBuilder来构造Blob，创建一个通用构造器来兼容早期版本
var BlobConstructor = function init() {
  try {
    return new Blob() && true;
  } catch (e) {
    return false;
  }
}() ? window.Blob : function initBlob(parts, opts) {
  var bb = new (window.BlobBuilder || window.WebKitBlobBuilder || window.MSBlobBuilder || window.MozBlobBuilder)();
  parts.forEach(function (p) {
    bb.append(p);
  });

  return bb.getBlob(opts ? opts.type : undefined);
};

// dataURL转换为Blob对象
var dataURLtoBlob = function dataURLtoBlob(base64, type) {
  var data = window.atob(base64);

  var ia = new Uint8Array(data.length);
  for (var i = 0; i < data.length; i++) {
    ia[i] = data.charCodeAt(i);
  }
  return new BlobConstructor([ia], { type: 'image/' + type });
};

var propTypes = {
  id: _react2.default.PropTypes.string,
  accept: _react2.default.PropTypes.string, // 上传文件格式
  imageArray: _react2.default.PropTypes.array, // 图片默认展示
  imageMaxLen: _react2.default.PropTypes.number, // 图片上传最大个数
  imageMaxWidth: _react2.default.PropTypes.number, // 图片展示最大宽度
  imageQuality: _react2.default.PropTypes.number, // 压缩图片的质量
  onLoadSuccess: _react2.default.PropTypes.func, // 成功上传时回调
  onLoadError: _react2.default.PropTypes.func // 上传失败回调
};

var defaultProps = {
  id: 'upload-multiple',
  imgURI: null,
  accept: 'image/*',
  imageQuality: 0.8,
  imageMaxWidth: 600,
  imageArray: [],
  onLoadSuccess: null,
  onLoadError: null,
  imageMaxLen: 5
};

var UploadImageArray = function (_Component) {
  _inherits(UploadImageArray, _Component);

  function UploadImageArray(props) {
    _classCallCheck(this, UploadImageArray);

    var _this = _possibleConstructorReturn(this, (UploadImageArray.__proto__ || Object.getPrototypeOf(UploadImageArray)).call(this, props));

    _this.state = {
      imageBase64: null,
      imageArray: props.imageArray || []
    };
    _this.addImage = _this.addImage.bind(_this);
    return _this;
  }

  _createClass(UploadImageArray, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (nextProps.imageArray.toString() !== this.props.imageArray.toString()) {
        this.setState({
          imageArray: Array.from(nextProps.imageArray)
        });
      }
    }
  }, {
    key: 'getBlob',
    value: function getBlob(outputImageType) {
      var imageBase64 = this.state.imageBase64;

      return dataURLtoBlob(imageBase64, outputImageType);
    }
  }, {
    key: 'outputImageArray',
    value: function outputImageArray(imageArray) {
      var onLoadSuccess = this.props.onLoadSuccess;

      onLoadSuccess && onLoadSuccess(imageArray);
    }
  }, {
    key: 'addImage',
    value: function addImage(e) {
      e.stopPropagation();
      var self = this;
      var file = e.target.files[0];
      var _props = this.props,
          imageMaxWidth = _props.imageMaxWidth,
          imageQuality = _props.imageQuality,
          onLoadError = _props.onLoadError;
      var imageArray = this.state.imageArray;

      window.canvasResize(file, {
        width: imageMaxWidth,
        quality: imageQuality,
        callback: function callback(dataUri, width, height, attributes) {
          var b64Str = dataUri.substr(dataUri.indexOf('base64') + 7);
          var imageBlob = dataURLtoBlob(b64Str, attributes.compressedFileType);
          imageArray.push({
            blob: imageBlob,
            blobSize: imageBlob.size,
            imgURI: dataUri,
            imageBase64: b64Str,
            originalWidth: attributes.originalWidth,
            originalHeight: attributes.originalHeight,
            originalBase64Length: attributes.originalBase64Length,
            compressedWidth: width,
            compressedHeight: height,
            compressedBase64Length: attributes.compressedBase64Length,
            orientation: attributes.orientation,
            fileType: attributes.fileType,
            compressedFileType: attributes.compressedFileType,
            file: file
          });
          self.setState({
            imageArray: imageArray
          });
          setTimeout(function () {
            self.outputImageArray(imageArray);
          }, 0);
        },
        onerror: function onerror() {
          onLoadError && onLoadError();
        }
      });
    }
  }, {
    key: 'deleteImageArray',
    value: function deleteImageArray(n) {
      var imageArray = this.state.imageArray;

      var newArr = imageArray;
      newArr.splice(n, 1);
      this.setState({
        imageArray: newArr
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props2 = this.props,
          className = _props2.className,
          accept = _props2.accept,
          imageMaxLen = _props2.imageMaxLen;
      var imageArray = this.state.imageArray;

      var cls = (0, _classnames2.default)(_defineProperty({
        'pile-upload-wrap': true
      }, className, className));
      return _react2.default.createElement(
        'div',
        { className: cls },
        imageArray.map(function (item, index) {
          return _react2.default.createElement(
            'div',
            { key: index, className: (0, _classnames2.default)('pile-uploadImage-wrapper', className) },
            _react2.default.createElement('img', { className: 'pile-uploadImage-preview', src: item.imgURI, alt: '' }),
            _react2.default.createElement(
              'div',
              { className: 'pile-uploadImage-plus-wrapper' },
              _react2.default.createElement('span', { className: 'pile-uploadImage-delete icon-pile-error', onClick: function onClick() {
                  _this2.deleteImageArray(index);
                } })
            )
          );
        }),
        imageMaxLen > imageArray.length && _react2.default.createElement(
          'div',
          { className: 'pile-uploadImage-add' },
          _react2.default.createElement(
            'div',
            { className: 'pile-uploadImage-plus-wrapper' },
            _react2.default.createElement('span', { className: 'car-icons-add pile-uploadImage-plus' }),
            _react2.default.createElement('p', { className: 'pile-uploadImage-desc' })
          ),
          _react2.default.createElement(
            'label',
            { className: 'pile-uploadImage-label', htmlFor: this.props.id },
            _react2.default.createElement('input', { id: this.props.id, className: 'pile-uploadImage-input width-100', type: 'file', onChange: this.addImage.bind(this), accept: accept, multiple: true })
          )
        )
      );
    }
  }]);

  return UploadImageArray;
}(_react.Component);

UploadImageArray.propTypes = propTypes;
UploadImageArray.defaultProps = defaultProps;

exports.default = UploadImageArray;
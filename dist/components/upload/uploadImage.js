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
  plusDesc: _react2.default.PropTypes.node, // 图片上传文字提示
  imgURI: _react2.default.PropTypes.string, // 默认展示图
  accept: _react2.default.PropTypes.string, // 上传文件格式
  imageQuality: _react2.default.PropTypes.number, // 压缩图片的质量 0.1 - 1
  onLoadSuccess: _react2.default.PropTypes.func, // 成功上传时回调
  onLoadError: _react2.default.PropTypes.func, // 上传失败回调
  pictureView: _react2.default.PropTypes.bool, // 是否开启按钮态上传
  id: _react2.default.PropTypes.string
};

var defaultProps = {
  imgURI: null,
  plusDesc: '',
  accept: 'image/*',
  imageQuality: 0.8,
  onLoadSuccess: null,
  onLoadError: null,
  pictureView: true,
  id: 'upload-input'
};

var UploadImage = function (_Component) {
  _inherits(UploadImage, _Component);

  function UploadImage(props) {
    _classCallCheck(this, UploadImage);

    var _this = _possibleConstructorReturn(this, (UploadImage.__proto__ || Object.getPrototypeOf(UploadImage)).call(this, props));

    _this.state = {
      imgURI: props.imgURI || '',
      imageBase64: null,
      originalWidth: 0,
      originalHeight: 0,
      originalBase64Length: 0,
      compressedWidth: 0,
      compressedHeight: 0,
      compressedBase64Length: 0,
      orientation: 1,
      fileType: '',
      compressedFileType: '',
      isShowPlus: !props.imgURI
    };
    _this.onChange = _this.onChange.bind(_this);
    return _this;
  }

  _createClass(UploadImage, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (nextProps.imgURI !== this.props.imgURI) {
        this.setState({ imgURI: nextProps.imgURI, isShowPlus: false });
      }
    }
  }, {
    key: 'onChange',
    value: function onChange(e) {
      var file = e.target.files[0];
      var _props = this.props,
          imageMaxWidth = _props.imageMaxWidth,
          imageQuality = _props.imageQuality,
          onLoadError = _props.onLoadError;

      var self = this;
      window.canvasResize(file, {
        width: imageMaxWidth,
        quality: imageQuality,
        callback: function callback(dataUri, width, height, attributes) {
          var b64Str = dataUri.substr(dataUri.indexOf('base64') + 7);
          self.setState({
            isShowPlus: false,
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
          setTimeout(function () {
            self.outputImage();
          }, 0);
        },
        onerror: function onerror() {
          onLoadError && onLoadError();
        }
      });
    }
  }, {
    key: 'getBlob',
    value: function getBlob(outputImageType) {
      var imageBase64 = this.state.imageBase64;

      return dataURLtoBlob(imageBase64, outputImageType);
    }
  }, {
    key: 'outputImage',
    value: function outputImage() {
      var onLoadSuccess = this.props.onLoadSuccess;
      var _state = this.state,
          originalWidth = _state.originalWidth,
          file = _state.file,
          originalHeight = _state.originalHeight,
          originalBase64Length = _state.originalBase64Length,
          compressedWidth = _state.compressedWidth,
          compressedHeight = _state.compressedHeight,
          compressedBase64Length = _state.compressedBase64Length,
          orientation = _state.orientation,
          fileType = _state.fileType,
          compressedFileType = _state.compressedFileType,
          imgURI = _state.imgURI,
          imageBase64 = _state.imageBase64;

      var imageBlob = this.getBlob(compressedFileType);
      var myfile = {
        blob: {
          getblob: imageBlob,
          blobSize: imageBlob.size,
          originalWidth: originalWidth,
          originalHeight: originalHeight,
          originalBase64Length: originalBase64Length,
          compressedWidth: compressedWidth,
          compressedHeight: compressedHeight,
          compressedBase64Length: compressedBase64Length,
          orientation: orientation,
          fileType: fileType,
          imgURI: imgURI,
          imageBase64: imageBase64,
          compressedFileType: compressedFileType
        },
        file: file
      };
      onLoadSuccess && onLoadSuccess(myfile);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props2 = this.props,
          plusDesc = _props2.plusDesc,
          pictureView = _props2.pictureView,
          className = _props2.className,
          accept = _props2.accept;
      var _state2 = this.state,
          imgURI = _state2.imgURI,
          isShowPlus = _state2.isShowPlus;

      var cls = (0, _classnames2.default)(_defineProperty({
        'ui-uploadImage-wrapper': true
      }, className, className));
      return _react2.default.createElement(
        'div',
        { className: cls },
        pictureView && _react2.default.createElement('img', { className: 'ui-uploadImage-preview', alt: '', src: imgURI }),
        _react2.default.createElement(
          'div',
          { className: (0, _classnames2.default)('ui-uploadImage-plus-wrapper', isShowPlus ? '' : 'hide') },
          _react2.default.createElement('span', { className: 'car-icons-add ui-uploadImage-plus' }),
          _react2.default.createElement(
            'p',
            { className: 'ui-uploadImage-desc' },
            plusDesc
          )
        ),
        _react2.default.createElement(
          'label',
          { htmlFor: this.props.id, className: (0, _classnames2.default)('ui-uploadImage-label', !imgURI || !pictureView ? 'ui-uploadImage-add-show' : '') },
          _react2.default.createElement('input', { id: this.props.id, className: 'ui-uploadImage-input', type: 'file', onChange: this.onChange, accept: accept, ref: function ref(obj) {
              _this2.UploadInput = obj;
            } })
        )
      );
    }
  }]);

  return UploadImage;
}(_react.Component);

UploadImage.propTypes = propTypes;
UploadImage.defaultProps = defaultProps;

exports.default = UploadImage;
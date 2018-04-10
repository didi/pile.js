import React, { Component } from 'react';
import classNames from 'classnames';
import './lib/binaryFile';
import './lib/exif';
import './lib/canvasResize';

/* global Blob */
// 早期版本的浏览器需要用BlobBuilder来构造Blob，创建一个通用构造器来兼容早期版本
const BlobConstructor = ((function init() {
  try {
    return new Blob() && true;
  } catch (e) {
    return false;
  }
})()) ? window.Blob : function initBlob(parts, opts) {
    const bb = new (
      window.BlobBuilder ||
            window.WebKitBlobBuilder ||
            window.MSBlobBuilder ||
            window.MozBlobBuilder
    )();
    parts.forEach((p) => {
      bb.append(p);
    });
    return bb.getBlob(opts ? opts.type : undefined);
  };

// dataURL转换为Blob对象
const dataURLtoBlob = function dataURLtoBlob(base64, type) {
  const data = window.atob(base64);
  const ia = new Uint8Array(data.length);
  for (let i = 0; i < data.length; i++) {
    ia[i] = data.charCodeAt(i);
  }
  return new BlobConstructor([ia], { type: `image/${type}` });
};

const propTypes = {
  plusDesc: React.PropTypes.node, // 图片上传文字提示
  imgURI: React.PropTypes.string, // 默认展示图
  accept: React.PropTypes.string, // 上传文件格式
  imageQuality: React.PropTypes.number, // 压缩图片的质量 0.1 - 1
  onLoadSuccess: React.PropTypes.func, // 成功上传时回调
  onLoadError: React.PropTypes.func, // 上传失败回调
  pictureView: React.PropTypes.bool, // 是否开启按钮态上传
  id: React.PropTypes.string,
};

const defaultProps = {
  imgURI: null,
  plusDesc: '',
  accept: 'image/*',
  imageQuality: 0.8,
  onLoadSuccess: null,
  onLoadError: null,
  pictureView: true,
  id: 'upload-input',
};
class UploadImage extends Component {
  constructor(props) {
    super(props);

    this.state = {
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
      isShowPlus: !props.imgURI,
    };
    this.onChange = this.onChange.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.imgURI !== this.props.imgURI) {
      this.setState({ imgURI: nextProps.imgURI, isShowPlus: false });
    }
  }
  onChange(e) {
    const file = e.target.files[0];
    const { imageMaxWidth, imageQuality, onLoadError } = this.props;
    const self = this;
    window.canvasResize(file, {
      width: imageMaxWidth,
      quality: imageQuality,
      callback(dataUri, width, height, attributes) {
        const b64Str = dataUri.substr(dataUri.indexOf('base64') + 7);
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
          file,
        });
        setTimeout(() => {
          self.outputImage();
        }, 0);
      },
      onerror() {
        onLoadError && onLoadError();
      },
    });
  }
  getBlob(outputImageType) {
    const { imageBase64 } = this.state;
    return dataURLtoBlob(imageBase64, outputImageType);
  }
  outputImage() {
    const { onLoadSuccess } = this.props;
    const {
      originalWidth, file, originalHeight, originalBase64Length, compressedWidth,
      compressedHeight, compressedBase64Length, orientation,
      fileType, compressedFileType, imgURI, imageBase64,
    } = this.state;
    const imageBlob = this.getBlob(compressedFileType);
    const myfile = {
      blob: {
        getblob: imageBlob,
        blobSize: imageBlob.size,
        originalWidth,
        originalHeight,
        originalBase64Length,
        compressedWidth,
        compressedHeight,
        compressedBase64Length,
        orientation,
        fileType,
        imgURI,
        imageBase64,
        compressedFileType,
      },
      file,
    };
    onLoadSuccess && onLoadSuccess(myfile);
  }
  render() {
    const {
      plusDesc, pictureView, className, accept,
    } = this.props;
    const { imgURI, isShowPlus } = this.state;
    const cls = classNames({
      'ui-uploadImage-wrapper': true,
      [className]: className,
    });
    return (
      <div className={cls}>
        {pictureView && <img className="ui-uploadImage-preview" alt="" src={imgURI} />}
        <div className={classNames('ui-uploadImage-plus-wrapper', isShowPlus ? '' : 'hide')} >
          <span className="car-icons-add ui-uploadImage-plus" />
          <p className="ui-uploadImage-desc">{plusDesc}</p>
        </div>
        <label htmlFor={this.props.id} className={classNames('ui-uploadImage-label', !imgURI || !pictureView ? 'ui-uploadImage-add-show' : '')} >
          <input id={this.props.id} className="ui-uploadImage-input" type="file" onChange={this.onChange} accept={accept} ref={(obj) => { this.UploadInput = obj; }} />
        </label>
      </div>
    );
  }
}
UploadImage.propTypes = propTypes;
UploadImage.defaultProps = defaultProps;

export default UploadImage;

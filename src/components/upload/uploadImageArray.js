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
  id: React.PropTypes.string,
  accept: React.PropTypes.string, // 上传文件格式
  imageArray: React.PropTypes.array, // 图片默认展示
  imageMaxLen: React.PropTypes.number, // 图片上传最大个数
  imageMaxWidth: React.PropTypes.number, // 图片展示最大宽度
  imageQuality: React.PropTypes.number, // 压缩图片的质量
  onLoadSuccess: React.PropTypes.func, // 成功上传时回调
  onLoadError: React.PropTypes.func, // 上传失败回调
};

const defaultProps = {
  id: 'upload-multiple',
  imgURI: null,
  accept: 'image/*',
  imageQuality: 0.8,
  imageMaxWidth: 600,
  imageArray: [],
  onLoadSuccess: null,
  onLoadError: null,
  imageMaxLen: 5,
};
class UploadImageArray extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imageBase64: null,
      imageArray: props.imageArray || [],
    };
    this.addImage = this.addImage.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.imageArray.toString() !== this.props.imageArray.toString()) {
      this.setState({
        imageArray: Array.from(nextProps.imageArray),
      });
    }
  }

  getBlob(outputImageType) {
    const { imageBase64 } = this.state;
    return dataURLtoBlob(imageBase64, outputImageType);
  }

  outputImageArray(imageArray) {
    const { onLoadSuccess } = this.props;
    onLoadSuccess && onLoadSuccess(imageArray);
  }

  addImage(e) {
    e.stopPropagation();
    const self = this;
    const file = e.target.files[0];
    const { imageMaxWidth, imageQuality, onLoadError } = this.props;
    const { imageArray } = this.state;
    window.canvasResize(file, {
      width: imageMaxWidth,
      quality: imageQuality,
      callback(dataUri, width, height, attributes) {
        const b64Str = dataUri.substr(dataUri.indexOf('base64') + 7);
        const imageBlob = dataURLtoBlob(b64Str, attributes.compressedFileType);
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
          file,
        });
        self.setState({
          imageArray,
        });
        setTimeout(() => {
          self.outputImageArray(imageArray);
        }, 0);
      },
      onerror() {
        onLoadError && onLoadError();
      },
    });
  }

  deleteImageArray(n) {
    const { imageArray } = this.state;
    const newArr = imageArray;
    newArr.splice(n, 1);
    this.setState({
      imageArray: newArr,
    });
  }

  render() {
    const {
      className, accept, imageMaxLen,
    } = this.props;
    const { imageArray } = this.state;
    const cls = classNames({
      'pile-upload-wrap': true,
      [className]: className,
    });
    return (
      <div className={cls}>
        {imageArray.map((item, index) => (
          <div key={index} className={classNames('pile-uploadImage-wrapper', className)}>
            <img className="pile-uploadImage-preview" src={item.imgURI} alt="" />
            <div className="pile-uploadImage-plus-wrapper">
              <span className="pile-uploadImage-delete icon-pile-error" onClick={() => { this.deleteImageArray(index); }} />
            </div>
          </div>
        ))}

        {imageMaxLen > imageArray.length && (
          <div className="pile-uploadImage-add">
            <div className="pile-uploadImage-plus-wrapper" >
              <span className="car-icons-add pile-uploadImage-plus" />
              <p className="pile-uploadImage-desc" />
            </div>
            <label className="pile-uploadImage-label" htmlFor={this.props.id}>
              <input id={this.props.id} className="pile-uploadImage-input width-100" type="file" onChange={this.addImage.bind(this)} accept={accept} multiple />
            </label>
          </div>
        )}
      </div>
    );
  }
}

UploadImageArray.propTypes = propTypes;
UploadImageArray.defaultProps = defaultProps;

export default UploadImageArray;

import React, { Component } from 'react';
import { Link } from 'react-router'
import Pile from './index';

const { Upload } = Pile,
  { UploadImage, UploadImageArray } = Upload;
const _Upload = React.createClass({
  getInitialState() {
    return {
      pic: '',
    };
  },
  render() {
    return (
      <div className="example-wrap">
        <div className="example-back"><Link to="/"><span className="icon-pic-home" /></Link></div>
        <div className="libs-intr" style={{ minHeight: `${document.body.clientHeight - 94}px` }}>
          <h2 className="page-title"><b>Upload</b><span>上传组件</span></h2>
          <div className="demo-show">
            <dl className="dl-list">
              <dt>单张图片上传</dt>
              <dd>
                <UploadImage onLoadSuccess={(o) => { console.log(o); }} />
              </dd>
              <dt>多张图片上传（默认5张图片，数量可自定义）
              </dt>
              <dd>
                <UploadImageArray imageArray={[{ imgURI: 'http://pic34.photophoto.cn/20150119/0037037559894573_b.jpg' }]} onLoadSuccess={(o) => { console.log(o); }} />
              </dd>
              <dt>单张图片上传(按钮态)</dt>
              <dd className="upload-pic-show">{this.state.pic && <img className="ui-uploadImage-preview" src={this.state.pic} />}</dd>
              <dd>
                <UploadImage className="ui-uploadImage-btn" onLoadSuccess={(o) => { this.setState({ pic: o.blob.imgURI }); }} pictureView={false} plusDesc="上传按钮" />
              </dd>
            </dl>
          </div>
        </div>
        <div className="footer-name">
          <span className="footer-name-pic" />
        </div>
      </div>
    );
  },
});
module.exports = _Upload;

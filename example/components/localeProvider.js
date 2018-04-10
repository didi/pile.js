import React, { Component } from 'react';
import JIMU from './index';
import enUS from '../../src/components/localeprovider/en_US';
import zhCN from '../../src/components/localeprovider/zh-CN';

const { Search, LocaleProvider } = JIMU;

const localeData = {
  placeholder: 'hahahah123',
};
const _CarRecord = () => (
  <div className="example-wrap">
    <div className="example-back"><a href="http://es-static.xiaojukeji.com/static/web/activity/jimudemo3/index.html#/?_k=qn72wa"><span className="icon-pic-home" /></a></div>
    <div className="libs-intr" style={{ minHeight: `${document.body.clientHeight - 94}px` }}>
      <h2 className="page-title"><b>localeProvider</b><span>多语言</span></h2>
      <div className="demo-show">
        <h3 className="demo-title mt-40" style={{ marginBottom: '15px' }}>英文版</h3>
        <LocaleProvider locale={enUS}>
          <Search
            // placeholder = "hahahah"
            // locale = {localeData}
            onChangeHandle={function (text) { console.log(`change:${text}`); }}
            onClearHandle={function () { console.log('clearHandle'); }}
            onFocusHandle={function () { console.log('onFocusHandle'); }}
            onBlurHandle={function (text) { console.log('onBlurHandle'); }}
          />
        </LocaleProvider>

        <h3 className="demo-title mt-40" style={{ marginBottom: '15px' }}>中文版</h3>
        <LocaleProvider locale={zhCN}>

          <Search
            onChangeHandle={function (text) { console.log(`change:${text}`); }}
            onClearHandle={function () { console.log('clearHandle'); }}
            onFocusHandle={function () { console.log('onFocusHandle'); }}
            onBlurHandle={function (text) { console.log('onBlurHandle'); }}
          />
        </LocaleProvider>

        <h3 className="demo-title mt-40" style={{ marginBottom: '15px' }}>参数自定义</h3>
        <LocaleProvider locale={zhCN}>
          <Search
            placeholder="修改props值可自定义"
            onChangeHandle={function (text) { console.log(`change:${text}`); }}
            onClearHandle={function () { console.log('clearHandle'); }}
            onFocusHandle={function () { console.log('onFocusHandle'); }}
            onBlurHandle={function (text) { console.log('onBlurHandle'); }}
          />
        </LocaleProvider>
      </div>
    </div>
    <div className="footer-name">
      <span className="footer-name-pic" />
    </div>
  </div>
);
module.exports = _CarRecord;

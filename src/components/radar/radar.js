/* yanshenshen 2017.5.9 */
import React from 'react';
import PropTypes from 'prop-types';
// 时间选择组件

const propTypes = {
  width: PropTypes.number,
  contentText: PropTypes.string,
  contentBg: PropTypes.string,
  contentWidth: PropTypes.number,
  shadowWidth: PropTypes.number,
  shadowBgColor: PropTypes.string,
  contentFontSize: PropTypes.string,
  contentColor: PropTypes.string,
  lineBorderColor: PropTypes.string,
  ladarStartBgColor: PropTypes.string,
  ladarMidBgColor: PropTypes.string,
  ladarEndBgColor: PropTypes.string,
};

const defaultProps = {
  width: 300, //
  contentText: '呼叫中',
  contentBg: '#1E96FA',
  contentWidth: 60,
  shadowWidth: 100,
  shadowBgColor: '#1E96FA',
  contentFontSize: '1.2rem',
  contentColor: '#fff',
  lineBorderColor: '#cee4f7',
  ladarStartBgColor: 'rgba(30, 150, 250, 0.3)',
  ladarMidBgColor: 'rgba(30, 150, 250, 0.1)',
  ladarEndBgColor: 'rgba(30, 150, 250, 0)',
};
const Radar = (props) => {
  const {
    contentText, width, contentBg, contentWidth, contentFontSize, contentColor, lineBorderColor,
    shadowWidth, shadowBgColor, ladarStartBgColor, ladarEndBgColor, ladarMidBgColor, ...others
  } = props;
  return (
    <div className="radar-layout" style={{ width: `${width}px`, height: `${width}px` }} {...others}>
      <div className="out-line" style={{ width: `${width * 0.9}px`, height: `${width * 0.9}px` }} />
      <div className="radar-bd" style={{ width: `${width * 0.8}px`, height: `${width * 0.8}px` }}>
        <div
          className="radar-line line-01"
          style={{
width: `${width * 0.8}px`, height: `${width * 0.8}px`, borderColor: `${lineBorderColor}`, opacity: '1',
}}
        />
        <div
          className="radar-line line-02"
          style={{
 width: `${width * 0.6}px`, height: `${width * 0.6}px`, borderColor: `${lineBorderColor}`, opacity: '.55',
}}
        />
        <div
          className="radar-line line-03"
          style={{
 width: `${width * 0.4}px`, height: `${width * 0.4}px`, borderColor: `${lineBorderColor}`, opacity: '.4',
}}
        />
        <div
          className="radar-content"
          style={{
 width: `${contentWidth}px`, height: `${contentWidth}px`, background: `${contentBg}`, color: `${contentColor}`, fontSize: `${contentFontSize}`, lineHeight: `${contentWidth}px`,
}}
        >{contentText}
        </div>
        <div className="radar-dian-layout" style={{ width: `${width * 0.8}px`, height: `${width * 0.8}px` }}>
          <b className="radar-dian radar-dian-01" />
          <b className="radar-dian radar-dian-02" />
          <b className="radar-dian radar-dian-03" />
          <b className="radar-dian radar-dian-04" />
          <b className="radar-dian radar-dian-05" />
          <b className="radar-dian radar-dian-06" />
          <b className="radar-dian radar-dian-07" />
          <b className="radar-dian radar-dian-08" />
        </div>
        <div className="radar-line" />
        <div
          className="radar-shadow"
          style={{
width: `${shadowWidth}px`, height: `${shadowWidth}px`, background: `${shadowBgColor}`, margin: ` -${shadowWidth / 2}px 0 0 -${shadowWidth / 2}px`,
}}
        />
        <div className="radar-sector radar-sector-1" style={{ width: `${width * 0.8}px`, height: `${width * 0.8}px`, margin: `-${width * 0.4}px 0 0 -${width * 0.4}px` }}>
          <div className="radar-sector-bg" style={{ clip: `rect(${width * 0.4}px,${width * 0.4}px,${width * 0.8}px,0px)`, backgroundImage: `linear-gradient(to right, ${ladarStartBgColor} 0%, ${ladarMidBgColor} 20%, ${ladarEndBgColor} 100%)` }}><b className="radar-sector-line1" style={{ background: `${contentBg}` }} /></div>
        </div>
        <div className="radar-sector radar-sector-2" style={{ width: `${width * 0.8}px`, height: `${width * 0.8}px`, margin: `-${width * 0.4}px 0 0 -${width * 0.4}px` }}>
          <div className="radar-sector-bg" style={{ clip: `rect(${width * 0.4}px,${width * 0.4}px,${width * 0.8}px,0px)`, backgroundImage: `linear-gradient(to right, ${ladarStartBgColor} 0%, ${ladarMidBgColor} 20%, ${ladarEndBgColor} 100%)` }}><b className="radar-sector-line2" style={{ background: `${contentBg}` }} /></div>
        </div>
        <div className="" />
      </div>
    </div>
  );
};
Radar.propTypes = propTypes;
Radar.defaultProps = defaultProps;

export default Radar;

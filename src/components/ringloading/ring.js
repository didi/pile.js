/**
 * Created by yanshenshen on 17/04/10.
 */

import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

class Ringloading extends React.Component {
  static propTypes = {
    text: PropTypes.string,
    width: PropTypes.number,
    border: PropTypes.number,
    borderColor: PropTypes.string,
    contentColor: PropTypes.string,
    ballBgColor: PropTypes.string,
    textSize: PropTypes.string,
    contentBgColor: PropTypes.string,
    bottomRingBgColor: PropTypes.string,
    ballShow: PropTypes.bool,
    ringTimer: PropTypes.number,
  }

  static defaultProps = {
    text: 'loading...', // 圈内文字展示
    width: 200, // 圆直径
    border: 2, // 边框宽度
    borderColor: '#4a4c5b', // 边框颜色
    ballBgColor: '#ff8741', // 小球颜色
    contentColor: '#4a4c5b', // 内容颜色
    contentBgColor: '#fff', // 内容背景颜色
    textSize: '14px', // 字体大小
    ballShow: false,
    bottomRingBgColor: '',
    ringTimer: 2000,
  }

  componentDidMount() {}
  render() {
    const {
      width, border, borderColor, contentColor, textSize, contentBgColor,
      ringTimer, ballShow, bottomRingBgColor, ballBgColor, className, ...others
    } = this.props;
    const cls = classNames({
      'ring-loading': true,
      [className]: className,
    });

    const ringWidth = width + (border * 2);

    return (
      <div className={cls} {...others} style={{ width: `${ringWidth}px`, height: `${ringWidth}px` }}>
        <div className="bottom-ring-bg" style={{ width: `${ringWidth}px`, height: `${ringWidth}px`, background: `${bottomRingBgColor}` }} />
        <div className="ring-left" style={{ width: `${ringWidth / 2}px`, height: `${ringWidth}px` }}>
          <div
            className="left-shadow"
            style={{
 width: `${ringWidth / 2}px`, height: `${ringWidth}px`, borderRadius: `${ringWidth}px 0  0 ${ringWidth}px`, background: `${borderColor}`, WebkitAnimationDuration: `${ringTimer / 1000}s`,
}}
          />
        </div>
        <div className="ring-right" style={{ width: `${ringWidth / 2}px`, height: `${ringWidth}px` }}>
          <div
            className="right-shadow"
            style={{
 width: `${ringWidth / 2}px`, height: `${ringWidth}px`, borderRadius: `0 ${ringWidth}px ${ringWidth}px 0`, background: `${borderColor}`, WebkitAnimationDuration: `${ringTimer / 1000}s`,
}}
          />
        </div>
        <div
          className="progress"
          style={{
 width: `${width}px`, height: `${width}px`, lineHeight: `${width}px`, color: `${contentColor}`, fontSize: `${textSize}`, backgroundColor: `${contentBgColor}`,
}}
        >
          {this.props.text}
        </div>
        {ballShow && <div className="ring-ball-circular" style={{ WebkitAnimationDuration: `${ringTimer / 1000 / 2}s` }}><span className="ring-ball" style={{ background: `${ballBgColor}` }} /></div>}
      </div>
    );
  }
}

export default Ringloading;

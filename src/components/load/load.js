import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Mask from '../mask';


const loadcargit = require('../../styles/image/loadingcar.gif');

/* eslint-disable react/no-unused-prop-types, no-underscore-dangle */
class Load extends React.Component {
  /*
    Load 组件
      show: 是否展示组件
      loadType (string)
        carFace : 车子正面动图
        carSide : 车子侧面动图
        carRun : 车子跑动动图
        loadEffect : loading 菊花动图
        loadLogo : 嘀嘀出行logo转动加载
      className (string) 自定义class名称
      loadSize (string) loadicon 尺寸
      timeOut: 超时时长
  */
  static propTypes = {
    show: PropTypes.bool,
    loadType: PropTypes.string,
    className: PropTypes.string,
    loadSize: PropTypes.string,
    timeOut: PropTypes.number,
    timeOutBack: PropTypes.func,
    showTypeTips: PropTypes.bool,
  }

  static defaultProps = {
    show: true,
    loadType: 'loadLogo', // 展示方式 string ( carFace、 carSide、 carRun、loadEffect 、loadLogo、carRunNew、loading 、 ballScale)
    className: '', // 自定义class名称 string
    loadSize: 'small', // loadicon 尺寸 string (small、big)
    timeOut: null,
    timeOutBack: null,
    showTypeTips: true,
    text: '加载中...',
  }

  constructor(props) {
    super(props);
    this.state = this.props;
    this._timeOut = this._timeOut.bind(this);
  }

  componentDidMount() {
    this._timeOut();
  }

  componentWillReceiveProps(nextProps) {
    this.setState(nextProps);
    this._timeOut();
  }

  componentWillUnmount() {
    this.timer && clearTimeout(this.timer);
  }

  _timeOut() {
    const self = this;
    const { timeOut } = this.state;

    if (timeOut) {
      self.timer = setTimeout(() => {
        self.setState({
          show: false,
        });
        self.props.timeOutBack && self.props.timeOutBack();
      }, timeOut);
    }
  }

  _loadIcon() {
    const { loadType, text } = this.props;
    switch (loadType) {
      case 'carFace':
        return (
          <div className="load-layer car-face">
            <div className="moveBox" />
          </div>
        );

      case 'carRunNew':
        return (
          <div className="load-layer car-run-new">
            <div className="moveBox" />
          </div>
        );

      case 'carSide':
        return (
          <div className="load-layer car-side">
            <div className="moveBox" />
          </div>
        );
      case 'carRun':
        return (
          <div className="load-layer car-run">
            <img src={loadcargit} alt="loading" />
          </div>
        );

      case 'loadEffect':
        return (
          <div className="load-layer load-effect">
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
          </div>
        );
      case 'loadLogo':
      case 'loading':
        return (
          <div className="load-layer pile-load-loading">
            <div className="load-spinner">
              <div />
              <div />
              <div />
              <div />
              <div />
              <div />
              <div />
              <div />
              <div />
              <div />
              <div />
              <div />
            </div>
            <p className="load-text">
              {text}
            </p>
          </div>
        );

      case 'ballScale':
        return (
          <div className="load-layer pile-load-ball">
            <div className="load-balls">
              <span />
              <span />
              <span />
            </div>
          </div>
        );

      default:
        return (
          <div className="load-layer pile-load-loading">
            <div className="load-spinner">
              <div />
              <div />
              <div />
              <div />
              <div />
              <div />
              <div />
              <div />
              <div />
              <div />
              <div />
              <div />
            </div>
            <p className="load-text">
              {text}
            </p>
          </div>
        );
    }
  }

  render() {
    const { className, loadSize, showTypeTips } = this.props;
    const { show } = this.state;
    const cls = classNames({
      'mask-layout': showTypeTips,
      'dis-mask-layout': !showTypeTips,
    });

    const loadClass = loadSize === 'small' ? 'size-small' : 'size-big';
    const _iconHtml = this._loadIcon();
    return (
      <div className={className} style={{ display: show ? 'block' : 'none' }}>
        {showTypeTips ? <Mask /> : null}
        <div className={cls}>
          <div className={loadClass}>
            {_iconHtml}
          </div>
        </div>
      </div>
    );
  }
}

export default Load;

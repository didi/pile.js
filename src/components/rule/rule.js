/**
 * Created by yanshenshen on 17/06/19.
 */

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

class Rule extends React.Component {
  /* eslint-disable react/no-unused-prop-types */
  static propTypes = {
    list: PropTypes.array,
    back: PropTypes.func,
    endback: PropTypes.func,
    defaultValue: PropTypes.number,
    unitAmount: PropTypes.number,
    unitWidth: PropTypes.number,
    touchMin: PropTypes.number,
    touchMax: PropTypes.number,
    min: PropTypes.number,
    max: PropTypes.number,
    fixed: PropTypes.number,
    reapanint: PropTypes.bool,
  };
  /* eslint-enable react/no-unused-prop-types */

  static defaultProps = {
    list: [{ name: '80', value: 80 }, { name: '90', value: 90 }, { name: '100', value: 100 }, { name: '110', value: 110 }, { name: '120', value: 120 }, { name: '130', value: 130 }, { name: '140', value: 140 }, { name: '150', value: 150 }, { name: '160', value: 160 }, { name: '170', value: 170 }, { name: '180', value: 180 }, { name: '190', value: 190 }, { name: '200', value: 200 }, { name: '210', value: 210 }, { name: '220', value: 220 }, { name: '230', value: 230 }, { name: '240', value: 240 }, { name: '250', value: 250 }], // list
    defaultValue: 170, // 设置初始取值
    reapanint: false,
    back() {}, // 回调函数
    endback() {}, // 回调函数
    unitAmount: 5, // 每刻度值
    unitWidth: 20, // 每刻度间距
    touchMin: 90, // 可拖动最小值
    touchMax: 240, // 可拖动最大值
    min: 80, // 最小值
    max: 300, // 最大值
    fixed: 0, // 返回值最后取小数点后几位
  };

  constructor(props) {
    super(props);

    this.eventEnd = this.eventEnd.bind(this);
    this.eventMove = this.eventMove.bind(this);
    this.eventStart = this.eventStart.bind(this);
  }

  componentWillMount() {
    this.initDraw(this.props);
  }


  componentDidMount() {
    // this.initDraw(this.props)
    const stepLayClientWidth = this.stepLay.clientWidth;
    const { stepTouch } = this;
    this.stepLayClientWidth = stepLayClientWidth;
    stepTouch.style.left = `${this.setPosLf(this.state.defaultValue)}px`;
  }

  componentWillReceiveProps(nextprops) {
    if (nextprops.reapanint && !nextprops.reapanint) {
      this.initDraw(nextprops);
    }
  }

  // 根据当前数值获取卡尺容器left值
  setPosLf(value) {
    const { min, unitAmount, unitWidth } = this.state;
    const left = (((value - min) / unitAmount) * unitWidth) - (this.stepLayClientWidth / 2);
    // let  checkLeft = -left;
    return -left;
  }

  setLineType(pol) {
    const { touchMin, touchMax, value } = this.state;
    // 小于最小可以拖动值 添加样式 "disabled over-min"
    if (touchMin > pol) {
      return 'disabled over-min';
    }
    // 大于最大可以拖动值 添加样式 "disabled over-max"
    if (touchMax < pol) {
      return 'disabled over-max';
    }
    // 当前值大于可拖动范围值时 添加 "over"
    if (value >= pol) {
      return 'over';
    }
    return true;
  }

  eventEnd() {
    // back
    const { endback } = this.props;
    const { value } = this.state;
    if (endback) {
      endback({
        value,
      });
    }
  }

  eventStart(e) {
    const { disabled } = this.props;
    const { stepTouch } = this;
    if (disabled) {
      return false;
    }
    // 开始拖动前   获取当前的 x轴坐标和 拖动按钮 left 值
    this.stepLeft = stepTouch.offsetLeft;
    this.startX = e.touches[0].pageX;
    return true;
  }

  move(e) {
    const { back, fixed } = this.props;
    const {
      min, touchMin, touchMax, unitAmount, unitWidth,
    } = this.state;
    const { stepTouch } = this;
    let pageX = (e.touches[0].pageX - this.startX) + this.stepLeft; // 当前x轴坐标
    let onValue = (min + (-((pageX - (this.stepLayClientWidth / 2))
* unitAmount) / unitWidth)).toFixed(fixed); // 当前值

    if (onValue <= touchMin) { // 设置拖动最小值
      onValue = touchMin;
      pageX = this.setPosLf(touchMin);
    } else if (onValue >= touchMax) { // 设置拖动最大值
      onValue = touchMax;
      pageX = this.setPosLf(touchMax);
    }

    // 设置 stepTouch left 值
    stepTouch.style.left = `${pageX}px`;

    // back
    if (back) {
      back({
        value: onValue,
      });
    }

    // 设置 state
    this.setState({
      value: onValue,
    });
  }

  eventMove(e) {
    if (this.props.disabled) {
      return false;
    }
    // 阻止window窗体滚动
    e.preventDefault && e.preventDefault();
    this.move(e);
    return true;
  }

  initDraw(props) {
    const {
      list, unitAmount, defaultValue, unitWidth, min, max, touchMin, touchMax,
    } = props;
    const len = list.length;
    // totle = max - min,
    const lenArr = Array(len).fill(0);
    const lineArr = Array(((max - min) / unitAmount) + 1).fill(0);
    this.setState({
      list,
      // len,
      min,
      // max,
      // totle,
      lenArr,
      lineArr,
      defaultValue,
      unitWidth,
      unitAmount,
      touchMin,
      touchMax,
      value: defaultValue,
    });
  }

  render() {
    const self = this;
    const { className } = this.props;
    const {
      list, lenArr, lineArr, min, unitWidth, unitAmount,
    } = this.state;
    const cls = classNames({
      'jimu-slider': true,
      'jimu-step-slider': true,
      [className]: className,
    });
    // });

    return (
      <div
        className={cls}
        onTouchEnd={this.eventEnd}
        onTouchMove={this.eventMove}
        onTouchStart={this.eventStart}
      >
        <div className="jimu-slider-rule" ref={(n) => { this.wrapLay = n; }}>
          <div className="line-layout">
            <div className="line-bg" />
            <div className="line-light" ref={(n) => { this.lineLight = n; }}>
              <span className="pole-btn" />
            </div>
          </div>
        </div>
        <div className="step-wrap" ref={(n) => { this.stepLay = n; }}>
          <div className="step-touch" ref={(n) => { this.stepTouch = n; }}>
            <ul className="step-line">
              {lineArr.map((re, idx) => <li key={idx} className={self.setLineType((idx * unitAmount) + min)} style={{ left: `${unitWidth * idx}px` }} />)}
            </ul>
            <ul className="step-name">
              {lenArr.map((re, index) => (
                <li key={index} className={self.setLineType(list[index].value)} style={{ left: `${((Number(list[index].value) - min) / unitAmount) * unitWidth}px` }}>
                  <span className="step-title">{list[index].name}</span>
                </li>))}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}
export default Rule;

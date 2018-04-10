/**
 * Created by yanshenshen on 17/10/26.
*/
import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

class Stepper extends React.Component {
  static propTypes = {
    min: PropTypes.number,
    max: PropTypes.number,
    defaultVal: PropTypes.number,
    steps: PropTypes.number,
    disabled: PropTypes.bool,
    back: PropTypes.func,
  }
  static defaultProps = {
    min: 0, // 最小值
    max: 5, // 最大值
    steps: 1, // 每次进阶数
    defaultVal: 2, // 默认值
    disabled: false, // 是否禁用
    back() {},
  }

  constructor(props) {
    super(props);
    const { defaultVal, min, max } = this.props;
    if (min > defaultVal) {
      throw new Error('默认值小于最小值，请查看');
    }
    if (max < defaultVal) {
      throw new Error('默认值大于最大值，请查看');
    }
    this.state = { defaultVal };

    this.prevClick = this.prevClick.bind(this);
    this.nextClick = this.nextClick.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.defaultVal !== this.props.defaultVal) {
      this.setState({
        defaultVal: nextProps.defaultVal,
      });
    }
    if (nextProps.min > nextProps.defaultVal) {
      throw new Error('默认值小于最小值，请查看');
    }
    if (nextProps.max < nextProps.defaultVal) {
      throw new Error('默认值大于最大值，请查看');
    }
  }

  prevClick() {
    const {
      disabled, min, back, steps,
    } = this.props;
    const { defaultVal } = this.state;
    if (disabled || min >= defaultVal) {
      return;
    }

    const setVal = defaultVal - steps < min ? min : defaultVal - steps;
    this.setState({
      defaultVal: setVal,
    });
    back && back(setVal);
  }

  nextClick() {
    const {
      disabled, max, back, steps,
    } = this.props;
    const { defaultVal } = this.state;
    if (disabled || max <= defaultVal) {
      return;
    }
    const setVal = defaultVal + steps > max ? max : defaultVal + steps;
    this.setState({
      defaultVal: setVal,
    });
    back && back(setVal);
  }

  render() {
    const {
      className, disabled, min, max, ...others
    } = this.props;
    const { defaultVal } = this.state;
    const cls = classNames({
      'jimu-stepper': true,
      'jimu-stepper-disabled': disabled,
      [className]: className,
    });
    const prevCls = classNames({
      'jimu-stepper-btn': true,
      'icon-jimu-artboard-reduce': true,
      'jimu-stepper-btn-prev': true,
      'jimu-stepper-disabled': defaultVal <= min,
    });
    const nextCls = classNames({
      'jimu-stepper-btn': true,
      'icon-jimu-artboard-add': true,
      'jimu-stepper-btn-next': true,
      'jimu-stepper-disabled': defaultVal >= max,
    });
    return (
      <div className={cls} {...others}>
        <span className={prevCls} onClick={this.prevClick} />
        <span className="jimu-stepper-defaultval">{defaultVal}</span>
        <span className={nextCls} onClick={this.nextClick} />
      </div>
    );
  }
}
export default Stepper;

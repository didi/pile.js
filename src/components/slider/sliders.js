/**
 * Created by yanshenshen on 17/04/10.
 */

import React from 'react';
import PropTypes from 'prop-types';
import SliderLine from './slider';

class Sliders extends React.Component {
  static propTypes = {
    max: PropTypes.number,
    min: PropTypes.number,
    defaultValue: PropTypes.number,
    onChangeBack: PropTypes.func,
    upChangeBack: PropTypes.func,
    titleBefore: PropTypes.string,
    titleAfter: PropTypes.string,
    disabled: PropTypes.bool,
  }

  static defaultProps = {
    min: 0, // 最小值
    max: 10, // 最大值
    defaultValue: 0, // 设置初始取值
    disabled: false, // 值为 true 时，滑块为禁用状态
    onChangeBack() {}, // 获取子元素值 会触发 onChange 事件，并把改变后的值作为参数传入
    upChangeBack() {}, // 向父元素传值 会触发 onChange 事件，并把改变后的值作为参数传入
    titleBefore: '我愿意自费',
    titleAfter: '元升舱叫车',
  }

  constructor(props) {
    super(props);

    this.changeBack = this.changeBack.bind(this);
  }

  componentDidMount() {
    const { sliderTitles } = this;
    sliderTitles.innerHTML = `${this.props.titleBefore} <b class="height-light-type"> ${this.props.defaultValue} </b>${this.props.titleAfter}`;
  }

  changeBack(value) {
    const { sliderTitles } = this;
    sliderTitles.innerHTML = `${this.props.titleBefore} <b class="height-light-type"> ${value.value} </b>${this.props.titleAfter}`;

    // 向父元素传值
    if (this.props.upChangeBack) {
      this.props.upChangeBack({
        value: value.value,
      });
    }
  }


  render() {
    const { ...others } = this.props;
    return (
      <div className="jimu-sliders" >
        <SliderLine {...others} onChangeBack={this.changeBack}>
          <div className="slider-title" ref={(n) => { this.sliderTitles = n; }} />
        </SliderLine>
      </div>
    );
  }
}

export default Sliders;

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Picker from './picker.js';

/* eslint-disable react/no-unused-prop-types */
class Pickers extends Component {
  static propTypes = {
    value: PropTypes.array,
    options: PropTypes.array,
  };

  static defaultProps = {
    value: [],
    options: [],
  }

  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.onClickAway = this.onClickAway.bind(this);
    this.onClickCancel = this.onClickCancel.bind(this);
  }

  componentWillMount() {
    // 设置默认显示参数
    this.setState({
      oldValue: this.props.value,
      ...this.props,
    });
  }

  componentWillReceiveProps(nextprops) {
    if (nextprops !== this.props) {
      this.setState({
        oldValue: nextprops.value,
        ...nextprops,
      });
    }
  }

  onClickCancel() {
    this.setState({
      value: this.state.oldValue,
    });
    this.props.clickCancel && this.props.clickCancel();
  }

  onChange(val, text, idx) {
    const { value } = this.state;
    value[idx] = val;
    this.setState({
      value,
    });
    this.props.onChange && this.props.onChange(val, text, idx);
  }

  onClickAway() {
    this.props.pickerAway && this.props.pickerAway(this.state.value);
  }

  show() {
    this.pickers.show();
  }

  render() {
    return (
      <Picker
        ref={(t) => { this.pickers = t; }}
        value={this.state.value}
        options={this.state.options}
        onChange={this.onChange}
        onClickAway={this.onClickAway}
        onClickCancel={this.onClickCancel}
        open={this.state.open}
        weekText={['', '', '', '', '', '', '']}
      />
    );
  }
}

export default Pickers;

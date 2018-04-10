import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

class Switch extends React.Component {
  static propTypes = {
    radioName: PropTypes.string,
    isOpen: PropTypes.bool,
    clickBack: PropTypes.func,
    disabled: PropTypes.bool,
  }

  static defaultProps = {
    openVal: 0, // 展开值
    closeVal: 1, // 关闭值
    radioName: 'radio01', // radio name
    isOpen: false, // 展开状态
    clickBack() {}, // 点击回调函数
    isSmall: false, //
    disabled: false, // 值为 true 时，滑块为禁用状态
  }

  constructor(props) {
    super(props);
    this.state = {
      isOpen: this.props.isOpen,
      radioVal: this.props.isOpen ? this.props.openVal : this.props.closeVal,
      disabled: this.props.disabled,
      isReader: false,
    };
    this.radioFun = this.radioFun.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.disabled !== this.props.disabled) {
      this.state = {
        disabled: nextProps.disabled,
      };
    }

    if (nextProps.isOpen !== this.props.isOpen) {
      this.state = {
        isOpen: nextProps.isOpen,
      };
    }
  }

  radioFun() {
    const { isOpen, disabled } = this.state;
    if (disabled) {
      return;
    }
    this.setState({
      isOpen: !isOpen,
      radioVal: !isOpen ? this.props.openVal : this.props.closeVal,
      isReader: true,
    });

    if (this.props.clickBack) {
      this.props.clickBack({
        isOpen: !isOpen,
        radioVal: !isOpen ? this.props.openVal : this.props.closeVal,
      });
    }
  }

  render() {
    const { radioName, isSmall, className } = this.props;
    const {
      isOpen, radioVal, isReader, disabled,
    } = this.state;
    const cls = classNames({
      'ui-switch': true,
      'jimu-switch-issmall': isSmall,
      'switch-open': isOpen && !isReader,
      'switch-open-move': isOpen && isReader,
      'switch-close': !isOpen && !isReader,
      'switch-close-move': !isOpen && isReader,
      'switch-disabled': disabled,
      [className]: className,
    });
    return (
      <div className={cls} onClick={this.radioFun}>
        <input type="radio" name={radioName} value={radioVal} />
      </div>
    );
  }
}
export default Switch;

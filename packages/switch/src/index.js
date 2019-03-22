import classnames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import { prefixClsProperty } from '@pile-ui/shared';

class Switch extends React.Component {
  constructor(props) {
    super(props);
    const { checked, disabled } = props;

    this.onClick = this.onClick.bind(this);
    this.onKeyPress = this.onKeyPress.bind(this);
    this.state = {
      checked: !!checked,
      disabled: !!disabled,
    };
  }

  /**
   * 将 CSS 长度单位减去相应数值并转换
   * 如 getMinusedSize(1) => 1px
   * 如 getMinusedSize(3, 1) => 2px
   * @param {*} size
   * @param {*} minusNum
   */
  static getMinusedSize(size, minusNum = 0) {
    if (typeof size === 'number') {
      return `${size - minusNum}px`;
    }
    if (typeof size !== 'string') {
      return JSON.stringify(size);
    }
    const reg = /\d+/;
    const transedSize = size.replace(
      reg,
      matchNum => Number(matchNum) - minusNum
    );
    // 如果输入了非数字字符串，则直接 return
    if (!/^\d+$/.test(size)) {
      return transedSize;
    }
    return `${transedSize}px`;
  }

  onClick(e) {
    /* eslint-disable prefer-const */
    let { checked, disabled } = this.state;
    const { onChange } = this.props;
    if (disabled) {
      return;
    }
    checked = !checked;
    if (onChange) onChange(checked, e);
    /* eslint-enable prefer-const */
    this.setState({
      checked,
    });
  }

  onKeyPress(e) {
    if (e.keyCode === 13) {
      e.preventDefault();
      this.onClick(e);
    }
  }

  render() {
    const { prefixCls, checkedColor, name, color, width, height } = this.props;
    const { checked, disabled } = this.state;

    const transedWidth = Switch.getMinusedSize(width);
    const transedHeight = Switch.getMinusedSize(height);
    const minusedHeight = Switch.getMinusedSize(height, 2);
    const borderRadius = transedHeight;

    const divWrapCSS = classnames({
      [`${prefixCls}-switch--wrap`]: true,
      isDisabled: disabled,
    });

    const divWrapStyle = {
      backgroundColor: checked ? checkedColor : color,
      width: transedWidth,
      height: transedHeight,
      borderRadius,
    };

    const divInnerStyle = {
      width: minusedHeight,
      height: minusedHeight,
      borderRadius: minusedHeight,
      border: checked ? `1px solid ${checkedColor}` : `1px solid ${color}`,
      left: !checked ? '1px' : '100%',
      marginLeft: !checked ? 0 : `-${Switch.getMinusedSize(height, 1)}`,
    };

    return (
      <div
        className={divWrapCSS}
        style={divWrapStyle}
        role="switch"
        aria-checked={checked}
        tabIndex="0"
        onClick={this.onClick}
        onKeyPress={this.onKeyPress}
      >
        <input type="checkbox" name={name} value={checked} />
        <div style={divInnerStyle} />
      </div>
    );
  }
}

Switch.defaultProps = {
  checked: false,
  disabled: false,
  name: '',
  color: '#ccc',
  checkedColor: '#343c5c',
  width: '50px',
  height: '30px',
  onChange: () => {},
};

Switch.propTypes = {
  checked: PropTypes.bool,
  disabled: PropTypes.bool,
  name: PropTypes.string,
  color: PropTypes.string,
  checkedColor: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func,
};

export default prefixClsProperty(Switch);

/**
 * Created by lijincai on 16/11/01.
 */

import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

const propTypes = {
  type: PropTypes.string,
  disabled: PropTypes.bool,
  required: PropTypes.bool,
  focusClass: PropTypes.string,
};

const defaultProps = {
  type: 'text',
  disabled: false,
  required: false,
  focusClass: 'jimu-input-focus',
};

class Input extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      focused: false,
    };
    this.handleFocus = this.handleFocus.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
  }

  /* focus样式 */
  handleFocus() {
    this.setState({ focused: true });
  }

  /* blur样式 */
  handleBlur() {
    this.setState({ focused: false });
  }

  render() {
    const {
      value, className, focusClass, blurClass, maxlength, ...props
    } = this.props;

    const cls = classNames({
      [focusClass]: focusClass && (this.state.focused === true),
      [blurClass]: blurClass && (this.state.focused === false),
      [className]: className,
    });

    return (
      <input
        defaultValue={value}
        className={cls}
        maxLength={maxlength}
        onFocus={this.handleFocus}
        onBlur={this.handleBlur}
        {...props}
      />
    );
  }
}

Input.propTypes = propTypes;
Input.defaultProps = defaultProps;

export default Input;

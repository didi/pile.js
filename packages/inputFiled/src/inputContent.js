import * as React from 'react';
import PropTypes from 'prop-types';
import { IfComponent } from '@pile/condition';
import Icon from '@pile/icon';
import { prefixClsProperty } from '@pile/shared';
import classNames from 'classnames';
import Value from './value';
import Inputbody from './input';

/* eslint-disable no-shadow */
class InputContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = { focus: props.autoFocus };
    this.textInput = React.createRef();
    this.debounceTimeout = null;
  }

  componentWillUnmount() {
    if (this.debounceTimeout) {
      window.clearTimeout(this.debounceTimeout);
      this.debounceTimeout = null;
    }
  }

  focus = () => {
    this.textInput.current.focus();
  };

  onBlur = value => {
    if (this.textInput) {
      this.debounceTimeout = window.setTimeout(() => {
        if (
          document.activeElement !==
          (this.textInput && this.textInput.textInput)
        ) {
          this.setState({
            focus: false,
          });
        }
      }, 200);
      const { onBlur } = this.props;
      if (onBlur) {
        onBlur(value);
      }
    }
  };

  onFocus = value => {
    if (this.debounceTimeout) {
      clearTimeout(this.debounceTimeout);
      this.debounceTimeout = null;
    }
    this.setState({
      focus: true,
    });
    const { onFocus } = this.props;
    if (onFocus) {
      onFocus(value);
    }
  };

  render() {
    const {
      value,
      onChange,
      onFocus,
      onBlur,
      clearable,
      prefixCls,
      disabled,
      ...props
    } = this.props;
    const { type } = this.props;
    const { focus } = this.state;

    const defaultProps = {
      defaultValue: value,
      inputType: type,
      onChange,
    };
    const inputCls = classNames({
      [`${prefixCls}-input-input`]: true,
    });

    const clearCls = classNames({
      [`${prefixCls}-input-clear`]: true,
      [`${prefixCls}-input-fucos`]: focus,
    });

    return (
      <Value {...defaultProps}>
        {({ value, set, clear }) => {
          const valueChange = {
            value,
            onChange: set,
          };
          const getClear = () => {
            this.focus();
            clear();
          };
          const onKeyPress = e => {
            if (e.keyCode === 13) {
              e.preventDefault();
              getClear(e);
            }
          };
          return (
            <>
              <div className={inputCls}>
                <Inputbody
                  onBlur={this.onBlur}
                  onFocus={this.onFocus}
                  {...props}
                  {...valueChange}
                  ref={this.textInput}
                />
              </div>
              <IfComponent
                when={clearable && !disabled && `${value}`.length > 0}
              >
                {() => (
                  /* eslint-disable jsx-a11y/no-static-element-interactions */
                  <div
                    className={clearCls}
                    onClick={getClear}
                    onKeyPress={onKeyPress}
                  >
                    <Icon type="error-circle" />
                  </div>
                  /* eslint-enable jsx-a11y/no-static-element-interactions */
                )}
              </IfComponent>
            </>
          );
        }}
      </Value>
    );
  }
}
InputContent.propTypes = {
  autoFocus: PropTypes.bool,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
  onChange: PropTypes.func,
  clearable: PropTypes.bool,
  type: PropTypes.string,
  disabled: PropTypes.bool,
  value: PropTypes.string,
};

InputContent.defaultProps = {
  type: 'text',
  clearable: false,
  autoFocus: false,
  disabled: false,
  onFocus() {},
  onBlur() {},
  onChange() {},
  value: '',
};

export default prefixClsProperty(InputContent);

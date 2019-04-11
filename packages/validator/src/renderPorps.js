import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';
import ErrorMessage from './error';
import { createFactory } from './rule';

const noop = () => {};

/* eslint-disable react/destructuring-assignment, no-underscore-dangle */
class Validator extends React.Component {
  state = {
    showError: this.props.showError,
    value: this.props.initial,
    checker: this.checker(this.props.initial),
    nativeAttrs: this._nativeAttrs(),
  };
  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.showError !== prevState.showError) {
      return { showError: nextProps.showError };
    }
    return null;
  }
  _setValue = (updater, cb = noop) => {
    const { onChange } = this.props;

    this.setState(
      typeof updater === 'function'
        ? state => ({ value: updater(state.value) })
        : { value: updater },
      () => {
        /* eslint-disable react/no-access-state-in-setstate */
        const checker = this.checker(this.state.value);
        /* eslint-enable react/no-access-state-in-setstate */
        checker.num = Math.random() * 1000;
        onChange(this.state.value, checker);
        this.setState({ checker });
        cb();
      }
    );
  };
  checker(value) {
    const { rules } = this.props;
    let currRule;

    const valid = rules.every(rule => {
      currRule = rule;
      return createFactory(rule).checker(value).valid;
    });

    return { valid, message: valid ? '' : currRule.message };
  }

  _nativeAttrs() {
    const { rules } = this.props;
    const nativeAttrs = rules.reduce(
      (acc, rule) => ({
        ...acc,
        ...createFactory(rule).nativeAttrs(rule.nativeAttrs),
      }),
      {}
    );

    return nativeAttrs;
  }
  render() {
    const { children, prefixCls } = this.props;
    const { showError, value, checker, nativeAttrs } = this.state;

    const wrapCls = classNames({
      [`${prefixCls}-highlight`]: showError,
    });

    return (
      <>
        {children({
          value,
          setValue: this._setValue,
          className: wrapCls,
          ...nativeAttrs,
        })}
        <ErrorMessage show={showError}>{checker.message}</ErrorMessage>
      </>
    );
  }
}

Validator.propTypes = {
  showError: PropTypes.bool,
  children: PropTypes.func.isRequired,
  /* eslint-disable react/forbid-prop-types */
  rules: PropTypes.array,
  initial: PropTypes.any,
  onChange: PropTypes.func,
  prefixCls: PropTypes.string,
};
Validator.defaultProps = {
  showError: false,
  rules: [],
  initial: '',
  onChange: noop,
  prefixCls: 'pile-validator',
};

export default Validator;

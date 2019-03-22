import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { compose, prefixClsProperty, sizeProperty, sizes } from '@pile/shared';
import { compose as composed, withState, withHandlers } from 'recompose';
import Radio from './radio';

const enhanced = composed(
  withState('selectedValue', 'updateValue', props => {
    return props.defaultValue;
  }),
  withHandlers({
    onClick: props => item => event => {
      if (props.disabled || item.disabled) return null;
      props.updateValue(item.value, event);
      return props.onChange(item.value, event);
    },
  })
);
const RadioGroup = enhanced(
  ({
    prefixCls,
    className,
    onClick,
    options,
    selectedValue,
    disabled,
    children,
    onChange,
    name,
    vertical,
  }) => {
    const cls = classNames({
      [`${prefixCls}-radio-group`]: true,
      [className]: className,
    });
    /* eslint-disable no-param-reassign, no-unused-expressions */
    options &&
      options.forEach(item => {
        if (item.value === selectedValue) {
          item.clsicon = classNames({
            [`${prefixCls}-radio-icon`]: true,
            [`${prefixCls}-radio-checked`]: true,
            [`${prefixCls}-radio-vertical-icon`]: vertical,
            [`${prefixCls}-radio-disabled`]: disabled || item.disabled,
          });
        } else {
          item.clsicon = classNames({
            [`${prefixCls}-radio-icon`]: true,
            [`${prefixCls}-radio-no`]: true,
            [`${prefixCls}-radio-vertical-icon`]: vertical,
            [`${prefixCls}-radio-disabled-no`]: disabled || item.disabled,
          });
        }
      });
    return (
      <div className={cls}>
        {options &&
          options.map((item, index) => (
            <Radio
              {...item}
              /* eslint-disable react/no-array-index-key */
              key={`${item.value}${index}`}
              onClick={onClick(item)}
              onChange={onChange}
              name={name}
              vertical={vertical}
              checked={item.value === selectedValue}
            >
              {item.label}
            </Radio>
          ))}
        {!options &&
          React.Children.map(children, child => {
            return React.cloneElement(child, {
              ...child.props,
              onClick: onClick(child.props),
              onChange,
              name,
              checked: child.props.value === selectedValue,
            });
          })}
      </div>
    );
  }
);

RadioGroup.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
  vertical: PropTypes.bool,
  /* eslint-disable react/forbid-prop-types */
  options: PropTypes.array,
};

RadioGroup.defaultProps = {
  disabled: false,
  onChange() {},
};

const enhance = compose(
  sizeProperty([sizes.SMALL, sizes.LARGE]),
  prefixClsProperty
);

export default enhance(RadioGroup);

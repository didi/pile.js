import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { prefixClsProperty } from '@pile/shared';
import InputLabel from './inputlabel';
import InputContent from './inputContent';

const InputFiled = ({ prefixCls, children, ...props }) => {
  const wrapCls = classNames({
    [`${prefixCls}-input-item`]: true,
  });

  return (
    <div className={wrapCls}>
      <InputLabel labeltext={children} />
      <InputContent {...props} />
    </div>
  );
};

InputFiled.propTypes = {
  type: PropTypes.string,
  children: PropTypes.string,
  placeholder: PropTypes.string,
  clearable: PropTypes.bool,
  autoFocus: PropTypes.bool,
  disabled: PropTypes.bool,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
};

InputFiled.defaultProps = {
  type: 'text',
  children: '',
  placeholder: '',
  clearable: false,
  autoFocus: false,
  disabled: false,
  onFocus() {},
  onBlur() {},
  onChange() {},
};

export default prefixClsProperty(InputFiled);

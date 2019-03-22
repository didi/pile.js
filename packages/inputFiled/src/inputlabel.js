import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { prefixClsProperty } from '@pile/shared';

const InputLabel = ({ prefixCls, labeltext }) => {
  const labelCls = classNames({
    [`${prefixCls}-input-label`]: true,
  });
  return <div className={labelCls}>{labeltext}</div>;
};

InputLabel.propTypes = {
  labeltext: PropTypes.string,
};

InputLabel.defaultProps = {
  labeltext: '',
};

export default prefixClsProperty(InputLabel);

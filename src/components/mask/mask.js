/**
 * Created by jf on 15/10/27.
 */

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const Mask = (props) => {
  const {
    transparent, hidden, className, ...others
  } = props;
  const cls = classNames({
    didi_mask_none: hidden,
    didi_mask: !transparent,
    didi_mask_transparent: transparent,
    [className]: className,
  });

  return (
    <div className={cls} {...others} />
  );
};

const propTypes = {
  transparent: PropTypes.bool,
};

const defaultProps = {
  transparent: false,
};
Mask.propTypes = propTypes;
Mask.defaultProps = defaultProps;
export default Mask;

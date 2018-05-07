/**
 * Created by yanshenshen on 17/05/05.
*/

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const propTypes = {
  clamp: PropTypes.number,
};

const defaultProps = {
  clamp: 2,
};

const ItemDesc = (props) => {
  const {
    className, children, clamp, ...others
  } = props;
  const cls = classNames({
    'pile-item-desc': true,
    [className]: className,
  });
  return (
    <div className={cls} {...others} style={{ WebkitLineClamp: clamp }}>
      {children}
    </div>
  );
};

ItemDesc.propTypes = propTypes;
ItemDesc.defaultProps = defaultProps;

export default ItemDesc;

/**
 * Created by yanshenshen on 17/05/05.
*/

import React from 'react';
import classNames from 'classnames';

const ItemAside = (props) => {
  const {
    className, children, ...others
  } = props;
  const cls = classNames({
    'pile-item-aside': true,
    [className]: className,
  });
  const Component = props.href ? 'a' : 'div';
  return (
    <Component className={cls} {...others}>
      {children}
    </Component>
  );
};

export default ItemAside;

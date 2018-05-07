/**
 * Created by yanshenshen on 17/05/05.
*/

import React from 'react';
import classNames from 'classnames';

const ItemContent = (props) => {
  const {
    className, children, ...others
  } = props;
  const cls = classNames({
    'pile-item-content': true,
    [className]: className,
  });
  const Component = props.href ? 'a' : 'div';
  return (
    <Component className={cls} {...others}>
      {children}
    </Component>
  );
};

export default ItemContent;

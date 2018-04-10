/**
 * Created by yanshenshen on 17/05/05.
*/

import React from 'react';
import classNames from 'classnames';

const Item = (props) => {
  const {
    className, children, ...others
  } = props;
  const cls = classNames({
    'jimu-item': true,
    'jimu-item-href': props.href,
    [className]: className,
  });
  const Component = props.href ? 'a' : 'div';
  return (
    <Component className={cls} {...others}>
      {children}
    </Component>
  );
};

export default Item;

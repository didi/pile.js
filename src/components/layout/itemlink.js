/**
 * Created by yanshenshen on 17/05/05.
*/

import React from 'react';
import classNames from 'classnames';

const ItemLink = (props) => {
  const {
    className, children, diff, ...others
  } = props;
  const cls = classNames({
    'jimu-item-link': true,
    'jimu-item-link-diff': diff,
    [className]: className,
  });
  const Component = props.href ? 'a' : 'span';
  return (
    <Component className={cls} {...others}>
      {children}
    </Component>
  );
};

export default ItemLink;

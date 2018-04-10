/**
 * Created by yanshenshen on 17/05/05.
*/

import React from 'react';
import classNames from 'classnames';

const ItemTitle = (props) => {
  const { className, children, ...others } = props;
  const cls = classNames({
    'jimu-item-title': true,
    [className]: className,
  });
  return (
    <h3 className={cls} {...others}>
      {children}
    </h3>
  );
};

export default ItemTitle;

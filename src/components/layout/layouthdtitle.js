/**
 * Created by yanshenshen on 17/05/05.
*/

import React from 'react';
import classNames from 'classnames';

const LayoutHdTitle = (props) => {
  const { className, children, ...others } = props;
  const cls = classNames({
    'jimu-layout-hd-title': true,
    [className]: className,
  });
  return (
    <h2 className={cls} {...others}>
      {children}
    </h2>
  );
};

export default LayoutHdTitle;

/**
 * Created by yanshenshen on 17/05/05.
 */

import React from 'react';
import classNames from 'classnames';

const Layout = (props) => {
  const { className, children, ...others } = props;
  const cls = classNames({
    'pile-layout': true,
    [className]: className,
  });
  return (
    <div className={cls} {...others}>
      {children}
    </div>
  );
};

export default Layout;

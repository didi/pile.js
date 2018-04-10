/* Created by yanshenshen on 17/10/20. */

import React from 'react';
import classNames from 'classnames';

const NavItem = (props) => {
  const { className, children, ...others } = props;
  const cls = classNames({
    'jimu-nav-item': true,
    [className]: className,
  });
  return (
    <div className={cls} {...others}>
      {children}
    </div>
  );
};
export default NavItem;

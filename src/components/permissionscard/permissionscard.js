/**
 * yanshenshen 11/01/2017
 */
import React from 'react';
import classNames from 'classnames';
import Label from '../label/index';

const PermissionsCard = (props) => {
  const {
    className, titleHTML, labelTitle, labelType, messageHTML, iconHTML, ...others
  } = props;
  const cls = classNames({
    'jimu-permissions-card': true,
    'jimu-permissions-aside-icon': iconHTML,
    [className]: className,
  });
  const Component = props.href ? 'a' : 'div';

  return (
    <Component className={cls} {...others}>
      <div className="jimu-permissions-icon">
        {iconHTML}
      </div>
      <div className="jimu-permissions-hd">
        {titleHTML && <div className="jimu-permissions-title">{titleHTML}</div>}
        {labelTitle && <Label type={labelType}>{labelTitle}</Label>}
      </div>
      <div className="jimu-permissions-message">
        {messageHTML}
      </div>
    </Component>
  );
};
export default PermissionsCard;

/**
 * Created by jf on 15/10/27.
 */

import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

const propTypes = {
  type: PropTypes.string,
  href: PropTypes.string,
  iconClassName: PropTypes.string,
  iconFloat: PropTypes.string,
};

const defaultProps = {
  type: '', // normal 普通  ， danger 危险提示 ，disabled 禁止
  href: '',
  iconClassName: '',
  iconFloat: 'left',
};

const TextLink = (props) => {
  const {
    type, className, iconFloat, children, iconClassName, ...others
  } = props;
  const Component = props.href ? 'a' : 'span';
  const cls = classNames({
    'jimu-link': true,
    'jimu-link-normal': type === 'normal',
    'jimu-link-danger': type === 'danger',
    'jimu-link-disabled': type === 'disabled',
    'jimu-link-left': iconFloat === 'left' && iconClassName,
    'jimu-link-right': iconFloat === 'right' && iconClassName,
    [className]: className,
  });

  return (
    <Component {...others} className={cls}>
      {iconClassName && iconFloat === 'left' && <i className={iconClassName} />}
      {children}
      {iconClassName && iconFloat === 'right' && <i className={iconClassName} />}
    </Component>
  );
};

TextLink.propTypes = propTypes;
TextLink.defaultProps = defaultProps;

export default TextLink;

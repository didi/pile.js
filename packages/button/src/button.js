import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { compose, prefixClsProperty, sizeProperty, sizes } from '@pile/shared';
import { IfComponent } from '@pile/condition';

const Button = ({
  children,
  className,
  prefixCls,
  size,
  type,
  icon,
  loading,
  nativeType,
  block,
  href,
  circle,
  ...props
}) => {
  const cls = classNames({
    [`${prefixCls}-button`]: true,
    [`${prefixCls}-button--${type}`]: true,
    [className]: className,
    [`is-${size}`]: size,
    'is-block': block,
    /* eslint-disable react/destructuring-assignment */
    'is-disabled': props.disabled,
    /* eslint-enable react/destructuring-assignment */
    'is-circle': circle,
  });

  const Component = href ? 'a' : 'button';
  const componentType = href ? { href } : { type: nativeType };
  const iconType = loading ? 'loading-snaker' : icon;
  const isIconType = typeof iconType === 'string';
  const iconCls = classNames({ [`${prefixCls}-button-icon`]: true });
  const iconSelfCls = icon && icon.props && icon.props.className;

  return (
    <Component {...componentType} className={cls} {...props}>
      <IfComponent when={isIconType}>
        {() => <i className={`${prefixCls}-icon-${iconType} ${iconCls}`} />}
      </IfComponent>
      <IfComponent when={!isIconType && icon !== null}>
        {() =>
          React.cloneElement(icon, {
            className: classNames({
              [iconSelfCls]: iconSelfCls,
              [iconCls]: iconCls,
            }),
          })
        }
      </IfComponent>
      <span className={`${prefixCls}-button-label`}>{children}</span>
    </Component>
  );
};

Button.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  type: PropTypes.oneOf(['primary', 'secondary', 'float']),
  nativeType: PropTypes.oneOf(['button', 'submit', 'reset']),
  block: PropTypes.bool,
  disabled: PropTypes.bool,
  icon: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  loading: PropTypes.bool,
  href: PropTypes.string,
  circle: PropTypes.bool,
};

Button.defaultProps = {
  children: null,
  type: 'secondary',
  nativeType: 'button',
  block: false,
  disabled: false,
  icon: null,
  loading: false,
  href: null,
  circle: false,
};

const enhance = compose(
  sizeProperty([sizes.SMALL]),
  prefixClsProperty
);

export default enhance(Button);

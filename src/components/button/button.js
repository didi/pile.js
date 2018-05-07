/**
 * Created by jf on 15/10/27.
 */

import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

const Button = (props) => {
  const {
    type, size, disabled, plain, className, children, selected, float, ...others
  } = props;

  const Component = props.href ? 'a' : 'button';
  const cls = classNames({
    pile_btn: true,
    'pile-button-type-float': float,
    pile_btn_highlight: type === 'highlight' && !plain,
    pile_btn_highlight_disable: type === 'highlight' && disabled,
    pile_btn_border: size === 'small',
    pile_btn_disable: disabled,
    pile_btn_selected: selected,
    [className]: className,
  });

  return (
    <Component {...others} className={cls}>
      {children}
    </Component>
  );
};

Button.propTypes = {
  disabled: PropTypes.bool,
  float: PropTypes.bool,
  selected: PropTypes.bool,
  type: PropTypes.oneOf(['highlight', 'primary']),
  size: PropTypes.oneOf(['small', 'normal']),
};

Button.defaultProps = {
  disabled: false,
  type: 'primary',
  size: 'normal',
  float: false,
  selected: false,
};

export default Button;

/**
 * Created by yanshenshen on 17/10/19.
*/
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Button from '../button';

const propTypes = {
  type: PropTypes.string,
};
const defaultProps = {
  type: 'success', // 成功 ： success 、 警告 ： warning 、失败 ： fail
};

const Label = (props) => {
  const {
    type, className, children, ...others
  } = props;
  const cls = classNames({
    'jimu-lable': true,
    [`jimu-lable-${type}`]: true,
    [className]: className,
  });
  return (
    <Button size="small" {...others} className={cls}>
      {children}
    </Button>
  );
};
Label.propTypes = propTypes;
Label.defaultProps = defaultProps;

export default Label;

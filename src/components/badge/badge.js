/**
 * Created by yanshenshen on 17/10/19.
*/
import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

const Badge = (props) => {
  const {
    className, number, type, ...others
  } = props;
  const cls = classNames({
    'jimu-badge': true,
    'jimu-badge-full': number,
    [`jimu-badge-${type}`]: !number && type,
    [className]: className,
  });
  return (
    <span {...others} className={cls}>
      {number}
    </span>
  );
};
Badge.propTypes = {
  type: PropTypes.string,
  number: PropTypes.string,
};
Badge.defaultProps = {
  type: 'small', // small ： 小于25pt/dp 切线外交点 、 middle ： 25-40pt/dp 切线中交点 、 big ： 大于40pt/dp 切线内交点
  number: '',
};

export default Badge;

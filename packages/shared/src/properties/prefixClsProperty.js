import PropTypes from 'prop-types';
import curry from '../utils/curry';

/* eslint-disable no-param-reassign */
const prefixCls = curry((ns, Component) => {
  if (!Component) {
    Component = ns;
    ns = 'pile';
  }

  Component.propTypes = {
    ...Component.propTypes,
    prefixCls: PropTypes.string,
  };

  if (!Component.defaultProps) {
    Component.defaultProps = {};
  }

  Component.defaultProps.prefixCls = ns;
  return Component;
}, 1);

export default prefixCls;

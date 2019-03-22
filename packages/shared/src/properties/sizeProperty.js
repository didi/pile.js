import PropTypes from 'prop-types';
import curry from '../utils/curry';

/* eslint-disable no-param-reassign */
const sizeProperty = curry((sizes, defaultSize, Component) => {
  if (typeof defaultSize !== 'string') {
    Component = defaultSize;
    defaultSize = null;
  }

  Component.propTypes = {
    ...Component.propTypes,
    size: PropTypes.oneOf(sizes),
  };

  if (!Component.defaultProps) {
    Component.defaultProps = {};
  }

  Component.defaultProps.size = defaultSize;
  return Component;
}, 1);

export default sizeProperty;

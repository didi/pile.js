import * as React from 'react';
import * as PropTypes from 'prop-types';

const ErrorMessage = ({ show, children }) => {
  if (!show) return null;
  return <div className="pile-validator-error">{children}</div>;
};

ErrorMessage.propTypes = {
  show: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};
ErrorMessage.defaultProps = {
  show: true,
  children: null,
};

export default ErrorMessage;

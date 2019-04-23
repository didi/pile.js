import * as PropTypes from 'prop-types';

const IfComponent = ({ when, children }) => {
  if (!when) return null;
  return children();
};

IfComponent.propTypes = {
  when: PropTypes.bool.isRequired,
  children: PropTypes.func.isRequired,
};

export default IfComponent;

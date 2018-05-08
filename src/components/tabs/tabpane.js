import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';


const propTypes = {
  tab: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
  ]).isRequired,
};


const TabPane = (props) => {
  const {
    className, children, tab, ...others
  } = props;
  const cls = classNames({
    'pile-tab-item': true,
    [className]: className,
  });
  return (
    <div className={cls} {...others}>
      {children}
    </div>
  );
};

TabPane.propTypes = propTypes;

export default TabPane;

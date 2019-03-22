import * as React from 'react';
import curry from '../utils/curry';

/* eslint-disable no-param-reassign */
const refProperty = curry((Component) => {
  class LogProps extends React.Component {
    render() {
      const { forwardedRef, ...rest } = this.props;
      return <Component ref={forwardedRef} {...rest} />;
    }
  }
  function forwardRef(props, ref) {
    return <LogProps {...props} forwardedRef={ref} />;
  }
  const name = Component.displayName || Component.name;
  forwardRef.displayName = `logProps(${name})`;
  return React.forwardRef(forwardRef);
}, 1);

export default refProperty;

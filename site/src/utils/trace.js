import { withProps } from 'recompose';

const identity = Component => Component;

const trace = (tag) => {
  if (process.env.NODE_ENV !== 'production') {
    return withProps(props => console.log(`[${tag}]: `, props));
  }

  return identity;
};

export default trace;

import compose2 from './compose2';

const compose = (...fns) => fns.reduce(compose2);

export default compose;

const curry = (fn, optional = 0) => (...args) => {
  if (args.length === 0) {
    throw Error('EMPTY INVOCATION');
  }

  if (args.length >= fn.length - optional) {
    return fn(...args);
  }
  return curry(fn.bind(null, ...args), optional);
};

export default curry;

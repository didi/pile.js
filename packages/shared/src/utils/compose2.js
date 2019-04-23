const compose2 = (f, g) => (...args) => f(g(...args));

export default compose2;

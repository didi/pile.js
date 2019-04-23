import compose2 from './compose2';

const pipe = (...fns) => fns.reduceRight(compose2);

export default pipe;

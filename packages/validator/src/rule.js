import {
  Rule,
  Type,
  Required,
  Range,
  Length,
  Pattern,
  Validator,
} from './rules';

const { hasOwnProperty } = Object.prototype;

export const createFactory = opts => {
  if (hasOwnProperty.call(opts, 'type')) {
    return new Type(opts);
  }
  if (hasOwnProperty.call(opts, 'isRequired')) {
    return new Required(opts);
  }
  if (hasOwnProperty.call(opts, 'range')) {
    return new Range(opts);
  }
  if (hasOwnProperty.call(opts, 'length')) {
    return new Length(opts);
  }
  if (hasOwnProperty.call(opts, 'pattern')) {
    return new Pattern(opts);
  }
  if (hasOwnProperty.call(opts, 'validator')) {
    return new Validator(opts);
  }

  return new Rule(opts);
};

export const types = () => {};

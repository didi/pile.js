import warning from 'warning';
import Rule from './base';

class Validator extends Rule {
  constructor(opts) {
    super(Validator.init(opts));
  }

  static init(opts) {
    warning(
      typeof opts.validator === 'function',
      'validator 类似必须是function, %s  ',
      opts.validator
    );
    return { type: 'validator', value: opts.validator, message: opts.message };
  }

  checker(text) {
    const { value, message } = this;

    return { valid: value(text), message };
  }
}

export default Validator;

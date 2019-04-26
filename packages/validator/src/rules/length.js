import Rule from './base';

class Length extends Rule {
  constructor(opts) {
    super(Length.init(opts));
  }

  static init(opts) {
    return { type: 'length', value: opts.length, message: opts.message };
  }

  checker(text) {
    const { value, message } = this;

    return { valid: text.length === value, message };
  }
}

export default Length;

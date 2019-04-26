import Rule from './base';

class Required extends Rule {
  constructor(opts) {
    super(Required.init(opts));
  }

  static init(opts) {
    const required = opts.isRequired ? { required: 'required' } : {};
    return {
      type: 'required',
      value: opts.isRequired,
      message: opts.message,
      attrs: { ...required },
    };
  }

  checker(text) {
    const { value, message } = this;
    let valid = true;

    if (value) {
      valid = text !== '';
    }

    return { valid, message };
  }
}

export default Required;

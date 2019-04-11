import warning from 'warning';
import Rule from './base';

const types = ['phone', 'email', 'number'];

class InnerType extends Rule {
  constructor(opts) {
    super(InnerType.init(opts));
  }

  static init(opts) {
    warning(types.indexOf(opts.type) !== -1, 'type 只能是 %s 中的值', types);
    let attrs = {};
    if (opts.type === 'phone') {
      attrs = { maxLength: 11, type: 'phone' };
    }
    return {
      type: 'innerType',
      value: opts.type,
      message: opts.message,
      attrs,
    };
  }

  checker(text) {
    const { value, message } = this;
    let valid;
    switch (value) {
      case 'phone':
        valid = /^[01][0-9]{10}$/.test(text);
        break;
      case 'email':
        valid = /^([\w]+)(.[\w]+)*@([\w-]+\.){1,5}([A-Za-z]){2,4}$/.test(text);
        break;
      case 'number':
        valid = /^\d+$/.test(text);
        break;
      default:
        valid = false;
    }

    return { valid, message };
  }
}

export default InnerType;

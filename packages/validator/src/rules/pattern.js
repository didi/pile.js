import warning from 'warning';
import Rule from './base';

const { toString } = Object.prototype;

const isRegExp = regex => toString.call(regex) === '[object RegExp]';

class Pattern extends Rule {
  constructor(opts) {
    super(Pattern.init(opts));
  }

  static init(opts) {
    warning(
      isRegExp(opts.pattern),
      'pattern %s 必须是正则表达式',
      opts.pattern
    );
    return { type: 'pattern', value: opts.pattern, message: opts.message };
  }

  checker(text) {
    const { value, message } = this;

    return { valid: value.test(text), message };
  }
}

export default Pattern;

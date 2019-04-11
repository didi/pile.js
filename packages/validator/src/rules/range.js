import warning from 'warning';
import Rule from './base';

class Range extends Rule {
  constructor(opts) {
    super(Range.init(opts));
  }

  static init(opts) {
    const [min = 0, max = Number.MAX_SAFE_INTEGER] = opts.range;
    let attrs = {};

    warning(
      !Number.isNaN(min) || !Number.isNaN(max),
      'min: %s，max: %s 不是number类似，请检查配置',
      min,
      max
    );
    warning(min <= max, 'min不能大于max，请检查 %s 配置', opts.range);

    if (max !== Number.MAX_SAFE_INTEGER) {
      attrs = { maxLength: max };
    }

    return { type: 'range', value: [min, max], message: opts.message, attrs };
  }

  checker(text) {
    const {
      value: [min, max],
      message,
    } = this;

    return { valid: text.length >= min && text.length <= max, message };
  }
}

export default Range;

class Rule {
  constructor(opts) {
    this.type = opts.type;
    this.value = opts.value;
    this.message = opts.message;
    this.attrs = opts.attrs || {};
  }

  checker(text) {
    this.text = text;
  }

  nativeAttrs(attrs = {}) {
    return { ...this.attrs, ...attrs };
  }
}
export default Rule;

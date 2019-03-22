const postcss = require('postcss');

const schema = {
  component: {
    alias: 'b',
    separator: '.',
  },
  descendent: {
    alias: 'e',
    separator: '-',
  },
  modifier: {
    alias: 'm',
    separator: '--',
  },
  when: {
    alias: 'w',
    separator: '_',
  },
};

module.exports = postcss.plugin('postcss-bem', (opts) => {
  function getAtruleSelector(atRule, paramName) {
    const selectorArray = [schema[atRule.name].separator, paramName];
    let theParent = atRule.parent;
    while (theParent && theParent.type !== 'root') {
      selectorArray.unshift(`${schema[theParent.name].separator}${theParent.params}`);
      theParent = theParent.parent;
    }
    return selectorArray.join('');
  }

  function processAtrule(css, atRule) {
    const ruleName = atRule.name;
    if (!schema.hasOwnProperty(ruleName)) {
      throw new Error(`you have written an unsupported type of bem declaration ${ruleName}`);
    }
    const paramName = atRule.params;
    const ruleSelector = getAtruleSelector(atRule, paramName);
    const newRule = postcss.rule({
      selector: ruleSelector,
    });
    atRule.nodes.forEach((item) => {
      if (item.type === 'decl') {
        newRule.append(item);
      }
    });
    css.append(newRule);
  }

  return function (css, result) {
    const atRules = [];
    console.log('root css:', css)
    css.walkAtRules((atRule) => {
      atRules.push(atRule);
      console.log('[before]rule: [name]:', atRule.name, '[params]:', atRule.params, '[type]:', atRule.type)
      processAtrule(css, atRule);
      console.log('[after]rule: [name]:', atRule.name, '[params]:', atRule.params, '[type]:', atRule.type)
    });
    console.log('atRules:', atRules)
    atRules.forEach((item) => {
      item.remove();
    });
  };
});

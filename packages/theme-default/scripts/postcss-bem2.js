const postcss = require('postcss');
const extend = require('util')._extend;

const config = {
  suit: {
    separators: {
      namespace: '-',
      descendent: '-',
      modifier: '--',
      state: '.is-',
    },
  },
  bem: {
    separators: {
      namespace: '--',
      descendent: '__',
      modifier: '_',
    },
  },
  shortcuts: {},
};

module.exports = postcss.plugin('postcss-bem', (opts) => {
  opts = opts || {};

  if (!opts.style) {
    opts.style = 'suit';
  }

  if (opts.style !== 'suit' && opts.style !== 'bem') {
    throw new Error('postcss-bem: opts.style may only be "suit" or "bem"');
  }

  opts.shortcuts = extend(config.shortcuts, opts.shortcuts);

  const currentConfig = config[opts.style];

  if (opts.separators) {
    for (const customSeparator in opts.separators) {
      if (!opts.separators.hasOwnProperty(customSeparator)) continue;

      const separatorValue = opts.separators[customSeparator];
      if (typeof separatorValue === 'string') {
        currentConfig.separators[customSeparator] = separatorValue;
      } else {
        throw new Error(`postcss-bem: opts.separators.${customSeparator} must be a string`);
      }
    }
  }

  function checkRuleMatches(name, rule) {
    return rule.name === name || !!opts.shortcuts[name] && rule.name === opts.shortcuts[name];
  }

  function processModifierOrDescendent(name, rule, container, after) {
    let separator;
    let newName;
    let last;
    let newRule;
    if (checkRuleMatches('modifier', rule)) {
      separator = currentConfig.separators.modifier;
    } else if (checkRuleMatches('descendent', rule)) {
      separator = currentConfig.separators.descendent;
    }

    if (separator) {
      newName = name + separator + rule.params;
      newRule = postcss.rule({
        selector: `.${newName}`,
        source: rule.source,
      });
      container.insertAfter(after, newRule);
      last = newRule;
      rule.each((node) => {
        let subrule = false;
        if (node.type === 'atrule') {
          subrule = processModifierOrDescendent(newName, node, container, last);
        }
        if (subrule) {
          last = subrule;
        } else {
          try {
            node.moveTo(newRule);
          } catch (e) {
            newRule.append(node);
          }
        }
      });
      rule.remove();
      return last;
    }
    return false;
  }

  function processComponent(component, namespace) {
    let name = component.params;

    if (namespace) {
      name = namespace + currentConfig.separators.namespace + name;
    }

    let last = component;
    const newComponent = postcss.rule({
      selector: `.${name}`,
      source: component.source,
    });
    component.each((rule) => {
      let newRule = false;

      if (rule.type === 'atrule') {
        newRule = processModifierOrDescendent(name, rule, component.parent, last);
      }
      if (newRule) {
        last = newRule;
      } else {
        try {
          rule.moveTo(newComponent);
        } catch (e) {
          newComponent.append(rule);
        }
      }
    });

    component.replaceWith(newComponent);
  }

  return function (css, result) {
    const namespaces = {};

    if (opts.style === 'suit') {
      css.walkAtRules((utility) => {
        if (!checkRuleMatches('utility', utility)) return;
        if (!utility.params) {
          throw utility.error('No names supplied to @utility');
        }

        const utilityNames = postcss.list.comma(utility.params);

        const selector = utilityNames.map((params) => {
          params = postcss.list.space(params);
          let variant;
          let name;

          if (params.length > 2) {
            result.warn('Too many parameters for @utility', {
              node: utility,
            });
          }

          name = 'u-';
          if (params.length > 1) {
            variant = params[1];

            if (variant === 'small') {
              name += 'sm';
            } else if (variant === 'medium') {
              name += 'md';
            } else if (variant === 'large') {
              name += 'lg';
            } else {
              result.warn(`Unknown variant: ${variant}`, {
                node: utility,
              });
            }
            name += '-';
          }
          name += params[0];
          return `.${name}`;
        }).join(', ');

        const newUtility = postcss.rule({
          selector,
          source: utility.source,
        });

        utility.each((node) => {
          node.moveTo(newUtility);
        });
        utility.replaceWith(newUtility);
      });
    }

    css.walkAtRules((namespace) => {
      if (!checkRuleMatches('component-namespace', namespace)) return;
      const name = namespace.params;

      if (!namespace.nodes) {
        namespaces[namespace.source.input.file || namespace.source.input.id] = name;
        namespace.remove();
        return;
      }

      namespace.walkAtRules((component) => {
        if (!checkRuleMatches('component', component)) return;
        processComponent(component, name);
      });

      let node = namespace.last;
      while (node) {
        namespace.after(node) // node.moveAfter(namespace);
        node = namespace.last;
      }
      namespace.remove();
    });

    css.walkAtRules((component) => {
      if (!checkRuleMatches('component', component)) return;
      let namespace = opts.defaultNamespace;
      const id = component.source.input.file || component.source.input.id;
      if (id in namespaces) {
        namespace = namespaces[id];
      }

      processComponent(component, namespace);
    });

    if (opts.style === 'suit') {
      css.walkAtRules((when) => {
        if (!checkRuleMatches('when', when)) return;
        const parent = when.parent;

        if (parent === css || parent.type !== 'rule') {
          throw when.error('@when can only be used in rules which are not the root node');
        }

        const states = when.params;
        const newSelector = postcss.list.comma(parent.selector).map(selector => postcss.list.comma(states).map(state => selector + currentConfig.separators.state + state).join(', ')).join(', ');

        const newWhen = postcss.rule({
          selector: newSelector,
          source: when.source,
        });

        when.each((node) => {
          try {
            node.moveTo(newWhen);
          } catch (e) {
            newWhen.append(node);
          }
        });
        // newWhen.moveAfter(parent);
        parent.after(newWhen)
        when.remove();
      });
    }
  };
});

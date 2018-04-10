export function getComponentLocale(props, context, componentName, getDefaultLocale) {
  let locale: any = {};
  if (context && context.jimuLocale && context.jimuLocale[componentName]) {
    locale = context.jimuLocale[componentName];
  } else {
    const defaultLocale = getDefaultLocale();
    locale = defaultLocale.default || defaultLocale;
  }

  let result = {
    ...locale,
    ...props,
  };
  if (props.locale) {
    result = {
      ...result,
      ...props.locale,
      ...props,
    };
    if (props.locale.lang) {
      result.lang = {
        ...locale.lang,
        ...props.locale.lang,
      };
    }
  }
  return result;
}

export default {
  getComponentLocale,
};

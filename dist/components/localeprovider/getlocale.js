"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.getComponentLocale = getComponentLocale;
function getComponentLocale(props, context, componentName, getDefaultLocale) {
  var locale = {};
  if (context && context.pileLocale && context.pileLocale[componentName]) {
    locale = context.pileLocale[componentName];
  } else {
    var defaultLocale = getDefaultLocale();
    locale = defaultLocale.default || defaultLocale;
  }

  var result = _extends({}, locale, props);
  if (props.locale) {
    result = _extends({}, result, props.locale, props);
    if (props.locale.lang) {
      result.lang = _extends({}, locale.lang, props.locale.lang);
    }
  }
  return result;
}

exports.default = {
  getComponentLocale: getComponentLocale
};
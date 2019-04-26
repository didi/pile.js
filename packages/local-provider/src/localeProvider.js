import * as React from 'react';
import PropTypes from 'prop-types';
import LangContext from './langContext';

const LocaleProvider = ({ lang, children }) => {
  return <LangContext.Provider value={lang}>{children}</LangContext.Provider>;
};

LocaleProvider.defaultProps = {
  children: null,
};
LocaleProvider.propTypes = {
  lang: PropTypes.shape({
    locale: PropTypes.oneOf(['en', 'zh-cn']),
  }).isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

export default LocaleProvider;

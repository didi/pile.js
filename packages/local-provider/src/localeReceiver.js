import * as React from 'react';
import PropTypes from 'prop-types';
import LangContext from './langContext';

const LocaleReceiver = ({ children }) => {
  return <LangContext.Consumer>{children}</LangContext.Consumer>;
};

LocaleReceiver.defaultProps = {
  children() {},
};
LocaleReceiver.propTypes = {
  children: PropTypes.func,
};

export default LocaleReceiver;

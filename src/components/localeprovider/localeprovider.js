import React from 'react';
import PropTypes from 'prop-types';

export interface LocaleProviderProps {
  locale: {};
  children?: React.ReactElement<any>;
}

export default class LocaleProvider extends React.Component<LocaleProviderProps, any> {
  static propTypes = {
    locale: PropTypes.object,
  };

  static defaultProps = {
    locale: {},
  };

  static childContextTypes = {
    jimuLocale: PropTypes.object,
  };

  getChildContext() {
    return {
      jimuLocale: {
        ...this.props.locale,
        exist: true,
      },
    };
  }

  render() {
    return React.Children.only(this.props.children);
  }
}

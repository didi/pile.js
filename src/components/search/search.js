/**
 * Created by yanshenshen on 17/04/10.
 */

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Button from '../button/index';
import { getComponentLocale } from '../localeprovider/getLocale';
import Defaultlanguage from '../localeprovider/zh-CN';

class Search extends React.Component {
  static propTypes = {
    name: PropTypes.string,
    onChangeHandle: PropTypes.func,
    onClearHandle: PropTypes.func,
    onSubmitHandle: PropTypes.func,
    onFocusHandle: PropTypes.func,
    onBlurHandle: PropTypes.func,
    onCancelHandle: PropTypes.func,
  }
  static defaultProps = {
    name: 'jimu-search',
    onChangeHandle() {},
    onClearHandle() {},
    onCancelHandle() {},
    onFocusHandle() {},
    onBlurHandle() {},
    onSubmitHandle() {},
  }
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      focus: false,
    };
    this.submitHandle = this.submitHandle.bind(this);
    this.focusHandle = this.focusHandle.bind(this);
    this.blurHandle = this.blurHandle.bind(this);
    this.changeHandle = this.changeHandle.bind(this);
    this.clearHandle = this.clearHandle.bind(this);
    this.cancelHandle = this.cancelHandle.bind(this);
  }
  changeHandle(e) {
    const text = e.target.value;
    if (this.props.onChangeHandle) this.props.onChangeHandle(text, e);
    this.setState({ text });
  }

  cancelHandle(e) {
    this.setState({
      focus: false,
      text: '',
    });
    if (this.props.onCancelHandle) this.props.onCancelHandle(e);
  }

  clearHandle(e) {
    e.preventDefault();
    e.stopPropagation();
    this.setState({ text: '' });
    if (this.props.onClearHandle) this.props.onClearHandle(e);
    this.searchInput.focus();
  }

  blurHandle() {
    if (this.state.text === '') {
      this.setState({ focus: false });
    }

    this.props.onBlurHandle && this.props.onBlurHandle();
  }

  focusHandle() {
    this.setState({ focus: true });
    this.props.onFocusHandle && this.props.onFocusHandle();
  }

  submitHandle(e) {
    if (this.props.onSubmitHandle) {
      e.preventDefault();
      e.stopPropagation();
      this.props.onSubmitHandle(this.state.text, e);
    }
  }

  render() {
    const {
      className, ...others
    } = this.props;
    const cls = classNames({
      'jimu-search-bar': true,
      'jimu-focusing': this.state.focus,
      [className]: className,
    });
    const locale = getComponentLocale(this.props, this.context, 'Search', () => Defaultlanguage.Search);
    const { cancelText, placeholder } = locale;
    return (
      <div className={cls}>
        <div className="jimu-search-form">
          <div className="jimu-search-layout">
            <span className="pos-a icon-search" onClick={this.submitHandle} />
            <input
              ref={(n) => { this.searchInput = n; }}
              type="text"
              className="jimu-search-input"
              onFocus={this.focusHandle}
              onBlur={this.blurHandle}
              onInput={this.changeHandle}
              value={this.state.text}

              {...others}
              placeholder={placeholder}
            />
            <span className="pos-a icon-del" onClick={this.clearHandle} />
          </div>
        </div>
        <Button
          className="cancel-btn"
          disabled
          size="small"
          onClick={this.cancelHandle}
        >
          {cancelText}
        </Button>
      </div>
    );
  }
}

Search.contextTypes = {
  jimuLocale: PropTypes.object,
};

export default Search;

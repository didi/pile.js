import * as React from 'react';
import { refProperty } from '@pile/shared';
import PropTypes from 'prop-types';

class Inputbody extends React.Component {
  constructor(props) {
    super(props);
    this.textInput = React.createRef();
  }

  focus = () => {
    this.textInput.current.focus();
  };

  onblur = e => {
    const { value } = e.target;
    const { onBlur } = this.props;
    if (onBlur) {
      onBlur(value);
    }
  };

  onfocus = e => {
    const { value } = e.target;
    const { onFocus } = this.props;
    if (onFocus) {
      onFocus(value);
    }
  };

  render() {
    return (
      <input
        {...this.props}
        ref={this.textInput}
        onBlur={this.onblur}
        onFocus={this.onfocus}
      />
    );
  }
}

Inputbody.propTypes = {
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
};

Inputbody.defaultProps = {
  onFocus() {},
  onBlur() {},
  onChange() {},
};
export default refProperty(Inputbody);

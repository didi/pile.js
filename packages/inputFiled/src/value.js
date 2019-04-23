import * as React from 'react';
import PropTypes from 'prop-types';

class Value extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: props.defaultValue || '' };
  }

  set = e => {
    const ctrlValue = e.target.value;
    const { inputType } = this.props;
    const { value: preValue } = this.state;
    let tempValue = ctrlValue;

    switch (inputType) {
      case 'phone':
        tempValue =
          preValue.length === 11 && ctrlValue.length > 11
            ? preValue
            : ctrlValue.replace(/\D/g, '').substring(0, 11);
        break;
      case 'number':
        tempValue = ctrlValue.replace(/\D/g, '');
        break;
      case 'text':
      case 'password':
      default:
        break;
    }

    this.setState({
      value: tempValue,
    });
    const { onChange } = this.props;
    if (onChange) {
      onChange(tempValue);
    }
  };

  reset = () => {
    const { defaultValue } = this.props;
    this.setState({
      value: defaultValue,
    });
  };

  clear = () => {
    this.setState({
      value: '',
    });
  };

  render() {
    const { value } = this.state;
    const newProps = {
      set: this.set,
      clear: this.clear,
      reset: this.reset,
      value,
    };
    const { children } = this.props;
    return children(newProps);
  }
}

Value.propTypes = {
  defaultValue: PropTypes.string,
  inputType: PropTypes.string,
  children: PropTypes.func,
  onChange: PropTypes.func,
};

Value.defaultProps = {
  defaultValue: '',
  inputType: '',
  children() {},
  onChange() {},
};

export default Value;

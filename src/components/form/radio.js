/**
 * Created by yanshenshen on 17/11/16.
*/
import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

class Checkbox extends React.Component {
  static propTypes = {
    back: PropTypes.func,
    disabled: PropTypes.bool,
    defaultChecked: PropTypes.bool,
    label: PropTypes.string,
    id: PropTypes.string,
  }
  static defaultProps = {
    back() {},
    disabled: false,
    defaultChecked: false,
    label: '',
    id: 'pile-radio',
  }

  constructor(props) {
    super(props);
    this.state = {
      defaultChecked: this.props.defaultChecked,
    };
    this.clicktaggle = this.clicktaggle.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.defaultChecked !== this.props.defaultChecked) {
      this.setState({
        defaultChecked: nextProps.defaultChecked,
      });
    }
  }

  clicktaggle() {
    if (this.props.disabled) {
      return;
    }
    this.setState({
      defaultChecked: !this.state.defaultChecked,
    });
    this.props.back && this.props.back(!this.state.defaultChecked);
  }

  render() {
    const {
      className, label, id, disabled,
    } = this.props;
    const { defaultChecked } = this.state;
    const cls = classNames({
      'pile-form-radio': true,
      'pile-radio-checked': defaultChecked,
      'pile-radio-disabled': disabled,
      [className]: className,
    });

    const radioType = defaultChecked ? 'icon-pile-radio' : 'icon-pile-radio-normal';

    return (
      <div className={cls} onClick={this.clicktaggle}>
        <label className="label" htmlFor={id}>
          <span id={id} className={classNames('icon', radioType)} />
          {label}
        </label>
      </div>
    );
  }
}

export default Checkbox;

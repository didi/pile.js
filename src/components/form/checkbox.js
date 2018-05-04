/**
 * Created by yanshenshen on 17/11/16.
*/
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

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
    id: 'pile-checkbox',
  }

  constructor(props) {
    super(props);
    this.state = {
      defaultChecked: this.props.defaultChecked,
    };
    this.clicktaggle = this.clicktaggle.bind(this);
  }

  componentDidMount() {}

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
      'pile-form-checkbox': true,
      'pile-checkbox-checked': defaultChecked,
      'pile-checkbox-disabled': disabled,
      [className]: className,
    });

    const checkboxState = defaultChecked ? 'icon-pile-check' : 'icon-pile-check-normal';

    return (
      <div className={cls} onClick={this.clicktaggle}>
        <label className="label" htmlFor={id}>
          <span id={id} className={classNames('icon', checkboxState)} />
          {label}
        </label>
      </div>
    );
  }
}
export default Checkbox;

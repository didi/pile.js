import React, { Component } from 'react';
import classNames from 'classnames';
import Mask from '../mask/index';

export default class Tip extends Component {
  constructor(props) {
    super(props);
    this.hideTip = this.hideTip.bind(this);
  }

  hideTip() {
    this.props.MaskClick && this.props.MaskClick();
  }

  render() {
    const { show, className, children } = this.props;

    const cls = classNames({
      'jimu-tip-layout': true,
      [className]: className,
    });

    return (
      <div className="jimu-dialog">
        {show ? (
          <div className={cls}>
            <Mask onClick={this.hideTip} />
            <div className="tip-content">
              {children}
            </div>
          </div>
           ) : null}
      </div>
    );
  }
}

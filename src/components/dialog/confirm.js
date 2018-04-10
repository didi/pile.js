/**
 * Created by jf on 15/10/27.
 */

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Mask from '../mask/index';

class Confirm extends React.Component {
  static propTypes = {
    buttons: PropTypes.array,
    show: PropTypes.bool,
    title: PropTypes.string,
  }

  static defaultProps = {
    buttons: [],
    title: '',
    iconHide: false,
    show: false,
  }

  constructor(props) {
    super(props);
    const { iconHide } = this.props;
    this.state = { iconHide };
    this.MaskClick = this.MaskClick.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.iconHide !== this.props.iconHide) {
      this.state = {
        iconHide: nextProps.iconHide,
      };
    }
  }

  MaskClick() {
    this.props.MaskClick && this.props.MaskClick();
  }

  renderButtons() {
    return this.props.buttons.map((action, idx) => {
      const {
        type, label, className, ...others
      } = action;
      const cls = classNames({
        btn_white: type !== 'default',
        btn_orange: type === 'default',
        [className]: className,
      });

      return (
        <a
          key={idx}
          {...others}
          className={cls}
        >
          {label}
        </a>
      );
    });
  }

  render() {
    const {
      type, title, show, children,
    } = this.props;
    const { iconHide } = this.state;
    const className = classNames({
      didi_icon: true,
      didi_icon_hide: iconHide,
      'icon-popup_warning': type !== 'success',
      'icon-popup_right': type === 'success',
    });
    return (
      <div className="jimu-dialog">
        <div className="didi_dialog_confirm" style={{ display: show ? 'block' : 'none' }}>
          <Mask onClick={this.MaskClick} />
          <div className="didi_dialog">
            <p className={className} />
            <div className="d_tip title_font tips-content">
              {title}
            </div>
            {children && (<div className="dialog-confirm-content">{children}</div>)}
            <div className="d_btns didi_btn_confirm">
              {this.renderButtons()}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Confirm;

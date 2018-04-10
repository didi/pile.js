/**
 * Created by zhaojie on 16/06/12.
 */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Mask from '../mask/index';

class Alert extends React.Component {
  static propTypes = {
    // buttons: PropTypes.array,
    show: PropTypes.bool,
    title: PropTypes.string,
  }

  static defaultProps = {
    buttons: [],
    title: '',
    show: false,
    iconHide: false,
  }

  constructor(props) {
    super(props);
    const { iconHide, width } = this.props;
    this.state = {
      iconHide,
      width,
    };
    this.MaskClick = this.MaskClick.bind(this);
  }
  componentDidMount() {
    // 居中
    const { dialog_alert, didi_icon_alert, title_font } = this;
    dialog_alert.style.background = '#fff';
    dialog_alert.style.width = this.state.width || '267px';
    dialog_alert.style.textAlign = 'center';
    didi_icon_alert.style.margin = '0 0 16px';
    title_font.style.lineHeight = '22px';
    title_font.style.marginBottom = !this.props.children ? '20px' : '10px';
    title_font.style.fontSize = '16px';
    title_font.style.color = '#333';
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.iconHide !== this.props.iconHide) {
      this.setState({
        iconHide: nextProps.iconHide,
      });
    }
    const { dialog_alert, title_font } = this;
    dialog_alert.style.width = nextProps.width || '267px';
    title_font.style.marginBottom = !nextProps.children ? '20px' : '10px';
  }

  MaskClick() {
    this.props.MaskClick && this.props.MaskClick();
  }

  renderButtons() {
    return this.props.buttons.map((action, idx) => {
      const {
        className, label, ...others
      } = action;
      const cls = classNames({
        btn_orange: true,
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
      title, show, children, type,
    } = this.props;
    const { iconHide } = this.state;
    const className = classNames({
      // "didi_icon icon-popup_warning": !!type === false ||  type === 'warning',
      didi_icon_hide: iconHide,
      'didi_icon icon-popup_right': type === 'success',
      'didi_icon icon-popup_warning': type !== 'success',
    });
    return (
      <div className="jimu-dialog">
        <div className="didi_dialog_alert" style={{ display: show ? 'block' : 'none' }}>
          <Mask onClick={this.MaskClick} />
          <div className="didi_dialog" ref={(c) => { this.dialog_alert = c; }}>
            <p className={className} ref={(c) => { this.didi_icon_alert = c; }} />
            <div className="d_tip title_font tips-title" ref={(c) => { this.title_font = c; }}>
              {title}
            </div>
            {children && (<div className="dialog-alert-content">{children}</div>)}
            <div className="d_btns didi_btn_alert">
              {this.renderButtons()}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Alert;

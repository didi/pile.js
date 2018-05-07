/**
 * Created by zhaojie on 16/11/21.
 */

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Mask from '../mask/index';

class NConfirm extends React.Component {
  static propTypes = {
    buttons: PropTypes.array,
    show: PropTypes.bool,
    title: PropTypes.string,
    transparent: PropTypes.bool,
  }

  static defaultProps = {
    buttons: [],
    show: false,
    title: '',
    transparent: false,
  }

  renderButtons() {
    return this.props.buttons.map((action, idx) => {
      const {
        type, label, className, ...others
      } = action;
      const cls = classNames({
        pile_btn_nconfirm: true,
        default: type === 'default',
        primary: type === 'primary',
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
      title, show, hide, transparent,
    } = this.props;
    return (
      <div className="pile-dialog">
        <div className={['pile_dialog_nconfirm', (show ? 'show' : undefined)].join(' ')}>
          <Mask transparent={transparent} />
          <div className={['pile_nconfirm', (show ? 'show' : undefined)].join(' ')}>
            <div className="pile_nconfirm_hd">
              <strong className="pile_nconfirm_title">{title}</strong>
            </div>
            <div className="pile_nconfirm_bd">
              {this.renderButtons()}
            </div>
            <div className="pile_nconfirm_ft">
              <a className="btn-orange" onClick={hide}>取消</a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default NConfirm;

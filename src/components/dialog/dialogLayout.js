import React, { Component } from 'react';
import Confirm from './confirm';
import Alert from './alert';
import Toast from './toast';

export default class DialogLayout extends Component {
  constructor() {
    super();
    /* eslint-disable react/no-unused-state */
    this.state = {
      confirmShow: false,
      iconHide: false,
      confirmType: 'fail',
      confirmBtnType: 'default',
      confirmTitle: 'null',
      confirmcancelBtnText: '取消',
      confirmBtnText: '确定',
      confirmChildren: null,

      toastShow: false,
      toastContent: 'null',
      toastType: 'success',
      toastTime: 3000,
      toastCallBack: null,

      alertShow: false,
      alertType: 'fail',
      alertChildren: null,
      alertTitleText: 'null',
      alertLabelText: '我知道了',
      MaskClick: null,
    };
    /* eslint-enable react/no-unused-state */
    const self = this;
    function alertDialog(config = {}) {
      const obj = {
        alertWidth: config.width,
        alertShow: (config.show === undefined ? true : config.show),
        alertIconHide: config.iconHide || false,
        alertType: config.type || 'fail',
        alertTitleText: config.msg || 'null',
        alertChildren: config.children || null,
        alertLabelText: config.btnText || '我知道了',
        alertBeforeCallBack: config.beforeCallBack,
        alertCallBack: config.callBack,
        MaskClick: config.isMaskClick ? function mask() {
          self.setState({
            alertShow: false,
          });
        } : null,
      };
      self.setState(obj);
    }
    function toastDialog(config = {}) {
      const obj = {
        toastShow: (config.show === undefined ? true : config.show),
        toastType: config.type || 'success',
        toastContent: config.msg || 'null',
        toastTime: config.time === undefined ? 3000 : config.time,
        toastCallBack: config.callBack,
      };

      self.setState(obj);
    }
    function confirmDialog(config = {}) {
      const obj = {
        confirmShow: (config.show === undefined ? true : config.show),
        confirmIconHide: config.iconHide || false,
        confirmType: config.type || 'fail',
        confirmChildren: config.children || null,
        confirmBtnType: config.btnType || 'default',
        confirmTitle: config.msg || 'null',
        confirmcancelBtnText: config.cancelText || '取消',
        confirmBtnText: config.btnText || '确定',
        confirmCancelBeforeCallBack: config.cancelBeforeCallBack,
        confirmCancelCallBack: config.cancelCallBack,
        confirmCallBack: config.callBack,
        confirmBeforeCallBack: config.beforeCallBack,
      };
      self.setState(obj);
    }

    window.confirmDialog = confirmDialog;
    window.toastDialog = toastDialog;
    window.alertDialog = alertDialog;
  }
  alertClick() {
    let confirmShow = false;
    const { alertCallBack, alertBeforeCallBack } = this.state;

    if (alertBeforeCallBack) {
      const power = alertBeforeCallBack();
      if (!power) {
        confirmShow = true;
      }
    } else {
      alertCallBack && alertCallBack();
    }
    this.setState({
      alertShow: confirmShow,
    });
  }
  toastHide() {
    const { toastCallBack } = this.state;
    toastCallBack && toastCallBack();
    this.setState({
      toastShow: false,
    });
  }
  confirmCancelClick() {
    let confirmShow = false;
    const { confirmCancelCallBack, confirmCancelBeforeCallBack } = this.state;

    const power = confirmCancelBeforeCallBack && confirmCancelBeforeCallBack();
    if (power === false) {
      confirmShow = true;
    } else {
      confirmCancelCallBack && confirmCancelCallBack();
    }
    this.setState({
      confirmShow,
    });
  }
  confirmClick() {
    let confirmShow = false;
    const { confirmCallBack, confirmBeforeCallBack } = this.state;
    if (confirmBeforeCallBack) {
      const power = confirmBeforeCallBack();
      if (!power) {
        confirmShow = true;
      }
    } else {
      confirmCallBack && confirmCallBack();
    }
    this.setState({
      confirmShow,
    });
  }
  render() {
    const {
      toastShow, toastContent, toastType, toastTime, alertShow, alertIconHide,
      alertType, alertChildren, alertTitleText, alertLabelText, confirmShow,
      confirmIconHide, confirmType, confirmChildren, confirmBtnType, confirmTitle,
      confirmcancelBtnText, confirmBtnText, alertWidth, MaskClick,
    } = this.state;

    return (
      <div className="dialogLayout">
        <Alert
          show={alertShow}
          type={alertType}
          iconHide={alertIconHide}
          title={alertTitleText}
          MaskClick={MaskClick}
          width={alertWidth}
          buttons={[{ label: alertLabelText, onClick: this.alertClick.bind(this) }]}
        >
          {alertChildren}
        </Alert>
        <Toast
          content={toastContent}
          toastShow={toastShow}
          type={toastType}
          time={toastTime}
          callback={this.toastHide.bind(this)}
        />
        <Confirm
          show={confirmShow}
          iconHide={confirmIconHide}
          type={confirmType}
          title={confirmTitle}
          buttons={[
            {
              label: confirmcancelBtnText,
              onClick: this.confirmCancelClick.bind(this),
            },
            { type: confirmBtnType, label: confirmBtnText, onClick: this.confirmClick.bind(this) },
          ]}
        >
          {confirmChildren}
        </Confirm>
      </div>
    );
  }
}

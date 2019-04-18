import * as React from 'react';
import * as PropTypes from 'prop-types';
import { CSSTransition } from 'react-transition-group'; // ES6
import classNames from 'classnames';
import { prefixClsProperty } from '@pile-ui/shared';

class Confirm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { show: false };
  }

  componentDidMount() {
    const { show } = this.props;
    if (show) {
      setTimeout(() => {
        this.setState({ show: true });
      }, 0);
    }
  }

  componentWillReceiveProps(nextProps) {
    const { show } = this.state;
    if (nextProps.show !== show) {
      setTimeout(() => {
        this.setState({ show: true });
      }, 0);
    }
  }

  componentWillUnmount() {
    document.body.style.overflow = '';
  }

  callBackClose = e => {
    const { callBack, cancelCallBack } = this.props;
    const { isCancel } = this.state;
    if (callBack && !isCancel) {
      callBack(e);
    }
    if (cancelCallBack && isCancel) {
      cancelCallBack(e);
    }
  };

  onClose = () => {
    this.setState({
      show: false,
      isCancel: false,
    });
  };

  onCloseCancel = () => {
    this.setState({
      show: false,
      isCancel: true,
    });
  };

  onKeyPress = e => {
    if (e.keyCode === 13) {
      e.preventDefault();
      this.onClose(e);
    }
  };
  cancelOnKeyPress = e => {
    if (e.keyCode === 13) {
      e.preventDefault();
      this.onClose(e);
    }
  };

  render() {
    let typeIcon = 'success';
    const {
      showIcon,
      title,
      children,
      btnText,
      type,
      cancelBtnText,
    } = this.props;
    const { show } = this.state;
    const { prefixCls } = this.props;
    const iconCls = classNames({ [`${prefixCls}-alert-icon`]: true });
    if (type === 'success') {
      typeIcon = 'check';
    } else {
      typeIcon = type;
    }
    return (
      <CSSTransition
        in={show}
        timeout={200} // 动画时长
        classNames="pile-confirm-animate"
        unmountOnExit
        onEnter={() => {
          document.body.style.overflow = 'hidden';
        }}
        onExited={() => {
          document.body.style.overflow = '';
          this.callBackClose();
        }}
      >
        <div className="pile-confirm">
          <div className="pile-confirm-mask" />
          <div className="pile-confirm-box">
            <i
              className={`${prefixCls}-icon-${typeIcon} ${iconCls}`}
              style={showIcon ? { display: 'block' } : { display: 'none' }}
            />

            <div className="pile-confirm-title">{title}</div>
            {children ? (
              <div className="pile-confirm-content">{children}</div>
            ) : null}
            <div
              role="button"
              tabIndex={0}
              className="d-btns pile-btn-confirm cancel-btn"
              onClick={this.onCloseCancel}
              onKeyPress={this.cancelOnKeyPress}
            >
              <span className="btn-cancle-gray">{cancelBtnText || '取消'}</span>
            </div>
            <div
              role="button"
              tabIndex={0}
              className="d-btns pile-btn-confirm"
              onClick={this.onClose}
              onKeyPress={this.onKeyPress}
            >
              <span className="btn-orange">{btnText || '确定'}</span>
            </div>
          </div>
        </div>
      </CSSTransition>
    );
  }
}
Confirm.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  show: PropTypes.bool,
  showIcon: PropTypes.bool,
  title: PropTypes.node,
  btnText: PropTypes.string,
  onClick: PropTypes.func,
  type: PropTypes.oneOf(['success', 'warnning']),
};

Confirm.defaultProps = {
  children: null,
  showIcon: false,
  title: '提示',
  show: false,
  btnText: '确定',
  type: 'success',
  onClick() {},
};
export default prefixClsProperty(Confirm);

import * as React from 'react';
import * as PropTypes from 'prop-types';
import { CSSTransition } from 'react-transition-group'; // ES6
import classNames from 'classnames';
import { prefixClsProperty } from '@pile-ui/shared';

class Alert extends React.Component {
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
    const { callBack } = this.props;
    if (callBack) {
      callBack(e);
    }
  };

  onClose = () => {
    this.setState({
      show: false,
    });
  };

  onKeyPress = e => {
    if (e.keyCode === 13) {
      e.preventDefault();
      this.onClose(e);
    }
  };

  render() {
    let typeIcon = 'success';
    const { showIcon, title, children, btnText, type } = this.props;
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
        classNames="pile-alert-animate"
        unmountOnExit
        onEnter={() => {
          document.body.style.overflow = 'hidden';
        }}
        onExited={() => {
          document.body.style.overflow = '';
          this.callBackClose();
        }}
      >
        <div className="pile-alert">
          <div className="pile-alert-mask" />
          <div className="pile-alert-box">
            <i
              className={`${prefixCls}-icon-${typeIcon} ${iconCls}`}
              style={showIcon ? { display: 'block' } : { display: 'none' }}
            />

            <div className="pile-alert-title">{title}</div>
            {children ? (
              <div className="pile-alert-content">{children}</div>
            ) : null}

            <div
              role="button"
              tabIndex={0}
              className="d-btns pile-btn-alert"
              onClick={this.onClose}
              onKeyPress={this.onKeyPress}
            >
              <span className="btn-orange">{btnText}</span>
            </div>
          </div>
        </div>
      </CSSTransition>
    );
  }
}
Alert.propTypes = {
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

Alert.defaultProps = {
  children: null,
  showIcon: false,
  title: '提示',
  show: false,
  btnText: '确定',
  type: 'success',
  onClick() {},
};
export default prefixClsProperty(Alert);

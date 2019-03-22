import * as React from 'react';
import PropTypes from 'prop-types';
import Icon from '@pile/icon';

class ToastContent extends React.Component {
  componentDidMount() {
    this.startCloseTimer();
  }

  componentDidUpdate(prevProps) {
    const { duration, content, iconType } = this.props;
    if (
      duration !== prevProps.duration ||
      content !== prevProps.content ||
      iconType !== prevProps.iconType
    ) {
      this.restartCloseTimer();
    }
  }

  componentWillUnmount() {
    this.clearCloseTimer();
  }

  close() {
    this.clearCloseTimer();
    // 执行关闭操作
    const { onAnimateLeave } = this.props;
    onAnimateLeave();
  }

  startCloseTimer() {
    const { duration } = this.props;
    if (duration) {
      this.closeTimer = setTimeout(() => {
        this.close();
      }, duration * 1000);
    }
  }

  clearCloseTimer() {
    if (this.closeTimer) {
      clearTimeout(this.closeTimer);
      this.closeTimer = null;
    }
  }

  restartCloseTimer() {
    this.clearCloseTimer();
    this.startCloseTimer();
  }

  render() {
    /* eslint-disable */
    let { content, iconType } = this.props;
    let type = '';

    switch (iconType) {
      case 'success':
        type = 'check-circle';
        break;
      case 'fail':
        type = 'error-circle';
        break;
      case 'load':
        type = 'loading';
        content = '加载中...';
        break;
      case 'warn':
        type = 'warnning-solid-circle';
        break;
      default:
        type = '';
    }

    return (
      <div className="pile-toast">
        {iconType && type ? <Icon type={type} size="large" /> : null}
        <div
          className="pile-toast-content"
          ref={t => {
            this.toastContent = t;
          }}
        >
          {content}
        </div>
      </div>
    );
  }
}

ToastContent.propTypes = {
  content: PropTypes.string,
  iconType: PropTypes.oneOf(['success', 'fail', 'load', 'warn', '']),
  duration: PropTypes.number,
  onAnimateLeave: PropTypes.func,
};

ToastContent.defaultProps = {
  content: '',
  iconType: '',
  duration: 3,
  onAnimateLeave: null,
};

export default ToastContent;

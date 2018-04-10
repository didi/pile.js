import React, { Component } from 'react';
import classNames from 'classnames';

class GuideTooltip extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isHide: false,
    };
    this.closeTip = this.closeTip.bind(this);
  }
  componentWillMount() {
    const { placement, isShow, right } = this.props;
    this.handleShowTip(isShow);
    if (placement === 'top') {
      this.setState({
        triangleStyle: 'tb-background-bottom',
      });
    } else if (placement === 'bottom') {
      this.setState({
        triangleStyle: 'tb-background-top',
      });
    } else if (placement === 'left') {
      this.setState({
        triangleStyle: 'tb-background-right',
      });
    } else if (placement === 'right') {
      this.setState({
        triangleStyle: 'tb-background-left',
      });
    }
    if (right) {
      this.setState({
        tooltipStyle: {
          position: 'absolute',
          right,
        },
      });
    }
  }
  componentWillReceiveProps(nextProps) {
    const { isShow } = nextProps;
    this.handleShowTip(isShow);
  }
  handleShowTip(isShow) {
    if (isShow || typeof (isShow) === 'undefined') {
      this.setState({
        isHide: false,
      });
    } else {
      this.setState({
        isHide: true,
      });
    }
  }
  closeTip() {
    this.setState({
      isHide: true,
    });
    if (typeof (this.props.setTooltipClose) === 'function') {
      this.props.setTooltipClose();
    }
  }
  render() {
    const { triangleStyle, isHide, tooltipStyle } = this.state;
    return (
      <div className={classNames('tooltip-box', isHide ? 'hide' : '')} style={tooltipStyle}>
        <span>{this.props.overlay}</span>
        <div className="tip-close" onClick={this.closeTip}>
          <i className="car-icons-shut icon-close-style" />
        </div>
        <div className={classNames('triangle-border', triangleStyle)} />
      </div>);
  }
}
export default GuideTooltip;

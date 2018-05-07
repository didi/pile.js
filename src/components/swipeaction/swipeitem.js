/**
 * Created by yanshenshen on 17/04/10.
 */

import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import Swipe from '../swipe/index';

const { Swipeable } = Swipe;

class SwipeDel extends React.Component {
  static propTypes = {
    buttons: PropTypes.array,
    degree: PropTypes.number,
    index: PropTypes.number,
    show: PropTypes.bool,
    displacement: PropTypes.bool,
    touchDefault: PropTypes.bool,
    touchDefaultBack: PropTypes.func,
    touchBack: PropTypes.func,
  }

  static defaultProps = {
    index: 0, //
    buttons: [], // 按钮信息 { type: 'cancel', label: '取消', onClick: self._confirmcancel }
    degree: 50, // 滑动展示最小值
    show: true, // 是否展开状态（展示状态）
    displacement: false, // 是否位移(已滑动状态)
    touchDefault: false, // 是否有因素影响拖动
    touchDefaultBack: null,
    touchBack: null,
  }

  constructor(props) {
    super(props);
    this.swipingLeft = this.swipingLeft.bind(this);
    this.swiped = this.swiped.bind(this);
  }


  componentDidMount() {
    this.initSetState(this.props);
  }

  componentWillReceiveProps(nextprops) {
    // if (nextprops.show !== this.props.show) {
    this.initSetState(nextprops);
  // }
  }


  // 设置 内容位置以及展开状态
  setContState(pos, touchState) {
    const { delContent } = this;
    const { index, touchBack } = this.props;
    const self = this;

    delContent.style.WebkitTransition = 'all .1s ease-in';
    delContent.style.left = `${-pos}px`;

    setTimeout(() => {
      delContent.style.WebkitTransition = 'none';
      self.setState({
        oldPosX: pos,
      });
      if (touchBack) {
        touchBack({ index, touchState });
      }
    }, 100);
  }

  swipingLeft(e, posX) {
    const self = this;
    const { delContent } = this;
    const { oldPosX, postion } = this.state;
    const { touchDefault, displacement } = this.props;
    let setPosx = oldPosX;

    // 判断是否有因素影响拖动
    if (touchDefault) {
      return false;
    }

    if (displacement) {
      return false;
    }

    // 坐标位置设置
    if (posX <= postion) {
      setPosx = posX;
    } else {
      setPosx = postion + (Math.sqrt(posX - postion) * 3);
    }

    // 弹层跟随坐标
    delContent.style.left = `${-setPosx}px`;
    setTimeout(() => {
      self.setState({
        oldPosX: setPosx,
      });
    }, 30);
    return true;
  }

  initSetState(props) {
    const { delAside, delContent, delSwipContent } = this;
    const { show, displacement } = props;

    this.state = {
      oldPosX: 0,
      postion: delAside.clientWidth,
    };

    delContent.style.WebkitTransition = 'all .1s ease-in';
    delSwipContent.style.cssText = `height:${show ? delContent.clientHeight : 0}px`;

    if (displacement) {
      delContent.style.left = `-${delAside.clientWidth}px`;
    } else {
      delContent.style.left = 0;
    }

    setTimeout(() => {
      delContent.style.WebkitTransition = 'none';
      delContent.style.position = 'absolute';
    }, 100);
  }

  swiped(e, posX) {
    const { oldPosX, postion } = this.state;
    const {
      degree, index, touchDefault, touchDefaultBack, displacement,
    } = this.props;
    const posXabs = Math.abs(posX);

    // 判断当前情景是否可以拖动
    if (!displacement) {
      if (posX < degree) {
        this.setContState(0, false);
        return false;
      }
    }

    // 判断是否有因素影响拖动
    if (touchDefault) {
      if (touchDefaultBack) {
        touchDefaultBack({ index, touchState: false });
      }
      return false;
    }

    const effective = posXabs >= oldPosX && posXabs >= degree;

    if (displacement || !effective) {
      // 关闭状态
      this.setContState(0, false);
    } else {
      this.setContState(postion, true);
    }
    return true;
  }

  renderButtons() {
    return this.props.buttons.map((re, idx) => {
      const { type, label, ...others } = re;
      const className = classNames({
        'btn-default': type !== 'delet' && type !== 'cancel',
        'btn-del': type === 'delet',
        'btn-cancel': type === 'cancel',
      });

      return (
        <a
          key={idx}
          {...others}
          className={className}
        ><span>{label}</span>
        </a>
      );
    });
  }

  render() {
    const { className, children } = this.props;
    const cls = classNames({
      'pile-swipe-del': true,
      [className]: className,
    });
    return (
      <div className={cls} ref={(n) => { this.delSwipContent = n; }}>
        <Swipeable onSwipingLeft={this.swipingLeft} onSwiped={this.swiped}>
          <div className="del-content" ref={(n) => { this.delContent = n; }}>
            {children}
          </div>
          <div className="del-aside" ref={(n) => { this.delAside = n; }}>
            {this.renderButtons()}
          </div>
        </Swipeable>
      </div>
    );
  }
}

export default SwipeDel;

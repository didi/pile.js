/**
 * Created by yanshenshen on 17/04/10.
 */

import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import SwipeItem from './swipeitem';

class SwipeItems extends React.Component {
  /* eslint-disable react/no-unused-prop-types */
  static propTypes = {
    buttons: PropTypes.array,
    shows: PropTypes.array,
    displacements: PropTypes.array,
    disTouchs: PropTypes.array,
    touchDefaults: PropTypes.array,
    itemsTouchBack: PropTypes.func,
  }
  /* eslint-enable react/no-unused-prop-types */

  static defaultProps = {
    buttons: [], // 按钮信息 { type: 'cancel', label: '取消', onClick: self._confirmcancel }
    shows: [], // 数据展开
    displacements: [], // 默认已滑动展开
    disTouchs: [], // 是否可以拖动
    touchDefaults: [], // 是否有因素影响拖动
    itemsTouchBack() {},
  }

  constructor(props) {
    super(props);
    this._touchDefaultBack = this._touchDefaultBack.bind(this);
    this._touchBack = this._touchBack.bind(this);

    this.initSetState(this.props);
  }

  componentWillReceiveProps(nextprops) {
    if (nextprops.buttons !== this.props.buttons || nextprops.shows !== this.props.shows) {
      this.initSetState(nextprops);
    }
  }

  initSetState(props) {
    // 设置 state
    this.state = {
      shows: this.initStateVal(props, 'shows', true),
      displacements: this.initStateVal(props, 'displacements', false),
      disTouchs: this.initStateVal(props, 'disTouchs', true),
      touchDefaults: this.initStateVal(props, 'touchDefaults', false),
    };
  }

  initStateVal(props, key, defaultkey) {
    const newArr = [];
    React.Children.map(this.props.children, (child, i) => {
      let newKey;
      if (props[key][i] === undefined) {
        newKey = defaultkey;
      } else {
        newKey = props[key][i];
      }
      newArr.push(newKey);
    });
    return newArr;
  }

  lotStateVal(key) {
    const newArr = [];
    React.Children.map(this.props.children, () => {
      const newKey = key;
      newArr.push(newKey);
    });
    return newArr;
  }

  singleStateVal(key, index, defaultkey) {
    this.state[key][index] = defaultkey;
    return this.state[key];
  }

  // touch状态下callback
  _touchBack(o) {
    const { itemsTouchBack } = this.props;

    this.setState({
      displacements: this.singleStateVal('touchDefaults', o.index, o.touchState),
      touchDefaults: this.lotStateVal(o.touchState),
    });

    if (itemsTouchBack) {
      itemsTouchBack(o);
    }
  }

  // 有因素影响拖动状态下callback
  _touchDefaultBack(o) {
    this.setState({
      displacements: this.lotStateVal(false),
      touchDefaults: this.lotStateVal(false),
    });

    const { itemsTouchBack } = this.props;
    if (itemsTouchBack) {
      itemsTouchBack(o);
    }
  }

  render() {
    const self = this;
    const { className, buttons } = this.props;
    const {
      disTouchs, shows, touchDefaults, displacements,
    } = this.state;
    const cls = classNames({
      'jimu-swipe-items': true,
      [className]: className,
    });

    const defaultButtons = [
      {
        type: 'delet',
        label: '删除',
        onClick: self._confirmdel,
      },
    ];

    return (
      <div className={cls}>
        {React.Children.map(this.props.children, (child, index) => {
           if (disTouchs[index]) {
             return (
               <SwipeItem
                 key={index}
                 index={index}
                 buttons={buttons[index] || defaultButtons}
                 show={shows[index]}
                 displacement={displacements[index]}
                 touchDefault={touchDefaults[index]}
                 touchDefaultBack={self._touchDefaultBack}
                 touchBack={self._touchBack}
               >
                 {child}
               </SwipeItem>);
           }
             return (<div className="jimu-swipe-del jimu-item-undel" key={index}>{child}</div>);
         })}
      </div>
    );
  }
}

export default SwipeItems;

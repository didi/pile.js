import React, { Component } from 'react';
import classNames from 'classnames';

class PositionSwitch extends Component {
  static defaultProps = {
    width: 80, // 子元素移动的单位宽度
    orderArr: [1, 2, 3, 4], // 子元素排列的数组（数组个数需与自元素的个数一致）
    itemsMoveBack() {}, // 自元素位置移动后的回调
  }

  componentDidMount() {
    const { orderArr } = this.props;
    this.transformMove(orderArr);
  }

  componentWillReceiveProps(nextprops) {
    if (nextprops.orderArr !== this.props.orderArr) {
      this.transformMove(nextprops.orderArr);
    }
  }

  transformMove(obj) {
    const self = this;
    const { width, itemsMoveBack } = this.props;

    if (this.props.children.length !== obj.length) {
      return;
    }

    obj.forEach((re, idx) => {
      self.refs[`move_${re - 1}`].style.webkitTransform = `translate(${width * ((idx - re) + 1)}px,0)`;
    });
    itemsMoveBack && itemsMoveBack({ obj });
  }

  render() {
    const { className, width, children } = this.props;
    const cls = classNames({
      'pile-position-switch': true,
      [className]: className,
    });
    return (
      <div className={cls}>
        {React.Children.map(children, (re, index) => (
          <div
            style={{ width: `${width}px` }}
            ref={`move_${index}`}
            className="pile-move-item"
            key={index}
          >{re}
          </div>
        ))}
      </div>
    );
  }
}

export default PositionSwitch;

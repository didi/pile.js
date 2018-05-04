import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

class Star extends React.Component {
  static setLenArrFuc(len) {
    return Array(len).fill(0);
  }
  static propTypes = {
    len: PropTypes.number,
    defaultVal: PropTypes.number,
    disabled: PropTypes.bool,
    bigger: PropTypes.bool,
    back: PropTypes.func,
  };

  static defaultProps = {
    len: 5, // 个数
    defaultVal: 0, // 默认值
    disabled: false, // 值为 true 时，滑块为禁用状态
    bigger: false, // 值为 true 时，尺寸大
    back() {},
  };

  constructor(props) {
    super(props);
    const { len, defaultVal } = this.props;
    if (len < defaultVal) {
      throw new Error('当前默认值大于len,请检查默认值');
    }
    this.state = {
      currentValue: defaultVal,
      setLenArr: Star.setLenArrFuc(len),
    };
  }

  componentWillReceiveProps(nextProps) {
    this.state = {
      currentValue: nextProps.defaultVal,
      setLenArr: Star.setLenArrFuc(nextProps.len),
    };
  }


  onScore(n) {
    if (this.props.disabled) {
      return;
    }
    this.setState({
      currentValue: n,
    });
    this.props.back && this.props.back(n);
  }

  render() {
    const { className, disabled, bigger } = this.props;
    const { setLenArr, currentValue } = this.state;
    const cls = classNames({
      'pile-score-star': true,
      'pile-score-disabled': disabled,
      'pile-score-bigger': bigger,
      [className]: className,
    });
    return (
      <div className={cls}>
        <div className="pile-star-main">
          {setLenArr.map((re, index) => {
             const strCls = classNames({
               'icon-trip_icon_star': true,
               'icon-trip_icon_star_on': currentValue > index,
             });
             return (<span
               className={strCls}
               key={index}
               onClick={() => { this.onScore(index + 1); }}
             />);
           })}
        </div>
      </div>
    );
  }
}
export default Star;

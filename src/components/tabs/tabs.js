/**
 * Created by yanshenshen on 17/11/2.
*/
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import ReactDOM from 'react-dom';


class Tabs extends React.Component {
  static propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node,
    ]).isRequired,
    activeIndex: PropTypes.number, // 默认索引
    isInLocal: PropTypes.bool, // 默认索引
    onChange: PropTypes.func,
  };

  static defaultProps = {
    activeIndex: 1,
    isInLocal: false,
    onChange() {},
  };

  constructor(props) {
    super(props);
    const { activeIndex, children } = this.props;
    this.state = {
      activeIndex: activeIndex > children.length ? children.length : activeIndex,
    };
    if (activeIndex > children.length) {
      throw new Error('activeIndex值大于了元素个数');
    }

    this.handleTabClick = this.handleTabClick.bind(this);
  }

  componentDidMount() {
    this.setTabHdX(this.state.activeIndex);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.activeIndex !== this.props.activeIndex) {
      this.setState({
        activeIndex: nextProps.activeIndex,
      });
      const { activeIndex, children } = nextProps;
      const newActiveIndex = activeIndex > children.length ? children.length : activeIndex;
      this.state = {
        activeIndex: newActiveIndex,
      };
      if (activeIndex > children.length) {
        throw new Error('activeIndex值大于了元素个数');
      }

      this.setTabHdX(newActiveIndex);
    }
  }


  // 设置当前选中导航位置
  setTabHdX(activeIndex) {
    const { tabsHd } = this;
    const NavNode = this[`tabsNav-${activeIndex}`];
    /* eslint-disable  react/no-find-dom-node */
    const TabsHdWidth = ReactDOM.findDOMNode(tabsHd).clientWidth;
    const NodeLeft = ReactDOM.findDOMNode(NavNode).offsetLeft;
    const NodeWidth = ReactDOM.findDOMNode(NavNode).clientWidth;
    if ((NodeLeft + NodeWidth) > TabsHdWidth) {
      ReactDOM.findDOMNode(tabsHd).scrollTo(NodeLeft, 0);
    }
    /* eslint-enable  react/no-find-dom-node */
  }

  handleTabClick(activeIndex) {
    if (activeIndex === this.state.activeIndex) {
      return;
    }
    this.setState({ activeIndex });
    this.props.onChange({ activeIndex });
  }

  renderTabNav() {
    const { children } = this.props;
    const { activeIndex } = this.state;
    return (
      <div className="jimu-tabs-hd" ref={(n) => { this.tabsHd = n; }}>
        {React.Children.map(children, (child, i) => {
           if (!child) { return null; }
           const navCls = classNames({
             'jimu-tabs-nav': true,
             'jimu-tabs-nav-active': i === (activeIndex - 1),
           });
           return (
             <div
               className={navCls}
               key={i}
               ref={(n) => { this[`tabsNav-${i + 1}`] = n; }}
               onClick={() => { this.handleTabClick(i + 1); }}
             >
               <b className="jimu-tabs-nav-bar">{child.props.tab}</b>
             </div>
           );
         })}
      </div>
    );
  }
  renderTabContent() {
    const { children } = this.props;
    const { activeIndex } = this.state;
    return (
      <div className="jimu-tabs-bd">
        {React.Children.map(children, (child, i) => {
           if (!child) { return null; }
           const contentCls = classNames({
             'jimu-tabs-content': true,
             'jimu-tabs-content-active': i === (activeIndex - 1),
           });
           return (
             <div className={contentCls} key={i}>
               {child}
             </div>
           );
         })}
      </div>
    );
  }
  render() {
    const { className, isInLocal } = this.props;
    const cls = classNames({
      'jimu-tabs': true,
      'jimu-tabs-in-local': isInLocal,
      [className]: className,
    });
    return (
      <div className={cls}>
        {this.renderTabNav()}
        {this.renderTabContent()}
      </div>
    );
  }
}
export default Tabs;
// onClick={self.handleTabClick.bind(this, i + 1)}

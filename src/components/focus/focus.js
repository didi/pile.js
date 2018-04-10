import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Swipe from '../swipe/index';

const { Swipeable } = Swipe;
class Focus extends Component {
  static propTypes = {
    index: PropTypes.number,
    duration: PropTypes.number,
    width: PropTypes.string,
    direction: PropTypes.string,
    loop: PropTypes.bool,
    auto: PropTypes.bool,
  }

  static defaultProps = {
    index: 0,
    width: '375px',
    timer: null,
    loop: true, // 循环
    direction: 'left',
    duration: 200,
    auto: true,
    spotShow: false, // 是否显示指示点
  }

  constructor(props) {
    super(props);

    const {
      index, children, loop,
    } = this.props;
    this.state = {
      index: index > children.length - 1 ? children.length - 1 : index,
      len: children.length,
      // loop : timer ? true : loop
      loop,
    };


    this.touching = this.touching.bind(this);
    this.touchLeft = this.touchLeft.bind(this);
    this.touchRight = this.touchRight.bind(this);
    this.touchEd = this.touchEd.bind(this);
  }

  componentDidMount() {
    const {
      index, width, children, loop,
    } = this.props;
    const itemsWidthNumber = Number(width.split('px')[0]);
    //  setloop = timer ? true : loop;

    this.state = {
      degree: 50,
      index: index > children.length - 1 ? children.length - 1 : index,
      itemsWidthNumber,
      len: children.length,
      loop,
      translateX: loop ? itemsWidthNumber * children.length : 0,
    };
    this.setStyleInit();
  }

  componentWillUnmount() {
    this.mytimer && clearInterval(this.mytimer);
  }

  setStyleInit() {
    const { focusContent } = this;
    const {
      index, itemsWidthNumber, len, loop, translateX,
    } = this.state;

    if (len > 1) {
      if (loop) {
        focusContent.style.width = `${(itemsWidthNumber * len) * 3}px`;
        focusContent.style.left = `${(-itemsWidthNumber * index) - translateX}px`;
      } else {
        focusContent.style.width = `${itemsWidthNumber * len}px`;
        focusContent.style.left = `${-itemsWidthNumber * index}px`;
      }
      this.autoMove();
    }
  }

  touchRight(e, poaX) {
    const { focusContent } = this;
    const {
      index, itemsWidthNumber, translateX, loop,
    } = this.state;

    // 阻止window窗体滚动
    e.preventDefault && e.preventDefault();
    e.stopPropagation && e.stopPropagation();

    focusContent.style.WebkitTransition = 'none';
    if (index === 0) {
      if (loop) {
        focusContent.style.left = `${poaX - translateX}px`;
      } else {
        focusContent.style.left = `${poaX / 5}px`;
      }

      return false;
    }
    focusContent.style.left = `${-((itemsWidthNumber * index) - poaX) - translateX}px`;
    return true;
  }

  touchLeft(e, poaX) {
    const { focusContent } = this;
    const {
      index, itemsWidthNumber, len, loop, translateX,
    } = this.state;
    focusContent.style.WebkitTransition = 'none';

    // 阻止window窗体滚动
    e.preventDefault && e.preventDefault();
    e.stopPropagation && e.stopPropagation();

    if (index === len - 1) {
      if (loop) {
        focusContent.style.left = `${-((itemsWidthNumber * index) + poaX) - translateX}px`;
      } else {
        focusContent.style.left = `${-((itemsWidthNumber * index) + (poaX / 5))}px`;
      }
    } else {
      focusContent.style.left = `${-((itemsWidthNumber * index) + poaX) - translateX}px`;
    }
  }

  touching() {
    const { timer } = this.props;

    if (timer) {
      clearInterval(this.mytimer);
    }
  }

  touchEd(e, poaX) {
    const {
      index, len, loop,
    } = this.state;

    if (poaX < 0) {
      if (!loop && index === 0) {
        this.move(index);
      } else {
        this.move(index - 1);
      }
    }

    if (poaX > 0) {
      if (!loop && index === len - 1) {
        this.move(index);
      } else {
        this.move(index + 1);
      }
    }

    this.autoMove();
  }

  autoMove() {
    const self = this;
    const { direction, timer, auto } = this.props;
    let dir = 1;

    if (direction !== 'left') {
      dir = -1;
    }
    if (auto) {
      clearInterval(self.mytimer);
      self.mytimer = setInterval(() => {
        const autoindex = self.state.index + dir;
        self.move(autoindex);
      }, timer);
    }
  }

  move(index) {
    const {
      itemsWidthNumber, translateX, len, loop,
    } = this.state;
    const { duration } = this.props;
    const { focusContent } = this;

    let stateIndex = index;

    focusContent.style.WebkitTransition = `all ${duration / 1000}s ease-in`;

    if (loop) {
      focusContent.style.left = `${(-itemsWidthNumber * index) - translateX}px`;
      if (index < 0) {
        stateIndex = len - 1;
        setTimeout(() => {
          focusContent.style.WebkitTransition = 'none';
          focusContent.style.left = `${(-itemsWidthNumber * stateIndex) - translateX}px`;
        }, duration);
      }
      if (index >= len) {
        stateIndex = 0;
        setTimeout(() => {
          focusContent.style.WebkitTransition = 'none';
          focusContent.style.left = `${(-itemsWidthNumber * stateIndex) - translateX}px`;
        }, duration);
      }
    } else {
      if (index < 0) {
        stateIndex = len - 1;
      }
      if (index >= len) {
        stateIndex = 0;
      }
      focusContent.style.left = `${-itemsWidthNumber * stateIndex}px`;
    }

    this.setState({
      index: stateIndex,
    });
  }

  render() {
    const {
      className, children, width, spotShow,
    } = this.props;
    const { index, loop } = this.state;

    const cls = classNames({
      'jimu-focus-layout': true,
      [className]: className,
    });

    return (
      <div className={cls} style={{ width }}>
        {children.length > 1 ?
           (
             <Swipeable
               onSwiping={this.touching}
               onSwipingLeft={this.touchLeft}
               onSwipingRight={this.touchRight}
               onSwiped={this.touchEd}
             >
               {loop ?
                (
                  <div className="jimu-focus-content" ref={(t) => { this.focusContent = t; }}>
                    {children.map((re, i) => (<div className="jimu-focus-items" style={{ width }} key={i}>{re}</div>))}
                    {children.map((re, i) => (<div className="jimu-focus-items" style={{ width }} key={i}>{re}</div>))}
                    {children.map((re, i) => (<div className="jimu-focus-items" style={{ width }} key={i}>{re}</div>))}
                  </div>
                )
                : (
                  <div className="jimu-focus-content" ref={(t) => { this.focusContent = t; }}>
                    {children.map((re, i) => (<div className="jimu-focus-items" style={{ width }} key={i}>{re}</div>))}
                  </div>
                )}
               <div className="jimu-focus-ft">
                 {spotShow && children.map((re, i) => {
                  if (i === index) {
                    return (<span className="jimu-focus-ftitems jimu-focus-current" key={i} />);
                  }
                    return (<span className="jimu-focus-ftitems" key={i} />);
                })}
               </div>
             </Swipeable>
           )
           :
           (
             <div className="jimu-focus-content" ref={(t) => { this.focusContent = t; }}>
               <div className="jimu-focus-items" style={{ width }}>
                 {children}
               </div>
             </div>
           )}
      </div>
    );
  }
}

export default Focus;

/* yanshenshen 2017、11、20 */
import React, { Component } from 'react';
import classNames from 'classnames';

class Grid extends Component {
  componentDidMount() {}

  render() {
    const {
      flexCells, className, children, ...others
    } = this.props;
    const cls = classNames({
      'jimu-grid': true,
      'jimu-grid-flex': flexCells,
      [className]: className,
    });
    return (
      <div className={cls} {...others}>
        {React.Children.map(children, (child, i) => {
           if (!child) { return null; }
           const contentCls = classNames({
             'jimu-cell': true,
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
}

export default Grid;

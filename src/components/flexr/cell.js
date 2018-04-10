import StyleSheet from 'stilr';
import React from 'react';
import PropTypes from 'prop-types';
import { findMatch, settings, vertical, variables, assign } from './utils';
import stylesheet from './stylesheet';

const ERGONOMICS = Object.keys(settings);

const cellStyles = StyleSheet.create({
  base: {
    padding: `0 ${variables.gutter}`,
  },
  baseFlex: {
    flex: 1,
  },
  flex: {
    display: 'flex',
  },
  top: {
    alignSelf: vertical.top,
  },
  bottom: {
    alignSelf: vertical.bottom,
  },
  center: {
    alignSelf: vertical.center,
  },
}, stylesheet);

class Cell extends React.Component {
  static calcWidth(size) {
    if (typeof size === 'number') {
      return {
        width: size < 1 ? `${Math.round(size * 10000) / 100}%` : `${size}px`,
      };
    }

    const [numerator, denominator] = size ? size.split('/') : [];
    return {
      width: `${(100 / denominator) * numerator}%`,
    };
  }
  /* eslint-disable react/require-default-props */
  static propTypes = {
    grow: PropTypes.oneOf([false, true, PropTypes.number]),
    gutter: PropTypes.string,
    flex: PropTypes.bool,
    align: PropTypes.oneOf(['top', 'center', 'bottom']),
    size: (props, propName) => {
      const value = props[propName];
      if (value && !(typeof value === 'number' || (typeof value === 'string' && /^[0-9]+\/[0-9]+$/.test(value)))) {
        return new Error('Size should be a fraction (e.g. 1/6) or a number for fixed size');
      }
      return true;
    },
  }
  /* eslint-enable react/require-default-props */

  static defaultProps = {
    grow: false,
    gutter: '',
    flex: true,
    align: null,
  }

  getDefinedBreakpoints = () => {
    const breakpoints = [];

    for (let i = 0, len = ERGONOMICS.length; i < len; i++) {
      if (this.props[ERGONOMICS[i]]) breakpoints.push(ERGONOMICS[i]);
    }

    return breakpoints;
  }

  getMatchingBreakpoint = () => this.props[
    findMatch(...this.getDefinedBreakpoints())
  ]


  handleFlexSize = (breakpoint) => {
    const { grow, size } = this.props;
    /* eslint-disable no-nested-ternary */
    const growStyle = typeof grow === 'number'
      ? grow
      : grow === false
        ? 0
        : undefined;

    return breakpoint && breakpoint !== 'hidden'
      ? this.calcWidth(breakpoint)
      : size
        ? this.calcWidth(size)
        : growStyle !== undefined
          ? {
            flex: `${growStyle} 1 auto`,
            WebkitFlex: `${growStyle} 1 auto`,
            msFlex: `${growStyle} 1 auto`,
          }
          : null;
    /* eslint-enable no-nested-ternary */
  }

  render() {
    const {
      gutter,
      flex,
      className,
      align,
      style,
      children,
      ...rest
    } = this.props;

    const breakpoint = this.getMatchingBreakpoint();

    // Return early for performance
    if (breakpoint === 'hidden') {
      return null;
    }

    const flexSize = this.handleFlexSize(breakpoint);

    this.styles = assign(
      {},
      gutter
        ? { padding: `0 ${gutter}` }
        : null,
      flexSize,
      style,
    );

    const classes = [
      cellStyles.base,
      flexSize
        ? null
        : cellStyles.baseFlex,
      className,
      flex
        ? cellStyles.flex : null,
      align
        ? cellStyles[align]
        : null,
    ].filter(Boolean).join(' ');

    return (
      <div
        {...rest}
        style={this.styles}
        className={classes}
      >
        { children }
      </div>
    );
  }
}

export default Cell;

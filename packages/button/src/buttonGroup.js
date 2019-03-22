import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { compose, prefixClsProperty, sizeProperty, sizes } from '@pile/shared';

const ButtonGroup = ({
  prefixCls,
  className,
  children,
  block,
  divide,
  borderColor,
  ...props
}) => {
  const cls = classNames({
    [`${prefixCls}-btn-group`]: true,
    'is-divide': divide,
    [className]: className,
  });
  return (
    <div className={cls} {...props}>
      {React.Children.map(children, child =>
        React.cloneElement(child, {
          block,
          style: {
            ...child.props.style,
            borderColor,
          },
        })
      )}
    </div>
  );
};

ButtonGroup.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  className: PropTypes.string,
  block: PropTypes.bool,
  divide: PropTypes.bool,
  borderColor: PropTypes.string,
};

ButtonGroup.defaultProps = {
  className: null,
  block: null,
  divide: false,
  borderColor: null,
};

const enhance = compose(
  sizeProperty([sizes.SMALL, sizes.LARGE]),
  prefixClsProperty
);

export default enhance(ButtonGroup);

import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';
import { compose, prefixClsProperty, sizeProperty, sizes } from '@pile/shared';

const Icon = ({ prefixCls, type, size, className, ...props }) => {
  const cls = classNames({
    [`${prefixCls}-icon-${type}`]: true,
    [className]: className,
    [size]: size,
  });

  return <i className={cls} {...props} />;
};

Icon.propTypes = {
  type: PropTypes.string.isRequired,
};

const enhance = compose(
  sizeProperty([sizes.SMALL, sizes.LARGE]),
  prefixClsProperty
);

export default enhance(Icon);

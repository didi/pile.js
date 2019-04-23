import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';

const FieldSet = ({ prefixCls, className, children, title }) => {
  const cls = classNames({
    [prefixCls]: true,
    [className]: className,
  });

  return (
    <div className={cls}>
      {title && <div className={`${prefixCls}--title`}>{title}</div>}
      {children}
    </div>
  );
};

FieldSet.propTypes = {
  prefixCls: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  title: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};
FieldSet.defaultProps = {
  prefixCls: 'pile-fieldset',
  children: null,
  title: '',
};

export default FieldSet;

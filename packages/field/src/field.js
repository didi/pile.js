import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';

const Field = ({
  prefixCls,
  className,
  children,
  value,
  placeholder,
  align,
  onClick,
  arrow,
  extraAfter,
  labelEllipsis,
  valueEllipsis,
}) => {
  const cls = classNames({
    [prefixCls]: true,
    [className]: className,
    'is-clickable': !!onClick,
  });

  const labelCls = classNames({
    [`${prefixCls}--label`]: true,
    'is-ellips': labelEllipsis,
  });

  const valueCls = classNames({
    [`${prefixCls}-value`]: true,
    'is-placeholder': !value,
    'is-right': align === 'right',
  });

  const wrapperCls = classNames({
    [`${prefixCls}-value--wrapper`]: true,
    'is-ellips': valueEllipsis,
  });

  return (
    <div
      className={cls}
      role="button"
      tabIndex="0"
      onClick={onClick ? e => onClick(value, e) : null}
      onKeyUp={e => {
        if (e.keyCode === 13) {
          e.preventDefault();
          if (onClick) onClick(value, e);
        }
      }}
    >
      <div className={labelCls}>{children}</div>
      <div className={valueCls}>
        <div className={wrapperCls}>{value || placeholder}</div>
      </div>
      <div className={`${prefixCls}--extraAfter`}>{extraAfter}</div>
      {arrow && <div className={`${prefixCls}--icon pile-icon-arrow-right`} />}
    </div>
  );
};

Field.propTypes = {
  prefixCls: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  value: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  placeholder: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  align: PropTypes.oneOf(['left', 'right']),
  onClick: PropTypes.func,
  arrow: PropTypes.bool,
  extraAfter: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  labelEllipsis: PropTypes.bool,
  valueEllipsis: PropTypes.bool,
};
Field.defaultProps = {
  prefixCls: 'pile-field',
  children: null,
  value: null,
  placeholder: null,
  align: 'left',
  onClick: null,
  arrow: false,
  extraAfter: null,
  labelEllipsis: false,
  valueEllipsis: true,
};

export default Field;

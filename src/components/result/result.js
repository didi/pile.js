/**
 * Created by yanshenshen on 17/10/24.
 */
import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

const propTypes = {
  message: PropTypes.string,
  size: PropTypes.string,
  title: PropTypes.string,
};
const defaultProps = {
  title: '',
  message: false,
  size: 'big',
};

const Result = (props) => {
  const {
    title, message, className, iconHtml, size, ...others
  } = props;
  const cls = classNames({
    'pile-result': true,
    [`pile-result-size-${size}`]: true,
    [className]: className,
  });
  return (
    <div className={cls} {...others}>
      <div className="pile-result-aside">
        <div className="pile-result-icon">
          {iconHtml}
        </div>
      </div>
      <div className="pile-result-article">
        {title && <div className="pile-result-title">{title}</div>}
        {message && <div className="pile-result-message">{message}</div>}
      </div>
    </div>
  );
};

Result.propTypes = propTypes;
Result.defaultProps = defaultProps;

export default Result;

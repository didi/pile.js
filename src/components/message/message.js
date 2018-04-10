/**
 * zhangjingwei 03/20/2017
 */
import React from 'react';

const Message = (props) => {
  const {
    children, ...others
  } = props;
  return (
    <div className="jimu_message">
      <div {...others}>
        {children}
      </div>
    </div>
  );
};

export default Message;

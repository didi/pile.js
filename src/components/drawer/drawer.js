import React from 'react';

const Drawer = (props) => {
  const { normalMsg, children, ...others } = props;
  return (
    <div className="drawer" {...others}>
      {children && <div>{children}</div>}
      <div>
        <p>
          {normalMsg}
        </p>
      </div>
    </div>
  );
};

export default Drawer;


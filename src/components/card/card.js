/**
 * zhangjingwei 03/20/2017
 */
import React from 'react';

const Card = ({ children = null, ...props }) => (
  <div className="jimu_card">
    <div {...props}>
      {children}
    </div>
  </div>
);

export default Card;

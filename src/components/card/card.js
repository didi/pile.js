/**
 * zhangjingwei 03/20/2017
 */
import React from 'react';

const Card = ({ children = null, ...props }) => (
  <div className="pile_card">
    <div {...props}>
      {children}
    </div>
  </div>
);

export default Card;

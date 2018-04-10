import React from 'react';
import { render } from 'react-dom';
import BasicExample from './app';

render(
  <div id="rootContent">
    <BasicExample />
  </div>,
  document.getElementById('root'),
);

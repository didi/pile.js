import * as React from 'react';
import docMd from '../../docs/inputfiled.md';
import Markdown from '../../markdown';

const InputFiled = () => (
  <div style={{ backgroundColor: '#f5f5f9' }}>
    <Markdown input={docMd} />
  </div>
);

export default InputFiled;

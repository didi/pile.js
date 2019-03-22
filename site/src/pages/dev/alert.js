import * as React from 'react';
import docMd from '../../docs/alert.md';
import Markdown from '../../markdown';

const Alert = () => (
  <div>
    <Markdown input={docMd} />
  </div>
);

export default Alert;

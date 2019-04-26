import * as React from 'react'
import docMd from '../../docs/validator.md'
import Markdown from '../../markdown'

const Validator = () => (
  <div><Markdown input={docMd} /></div>
)

export default Validator

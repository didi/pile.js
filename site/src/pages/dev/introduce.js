import * as React from 'react'
import introduceMd from '../../docs/introduce.md'
import Markdown from '../../markdown'

const Introduce = () => (
  <div>
    <Markdown input={introduceMd} />
  </div>
)

export default Introduce

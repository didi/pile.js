# Pile [![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/) [![license Apache 2.0](https://img.shields.io/badge/license-Apache--2.0-blue.svg)](https://www.npmjs.com/package/pile)

A lightweight mobile components library build with [React](http://facebook.github.io/react/).

[![pile](https://nodei.co/npm/pile-ui.png)](https://www.npmjs.com/package/pile-ui)

## Docs

[View the docs here](https://didi.github.io/pile.js/docs/)

[1.x docs](https://didi.github.io/pile.js/1.x/docs/)

## Dependences

* react@16.x
* react-dom@16.x

## Installation


```
npm i pile-ui@latest --save

// import css
npm i @pile/theme-default
```

import component

```js

// style1
import {Button} from 'pile-ui'

// single component
import Button from '@pile/button'
```


import all css

```js
import '@pile/theme-default/lib/index.min.css'
```

import single css

```js
import '@pile/theme-default/lib/button.min.css'
```

## Example

We have several examples on the documentation. Here is the first one to get you started:

```jsx
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Button } from 'pile-ui'
import '@pile/theme-default/lib/index.min.css'

class App extends Component {
    render() {
        return (
            <Button>hello Pile</Button>
        );
    }
}

ReactDOM.render((
    <App/>
), document.getElementById('container'));
```



## Development

```js
git clone git@github.com:didi/pile.js.git
cd pile.js
npm install
npm start
```

css build

```
cd packages/theme-default
npm run build
```

```bash
npm run build
```

Build single package by running the following:

```bash
npm run build -- --scope "@pile/button"
```

Build multiple packages where scope is a glob expression:

```bash
npm run build -- --scope "{@pile/button,@pile/icon}"
```

Watch all filters (auto-rebuild upon src changes):

```bash
npm run watch
```

## Contributing

Welcome to contribute by creating issues or sending pull requests. See [Contributing Guide](https://github.com/didi/pile.js/tree/master/.github/CONTRIBUTING.md) for guidelines.


## License

pile is licensed under the Apache License 2.0. See the [LICENSE](https://github.com/didi/pile.js/tree/master/LICENSE) file.

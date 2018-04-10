 module.exports = {
    "extends": "airbnb",
    "parser": "babel-eslint",// 使用非默认的 babel-eslint 作为代码解析器. 这样 eslint 就能识别 babel 语法的代码
     globals: {
      sessionStorage: false,
      window: false,
      Headers: false,
      rootPath: false,
      document: false,
      Swiper: false,
      DDMap: false,
      Raven: false,
      Omega: false,
      Image: false,
    },

    rules: {
      'camelcase': 0,
      'no-unused-expressions': [1, { 'allowShortCircuit': true }],
      'no-plusplus': [1, { "allowForLoopAfterthoughts": true }],
      'no-use-before-define': [1, { "functions": false }],
      'no-restricted-syntax': 0,
      'react/prop-types': 0,
      'import/extensions': 0,
      'import/no-unresolved': 0,
      'react/no-array-index-key': 0,
      'import/no-extraneous-dependencies': 0,
      "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
      'jsx-a11y/click-events-have-key-events': 0,
      'jsx-a11y/no-noninteractive-element-interactions': 0,
      'jsx-a11y/no-static-element-interactions': 0,
      'no-mixed-operators': 0,
      'no-param-reassign': 0,
      'react/jsx-no-bind': 0,
      'react/forbid-prop-types': 0,
      'react/default-props-match-prop-types': 0,
      'react/no-string-refs': 0,
      'jsx-a11y/anchor-is-valid': 0,
      'no-underscore-dangle': 0,
      "prefer-destructuring": [1, {"object": true, "array": false}],
    }
};


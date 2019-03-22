/* eslint-disable global-require */
const design = {
  designRule: {
    latentRules: require('./designSpec/latentRules'),
    clearSighted: require('./designSpec/clearSighted'),
  },
  designStyle: {
    text: require('./designSpec/text'),
    icon: require('./designSpec/icon'),
  },
  components: {
    Basic: {
      icon: require('./designSpec/components/icon'),
    },
    Form: {
      input: require('./designSpec/components/input'),
    },
  },
};
const component = {
  'quick-start': require('./quickStart'),
  'custom-theme': require('./customTheme'),
  i18n: require('./i18n'),
  components: {
    Basic: {
      icon: require('./components/icon'),
      button: require('./components/button'),
    },
    Form: {
      radio: require('./components/radio'),
      checkbox: require('./components/checkbox'),
      input: require('./components/input'),
      switch: require('./components/switch'),
    },
    Data: {
      list: require('./components/list'),
    },
    Notice: {
      totast: require('./components/totast'),
      alert: require('./components/alert'),
      confirm: require('./components/confirm'),
      loading: require('./components/loading'),
    },
    Others: {
      card: require('./components/card'),
    },
  },
};


export default { design, component };

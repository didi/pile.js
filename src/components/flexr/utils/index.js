export const canUseDOM = (() => (
  typeof window !== 'undefined'
    && window.document
    && window.document.createElement
    && window.matchMedia
))();

export const settings = {
  palm: { max: 600 },
  lap: { max: 959, min: 601 },
  portable: { max: 959 },
  desk: { min: 960 },
};

export function generateMatchMediaString({ min, max }) {
  const minStr = min
    ? `(min-width: ${min}px)`
    : null;
  const maxStr = max
    ? `(max-width: ${max}px)`
    : null;

  const str = minStr && maxStr
    ? `${minStr} and ${maxStr}`
    : minStr || maxStr;

  return str;
}

export const matchMediaQueries = Object.keys(settings).reduce((acc, breakpoint) => {
  acc[breakpoint] = generateMatchMediaString(settings[breakpoint]);
  return acc;
}, {});

export const mediaQueries = Object.keys(matchMediaQueries).reduce((acc, breakpoint) => {
  acc[breakpoint] = `@media screen and ${matchMediaQueries[breakpoint]}`;
  return acc;
}, {});

let breakpoints = [];
let breakpointsString = '';


export function setBreakpoints(arr) {
  breakpoints = arr;
  breakpointsString = breakpoints.toString();
  return breakpoints;
}

export function getBreakpoints(asString) {
  return asString
    ? breakpointsString
    : [].concat(breakpoints);
}

export function clearBreakpoints() {
  breakpoints = [];
  return breakpoints;
}

export function isDifferent(arr) {
  return arr.toString() !== breakpointsString;
}

export function findBreakpoints() {
  if (!canUseDOM) return getBreakpoints();

  const newBreakpoints = Object.keys(matchMediaQueries)
    .filter(breakpoint => window.matchMedia(matchMediaQueries[breakpoint]).matches);

  return isDifferent(newBreakpoints) && setBreakpoints(newBreakpoints);
}

let initialized = false;
export function initBreakpoints() {
  if (!initialized) {
    initialized = true;
    findBreakpoints();
  }
}

export const optimizedResize = (function optimizedResize() {
  const callbacks = new Map();
  let running = false;

  function resize() {
    if (!running) {
      running = true;

      if (window.requestAnimationFrame) {
        window.requestAnimationFrame(runCallbacks);
      } else {
        setTimeout(runCallbacks, 66);
      }
    }
  }

  function runCallbacks() {
    const values = callbacks.values();
    let more = true;
    while (more) {
      const { done, value: callback } = values.next();
      if (done) {
        (more = false);
      } else {
        callback();
      }
    }
    running = false;
  }

  function addCallback(callback, key) {
    if (typeof callback === 'function') {
      callbacks.set(key || callback, callback);
    }
  }

  function removeCallback(key) {
    callbacks.delete(key);
  }

  return {
    init(callback) {
      window.addEventListener('resize', resize);
      addCallback(callback);
    },
    add(callback, key) {
      addCallback(callback, key);
    },
    remove(key) {
      removeCallback(key);
    },
  };
}());

export function findMatch(...arr) {
  let breakpoint = false;
  if (!arr || arr.length === 0) return breakpoint;
  if (breakpoints.length === 0) findBreakpoints();

  for (let i = 0, len = arr.length; i < len; i++) {
    if (breakpoints.indexOf(arr[i]) !== -1) {
      breakpoint = arr[i];
      break;
    }
  }

  return breakpoint;
}

const valunit = /(\d+)(\w+)/;
export function doubleUnit(str) {
  const [, val, unit] = str.match(valunit);
  return `${val * 2}${unit}`;
}

export const vertical = {
  top: 'flex-start',
  center: 'center',
  bottom: 'flex-end',
};

export const horizontal = {
  left: 'flex-start',
  center: 'center',
  right: 'flex-end',
};

export const variables = {
  gutter: '11px',
};

export function assign(target) {
  if (target == null) {
    throw new TypeError('Object.assign target cannot be null or undefined');
  }

  const to = Object(target);
  const { hasOwnProperty } = Object.prototype;

  /* eslint-disable prefer-rest-params,no-continue */
  for (let nextIndex = 1; nextIndex < arguments.length; nextIndex++) {
    const nextSource = arguments[nextIndex];
    if (nextSource == null) {
      continue;
    }
    /* eslint-enable prefer-rest-params,no-continue */
    const source = Object(nextSource);

    // We don't currently support accessors nor proxies. Therefore this
    // copy cannot throw. If we ever supported this then we must handle
    // exceptions and side-effects. We don't support symbols so they won't
    // be transferred.

    for (const key in source) {
      if (hasOwnProperty.call(source, key)) {
        to[key] = source[key];
      }
    }
  }

  return to;
}

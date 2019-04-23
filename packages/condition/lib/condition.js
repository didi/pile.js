/*!
 * @pile-ui/condition.js v2.0.5-alpha.0
 * (c) 2018-2019 renmaomin <renmaomin@126.com> (https://github.com/renmm)
 * Released under the MIT License.
 */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var PropTypes = require('prop-types');

var IfComponent = function IfComponent(_ref) {
  var when = _ref.when,
      children = _ref.children;
  if (!when) return null;
  return children();
};

IfComponent.propTypes = {
  when: PropTypes.bool.isRequired,
  children: PropTypes.func.isRequired
};

/* eslint-disable import/prefer-default-export */

exports.IfComponent = IfComponent;
//# sourceMappingURL=condition.js.map

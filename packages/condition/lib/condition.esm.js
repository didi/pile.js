/*!
 * @pile-ui/condition.js v2.0.5-alpha.0
 * (c) 2018-2019 renmaomin <renmaomin@126.com> (https://github.com/renmm)
 * Released under the MIT License.
 */
import { bool, func } from 'prop-types';

var IfComponent = function IfComponent(_ref) {
  var when = _ref.when,
      children = _ref.children;
  if (!when) return null;
  return children();
};

IfComponent.propTypes = {
  when: bool.isRequired,
  children: func.isRequired
};

/* eslint-disable import/prefer-default-export */

export { IfComponent };
//# sourceMappingURL=condition.esm.js.map

/**
 * @author renmaomin@126.com
 */
import { expect } from 'chai';
import { compose } from '../src';

describe('utils suite', () => {
  it('compose function has the function of a composite function', () => {
    const add = (a, b) => a + b;
    const square = a => a * a;

    const c1 = compose(square, add);
    expect(c1(1, 2)).to.equal(square(add(1, 2)));
  });
});

import { required } from './required';
import { sameAs } from './same-as';

describe('validator', () => {
  it('required', () => {
    expect(required.type).toEqual('required');

    expect(required(void 0)).toBe(false);
    expect(required(null)).toBe(false);
    expect(required(false)).toBe(false);
    expect(required('')).toBe(false);
    expect(required([])).toBe(false);
    expect(required({})).toBe(false);

    expect(required(true)).toBe(true);
    expect(required('a')).toBe(true);
    expect(required([''])).toBe(true);
    expect(required({ a: 'b' })).toBe(true);
  });

  it('sameAs', () => {
    const sameAsFoo = sameAs('foo');
    expect(sameAsFoo.type).toEqual('sameAs');
    expect(sameAsFoo.prop).toEqual('foo');

    expect(sameAsFoo('bar', { foo: 'bar' })).toBe(true);

    expect(sameAsFoo('bar')).toBe(false);
    expect(sameAsFoo('bar', {})).toBe(false);
    expect(sameAsFoo('bar', [])).toBe(false);
    expect(sameAsFoo('bar', { foo: 'bar2' })).toBe(false);
  });
});

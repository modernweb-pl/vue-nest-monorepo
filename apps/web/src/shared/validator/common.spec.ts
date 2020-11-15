import { createValidator, isEmpty } from './common';

describe('validator common', () => {
  it('isEmpty', () => {
    expect(isEmpty(void 0)).toBe(true);
    expect(isEmpty(null)).toBe(true);
    expect(isEmpty(false)).toBe(true);
    expect(isEmpty([])).toBe(true);
    expect(isEmpty('')).toBe(true);
    expect(isEmpty(' ')).toBe(true);
    expect(isEmpty({})).toBe(true);
    expect(isEmpty(new Date('aaaa'))).toBe(true);

    expect(isEmpty(true)).toBe(false);
    expect(isEmpty([''])).toBe(false);
    expect(isEmpty({ a: void 0 })).toBe(false);
    expect(isEmpty(() => void 0)).toBe(false);
  });

  it('createValidator', () => {
    const isFoo = createValidator((value: string) => value === 'foo', {
      type: 'isFoo',
      custom: 'foo',
    });

    expect(isFoo.type).toEqual('isFoo');
    expect(isFoo.custom).toEqual('foo');
    expect(isFoo('foo')).toEqual(true);
  });
});

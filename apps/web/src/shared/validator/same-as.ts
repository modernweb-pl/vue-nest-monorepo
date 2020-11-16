import { createValidator } from './common';

export const sameAs = (prop: string) =>
  createValidator((val, context) => val === (context || {})[prop], {
    type: 'sameAs',
    prop,
  });

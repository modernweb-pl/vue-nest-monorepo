import { createValidator, isEmpty } from './common';

export const required = createValidator((val) => !isEmpty(val), { type: 'required' });

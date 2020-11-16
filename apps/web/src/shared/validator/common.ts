import { Validator, ValidatorParams } from './types';

export function isEmpty(value: any): boolean {
  if (!value) {
    return true;
  }

  if (Array.isArray(value)) {
    return !value.length;
  }

  if (value instanceof Date) {
    // invalid date is considered "empty"
    return isNaN(value.getTime());
  }

  if (typeof value === 'object') {
    return !Object.keys(value).length;
  }

  return !String(value).trim().length;
}

export const createValidator = <T extends ValidatorParams>(
  fn: (value: any, context?: any) => boolean,
  params: T,
): Validator<T> => Object.assign(fn.bind(void 0), params);

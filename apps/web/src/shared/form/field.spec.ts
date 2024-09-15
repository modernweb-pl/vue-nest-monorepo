import { createValidator, required } from '../validator';
import { formFieldFactory } from './field';

describe('form field', () => {
  it('initial state', () => {
    const field = formFieldFactory('foo');

    expect(field.name).toEqual('foo');
    expect(field.defaultValue).toEqual(void 0);
    expect(field.validators).toEqual({});
    expect(field.context).toEqual({});

    expect(field.$model).toEqual(void 0);
    expect(field.$v).toEqual({});
    expect(field.$valid).toEqual(null);
  });

  it('valid depends on touched', () => {
    const field = formFieldFactory('foo', {
      validators: {
        required,
      },
    });

    expect(field.$valid).toBe(null);
    field.$touch();
    expect(field.$valid).toBe(false);
    field.$model = 'foo';
    expect(field.$valid).toBe(true);
  });

  it('validator params', () => {
    const field = formFieldFactory('foo', {
      defaultValue: '',
      validators: {
        required,
        custom: createValidator((v: string) => v.includes('foo'), {
          type: 'custom',
          param: 'foo',
        }),
      },
    });

    field.$touch();
    expect(field.$v).toEqual({
      required: { type: 'required' },
      custom: { type: 'custom', param: 'foo' },
    });

    field.$model = 'value';
    expect(field.$v).toEqual({
      custom: { type: 'custom', param: 'foo' },
    });

    field.$model = 'foo';
    expect(field.$v).toEqual({});
  });

  it('passes context to validator', () => {
    const validator = jest.fn().mockReturnValue(true);
    const field = formFieldFactory('foo', {
      defaultValue: '',
      context: {
        bar: 'baz',
      },
      validators: {
        custom: createValidator(validator, { type: 'custom' }),
      },
    });

    expect(validator).not.toHaveBeenCalled();
    field.$touch();
    expect(field.$valid).toBe(true);
    expect(validator).toHaveBeenCalledTimes(1);
    expect(validator).toHaveBeenCalledWith('', { bar: 'baz' });
  });
});

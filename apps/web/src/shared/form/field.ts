import Vue, { PropType } from 'vue';
import { objectKeys } from '../helper';
import { Validator, ValidatorParams } from '../validator';
import { FormFieldVm, ValidatorMap } from './types';

const FormFieldVm = Vue.extend({
  props: {
    name: {
      type: String,
      required: true,
      validator: (val: string) => val.length > 0,
    },
    defaultValue: {},
    validators: {
      type: Object as PropType<ValidatorMap>,
      default: () => ({}),
    },
    context: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      value: this.defaultValue,
      touched: false,
    };
  },
  computed: {
    $model: {
      get(): any {
        return this.value;
      },
      set(val: any) {
        this.value = val;
      },
    },
    $v(): Record<string, ValidatorParams> {
      if (!this.touched) {
        return {};
      }

      return objectKeys(this.validators).reduce((acc, key) => {
        const validator = this.validators[key];
        if (!validator(this.value, this.context)) {
          acc[key] = { ...validator };
        }

        return acc;
      }, {} as Record<string, ValidatorParams>);
    },
    $valid(): boolean | null {
      if (!this.touched) {
        return null;
      }
      return !objectKeys(this.$v).length;
    },
  },
  methods: {
    $touch() {
      this.touched = true;
    },
    $reset(value?: any) {
      this.value = value || this.defaultValue;
      this.touched = false;
    },
  },
});

export const formFieldFactory = <T = any>(
  name: string,
  opts?: { defaultValue?: T; validators?: Record<string, Validator>; context?: any },
): FormFieldVm<T> => {
  const { defaultValue, validators, context } = opts || {};

  return new FormFieldVm({
    propsData: {
      name,
      defaultValue,
      validators,
      context,
    },
  });
};

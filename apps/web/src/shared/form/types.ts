import Vue from 'vue';
import { Validator, ValidatorParams } from '../validator';

export type ValidatorMap = Record<string, Validator>;

export type FormFieldVm<T> = Vue & {
  readonly name: string;
  readonly defaultValue: T;
  readonly validators: ValidatorMap;
  readonly context: any;
  readonly touched: boolean;

  $model: T;
  $v: Record<string, ValidatorParams>;
  $valid: boolean | null;

  $touch(): void;
  $reset(value?: any): void;
};

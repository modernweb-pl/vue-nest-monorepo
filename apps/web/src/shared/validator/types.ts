export type ValidatorParams = { type: string; [key: string]: any };

export type Validator<T extends ValidatorParams = any> = {
  (value: any, context?: any): boolean;
} & T;

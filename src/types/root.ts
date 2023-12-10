export type Func = (...args: any[]) => any;

export type DeepReadonly<T extends object> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly<T[K]> : T[K];
};

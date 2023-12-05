export const isArray = <T = unknown>(val: unknown): val is Array<T> => Array.isArray(val);

export const isBoolean = (val: unknown): val is boolean => toType(val) === 'boolean';

export const isEmpty = (val: unknown | Record<string, unknown>): boolean => {
  if (isArray(val)) {
    return !val.length;
  }

  if (isObject(val)) {
    return Object.keys(val as Record<string, unknown>).length === 0;
  }

  return val === null || val === undefined || val === '';
};

export const isUnDef = (val: unknown): val is undefined => toType(val) === 'undefined';

export const isNull = (val: unknown): val is null => val === null;

export const isDate = (val: unknown): val is Date => val instanceof Date;

export const isFunction = (val: unknown): val is (...args: any[]) => any =>
  toType(val) === 'function';

export const isNumber = (val: unknown): val is number => toType(val) === 'number';

export const isObject = (val: unknown): val is object => toType(val) === 'object';

export const isPlainObject = (obj: unknown): boolean =>
  Object.prototype.toString.call(obj) === '[object Object]';

export const isString = (val: unknown): val is string => toType(val) === 'string';

export const toType = (val: unknown) => typeof val;

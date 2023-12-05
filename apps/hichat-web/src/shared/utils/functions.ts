export function debounce<T extends unknown[], U>(
  callback: (...args: T) => PromiseLike<U> | U,
  /** Default is 0. */
  wait = 0,
) {
  let timer = -1;
  return function (this: unknown, ...args: T): Promise<U> {
    clearTimeout(timer);
    return new Promise((resolve) => {
      timer = window.setTimeout(() => {
        resolve(callback.call(this, ...args));
      }, wait);
    });
  };
}

export function throttle<T extends unknown[], U>(
  callback: (...args: T) => PromiseLike<U> | U,
  /** Default is 0. */
  wait = 500,
) {
  let canRun = true;
  return function (this: unknown, ...args: T): Promise<U> | void {
    if (!canRun) return;
    canRun = false;
    return new Promise((resolve) => {
      window.setTimeout(() => {
        canRun = true;
        resolve(callback.call(this, ...args));
      }, wait);
    });
  };
}

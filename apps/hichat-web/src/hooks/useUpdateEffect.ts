/* eslint-disable */
import { useRef, useEffect } from 'react';

export const useUpdateEffect = (fn: Function, deps = []) => {
  const mounted = useRef(false);
  return useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
      return;
    }

    return fn && fn();
  }, deps);
};

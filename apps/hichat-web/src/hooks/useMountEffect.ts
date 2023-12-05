/* eslint-disable */
import { useRef, useEffect } from 'react';

/**
 * Custom hook to run a mount effect only once.
 * @param {*} fn the callback function
 * @returns the hook
 */
export const useMountEffect = (fn: Function) => {
  const mounted = useRef(false);
  return useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
      return fn && fn();
    }
  }, []);
};

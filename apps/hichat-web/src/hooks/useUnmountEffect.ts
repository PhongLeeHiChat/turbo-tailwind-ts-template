/* eslint-disable */
import { useEffect } from 'react';

export const useUnmountEffect = (fn: Function) => useEffect(() => fn && fn(), []);

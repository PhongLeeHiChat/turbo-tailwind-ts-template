import { useEffect } from 'react';

export const useUnmountEffect = (fn: void | (() => void)) => useEffect(() => fn, []);

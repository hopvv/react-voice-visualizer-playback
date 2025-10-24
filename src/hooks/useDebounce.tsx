import { useCallback, useRef } from 'react';
import { AnyFunction } from '../types/types';

export const useDebounce = (func: AnyFunction, wait = 250) => {
  const timeout = useRef<ReturnType<typeof setTimeout>>();

  return useCallback(
    // eslint-disable-next-line
    (...args: any[]) => {
      const later = () => {
        clearTimeout(timeout.current);
        // eslint-disable-next-line
        func(...args);
      };

      clearTimeout(timeout.current);
      timeout.current = setTimeout(later, wait);
    },
    [func, wait]
  );
};

import { useEffect, useState } from 'react';
import useDebounceFn from './useDebounceFn';

type Dispatch<A> = (value: A) => void;
const useDebounce = <T = undefined>(value: T, wait: number = 500): [T, Dispatch<T | undefined>] => {
  const [debounced, setDebounced] = useState(value);

  const debouncedCallback = useDebounceFn(() => {
    setDebounced(value);
  }, wait);

  useEffect(() => {
    debouncedCallback();
  }, [value]);

  return [debounced, setDebounced];
};

export default useDebounce;

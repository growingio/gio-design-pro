import { useCallback, useState } from 'react';
import { debounce } from 'lodash';

type Dispatch<A> = (value: A) => void;
const useDebounce = <T = undefined>(value: T, wait: number = 500): [T, Dispatch<T | undefined>] => {
  const [state, setState] = useState(value);
  const debounceCallback = useCallback(
    debounce((_prop: T) => {
      setState(_prop);
    }, wait),
    []
  );
  const setDebouncedState = (_val: T) => {
    debounceCallback(_val);
  };

  return [state, setDebouncedState];
};
export default useDebounce;

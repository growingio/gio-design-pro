import { useEffect, useRef, DependencyList } from 'react';

function useUpdate(func: () => void, deps: DependencyList) {
  const ref = useRef(true);

  useEffect(() => {
    if (ref.current) {
      ref.current = false;
      return;
    }
    func?.();
  }, deps);
}

export default useUpdate;

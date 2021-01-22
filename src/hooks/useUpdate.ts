import { useEffect, useRef } from 'react';

function useUpdate(func: () => void, deps: any[]) {
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

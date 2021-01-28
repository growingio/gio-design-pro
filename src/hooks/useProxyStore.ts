import { useMemo, useState } from 'react';
import { cloneDeep } from 'lodash';

type ActionPrevFun<R> = (prev: R) => R & { reset?: boolean };

function useProxyStore<T extends Object>(
  initStore: T | (() => T)
): [T, (v: T | ActionPrevFun<T>) => void, (v?: T) => void] {
  const [store, update] = useState(initStore);

  const dispatch = (action: T | ActionPrevFun<T>) => {
    update((prev) => {
      if (typeof action === 'function') {
        // @ts-ignore
        const res = action(prev);
        return { ...prev, ...res };
      }
      return { ...prev, ...action };
    });
  };

  function reset(state: T) {
    return (n?: T) => {
      update({ ...state, ...n });
    };
  }

  const proxyStore = useMemo(
    () =>
      new Proxy<T>(
        { ...store },
        {
          set(target: T, p: PropertyKey, value: any, receiver: any): boolean {
            dispatch({ [p]: value } as any);
            return Reflect.set(target, p, value, receiver);
          },
        }
      ),
    [store]
  );

  return [proxyStore, dispatch, reset(cloneDeep(store))];
}

export default useProxyStore;

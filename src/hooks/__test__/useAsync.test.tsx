/* eslint-disable no-plusplus */
/* eslint-disable prefer-promise-reject-errors */
import { renderHook } from '@testing-library/react-hooks';
import useAsync from '../useAsync';

describe('a success', () => {
  let hook: any;
  let callCount = 0;

  const resolver = async () =>
    new Promise((resolve) => {
      callCount++;

      const wait = setTimeout(() => {
        clearTimeout(wait);
        resolve('ok');
      }, 0);
    });

  beforeEach(() => {
    callCount = 0;
    hook = renderHook(({ fn }) => useAsync(fn, [fn]), {
      initialProps: {
        fn: resolver,
      },
    });
  });

  it('initially starts loading', async () => {
    expect(hook.result.current.loading).toEqual(true);
    await hook.waitForNextUpdate();
  });

  it('resolves', async () => {
    expect.assertions(4);

    hook.rerender({ fn: resolver });
    await hook.waitForNextUpdate();

    expect(callCount).toEqual(1);
    expect(hook.result.current.loading).toBeFalsy();
    expect(hook.result.current.value).toEqual('ok');
    expect(hook.result.current.error).toEqual(undefined);
  });
});
describe('an error', () => {
  let hook: any;
  let callCount = 0;

  const rejection = async () =>
    new Promise((_, reject) => {
      callCount++;

      const wait = setTimeout(() => {
        clearTimeout(wait);
        reject('sorry');
      }, 0);
    });

  beforeEach(() => {
    callCount = 0;
    hook = renderHook(({ fn }) => useAsync(fn, [fn]), {
      initialProps: {
        fn: rejection,
      },
    });
  });

  it('initially starts loading', async () => {
    expect(hook.result.current.loading).toBeTruthy();
    await hook.waitForNextUpdate();
  });

  it('resolves', async () => {
    expect.assertions(4);

    hook.rerender({ fn: rejection });
    await hook.waitForNextUpdate();

    expect(callCount).toEqual(1);
    expect(hook.result.current.loading).toBeFalsy();
    expect(hook.result.current.error).toEqual('sorry');
    expect(hook.result.current.value).toEqual(undefined);
  });
});

import { act, renderHook, RenderHookResult } from '@testing-library/react-hooks';
import useDebounceFn from '../useDebounceFn';

function sleep(time: number) {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve();
    }, time);
  });
}
interface ParamsObj {
  fn: (...arg: any) => any;
  // deps?: any[];
  wait: number;
  option?: {
    leading?: boolean;
    trailing?: boolean;
    maxWait?: number;
  };
}

let count = 0;
const debounceFn = (gap: number) => {
  count += gap;
};

let count2 = 0;
const debounceFn2 = (gap: number) => {
  count2 += gap;
};
const setUp = ({ fn, wait, option = { leading: false, trailing: true } }: ParamsObj) =>
  renderHook(() => useDebounceFn(fn, wait, option));

let hook: RenderHookResult<ParamsObj, ReturnType<typeof useDebounceFn>>;
let hook2: RenderHookResult<ParamsObj, ReturnType<typeof useDebounceFn>>;
describe('useDebounceFn', () => {
  it('should be defined', () => {
    expect(useDebounceFn).toBeDefined();
  });

  it('function run , cancel and flush should work', async () => {
    act(() => {
      hook = setUp({
        fn: debounceFn,
        wait: 200,
      });
      hook2 = setUp({
        fn: debounceFn2,
        wait: 200,
        option: {
          leading: true,
          trailing: false,
        },
      });
    });
    await act(async () => {
      hook.result.current(2);
      hook.result.current(2);
      hook.result.current(2);
      hook.result.current(2);
      expect(count).toBe(0);
      await sleep(300);
      expect(count).toBe(2);
      hook.result.current(4);
      expect(count).toBe(2);
      await sleep(300);
      expect(count).toBe(6);
      hook.result.current(4);
      hook.result.current.cancel();
      await sleep(300);
      expect(count).toBe(6);
      hook.result.current(1);
      hook.result.current.flush();
      expect(count).toBe(7);
      await sleep(300);
      expect(count).toBe(7);
      hook2.result.current(2);
      hook2.result.current(2);
      hook2.result.current(2);
      expect(count2).toBe(2);
      await sleep(300);
      expect(count2).toBe(2);
      hook2.unmount();
    });
  });
});

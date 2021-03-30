/* eslint-disable no-return-await */
/* eslint-disable no-extend-native */
import { getShortPinyin, promisify, isPromise } from '../util';

describe('test getShortPinyin when String.prototype.localeCompare is  undefined at some browsers', () => {
  beforeEach(() => {
    Object.defineProperty(String.prototype, 'localeCompare', {
      value: undefined,
      writable: false,
    });
  });
  it('getShortPinyin', () => {
    const shortPinyin = getShortPinyin('啊');
    expect(shortPinyin).toBe('啊');
  });
});
describe('test getShortPinyin, promisify', () => {
  it('getShortPinyin', () => {
    const shortPinyin = getShortPinyin('啊');
    expect(shortPinyin).toBe('啊');
  });

  it('promisify', () => {
    const syncFunc = () => 1;
    const asyncFunc = async () => await Promise.resolve(1);
    const fn = promisify(syncFunc);
    const fn2 = promisify(asyncFunc);
    expect(isPromise(fn())).toBeTruthy();
    expect(isPromise(fn2())).toBeTruthy();
  });
});

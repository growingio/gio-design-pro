/* eslint-disable no-console */
import { qsParse, matchString, matchQuery } from '../utils';
// import { mount, shallow, render } from 'enzyme';

jest.useFakeTimers();

describe('utils test', () => {
  it('qsParse', async () => {
    const qs = '?a=1&b=2';
    expect(qsParse(qs)).toEqual({ a: '1', b: '2' });
    expect(qsParse('?a=1&b')).toEqual({ a: '1', b: '' });
    expect(qsParse('?a=1&a=2&b')).toEqual({ a: ['1', '2'], b: '' });
  });
  it('matchString', async () => {
    expect(matchString()).toEqual(false);
    expect(matchString('a', 'abc')).toEqual(false);
    expect(matchString('abc', 'abc')).toEqual(true);
    expect(matchString('a*', 'abc')).toEqual(true);
    expect(matchString('a*', 'abc', true)).toEqual(false);
  });
  it('matchQuery', async () => {
    expect(matchQuery('a=1&b=1', 'a=1&b=1')).toEqual(true);
    expect(matchQuery('a=1&b=1', 'a=1', false)).toEqual(false);
    expect(matchQuery('a=1&b=1', 'a=1', true)).toEqual(false);
    expect(matchQuery('a=1&b=1', 'a=1&b=1&a=2', false)).toEqual(false);
    expect(matchQuery('a=1&b=1&b=2', 'a=1&b=1&b=3', false)).toEqual(false);
    expect(matchQuery('a=1&b=1&b=2', 'a=1&b=2&b=1', false)).toEqual(true);
    expect(matchQuery('a=1&b=1&b=2', 'a=1&b=2&b=1', true)).toEqual(true);
    expect(matchQuery('b=1&b=2&a=1', 'a=1&b=2', true)).toEqual(false);
  });
});

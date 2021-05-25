import { TagElement } from '../TagElement';
import Validator from '../validator';
import { spaceTags } from './data';

const currentPage: TagElement = {
  id: 'zZDb6aD9',
  name: '1月13，21次',
  creator: 'lvyuqiang',
  creatorId: 'n1QVaDyR',
  createdAt: '2021-01-13T09:03:46Z',
  updater: 'lvyuqiang',
  updaterId: 'n1QVaDyR',
  updatedAt: '2021-01-13T09:03:46Z',
  description: '1月13，21次',
  platforms: ['minp'],
  docType: 'page',
  actions: ['page'],
  patternMatched: false,
  attrs: {
    content: '元素内容元素内容元素内容元素内容',
    index: null,
    href: null,
    path: 'pages/index/index',
    pg: null,
    query: null,
    xpath: null,
    contentType: null,
    domain: 'wx123456',
    urlScheme: null,
  },
  definition: {
    domain: 'wx123456',
    path: 'pages/index/index',
    query: null,
    xpath: null,
    index: null,
    href: null,
    content: null,
    pg: null,
    contentType: null,
    urlScheme: null,
  },
};
describe('validator test', () => {
  const validatorHelper = new Validator(spaceTags);

  it('validatorHelper.checkName', async () => {
    await expect(validatorHelper.checkName('事件4')).rejects.toEqual(new Error('该名称已存在'));
    expect(await validatorHelper.checkName('事件1234567788990')).toBe(true);
  });
  it('validatorHelper.checkPath', async () => {
    await expect(validatorHelper.checkPath({ path: '', checked: true })).rejects.toEqual(
      new Error('路径在开启状态下为必填项')
    );
    expect(await validatorHelper.checkPath({ path: '/index', checked: true })).toBe(true);
    expect(await validatorHelper.checkPath({ path: '/index', checked: false })).toBe(true);
    expect(await validatorHelper.checkPath({ path: '', checked: false })).toBe(true);
  });
  it('validatorHelper.findRepeatElementTag', async () => {
    const definition = {
      domain: 'wx265d0fa6fa70fae9',
      path: 'pages/index/index',
      query: '12=12',
      xpath: '#onTabItemTap',
      index: '0',
      href: 'pages/index/index',
      content: '主页',
      contentType: '=',
      // urlScheme: null,
    };
    const definition2 = {
      domain: 'wx265d0fa6fa70fae9',
      path: 'pages/index/index',
      query: 'q=12&s=1&a=d',
      xpath: '#onTabItemTap',
      index: '0',
      href: 'pages/index/index',
      content: '主页',
      contentType: '=',
      // urlScheme: null,
    };
    expect(validatorHelper.findRepeatElementTag(definition)).toBeTruthy();
    expect(validatorHelper.findRepeatElementTag(definition2)).toBeFalsy();
  });
  it('validatorHelper.conversionElementSubmitValue', async () => {
    const formValues: any = {
      limitCondition: {
        contentChecked: true,
        content: '限定内容',
        index: '1',
        indexChecked: true,
        hrefChecked: true,
        href: '/link',
      },
      definition: {
        domain: 'release-messages.growingio.cn',
        path: '/push/cdp/testgio-cdpcircel.html',
        // query: null,
        xpath: '/div.title/div/div.title/h3',
        index: 1,
        href: '/link',
        content: '元素内容元素内容元素内容元素内容',
        contentType: '=',
        urlScheme: 'growing.314b5db864634231',
      },
      belongPage: currentPage,
    };
    const dest = Validator.conversionElementSubmitValue(formValues);
    // console.log(dest);
    expect(dest).toEqual({
      definition: {
        domain: 'wx123456',
        path: 'pages/index/index',
        xpath: '/div.title/div/div.title/h3',
        index: '1',
        href: '/link',
        content: '限定内容',
        contentType: undefined,
        urlScheme: 'growing.314b5db864634231',
        query: null,
      },
    });
  });
});

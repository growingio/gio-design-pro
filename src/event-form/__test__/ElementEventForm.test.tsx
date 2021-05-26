/* eslint-disable no-console */
import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import ElementEventForm from '../ElementEventForm';
import { spaceTags } from './data';
import { ElementFormValues } from '../interfaces';
import { AppType } from '../types';
import { TagElement } from '../TagElement';

jest.useFakeTimers();

const belongPage: any = {
  id: 'JnG40OGz',
  name: '是',
  creator: 'haozhigang',
  creatorId: 'rRGoYQml',
  createdAt: '2021-01-14T07:08:25Z',
  updater: 'haozhigang',
  updaterId: 'rRGoYQml',
  updatedAt: '2021-01-14T07:08:25Z',
  description: '是  得到的',
  platforms: ['minp'],
  docType: 'page',
  actions: ['page'],
  patternMatched: false,
  attrs: {
    content: null,
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
    query: '得到的=s',
    xpath: null,
    index: null,
    href: null,
    content: null,
    pg: null,
    contentType: null,
    urlScheme: null,
  },
  screenshot: { target: '', viewport: '' },
};
const initialValues: ElementFormValues = {
  name: 'element1',
  description: '',
  belongApp: '小程序无埋点 | wx123456',
  belongPage: belongPage as TagElement,
  attrs: {
    domain: 'release-messages.growingio.cn',
    path: 'pages/index/index',
    // query: null,
    xpath: '/div.title/form.basic-grey/h1/span',
    index: '',
    href: '',
    content: 'element1:一共测试4种数据类型, change, click, submit, page,',
  },
  definition: {
    domain: 'release-messages.growingio.cn',
    path: 'pages/index/index',
    // query: null,
    xpath: '/div.title/form.basic-grey/h1/span',
    index: '1',
    href: '/link',
    content: 'element1:一共测试4种数据类型, change, click, submit, page,',
    contentType: '=',
  },
};
describe('ElementEventForm', () => {
  it('can render ElementEventForm with appType.MINP ,and click submit button and  call onFinish,', async () => {
    const handleFinish = jest.fn(async (value: any) => {
      console.log(value);
    });
    const handleActionButtonClick = jest.fn();
    const handleResetClick = jest.fn();
    render(
      <ElementEventForm
        definedTags={(spaceTags as unknown) as TagElement[]}
        platform="android"
        appType={AppType.MINP}
        onFinish={handleFinish}
        initialValues={initialValues}
        submitter={{ submitText: '保存', resetText: '不保存', onReset: handleResetClick }}
        pagePicker={{
          dataSource: (spaceTags as unknown) as TagElement[],
          onActionButtonClick: handleActionButtonClick,
          currentPageTags: ([spaceTags[0]] as unknown) as TagElement[],
        }}
      />
    );
    await act(async () => {
      fireEvent.click(screen.getByText('不保存'));
    });
    expect(handleResetClick).toHaveBeenCalled();
    // screen.debug(container);
    await act(async () => {
      fireEvent.click(screen.getByText('保 存'));
      jest.runAllTimers();
    });
    await act(async () => {
      fireEvent.click(screen.getByText('确 认'));
      jest.runAllTimers();
    });

    expect(handleFinish).toHaveBeenCalledTimes(1);
    expect(screen.queryByText('元素内容')).toBeTruthy();

    await act(async () => {
      fireEvent.click(screen.getByText('确 认'));
      jest.runAllTimers();
    });
  });
});

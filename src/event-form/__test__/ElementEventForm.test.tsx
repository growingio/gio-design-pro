/* eslint-disable no-console */
import React from 'react';
import { fireEvent, render, screen, within } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { Input } from '@gio-design/components';
import ElementEventForm from '../ElementEventForm';
import { definedElements } from './elements.data';
import { definedPages } from './pagePicker.data';
import { ElementFormValues } from '../interfaces';
import { AppType } from '../types';
import { TagElement } from '../TagElement';

jest.useFakeTimers();

// const belongPage: any = {
//   id: 'JnG40OGz',
//   name: '是',
//   creator: 'haozhigang',
//   creatorId: 'rRGoYQml',
//   createdAt: '2021-01-14T07:08:25Z',
//   updater: 'haozhigang',
//   updaterId: 'rRGoYQml',
//   updatedAt: '2021-01-14T07:08:25Z',
//   description: '是  得到的',
//   platforms: ['minp'],
//   docType: 'page',
//   actions: ['page'],
//   patternMatched: false,
//   attrs: {
//     content: null,
//     index: null,
//     href: null,
//     path: 'pages/index/index',
//     pg: null,
//     query: null,
//     xpath: null,
//     contentType: null,
//     domain: 'wx123456',
//     urlScheme: null,
//   },
//   definition: {
//     domain: 'wx123456',
//     path: 'pages/index/index',
//     query: '得到的=s',
//     xpath: null,
//     index: null,
//     href: null,
//     content: null,
//     pg: null,
//     contentType: null,
//     urlScheme: null,
//   },
//   screenshot: { target: '', viewport: '' },
// };
const initialValues: ElementFormValues = {
  name: 'define element',
  description: '',
  belongApp: '小程序无埋点 | wx123456',
  // belongPage: belongPage as TagElement,
  attrs: {
    domain: 'wx123456',
    path: 'pages/index/index',
    query: null,
    xpath: '/div.title/form.basic-grey/h1/span',
    index: '',
    href: '',
    content: 'element1:一共测试4种数据类型, change, click, submit, page,',
  },
  definition: {
    domain: 'wx123456',
    path: 'pages/index/index',
    query: null,
    xpath: '/div.title/form.basic-grey/h1/span',
    index: '1',
    href: '/link',
    content: 'element1:一共测试4种数据类型, change, click, submit, page,',
    contentType: '=',
  },
};

describe('ElementEventForm', () => {
  it('can render ElementEventForm with appType.MINP ,and click submit button and  call onFinish,', async () => {
    const handleFinish = jest.fn();
    const handleResetClick = jest.fn();
    render(
      <ElementEventForm
        definedTags={(definedElements as unknown) as TagElement[]}
        platform="android"
        appType={AppType.MINP}
        onFinish={handleFinish}
        initialValues={initialValues}
        submitter={{ submitText: '保存', resetText: '不保存', onReset: handleResetClick }}
        pagePicker={{
          // dataSource: (spaceTags as unknown) as TagElement[],
          currentPageTags: (definedPages as unknown) as TagElement[],
        }}
      />
    );
    // expect(wrapper.container).toMatchSnapshot();
    await act(async () => {
      fireEvent.click(screen.getByText('不保存'));
    });
    expect(handleResetClick).toHaveBeenCalled();

    await act(async () => {
      fireEvent.click(screen.getByText('保 存'));
    });
    await act(async () => {
      fireEvent.click(screen.getByText('取 消'));
    });

    expect(handleFinish).toHaveBeenCalledTimes(0);
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
  it('render ElementEventForm with props platform=web, appType.WEB,will show manualMode toggle button', async () => {
    const handleFinish = jest.fn();
    const handleResetClick = jest.fn();

    render(
      <ElementEventForm
        definedTags={(definedElements as unknown) as TagElement[]}
        platform="web"
        appType={AppType.WEB}
        manualMode={<Input placeholder="定义手动模式" />}
        onFinish={handleFinish}
        initialValues={initialValues}
        submitter={{ submitText: '保存', resetText: '不保存', onReset: handleResetClick }}
        pagePicker={{
          dataSource: (definedElements as unknown) as TagElement[],
          currentPageTags: (definedPages as unknown) as TagElement[],
        }}
      />
    );
    expect(screen.queryByText('不保存')).toBeTruthy();
    expect(screen.queryByText('打开手动模式')).toBeTruthy();
    await act(async () => {
      fireEvent.click(screen.getByText(/打开手动模式/));
      jest.runAllTimers();
    });
    expect(screen.queryByText('关闭手动模式')).toBeTruthy();
  });

  it('can render ElementEventForm ,and test validation', async () => {
    const defined: any = {
      name: 'element1',
      description: '',
      belongApp: '小程序无埋点 | wx123456',
      belongPage: { name: 'none' },
      attrs: {
        domain: 'wx123456',
        path: 'pages/index/index',
        query: '',
        xpath: '/div.title/form.basic-grey/h1/span',
        index: '',
        href: '',
        content: 'element1:一共测试4种数据类型, change, click, submit, page,',
        urlScheme: 'growing.314b5db864634231',
      },
      definition: {
        domain: 'wx123456',
        path: 'pages/index/index',
        query: '',
        xpath: '/div.title/form.basic-grey/h1/span',
        index: '1',
        href: '/link',
        content: 'element1:一共测试4种数据类型, change, click, submit, page,',
        urlScheme: 'growing.314b5db864634231',
        contentType: '=',
      },
    };
    const currentPageTags: any[] = [
      {
        id: 'zZDb6aD9',
        name: 'page2',
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
          __typename: 'DocProps',
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
          __typename: 'DocProps',
        },
        screenshot: { target: '', viewport: '', __typename: 'Screenshot' },
        __typename: 'Element',
      },
    ];
    const handleFinish = jest.fn();
    const handleResetClick = jest.fn();
    const handleActionButtonClick = jest.fn();
    render(
      <ElementEventForm
        definedTags={(definedElements as unknown) as TagElement[]}
        platform="android"
        appType={AppType.MINP}
        onFinish={handleFinish}
        initialValues={defined}
        submitter={{ submitText: '保存', resetText: '不保存', onReset: handleResetClick }}
        pagePicker={{
          onActionButtonClick: handleActionButtonClick,
          currentPageTags: (currentPageTags as unknown) as TagElement[],
        }}
      />
    );

    await act(async () => {
      fireEvent.click(screen.getByPlaceholderText('请选择所属页面'));
      jest.runAllTimers();
    });
    await act(async () => {
      fireEvent.click(screen.getByText(/定义新页面/));
      jest.runAllTimers();
    });
    expect(handleActionButtonClick).toHaveBeenCalledTimes(1);

    await act(async () => {
      fireEvent.click(screen.getByText('保 存'));
      jest.runAllTimers();
    });
    // expect(wrapper.baseElement).toMatchSnapshot();

    expect(screen.findByText(/该名称已存在/)).toBeTruthy();
  });
  it('can render ElementEventForm ,and test validation belongPage', async () => {
    const defined: any = {
      name: 'element3',
      belongPage: { name: 'none' },
      description: '',
      belongApp: '小程序无埋点 | wx123456',
      attrs: {
        domain: 'release-messages.growingio.cn',
        path: 'pages/form/form',
        query: null,
        xpath: '/div.title/form.basic-grey/h1/span',
        index: '',
        href: '',
        content: '测试',
        urlScheme: 'growing.314b5db864634231',
      },
      definition: {
        domain: 'release-messages.growingio.cn',
        path: 'pages/form/form',
        query: null,
        xpath: '/div.title/form.basic-grey/h1/span',
        index: '',
        href: '',
        content: '测试',
        urlScheme: 'growing.314b5db864634231',
        contentType: '=',
      },
    };

    const currentPageTags: any[] = [
      {
        id: 'zZDb6aD9',
        name: 'page2',
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
          __typename: 'DocProps',
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
          __typename: 'DocProps',
        },
        screenshot: { target: '', viewport: '', __typename: 'Screenshot' },
        __typename: 'Element',
      },
    ];
    const handleFinish = jest.fn();
    const handleResetClick = jest.fn();
    const handleActionButtonClick = jest.fn();
    render(
      <ElementEventForm
        definedTags={(definedElements as unknown) as TagElement[]}
        platform="android"
        appType={AppType.MINP}
        onFinish={handleFinish}
        initialValues={defined}
        submitter={{ submitText: '保存', resetText: '不保存', onReset: handleResetClick }}
        pagePicker={{
          onActionButtonClick: handleActionButtonClick,
          currentPageTags: (currentPageTags as unknown) as TagElement[],
        }}
      />
    );

    await act(async () => {
      fireEvent.click(screen.getByText('保 存'));
      jest.runAllTimers();
    });
    expect(screen.findByText(/所属页面不能为空/)).toBeTruthy();
  });
  it('can render ElementEventForm with appType.NATIVE ,and without submitter button', async () => {
    const handleFinish = jest.fn();
    const handleResetClick = jest.fn();
    render(
      <ElementEventForm
        definedTags={(definedElements as unknown) as TagElement[]}
        platform="android"
        appType={AppType.NATIVE}
        onFinish={handleFinish}
        initialValues={initialValues}
        submitter={{ render: false, submitText: '保存', resetText: '不保存', onReset: handleResetClick }}
        pagePicker={{
          dataSource: (definedElements as unknown) as TagElement[],
          currentPageTags: (definedPages as unknown) as TagElement[],
        }}
      />
    );
    expect(screen.queryByText('不保存')).toBeNull();
  });
  it('can render ElementEventForm with appType.NATIVE ,and render submitter to specify container', async () => {
    const handleFinish = jest.fn();
    const handleActionButtonClick = jest.fn();
    const handleResetClick = jest.fn();
    const footerDiv = document.createElement('div');
    footerDiv.style.position = 'relative';
    footerDiv.id = 'submitContainer';
    render(
      <ElementEventForm
        definedTags={(definedElements as unknown) as TagElement[]}
        platform="android"
        appType={AppType.NATIVE}
        onFinish={handleFinish}
        initialValues={initialValues}
        submitter={{
          defaultRenderContainer: footerDiv,
          submitText: '保存',
          resetText: '不保存',
          onReset: handleResetClick,
        }}
        pagePicker={{
          dataSource: (definedElements as unknown) as TagElement[],
          onActionButtonClick: handleActionButtonClick,
          currentPageTags: (definedPages as unknown) as TagElement[],
        }}
      />
    );
    const submitContainer = within(footerDiv);
    expect(submitContainer.findByText('不保存')).toBeTruthy();
  });
});

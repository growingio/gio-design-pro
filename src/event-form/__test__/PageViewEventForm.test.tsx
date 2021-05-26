/* eslint-disable no-console */
import React from 'react';
import { fireEvent, render, screen, within } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import PageViewEventForm from '../PageViewEventForm';
import { spaceTags } from './data';
import { PageViewFormValues } from '../interfaces';
import { AppType } from '../types';
import { TagElement } from '../TagElement';

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
const initialValues: PageViewFormValues = {
  name: 'pageview',
  description: '',
  belongApp: '小程序无埋点 | wx123456',
  definition: {
    domain: 'release-messages.growingio.cn',
    path: 'pages/index/index',
    query: 'q=1',
  },
};
jest.useFakeTimers();
describe('PageViewEventForm', () => {
  it('render PageViewEventForm with appType.MINP ,and click submit button and  call onFinish,', async () => {
    const handleFinish = jest.fn();
    const newDescription = 'this is descrption';
    render(
      <PageViewEventForm
        definedTags={(spaceTags as unknown) as TagElement[]}
        platform="android"
        appType={AppType.MINP}
        showPreButton={false}
        onFinish={handleFinish}
        initialValues={initialValues}
        submitter={{ submitText: '保存' }}
      />
    );
    // expect(container).toMatchSnapshot();
    await act(async () => {
      fireEvent.mouseOver(screen.getByText(/如何定义一组页面/));
      fireEvent.click(screen.getByText(/如何定义一组页面/));
      jest.runAllTimers();
    });
    // expect(container).toMatchSnapshot();
    // expect(screen.queryByText(/支持使用通配符 * 来代替任意字符/)).toBeTruthy();
    await act(async () => {
      fireEvent.change(screen.getByLabelText('描述'), { target: { value: newDescription } });
    });
    await act(async () => {
      fireEvent.click(screen.getByText('保 存'));
    });
    await act(async () => {
      fireEvent.click(screen.getByText('确 认'));
    });

    expect(handleFinish).toHaveBeenCalledTimes(1);
    const expectValue = {
      name: 'pageview',
      description: newDescription,
      definition: {
        domain: 'release-messages.growingio.cn',
        path: 'pages/index/index',
        query: 'q=1',
      },
    };
    expect(handleFinish).toHaveBeenCalledWith(expectValue);
  });

  it('render PageViewEventForm with appType.WEB', async () => {
    const handleFinish = jest.fn(async (v) => {
      console.log(v);
    });
    const handlePreClick = jest.fn();
    const handleResetClick = jest.fn();
    const newDescription = 'this is descrption';
    const { container } = render(
      <PageViewEventForm
        definedTags={(spaceTags as unknown) as TagElement[]}
        platform="android"
        appType={AppType.WEB}
        onFinish={handleFinish}
        onPre={handlePreClick}
        initialValues={initialValues}
        submitter={{ submitText: '保存', resetText: '不保存', onReset: handleResetClick }}
      />
    );
    await act(async () => {
      fireEvent.click(screen.getByText('上一步'));
    });
    expect(handlePreClick).toHaveBeenCalled();
    // expect(container).toMatchSnapshot();
    // 点击取消 重置 表单 触发 onReset
    await act(async () => {
      fireEvent.change(screen.getByLabelText('描述'), { target: { value: newDescription } });
    });
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
    const repeatName = '页面1'; // spaceTags[0].name;
    await act(async () => {
      fireEvent.change(screen.getByLabelText('页面名称'), { target: { value: repeatName } });
    });
    await act(async () => {
      fireEvent.click(screen.getByText('保 存'));
      jest.runOnlyPendingTimers();
    });
    expect(screen.queryByText(/该名称已存在/)).toBeTruthy();
    // const expectValue = {
    //   name: 'pageview',
    //   description: newDescription,
    //   definition: {
    //     domain: 'release-messages.growingio.cn',
    //     path: 'pages/index/index',
    //     query: 'q=1',
    //   },
    // };
    // expect(handleFinish).toHaveBeenCalledWith(expectValue);
  });

  it('render PageViewEventForm and trigger validate', async () => {
    const handleFinish = jest.fn(async (v) => {
      console.log(v);
    });
    const handleFormValuesChange = jest.fn(async (v) => {
      console.log('handleFormValuesChange', v);
    });
    const initialFormValue: PageViewFormValues = {
      name: '',
      description: '',
      belongApp: '小程序无埋点 | wx123456',
      definition: {
        domain: 'release-messages.growingio.cn',
        path: 'pages/index/index',
        // query: 'q=1',
      },
    };
    const { container } = render(
      <PageViewEventForm
        definedTags={(spaceTags as unknown) as TagElement[]}
        platform="android"
        appType={AppType.WEB}
        onFinish={handleFinish}
        onValuesChange={(_, av) => handleFormValuesChange(av)}
        // showPreButton={false}
        initialValues={initialFormValue}
        submitter={{ submitText: '保存', resetText: '不保存' }}
      />
    );
    await act(async () => {
      fireEvent.click(container.querySelector('.gio-toggles'));
    });
    await act(async () => {
      fireEvent.change(screen.getByLabelText('页面名称'), { target: { value: 'pageview' } });
    });
    await act(async () => {
      fireEvent.click(screen.getByText('保 存'));
    });
    await act(async () => {
      fireEvent.click(screen.getByText('确 认'));
    });
    const expectValue: any = {
      name: 'pageview',
      description: '',
      definition: {
        domain: 'release-messages.growingio.cn',
        path: undefined,
        query: undefined,
      },
    };
    expect(handleFinish).toHaveBeenCalledWith(expectValue);
    // expect(handleFinish).toHaveBeenCalledTimes(0);
    // const repeatName = '页面1'; // spaceTags[0].name;
    // await act(async () => {
    //   fireEvent.change(screen.getByLabelText('页面名称'), { target: { value: repeatName } });
    // });
    // await act(async () => {
    //   fireEvent.click(screen.getByText('保 存'));
    //   jest.runOnlyPendingTimers();
    // });
    // expect(screen.queryByText(/该名称已存在/)).toBeTruthy();
    // const expectValue = {
    //   name: 'pageview',
    //   description: newDescription,
    //   definition: {
    //     domain: 'release-messages.growingio.cn',
    //     path: 'pages/index/index',
    //     query: 'q=1',
    //   },
    // };
    // expect(handleFinish).toHaveBeenCalledWith(expectValue);
  });
  it('render PageViewEventForm with appType.NATIVE without submit', async () => {
    const handleFinish = jest.fn(async (v) => {
      console.log(v);
    });

    const { container, baseElement, unmount } = render(
      <PageViewEventForm
        definedTags={(spaceTags as unknown) as TagElement[]}
        platform="android"
        appType={AppType.NATIVE}
        onFinish={handleFinish}
        // onPre={handlePreClick}
        initialValues={initialValues}
        showPreButton={false}
        submitter={false}
      />
    );

    // expect(screen).toMatchSnapshot();
    expect(screen.queryByText('保 存')).toBeNull();
  });
  it('render PageViewEventForm with appType.NATIVE', async () => {
    const handleFinish = jest.fn(async (v) => {
      console.log(v);
    });
    const handleResetClick = jest.fn();
    const root = document.createElement('div');
    root.id = 'root';
    const footerDiv = document.createElement('div');
    footerDiv.style.position = 'relative';
    footerDiv.id = 'submitContainer';
    root.appendChild(footerDiv);
    const { container, baseElement, unmount } = render(
      <PageViewEventForm
        definedTags={(spaceTags as unknown) as TagElement[]}
        platform="android"
        appType={AppType.NATIVE}
        onFinish={handleFinish}
        // onPre={handlePreClick}
        initialValues={initialValues}
        showPreButton={false}
        submitter={{
          submitText: '保存',
          resetText: '不保存',
          onReset: handleResetClick,
          defaultRenderContainer: footerDiv,
        }}
      />,
      {
        container: document.body.appendChild(root),
      }
    );

    // expect(screen).toMatchSnapshot();
    const submitContainer = within(footerDiv);
    expect(submitContainer.findByText('不保存')).toBeTruthy();
    act(() => {
      unmount();
    });
  });
});

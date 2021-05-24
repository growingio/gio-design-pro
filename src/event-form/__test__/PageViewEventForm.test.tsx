/* eslint-disable no-console */
import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
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
describe('PageViewEventForm', () => {
  it('render PageViewEventForm with appType.MINP ,and click submit button and  call onFinish,', async () => {
    const handleFinish = jest.fn(async (v) => {
      console.log(v);
    });
    const newDescription = 'this is descrption';
    render(
      <PageViewEventForm
        definedTags={(spaceTags as unknown) as TagElement[]}
        platform="android"
        appType={AppType.MINP}
        onFinish={handleFinish}
        initialValues={initialValues}
        submitter={{ submitText: '保存' }}
      />
    );
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
});

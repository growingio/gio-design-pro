import React from 'react';
// import { fireEvent, render, screen } from '@testing-library/react';
import { render, screen } from '@testing-library/react';
import PageViewDefinitionRuleRender from '../PageViewDefinitionRuleRender';
import { TagElement } from '../TagElement';
import { AppType } from '../types';

describe('PageViewDefinitionRuleRender', () => {
  it('render AppType.WEB', async () => {
    const definition = {
      domain: 'wx265d0fa6fa70fae9',
      path: 'pages/index/index',
      query: 'a=12',
      xpath: '#onTabItemTap',
      index: '0',
      href: 'pages/index/index',
      content: '主页',
      // pg: null,
      contentType: '=',
      // urlScheme: null,
      __typename: 'DocProps',
    };
    const { container } = render(<PageViewDefinitionRuleRender definition={definition} appType={AppType.WEB} />);
    expect(container).toMatchSnapshot();
    expect(screen.queryByText(/现在定义的是页面/)).toBeTruthy();
  });
  it('render AppType.WEB and path==undefined', async () => {
    const definition = {
      domain: 'wx265d0fa6fa70fae9',
      // path: 'pages/index/index',
      query: 'a=12',
      xpath: '#onTabItemTap',
      index: '0',
      href: 'pages/index/index',
      content: '主页',
      // pg: null,
      contentType: '=',
      // urlScheme: null,
      __typename: 'DocProps',
    };
    const { container } = render(<PageViewDefinitionRuleRender definition={definition} appType={AppType.WEB} />);
    expect(container).toMatchSnapshot();
  });
  it('render AppType.WEB and query==undefined', async () => {
    const definition = {
      domain: 'wx265d0fa6fa70fae9',
      path: 'pages/index/index',
      // query: 'a=12',
      xpath: '#onTabItemTap',
      index: '0',
      href: 'pages/index/index',
      content: '主页',
      // pg: null,
      contentType: '=',
      // urlScheme: null,
      __typename: 'DocProps',
    };
    const { container } = render(<PageViewDefinitionRuleRender definition={definition} appType={AppType.WEB} />);
    expect(container).toMatchSnapshot();
  });
  it('render AppType.MINP', async () => {
    const definition = {
      domain: 'wx265d0fa6fa70fae9',
      path: 'pages/index/index',
      query: 'a=12',
      xpath: '#onTabItemTap',
      index: '0',
      href: 'pages/index/index',
      content: '主页',
      // pg: null,
      contentType: '=',
      // urlScheme: null,
      __typename: 'DocProps',
    };
    const { container } = render(<PageViewDefinitionRuleRender definition={definition} appType={AppType.MINP} />);
    expect(container).toMatchSnapshot();
    expect(screen.queryByText(/现在定义的是页面/)).toBeTruthy();
  });
  it('render AppType.MINP and path==undefined', async () => {
    const definition = {
      domain: 'wx265d0fa6fa70fae9',
      // path: 'pages/index/index',
      query: 'a=12',
      xpath: '#onTabItemTap',
      index: '0',
      href: 'pages/index/index',
      content: '主页',
      // pg: null,
      contentType: '=',
      // urlScheme: null,
      __typename: 'DocProps',
    };
    const { container } = render(<PageViewDefinitionRuleRender definition={definition} appType={AppType.MINP} />);
    expect(container).toMatchSnapshot();
    expect(screen.queryByText(/小程序所有页面/)).toBeTruthy();
  });
  it('render AppType.MINP and query==undefined', async () => {
    const definition = {
      domain: 'wx265d0fa6fa70fae9',
      path: 'pages/index/index',
      // query: 'a=12',
      xpath: '#onTabItemTap',
      index: '0',
      href: 'pages/index/index',
      content: '主页',
      // pg: null,
      contentType: '=',
      // urlScheme: null,
      __typename: 'DocProps',
    };
    const { container } = render(<PageViewDefinitionRuleRender definition={definition} appType={AppType.MINP} />);
    expect(container).toMatchSnapshot();
  });
  it('render AppType.NATIVE', async () => {
    const definition = {
      domain: 'wx265d0fa6fa70fae9',
      path: 'pages/index/index',
      query: 'a=12',
      xpath: '#onTabItemTap',
      index: '0',
      href: 'pages/index/index',
      content: '主页',
      // pg: null,
      contentType: '=',
      // urlScheme: null,
      __typename: 'DocProps',
    };
    const { container } = render(<PageViewDefinitionRuleRender definition={definition} appType={AppType.NATIVE} />);
    expect(container).toMatchSnapshot();
    expect(screen.queryByText(/现在定义的是页面/)).toBeTruthy();
  });
  it('render with repeatTag', async () => {
    const definition = {
      domain: 'release-messages.growingio.cn',
      path: 'pages/index/index',
      // query: undefined,
      // xpath: '/div.title/form.basic-grey/h1/span',
      index: '',
      href: '/link',
      content: '元素内容',
    };

    const repeatTag = {
      id: 'kqQe1qQr',
      name: '定义一个新的事件2',
      creator: 'zhangxueqi',
      creatorId: 'oNGzxQgB',
      createdAt: '2021-01-08T06:21:14Z',
      updater: 'zhangxueqi',
      updaterId: 'oNGzxQgB',
      updatedAt: '2021-01-08T06:21:14Z',
      description: '',
      platforms: ['minp'],
      docType: 'elem',
      actions: ['clck'],
      patternMatched: false,
      attrs: {
        content: '主页',
        index: '0',
        href: 'pages/index/index',
        path: 'pages/index/index',
        // query: null,
        xpath: '#onTabItemTap',
        // contentType: null,
        domain: 'wx265d0fa6fa70fae9',
        // urlScheme: null,
        __typename: 'DocProps',
      },
      definition: {
        domain: 'wx265d0fa6fa70fae9',
        path: 'pages/index/index',
        query: '12=12',
        xpath: '#onTabItemTap',
        index: '0',
        href: 'pages/index/index',
        content: '主页',
        // pg: null,
        contentType: '=',
        // urlScheme: null,
        __typename: 'DocProps',
      },
      screenshot: { target: '', viewport: '', __typename: 'Screenshot' },
    };
    const { container } = render(
      <PageViewDefinitionRuleRender
        repeatTag={(repeatTag as unknown) as TagElement}
        definition={definition}
        appType={AppType.MINP}
      />
    );
    expect(container).toMatchSnapshot();

    expect(screen.findByText(/^该规则已被/)).toBeTruthy();
  });
});

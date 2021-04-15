/* eslint-disable no-console */
import React from 'react';
// import { fireEvent, render, screen } from '@testing-library/react';
import { render, screen } from '@testing-library/react';
import ElementDefinitionRuleRender from '../ElementDefinitionRuleRender';
import { TagElement } from '../TagElement';
// import { mount, shallow, render } from 'enzyme';

jest.useFakeTimers();

describe('ElementDefinitionRuleRender', () => {
  it('can render with content ,index,href,', async () => {
    const attrs = {
      domain: 'release-messages.growingio.cn',
      path: 'pages/index/index',
      // query: undefined,
      xpath: '/div.title/form.basic-grey/h1/span',
      index: '1',
      href: '/link',
      content: '元素内容',
    };
    const limitCondition = {
      domain: 'release-messages.growingio.cn',
      path: 'pages/index/index',
      // query: undefined,
      // xpath: '/div.title/form.basic-grey/h1/span',
      index: '1',
      href: '/link',
      content: '元素内容',
      contentType: '=',
    };

    const wrapper = render(<ElementDefinitionRuleRender attrs={attrs} limitCondition={limitCondition} />);

    expect(wrapper).toMatchSnapshot();
    expect(screen.queryByText('若元素的内容、位置或跳转链接改变，就不再继续统计了。')).toBeTruthy();
  });
  it('render without content', async () => {
    const attrs = {
      domain: 'release-messages.growingio.cn',
      path: 'pages/index/index',
      // query: undefined,
      xpath: '/div.title/form.basic-grey/h1/span',
      index: '1',
      href: '/link',
      content: '元素内容',
    };
    const limitCondition = {
      domain: 'release-messages.growingio.cn',
      path: 'pages/index/index',
      // query: undefined,
      // xpath: '/div.title/form.basic-grey/h1/span',
      index: '1',
      href: '/link',
      // content: '元素内容',
      contentType: '=',
    };
    const wrapper = render(<ElementDefinitionRuleRender attrs={attrs} limitCondition={limitCondition} />);
    expect(wrapper).toMatchSnapshot();
    expect(screen.queryByText('若元素的位置或跳转链接改变，就不再继续统计了。')).toBeTruthy();
  });
  it('render without content,href,index', async () => {
    const attrs = {
      domain: 'release-messages.growingio.cn',
      path: 'pages/index/index',
      // query: undefined,
      xpath: '/div.title/form.basic-grey/h1/span',
      index: '1',
      href: '/link',
      content: '元素内容',
    };
    const limitCondition = {
      domain: 'release-messages.growingio.cn',
      path: 'pages/index/index',
      // query: undefined,
      // xpath: '/div.title/form.basic-grey/h1/span',
      // index: '1',
      // href: '/link',
      // content: '元素内容',
      contentType: '=',
    };
    const wrapper = render(<ElementDefinitionRuleRender attrs={attrs} limitCondition={limitCondition} />);
    expect(wrapper).toMatchSnapshot();
    expect(screen.queryByText('所有同类元素的数据之和。我们已经将这组同类元素用虚线框标记出来。')).toBeTruthy();
  });
  it('render with repeatTag', async () => {
    const attrs = {
      domain: 'release-messages.growingio.cn',
      path: 'pages/index/index',
      // query: undefined,
      // xpath: '/div.title/form.basic-grey/h1/span',
      index: '',
      href: '/link',
      content: '元素内容',
    };
    const limitCondition = {
      domain: 'release-messages.growingio.cn',
      path: 'pages/index/index',
      // query: undefined,
      // xpath: '/div.title/form.basic-grey/h1/span',
      index: '',
      href: '/link',
      content: '元素内容',
      contentType: '=',
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
    const wrapper = render(
      <ElementDefinitionRuleRender
        repeatTag={(repeatTag as unknown) as TagElement}
        attrs={attrs}
        limitCondition={limitCondition}
      />
    );
    expect(wrapper).toMatchSnapshot();
    // const exp = (
    //   <span>
    //     该规则已被
    //     <b>zhangxueqi</b>
    //     定义为
    //     <span>【 定义一个新的事件2 】。</span>
    //   </span>
    // );
    expect(screen.findByText(/^该规则已被/)).toBeTruthy();
  });
});

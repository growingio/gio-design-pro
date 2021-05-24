/* eslint-disable no-console */
import React from 'react';
// import { fireEvent, render, screen } from '@testing-library/react';
import { render, screen } from '@testing-library/react';
import ElementDefinitionRuleRender from '../ElementDefinitionRuleRender';
import { TagElement } from '../TagElement';
// import { mount, shallow, render } from 'enzyme';

jest.useFakeTimers();

describe('ElementDefinitionRuleRender Similar', () => {
  it('render Similar with content ,index,href and limit', async () => {
    const attrs = {
      domain: 'release-messages.growingio.cn',
      path: 'pages/index/index',
      xpath: '/div.title/form.basic-grey/h1/span',
      index: '1',
      href: '/link',
      content: '元素内容',
    };
    const limitCondition = {
      domain: 'release-messages.growingio.cn',
      path: 'pages/index/index',
      index: '1',
      href: '/link',
      content: '元素内容',
      contentType: '=',
    };

    render(<ElementDefinitionRuleRender attrs={attrs} limitCondition={limitCondition} />);

    // expect(container).toMatchSnapshot();
    expect(screen.queryByText(/元素位置为「第1位」/)).toBeTruthy();
    expect(screen.queryByText('元素内容为「元素内容」')).toBeTruthy();
    expect(screen.queryByText('若元素的内容、位置或跳转链接改变，就不再继续统计了。')).toBeTruthy();
  });
  it('render Similar without limit', async () => {
    const attrs = {
      domain: 'release-messages.growingio.cn',
      path: 'pages/index/index',
      xpath: '/div.title/form.basic-grey/h1/span',
      index: '1',
      href: '/link',
      content: '元素内容',
    };
    const limitCondition = {
      domain: 'release-messages.growingio.cn',
      path: 'pages/index/index',
      // index: '1',
      // href: '/link',
      // content: '元素内容',
      contentType: '=',
    };

    render(<ElementDefinitionRuleRender attrs={attrs} limitCondition={limitCondition} />);
    // expect(container).toMatchSnapshot();
    expect(screen.queryByText(/所有同类元素的数据之和。我们已经将这组同类元素用虚线框标记出来。/)).toBeTruthy();
  });
  it('render Similar without content,href', async () => {
    const attrs = {
      domain: 'release-messages.growingio.cn',
      path: 'pages/index/index',
      xpath: '/div.title/form.basic-grey/h1/span',
      index: '1',
      // href: '/link',
      // content: '元素内容',
    };
    const limitCondition = {
      domain: 'release-messages.growingio.cn',
      path: 'pages/index/index',
      // index: '1',
      // href: '/link',
      // content: '元素内容',
      contentType: '=',
    };

    render(<ElementDefinitionRuleRender attrs={attrs} limitCondition={limitCondition} />);

    // expect(container).toMatchSnapshot();
    expect(screen.queryByText(/所有同类元素的数据之和。我们已经将这组同类元素用虚线框标记出来。/)).toBeTruthy();
  });
  it('render Similar without href', async () => {
    const attrs = {
      domain: 'release-messages.growingio.cn',
      path: 'pages/index/index',
      xpath: '/div.title/form.basic-grey/h1/span',
      index: '1',
      // href: '/link',
      content: '元素内容',
    };
    const limitCondition = {
      domain: 'release-messages.growingio.cn',
      path: 'pages/index/index',
      index: '1',
      // href: '/link',
      content: '元素内容',
      contentType: '=',
    };

    render(<ElementDefinitionRuleRender attrs={attrs} limitCondition={limitCondition} />);

    expect(screen.queryByText(/元素位置为「第1位」/)).toBeTruthy();
    expect(screen.queryByText('元素内容为「元素内容」')).toBeTruthy();
    expect(screen.queryByText(/若元素的内容或位置改变，就不再继续统计了。/)).toBeTruthy();
  });
  it('render Similar without href and without content limit', async () => {
    const attrs = {
      domain: 'release-messages.growingio.cn',
      path: 'pages/index/index',
      xpath: '/div.title/form.basic-grey/h1/span',
      index: '1',
      // href: '/link',
      content: '元素内容',
    };
    const limitCondition = {
      domain: 'release-messages.growingio.cn',
      path: 'pages/index/index',
      index: '1',
      // href: '/link',
      // content: '元素内容',
      contentType: '=',
    };

    render(<ElementDefinitionRuleRender attrs={attrs} limitCondition={limitCondition} />);
    expect(screen.queryByText(/元素位置为「第1位」/)).toBeTruthy();
    expect(screen.queryByText('若元素的位置改变，就不再继续统计了。')).toBeTruthy();
    expect(screen.queryByText(/即使元素内容改变，也会继续统计。/)).toBeTruthy();
  });
  it('render Similar without href and without index limit', async () => {
    const attrs = {
      domain: 'release-messages.growingio.cn',
      path: 'pages/index/index',
      xpath: '/div.title/form.basic-grey/h1/span',
      index: '1',
      // href: '/link',
      content: '元素内容',
    };
    const limitCondition = {
      domain: 'release-messages.growingio.cn',
      path: 'pages/index/index',
      // index: '1',
      // href: '/link',
      content: '元素内容',
      contentType: '=',
    };

    render(<ElementDefinitionRuleRender attrs={attrs} limitCondition={limitCondition} />);

    expect(screen.queryByText(/同类元素内/)).toBeTruthy();
    expect(screen.queryByText('元素内容为「元素内容」')).toBeTruthy();
    expect(screen.queryByText('若元素的内容改变，就不再继续统计了。')).toBeTruthy();
    expect(screen.queryByText(/即使元素位置改变，也会继续统计。/)).toBeTruthy();
  });
  it('render Similar without href and without limit', async () => {
    const attrs = {
      domain: 'release-messages.growingio.cn',
      path: 'pages/index/index',
      xpath: '/div.title/form.basic-grey/h1/span',
      index: '1',
      // href: '/link',
      content: '元素内容',
    };
    const limitCondition = {
      domain: 'release-messages.growingio.cn',
      path: 'pages/index/index',
      // index: '1',
      // href: '/link',
      // content: '元素内容',
      contentType: '=',
    };

    render(<ElementDefinitionRuleRender attrs={attrs} limitCondition={limitCondition} />);

    expect(screen.queryByText(/所属页面/)).toBeTruthy();
    expect(screen.queryByText(/所有同类元素的数据之和。我们已经将这组同类元素用虚线框标记出来。/)).toBeTruthy();
  });
  it('render Similar with href and href limit', async () => {
    const attrs = {
      domain: 'release-messages.growingio.cn',
      path: 'pages/index/index',
      xpath: '/div.title/form.basic-grey/h1/span',
      index: '1',
      href: '/link',
      // content: '元素内容',
    };
    const limitCondition = {
      domain: 'release-messages.growingio.cn',
      path: 'pages/index/index',
      // index: '1',
      href: '/link',
      content: '元素内容',
      contentType: '=',
    };
    render(<ElementDefinitionRuleRender attrs={attrs} limitCondition={limitCondition} />);
    expect(screen.queryByText(/同类元素内/)).toBeTruthy();
    // expect(screen.queryByText('元素内容为「元素内容」')).toBeTruthy();
    expect(screen.queryByText(/若元素的跳转链接改变，就不再继续统计了。/)).toBeTruthy();
    expect(screen.queryByText(/即使元素位置改变，也会继续统计。/)).toBeTruthy();
  });
  it('render Similar with href and no limit', async () => {
    const attrs = {
      domain: 'release-messages.growingio.cn',
      path: 'pages/index/index',
      xpath: '/div.title/form.basic-grey/h1/span',
      index: '1',
      href: '/link',
      // content: '元素内容',
    };
    const limitCondition = {
      domain: 'release-messages.growingio.cn',
      path: 'pages/index/index',
      // index: '1',
      // href: '/link',
      content: '元素内容',
      contentType: '=',
    };
    // const { container } = render(<ElementDefinitionRuleRender attrs={attrs} limitCondition={limitCondition} />);
    // expect(container).toMatchSnapshot();
    render(<ElementDefinitionRuleRender attrs={attrs} limitCondition={limitCondition} />);
    expect(screen.queryByText(/同类元素内/)).toBeTruthy();
    expect(screen.queryByText(/所有同类元素的数据之和。我们已经将这组同类元素用虚线框标记出来。/)).toBeTruthy();
  });
  it('render Similar with href and index limit', async () => {
    const attrs = {
      domain: 'release-messages.growingio.cn',
      path: 'pages/index/index',
      xpath: '/div.title/form.basic-grey/h1/span',
      index: '1',
      href: '/link',
      // content: '元素内容',
    };
    const limitCondition = {
      domain: 'release-messages.growingio.cn',
      path: 'pages/index/index',
      index: '1',
      // href: '/link',
      content: '元素内容',
      contentType: '=',
    };
    // const { container } = render(<ElementDefinitionRuleRender attrs={attrs} limitCondition={limitCondition} />);
    // expect(container).toMatchSnapshot();
    render(<ElementDefinitionRuleRender attrs={attrs} limitCondition={limitCondition} />);
    expect(screen.queryByText(/同类元素内/)).toBeTruthy();
    expect(screen.queryByText(/元素位置为「第1位」/)).toBeTruthy();
    expect(screen.queryByText(/若元素的位置改变，就不再继续统计了。/)).toBeTruthy();
    expect(screen.queryByText(/即使元素跳转链接改变，也会继续统计。/)).toBeTruthy();
  });
  it('render Similar with content,href and index limit', async () => {
    const attrs = {
      domain: 'release-messages.growingio.cn',
      path: 'pages/index/index',
      xpath: '/div.title/form.basic-grey/h1/span',
      index: '1',
      href: '/link',
      content: '元素内容',
    };
    const limitCondition = {
      domain: 'release-messages.growingio.cn',
      path: 'pages/index/index',
      index: '1',
      // href: '/link',
      // content: '元素内容',
      contentType: '=',
    };
    render(<ElementDefinitionRuleRender attrs={attrs} limitCondition={limitCondition} />);
    expect(screen.queryByText(/同类元素内/)).toBeTruthy();
    expect(screen.queryByText(/若元素的位置改变，就不再继续统计了。/)).toBeTruthy();
    expect(screen.queryByText(/即使元素内容和跳转链接改变，也会继续统计。/)).toBeTruthy();
  });
  it('render Similar with content,href and href limit', async () => {
    const attrs = {
      domain: 'release-messages.growingio.cn',
      path: 'pages/index/index',
      xpath: '/div.title/form.basic-grey/h1/span',
      index: '1',
      href: '/link',
      content: '元素内容',
    };
    const limitCondition = {
      domain: 'release-messages.growingio.cn',
      path: 'pages/index/index',
      // index: '1',
      href: '/link',
      // content: '元素内容',
      contentType: '=',
    };
    render(<ElementDefinitionRuleRender attrs={attrs} limitCondition={limitCondition} />);
    expect(screen.queryByText(/同类元素内/)).toBeTruthy();
    expect(screen.queryByText(/若元素的跳转链接改变，就不再继续统计了。/)).toBeTruthy();
    expect(screen.queryByText(/即使元素内容和位置改变，也会继续统计。/)).toBeTruthy();
  });
  it('render Similar with href and index,href limit', async () => {
    const attrs = {
      domain: 'release-messages.growingio.cn',
      path: 'pages/index/index',
      xpath: '/div.title/form.basic-grey/h1/span',
      index: '1',
      href: '/link',
      // content: '元素内容',
    };
    const limitCondition = {
      domain: 'release-messages.growingio.cn',
      path: 'pages/index/index',
      index: '1',
      href: '/link',
      // content: '元素内容',
      contentType: '=',
    };
    render(<ElementDefinitionRuleRender attrs={attrs} limitCondition={limitCondition} />);
    expect(screen.queryByText(/同类元素内/)).toBeTruthy();
    expect(screen.queryByText(/元素位置为「第1位」/)).toBeTruthy();
    expect(screen.queryByText(/若元素的位置或跳转链接改变，就不再继续统计了。/)).toBeTruthy();
  });
  it('render Similar with content,href and content,href limit', async () => {
    const attrs = {
      domain: 'release-messages.growingio.cn',
      path: 'pages/index/index',
      xpath: '/div.title/form.basic-grey/h1/span',
      index: '1',
      href: '/link',
      content: '元素内容',
    };
    const limitCondition = {
      domain: 'release-messages.growingio.cn',
      path: 'pages/index/index',
      // index: '1',
      href: '/link',
      content: '元素内容',
      contentType: '=',
    };
    render(<ElementDefinitionRuleRender attrs={attrs} limitCondition={limitCondition} />);
    expect(screen.queryByText(/同类元素内/)).toBeTruthy();
    expect(screen.queryByText(/若元素的内容或跳转链接改变，就不再继续统计了。/)).toBeTruthy();
    expect(screen.queryByText(/即使元素位置改变，也会继续统计。/)).toBeTruthy();
  });
});
describe('ElementDefinitionRuleRender NoSimilar', () => {
  it('render NoSimilar with limit', async () => {
    const attrs = {
      domain: 'release-messages.growingio.cn',
      path: 'pages/index/index',
      xpath: '/div.title/form.basic-grey/h1/span',
      // index: '1',
      href: '/link',
      content: '元素内容',
    };
    const limitCondition = {
      domain: 'release-messages.growingio.cn',
      path: 'pages/index/index',
      index: '1',
      href: '/link',
      content: '元素内容',
      contentType: '=',
    };
    const { container } = render(<ElementDefinitionRuleRender attrs={attrs} limitCondition={limitCondition} />);
    expect(container).toMatchSnapshot();
  });
  it('render NoSimilar with href limit', async () => {
    const attrs = {
      domain: 'release-messages.growingio.cn',
      path: 'pages/index/index',
      xpath: '/div.title/form.basic-grey/h1/span',
      // index: '1',
      href: '/link',
      content: '元素内容',
    };
    const limitCondition = {
      domain: 'release-messages.growingio.cn',
      path: 'pages/index/index',
      index: '1',
      href: '/link',
      // content: '元素内容',
      contentType: '=',
    };
    const { container } = render(<ElementDefinitionRuleRender attrs={attrs} limitCondition={limitCondition} />);
    expect(container).toMatchSnapshot();
  });
  it('render NoSimilar without limit', async () => {
    const attrs = {
      domain: 'release-messages.growingio.cn',
      path: 'pages/index/index',
      xpath: '/div.title/form.basic-grey/h1/span',
      href: '/link',
      content: '元素内容',
    };
    const limitCondition = {
      domain: 'release-messages.growingio.cn',
      path: 'pages/index/index',
      // href: '/link',
      contentType: '=',
    };
    const { container } = render(<ElementDefinitionRuleRender attrs={attrs} limitCondition={limitCondition} />);
    expect(container).toMatchSnapshot();
  });
  it('render NoSimilar without attrs and without limit', async () => {
    const attrs = {
      domain: 'release-messages.growingio.cn',
      path: 'pages/index/index',
      xpath: '/div.title/form.basic-grey/h1/span',
      // href: '/link',
      // content: '元素内容',
    };
    const limitCondition = {
      domain: 'release-messages.growingio.cn',
      path: 'pages/index/index',
      // href: '/link',
      contentType: '=',
    };
    const { container } = render(<ElementDefinitionRuleRender attrs={attrs} limitCondition={limitCondition} />);
    expect(container).toMatchSnapshot();
  });
  it('render NoSimilar without content and without limit', async () => {
    const attrs = {
      domain: 'release-messages.growingio.cn',
      path: 'pages/index/index',
      xpath: '/div.title/form.basic-grey/h1/span',
      href: '/link',
      // content: '元素内容',
    };
    const limitCondition = {
      domain: 'release-messages.growingio.cn',
      path: 'pages/index/index',
      // href: '/link',
      contentType: '=',
    };
    const { container } = render(<ElementDefinitionRuleRender attrs={attrs} limitCondition={limitCondition} />);
    expect(container).toMatchSnapshot();
  });
  it('render NoSimilar without content and href limit', async () => {
    const attrs = {
      domain: 'release-messages.growingio.cn',
      path: 'pages/index/index',
      xpath: '/div.title/form.basic-grey/h1/span',
      href: '/link',
      // content: '元素内容',
    };
    const limitCondition = {
      domain: 'release-messages.growingio.cn',
      path: 'pages/index/index',
      href: '/link',
      contentType: '=',
    };
    const { container } = render(<ElementDefinitionRuleRender attrs={attrs} limitCondition={limitCondition} />);
    expect(container).toMatchSnapshot();
  });
  it('render NoSimilar with content ,href and content limit', async () => {
    const attrs = {
      domain: 'release-messages.growingio.cn',
      path: 'pages/index/index',
      xpath: '/div.title/form.basic-grey/h1/span',
      href: '/link',
      content: '元素内容',
    };
    const limitCondition = {
      domain: 'release-messages.growingio.cn',
      path: 'pages/index/index',
      // href: '/link',
      content: '元素内容',
      contentType: '=',
    };
    const { container } = render(<ElementDefinitionRuleRender attrs={attrs} limitCondition={limitCondition} />);
    expect(container).toMatchSnapshot();
  });
  it('render NoSimilar without content ,href', async () => {
    const attrs = {
      domain: 'release-messages.growingio.cn',
      path: 'pages/index/index',
      xpath: '/div.title/form.basic-grey/h1/span',
      // href: '/link',
      // content: '元素内容',
    };
    const limitCondition = {
      domain: 'release-messages.growingio.cn',
      path: 'pages/index/index',
      // href: '/link',
      content: '元素内容',
      contentType: '=',
    };
    const { container } = render(<ElementDefinitionRuleRender attrs={attrs} limitCondition={limitCondition} />);
    expect(container).toMatchSnapshot();
  });
  it('render with content and contentType=match_phrase limit', async () => {
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
      content: '元素内容',
      contentType: 'match_phrase',
    };
    const { container } = render(<ElementDefinitionRuleRender attrs={attrs} limitCondition={limitCondition} />);
    expect(container).toMatchSnapshot();
    expect(screen.queryByText('元素内容包含「元素内容」')).toBeTruthy();
  });
  it('render with content and content limit', async () => {
    const attrs = {
      domain: 'release-messages.growingio.cn',
      path: 'pages/index/index',
      xpath: '/div.title/form.basic-grey/h1/span',
      // index: '1',
      // href: '/link',
      content: '元素内容',
    };
    const limitCondition = {
      domain: 'release-messages.growingio.cn',
      path: 'pages/index/index',
      index: '',
      href: '/link',
      content: '元素内容',
      contentType: '=',
    };
    const { container } = render(<ElementDefinitionRuleRender attrs={attrs} limitCondition={limitCondition} />);
    expect(container).toMatchSnapshot();
  });
  it('render without limit', async () => {
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
      contentType: '=',
    };
    const { container } = render(<ElementDefinitionRuleRender attrs={attrs} limitCondition={limitCondition} />);
    expect(container).toMatchSnapshot();
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
    const { container } = render(
      <ElementDefinitionRuleRender
        repeatTag={(repeatTag as unknown) as TagElement}
        attrs={attrs}
        limitCondition={limitCondition}
      />
    );
    expect(container).toMatchSnapshot();

    expect(screen.findByText(/^该规则已被/)).toBeTruthy();
  });
});

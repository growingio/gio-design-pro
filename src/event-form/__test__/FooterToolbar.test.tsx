/* eslint-disable no-console */
import React from 'react';
import { render, within } from '@testing-library/react';
import { Button } from '@gio-design/components';
import FooterToolbar from '../components/FooterToolbar';
// import { mount, shallow, render } from 'enzyme';

jest.useFakeTimers();

describe('FooterToolbar', () => {
  it('render FooterToolbar with container', async () => {
    const root = document.createElement('div');
    root.id = 'footer-container';
    const renderer = (
      <FooterToolbar container={root} extra={<Button>上一步</Button>}>
        <Button>确定</Button>
        <Button>取消</Button>
      </FooterToolbar>
    );
    const wrap = within(root);
    render(renderer);
    expect(wrap.queryByText('确 定')).toBeTruthy();
    expect(wrap.queryByText('取 消')).toBeTruthy();
    expect(wrap.queryByText('上一步')).toBeTruthy();
  });
});

import React from 'react';
import { mount } from 'enzyme';
import InOrNotIn from '../InOrNotIn.tsx';
import { sleep } from '../../../../../../../__test__/utils.ts';

describe('<InOrNotIn />', () => {
  const originalOffsetHeight = Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'offsetHeight');
  const originalOffsetWidth = Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'offsetWidth');
  beforeEach(() => {
    // For <List /> use <AutoSizer />.
    // <AutoSizer /> uses offsetWidth and offsetHeight.
    // Jest runs in JSDom which doesn't support measurements APIs.
    // @see https://github.com/testing-library/react-testing-library/issues/353#issuecomment-510046921
    Object.defineProperty(HTMLElement.prototype, 'offsetHeight', { configurable: true, value: 320 });
    Object.defineProperty(HTMLElement.prototype, 'offsetWidth', { configurable: true, value: 160 });
  });

  afterEach(() => {
    Object.defineProperty(HTMLElement.prototype, 'offsetHeight', originalOffsetHeight);
    Object.defineProperty(HTMLElement.prototype, 'offsetWidth', originalOffsetWidth);
  });
  it('render', () => {
    const wrapper = mount(<InOrNotIn />);
    expect(wrapper.render()).toMatchSnapshot();
  });

  it('should be can input.', async () => {
    const wrapper = mount(
      <InOrNotIn
        attrChange={() => {}}
        curryDimensionValueRequest={() => new Promise((resolve) => resolve(['www.GrowingIO.com']))}
        valueType="string"
        exprKey="test_key"
        values={[]}
      />
    );
    await sleep(100);
    wrapper.update();
    wrapper.find('.gio-input > input').simulate('change', { target: { value: 't,s' } });
    wrapper.find('.gio-input > input').simulate('change', { target: { value: 't,' } });
    expect(wrapper.render()).toMatchSnapshot();
  });

  it('should be can select', async () => {
    const wrapper = mount(
      <InOrNotIn
        attrChange={() => {}}
        curryDimensionValueRequest={() => new Promise((resolve) => resolve(['www.GrowingIO.com']))}
        valueType="string"
        exprKey="test_key"
        values={[]}
      />
    );
    await sleep(100);
    wrapper.update();
    wrapper.find('.gio-list-wrapper .gio-select-option').simulate('click');
    wrapper.find('.gio-input > input').simulate('change', { target: { value: '' } });
  });

  it('自有输入', async () => {
    const wrapper = mount(
      <InOrNotIn
        attrChange={() => {}}
        curryDimensionValueRequest={() => new Promise((resolve) => resolve(['www.GrowingIO.com']))}
        valueType="string"
        exprKey="test_key"
        values={[]}
      />
    );
    await sleep(100);
    wrapper.update();
    wrapper.find('.gio-input > input').simulate('change', { target: { value: 'test1,' } });
    wrapper.find('.gio-input > input').simulate('change', { target: { value: 'test1,test2' } });
    await sleep(100);
    wrapper.update();
    wrapper.find('.gio-list-wrapper .gio-select-option').at(0).simulate('click');
    wrapper.find('.gio-list-wrapper .gio-select-option').at(0).simulate('click');
  });
});

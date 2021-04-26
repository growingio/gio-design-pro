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
    Object.defineProperty(HTMLElement.prototype, 'offsetHeight', {
      configurable: true,
      value: 320,
    });
    Object.defineProperty(HTMLElement.prototype, 'offsetWidth', {
      configurable: true,
      value: 160,
    });
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
    await sleep(500);
    wrapper.update();
    wrapper.find('.gio-select-option').at(0).simulate('click');
    wrapper.find('.gio-input > input').simulate('change', { target: { value: '' } });
  });

  it('search without result', async () => {
    const wrapper = mount(
      <InOrNotIn
        attrChange={() => {}}
        curryDimensionValueRequest={() => new Promise((resolve) => resolve([]))}
        valueType="string"
        exprKey="test_key"
        values={[]}
      />
    );
    await sleep(100);
    wrapper.update();
    wrapper.find('.gio-input > input').simulate('change', { target: { value: 'test' } });
    await sleep(100);
    wrapper.update();
    await sleep(500);
    wrapper.update();
    expect(wrapper.find('.gio-select-option')).toHaveLength(0);
  });

  it('free input without search result ', async () => {
    const wrapper = mount(
      <InOrNotIn
        attrChange={() => {}}
        curryDimensionValueRequest={() => new Promise((resolve) => resolve([]))}
        valueType="string"
        exprKey="test_key"
        values={[]}
      />
    );
    await sleep(100);
    wrapper.update();
    wrapper.find('.gio-input > input').simulate('change', { target: { value: 't,s,' } });
    wrapper.update();
    wrapper.find('.gio-input > input').simulate('change', { target: { value: 'test1' } });
    await sleep(800);
    expect(wrapper.find('.gio-select-option')).toHaveLength(0);
  });

  it('list double click delete checkValue', async () => {
    const wrapper = mount(
      <InOrNotIn
        attrChange={() => {}}
        curryDimensionValueRequest={() => new Promise((resolve) => resolve(['test', 'test1', 'test2']))}
        valueType="string"
        exprKey="test_key"
        values={['test']}
      />
    );
    await sleep(100);
    wrapper.update();
    expect(wrapper.find('.gio-select-option')).toHaveLength(3);
    expect(wrapper.find('.gio-select-option').at(0).text()).toBe('test');
    wrapper.find('.gio-select-option').at(0).simulate('click');
    await sleep(100);
    // wrapper.update();
    // expect(wrapper.find('.gio-input > .gio-input__content').instance().value).toBe('aaa');
  });

  it('Throttling input', async () => {
    const wrapper = mount(
      <InOrNotIn
        attrChange={() => {}}
        curryDimensionValueRequest={() => new Promise((resolve) => resolve(['test']))}
        valueType="string"
        exprKey="test_key"
        values={['test']}
      />
    );
    await sleep(100);
    wrapper.update();
    wrapper.find('.gio-input > input').simulate('change', { target: { value: 'test1' } });
    await sleep(100);
    wrapper.find('.gio-input > input').simulate('change', { target: { value: 'test2' } });
  });

  it('free input', async () => {
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
    await sleep(500);
    wrapper.update();
    wrapper.find('.gio-select-option').at(0).simulate('click');
  });
});

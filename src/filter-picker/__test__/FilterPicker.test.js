import React from 'react';
import { mount, render } from 'enzyme';
import { act } from 'react-test-renderer';
import FilterPicker from '..';
import { sleep } from './utils.ts';

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

  jest.useFakeTimers();
});

afterEach(() => {
  Object.defineProperty(HTMLElement.prototype, 'offsetHeight', originalOffsetHeight);
  Object.defineProperty(HTMLElement.prototype, 'offsetWidth', originalOffsetWidth);

  jest.useRealTimers();
});

describe('FilterPicker', () => {
  // 基础渲染
  const getFilterPicker = (props) => (
    <FilterPicker
      propertyOptions={[
        {
          id: 'test_int_id',
          name: 'test_int_name',
          groupId: 'user',
          groupName: '用户属性',
          type: 'usr',
          valueType: 'int',
          __typename: 'Dimension',
        },
      ]}
      filter={{ op: 'and', exprs: [], __typename: 'directivesFilter' }}
      {...props}
    />
  );

  it('should match FilterPicker base snapshot.', () => {
    const wrapper = render(getFilterPicker());
    expect(wrapper).toMatchSnapshot();
  });

  // 使用 children 时，应该正确显示
  it('when use children, should render it correctly', () => {
    const children = <div>过滤选择器</div>;
    const wrapper = render(getFilterPicker({ children }));
    expect(wrapper.text()).toEqual('过滤选择器');
    expect(wrapper).toMatchSnapshot();
  });

  it('should render correctly', () => {
    const wrapper = mount(getFilterPicker());
    // 点击过滤器按钮触发过滤弹窗
    wrapper.find('button').at(0).simulate('click');

    // 此时这两个按钮应该为 disabled 状态
    const buttons = wrapper.find('button[disabled]');
    expect(buttons.at(0).text()).toBe('添加过滤条件');
    expect(buttons.at(1).text()).toBe('确 认');
    wrapper.find('.gio-selector').simulate('click');
    // 正确渲染 1 个属性
    expect(wrapper.find('.gio-selector').hasClass('gio-selector--actived')).toBe(true);
  });

  it('cancel', () => {
    const wrapper = mount(getFilterPicker());
    wrapper.find('button').simulate('click');
    wrapper.find('.gio-dropdown').find('.filter-contidion-footer button').at(0).simulate('click');
    expect(wrapper.find('.gio-dropdown')).toHaveLength(0);
  });

  it('onConfirm', async () => {
    const onConfirm = jest.fn();
    const wrapper = mount(getFilterPicker({ onConfirm }));
    act(() => {
      wrapper.find('button').at(0).simulate('click');
    });
    act(() => {
      wrapper.find('.gio-selector').simulate('click');
    });
    act(() => {
      wrapper.find('Dropdown').at(1).find('.gio-list__item').at(0).simulate('click');
    });
    expect(wrapper.find('.gio-selector').at(0).text()).toBe('test_int_name');
    expect(wrapper.find('.filter-condition_select').exists()).toBe(true);
    act(() => {
      wrapper.find('.gio-selector').at(1).simulate('click');
    });
    act(() => {
      wrapper.find('.gio-select-selector').simulate('click');
    });
    act(() => {
      wrapper.find('.gio-select-dropdown .gio-select-list-option').at(1).simulate('click');
    });
    await sleep(100);
    wrapper.update();
    act(() => {
      wrapper.find('.filter-attr_select-box').find('.filter-contidion-footer').find('button').at(1).simulate('click');
    });
    await sleep(100);
    wrapper.update();
    act(() => {
      wrapper.find('.filter-condition_box .filter-contidion-footer').at(1).find('button').at(1).simulate('click');
    });
    expect(onConfirm).toBeCalledTimes(1);
  });
});

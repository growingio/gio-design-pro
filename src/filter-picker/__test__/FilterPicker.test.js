import React from 'react';
import { mount, render } from 'enzyme';
import FilterPicker from '..';
import { sleep } from './utils.ts';

const defaultProps = {
  propertyOptions: new Array(10).fill(0).map((value, index) => {
    return {
      id: `usr_test_${index}_int`,
      name: `test_${index}_int`,
      groupId: 'user',
      groupName: '用户属性',
      type: 'usr',
      valueType: 'int',
      __typename: 'Dimension',
    };
  }),
  filter: { op: 'and', exprs: [], __typename: 'directivesFilter' },
};

describe('FilterPicker', () => {
  const getFilterPicker = (props) => (
    <FilterPicker propertyOptions={defaultProps.propertyOptions} filter={defaultProps.filter} {...props} />
  );

  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  // 基础渲染
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

    wrapper.find('.gio-picker-trigger').simulate('click');
    // 正确渲染 10 个属性
    const items = wrapper.find('.cascader-menu-item-inner');
    expect(items.length).toBe(10);
    items.forEach((node, index) => {
      expect(node.text()).toBe(defaultProps.propertyOptions[index].name);
    });
  });

  it('can be selected', async () => {
    const onConfirm = jest.fn();
    const wrapper = mount(getFilterPicker({ onConfirm }));

    // 点击”过滤器“按钮，触发”过滤弹窗“
    wrapper.find('button').at(0).simulate('click');
    // 点击”选择属性“触发”属性选择器“
    wrapper.find('.gio-picker-trigger').simulate('click');

    expect(wrapper.find('.gio-property-picker-trigger').hasClass('open')).toBe(true);
    expect(wrapper).toMatchSnapshot();
    // 在”属性选择器”中选择数字类型，会触发“选择过滤条件”
    wrapper.find('Dropdown').at(1).find('.cascader-menu-item-inner').at(0).simulate('click');
    await sleep(100);
    // Syncs the enzyme component tree snapshot with the react component tree. Useful to run before checking the render output if something external may be updating the state of the component somewhere.
    wrapper.update();
    expect(wrapper.find('.gio-picker-trigger').text()).toBe('test_0_int');

    expect(wrapper.find('.filter-condition_select').exists()).toBe(true);
    // 点击“选择过滤条件”，会触发“过滤条件弹窗”
    wrapper.find('.filter-condition_select').simulate('click');
    // 点击确认按钮
    wrapper.find('Dropdown').at(2).find('.filter-contidion-footer').find('button').at(1).simulate('click');
    expect(wrapper.find('Dropdown').at(2).find('.filter-condition_select').text()).toBe('等于0');
    // 点击确认按钮
    wrapper.find('Dropdown').at(0).find('.filter-contidion-footer').find('button').at(1).simulate('click');
    expect(onConfirm).toBeCalledWith({
      __typename: 'directivesFilter',
      exprs: [{ key: 'usr_test_0_int', name: 'test_0_int', op: '=', valueType: 'int', values: ['0'] }],
      op: 'and',
    });
  });
});

import React, { useState } from 'react';
import { render, screen } from '@testing-library/react';
import { mount } from 'enzyme';
import List from '../List';
import { defaultItems, properties, multiplePropertys } from './data';

describe('List', () => {
  it('has static propties', () => {
    expect(List.Item).toBeTruthy();
    expect(List.ItemGroup).toBeTruthy();
    expect(List.ItemSubgroup).toBeTruthy();
    expect(List.Divider).toBeTruthy();
  });

  it('render empty when no children and items', () => {
    render(<List />);
    expect(screen.queryByText('No data')).toBeTruthy();
  });

  it('renders with JSX style API', () => {
    render(
      <List>
        <List.ItemGroup title="Group 1">
          <List.Item>Item 1</List.Item>
          <List.Item>Item 2</List.Item>
          <List.Item>Item 3</List.Item>
        </List.ItemGroup>
        <List.ItemGroup title="Group 2">
          <List.ItemSubgroup title="Subgroup 1">
            <List.Item>Item 1</List.Item>
            <List.Item>Item 2</List.Item>
            <List.Item>Item 3</List.Item>
          </List.ItemSubgroup>
        </List.ItemGroup>
      </List>
    );
    expect(screen.queryByText('Group 1')).toBeTruthy();
    expect(screen.queryByText('Subgroup 1')).toBeTruthy();
    expect(screen.getAllByText('Item 1')).toHaveLength(2);
  });

  it('renders items', () => {
    render(<List items={defaultItems} />);
    expect(screen.getAllByRole('option')).toHaveLength(defaultItems.length);
  });

  it('renders Multiply items', () => {
    const itmes = [
      { key: 'item-1', children: 'Item 1', descrition: '这是一段描述', prefix: <div>aaaa</div>, tagInfo: '超管' },
    ];
    const wrapper = mount(
      <List items={itmes} values={['item-7', 'item-6', 'item-9', 'item-4']} allSelected={false} size="large" />
    );

    expect(wrapper.render()).toMatchSnapshot();
  });

  it('single item change', () => {
    const wrapperSingle = mount(
      <List
        items={multiplePropertys}
        values={['item-7', 'item-6', 'item-9', 'item-4']}
        allSelected={false}
        size="large"
      />
    );
    expect(wrapperSingle.render()).toMatchSnapshot();
    wrapperSingle.find('.gio-list__item-multifunction').at(0).simulate('click');
  });

  it('multiply item change', () => {
    const wrapperMultiple = mount(
      <List
        items={multiplePropertys}
        values={['item-7', 'item-6', 'item-9', 'item-4']}
        multiple
        allSelected={false}
        size="large"
      />
    );
    expect(wrapperMultiple.render()).toMatchSnapshot();
    wrapperMultiple.find('.gio-list__item-multifunction').at(0).simulate('click');
    expect(wrapperMultiple.render()).toMatchSnapshot();
    wrapperMultiple.find('.gio-list__item-multifunction').at(0).simulate('click');
    expect(wrapperMultiple.render()).toMatchSnapshot();
    wrapperMultiple.find('.gio-checkbox-input').at(0).simulate('click');
  });

  it('multiply allSelect change', async () => {
    function sleep(time) {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve();
        }, time);
      });
    }
    const onChange = jest.fn();
    function Wrapper() {
      const [select, setSelect] = useState(false);
      return (
        <>
          <div className="mockButtonTrue" onClick={() => setSelect(true)} aria-hidden="true">
            test
          </div>
          <div className="mockButtonFalse" onClick={() => setSelect(false)} aria-hidden="true">
            test
          </div>
          <List
            items={multiplePropertys}
            values={['item-7', 'item-6', 'item-9', 'item-4']}
            multiple
            allSelected={select}
            size="large"
            onChange={onChange}
          />
        </>
      );
    }
    const wrapperMultiple = mount(<Wrapper />);
    expect(wrapperMultiple.render()).toMatchSnapshot();
    wrapperMultiple.find('.mockButtonTrue').at(0).simulate('click');
    await sleep(100);
    expect(wrapperMultiple.render()).toMatchSnapshot();
    wrapperMultiple.find('.mockButtonFalse').at(0).simulate('click');
    await sleep(100);
    expect(wrapperMultiple.render()).toMatchSnapshot();
  });

  it('renders groups', () => {
    render(<List items={properties} expandable />);
    expect(screen.queryByText('事件属性'));
    expect(screen.queryByText('地域信息'));
    expect(screen.queryByText('商品 01'));
  });
});

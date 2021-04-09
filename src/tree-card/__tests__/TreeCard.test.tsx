import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import TreeCard from '../TreeCard';
import { TreeCardProps } from '../interfaces';
import { data, DataType } from './data';

describe('<TreeCard/> test', () => {
  const getTreeCard = (args: TreeCardProps<DataType>) => <TreeCard {...args} />;

  it("should't display when prop is't given", () => {
    const args = {
      title: '标题',
      searchBar: { placeholder: '请输入' },
      footerButton: { children: '确定' },
      treeConfig: { data, operationMenu: { options: [{ label: '添加', value: 'add' }] } },
    };
    const { container, rerender } = render(getTreeCard(args));
    expect(container.getElementsByClassName('gio-tree-card-title')).toHaveLength(1);
    expect(container.getElementsByClassName('gio-tree-card-divider')).toHaveLength(1);
    expect(container.getElementsByClassName('gio-tree-card-searchbar')).toHaveLength(1);
    expect(container.getElementsByClassName('gio-tree-card-footer')).toHaveLength(1);
    expect(container.getElementsByClassName('gio-tree-card-tree-node-operation').length > 0).toBeTruthy();
    delete args.title;
    delete args.searchBar;
    delete args.footerButton;
    delete args.treeConfig.operationMenu;
    rerender(getTreeCard(args));
    expect(container.getElementsByClassName('gio-tree-card-title')).toHaveLength(0);
    expect(container.getElementsByClassName('gio-tree-card-divider')).toHaveLength(0);
    expect(container.getElementsByClassName('gio-tree-card-searchbar')).toHaveLength(0);
    expect(container.getElementsByClassName('gio-tree-card-footer')).toHaveLength(0);
    expect(container.getElementsByClassName('gio-tree-card-tree-node-operation')).toHaveLength(0);
  });

  test('customTitle', () => {
    const args: TreeCardProps<DataType> = {
      treeConfig: {
        data,
        customTitle: (record: DataType) => `${record.name}name`,
      },
    };
    const { getByText } = render(getTreeCard(args));
    expect(getByText(`${data[0].name}name`)).toBeTruthy();
  });

  test('customIcon', () => {
    const args: TreeCardProps<DataType> = {
      treeConfig: {
        data,
        customIcon: () => <hr data-testid="icon" />,
      },
    };
    const { getAllByTestId } = render(getTreeCard(args));
    expect(getAllByTestId('icon')).toBeTruthy();
  });

  test('operationMenu options', () => {
    const args: TreeCardProps<DataType> = {
      treeConfig: {
        data,
        operationMenu: {
          options: (record: DataType) => {
            if (record.key === '1') {
              return [{ label: '添加', value: 'add' }];
            }
            return [
              { label: '添加', value: 'add' },
              { label: '删除', value: 'delete' },
            ];
          },
        },
      },
    };
    const { container, getByText } = render(getTreeCard(args));
    fireEvent.click(container.getElementsByTagName('button')[0]);
    expect(getByText('添加')).toBeTruthy();
  });
  it('should be n-1 divider lines ', () => {
    const args: TreeCardProps<DataType> = {
      treeConfig: [{ data }, { data }, { data }],
    };
    const { container } = render(getTreeCard(args));
    expect(container.getElementsByClassName('gio-tree-card-tree-divider')).toHaveLength(2);
  });

  test('parentNodeSelectable === false', () => {
    const onExpand = jest.fn();
    const args: TreeCardProps<DataType> = {
      treeConfig: [{ data }],
      parentNodeSelectable: false,
      onExpand,
    };
    const { container, getByText, getAllByText } = render(getTreeCard(args));
    fireEvent.click(getByText('第一个一级分类'));
    expect(container.getElementsByClassName('gio-tree-treenode-selected')).toHaveLength(0);
    expect(getAllByText('二级分类').length > 0).toBeTruthy();
    fireEvent.click(getAllByText('二级分类')[0]);
    expect(container.getElementsByClassName('gio-tree-treenode-selected')).toHaveLength(1);
    expect(onExpand).toBeCalled();
  });

  test('parentNodeSelectable === true', () => {
    const args: TreeCardProps<DataType> = {
      treeConfig: [{ data }, { data: [{ key: 'new-2', name: '第二组' }] }],
    };
    const { getByText, container } = render(getTreeCard(args));
    fireEvent.click(getByText('第二组'));
    expect(container.getElementsByClassName('gio-tree-treenode-selected')).toHaveLength(1);
    fireEvent.click(getByText('第一个一级分类'));
    expect(container.getElementsByClassName('gio-tree-treenode-selected')).toHaveLength(1);
    fireEvent.click(getByText('第一个一级分类'));
    expect(container.getElementsByClassName('gio-tree-treenode-selected')).toHaveLength(0);
  });

  test('onExpand props', () => {
    const onExpand = jest.fn();
    const args: TreeCardProps<DataType> = {
      treeConfig: [{ data }],
      onExpand,
    };
    const { container } = render(getTreeCard(args));
    fireEvent.click(container.getElementsByClassName('gio-tree-switcher')[0]);
    expect(container.getElementsByClassName('gio-tree-switcher_open')).toHaveLength(1);
    expect(onExpand).toBeCalled();
  });
});

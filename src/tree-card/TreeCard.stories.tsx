/* eslint-disable no-param-reassign */
import React, { useState, useMemo } from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import { FolderOutlined } from '@gio-design/icons';
import { isArray, cloneDeep } from 'lodash';
import { TreeCard, TreeCardProps } from './index';
import { data, DataType } from './__tests__/data';
import './style';

export default {
  title: 'Business Components/TreeCard',
  component: TreeCard,
} as Meta;

const Template: Story<
  TreeCardProps<DataType> & { showTitle: boolean; showSearchBar: boolean; showFooterButton: boolean }
> = (args) => {
  const { showTitle, showSearchBar, showFooterButton, ...rest } = args;
  if (!showTitle) {
    delete rest.title;
  }
  if (!showSearchBar) {
    delete rest.searchBar;
  }
  if (!showFooterButton) {
    delete rest.footerButton;
  }

  return (
    <div style={{ height: 'calc(100vh - 50px)' }}>
      <TreeCard {...rest} />
    </div>
  );
};

export const Default = Template.bind({});
Default.args = {
  title: '标题',
  searchBar: {
    placeholder: '搜索...',
  },
  footerButton: {
    children: '新建',
  },
  treeConfig: {
    data,
    customIcon: () => <FolderOutlined />,
    customIsLeaf: (record: DataType) => (record.children?.length === undefined ? true : record.children?.length === 0),
  },
  showTitle: true,
  showSearchBar: true,
  showFooterButton: true,
};

export const DisplayModeTree = () => {
  const [searchText, setSearchText] = useState<string>('');

  const treeFilterBySearchText = (_data: DataType[]): DataType[] =>
    _data.filter(
      (item) =>
        item.name.includes(searchText) || (isArray(item.children) && treeFilterBySearchText(item.children).length !== 0)
    );

  const filteredData = useMemo(() => (searchText === '' ? data : treeFilterBySearchText(cloneDeep(data))), [
    searchText,
  ]);

  return (
    <div style={{ height: 'calc(100vh - 50px)' }}>
      <TreeCard<DataType>
        parentNodeSelectable={false}
        title="展示"
        searchBar={{
          placeholder: '搜索...',
          value: searchText,
          onChange: setSearchText,
        }}
        footerButton={{
          children: '新建',
        }}
        treeConfig={[
          {
            title: '默认分类',
            data: [
              {
                key: 'all',
                name: '全部(200)',
              },
              {
                key: 'none',
                name: '未分类(30)',
              },
            ],
            customIcon: () => <FolderOutlined />,
            customIsLeaf: (record) => (record.children?.length === undefined ? true : record.children?.length === 0),
          },
          {
            data: filteredData,
            customIcon: () => <FolderOutlined />,
            customIsLeaf: (record) => (record.children?.length === undefined ? true : record.children?.length === 0),
          },
        ]}
      />
    </div>
  );
};

export const MangerModeTree = () => (
  <div style={{ height: 'calc(100vh - 50px)' }}>
    <TreeCard<DataType>
      title="管理"
      footerButton={{
        children: '新建',
      }}
      treeConfig={[
        {
          title: '默认分类',
          data: [
            {
              key: 'all',
              name: '全部(200)',
            },
            {
              key: 'none',
              name: '未分类(30)',
            },
          ],
          customIcon: () => <FolderOutlined />,
          customIsLeaf: (record) => (record.children?.length === undefined ? true : record.children?.length === 0),
        },
        {
          title: '自定义分类',
          data,
          customIcon: () => <FolderOutlined />,
          customIsLeaf: (record) => (record.children?.length === undefined ? true : record.children?.length === 0),
          operationMenu: {
            placement: 'bottomRight',
            options: [
              {
                label: '添加',
                value: 'add',
              },
              {
                label: '删除',
                value: 'delete',
              },
            ],
          },
        },
      ]}
    />
  </div>
);

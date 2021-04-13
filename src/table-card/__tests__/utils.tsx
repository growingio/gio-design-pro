import React from 'react';
import { PlusCircleFilled, FolderOutlined } from '@gio-design/icons';
import { TableCardProps } from '../index';

export interface ExampleData {
  a: string;
  b: string;
  c: string;
  d: string;
}

const dataSource1: ExampleData[] = Array.from({ length: 100 }, (_, key) => ({
  a: '表格内容',
  b: '表格内容',
  c: '表格内容',
  d: '表格内容',
  key: key.toString(),
}));

const dataSource2: ExampleData[] = Array.from({ length: 110 }, (_, key) => ({
  a: '表格内容2',
  b: '表格内容2',
  c: '表格内容2',
  d: '表格内容2',
  key: key.toString(),
}));

const columns1 = [
  {
    title: '头像',
    dataIndex: 'a',
  },
  {
    title: '列标题',
    dataIndex: 'd',
  },
  {
    title: '列标题',
    dataIndex: 'c',
  },
  {
    title: '列标题',
    dataIndex: 'd',
  },
];

const columns2 = [
  {
    title: '头像',
    dataIndex: 'a',
  },
  {
    title: '列标题2',
    dataIndex: 'd',
  },
  {
    title: '列标题2',
    dataIndex: 'c',
  },
  {
    title: '列标题2',
    dataIndex: 'd',
  },
];

export const getTableCardConfig = (
  selectedRowKeys1: string[] = [],
  setSelectedRowKeys1: any = () => ({}),
  selectedRowKeys2: string[] = [],
  setSelectedRowKeys2: any = () => ({})
): TableCardProps<ExampleData> => ({
  title: '全部成员(233)',
  description: '这是一个副标题这是一个副标题这是一个副标题这是一个副标题这是一个副标题',
  tabs: [
    {
      name: '成员',
      searchBar: {
        placeholder: '请搜索成员名或账号',
      },
      buttons: [
        { children: '新建账号', icon: <PlusCircleFilled /> },
        { children: '次要按钮', type: 'secondary' },
        { children: '次要按钮', type: 'secondary' },
      ],
      batchButtons: [
        { children: '批量删除', type: 'secondary', icon: <FolderOutlined /> },
        { children: '批量删除', type: 'secondary', icon: <FolderOutlined /> },
      ],
      table: {
        dataSource: dataSource1,
        columns: columns1,
        rowSelection: {
          selectedRowKeys: selectedRowKeys1,
          onChange: setSelectedRowKeys1,
        },
      },
    },
    {
      name: '权限',
      buttons: [
        { children: '新建账号2', icon: <PlusCircleFilled /> },
        { children: '次要按钮2', type: 'secondary' },
      ],
      table: {
        dataSource: dataSource2,
        columns: columns2,
        rowSelection: {
          selectedRowKeys: selectedRowKeys2,
          onChange: setSelectedRowKeys2,
        },
      },
    },
  ],
});

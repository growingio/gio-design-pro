import React from 'react';
import { Button } from '@gio-design/components';
import { PlusCircleFilled } from '@gio-design/icons';
import List from '../../list';

export const renderItems = () => (
  <>
    <List.Item>内容</List.Item>
    <List.Item>内容</List.Item>
    <List.Item>内容</List.Item>
    <List.Item>内容</List.Item>
    <List.Item>内容</List.Item>
  </>
);

export const renderGroups = () => (
  <>
    <List.ItemGroup title="分组 1">
      <List.Item>内容</List.Item>
      <List.Item>内容</List.Item>
      <List.Item>内容</List.Item>
      <List.Item>内容</List.Item>
      <List.Item>内容</List.Item>
    </List.ItemGroup>
    <List.ItemGroup title="分组 2">
      <List.Item>内容</List.Item>
      <List.Item>内容</List.Item>
      <List.Item>内容</List.Item>
      <List.Item>内容</List.Item>
      <List.Item>内容</List.Item>
    </List.ItemGroup>
    <List.ItemGroup title="分组 3">
      <List.Item>内容</List.Item>
      <List.Item>内容</List.Item>
      <List.Item>内容</List.Item>
      <List.Item>内容</List.Item>
      <List.Item>内容</List.Item>
    </List.ItemGroup>
  </>
);

export const footer = (
  <Button type="text" icon={<PlusCircleFilled />} size="small">
    新建内容
  </Button>
);

export const tabNavItems = [
  { key: 'tab-1', children: '选项 1' },
  { key: 'tab-2', children: '选项 2' },
];

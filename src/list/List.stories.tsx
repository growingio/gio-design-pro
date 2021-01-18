import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import Docs from './List.mdx';
import List from '.';
import { ListProps } from './interfaces';
import { properties } from './__test__/data';
import './style';

export default {
  title: 'Business Components/List',
  component: List,
  subcomponents: {
    Divider: List.Divider,
    Item: List.Item,
    ItemGroup: List.ItemGroup,
    ItemSubgroup: List.ItemSubgroup,
  },
  parameters: {
    docs: {
      page: Docs,
    },
  },
} as Meta;

const Template: Story<ListProps> = (args) => <List {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: (
    <List.ItemGroup title="Group 1">
      <List.Item>first</List.Item>
      <List.Item disabled>second</List.Item>
      <List.Divider />
    </List.ItemGroup>
  ),
};

export const Items = Template.bind({});
Items.args = {
  items: properties,
  expandable: false,
};

export const Empty = Template.bind({});
Empty.args = {};

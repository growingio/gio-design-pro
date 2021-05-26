import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import { FilterOutlined } from '@gio-design/icons';
import { Button } from '@gio-design/components';
import TitleInfoCard from '.';
import { TitleInfoCardProps } from './interfaces';
// import { options } from './__test__/data';
import './style';

export default {
  title: 'Business Components/TitleInfoCard',
  component: TitleInfoCard,
} as Meta;

const Template: Story<TitleInfoCardProps> = (args) => <TitleInfoCard {...args} />;

export const WithChildren = Template.bind({});
WithChildren.args = {
  children: <p>这是一段内容</p>,
  titleIcon: <FilterOutlined />,
  centerWidth: 400,
  title: '北区项目组',
  description: '这是一段很长很长的描述，这是一段很长很长的描述',
  operationContent: <Button>操作</Button>,
  footerContent: '底部的一堆东西',
  clamp: 2,
};

export const WithoutChildren = Template.bind({});
WithoutChildren.args = {
  titleIcon: true,
  title: '东区项目组',
};

export const WithoutTitleIcon = Template.bind({});
WithoutTitleIcon.args = {
  title: '南区项目组',
  description: '这是一段很长很长的描述，这是一段很长很长的描述',
  footerContent: '底部的一堆东西',
};

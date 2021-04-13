import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import SegmentCard from './SegmentCard';
import { SegmentCardProps } from './interfaces';

import './style';

export default {
  title: 'Business Components/UserPicker/SegmentCard',
  component: SegmentCard,
} as Meta;

const Template: Story<SegmentCardProps> = (args) => <SegmentCard {...args} />;

export const Default = Template.bind({});
Default.args = {
  name: '14 天浏览商品详情页',
  detector: {
    totalUsers: 1234,
    usersRatio: 0.83,
  },
  chart: <div style={{ height: '100%', textAlign: 'center' }}>This is a Chart</div>,
  creator: '张三',
  updatedAt: '2020-05-09T02:15:20.643Z',
};

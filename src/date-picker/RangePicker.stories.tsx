import { Meta, Story } from '@storybook/react/types-6-0';
import React from 'react';
import RangePicker from './RangePicker';
import { RangePickerProps } from './interface';

export default {
  title: 'Business Components/RangePicker',
  component: RangePicker,
} as Meta;

const Template: Story<RangePickerProps> = (args) => <RangePicker {...args} />;

export const Default = Template.bind({});
Default.args = {};

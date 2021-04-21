import { Meta, Story } from '@storybook/react/types-6-0';
import React from 'react';
import DateRangePicker from './DateRangePicker';
import { RangePickerProps } from './interfaces';

export default {
  title: 'Business Components/DateRangePicker',
  component: DateRangePicker,
} as Meta;

const Template: Story<RangePickerProps> = (args) => <DateRangePicker {...args} />;

export const Default = Template.bind({});
Default.args = {};

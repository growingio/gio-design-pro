import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import startOfToday from 'date-fns/startOfToday';
import subMonths from 'date-fns/subMonths';
import subDays from 'date-fns/subDays';
import getTime from 'date-fns/getTime';
import Docs from './PastTimeSelector.mdx';
import { PastTimeSelector, PastTimeSelectorProps } from './index';

export default {
  title: 'Selectors/PastTimeSelector',
  component: PastTimeSelector,
  parameters: {
    docs: {
      page: Docs,
    },
  },
} as Meta;

// mock now is 2021/05/20 00:00:00.000
Date.now = () => 1621440000000;

const Template: Story<PastTimeSelectorProps> = (args) => <PastTimeSelector {...args} />;

export const Shortcut = Template.bind({});
Shortcut.args = {
  value: 'day:8,1',
};

export const Since = Template.bind({});
Since.args = {
  value: `since:${getTime(subDays(startOfToday(), 7))}`,
};

export const Dynamic = Template.bind({});
Dynamic.args = {
  value: 'day:9,1',
};

export const Absolute = Template.bind({});
Absolute.args = {
  value: `abs:${getTime(subMonths(startOfToday(), 1))},${getTime(startOfToday())}`,
};

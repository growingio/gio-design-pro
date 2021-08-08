import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import { action } from '@storybook/addon-actions';
import { getTime, startOfToday, subDays, subMonths } from 'date-fns';
import Docs from './PastTimeSelector.mdx';
import { PastTimeSelector, PastTimeSelectorProps } from '../index';

import '../style';

export default {
  title: 'Selectors/PastTimeSelector',
  component: PastTimeSelector,
  parameters: {
    docs: {
      page: Docs,
    },
  },
} as Meta;

const Template: Story<PastTimeSelectorProps> = (args) => (
  <PastTimeSelector onSelect={action('selected value:')} placeholder="时间范围" {...args} />
);

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

export const Experiment = Template.bind({});
Experiment.args = {
  experimental: true,
};
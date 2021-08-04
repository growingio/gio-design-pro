import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import { action } from '@storybook/addon-actions';
import { withDesign } from 'storybook-addon-designs';
import startOfToday from 'date-fns/startOfToday';
import subMonths from 'date-fns/subMonths';
import subDays from 'date-fns/subDays';
import getTime from 'date-fns/getTime';
import { startOfYesterday } from 'date-fns';
import Docs from './PastTimePicker.mdx';
import PastTimePicker from '../PastTimePicker';
import { PastTimePickerProps } from '../interfaces';

import '../style';

export default {
  title: 'Pickers/PastTimePicker',
  component: PastTimePicker,
  decorators: [withDesign],
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/kP3A6S2fLUGVVMBgDuUx0f/GrowingIO-Design-Components?node-id=1097%3A1679',
      allowFullscreen: true,
    },
    docs: {
      page: Docs,
    },
  },
} as Meta;

const Template: Story<PastTimePickerProps> = (args) => (
  <PastTimePicker onSelect={action('selected value:')} {...args} />
);

export const Shortcut = Template.bind({});
Shortcut.args = {
  timeRange: 'day:8,1',
};

export const Since = Template.bind({});
Since.args = {
  timeRange: `since:${getTime(subDays(startOfToday(), 7))}`,
};

export const Dynamic = Template.bind({});
Dynamic.args = {
  timeRange: 'day:9,1',
};

export const Absolute = Template.bind({});
Absolute.args = {
  timeRange: `abs:${getTime(subMonths(startOfToday(), 1))},${getTime(startOfYesterday())}`,
};

export const Experiment = Template.bind({});
Experiment.args = {
  experimental: true,
};

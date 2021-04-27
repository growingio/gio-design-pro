import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import Docs from './EventSelector.mdx';
import { EventSelector, EventSelectorProps } from './index';
import { events } from './__tests__/data';

export default {
  title: 'Business Components/EventSelector',
  component: EventSelector,
  parameters: {
    docs: {
      page: Docs,
    },
  },
} as Meta;

const Template: Story<EventSelectorProps> = (args) => <EventSelector {...args} />;

export const Default = Template.bind({});
Default.args = {
  dataSource: events,
};

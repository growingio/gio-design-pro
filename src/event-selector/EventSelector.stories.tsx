/* eslint-disable no-console */
import React, { useState } from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import { isArray } from 'lodash';
// import Docs from './EventSelector.mdx';
import { EventSelector, EventSelectorProps } from './index';
import { events } from './__tests__/data';
import { EventData } from '../event-picker/interfaces';
import { EventPicker } from '../event-picker';

export default {
  title: 'Business Components/EventSelector',
  component: EventSelector,
  parameters: {
    subcomponents: { EventPicker },

    // docs: {
    //   page: Docs,
    // },
  },
  // excludeStories: ['users', 'dataSource'],
} as Meta;

const Template: Story<EventSelectorProps> = (args) => {
  const { value } = args;
  const [select, setSelect] = useState<EventData[]>(isArray(value) ? value : []);

  function handleChange(newVal: any, _: any) {
    // eslint-disable-next-line no-console
    console.log('picker changed,new value is', newVal, _);
    if (newVal) {
      setSelect(isArray(newVal) ? newVal : [newVal]);
    }
  }
  return (
    <div style={{ maxWidth: '288px' }}>
      <EventSelector {...args} onChange={handleChange} value={select} onClick={(i) => console.log('item clicked', i)} />
    </div>
  );
};

export const Default = Template.bind({});
Default.args = {
  dataSource: events,
  size: 'small',
  showValueIcon: true,
};
export const Multiple = Template.bind({});
Multiple.args = {
  dataSource: events,
  multiple: true,
  value: events.slice(0, 10),
};

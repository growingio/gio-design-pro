import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import ElementEventForm from './ElementEventForm';
import { ElementEventFormProps } from './interfaces';

export default {
  title: 'Business Components/EventForm/ElementEventForm',
  component: ElementEventForm,
} as Meta;

const Template: Story<ElementEventFormProps> = (args) => (
  <div style={{ width: '440px', padding: '16px', boxShadow: '0px 0px 2px 1px rgba(0, 0, 0, 0.1)' }}>
    <ElementEventForm {...args} />
  </div>
);
export const Default = Template.bind({});
Default.args = {
  onFinish: async (values: any) => {
    return console.log(values);
  },
};

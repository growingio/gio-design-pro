import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import EmptyPrompt, { EmptyPromptProps } from './index';

export default {
  title: 'Business Components/EmptyPrompt',
  component: EmptyPrompt,
} as Meta;

const Template: Story<EmptyPromptProps> = (args) => <EmptyPrompt {...args} />;

export const Default = Template.bind({});

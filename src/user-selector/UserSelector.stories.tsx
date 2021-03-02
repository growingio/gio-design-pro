import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import { action } from '@storybook/addon-actions';
import UserSelector from './UserSelector';
import { UserSelectorProps } from './interfaces';
import { currentUserId, segments } from '../user-picker/__tests__/data';

export default {
  title: 'Business Components/UserSelector',
  component: UserSelector,
} as Meta;

const Template: Story<UserSelectorProps> = (args) => <UserSelector {...args} />;

export const Default = Template.bind({});
Default.args = {
  segments,
  userId: currentUserId,
  onCreateSegment: action('create-segment'),
};

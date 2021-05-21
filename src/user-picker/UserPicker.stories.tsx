import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import { action } from '@storybook/addon-actions';
import UserPicker from './UserPicker';
import { UserPickerProps } from './interfaces';
import { Resource } from '../utils/interfaces';
import { currentUserId, segments } from './__tests__/data';

export default {
  title: 'Business Components/UserPicker',
  component: UserPicker,
} as Meta;

const Template: Story<UserPickerProps> = (args) => <UserPicker {...args} />;

export const Default = Template.bind({});
Default.args = {
  segments,
  userId: currentUserId,
  disabledValues: ['y9pm1pme'],
  onCreateSegment: action('create-segment'),
  showSegmentCard: false,
  onShowSegmentChart: (resource: Resource) => <div>{`This is the trend chart of ${resource.name}.`}</div>,
};

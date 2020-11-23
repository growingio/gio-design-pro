import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import { action } from '@storybook/addon-actions';
import UserPicker from '.';
import { UserPickerProps } from './interfaces';
import { currentUserId, preparedSegments, segments } from './__test__/data';
import '@gio-design/components/es/components/button/style/css';
import './style/index.less';

export default {
  title: 'Business Components/UserPicker',
  component: UserPicker,
} as Meta;

const Template: Story<UserPickerProps> = (args) => <UserPicker {...args} />;

export const Default = Template.bind({});
Default.args = {
  preparedSegments,
  segments,
  userId: currentUserId,
  onCreateSegment: action('create-segment'),
};

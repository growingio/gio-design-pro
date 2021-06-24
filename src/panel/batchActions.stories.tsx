import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import { Button } from '@gio-design/components';
import InternalBatchActions from './BatchActions';
import { BatchActionProps } from './interfaces';

export default {
  component: InternalBatchActions,
  title: 'Business Components/Panel/BatchActions',
  argTypes: {
    count: {
      defaultValue: 0,
      description: '已选择数量',
    },
  },
} as Meta<BatchActionProps>;

const Template: Story<BatchActionProps> = (args) => (
  <InternalBatchActions {...args}>
    <Button type="secondary">批量移动</Button>
    <Button type="secondary">批量删除 </Button>
  </InternalBatchActions>
);

export const BatchActions = Template.bind({});
BatchActions.args = {
  count: 0,
};

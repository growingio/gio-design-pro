import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import { PlusCircleFilled } from '@gio-design/icons';
import Selector, { SelectorProps } from '.';

import './style';

export default {
  title: 'Abstract Components/Selector',
  component: Selector,
} as Meta;

const Template: Story<SelectorProps> = (args) => <Selector {...args} />;

export const Default = Template.bind({});
Default.args = {
  dropdownRender: () => <div style={{ width: 160 }}>custom</div>,
  valueRender: () => (
    <span>
      <PlusCircleFilled size="14px" />
      <span style={{ marginLeft: 4 }}>Value</span>
    </span>
  ),
};

import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import OperationMenu from '.';
import { OperationMenuProps } from './interfaces';
import { options } from './__test__/data';
import './style';

export default {
  title: 'Business Components/OperationMenu',
  component: OperationMenu,
} as Meta;

const Template: Story<OperationMenuProps> = (args) => <OperationMenu {...args} />;

export const Default = Template.bind({});
Default.args = {
  options,
  // eslint-disable-next-line no-console
  onClick: (a: any) => console.log(a),
  verticalIndent: 12,
};

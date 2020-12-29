import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import OperationMenu from '.';
import { OperationMenuProps, OperationMenuListOption } from './interfaces';
import '@gio-design-new/components/es/components/button/style/css';
import './style/index.less';

export default {
  title: 'Business Components/OperationMenu',
  component: OperationMenu,
} as Meta;

const Template: Story<OperationMenuProps> = (args) => <OperationMenu {...args} />;

const options: OperationMenuListOption[] = [
  {
    disabled: false,
    tooltip: '',
    value: 'update-space-role',
    label: '修改站点角色',
  },
  {
    disabled: false,
    tooltip: '',
    value: 'update-space',
    label: '删除用户',
  },
  {
    disabled: true,
    tooltip: '行行行',
    value: 'update-spxxxace',
    label: '删除用户2',
  },
];

export const Default = Template.bind({});
Default.args = {
  options,
  onClick: (a: any) => console.log(a),
};

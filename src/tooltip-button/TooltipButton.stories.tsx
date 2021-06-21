import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import { PlusCircleFilled } from '@gio-design/icons';
import TooltipButton from '.';
import { TooltipButtonProps } from './interfaces';
// import { options } from './__test__/data';
import './style';

export default {
  title: 'Business Components/TooltipButton',
  component: TooltipButton,
} as Meta;

const Wrapper = (props: { children?: React.ReactNode }) => {
  const { children } = props;
  return <section style={{ backgroundColor: '#fff', boxSizing: 'border-box', padding: 50 }}>{children}</section>;
};

const Template: Story<TooltipButtonProps> = (args) => (
  <Wrapper>
    <TooltipButton {...args} type="primary" style={{ marginRight: 10 }} />
    <TooltipButton {...args} type="secondary" style={{ marginRight: 10 }} />
    <TooltipButton {...args} type="text" style={{ marginRight: 10 }} />
    <TooltipButton {...args} type="link" />
  </Wrapper>
);

export const Default = Template.bind({});
Default.args = {
  disabled: true,
  tooltipProps: { title: '无权限' },
  children: '添加',
  mini: false,
  icon: <PlusCircleFilled />,
  type: 'primary',
};

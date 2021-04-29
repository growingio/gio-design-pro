import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import { action } from '@storybook/addon-actions';
import SelectList from './SelectList';
import { SelectListProps } from './interfaces';
import { panelModeOptions } from './constant';

import './style/SelectList.less';

export default {
  title: 'Lists/SelectList',
  component: SelectList,
} as Meta;

const Template: Story<SelectListProps> = (args) => <SelectList {...args} />;

export const Options = Template.bind({});
Options.args = {
  options: panelModeOptions,
  onSelect: action('selected value:'),
};

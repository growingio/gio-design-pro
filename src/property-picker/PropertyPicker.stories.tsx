/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import { action } from '@storybook/addon-actions';
import PropertyPicker from './PropertyPicker';
import { PropertyPickerProps } from './interfaces';
import { insightDimensions, allVariables } from './__test__/data';
import '@gio-design-new/components/es/components/button/style/css';
import './style/index.less';
import { dimensionToPropertyItem } from './util';

const dataSource = insightDimensions.map((v) => dimensionToPropertyItem(v));
export default {
  title: 'Business Components/PropertyPicker',
  component: PropertyPicker,
} as Meta;

const Template: Story<PropertyPickerProps> = (args) => (
  <div style={{ width: '600px', padding: '16px', boxShadow: '0px 0px 2px 1px rgba(0, 0, 0, 0.1)' }}>
    <PropertyPicker {...args} />
  </div>
);

export const Default = Template.bind({});
Default.args = {
  dataSource,
  onChange: (v) => {
    console.log('onchange', v);
  },
  fetchData: (p) => {
    return { ...p };
  },
};

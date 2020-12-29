/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import PropertyPicker from './PropertyPicker';
import { PropertyPickerProps } from './interfaces';
import { insightDimensions } from './__test__/data';
import '@gio-design-new/components/es/components/button/style/css';
import './style/index.less';
import { dimensionToPropertyItem } from './util';
import { Dimension } from '../types';

const dataSource = insightDimensions.map((v: any) => dimensionToPropertyItem(v as Dimension));
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
  initialValue: { ...{ label: 'App 版本', value: 'cv', valueType: null } },
  onChange: (v: any) => {
    console.log('onchange', v);
  },
  fetchData: (p: any) => {
    return { ...p };
  },
};

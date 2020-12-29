/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import _ from 'lodash';
import PropertyPicker from './PropertyPicker';
import { PropertyPickerProps } from './interfaces';
import { insightDimensions } from './__test__/data';
import '@gio-design-new/components/es/components/button/style/css';
import './style/index.less';
import { dimensionToPropertyItem } from './util';
import { Dimension } from '../types';

// const AllVariablesTable = _.flatten(_.values(allVariables));
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
  // fetchDetailData: (p: any) => {
  //   return new Promise<PropertyInfo>((resolve) => {
  //     setTimeout(() => {
  //       const { value, type, label, valueType } = p as PropertyItem;

  //       // const res = AllVariablesTable.find((v: any) => v.id === value) || { key: '', id: '' };
  //       const propertyInfo: PropertyInfo = {
  //         name: label,
  //         type,
  //         key: (value as string) || 'xxx',
  //         description: 'hsagdhjgfhjgshjdgfhgdshhdsfdsfjg是法国的设计规范的韩国护肤的好时光',
  //         valueType: valueType || 'string',
  //       };
  //       return resolve(propertyInfo);
  //     }, 1000);
  //   });
  //   // return { ...p };
  // },
};

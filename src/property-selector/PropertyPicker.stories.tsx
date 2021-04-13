/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import _ from 'lodash';
import PropertyPicker from './PropertyPicker';
import { PropertyPickerProps } from './interfaces';
import { insightDimensions } from './__test__/data';
import './style/index.less';
import { dimensionToPropertyItem } from './util';
import { Dimension } from './types';
// const AllVariablesTable = _.flatten(_.values(allVariables));
const dataSource = insightDimensions.map((v: any) => dimensionToPropertyItem(v as Dimension));
export default {
  title: 'Business Components/PropertySelector/PropertyPicker',
  component: PropertyPicker,
} as Meta;

const Template: Story<PropertyPickerProps> = (args) => (
  <div
    style={{
      width: '366px',
      padding: '16px',
      boxShadow: '0px 0px 2px 1px rgba(0, 0, 0, 0.1)',
    }}
  >
    <PropertyPicker {...args} />
  </div>
);

export const Default = Template.bind({});
Default.args = {
  dataSource,
  disabledValues: ['b'],
  // placeholder: '请选择...',
  onChange: (v: any) => {
    console.log('onchange', v);
  },
};

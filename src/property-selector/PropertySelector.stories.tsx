/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import _ from 'lodash';
import PropertySelector from './PropertySelector';
import { PropertySelectorProps } from './interfaces';
import { insightDimensions } from './__test__/data';
// import './style/index.less';
import { dimensionToPropertyItem } from './util';
import { Dimension } from '../types';
// const AllVariablesTable = _.flatten(_.values(allVariables));
const dataSource = insightDimensions.map((v: any) => dimensionToPropertyItem(v as Dimension));
export default {
  title: 'Business Components/PropertySelector',
  component: PropertySelector,
} as Meta;

const Template: Story<PropertySelectorProps> = (args) => (
  <div style={{ width: '410px', height: '500px', padding: '16px', boxShadow: '0px 0px 2px 1px rgba(0, 0, 0, 0.1)' }}>
    <PropertySelector {...args} />
  </div>
);

export const Default = Template.bind({});
Default.args = {
  dataSource,
  fetchDetailData: (node: any) =>
    // eslint-disable-next-line no-return-await
    new Promise((resolve) => {
      setTimeout(
        () =>
          resolve({ ...node, description: '这里是描述描述这里是描述描述这里是描述描述这里是描述描述这里是描述描述' }),
        500
      );
    }),
  // placeholder: '请选择...',
  onChange: (v: any) => {
    console.log('onchange', v);
  },
};

/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import _ from 'lodash';
import { UpFilled, DownFilled } from '@gio-design/icons';
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
  initialValue: {},
  // placeholder: '请选择...',
  onChange: (v: any) => {
    console.log('onchange', v);
  },
};
type SelectedValue = { label?: string; value?: string; valueType?: string };
const CustomTriggerTemplate: Story<PropertyPickerProps> = (args) => {
  const [visible, setVisible] = useState(false);
  const [value, setValue] = useState<SelectedValue | undefined>();
  const input = (
    <>
      <span>
        {!value ? <span style={{ color: '#dedede', cursor: 'pointer' }}>请选择属性</span> : <span>{value?.label}</span>}{' '}
        {visible ? <UpFilled color="#ccc" /> : <DownFilled color="#ccc" />}
      </span>
    </>
  );
  const handleChange = (v: SelectedValue) => {
    console.log('onchange', v);
    setValue(v);
  };
  function handleVisibleChange(v: boolean) {
    setVisible(v);
  }
  return (
    <div style={{ width: '600px', padding: '16px', boxShadow: '0px 0px 2px 1px rgba(0, 0, 0, 0.1)' }}>
      <PropertyPicker
        {...args}
        onHoverPanelShow={undefined}
        onChange={handleChange}
        onVisibleChange={handleVisibleChange}
        input={input}
      />
    </div>
  );
};
export const CustomTrigger = CustomTriggerTemplate.bind({});
CustomTrigger.args = {
  dataSource: dataSource.filter((v: any) => v.type !== 'usr'),
};

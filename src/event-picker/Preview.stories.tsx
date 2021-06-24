/* eslint-disable no-alert */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/destructuring-assignment */
import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import { Button } from '@gio-design/components';
import Docs from './EventPicker.mdx';
import { EventPickerPreviewProps } from './interfaces';
import Preview from './preview';

const presetData = {
  id: 'pt',
  name: '平均页面停留时长 (分钟)',
  description: '平均每个页面的停留时⻓，以分钟作为单位展示',
  instruction:
    '平均页面停留时长 (分钟) 指标只能被页面级维度（域名、页面、自定义页面级变量）分解。当平均页面停留时长 (分钟) 指标被页面级维度分解时，对应的指标数值为用户在该维度的当前值（页面）上停留的平均时长',
  platforms: ['all'],
  __typename: 'PreparedMetric',
  selectKey: '-pt',
  groups: ['prepared'],
  type: 'prepared',
};
const customData = {
  id: 'y9pm11pm',
  name: '变量使用量',
  type: 'custom',
  action: '',
  elementId: '',
  valueType: 'counter',
  platforms: ['all'],
  // labels: [],
  favorites: false,
  attributes: [
    { id: 'JnG44mGz', name: '变量类型', valueType: 'string', __typename: 'MeasurableAttribute' },
    { id: 'nxGKZ0pa', name: '使用的图表名称', valueType: 'string', __typename: 'MeasurableAttribute' },
    { id: 'meQ8eJpn', name: '变量标识符', valueType: 'string', __typename: 'MeasurableAttribute' },
    { id: 'oWpEN6G6', name: '变量名称', valueType: 'string', __typename: 'MeasurableAttribute' },
    { id: 'zqQR25Qo', name: '分析场景', valueType: 'string', __typename: 'MeasurableAttribute' },
  ],
  isComplexDistinct: false,
  __typename: 'Measurable',
  selectKey: 'custom-y9pm11pm',
  groups: ['unknown'],
};
const simpleData = {
  id: 'weDqBaQE',
  name: '表单2',
  type: 'simple',
  action: 'clck',
  elementId: 'WlGklEDa',
  valueType: '',
  platforms: ['minp'],
  // labels: [],
  favorites: false,
  // attributes: [],
  isComplexDistinct: false,
  __typename: 'Measurable',
  selectKey: 'simple-weDqBaQE',
  groups: ['unknown'],
};
export default {
  title: 'Business Components/EventPicker/preview',
  // title: 'EventPicker',
  component: Preview,
  parameters: {
    // docs: {
    //   page: Docs,
    // },
  },
} as Meta;

const Template: Story<EventPickerPreviewProps> = (args) => (
  <div style={{ height: '462px', width: '20px', position: 'relative', marginTop: '100px' }}>
    <Preview {...args} />
  </div>
);

export const custom = Template.bind({});
custom.args = {
  dataSource: customData,
};

export const simple = Template.bind({});
simple.args = {
  dataSource: simpleData,
};
export const Preset = Template.bind({});
Preset.args = {
  dataSource: presetData,
};

export const CustomRender = Template.bind({});
CustomRender.args = {
  dataSource: presetData,
  previewCustomRender: (data: any) => (
    <div>
      <h1>自定义渲染</h1>
      <div>{data.name}</div>
      <div>{data.type}</div>
      <div>
        <Button onClick={() => alert('编辑')}>编辑</Button>
      </div>
    </div>
  ),
};

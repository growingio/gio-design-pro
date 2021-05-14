/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import { isArray } from 'lodash';
import { PlusCircleFilled } from '@gio-design/icons';
import { Button } from '@gio-design/components';
import Docs from './EventPicker.mdx';
import { EventPicker, EventPickerProps } from './index';
import { events } from './__tests__/data';
import { EventData } from './interfaces';

const simpleEvents = [
  {
    id: 'nxGKB4pa',
    name: '现在定义的是 所属页面 中，当前位置 ，限定 元素内容为「U',
    type: 'simple',
    action: 'clck',
    elementId: 'zZDbXYp9',
    valueType: '',
    platforms: ['iOS'],
    favorites: false,
    isComplexDistinct: false,
    __typename: 'Measurable',
    selectKey: 'simple-nxGKB4pa',
    groups: ['unknown'],
  },
  {
    id: 'zqQRjOQo',
    name: '现在定义的是页面 /UITabBarController 。',
    type: 'simple',
    action: 'page',
    elementId: 'mgGJAmpA',
    valueType: '',
    platforms: ['iOS'],
    favorites: false,
    isComplexDistinct: false,
    __typename: 'Measurable',
    selectKey: 'simple-zqQRjOQo',
    groups: ['unknown'],
  },
  {
    id: 'meQ8NxGn',
    name: '现在定义的是页面 /UITabBarController/U',
    type: 'simple',
    action: 'page',
    elementId: 'meQ8NxGn',
    valueType: '',
    platforms: ['iOS'],
    favorites: false,
    isComplexDistinct: false,
    __typename: 'Measurable',
    selectKey: 'simple-meQ8NxGn',
    groups: ['unknown'],
  },
  {
    id: 'klGvyjp7',
    name: '现在定义的是页面 pages/* 。',
    type: 'simple',
    action: 'page',
    elementId: 'WkDyvqQe',
    valueType: '',
    platforms: ['minp'],
    favorites: false,
    isComplexDistinct: false,
    __typename: 'Measurable',
    selectKey: 'simple-klGvyjp7',
    groups: ['unknown'],
  },
  {
    id: 'n1QVdoGy',
    name: '现在定义的是页面 pages/form/form 。',
    type: 'simple',
    action: 'page',
    elementId: 'klGvBYG7',
    valueType: '',
    platforms: ['minp'],
    favorites: false,
    isComplexDistinct: false,
    __typename: 'Measurable',
    selectKey: 'simple-n1QVdoGy',
    groups: ['unknown'],
  },
  {
    id: 'AbQ343pY',
    name: '现在定义的是页面 pages/index/index 。',
    type: 'simple',
    action: 'page',
    elementId: 'rRGoj8pm',
    valueType: '',
    platforms: ['minp'],
    favorites: false,
    isComplexDistinct: false,
    __typename: 'Measurable',
    selectKey: 'simple-AbQ343pY',
    groups: ['unknown'],
  },
  {
    id: 'wWDrydGM',
    name: '现在定义的是页面 pages/popular/popular',
    type: 'prepared',
    action: 'page',
    elementId: 'AVpZqAQK',
    valueType: '',
    platforms: ['minp'],
    favorites: false,
    isComplexDistinct: false,
    __typename: 'Measurable',
    selectKey: 'simple-wWDrydGM',
    groups: ['unknown'],
  },
  {
    id: '9yGOAjQl',
    name: '页面渲染成功',
    type: 'custom',
    action: '',
    elementId: '',
    valueType: 'counter',
    platforms: ['all'],
    favorites: false,
    isComplexDistinct: false,
    __typename: 'Measurable',
    selectKey: 'custom-9yGOAjQl',
    groups: ['unknown'],
  },
  {
    id: 'oNGzr2Gg',
    name: 'xihee',
    type: 'complex',
    action: '',
    elementId: '',
    valueType: '',
    platforms: ['all'],
    favorites: false,
    isComplexDistinct: false,
    __typename: 'Measurable',
    selectKey: 'complex-oNGzr2Gg',
    groups: ['unknown'],
  },
];
export default {
  title: 'Business Components/EventPicker',
  // title: 'EventPicker',
  component: EventPicker,
  parameters: {
    docs: {
      page: Docs,
    },
  },
} as Meta;

const Template: Story<EventPickerProps> = (args) => {
  const [select, setSelect] = useState<EventData[]>(isArray(args.value) ? args.value : []);
  function handleSelect(v: EventData | EventData[]) {
    // eslint-disable-next-line no-console
    console.log('handleSelect', v);
    setSelect(isArray(v) ? v : [v]);
  }
  function handleChange(newVal: any, old: any) {
    // eslint-disable-next-line no-console
    console.log('picker changed,new value is', newVal, old);
  }

  function handleClick(newVal: any) {
    // eslint-disable-next-line no-console
    console.log('handleClick', newVal);
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const panelFooter = (tab: string, _: EventData[]) => {
    if (tab === 'measurement') {
      return (
        <Button type="link" icon={<PlusCircleFilled />} size="small" onClick={() => {}}>
          新建计算指标
        </Button>
      );
    }
    return null;
  };
  return (
    <div>
      <div style={{ maxHeight: '80px', overflow: 'hidden', overflowY: 'auto', listStyle: 'none' }}>
        select:
        <ul>
          {select.map((s: any) => (
            <li>{[s?.id, s?.type, s?.name].join('/')}</li>
          ))}
        </ul>
      </div>
      <EventPicker
        {...args}
        onSelect={handleSelect}
        onChange={handleChange}
        value={select}
        panelFooter={panelFooter}
        onClick={handleClick}
      />
    </div>
  );
};

export const Default = Template.bind({});
Default.args = {
  dataSource: events,
  // onClick: undefined,
};

const defaultSelect = events.slice(0, 5);
export const Multiple = Template.bind({});
Multiple.args = {
  dataSource: events,
  multiple: true,
  value: defaultSelect,
  showAllTab: true,
};
export const WithoutTabNav = Template.bind({});
WithoutTabNav.args = {
  dataSource: events,
  multiple: true,
  hideTabNav: true,
  // showPreview: false,
};
export const Empty = Template.bind({});
Empty.args = {
  dataSource: [],
  multiple: true,
  // hideTabNav: true,
  showPreview: false,
};
export const DisabledOption = Template.bind({});
const dataSourceWithDisabledItem = simpleEvents.map((v, index) => ({
  ...v,
  disabled: index % 3 === 1,
  disabledTips: '为什么不可用',
}));
DisabledOption.args = {
  dataSource: dataSourceWithDisabledItem,
  multiple: true,
  // hideTabNav: true,
  showPreview: true,
};
const defaultTabs = [
  { label: '预置指标', value: 'prepared' },
  { label: '事件', value: 'event' },
  { label: '计算指标', value: 'measurement' },
];

// 数据类型映射
const getEventType = (data: EventData): string => {
  const { type } = data;

  switch (type) {
    case 'simple': // 无埋点事件
    case 'custom': // 埋点事件
    case 'merged':
      return 'event';
    case 'prepared':
      return 'prepared';
    case 'complex':
      return 'measurement';

    default:
      return 'unknow';
  }
};
export const CustomTabGroup = Template.bind({});
CustomTabGroup.args = {
  dataSource: dataSourceWithDisabledItem,
  multiple: true,
  getTabKey: getEventType,
  tabs: defaultTabs,
  showTabAll: false,
  // hideTabNav: true,
};

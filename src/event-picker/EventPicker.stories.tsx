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
  showPreview: false,
};

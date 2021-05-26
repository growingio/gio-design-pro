/* eslint-disable no-console */
import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import { Button } from '@gio-design/components';
import PageViewEventForm from './PageViewEventForm';
import { PageViewEventFormProps } from './interfaces';
import { spaceTags, deviceInfoApp, currentPageMinp, currentPageApp } from './__test__/data';
// import './eventform-style.less';
import { AppType, DeviceInfo, PageInfo } from './types';
import { TagElement } from './TagElement';
import Docs from './EventForm.mdx';
import './style';

export default {
  title: 'Business Components/EventForm/PageViewEventForm',
  component: PageViewEventForm,
  parameters: {
    docs: {
      page: Docs,
    },
  },
} as Meta;
function getInitialTagElement(deviceInfo: DeviceInfo, currentPage: PageInfo) {
  const currentPageInfo = currentPage;
  // console.log('currentPageInfo', currentPageInfo);
  // const deviceInfo: DeviceInfo = deviceInfoMinp as DeviceInfo;
  const platform = deviceInfo ? deviceInfo.os : 'web';
  const urlScheme = deviceInfo?.urlScheme;
  const element = {
    name: '',
    description: '',
    docType: 'page',
    actions: ['page'],
    attrs: {
      domain: currentPageInfo.domain,
      path: currentPageInfo.path,
      query: currentPageInfo.query,
      urlScheme,
    },
    definition: {
      domain: currentPageInfo.domain,
      path: currentPageInfo.path,
      query: currentPageInfo.query,
      urlScheme,
    },
    platforms: [platform],
  };
  return element;
}
function getFormValues(deviceInfo: DeviceInfo, currentPage: PageInfo) {
  //
  // const deviceInfo: DeviceInfo = deviceInfoApp as DeviceInfo;
  const element = getInitialTagElement(deviceInfo, currentPage);
  const { attrs } = element;
  // const isNative = currentPageInfo.appType === AppType.NATIVE;
  return {
    name: element.name,
    description: element.description,

    belongApp: deviceInfo && `${deviceInfo.name} | ${deviceInfo.domain}`,
    definition: {
      domain: attrs.domain,
      path: attrs.path,
      query: attrs.query,
    },
  };
}
const Template: Story<PageViewEventFormProps> = (args) => (
  <div
    style={{
      width: '460px',
      boxShadow: '0px 0px 2px 1px rgba(0, 0, 0, 0.1)',
      position: 'relative',
    }}
    className="demo"
  >
    <PageViewEventForm {...args} />
  </div>
);

const DataChart = () => (
  <div
    style={{
      display: 'flex',
      alignItems: 'center',
      height: '144px',
      justifyContent: 'center',
      border: '1px solid #dfe4ee',
      borderRadius: '4px',
    }}
  >
    <Button type="secondary">查看数据</Button>
  </div>
);
async function handleFinish(val: any) {
  await new Promise((resolve) => {
    setTimeout(() => {
      console.log('handleFinish', val);
      return resolve('success');
    }, 2000);
  });
  //
  return true;
}
const defaultArgs = {
  platform: 'android',
  definedTags: (spaceTags as unknown) as TagElement[],
  onFinish: handleFinish,
  dataChart: <DataChart />,
};
export const WEB = Template.bind({});

WEB.args = {
  ...defaultArgs,
  appType: AppType.WEB,
  platform: 'android',
  onPre: () => {
    console.log('on pre click');
  },
  initialValues: getFormValues(deviceInfoApp, currentPageMinp),
};

export const Minp = Template.bind({});
Minp.args = {
  ...defaultArgs,
  appType: AppType.MINP,
  initialValues: getFormValues(deviceInfoApp, currentPageMinp),
};
export const App = Template.bind({});
App.args = {
  ...defaultArgs,
  initialValues: getFormValues(deviceInfoApp, currentPageApp),
  platform: 'android',
  appType: AppType.NATIVE,
};

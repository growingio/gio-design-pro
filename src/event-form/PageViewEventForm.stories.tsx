/* eslint-disable no-console */
import React, { useRef, useState } from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import { Button, Form } from '@gio-design/components';
import PageViewEventForm from './PageViewEventForm';
import { PageViewEventFormProps, PageViewFormValues } from './interfaces';
import { spaceTags, deviceInfoMinp, currentPageMinp, deviceInfoApp } from './__test__/data.js';
import './eventform-style.less';
import { AppType, DeviceInfo } from './types';
import { TagElement } from './TagElement';

export default {
  title: 'Business Components/EventForm/PageViewEventForm',
  component: PageViewEventForm,
} as Meta;
function getInitialTagElement() {
  const currentPageInfo = currentPageMinp;
  // console.log('currentPageInfo', currentPageInfo);
  const deviceInfo: DeviceInfo = deviceInfoMinp as DeviceInfo;
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
function getFormValues() {
  //
  const deviceInfo: DeviceInfo = deviceInfoApp as DeviceInfo;
  const element = getInitialTagElement();
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
export const Default: Story<PageViewEventFormProps> = () => {
  const [formR] = Form.useForm();
  const formRef = useRef(formR);
  const [, setSubmitDisabled] = useState(true);
  function handleValuesChange(val: any, allVal: any) {
    console.log(val, allVal);
    setSubmitDisabled(false);
  }

  const formValue: PageViewFormValues = getFormValues();
  // const element = getInitialTagElement();
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
  const dataChart = () => (
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
  return (
    <div
      style={{
        width: '460px',
        boxShadow: '0px 0px 2px 1px rgba(0, 0, 0, 0.1)',
      }}
      className="demo"
    >
      <PageViewEventForm
        ref={formRef}
        definedTags={(spaceTags as unknown) as TagElement[]}
        onValuesChange={handleValuesChange}
        // initialTagElement={element}
        platform="android"
        onPre={() => console.warn('pre')}
        showPreButton
        submitter={{ resetText: '取消' }}
        appType={AppType.MINP}
        initialValues={formValue}
        onFinish={handleFinish}
        dataChart={dataChart()}
        onFinishFailed={(values) => console.log(values)}
      />
    </div>
  );
};

/* eslint-disable no-console */
import React, { useRef, useState } from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import { Form } from '@gio-design/components';
import PageViewEventForm from './PageViewEventForm';
import { PageViewEventFormProps, PageViewFormValues } from './interfaces';
import { spaceTags, deviceInfoMinp, currentPageMinp } from './__test__/data';
import './eventform-style.less';
import { DeviceInfo } from './types';
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
  const deviceInfo: DeviceInfo = deviceInfoMinp as DeviceInfo;
  const element = getInitialTagElement();
  const { attrs } = element;
  // const isNative = currentPageInfo.appType === AppType.NATIVE;
  return {
    name: element.name,
    description: element.description,
    domain: attrs.domain,
    path: attrs.path,
    query: attrs.query,
    belongApp: deviceInfo && `${deviceInfo.name} | ${deviceInfo.domain}`,
  };
}
const TemplateCustomSubmitter: Story<PageViewEventFormProps> = () => {
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
    console.log('handleFinish', val);
    return true;
  }
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
        initialValues={formValue}
        onFinish={handleFinish}
        onPre={() => {
          console.log('pre');
        }}
        onFinishFailed={({ values }) => console.log(values)}
      />
      {/* <div className="footer">
          <FooterToolbar
            style={{ position: 'static' }}
            extra={
              <Button type="secondary" onClick={() => console.log('pre clicked')}>
                上一步
              </Button>
            }
          >
            <Button
              key="rest"
              type="secondary"
              onClick={(e) => {
                console.log('reset form');
                formRef.current?.resetFields();
              }}
            >
              取消
            </Button>
            <Button
              key="submit"
              type="primary"
              disabled={submitDisabled}
              onClick={(e) => {
                handleSubmit(e);
              }}
            >
              保存
            </Button>
          </FooterToolbar>
        </div> */}
    </div>
  );
};
export const Default = TemplateCustomSubmitter.bind({});
TemplateCustomSubmitter.args = {
  // definedTags: spaceTags,
  onFinish: async (values) => console.log(values),
};

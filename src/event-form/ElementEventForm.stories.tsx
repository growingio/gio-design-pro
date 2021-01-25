/* eslint-disable no-console */
import React, { useRef, useState } from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import { Form } from '@gio-design/components';
import { omit } from 'lodash';
import ElementEventForm from './ElementEventForm';
import { ElementEventFormProps, ElementFormValues } from './interfaces';
import { spaceTags, deviceInfoMinp } from './__test__/data';
import './eventform-style.less';
import { DeviceInfo, ElementInfo, LimitCondition, PageInfo } from './types';
import { TagElement } from './TagElement';
import { matchQuery } from './utils';

export default {
  title: 'Business Components/EventForm/ElementEventForm',
  component: ElementEventForm,
} as Meta;

const getLimitConditionWithElemInfo = (info: ElementInfo): LimitCondition => {
  const limit: LimitCondition = {};
  if (info.content) {
    limit.content = info.content;
    limit.contentType = '=';
  }
  if (info.index != null) {
    limit.index = info.index;
  }
  !!info.href && (limit.href = info.href);
  return limit;
};
function getInitialTagElement() {
  const currentElem: any = {
    content: '一共测试4种数据类型, change, click, submit, page,',
    index: '1',
    href: '/link',
    path: '/push/cdp/testgio-cdpcircel.html',
    pg: null,
    query: null,
    xpath: '/div.title/form.basic-grey/h1/span',
    contentType: null,
    domain: 'release-messages.growingio.cn',
    urlScheme: 'growing.447120b8e608d6b9',
    actions: ['clck'],
  };
  // console.log('currentPageInfo', currentPageInfo);
  const deviceInfo: DeviceInfo = deviceInfoMinp as DeviceInfo;

  const limitCondition = getLimitConditionWithElemInfo(currentElem);
  const urlScheme = deviceInfo?.urlScheme;

  const attrs = {
    domain: currentElem.domain,
    path: currentElem.path,
    query: currentElem.query,
    xpath: currentElem.xpath,
    index: currentElem.index,
    href: currentElem.href,
    content: currentElem.content,
    urlScheme,
  };

  const { actions } = currentElem;

  const platform = deviceInfo ? deviceInfo.os : 'web';
  const elementInput = {
    name: '',
    description: '',
    docType: 'elem',
    actions,
    attrs,
    definition: {
      ...attrs,
      ...limitCondition,
    },
    platforms: [platform],
  };

  return elementInput;
}

function getFormValues() {
  //
  const deviceInfo: DeviceInfo = deviceInfoMinp as DeviceInfo;
  const element = getInitialTagElement();
  const { attrs, definition } = element;
  // const isNative = currentPageInfo.appType === AppType.NATIVE;
  return {
    name: element.name,
    description: element.description,
    domain: attrs.domain,
    path: attrs.path,
    query: attrs.query,
    ...omit(definition, ['domain', 'path', 'query']),
    belongApp: deviceInfo && `${deviceInfo.name} | ${deviceInfo.domain}`,
  };
}
const searchPageRule1 = (pageInfo: PageInfo, tag: TagElement): boolean => {
  const tagDef = tag.definition as any;
  return (
    tag.docType === 'page' &&
    pageInfo.domain === tagDef.domain &&
    ((!pageInfo.path && !tagDef.path) || pageInfo.path === tagDef.path) &&
    matchQuery(pageInfo.query as any, tagDef.query, true)
  );
};
const allDefinedTags = (spaceTags as unknown) as TagElement[];
// const elementsInput = getInitialTagElement();
const TemplateCustomSubmitter: Story<ElementEventFormProps> = () => {
  const [formR] = Form.useForm();
  const formRef = useRef(formR);
  const [, setSubmitDisabled] = useState(true);
  function handleValuesChange(val: any, allVal: any) {
    console.log(val, allVal);
    setSubmitDisabled(false);
  }

  const formValue: ElementFormValues = getFormValues();
  const currentPageTags = allDefinedTags.filter((v) => searchPageRule1({ ...formValue } as PageInfo, v));

  // const element = getInitialTagElement();
  async function handleFinish(val: any) {
    console.log('handleFinish', val);
    return true;
  }
  // const definedTags
  return (
    <div
      style={{
        width: '460px',
        boxShadow: '0px 0px 2px 1px rgba(0, 0, 0, 0.1)',
      }}
      className="demo"
    >
      <ElementEventForm
        ref={formRef}
        definedTags={(spaceTags as unknown) as TagElement[]}
        onValuesChange={handleValuesChange}
        // initialTagElement={element}
        initialValues={formValue}
        onFinish={handleFinish}
        pagePicker={{
          onActionButtonClick: () => console.log('go to define page'),
          currentPageTags: currentPageTags || [],
        }}
        onFinishFailed={({ values }) => console.log('onFinishFailed', values)}
      />
    </div>
  );
};
export const Default = TemplateCustomSubmitter.bind({});
TemplateCustomSubmitter.args = {
  // definedTags: spaceTags,
  onFinish: async (values) => console.log(values),
};

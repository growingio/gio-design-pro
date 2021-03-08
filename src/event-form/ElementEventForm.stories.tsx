/* eslint-disable no-console */
import React, { useState } from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import { Button } from '@gio-design/components';
import { merge } from 'lodash';
import ElementEventForm from './ElementEventForm';
import { ElementEventFormProps, ElementFormValues } from './interfaces';
import { spaceTags, deviceInfoMinp } from './__test__/data';
// import './eventform-style.less';
import { AppType, DeviceInfo, ElementInfo, LimitCondition, PageInfo } from './types';
import { TagElement } from './TagElement';
import { matchQuery } from './utils';
import Docs from './EventForm.mdx';

export default {
  title: 'Business Components/EventForm/ElementEventForm',
  component: ElementEventForm,
  parameters: {
    docs: {
      page: Docs,
    },
  },
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
function getInitialTagElement(elementname: string) {
  const elements: any = {
    element1: {
      name: 'element1',
      content: 'element1:一共测试4种数据类型, change, click, submit, page,',
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
    },
    element2: {
      name: 'element2',
      content: 'element2:这是2',
      path: '/push/cdp/testgio-cdpcircel.html',
      pg: null,
      query: null,
      xpath: '/div.title/form.basic-grey/h1/span',
      contentType: null,
      domain: 'release-messages.growingio.cn',
      urlScheme: 'growing.447120b8e608d6b9',
      actions: ['clck'],
    },
  };
  const currentElem = elements[elementname] || {};
  // console.log('currentPageInfo', currentPageInfo);
  const deviceInfo: DeviceInfo = deviceInfoMinp as DeviceInfo;

  const limitCondition = getLimitConditionWithElemInfo(currentElem);
  const urlScheme = deviceInfo?.urlScheme;
  const attrs = {
    domain: currentElem.domain,
    path: currentElem.path,
    query: currentElem.query,
    xpath: currentElem.xpath,
    index: '', // currentElem.index,
    href: '', // currentElem.href,
    content: currentElem.content,
    urlScheme,
  };

  const { actions } = currentElem;

  const platform = deviceInfo ? deviceInfo.os : 'web';
  const elementInput = {
    name: currentElem?.name,
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
const belongPage: any = {
  id: 'JnG40OGz',
  name: '是',
  creator: 'haozhigang',
  creatorId: 'rRGoYQml',
  createdAt: '2021-01-14T07:08:25Z',
  updater: 'haozhigang',
  updaterId: 'rRGoYQml',
  updatedAt: '2021-01-14T07:08:25Z',
  description: '是  得到的',
  platforms: ['minp'],
  docType: 'page',
  actions: ['page'],
  patternMatched: false,
  attrs: {
    content: null,
    index: null,
    href: null,
    path: 'pages/index/index',
    pg: null,
    query: null,
    xpath: null,
    contentType: null,
    domain: 'wx123456',
    urlScheme: null,
  },
  definition: {
    domain: 'wx123456',
    path: 'pages/index/index',
    query: '得到的=s',
    xpath: null,
    index: null,
    href: null,
    content: null,
    pg: null,
    contentType: null,
    urlScheme: null,
  },
  screenshot: { target: '', viewport: '' },
};
function getFormValues(elem: string) {
  //
  const deviceInfo: DeviceInfo = deviceInfoMinp as DeviceInfo;
  const element = getInitialTagElement(elem);
  const { attrs, definition } = element;
  // const isNative = currentPageInfo.appType === AppType.NATIVE;
  // const res = {
  //   belongApp: '小程序无埋点测试 | wx123456',
  //   attrs: { domain: 'wx123456', path: 'pages/index/index', xpath: '#getUserInfo', index: '0' },
  //   definition: { domain: 'wx123456', path: 'pages/index/index', xpath: '#getUserInfo', index: '0' },
  // };
  const res = {
    name: element.name,
    description: element.description,
    belongPage,
    // domain: attrs.domain,
    // path: attrs.path,
    // query: attrs.query,
    // ...omit(definition, ['domain', 'path', 'query']),
    belongApp: deviceInfo && `${deviceInfo.name} | ${deviceInfo.domain}`,
    attrs,
    definition,
  };
  return res;
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
const Template: Story<ElementEventFormProps> = (args) => {
  const [formValue, setFormValue] = useState<ElementFormValues>(getFormValues('element1'));
  // const formValue: ElementFormValues = getFormValues();
  const { domain, path, query } = formValue.definition;
  const currentPageTags = allDefinedTags.filter((v) =>
    searchPageRule1({ ...formValue, domain, path, query } as PageInfo, v)
  );
  function handleElementClick(ele: string) {
    const vals = getFormValues(ele);
    setFormValue(vals);
  }
  async function handleFinish(val: any) {
    await new Promise((resolve) => {
      setTimeout(() => {
        const submitVal = merge(formValue, val);
        allDefinedTags.push(submitVal);
        console.log('handleFinish', submitVal, allDefinedTags.length);

        resolve('success');
      }, 2000);
    });
    //
    return true;
  }
  return (
    <div>
      <Button onClick={() => handleElementClick('element1')}>元素一</Button>{' '}
      <Button onClick={() => handleElementClick('element2')}>元素二</Button>
      <div style={{ margin: '8px 0px', height: '1px' }} />
      <div
        style={{
          width: '460px',
          boxShadow: '0px 0px 2px 1px rgba(0, 0, 0, 0.1)',
          height: '600px',
          position: 'relative',
        }}
      >
        <ElementEventForm
          {...args}
          definedTags={allDefinedTags}
          initialValues={formValue}
          onFinish={handleFinish}
          pagePicker={{
            onActionButtonClick: () => console.log('go to define page'),
            // currentPageTags: currentPageTags || [],
            dataSource: (spaceTags as unknown) as TagElement[],
            currentPageTags, // ([spaceTags[0]] as unknown) as TagElement[],
          }}
        />
      </div>
    </div>
  );
};

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
const defaultArgs = {
  platform: 'android',
  definedTags: (spaceTags as unknown) as TagElement[],
  dataChart: <DataChart />,
};

export const Default = Template.bind({});
Default.args = {
  ...defaultArgs,
  appType: AppType.MINP,
};

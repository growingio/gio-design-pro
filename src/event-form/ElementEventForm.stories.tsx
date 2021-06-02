/* eslint-disable no-console */
import React, { useMemo, useState } from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import { Button, Card, Input } from '@gio-design/components';
import { merge } from 'lodash';
import ElementEventForm from './ElementEventForm';
import { ElementEventFormProps, ElementFormValues } from './interfaces';
import { deviceInfoMinp } from './__test__/device.data';

// import './eventform-style.less';
import { AppType, DeviceInfo, ElementInfo, LimitCondition, PageInfo } from './types';
import { TagElement } from './TagElement';
import { matchQuery } from './utils';
import Docs from './EventForm.mdx';
import './style';
// import { definedPages } from './__test__/pagePicker.data';
import { elements, definedElements } from './__test__/elements.data';

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
function getInitialTagElement(elementname: string, platform: string) {
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

  // const _platform = platform;
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
    platforms: [platform ?? 'web'],
  };

  return elementInput;
}

function getFormValues(element: any) {
  //
  const deviceInfo: DeviceInfo = deviceInfoMinp as DeviceInfo;
  // const element = getInitialTagElement(elem);
  const { attrs, definition } = element;

  const res = {
    name: element.name,
    description: element.description,
    // belongPage: { name: 'none' },
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
const DEFINED_TAGS = (definedElements as unknown) as TagElement[];
const Template: Story<ElementEventFormProps> = (args) => {
  const { platform } = args;
  const [element, setElement] = useState<any>();
  const [formValue, setFormValue] = useState<ElementFormValues>();
  const [allDefinedTags, updateDefinedTags] = useState(() => DEFINED_TAGS);
  // const formValue: ElementFormValues = getFormValues();
  function handleElementClick(ele: string) {
    const _element = getInitialTagElement(ele, platform);
    setElement(_element);
    const vals = getFormValues(_element);
    setFormValue(vals);
  }

  const currentPageTags = useMemo(() => {
    if (!element) return [];
    const { domain, path, query } = element?.definition;
    const pages = allDefinedTags.filter((v) => searchPageRule1({ domain, path, query } as PageInfo, v));
    return pages;
  }, [element]);
  async function handleFinish(val: any) {
    const submitVal = merge(element, val);
    updateDefinedTags((pre) => [...pre, submitVal]);
    await new Promise((resolve) => {
      setTimeout(() => {
        console.log('handleFinish', submitVal, allDefinedTags.length);
        // eslint-disable-next-line no-alert
        alert('保存成功！');
        resolve('success');
      }, 1000);
    });
    //
    return true;
  }
  return (
    <div>
      <Card style={{ width: '460px' }}>
        <Card.Meta title="点击元素圈选" />
        {platform !== 'web' && (
          <Card.Meta>
            <Button onClick={() => handleElementClick('element1')}>元素一</Button>
            <Button type="secondary" onClick={() => handleElementClick('element2')}>
              元素二
            </Button>
          </Card.Meta>
        )}
        {platform === 'web' && (
          <Card.Meta>
            <Button onClick={() => handleElementClick('element3')}>元素三</Button>
            <Button type="secondary" onClick={() => handleElementClick('element4')}>
              元素四
            </Button>
          </Card.Meta>
        )}
        <Card.Meta />
      </Card>

      <div style={{ margin: '8px 0px', height: '1px' }} />
      {formValue && (
        <Card
          style={{
            width: '460px',
            height: '600px',
            padding: 0,
            overflow: 'hidden',
            boxShadow: '0px 0px 2px 1px rgba(0, 0, 0, 0.1)',
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
              // dataSource: (spaceTags as unknown) as TagElement[],
              currentPageTags, // ([spaceTags[0]] as unknown) as TagElement[],
            }}
          />
        </Card>
      )}
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
  // definedTags: (spaceTags as unknown) as TagElement[],
  dataChart: <DataChart />,
};

export const MINP = Template.bind({});
MINP.args = {
  ...defaultArgs,
  appType: AppType.MINP,
};

export const WEB = Template.bind({});
WEB.args = {
  ...defaultArgs,
  platform: 'web',
  manualMode: <Input placeholder="定义手动模式" />,
  appType: AppType.WEB,
};

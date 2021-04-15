/* eslint-disable react/no-danger */
import React from 'react';
import { DocProps, TagElement } from './TagElement';
import { AppType } from './types';

const renderDefinitionRuleText = (props: { definition: DocProps; repeatTag?: TagElement; appType: AppType }) => {
  const { definition, repeatTag, appType } = props;
  let text = '现在定义的是';
  if (repeatTag) {
    text = `该规则已被 <b>${repeatTag.creator}</b> 定义为【${repeatTag.name}】。${text}`;
  }

  if (appType === AppType.NATIVE) {
    text += `页面 <span class="link">${definition.path}</span> 。`;
  } else if (appType === AppType.WEB) {
    if (definition.path) {
      text += `页面 <span class="link">${definition.domain + definition.path}</span> `;
    } else {
      text += ` <span class="link">${definition.domain}</span> `;
    }
    if (definition.query) {
      if (definition.path) text += '，';
      text += `查询条件为 <span class="link">${definition.query}</span>`;
    }
    if (definition.path) {
      text += ' 。';
    } else {
      text += ' 下的所有页面。';
    }
  } else if (appType === AppType.MINP) {
    if (definition.path === undefined) {
      text += ` <span class="link">小程序所有页面</span> `;
    } else {
      text += `页面 <span class="link">${definition.path}</span> `;
    }
    if (definition.query) {
      text += `，查询条件为 <span class="link">${definition.query}</span>`;
    }
    text += '。';
  }
  return <span dangerouslySetInnerHTML={{ __html: text }} />;
};
export default renderDefinitionRuleText;

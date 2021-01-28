/* eslint-disable react/no-danger */
import React from 'react';
import { DocProps, TagElement } from './TagElement';
// import { LimitCondition } from './types';

const renderDefinitionRuleText = (props: {
  attrs: DocProps;
  repeatTag?: TagElement;
  // appType: AppType;
  limitCondition: DocProps;
}) => {
  const { attrs: originAttrs, repeatTag, limitCondition } = props;
  // console.warn('props', { originAttrs, limitCondition });

  // const isNative = appType === AppType.NATIVE;
  let attrs = originAttrs;
  let limit = limitCondition as DocProps;
  if (repeatTag) {
    attrs = repeatTag.attrs;
    limit = repeatTag.definition;
  }

  // let { content } = limit;
  // if (content && content.length > 30) {
  //   content = `${content.substring(0, 28)}...`;
  // }
  // const index = +limit.index;
  // App 的index 从0开始；展示时 统一从1开始

  const Cel: React.FC<{}> = ({ children }) => (
    <span style={{ color: '#3867f4' }} className="link">
      {children}
    </span>
  );
  const renderAttrsDesc = () => {
    // let hasLimiter = !!get(data, 'definition.content') || !!get(data, 'definition.href');
    const contentDefined = !!limit.content;
    const indexDefined = !!limit.index;
    const hrefDefined = !!limit.href;
    const contentAttr = !!attrs?.content;
    const hrefAttr = !!attrs?.href;
    const indexAttr = !!attrs?.index;
    // const attrsDescs=['即使元素的跳转']
    // 现根据有无跳转链接判断同类和非同类的描述
    let str1: string = '';
    let str2: string = '';
    if (indexAttr) {
      if (contentAttr && hrefAttr && contentDefined && hrefDefined && indexDefined) {
        str1 = '内容、位置或跳转链接';
        str2 = '';
      }
      if (contentAttr && hrefAttr && !contentDefined && hrefDefined && indexDefined) {
        str1 = '位置或跳转链接';
        str2 = '内容';
      }
      if (contentAttr && hrefAttr && contentDefined && !hrefDefined && indexDefined) {
        str1 = '跳转链接';
        str2 = '内容和位置';
      }
      if (contentAttr && hrefAttr && !contentDefined && !hrefDefined && indexDefined) {
        str1 = '位置';
        str2 = '内容和跳转链接';
      }

      if (contentAttr && hrefAttr && !contentDefined && hrefDefined && !indexDefined) {
        str1 = '跳转链接';
        str2 = '内容和位置';
      }
      if (contentAttr && hrefAttr && contentDefined && !hrefDefined && !indexDefined) {
        str1 = '内容';
        str2 = '位置和跳转链接';
      }

      if (contentAttr && hrefAttr && contentDefined && hrefDefined && !indexDefined) {
        str1 = '内容或跳转链接';
        str2 = '位置';
      }
      if (contentAttr && hrefAttr && !contentDefined && !hrefDefined && !indexDefined) {
        str1 = '';
        str2 = '';
      }
      // 元素attrs中没有的属性 definition中肯定没有
      // 只有href
      if (!contentAttr && hrefAttr && hrefDefined && indexDefined) {
        str1 = '位置或跳转链接';
        str2 = '';
      }
      if (!contentAttr && hrefAttr && !hrefDefined && indexDefined) {
        str1 = '位置';
        str2 = '跳转链接';
      }
      if (!contentAttr && hrefAttr && !hrefDefined && !indexDefined) {
        str1 = '';
        str2 = '';
      }
      if (!contentAttr && hrefAttr && hrefDefined && !indexDefined) {
        str1 = '跳转链接';
        str2 = '位置';
      }
      // 只有content时
      if (contentAttr && !hrefAttr && !contentDefined && !indexDefined) {
        str1 = '';
        str2 = '';
      }
      if (contentAttr && !hrefAttr && contentDefined && !indexDefined) {
        str1 = '内容';
        str2 = '位置';
      }
      if (contentAttr && !hrefAttr && !contentDefined && indexDefined) {
        str1 = '位置';
        str2 = '内容';
      }
      if (contentAttr && !hrefAttr && contentDefined && indexDefined) {
        str1 = '内容或位置';
        str2 = '';
      }
      if (!contentAttr && !hrefAttr) {
        str1 = '';
        str2 = '';
      }
    } else {
      if (contentAttr && hrefAttr && contentDefined && hrefDefined) {
        str1 = '内容或跳转链接';
        str2 = '';
      }
      if (contentAttr && hrefAttr && !contentDefined && hrefDefined) {
        str1 = '跳转链接';
        str2 = '内容';
      }
      if (contentAttr && hrefAttr && contentDefined && !hrefDefined) {
        str1 = '内容';
        str2 = '跳转链接';
      }
      if (contentAttr && hrefAttr && !contentDefined && !hrefDefined) {
        str1 = '';
        str2 = '内容和跳转链接';
      }
      // --只有href
      if (!contentAttr && hrefAttr && !hrefDefined) {
        str1 = '';
        str2 = '跳转链接';
      }
      if (!contentAttr && hrefAttr && hrefDefined) {
        str1 = '跳转链接';
        str2 = '';
      }
      // --只有content
      if (contentAttr && !hrefAttr && !contentDefined) {
        str1 = '';
        str2 = '内容';
      }
      if (contentAttr && !hrefAttr && contentDefined) {
        str1 = '内容';
        str2 = '';
      }
      // 都没有
      if (!contentAttr && !hrefAttr) {
        str1 = '';
        str2 = '';
      }
    }
    const tmp = () => {
      if (!str1 && !str2 && indexAttr) {
        return <span>所有同类元素的数据之和。我们已经将这组同类元素用虚线框标记出来。</span>;
      }
      return (
        <>
          <span>{str1 ? `若元素的${str1}改变，就不再继续统计了。` : ''}</span>
          <span>{str2 ? `即使元素${str2}改变，也会继续统计。` : ''}</span>
        </>
      );
    };
    return tmp();
  };
  function ellipsisText(content?: string) {
    if (content && content.length > 30) {
      return `${content.substring(0, 28)}...`;
    }
    return content;
  }
  const renderSimilar = () => {
    const hasLimiter = !!limit.content || !!limit.href || limit.index;
    const hasContentLimiter = !!limit.content;
    const hasIndexLimiter = !!limit.index;
    const hasHrefLimiter = !!limit.href;
    return (
      <>
        {hasLimiter && (
          <>
            <Cel>同类元素内</Cel>
            {hasContentLimiter && hasIndexLimiter && (
              <>
                ，限定
                <Cel>
                  元素内容{limit.contentType === 'match_phrase' ? '包含' : '为'}「{ellipsisText(limit.content)}」
                </Cel>
                ，<Cel>{`元素位置为「第${limit.index}位」`}</Cel>
              </>
            )}
            {!hasContentLimiter && hasIndexLimiter && (
              <>
                ，限定<Cel>{`元素位置为「第${limit.index}位」`}</Cel>
              </>
            )}
            {hasContentLimiter && !hasIndexLimiter && (
              <>
                ，限定
                <Cel>
                  元素内容{limit.contentType === 'match_phrase' ? '包含' : '为'}「{ellipsisText(limit.content)}」
                </Cel>
              </>
            )}
            {hasHrefLimiter && (
              <>
                ，限定
                <Cel>跳转链接</Cel>
              </>
            )}
            的元素。
          </>
        )}
        {renderAttrsDesc()}
      </>
    );
  };

  const renderNoSimilar = () => {
    // let hasLimiter = !!get(data, 'definition.content') || !!get(data, 'definition.href');

    const hasContentLimiter = !!limit.content;
    // let hasIndexLimiter = get(data, 'definition.index') === null;
    const hasHrefLimiter = !!limit.href;
    return (
      <>
        <>
          <Cel>当前位置</Cel>
          {hasContentLimiter && (
            <>
              ，限定
              <Cel>
                元素内容{limit.contentType === 'match_phrase' ? '包含' : '为'}「{ellipsisText(limit.content)}」
              </Cel>
            </>
          )}
          {hasHrefLimiter && (
            <>
              ，限定
              <Cel>跳转链接</Cel>
            </>
          )}
          的元素。
        </>
        {renderAttrsDesc()}
      </>
    );
  };
  const hasSimilar = () => !!attrs?.index;

  return (
    <span>
      {repeatTag && (
        <span>
          该规则已被 <b>{repeatTag.creator}</b> 定义为
          <span>【{repeatTag.name}】。</span>
        </span>
      )}
      现在定义的是 <Cel>所属页面</Cel> 中，
      {hasSimilar() ? renderSimilar() : renderNoSimilar()}
    </span>
  );
};

export default renderDefinitionRuleText;

import React, { useState, useEffect } from 'react';

import usePrefixCls from '@gio-design/components/es/utils/hooks/use-prefix-cls';
// import { Checkbox } from '@gio-design/components';
import { cloneDeep } from 'lodash';
import { LimitCondition } from '../../types';
import Checkbox from './CheckboxWithEditButton';
import ContentForm from './ContentForm';
import HrefForm from './HrefForm';

export interface Props {
  onChange?: (defineInfo: LimitCondition) => void;
  value?: LimitCondition;
  isNative?: boolean;
}
interface ConditionValue extends LimitCondition {
  // content?: string;
  // index?: string;
  // href?: string;
  // contentType?: 'match_phrase' | '=';
  contentChecked?: boolean;
  indexChecked?: boolean;
  hrefChecked?: boolean;
}
const ConditionEditor: React.FC<Props> = (props) => {
  const { onChange, value = {}, isNative = false } = props;
  const prefixCls = usePrefixCls('condition-checkbox-group');
  const [currentValue, setCurrentValue] = useState<ConditionValue>(() => {
    const current = cloneDeep({
      ...value,
      contentChecked: !!value?.content,
      indexChecked: !!value?.index,
      hrefChecked: !!value?.href,
    });
    return current || {};
  });
  const [contentModalVisible, setContentModalVisible] = useState(false);
  const [hrefModalVisible, setHrefModalVisible] = useState(false);
  useEffect(() => {
    onChange?.({ ...currentValue });
  }, [currentValue]);

  function handelContentChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { checked } = e.target;
    setCurrentValue((preValue) => ({ ...preValue, contentChecked: checked }));
  }
  function handelIndexChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { checked } = e.target;
    setCurrentValue((preValue) => ({ ...preValue, indexChecked: checked }));
  }
  function handelHrefChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { checked } = e.target;
    setCurrentValue((preValue) => ({ ...preValue, hrefChecked: checked }));
  }
  function onContentEditClick() {
    setContentModalVisible(true);
  }
  function onHrefEditClick() {
    setHrefModalVisible(true);
  }
  function handleContentSave(values: { [key: string]: any }) {
    // console.log('handleContentSave', values);
    setCurrentValue((preValue) => ({ ...preValue, content: values.content, contentType: values.contentType }));
    setContentModalVisible(false);
  }
  function handleHrefSave(values: { [key: string]: any }) {
    setCurrentValue((preValue) => ({ ...preValue, href: values.href }));
    setHrefModalVisible(false);
  }
  return (
    <>
      <div className={prefixCls}>
        {currentValue?.content && (
          <Checkbox
            actionButton={{ onClick: onContentEditClick }}
            checked={currentValue.contentChecked}
            onChange={handelContentChange}
          >
            元素内容
          </Checkbox>
        )}
        {currentValue?.index && (
          <Checkbox actionButton={false} checked={currentValue?.indexChecked} onChange={handelIndexChange}>
            元素位置第{+(currentValue?.index || 0) + +(isNative || 0)}位
          </Checkbox>
        )}
        {currentValue?.href && (
          <Checkbox
            actionButton={{ onClick: onHrefEditClick }}
            checked={currentValue?.hrefChecked}
            onChange={handelHrefChange}
          >
            跳转链接
          </Checkbox>
        )}
      </div>
      <ContentForm
        visible={contentModalVisible}
        onCancel={() => setContentModalVisible(false)}
        onCreate={handleContentSave}
        ininitialValues={{ content: currentValue?.content, contentType: currentValue?.contentType }}
      />
      <HrefForm
        visible={hrefModalVisible}
        onCancel={() => setHrefModalVisible(false)}
        onCreate={handleHrefSave}
        ininitialValues={{ href: currentValue?.href }}
      />
    </>
  );
};
export default ConditionEditor;

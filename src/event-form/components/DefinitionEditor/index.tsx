/* eslint-disable eqeqeq */
/* eslint-disable no-return-assign */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { Input, Radio, Form, Button } from '@gio-design/components';
import useProxyStore from '../../../hooks/useProxyStore';
import useUpdate from '../../../hooks/useUpdate';
import EditorModal from '../ModalForm';
import QsCheckbox from './CheckboxWithEditButton';
// import { LimitCondition } from '../../../typing';
import './index.less';
// 定义元素时的限定条件
export interface LimitCondition {
  content?: string;
  index?: string;
  href?: string;
  contentType?: 'match_phrase' | '=';
}
export interface Props {
  onChange?: (defineInfo: LimitCondition) => void;
  initValue: LimitCondition;
  isNative?: boolean;
}

export interface TempValue {
  [K: string]: any;
}

const initStore = (initValue: LimitCondition) => {
  const checks = {
    content: !!initValue.content,
    index: !!initValue.index,
    href: !!initValue.href,
  };

  return {
    checks,
    definition: initValue,
    init: { ...initValue },
  };
};

const CheckboxEditorGroup: React.FC<Props> = (props) => {
  const { onChange, initValue = {}, isNative } = props;
  const [showContentEditor, setShowContentEditor] = useState(false);
  const [, setShowHrefEditor] = useState(false);
  const [tempValue, setTempValue] = useProxyStore<TempValue>({ input: '', radio: '' });
  const [store, updateStore] = useProxyStore(() => initStore(initValue));

  useUpdate(() => {
    if (onChange) {
      const { definition, checks } = store;
      const def: LimitCondition = {};
      if (checks.content) {
        def.content = definition.content;
        def.contentType = definition.contentType;
      }
      if (checks.href) def.href = definition.href;
      if (checks.index) def.index = definition.index;
      onChange(def);
    }
  }, [store]);

  useUpdate(() => {
    updateStore(initStore(initValue));
  }, [initValue]);

  /**
   * 用来更新checkbox的值
   */
  const doCheckboxChange = (key: string) => {
    return (e: any) => {
      const { checked } = e.target;

      // 取消时恢复默认值
      const { definition } = store;
      if (!checked) {
        // @ts-ignore
        definition[key] = store.init[key];
        if (key == 'content') {
          definition.contentType = store.init.contentType;
        }
      }
      const checks = { ...store.checks, [key]: checked };
      updateStore({ checks, definition } as any);
    };
  };

  return (
    <>
      <EditorModal title="编辑元素内容" visible={showContentEditor}>
        <div className="editor-modal-body">
          <div className={`editor-modal-label-item ${tempValue.input ? '' : 'has-error'}`}>
            <label style={{ marginBottom: 8 }}>
              <span>{tempValue.radio != '=' ? '元素内容包含' : '元素内容为'}</span>
              <span className="required">*</span>
            </label>
            <Input
              value={tempValue.input}
              placeholder="请填写元素内容"
              // eslint-disable-next-line no-return-assign
              onChange={(e) => {
                return (tempValue.input = e.target.value);
              }}
            />
            <span style={{ visibility: tempValue.input ? 'hidden' : 'visible' }} className="error-tip">
              元素内容不能为空
            </span>
          </div>
          <div className="editor-modal-label-item">
            <label style={{ marginBottom: 8 }}>
              <span>按内容</span>
            </label>
            <Radio.Group value={tempValue.radio} onChange={(e) => (tempValue.radio = e.target.value)}>
              <Radio style={{ fontWeight: 'normal' }} value="=">
                精准匹配
              </Radio>
              <Radio style={{ fontWeight: 'normal' }} value="match_phrase">
                模糊匹配
              </Radio>
            </Radio.Group>
          </div>
        </div>
      </EditorModal>

      <EditorModal
        title="编辑跳转链接"
        trigger={<Button type="primary">新建表单</Button>}
        modalProps={
          {
            // onClose: () => console.log('run'),
          }
        }
        onFinish={async (values: any) => {
          console.log(values);
          return true;
        }}
      >
        <div className="editor-modal-body">
          <Form.Item name="href" label="跳转链接为" required>
            <Input.TextArea
              value={tempValue.input}
              placeholder="请填写跳转链接"
              rows={3}
              onChange={(e) => setTempValue({ input: e.target.value, radio: '' })}
              wrapStyle={{ width: '100%', height: 'unset' }}
            />
          </Form.Item>
        </div>
      </EditorModal>

      <div className="checkbox-group">
        {store.init.content && (
          <QsCheckbox
            checked={store.checks.content}
            onChange={doCheckboxChange('content')}
            onClickEditor={() => {
              setShowContentEditor(true);
              setTempValue({ input: store.definition?.content, radio: store.definition?.contentType });
            }}
          >
            元素内容
          </QsCheckbox>
        )}
        {!!store.init.index && (
          <QsCheckbox style={{ width: 200 }} checked={store.checks.index} onChange={doCheckboxChange('index')}>
            元素位置第{+store.init.index + +(isNative || 0)}位
          </QsCheckbox>
        )}
        {store.init.href && (
          <QsCheckbox
            checked={store.checks.href}
            onChange={doCheckboxChange('href')}
            onClickEditor={() => {
              setShowHrefEditor(true);
              tempValue.input = store.definition?.href;
            }}
          >
            跳转链接
          </QsCheckbox>
        )}
      </div>
    </>
  );
};

export default CheckboxEditorGroup;

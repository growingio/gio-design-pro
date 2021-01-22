import React, { useRef } from 'react';
import { Input, Form, Alert } from '@gio-design/components';
import usePrefixCls from '@gio-design/components/es/utils/hooks/use-prefix-cls';
import { FormInstance } from '@gio-design/components/es/components/form';
import { MAX_DESC_LENGTH, MAX_VALUE_LENGTH } from './utils';
import FormItemGroup from './components/FormItemGroup';
import { EventFormProps, ElementEventFormProps } from './interfaces';
import './style';
import '@gio-design/components/es/components/link/style/css.js';
import BaseForm from './BaseForm';
import PagePicker from './components/PagePicker';
import { TagElement } from './TagElement';

const PageViewEventForm: React.ForwardRefRenderFunction<FormInstance, ElementEventFormProps> = (
  props: EventFormProps,
  ref
) => {
  const { labelAlign = 'left', labelWidth = 68, initialValues = {}, ...restProps } = props;
  const [wrapForm] = Form.useForm<FormInstance>();
  const formRef = useRef<FormInstance>(wrapForm);
  React.useImperativeHandle(ref, () => formRef?.current);

  const prefixCls = usePrefixCls('event-form');
  const deviceInfo = {};

  return (
    <div className={`${prefixCls}-wrap`}>
      <div className={`${prefixCls}-body`}>
        <BaseForm
          labelAlign={labelAlign}
          labelWidth={labelWidth}
          form={wrapForm}
          initialValues={{ ...initialValues }}
          contentRender={(items, submitter) => {
            return (
              <>
                {items}
                <div className="footer-submitter">{submitter}</div>
              </>
            );
          }}
          {...restProps}
        >
          <FormItemGroup groupNumber={1} title="基本信息">
            <Form.Item name="name" label="页面名称" rules={[{ required: true, message: '名称不能为空' }]}>
              <Input placeholder="请输入页面名称" maxLength={MAX_VALUE_LENGTH} />
            </Form.Item>
            <Form.Item name="description" label="描述">
              <Input.TextArea maxLength={MAX_DESC_LENGTH} rows={3} placeholder="请输入描述" />
            </Form.Item>
          </FormItemGroup>
          <FormItemGroup style={{ marginTop: '24px' }} groupNumber={2} title="定义规则">
            <div className="feedback">
              <Alert size="small" showIcon type="error" message="xxxxx" />
            </div>
            {deviceInfo && (
              <Form.Item name="belongApp" label="所属应用">
                <Input placeholder="所属应用包名" disabled />
              </Form.Item>
            )}
            <Form.Item name="belongPage" label="所属页面">
              <PagePicker
                onDefineNewPage={() => {
                  console.log('onDefineNewPage');
                }}
                currentPageTags={[] as TagElement[]}
                relatedPageTags={[] as TagElement[]}
              />
            </Form.Item>
            <Form.Item name="definitions" label="限定条件">
              {/* <Input disabled maxLength={MAX_VALUE_LENGTH} /> */}
              {/* <DefinitionEditor /> */}
            </Form.Item>

            <Form.Item name="data" label="数据">
              <div className="data-chart-wrap" />
            </Form.Item>
          </FormItemGroup>
          {/* <Form.Item>
            <div className="footer-submitter"> {Submitter}</div>
          </Form.Item> */}
        </BaseForm>
      </div>
    </div>
  );
};

export default React.forwardRef(PageViewEventForm);

import React, { useRef, useState } from 'react';
import { Tooltip, Form, Input, Alert, Link } from '@gio-design/components';
import usePrefixCls from '@gio-design/components/es/utils/hooks/use-prefix-cls';
import { FormInstance } from '@gio-design/components/es/components/form';
import { ButtonProps } from '@gio-design/components/es/components/button';
import { MAX_DESC_LENGTH, MAX_VALUE_LENGTH } from './utils';
import FormItemGroup from './components/FormItemGroup';
import PathInput from './components/PathInput';
import QueryInput from './components/QSInput';
import Submitter, { SubmitterProps } from './components/Submitter';
import { EventFormProps, PageViewEventFormProps } from './interfaces';
import './style';
import '@gio-design/components/es/components/link/style/css.js';

function definePageTip() {
  return (
    <span>
      支持使用通配符 * 来代替任意字符。例如：
      <br />
      页面1的地址是：www.sale.com/dress，
      <br />
      页面2的地址是：www.sale.com/furniture，
      <br />
      可以写成：www.sale.com/* 用于
      <br />
      统计所有符合这个规则的页面的数据总和。
    </span>
  );
}

const PageViewEventForm: React.ForwardRefRenderFunction<FormInstance, PageViewEventFormProps> = (
  props: EventFormProps,
  ref
) => {
  const { labelAlign = 'left', labelWidth = 68, submitter, initialValues = {}, ...restProps } = props;
  const [wrapForm] = Form.useForm<FormInstance>();
  const formRef = useRef<FormInstance>(wrapForm);
  React.useImperativeHandle(ref, () => formRef?.current);

  const submitterProps: SubmitterProps = typeof submitter === 'boolean' || !submitter ? {} : submitter;

  const [loading, setLoading] = useState<ButtonProps['loading']>(false);
  /**
   * 渲染提交按钮与重置按钮
   */
  const submitterNode =
    submitter === false ? undefined : (
      <Submitter
        key="submitter"
        {...submitterProps}
        form={wrapForm}
        submitButtonProps={{
          loading,
          ...submitterProps.submitButtonProps,
        }}
      />
    );
  const prefixCls = usePrefixCls('event-form');
  const isNative = false;
  const deviceInfo = {};

  return (
    <div className={`${prefixCls}-wrap`}>
      <div className={`${prefixCls}-body`}>
        <Form
          labelAlign={labelAlign}
          labelWidth={labelWidth}
          form={wrapForm}
          initialValues={{ ...initialValues }}
          {...restProps}
          onFinish={async (values) => {
            if (!restProps.onFinish) {
              return;
            }
            setLoading(true);
            await restProps.onFinish(values);
            setLoading(false);
          }}
        >
          <FormItemGroup groupNumber={1} title="基本信息">
            <Form.Item name="name" label="页面名称" rules={[{ required: true, message: '名称不能为空' }]}>
              <Input placeholder="请输入页面名称" maxLength={MAX_VALUE_LENGTH} />
            </Form.Item>
            <Form.Item name="description" label="描述">
              <Input.TextArea maxLength={MAX_DESC_LENGTH} rows={3} placeholder="请输入描述" />
            </Form.Item>
          </FormItemGroup>
          <FormItemGroup
            style={{ marginTop: '24px' }}
            groupNumber={2}
            title="定义规则"
            extra={
              <Tooltip title={definePageTip()} placement="topRight" arrowPointAtCenter trigger="hover">
                <Link style={{ fontSize: '12px' }} component="span" to="https://www.growingio.com">
                  如何定义一组页面？
                </Link>
              </Tooltip>
            }
          >
            <div className="feedback">
              <Alert size="small" showIcon type="error" message="xxxxx" />
            </div>
            {deviceInfo && (
              <Form.Item name="belongApp" label="所属应用">
                <Input placeholder="所属应用包名" disabled />
              </Form.Item>
            )}
            {isNative && (
              <Form.Item name="path" label="路径">
                <Input disabled maxLength={MAX_VALUE_LENGTH} />
              </Form.Item>
            )}
            {!isNative && (
              <>
                <Form.Item name="domain" label="域名">
                  <Input placeholder="请输入域名" maxLength={MAX_VALUE_LENGTH} />
                </Form.Item>

                <Form.Item name="path" label="路径">
                  <PathInput placeholder="请输入域名" maxLength={MAX_VALUE_LENGTH} />
                </Form.Item>
                <Form.Item label="路径">
                  <div className="query-input">
                    <QueryInput maxLength={MAX_VALUE_LENGTH} />
                  </div>
                </Form.Item>
              </>
            )}
            <Form.Item name="data" label="数据">
              <div className="data-chart-wrap" />
            </Form.Item>
          </FormItemGroup>
          <Form.Item>
            <div className="footer-submitter"> {submitterNode}</div>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default React.forwardRef(PageViewEventForm);

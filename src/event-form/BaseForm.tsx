import React, { useState, useRef } from 'react';
import { Form } from '@gio-design/components';
import { FormInstance, FormProps } from '@gio-design/components/es/components/form';
import usePrefixCls from '@gio-design/components/es/utils/hooks/use-prefix-cls';
import { ButtonProps } from '@gio-design/components/es/components/button';
import type { SubmitterProps } from './components/Submitter';
import Submitter from './components/Submitter';
import { CommonFormProps } from './interfaces';

export type BaseFormProps = {
  contentRender?: (
    items: React.ReactNode[],
    submitter: React.ReactElement<SubmitterProps> | undefined,
    form: FormInstance<any>
  ) => React.ReactNode;
} & Omit<FormProps, 'onFinish'> &
  CommonFormProps;

const BaseForm: React.FC<BaseFormProps> = (props) => {
  const { contentRender, children, submitter, form: userForm, ...rest } = props;

  const [form] = Form.useForm();
  const formRef = useRef<FormInstance>(userForm || form);

  const items = React.Children.toArray(children);
  const submitterProps: SubmitterProps = typeof submitter === 'boolean' || !submitter ? {} : submitter;
  const [loading, setLoading] = useState<ButtonProps['loading']>(false);
  /** 渲染提交按钮与重置按钮 */
  const submitterNode =
    submitter === false ? undefined : (
      <Submitter
        key="submitter"
        {...submitterProps}
        form={userForm || form}
        submitButtonProps={{
          loading,
          ...submitterProps.submitButtonProps,
        }}
      />
    );

  const content = contentRender ? contentRender(items, submitterNode, formRef.current) : items;
  const prefixCls = usePrefixCls('event-form');
  return (
    <Form
      className={`${prefixCls}`}
      onKeyPress={(event) => {
        if (event.key === 'Enter') {
          formRef.current?.submit();
        }
      }}
      form={userForm || form}
      {...rest}
      onFinish={async (values) => {
        if (!rest.onFinish) {
          return;
        }
        setLoading(true);
        await rest.onFinish(values as Record<string, any>);
        setLoading(false);
      }}
    >
      {content}
    </Form>
  );
};

export default BaseForm;

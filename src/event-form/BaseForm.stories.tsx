/* eslint-disable no-console */
import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import { Form, Input } from '@gio-design/components';
// import './eventform-style.less';
import Docs from './EventForm.mdx';
import BaseForm, { BaseFormProps } from './BaseForm';

export default {
  title: 'Business Components/EventForm/BaseForm',
  component: BaseForm,
  parameters: {
    docs: {
      page: Docs,
    },
  },
} as Meta;
const Template: Story<BaseFormProps> = (args) => (
  <div
    style={{
      width: '460px',
      boxShadow: '0px 0px 2px 1px rgba(0, 0, 0, 0.1)',
      height: '600px',
      position: 'relative',
      padding: '20px',
    }}
  >
    <h3>BaseForm</h3>
    <BaseForm
      {...args}
      initialValues={{ name: 'username' }}
      contentRender={(items, submitter) => (
        <>
          {items}
          {submitter}
        </>
      )}
    >
      <Form.Item name="name" label="名称">
        <Input placeholder="请输入名称" />
      </Form.Item>
    </BaseForm>
  </div>
);
export const Default = Template.bind({});
Default.args = {
  onFinish: (value: any) => {
    console.log(value);
  },
};

/* eslint-disable no-console */
import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import { Button } from '@gio-design/components';
import PageViewEventForm from './PageViewEventForm';
import { PageViewEventFormProps } from './interfaces';
import FooterToolbar from './components/FooterToolbar';

export default {
  title: 'Business Components/EventForm/PageViewEventForm',
  component: PageViewEventForm,
} as Meta;

const Template: Story<PageViewEventFormProps> = (args) => (
  <div style={{ width: '440px', padding: '16px', boxShadow: '0px 0px 2px 1px rgba(0, 0, 0, 0.1)' }}>
    <PageViewEventForm {...args} />
  </div>
);

export const Default = Template.bind({});
Default.args = {
  onFinish: async (values: any) => {
    return console.log(values);
  },
};

const TemplateCustomSubmitter: Story<PageViewEventFormProps> = (args) => (
  <div style={{ width: '440px', padding: '16px', boxShadow: '0px 0px 2px 1px rgba(0, 0, 0, 0.1)' }}>
    <PageViewEventForm
      style={{ marginBottom: '100px' }}
      submitter={{
        submitText: '保存',
        resetText: '取消',
        render: (_, dom) => (
          <FooterToolbar extra={<Button onClick={() => console.log('pre clicked')}>上一步</Button>}>
            {dom}
          </FooterToolbar>
        ),
      }}
      {...args}
    />
  </div>
);
export const CustomSubmitter = TemplateCustomSubmitter.bind({});
TemplateCustomSubmitter.args = {
  onFinish: async (values) => console.log(values),
};

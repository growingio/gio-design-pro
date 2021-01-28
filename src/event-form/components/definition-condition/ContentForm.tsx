import React, { useState } from 'react';
import { Modal, Form, Input, Radio } from '@gio-design/components';
import '@gio-design/components/es/components/modal/style/index';

interface ContentFormProps {
  visible: boolean;
  onCreate: (values: any) => void;
  onCancel: () => void;
  ininitialValues: { [K: string]: any };
}

const ContentForm: React.FC<ContentFormProps> = ({ visible, onCreate, onCancel, ininitialValues }) => {
  const [form] = Form.useForm();
  const [currentValue, setCurrentValue] = useState(ininitialValues || {});
  function handleValueChange(_: any, allValues: React.SetStateAction<{ [K: string]: any }>) {
    setCurrentValue(allValues);
  }
  return (
    <Modal
      visible={visible}
      title="编辑元素内容"
      okText="保存"
      closeText="取消"
      destroyOnClose
      afterClose={() => {
        form.resetFields();
      }}
      onClose={onCancel}
      onOk={() => {
        form.validateFields().then((values) => {
          form.resetFields();
          onCreate(values);
        });
      }}
    >
      <Form
        requiredMark
        form={form}
        layout="vertical"
        name="form_in_modal"
        initialValues={ininitialValues}
        onValuesChange={handleValueChange}
      >
        <Form.Item
          name="content"
          label={<span>{currentValue.contentType !== '=' ? '元素内容包含' : '元素内容为'}</span>}
          rules={[{ required: true, message: '元素内容不能为空', whitespace: true }]}
        >
          <Input placeholder="请填写元素内容" />
        </Form.Item>
        <Form.Item name="contentType" label="按内容">
          <Radio.Group>
            <Radio value="=">精准匹配</Radio>
            <Radio value="match_phrase">模糊匹配</Radio>
          </Radio.Group>
        </Form.Item>
      </Form>
    </Modal>
  );
};
export default ContentForm;

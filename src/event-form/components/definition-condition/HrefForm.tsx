import React from 'react';
import { Modal, Form, Input } from '@gio-design/components';
import '@gio-design/components/es/components/modal/style/index';

interface CopntentFormProps {
  visible: boolean;
  onCreate: (values: any) => void;
  onCancel: () => void;
  ininitialValues: { [K: string]: any };
}

const CopntentForm: React.FC<CopntentFormProps> = ({ visible, onCreate, onCancel, ininitialValues }) => {
  const [form] = Form.useForm();
  // const [currentValue, setCurrentValue] = useState(ininitialValues || {});
  // function handleValueChange(value, allValues) {
  //   setCurrentValue(allValues);
  // }
  return (
    <Modal
      visible={visible}
      title="编辑跳转链接"
      okText="保存"
      closeText="取消"
      destroyOnClose
      // onOk={() => {
      //   console.log(form.getFieldsValue());
      //   setVisible(false);
      // }}
      // onClose={() => {
      //   setVisible(false);
      // }}
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
      <Form form={form} layout="vertical" name="form_in_modal" initialValues={ininitialValues}>
        <Form.Item name="href" label="跳转链接为" rules={[{ required: true, message: '跳转链接不能为空' }]}>
          <Input.TextArea placeholder="请填写跳转链接" rows={3} wrapStyle={{ width: '100%', height: 'unset' }} />
        </Form.Item>
      </Form>
    </Modal>
  );
};
export default CopntentForm;

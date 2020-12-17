import { Form, Input, Button } from '@gio-design/components';
import { PlusOutlined } from '@gio-design/icons';
import React from 'react';

const QSInput = () => {
  return (
    <Form.List name="query">
      {(fields, { add, remove }) => (
        <>
          {fields.map((field) => (
            <div
              key={`query_${field.key}`}
              style={{ display: 'inline-flex', alignItems: 'flex-start', marginBottom: '8px' }}
            >
              <Form.Item
                className="query_filed"
                labelWidth={0}
                {...field}
                name={[field.name, 'key']}
                fieldKey={[field.fieldKey, 'key']}
                rules={[{ required: true, message: '参数不能为空' }]}
              >
                <Input placeholder="请输入参数" />
              </Form.Item>
              <div style={{ padding: '8px' }}>=</div>
              <Form.Item
                className="query_filed"
                labelWidth={0}
                {...field}
                name={[field.name, 'value']}
                fieldKey={[field.fieldKey, 'value']}
                rules={[{ required: true, message: '参数值不能为空' }]}
              >
                <Input placeholder="请输入参数值" />
              </Form.Item>
              <PlusOutlined style={{ transform: 'rotate(45deg)', padding: '8px' }} onClick={() => remove(field.name)} />
            </div>
          ))}
          <Form.Item labelWidth={0}>
            <Button type="text" onClick={() => add()}>
              添加查询条件
            </Button>
          </Form.Item>
        </>
      )}
    </Form.List>
  );
};

export default QSInput;

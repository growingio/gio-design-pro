/* eslint-disable react/no-array-index-key */
import { Form, Input, Button } from '@gio-design/components';
import { PlusOutlined } from '@gio-design/icons';
import React, { useEffect, useState } from 'react';
import { Kv } from '../utils';

interface Props {
  value?: Kv[];
  onChange?: (value: Kv) => void;
}

const QSInput = (props: Props) => {
  const { value } = props;
  const [querySet, setQuerySet] = useState<Kv[]>(value);
  useEffect(() => {
    setQuerySet(value);
  }, [value]);

  const validateRules = {
    queryKey: [
      { required: true, message: '参数不能为空' },
      { pattern: /^((?!\*).)*$/, message: '参数不支持通配' },
      {
        validateTrigger: 'onBlur',
        validator: async (_: any, v: string) => {
          if (v) {
            const kv = querySet?.filter((q) => q?.key === v);
            if (kv && kv.length > 1) {
              return Promise.reject(new Error('参数不能重复'));
            }
          }
          return Promise.resolve(true);
        },
      },
    ],
    queryValue: [{ required: true, message: '参数值不能为空' }],
  };

  return (
    <Form.List name="query">
      {(fields, { add, remove }) => (
        <>
          {fields.map((field) => (
            <div
              className="query-filed-wrap"
              key={`query_${field.key}`}
              style={{ display: 'flex', flex: 1, alignItems: 'flex-start', marginBottom: '8px' }}
            >
              <Form.Item
                className="query__filed"
                labelWidth={0}
                {...field}
                key={`key${field.key}`}
                name={[field.name, 'key']}
                fieldKey={[field.key, `key`]}
                validateTrigger={['onChange', 'onBlur']}
                rules={validateRules.queryKey}
              >
                <Input placeholder="请输入参数" />
              </Form.Item>
              <div style={{ padding: '8px' }}>=</div>
              <Form.Item
                className="query__filed"
                labelWidth={0}
                {...field}
                key={`value${field.key}`}
                name={[field.name, 'value']}
                fieldKey={[field.key, `value`]}
                validateTrigger={['onChange', 'onBlur']}
                rules={validateRules.queryValue}
              >
                <Input placeholder="请输入参数值" />
              </Form.Item>
              <div>
                <PlusOutlined
                  style={{ transform: 'rotate(45deg)', padding: '8px', cursor: 'pointer' }}
                  onClick={() => remove(field.name)}
                />
              </div>
            </div>
          ))}
          <Form.Item labelWidth={0} className="query-input-add-filed">
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

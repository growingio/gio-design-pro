import React, { useEffect, useState } from 'react';
import { DeleteOutlined } from '@gio-design/icons';
import { Button } from '@gio-design/components';
import PropertyPicker from '../../../../property-selector';
import '../../../../property-selector/style/index';
import FilterCondition from './FilterCondition';
import './index.less';
import { attributeValue, FilterValueType, StringValue, NumberValue, DateValue } from '../../../interfaces';

interface ExpressionProps {
  index?: number;
  filterItem: FilterValueType;
  deleteFilterItem: (index: number) => void;
  dimensionValueRequest?: (data: any) => Promise<any>;
  timeRange: string;
  measurements: any[];
  onChange: (expression: FilterValueType, index: number) => void;
  propertyOptions: any[];
  exprs: any[];
  recentlyStorePrefix: string;
}
function Expression(props: ExpressionProps) {
  const {
    index = 0,
    filterItem,
    deleteFilterItem,
    dimensionValueRequest,
    timeRange,
    measurements,
    onChange,
    propertyOptions,
    exprs,
    recentlyStorePrefix,
  } = props;
  const [valueType, setValueType] = useState<attributeValue>(filterItem?.valueType || 'string');
  const [values, setValues] = useState<string[]>(filterItem?.values);
  const [exprKey, setExprKey] = useState<string>(filterItem?.key || '');
  const [exprName, setExprName] = useState<string>(filterItem?.name || '');
  const [op, setOp] = useState<StringValue | NumberValue | DateValue>(filterItem?.op);
  const [subFilterItem, setSubFilterItem] = useState<FilterValueType>(filterItem);
  const submit = (v: FilterValueType) => {
    const expr: FilterValueType = {
      key: exprKey,
      name: exprName,
      valueType,
      ...v,
    };
    v && setValues(v.values);
    v && setOp(v.op);
    setSubFilterItem(expr);
    onChange(expr, index);
  };

  useEffect(() => {
    setSubFilterItem(filterItem);
  }, [filterItem]);

  const cancel = () => {
    onChange(subFilterItem, index);
  };

  const changePropertyPicker = (v: any) => {
    v && setValueType(v?.valueType || 'string');
    v && setExprName(v.label);
    v && setExprKey(v.value);
    v && setValues([]);
    v && setOp('=');
    const expr: FilterValueType = {
      key: v.value,
      name: v.label,
      valueType: v?.valueType || 'string',
      op: '=',
      values: [],
    };
    onChange(expr, index);
  };

  return (
    <div className="expression-box" id="expression-box">
      <div className="express-regular_select">
        <div className="expression-icon">{index + 1}</div>
        <PropertyPicker
          data-testid="propertySelect"
          placeholder="选择属性"
          value={exprKey ? { value: exprKey, label: exprName, id: exprKey } : undefined}
          dataSource={propertyOptions.filter((option: any) => {
            const inavailableOptions = exprs ? exprs.map((expr: any) => expr.key) : [];
            return option.id === exprKey || inavailableOptions.indexOf(option.id) === -1; // && !(/like/.test(operator) && option.id === 'cs1'）saas老逻辑，暂时不需要
          })}
          onChange={changePropertyPicker}
          recentlyStorePrefix={recentlyStorePrefix}
        />

        <FilterCondition
          valueType={valueType}
          onSubmit={submit}
          op={op}
          dimensionValueRequest={dimensionValueRequest}
          timeRange={timeRange}
          measurements={measurements}
          values={values}
          exprKey={exprKey}
          onCancel={cancel}
        />
      </div>
      <Button type="assist" icon={<DeleteOutlined />} size="middle" onClick={() => deleteFilterItem(index)} />
    </div>
  );
}

export default Expression;
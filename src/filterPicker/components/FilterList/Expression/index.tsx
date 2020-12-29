import React, { useState } from 'react';
import { DeleteOutlined } from '@gio-design/icons';
import { Button } from '@gio-design-new/components';
import PropertyPicker from '../../../../property-picker';
import '../../../../property-picker/style/index';
import FilterCondition from './FilterCondition';
import './index.less';
import { attributeValue, FilterValueType } from '../../../interfaces';

interface ExpressionProps {
  index?: number;
  filterLength?: number;
  filterItem: FilterValueType;
  deleteFilterItem: (index: number) => void;
  dimensionValueRequest?: (data: any) => Promise<any>;
  timeRange: string;
  measurements: any[];
  onChange: (expression: FilterValueType, index: number) => void;
  propertyOptions: any[];
  exprs: any[];
}
function Expression(props: ExpressionProps) {
  const {
    index = 0,
    filterLength,
    filterItem,
    deleteFilterItem,
    dimensionValueRequest,
    timeRange,
    measurements,
    onChange,
    propertyOptions,
    exprs,
  } = props;
  const [valueType, setValueType] = useState<attributeValue>(filterItem.valueType);
  const [exprKey, setExprKey] = useState<string>(filterItem?.key);
  const [exprName, setExprName] = useState<string>(filterItem?.name);
  const submit = (v: FilterValueType) => {
    const expr: FilterValueType = {
      key: exprKey,
      name: exprName,
      valueType,
      ...v,
    };
    onChange(expr, index);
  };

  // const mockAttrChange = () => {
  //   setValueType('string');
  // };

  const changePropertyPicker = (v: any) => {
    v && setValueType(v.valueType || 'string');
    v && setExprName(v.label);
    v && setExprKey(v.value);
    const expr: FilterValueType = {
      key: v.value,
      name: v.label,
      valueType: v.valueType || 'string',
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
          initialValue={{ value: exprKey, label: exprName }}
          dataSource={propertyOptions.filter((option: any) => {
            const inavailableOptions = exprs ? exprs.map((expr: any) => expr.key) : [];
            return option.id === exprKey || inavailableOptions.indexOf(option.id) === -1; // && !(/like/.test(operator) && option.id === 'cs1'）saas老逻辑，暂时不需要
          })}
          onChange={changePropertyPicker}
        />
        <FilterCondition
          valueType={valueType}
          onSubmit={submit}
          op={filterItem.op}
          dimensionValueRequest={dimensionValueRequest}
          timeRange={timeRange}
          measurements={measurements}
          values={filterItem.values}
          exprKey={exprKey}
        />
      </div>
      <Button
        type="assist"
        icon={<DeleteOutlined />}
        disabled={!filterLength || filterLength === 1}
        size="middle"
        onClick={() => deleteFilterItem(index)}
      />
    </div>
  );
}

export default Expression;

import React, { useState } from 'react';
import { DeleteOutlined } from '@gio-design/icons';
import { Button } from '@gio-design-new/components';
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
  } = props;
  const [valueType] = useState<attributeValue>(filterItem.valueType);

  const submit = (v: FilterValueType) => {
    const expr: FilterValueType = {
      key: 'd',
      name: '域名',
      valueType,
      ...v,
    };
    onChange(expr, index);
  };

  // const mockAttrChange = () => {
  //   setValueType('string');
  // };

  return (
    <div className="expression-box" id="expression-box">
      <div className="express-regular_select">
        <div className="expression-icon">{index + 1}</div>
        {/* <div className="mock-attribute-select" onClick={mockAttrChange} /> */}
        <FilterCondition
          valueType={valueType}
          onSubmit={submit}
          op={filterItem.op}
          dimensionValueRequest={dimensionValueRequest}
          timeRange={timeRange}
          measurements={measurements}
          values={filterItem.values}
        />
      </div>
      <Button
        type="assist"
        icon={<DeleteOutlined />}
        disabled={!filterLength || filterLength === 1}
        size="small"
        onClick={() => deleteFilterItem(index)}
      />
    </div>
  );
}

export default Expression;

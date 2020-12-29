import React, { useEffect, useState } from 'react';
import { Select, Checkbox } from '@gio-design-new/components';
import { titleMap, selectOptionMap, AttributeMap } from '../../../../filterMap';
import NumberAttrSelect from './components/NumberAttrSelect';
import DateAttrSelect from './components/DateAttrSelect';
import StringAttrSelect from './components/StringAttrSelect/index';
import Footer from '../../../Footer';
import './attrSelect.less';

import { attributeValue, StringValue, NumberValue, DateValue, FilterValueType } from './interfaces';

interface FilterAttrOverlayProps {
  valueType: attributeValue;
  onSubmit: (v: FilterValueType) => void;
  onCancel: () => void;
  op: StringValue | NumberValue | DateValue;
  curryDimensionValueRequest: (dimension: string, keyword: string) => Promise<any>;
  values: string[];
  exprKey: string;
}

function FilterAttrOverlay(props: FilterAttrOverlayProps) {
  const { valueType, onSubmit, onCancel, op, curryDimensionValueRequest, values, exprKey } = props;
  const [operationValue, setValue] = useState<StringValue | NumberValue | DateValue>(op);
  const [attrValue, setAttrValue] = useState<string[]>(values);

  const [checked, setChecked] = useState<boolean>(valueType === 'date' && (op === '>=' || op === '<='));

  useEffect(() => {
    if (valueType === 'date') {
      // 此处是为了处理，日期类型时，包含当天，选项('>=', '<=')不在selectOptionMap里面
      if (op === '>=') {
        setValue('>');
      } else if (op === '<=') {
        setValue('<');
      } else if (op === 'relativeTime') {
        // 相对现在和相对区间，传的参数都为relativeTime，需要转换成relativeCurrent（相对现在），relativeBetween（相对区间）
        const relativeTime = values[0].split(':')[1].split(',');
        if (relativeTime.length === 1 || relativeTime.includes('0')) {
          setValue('relativeCurrent');
        } else {
          setValue('relativeBetween');
        }
      }
    }
    if (values[0] === ' ') {
      setValue(op === '!=' ? 'hasValue' : 'noValue');
    }
  }, [op]);

  const handleChange = (e: any) => {
    setChecked(e.target.checked);
  };

  const selectChange = (v: StringValue | NumberValue | null) => {
    console.log(v, 'v=================');
    v && setValue(v);
    v && setAttrValue([]);
    v && setChecked(false);
  };

  const parseValue = (
    v: StringValue | NumberValue | DateValue,
    check: boolean
  ): StringValue | NumberValue | DateValue => {
    const includesMap: { [key: string]: DateValue } = {
      '>': '>=',
      '<': '<=',
    };
    if (v === 'hasValue') {
      return '!=';
    }
    if (v === 'noValue') {
      return '=';
    }
    if (check) {
      return includesMap[v];
    }
    if (v.includes('relative')) {
      return 'relativeTime';
    }
    return v;
  };

  const submit = () => {
    console.log(operationValue, 'operationValue');
    const filterValue: FilterValueType = {
      op: parseValue(operationValue, checked),
      values: operationValue !== 'hasValue' && operationValue !== 'noValue' ? attrValue : [' '],
    };
    console.log(filterValue, 'filterValue');
    onSubmit(filterValue);
  };

  const getAttrSelect = (attr: attributeValue, selectValue: string) => {
    switch (attr) {
      case AttributeMap.int:
        return <NumberAttrSelect attrSelect={selectValue} attrChange={setAttrValue} values={attrValue} />;
      case AttributeMap.date:
        return <DateAttrSelect attrSelect={selectValue} attrChange={setAttrValue} values={attrValue} />;
      case AttributeMap.string:
        return (
          <StringAttrSelect
            valueType={attr}
            attrSelect={selectValue}
            attrChange={setAttrValue}
            curryDimensionValueRequest={curryDimensionValueRequest}
            values={attrValue}
            exprKey={exprKey}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="filter-attr_select-box">
      <div>
        <div className="filter-attr_select-title">{titleMap[valueType]}</div>
        <Select
          options={selectOptionMap[valueType]}
          value={operationValue}
          size="middle"
          style={{ width: '100%', marginTop: '16px' }}
          placeholder="请选择"
          onChange={selectChange}
        />
        <div className="filter-attr_dividingLine" />
        {getAttrSelect(valueType, operationValue)}
        {valueType === AttributeMap.date && (operationValue === '>' || operationValue === '<') && (
          <Checkbox checked={checked} onChange={handleChange} style={{ marginTop: '16px' }}>
            包含当日
          </Checkbox>
        )}
      </div>
      <Footer onSubmit={submit} onCancel={onCancel} />
    </div>
  );
}

export default FilterAttrOverlay;

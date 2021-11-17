import React, { useEffect, useState } from 'react';
import { Select, Checkbox } from '@gio-design/components';
import { titleMap, enTitleMap, selectOptionMap, enSelectOptionMap, AttributeMap } from '../../../../filterMap';
import NumberAttrSelect from './components/NumberAttrSelect';
import DateAttrSelect from './components/DateAttrSelect';
import StringAttrSelect from './components/StringAttrSelect/index';
import Footer from '../../../Footer';
import './attrSelect.less';
import { attributeValue, StringValue, NumberValue, DateValue, FilterValueType } from './interfaces';
import { operationsOptionType } from '../../../../interfaces';

import en from '../../../../locals/en-US.json';
import cn from '../../../../locals/zh-CN.json';

interface FilterAttrOverlayProps {
  valueType: attributeValue;
  onSubmit: (v: FilterValueType) => void;
  onCancel: () => void;
  op: StringValue | NumberValue | DateValue;
  curryDimensionValueRequest: (dimension: string, keyword: string) => Promise<any> | undefined;
  values: string[];
  exprKey: string;
  operationsOption?: operationsOptionType;
  numType?: 'positivedecimal' | 'decimal';
}

function FilterAttrOverlay(props: FilterAttrOverlayProps) {
  const { valueType, onSubmit, onCancel, op, curryDimensionValueRequest, values, exprKey, operationsOption, numType } =
    props;
  const [operationValue, setOperationValue] = useState<StringValue | NumberValue | DateValue>(op);
  const [attrValue, setAttrValue] = useState<string[]>(values);
  const [checked, setChecked] = useState<boolean>(valueType === 'date' && (op === '>=' || op === '<='));

  useEffect(() => {
    if (valueType === 'date') {
      // 此处是为了处理，日期类型时，包含当天，选项('>=', '<=')不在selectOptionMap里面
      if (op === '>=') {
        setOperationValue('>');
      } else if (op === '<=') {
        setOperationValue('<');
      } else if (op === 'relativeTime') {
        // 相对现在和相对区间，传的参数都为relativeTime，需要转换成relativeCurrent（相对现在），relativeBetween（相对区间）
        const relativeTime = values?.[0].split(':')[1].split(',');
        if (relativeTime.length === 1 || relativeTime.includes('0')) {
          setOperationValue('relativeCurrent');
        } else {
          setOperationValue('relativeBetween');
        }
      }
    }
    if (values?.[0] === ' ') {
      setOperationValue(op === '!=' ? 'hasValue' : 'noValue');
    }
  }, [op, valueType]);

  // useEffect(() => {
  //   console.log(values, 'values-1');
  //   // setOperationValue(op);
  //   // setAttrValue(values);
  // }, [values, valueType, op]);

  const handleChange = (e: any) => {
    setChecked(e.target.checked);
  };

  const selectChange = (v: StringValue | NumberValue) => {
    v && setOperationValue(v);
    v && setAttrValue([]);
    v && setChecked(false);
  };

  // 解析操作字段
  // 有值(hasValue) => (!=)
  // 无值(noValue) => (=)

  // 在日期类型下，在某天之前，在某天之后，需要判断是否包含当日
  // 若包含当日在某天之前(<)=> (<=)
  // 若包含当日，在某天之后(>) => (>=)
  // 相对现在(relativeCurrent) => (relativeTime)
  // 相对区间(relativeBetween) => (relativeTime)
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
    const filterValue: FilterValueType = {
      op: parseValue(operationValue, checked),
      values: operationValue !== 'hasValue' && operationValue !== 'noValue' ? attrValue : [' '],
    };
    onSubmit(filterValue);
  };

  const cancel = () => {
    // setAttrValue([]);
    onSubmit({
      op: '=',
      values: [],
    });
    onCancel();
  };

  const getAttrSelect = (attr: attributeValue, selectValue: string) => {
    switch (attr) {
      case AttributeMap.date:
        // 日期类型
        return <DateAttrSelect attrSelect={selectValue} attrChange={setAttrValue} values={attrValue} />;
      case AttributeMap.string:
      case AttributeMap.STRING:
        return (
          // 字符串类型
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
        return (
          <NumberAttrSelect attrSelect={selectValue} attrChange={setAttrValue} values={attrValue} type={numType} />
        );
    }
  };

  const optionMap = window.localStorage.getItem('locale') === 'en-US' ? enSelectOptionMap : selectOptionMap;

  return (
    <div className="filter-attr_select-box">
      <div>
        <div className="filter-attr_select-title">
          {window.localStorage.getItem('locale') === 'en-US' ? enTitleMap[valueType] : titleMap[valueType] || 'String'}
        </div>
        <Select
          options={
            operationsOption
              ? optionMap?.[valueType]?.filter((opItem: any) => operationsOption?.[valueType].includes(opItem.value))
              : optionMap?.[valueType]
          }
          value={operationValue}
          size="middle"
          style={{ width: '100%', marginTop: '16px' }}
          placeholder={window.localStorage.getItem('locale') === 'en-US' ? en.select : cn.select}
          onChange={selectChange}
        />
        <div className="filter-attr_dividingLine" />
        {getAttrSelect(valueType, operationValue)}
        {valueType === AttributeMap.date && (operationValue === '>' || operationValue === '<') && (
          <Checkbox checked={checked} onChange={handleChange} style={{ marginTop: '16px' }}>
            {window.localStorage.getItem('locale') === 'en-US' ? en.includeToday : cn.includeToday}
          </Checkbox>
        )}
      </div>
      <Footer
        onSubmit={submit}
        onCancel={cancel}
        // 当values为空，同时不时无值，有值状态下，确认按钮disable
        comfirmStatus={operationValue !== 'hasValue' && operationValue !== 'noValue' && !attrValue.length}
      />
    </div>
  );
}

export default FilterAttrOverlay;

import React, { useEffect, useState } from 'react';
import { DeleteOutlined } from '@gio-design/icons';
import { Button } from '@gio-design/components';
import PropertyPicker from '../../../../property-picker';
import '../../../../property-picker/style/index';
// import PropertySelect from '@gio-core/components/property-select';
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
    v && setValueType(v?.valueType?.toLowerCase() || 'string');
    v && setExprName(v.label);
    v && setExprKey(v.value);
    v && setValues([]);
    v && setOp('=');
    const expr: FilterValueType = {
      key: v.value,
      name: v.label,
      valueType: v?.valueType?.toLowerCase() || 'string',
      op: '=',
      values: [],
    };
    onChange(expr, index);

    // 兼容旧版方法
    // v && setValueType(v?.valueType?.toLowerCase() || 'string');
    // v && setExprName(v.label);
    // v && setExprKey(v.key);
    // v && setValues([]);
    // v && setOp('=');
    // const expr: FilterValueType = {
    //   key: v.key,
    //   name: v.label,
    //   valueType: v?.valueType?.toLowerCase() || 'string',
    //   op: '=',
    //   values: [],
    // };
    // onChange(expr, index);
  };
  // 兼容旧版属性选择器方法
  // const getGroupIcon = () => (
  //   <span className="group-icon">
  //     {/* <Icon name={`gicon-${group}`} /> */}
  //     <TagOutlined />
  //   </span>
  // );
  // // 兼容旧版属性选择器;
  // const defaultStyle = {
  //   width: '180px',
  //   height: '40px',
  //   placeholder: '选择维度',
  //   disabled: false,
  // };

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
          recentlyStorePrefix={recentlyStorePrefix}
        />
        {/* <PropertySelect
          key="dimension-select"
          value={!exprKey || propertyOptions.some((d: any) => d.id === exprKey) ? exprKey : '无效维度'}
          options={propertyOptions.filter((option: any) => {
            const inavailableOptions = exprs ? exprs.map((expr: any) => expr.key) : [];
            return option.id === exprKey || inavailableOptions.indexOf(option.id) === -1; // && !(/like/.test(operator) && option.id === 'cs1'）saas老逻辑，暂时不需要
          })}
          grouped
          showSearch
          dropdownMatchSelectWidth={false}
          style={defaultStyle}
          dropdownStyle={{ width: '360px' }}
          placeholder="选择维度"
          onChange={changePropertyPicker}
          getGroupIcon={getGroupIcon}
          notFoundContent="没有可用维度"
          className="dimension-select dimension-select-dropdown"
        /> */}
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

import React, { useMemo, useState } from 'react';
import { DownFilled } from '@gio-design/icons';
import { Dropdown, Tooltip } from '@gio-design-new/components';
import moment from 'moment';

import FilterAttrOverlay from './FilterAttrOverlay';
import { attributeValue, FilterValueType, StringValue, NumberValue, DateValue } from './interfaces';
// import { selectValueMap } from '../../../../filterMap';

interface FilterConditionProps {
  valueType: attributeValue;
  onSubmit: (v: FilterValueType) => void;
  op: StringValue | NumberValue | DateValue;
  dimensionValueRequest?: (data: any) => Promise<any>;
  timeRange: string;
  measurements: any[];
  values: string[];
  exprKey: string;
}

const operationMap = {
  string: {
    '=': '等于',
    '!=': '不等于',
    in: '在,范围内',
    'not in': '不在,范围内',
    like: '包含',
    'not like': '不包含',
    hasValue: '有值',
    noValue: '无值',
  },
  int: {
    '=': '等于',
    '!=': '不等于',
    '>': '大于',
    '>=': '大于等于',
    '<': '小于',
    '<=': '小于等于',
    between: '在,与,之间',
    hasValue: '有值',
  },
  date: {
    '=': '等于',
    '!=': '不等于',
    '>': '在,天之后',
    '>=': '在,天之后包括当天',
    '<': '在,天之前',
    '<=': '在,天之前包括当天',
    between: '在,与,之间',
    relativeCurrent: '相对现在',
    relativeBetween: '相对区间',
    hasValue: '有值',
  },
};

function FilterCondition(props: FilterConditionProps) {
  const { valueType = 'string', onSubmit, op, dimensionValueRequest, timeRange, measurements, values, exprKey } = props;
  console.log(valueType, 'valueTYpe');
  const [visible, setVisible] = useState(false);
  const parseValuesToText = (type: string, operation: string, value: string[]): string => {
    console.log('string');
    const opMap = operationMap[type];
    if (value.length) {
      if (type === 'string') {
        switch (operation) {
          case '=': {
            if (value[0] === ' ') {
              return '无值';
            }
            return opMap[operation] + value[0];
          }
          case '!=': {
            if (value[0] === ' ') {
              return '有值';
            }
            return opMap[operation] + value[0];
          }

          case 'in':
          case 'not in': {
            const textList = opMap[operation].split(',');
            return textList[0] + value.join(',') + textList[1];
          }
          default:
            return opMap[operation] + value[0];
        }
      }
      if (type === 'int') {
        switch (operation) {
          case '!=': {
            if (value[0] === ' ') {
              return '有值';
            }
            return opMap[operation] + value[0];
          }
          case 'between': {
            const textList = opMap[operation].split(',');
            return textList[0] + value[0] + textList[1] + value[1] + textList[2];
          }
          default:
            return opMap[operation] + value[0];
        }
      }
      if (type === 'date') {
        switch (operation) {
          case '!=': {
            if (value[0] === ' ') {
              return '有值';
            }
            return opMap[operation] + moment(value[0]).format('YYYY-MM-DD');
          }
          case '>':
          case '>=':
          case '<':
          case '<=': {
            const textList = opMap[operation].split(',');
            return textList[0] + moment(value[0]).format('YYYY-MM-DD') + textList[1];
          }
          case 'between': {
            const textList = opMap[operation].split(',');
            const abs = value[0].split(':')[1].split(',');
            console.log(abs, 'abs');
            console.log(moment(parseInt(abs[0], 10)).valueOf(), new Date(abs[0]), 'formatTime');
            return (
              textList[0] +
              moment(parseInt(abs[0], 10)).format('YYYY-MM-DD') +
              textList[1] +
              moment(parseInt(abs[1], 10)).format('YYYY-MM-DD') +
              textList[2]
            );
          }
          case 'relativeTime': {
            const relativeTime = value[0]
              .split(':')[1]
              .split(',')
              .map((ele: string) => parseInt(ele, 10));
            if (relativeTime.length === 1) {
              const day = relativeTime[0];
              if (day < 0) {
                return `过去${Math.abs(day)}天前`;
              }
              return `未来${Math.abs(day)}天后`;
            }
            if (relativeTime.includes(0)) {
              if (relativeTime[0]) {
                if (relativeTime[0] < 0) {
                  return `过去${Math.abs(relativeTime[0])}天内`;
                }
                return `未来${Math.abs(relativeTime[0])}天内`;
              }
              if (relativeTime[1] < 0) {
                return `过去${Math.abs(relativeTime[1])}天内`;
              }
              return `未来${Math.abs(relativeTime[1])}天内`;
            }
            if (relativeTime[0] < 0) {
              return `过去${Math.abs(relativeTime[0])}-${Math.abs(relativeTime[1])}天内`;
            }
            return `未来${Math.abs(relativeTime[0])}-${Math.abs(relativeTime[1])}天内`;
          }
          default:
            return opMap[operation] + moment(value[0]).format('YYYY-MM-DD');
        }
      }
    }
    return '选择过滤条件';
  };
  const conditionText = useMemo<string>(() => parseValuesToText(valueType, op, values), [valueType, op, values]);
  const visibleChange = (v: boolean) => {
    setVisible(v);
  };
  const curryDimensionValueRequest = ((timeRangeValue: string, measurementsValue: any[]) => {
    return (dimension: string, keyword: string) => {
      return dimensionValueRequest({ dimension, timeRange: timeRangeValue, metrics: measurementsValue, keyword });
    };
  })(timeRange, measurements);

  // const parseFilterValueToConditionText = (v: filterValueType): string => {
  //   return `${selectValueMap[attribute][v.op]} ${v.values[0]}`;
  // };
  const submit = (v: FilterValueType) => {
    setVisible(false);
    // setConditionText(parseFilterValueToConditionText(v));
    onSubmit(v);
  };
  const cancel = () => {
    setVisible(false);
  };
  return (
    valueType && (
      <Dropdown
        visible={visible}
        trigger={['click']}
        onVisibleChange={visibleChange}
        overlay={
          <FilterAttrOverlay
            valueType={valueType}
            onSubmit={submit}
            onCancel={cancel}
            op={op}
            curryDimensionValueRequest={curryDimensionValueRequest}
            values={values}
            exprKey={exprKey}
          />
        }
        placement="bottomRight"
        getTooltipContainer={() => document.getElementById('expression-box')}
        destroyTooltipOnHide
      >
        <span className="filter-condition_select">
          <Tooltip title={conditionText} disabled={conditionText === '选择过滤条件'} placement="topLeft">
            <span className="filter-condition_select-text">{conditionText}</span>
          </Tooltip>
          <DownFilled
            size="14px"
            style={{
              transform: visible && 'rotate(0.5turn)',
              position: 'absolute',
              right: '4px',
              top: '10px',
            }}
          />
        </span>
      </Dropdown>
    )
  );
}
export default FilterCondition;

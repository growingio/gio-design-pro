import React, { useEffect, useRef, useState, useMemo } from 'react';
import { isArray } from 'lodash';
import { Tooltip, usePrefixCls } from '@gio-design/components';
import classNames from 'classnames';
import { EventSelectorProps } from './interfaces';
import Selector from '../selector';
import { EventData } from '../event-picker/interfaces';
import { withSelectKey } from '../event-picker/helper';
import { EventPicker } from '../event-picker';
import './style';

const EventSelector = ({
  borderless = false,
  size,
  disabled,
  placeholder = '请选择',
  dropdownVisible,
  onDropdownVisibleChange,
  className,
  value: initialValue = [],
  dataSource,
  onSelect,
  onChange,
  getContainer,
  overlayClassName,
  ...pickerRestProps
}: EventSelectorProps) => {
  const [dropdownVisibleInner, setDropdownVisibleInner] = useState(dropdownVisible);
  const formatValue = (source: EventData[] | EventData) => {
    const arr = isArray(source) ? source : [source];
    return withSelectKey(arr);
  };
  // const formatedValue = formatValue(initialValue);
  const [value, setValue] = useState<EventData[]>(formatValue(initialValue));
  // const [currentValue, setCurrentValue] = useState<Event | undefined>(value);
  const [shouldUpdate, updatePicker] = useState(true);
  useEffect(() => {
    setTimeout(() => updatePicker(dropdownVisibleInner), 1);
  }, [dropdownVisibleInner]);
  const inputValueText = useMemo(() => (value || []).map((v) => v.name).join(','), [value]);
  const [textOverflow, setTextOverflow] = useState(false);
  const inputValueRef = useRef<HTMLSpanElement | null>(null);
  useEffect(() => {
    if (!inputValueRef?.current || !inputValueText) return;
    const scrollWidth = inputValueRef?.current?.scrollWidth || 0;
    const clientWidth = inputValueRef?.current?.clientWidth || 0;
    const isOverflow = scrollWidth > clientWidth;
    setTextOverflow(isOverflow);
  }, [inputValueRef, inputValueText]);

  const clsPrifx = usePrefixCls('event-selector');
  const selectorCls = classNames(clsPrifx, className);
  function handleDropDownVisibleChange(show: boolean) {
    onDropdownVisibleChange?.(show);
    setDropdownVisibleInner(show);
  }
  const handleValueChange: EventSelectorProps['onChange'] = (newValue, oldValue) => {
    onChange?.(newValue, oldValue);
  };
  const handleSelect: EventSelectorProps['onSelect'] = (item) => {
    setValue(formatValue(item));
    onSelect?.(item);
    setDropdownVisibleInner(false);
  };
  const handleCancel = () => {
    setDropdownVisibleInner(false);
    pickerRestProps.onCancel?.();
  };
  const dropdownRender = () => (
    <EventPicker
      className={`${clsPrifx}-dropdown`}
      {...pickerRestProps}
      shouldUpdate={shouldUpdate}
      value={value}
      dataSource={dataSource}
      onChange={handleValueChange}
      onSelect={handleSelect}
      onCancel={handleCancel}
    />
  );
  const inputRender = () =>
    inputValueText && (
      <Tooltip disabled={!textOverflow} title={<div className={`${clsPrifx}-input-tooltip`}>{inputValueText}</div>}>
        <span className="inner-input-wrap" ref={inputValueRef}>
          <span>{inputValueText}</span>
        </span>
      </Tooltip>
    );
  return (
    <>
      <Selector
        size={size}
        className={selectorCls}
        borderless={borderless}
        disabled={disabled}
        placeholder={placeholder}
        dropdownVisible={dropdownVisibleInner}
        dropdownRender={dropdownRender}
        onDropdownVisibleChange={handleDropDownVisibleChange}
        valueRender={inputRender}
        getContainer={getContainer}
        overlayClassName={overlayClassName}
      />
    </>
  );
};

export default EventSelector;

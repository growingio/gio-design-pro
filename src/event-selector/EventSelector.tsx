import React, { useEffect, useRef, useState } from 'react';
import { isArray } from 'lodash';
import { Tooltip, usePrefixCls } from '@gio-design/components';
import classNames from 'classnames';
import { EventSelectorProps } from './interfaces';
import Selector from '../selector';
import { EventData } from '../event-picker/interfaces';
import { withSelectKey } from '../event-picker/helper';
import { EventPicker } from '../event-picker';
import TypeIcon from '../event-picker/TypeIcon';
import './style';

const formatValue = (source: EventData[] | EventData) => {
  const arr = isArray(source) ? source : [source];
  return withSelectKey(arr);
};

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
  showValueIcon = false,
  pickerPlaceholder,
  ...pickerRestProps
}: EventSelectorProps) => {
  const [dropdownVisibleInner, setDropdownVisibleInner] = useState(dropdownVisible);

  const [value, setValue] = useState<EventData[]>(formatValue(initialValue));
  const [afterVisible, setVisible] = useState(true);
  const inputValueRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    setTimeout(() => setVisible(dropdownVisibleInner || false), 0);
  }, [dropdownVisibleInner]);

  useEffect(() => {
    setValue(formatValue(initialValue));
  }, [initialValue]);

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
      shouldUpdate={afterVisible}
      value={value}
      dataSource={dataSource}
      onChange={handleValueChange}
      onSelect={handleSelect}
      onCancel={handleCancel}
      placeholder={pickerPlaceholder}
    />
  );
  const getIcon =
    pickerRestProps.getTypeIcon || ((type: string) => <TypeIcon style={{ marginRight: '8px' }} type={type} />);
  const typeIcon = showValueIcon ? getIcon(value[0]?.type ?? '', value[0]) : null;
  const inputRender = () => {
    const inputValueText = (value || []).map((v) => v.name).join(',');
    let isOverflow = false;
    if (inputValueRef?.current && inputValueText) {
      const scrollWidth = inputValueRef?.current?.scrollWidth || 0;
      const clientWidth = inputValueRef?.current?.clientWidth || 0;
      isOverflow = scrollWidth > clientWidth;
    }

    return (
      inputValueText && (
        <Tooltip disabled={!isOverflow} title={<div className={`${clsPrifx}-input-tooltip`}>{inputValueText}</div>}>
          <span className="inner-input-wrap" ref={inputValueRef}>
            {!pickerRestProps.multiple && typeIcon}
            <span>{inputValueText}</span>
          </span>
        </Tooltip>
      )
    );
  };
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

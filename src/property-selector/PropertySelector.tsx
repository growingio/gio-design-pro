import React, { useRef, useState, useEffect } from 'react';
import { Tooltip, usePrefixCls } from '@gio-design/components';
import classNames from 'classnames';
import PropertyPicker from './PropertyPicker';
import { PropertyValue, PropertySelectorProps } from './interfaces';
import Selector from '../selector';
import './style';
import IconRender from './PropertyValueIconRender';

const PropertySelector: React.FC<PropertySelectorProps> = (props) => {
  const {
    borderless = true,
    disabled,
    placeholder = '选择属性',
    dropdownVisible,
    onDropdownVisibleChange,
    className,
    value,
    dataSource,
    onSelect,
    onChange,
    ...pickerRestProps
  } = props;
  const [dropdownVisibleInner, setDropdownVisibleInner] = useState(dropdownVisible);
  const [currentValue, setCurrentValue] = useState<PropertyValue | undefined>(value);
  const [textOverflow, setTextOverflow] = useState(false);
  const inputValueRef = useRef<HTMLSpanElement | null>(null);
  useEffect(() => {
    if (!inputValueRef?.current || !currentValue?.label) return;
    const scrollWidth = inputValueRef?.current?.scrollWidth || 0;
    const clientWidth = inputValueRef?.current?.clientWidth || 0;
    const isOverflow = scrollWidth > clientWidth;
    // console.log('valueinput[scrollWidth,clientWidth]', [scrollWidth, clientWidth]);
    setTextOverflow(isOverflow);
  }, [inputValueRef, currentValue]);

  const clsPrifx = usePrefixCls('property-selector');
  const selectorCls = classNames(clsPrifx, className);
  function handleDropDownVisibleChange(show: boolean) {
    onDropdownVisibleChange?.(show);
    setDropdownVisibleInner(show);
  }
  function handleValueChange(newValue: PropertyValue) {
    onChange?.(newValue);
  }
  function handleSelect(item: PropertyValue) {
    setCurrentValue(item);
    onSelect?.(item);
    setDropdownVisibleInner(false);
  }
  const dropdownRender = () => (
    <PropertyPicker
      className={`${clsPrifx}-dropdown`}
      {...pickerRestProps}
      value={currentValue}
      dataSource={dataSource}
      onChange={handleValueChange}
      onSelect={handleSelect}
    />
  );
  const inputRender = () =>
    currentValue && (
      <>
        <Tooltip title={currentValue?.label} disabled={!textOverflow} placement="top" arrowPointAtCenter>
          <span className="inner-input-wrap" ref={inputValueRef}>
            <span className="icon">{IconRender(currentValue?.groupId)}</span>
            <span>{currentValue?.label}</span>
          </span>
        </Tooltip>
      </>
    );
  return (
    <>
      <Selector
        className={selectorCls}
        borderless={borderless}
        disabled={disabled}
        placeholder={placeholder}
        dropdownVisible={dropdownVisibleInner}
        dropdownRender={dropdownRender}
        onDropdownVisibleChange={handleDropDownVisibleChange}
        valueRender={inputRender}
      />
    </>
  );
};
export default PropertySelector;

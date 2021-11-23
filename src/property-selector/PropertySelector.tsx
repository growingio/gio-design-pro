import React, { useRef, useState, useEffect, useMemo } from 'react';
import { Popover, usePrefixCls } from '@gio-design/components';
import classNames from 'classnames';
import { useLocale } from '@gio-design/utils';
import PropertyPicker from './PropertyPicker';
import { PropertyValue, PropertySelectorProps } from './interfaces';
import Selector from '../selector';
import './style';
// import '@gio-design/components/es/components/popover/style/index.css';
import IconRender from './PropertyValueIconRender';
import PropertyCard from './PropertyCard';
import { promisify } from './util';
import defaultLocale from './locales/zh-CN';

const PropertySelector: React.FC<PropertySelectorProps> = (props) => {
  const locale = useLocale('PropertyPicker');
  const { placeholderText } = { ...defaultLocale, ...locale } as any;
  const {
    borderless = true,
    size,
    disabled,
    placeholder = placeholderText,
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
  useEffect(() => {
    setCurrentValue(value);
  }, [value?.id]);
  const inputText = useMemo(() => currentValue?.name || currentValue?.label, [currentValue]);
  // const [textOverflow, setTextOverflow] = useState(false);
  const inputValueRef = useRef<HTMLSpanElement | null>(null);
  // useEffect(() => {
  //   if (!inputValueRef?.current || !currentValue?.label) return;
  //   const scrollWidth = inputValueRef?.current?.scrollWidth || 0;
  //   const clientWidth = inputValueRef?.current?.clientWidth || 0;
  //   const isOverflow = scrollWidth > clientWidth;
  //   setTextOverflow(isOverflow);
  // }, [inputValueRef, currentValue]);

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
      shouldUpdateRecentlyUsed={dropdownVisibleInner}
      value={currentValue}
      dataSource={dataSource}
      onChange={handleValueChange}
      onSelect={handleSelect}
    />
  );
  const fetchDetail = pickerRestProps.fetchDetailData ?? (async (data) => data);
  const inputRender = () => {
    const content = () => currentValue && <PropertyCard nodeData={currentValue} fetchData={promisify(fetchDetail)} />;
    return (
      currentValue && (
        <>
          <Popover
            overlayClassName="property-card-overlay"
            placement="bottomLeft"
            contentArea={content()}
            arrowPointAtCenter={false}
            destroyTooltipOnHide
          >
            <span className="inner-input-wrap" ref={inputValueRef}>
              <span className="icon">
                <IconRender group={currentValue?.isItem ? 'item' : currentValue?.groupId} />
              </span>
              <span>{inputText}</span>
            </span>
          </Popover>
        </>
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
      />
    </>
  );
};
export default PropertySelector;

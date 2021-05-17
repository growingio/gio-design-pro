import React from 'react';
import classnames from 'classnames';
import { Dropdown } from '@gio-design/components';
import { UpFilled, DownFilled } from '@gio-design/icons';
import useControlledState from '@gio-design/components/es/utils/hooks/useControlledState';
import usePrefixCls from '@gio-design/components/es/utils/hooks/use-prefix-cls';
import { useSize } from '@gio-design/utils/es/hooks';
import { SelectorProps } from './interfaces';

import './style';

function Selector({
  className,
  borderless = false,
  disabled = false,
  dropdownVisible,
  onDropdownVisibleChange,
  dropdownRender,
  style,
  valueRender,
  placeholder,
  overlayClassName,
  getContainer,
  size: customizeSize,
}: SelectorProps) {
  const prefixCls = usePrefixCls('selector');
  const size = customizeSize || useSize();
  const [visible, setVisible] = useControlledState(dropdownVisible, false);

  function handleVisibleChange(current: boolean) {
    setVisible(current);
    onDropdownVisibleChange?.(current);
  }

  const cls = classnames(
    prefixCls,
    `${prefixCls}--${size}`,
    {
      [`${prefixCls}--borderless`]: borderless,
      [`${prefixCls}--actived`]: visible,
    },
    className
  );

  const overlayCls = classnames(overlayClassName, `${prefixCls}-overlay-dropdown`);

  const item = valueRender();

  return (
    <Dropdown
      trigger={['click']}
      placement="bottomLeft"
      disabled={disabled}
      overlay={
        <div className={`${prefixCls}-dropdown`}>
          {typeof dropdownRender === 'function' ? dropdownRender() : dropdownRender}
        </div>
      }
      visible={visible}
      onVisibleChange={handleVisibleChange}
      overlayClassName={overlayCls}
      getContainer={getContainer}
    >
      <div className={cls} style={style}>
        {!item && <span className={`${prefixCls}__placeholder`}>{placeholder}</span>}
        {item && <span className={`${prefixCls}__item`}>{item}</span>}
        {visible ? (
          <UpFilled size="14px" className={`${prefixCls}__arrow`} />
        ) : (
          <DownFilled size="14px" className={`${prefixCls}__arrow`} />
        )}
      </div>
    </Dropdown>
  );
}

export default Selector;

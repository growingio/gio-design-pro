import React, { useState, useEffect } from 'react';
import classnames from 'classnames';
import { Checkbox, Tag } from '@gio-design/components';
// import { useControlledState } from '@gio-design/utils';
import { ListItemProps } from './interfaces';
import { rootPrefixCls } from './utils';

interface ItemMultifunctionProps {
  size: string;
  allSelected: boolean;
  multiple: boolean;
  values?: string[];
  onChangeSingle?: (v?: string) => void;
  onChangeMulti?: (v?: string) => void;
}

const ItemMultifunction = (props: ListItemProps & ItemMultifunctionProps) => {
  const {
    size = 'small',
    children,
    id,
    descrition,
    prefix,
    multiple = false,
    className,
    disabled,
    ellipsis = true,
    tagInfo,
    allSelected,
    values,
    onClick,
    onChangeMulti,
    onChangeSingle,
  } = props;
  const [selectStatus, setSelectStatus] = useState<boolean>(false);

  useEffect(() => {
    setSelectStatus(allSelected || values?.includes(id));
  }, [allSelected, values]);

  const prefixCls = `${rootPrefixCls()}__item-multifunction`;
  const cls = classnames(
    prefixCls,
    {
      [`${prefixCls}--disabled`]: disabled,
      [`${prefixCls}-selected`]: selectStatus && !disabled,
    },
    className
  );

  const multiChange = (e: any) => {
    const checked = e?.target?.checked;
    setSelectStatus(checked);
    onChangeMulti?.(id);
  };

  const itemClick = (e: any) => {
    const domClass = e.target.getAttribute('class');
    if (!disabled && domClass !== 'gio-checkbox-input') {
      if (multiple) {
        setSelectStatus(!selectStatus);
        onChangeMulti?.(id);
      } else {
        onChangeSingle?.(id);
      }
      onClick?.(e);
    }
  };

  return (
    <div className={cls} onClick={itemClick} aria-hidden="true">
      {multiple && (
        <div
          className={classnames(`${prefixCls}--mutiple`, {
            [`${prefixCls}--mutiple_normal`]: !disabled,
          })}
        >
          <Checkbox disabled={disabled} onClick={multiChange} checked={selectStatus && !disabled} />
        </div>
      )}
      <div
        className={classnames(`${prefixCls}--content`, {
          [`${prefixCls}--content_multiple`]: multiple,
          [`${prefixCls}--content_tag`]: tagInfo,
        })}
      >
        {prefix && <div className={`${prefixCls}--avator`}>{prefix}</div>}
        <div
          className={classnames(`${prefixCls}--content_inner`, {
            [`${prefixCls}--content_inner_descrition`]: descrition,
          })}
        >
          <div
            className={classnames(`${prefixCls}--title`, {
              [`${prefixCls}--ellipsis`]: ellipsis,
              [`${prefixCls}--title_${size}`]: !descrition,
            })}
          >
            {children}
          </div>
          {descrition && (
            <div
              className={classnames(`${prefixCls}--descrition`, {
                [`${prefixCls}--ellipsis`]: ellipsis,
              })}
            >
              {descrition}
            </div>
          )}
        </div>
      </div>
      {tagInfo && <Tag className={classnames('tag_website_demo_tag', `${prefixCls}--tag`)}>{tagInfo}</Tag>}
    </div>
  );
};

export default ItemMultifunction;

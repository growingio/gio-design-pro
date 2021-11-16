import { Tooltip, Checkbox } from '@gio-design/components';
import { makeSearchParttern } from '@gio-design/components/es/components/cascader/helper';
import React, { ChangeEvent, useState, useEffect } from 'react';

import { useLocale } from '@gio-design/utils';
import { EventData, ListItemPreviewEventProps, EventPickerProps } from './interfaces';
import Preview from './preview';
import { useDebounceFn, useMountedState } from '../hooks';
import List from '../list';
import { ListItemProps } from '../list/interfaces';
import defaultLocale from '../locales/zh-CN';

export interface Props extends ListItemPreviewEventProps, Omit<ListItemProps, 'children'> {
  dataSource: EventData;
  keyword?: string;
  value?: string;
  multiple?: boolean;
  onCheckboxChange?: (data: EventData, checked: boolean) => void;
  /**
   * 是否显示preview 弹出面板
   */
  showPreview?: boolean;
  getTypeIcon: EventPickerProps['getTypeIcon'];
  // onMouseEnter?: (e: React.MouseEvent, data: EventData) => void;
  // onMouseLeave?: (e: React.MouseEvent) => void;
}

const renderKeyword = (label: string, keyword: string, ignoreCase: boolean) => {
  if (!keyword) {
    return label;
  }
  const rSearch = makeSearchParttern(keyword, ignoreCase);
  const replaceValues: string[] = [];
  label.replace(rSearch, (s) => {
    replaceValues.push(s);
    return s;
  });

  const result = label.split(rSearch).reduce((acc, b, i) => {
    acc.push(
      // eslint-disable-next-line react/no-array-index-key
      <span key={`${b}-${i}`}>
        <span>{b}</span>
        <b className="kw">{replaceValues.shift()}</b>
      </span>
    );
    return acc;
  }, [] as React.ReactElement[]);

  return result;
};

export const CustomItem: React.FC<Props> = (props) => {
  const {
    dataSource,
    dataSource: { name, type, disabled },
    keyword,
    value,
    multiple,
    detailVisibleDelay = 600,
    onCheckboxChange,
    onClick,
    onShowEventChart,
    previewCustomRender,
    fetchDetailData,
    showPreview,
    getTypeIcon,
    ...rest
  } = props;
  const locale = useLocale('EventPicker');
  const { notAvaliable } = { ...defaultLocale, ...locale } as any;
  const isMounted = useMountedState();
  const [checked, setChecked] = useState(dataSource.selectKey === value);
  useEffect(() => {
    setChecked(dataSource.selectKey === value);
  }, [dataSource, value]);

  // useEffect(() => {
  //   if (multiple) onCheckboxChange?.(dataSource, checked);
  // }, [checked]);
  const [detailVisible, setDetailVisible] = useState(false);
  const debounceSetDetailVisible = useDebounceFn((visible: boolean) => {
    setDetailVisible(visible);
  }, detailVisibleDelay);

  const [hidden, setHidden] = useState(false);
  const debounceSetHidden = useDebounceFn((visible: boolean) => {
    isMounted() && setHidden(visible);
  }, 150);
  const handleItemMouseEnter = (e: React.MouseEvent<HTMLElement>) => {
    // setHoveredNodeValue(data);
    debounceSetDetailVisible(true);
    setHidden(false);
    debounceSetHidden.cancel();
    rest.onMouseEnter?.(e);
  };
  const handleItemMouseLeave = (e: React.MouseEvent<HTMLElement>) => {
    debounceSetDetailVisible.cancel();
    debounceSetHidden(true);
    rest.onMouseLeave?.(e);
  };
  const handleListItemClick: ListItemProps['onClick'] = (e) => {
    e.stopPropagation();
    if (multiple) {
      const _checked = !checked;
      setChecked(_checked);
      onCheckboxChange?.(dataSource, _checked);
    }
    onClick?.(e);
  };
  const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    setChecked(e.target.checked);
    // onCheckboxChange?.(dataSource, e.target.checked);
  };
  const typeIcon = getTypeIcon?.(type ?? '', dataSource);
  return (
    <List.Item
      style={{ scrollSnapAlign: 'start' }}
      {...rest}
      ellipsis={false}
      onMouseEnter={handleItemMouseEnter}
      onMouseLeave={handleItemMouseLeave}
      onClick={handleListItemClick}
    >
      <>
        <Tooltip
          placement="top"
          overlay={<div style={{ maxWidth: '360px' }}>{dataSource.disabledTips ?? { notAvaliable }}</div>}
          disabled={!disabled || !dataSource.disabledTips}
        >
          <div className="item-content" role="listitem">
            {multiple && (
              <Checkbox
                disabled={disabled}
                onChange={handleCheckboxChange}
                className="item-content-checkbox"
                checked={checked}
              />
            )}
            {typeIcon}
            <span className="item-content-body" title={name}>
              {renderKeyword(name as string, keyword || '', true)}
            </span>
          </div>
        </Tooltip>
      </>

      {showPreview && detailVisible && (
        <Preview
          style={{ display: hidden ? 'none' : 'block' }}
          dataSource={dataSource}
          onShowEventChart={onShowEventChart}
          fetchDetailData={fetchDetailData}
          previewCustomRender={previewCustomRender}
        />
      )}
    </List.Item>
  );
};

export default CustomItem;

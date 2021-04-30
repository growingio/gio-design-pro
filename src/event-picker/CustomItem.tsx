import { Tooltip, Checkbox } from '@gio-design/components';
import { makeSearchParttern } from '@gio-design/components/es/components/cascader/helper';
import React, { ChangeEvent, useState, useEffect } from 'react';

import TypeIcon from './TypeIcon';
import { EventData, ListItemPreviewEventProps } from './interfaces';
import Preview from './preview';
import { useDebounceFn } from '../hooks';
import List from '../list';
import { ListItemProps } from '../list/interfaces';

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
    ...rest
  } = props;

  const [checked, setChecked] = useState(dataSource.selectKey === value);
  useEffect(() => {
    setChecked(dataSource.selectKey === value);
  }, [dataSource, value]);

  useEffect(() => {
    if (multiple) onCheckboxChange?.(dataSource, checked);
  }, [checked]);
  const [detailVisible, setDetailVisible] = useState(false);
  const debounceSetDetailVisible = useDebounceFn((visible: boolean) => {
    setDetailVisible(visible);
  }, detailVisibleDelay);

  const [hidden, setHidden] = useState(false);
  const debounceSetHidden = useDebounceFn((visible: boolean) => {
    setHidden(visible);
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
      setChecked((p) => !p);
    }
    onClick?.(e);
  };
  const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    setChecked(e.target.checked);
  };
  return (
    <List.Item
      style={{ scrollSnapAlign: 'start' }}
      {...rest}
      ellipsis={false}
      onMouseEnter={handleItemMouseEnter}
      onMouseLeave={handleItemMouseLeave}
      onClick={handleListItemClick}
    >
      <Tooltip overlay={<div>{dataSource.disabledTips ?? '暂不可用'}</div>} disabled={!disabled}>
        <>
          <div className="item-content">
            {multiple && (
              <Checkbox
                disabled={disabled}
                onChange={handleCheckboxChange}
                className="item-content-checkbox"
                checked={checked}
              />
            )}
            <TypeIcon size="14px" className="item-content-icon" type={type || ''} />
            <span className="item-content-body" title={name}>
              {renderKeyword(name as string, keyword || '', true)}
            </span>
          </div>
          {showPreview && detailVisible && (
            <Preview
              style={{ display: hidden ? 'none' : 'block' }}
              dataSource={dataSource}
              onShowEventChart={onShowEventChart}
              fetchDetailData={fetchDetailData ?? (async (o) => o)}
              previewCustomRender={previewCustomRender}
            />
          )}
        </>
      </Tooltip>
    </List.Item>
  );
};

export default CustomItem;

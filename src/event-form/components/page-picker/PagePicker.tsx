/* eslint-disable @typescript-eslint/no-use-before-define */
import React, { useEffect, useState, useMemo, useRef } from 'react';
import { Button, SearchBar, Dropdown, Input } from '@gio-design/components';
import { PlusCircleFilled, UpFilled, DownFilled } from '@gio-design/icons';
// import { Option } from '@gio-design/components/es/components/list/interface';
import usePrefixCls from '@gio-design/components/es/utils/hooks/use-prefix-cls';
import { PagePickerProps } from './interface';
import { TagElement } from '../../TagElement';
// import List from '../../../list';
// import { ListProps, ListItemProps } from '../../../list/interfaces';
import PageList, { ListOption } from './PageList';

const Picker = (props: PagePickerProps) => {
  const { onSearch, onSelect, onChange, actionButton, currentPageTags = [], dataSource = [], value } = props;
  const prefixCls = usePrefixCls('event-page-picker');
  // const [query, setQuery] = React.useState<string>('');
  const [searchvalue, setSearchValue] = useState<string>('');
  const [currentValue, setCurrentValue] = useState(value);
  const [visible, setVisible] = useState(false);
  const triggerRef = useRef<HTMLDivElement | null>(null);
  // const [inputValue, setInputValue] = useState('');
  useEffect(() => {
    const page = currentPageTags?.[0];
    if (page) {
      onSelect?.(page);
      onChange?.(page);
    }
    setCurrentValue(page);
  }, [currentPageTags]);
  const inputValue = useMemo(() => {
    const temp = convertToListOption(currentValue);
    // return `${temp.isCurrent ? '[当前页]' : ''} ${temp.label}`;
    return temp;
  }, [currentValue]);
  function onQueryChange(val: string) {
    setSearchValue(val);
    onSearch?.(val);
  }
  function convertToListOption(tag?: TagElement): ListOption {
    // console.log('convertToListOption', tag);
    if (!tag || !tag.definition) {
      return { isCurrent: false, label: '' };
    }
    const isCurrent = currentPageTags?.findIndex((v) => v.id === tag.id) > -1;
    const {
      name,
      platforms,
      definition: { path, domain },
    } = tag;

    let text = `${name} | ${domain}${path || '下的所有页面'}`;
    // 是小程序
    if (platforms.includes('minp')) {
      text = `${name} | ${path || '小程序所有页面'}`;
    }
    const option: ListOption = {
      label: text,
      value: tag,
      key: tag?.id,
      isCurrent,
    };
    return option;
  }

  const listDataSource: ListOption[] = useMemo(() => {
    const datas = dataSource.filter((v) => !searchvalue || v.name.includes(searchvalue));
    const options = datas.map((v: TagElement) => {
      const option = convertToListOption(v);
      return option;
    });

    return options;
  }, [dataSource, searchvalue]);

  function handleSelect(val: ListOption) {
    onSelect?.(val?.value as TagElement);
    setCurrentValue(val?.value);
    setVisible(false);
  }
  function handleChange(v: any) {
    onChange?.(v?.value as TagElement);
  }
  function handleActionButtonClick() {
    actionButton?.onClick?.();
    setVisible(false);
  }
  const [overlayWidth, setOverlayWidth] = useState(200);
  useEffect(() => {
    const root = triggerRef?.current as HTMLElement;
    const clientWidth = root?.clientWidth || 200;
    setOverlayWidth(clientWidth);
  });

  return (
    <Dropdown
      placement="bottomLeft"
      visible={visible}
      onVisibleChange={setVisible}
      overlay={
        <div className={prefixCls} style={{ width: `${overlayWidth || 200}px` }}>
          <SearchBar
            className="search-header"
            placeholder="搜索页面名称"
            value={searchvalue}
            onChange={onQueryChange}
            showClear
          />
          <div className="body" style={{ overflow: 'auto', maxHeight: '150px' }}>
            <PageList dataSource={listDataSource} value={inputValue} onSelect={handleSelect} onChange={handleChange} />
          </div>
          <div className="footer">
            <Button
              size="small"
              type="text"
              icon={<PlusCircleFilled />}
              // style={{ margin: '8px 16px' }}
              onClick={handleActionButtonClick}
            >
              定义新页面
            </Button>
          </div>
        </div>
      }
    >
      <div className={`${prefixCls}-trigger`} ref={triggerRef}>
        {/* {defaultInput()} */}
        <Input
          width="100%"
          aria-label="picker-value"
          readOnly
          prefix={inputValue.isCurrent && <span style={{ color: '#1248e9' }}>[当前页]</span>}
          suffix={visible ? <UpFilled /> : <DownFilled />}
          value={inputValue.label}
        />
      </div>
    </Dropdown>
  );
};
export default Picker;

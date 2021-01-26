/* eslint-disable @typescript-eslint/no-use-before-define */
import React, { useEffect, useState, useMemo } from 'react';
import { Button, SearchBar, Dropdown, List, Input } from '@gio-design/components';
import { PlusCircleFilled, UpFilled, DownFilled } from '@gio-design/icons';
import { Option } from '@gio-design/components/es/components/list/interface';
import usePrefixCls from '@gio-design/components/es/utils/hooks/use-prefix-cls';
import { PagePickerProps } from './interface';
import { TagElement } from '../../TagElement';

interface ListOption extends Option {
  isCurrent?: boolean;
  name?: string;
  tagElement: TagElement;
}
const Picker = (props: PagePickerProps) => {
  const { onSearch, onSelect, onChange, actionButton, currentPageTags = [], dataSource = [], value } = props;
  const prefixCls = usePrefixCls('event-page-picker');
  // const [query, setQuery] = React.useState<string>('');
  const [searchvalue, setSearchValue] = useState<string>('');
  const [currentValue, setCurrentValue] = useState(value);
  const [visible, setVisible] = useState(false);
  // const [inputValue, setInputValue] = useState('');
  useEffect(() => {
    const page = currentPageTags?.[0];
    if (page) {
      onSelect?.(page);
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
      return { isCurrent: false, label: '', value: '', tagElement: tag || ({} as TagElement) };
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
      value: tag.id,
      isCurrent,
      name: tag.name,
      tagElement: tag,
    };
    return option;
  }
  const labelRenderer = (option: ListOption) => {
    return `${option.isCurrent ? '[当前页]' : ''} ${option.label}`;
  };
  const WrapperStyle = {
    display: 'inline-block',
    borderRadius: 6,
    backgroundColor: '#FFFFFF',
    boxShadow: '0 2px 14px 1px rgba(223,226,237,0.8)',
  };
  const listDataSource: ListOption[] = useMemo(() => {
    const datas = dataSource.filter((v) => !searchvalue || v.name.includes(searchvalue));
    const options = datas.map((v: TagElement) => {
      // console.warn('pagepicker option', v);
      return convertToListOption(v);
    });
    // console.log(options);

    return options;
  }, [dataSource, searchvalue]);
  function handleSelect(_: string, __: string | string[], option: ListOption) {
    // console.log('handle Pagepicker selelct', selectedValue, val, option);
    onSelect?.({ ...option.tagElement } as TagElement);
    setCurrentValue({ ...option.tagElement });
    setVisible(false);
  }
  function handleChange(v: any) {
    onChange?.(v as TagElement);
  }
  function handleActionButtonClick() {
    actionButton?.onClick?.();
    setVisible(false);
  }
  return (
    <Dropdown
      visible={visible}
      onVisibleChange={setVisible}
      overlay={
        <div className={prefixCls}>
          <SearchBar id="demo" value={searchvalue} onChange={onQueryChange} />
          <List
            wrapStyle={WrapperStyle}
            dataSource={listDataSource}
            width={320}
            height={200}
            value={currentValue}
            labelRenderer={labelRenderer}
            onSelect={handleSelect}
            onChange={handleChange}
          />
          <div style={{ borderTop: '1px solid #DCDFED' }}>
            <Button
              size="small"
              type="text"
              icon={<PlusCircleFilled />}
              style={{ margin: '8px 16px' }}
              onClick={handleActionButtonClick}
            >
              定义新页面
            </Button>
          </div>
        </div>
      }
    >
      <div className={`${prefixCls}-trigger`}>
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

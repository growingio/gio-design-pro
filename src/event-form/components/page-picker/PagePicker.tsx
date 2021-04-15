/* eslint-disable @typescript-eslint/no-use-before-define */
import React, { useEffect, useState, useMemo, useRef } from 'react';
import { Button, SearchBar, Dropdown, Input } from '@gio-design/components';
import { PlusCircleFilled, DownFilled } from '@gio-design/icons';
import usePrefixCls from '@gio-design/components/es/utils/hooks/use-prefix-cls';
import classnames from 'classnames';
import { PagePickerProps } from './interface';
import { TagElement } from '../../TagElement';
import PageList, { ListOption } from './PageList';

const Picker = (props: PagePickerProps) => {
  const { onSearch, onSelect, onChange, actionButton, currentPageTags = [], dataSource = [], value } = props;
  const prefixCls = usePrefixCls('event-page-picker');
  const [searchvalue, setSearchValue] = useState<string>('');
  const [currentValue, setCurrentValue] = useState(value);
  const [visible, setVisible] = useState(false);
  const triggerRef = useRef<HTMLDivElement | null>(null);
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
    return temp;
  }, [currentValue]);

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
  /**
   * @name 列表查询回调
   * @param val
   */
  function onQueryChange(val: string) {
    setSearchValue(val);
    onSearch?.(val);
  }
  function handleSelect(val: ListOption) {
    onSelect?.(val?.value as TagElement);
    setCurrentValue(val?.value);
    setVisible(false);
  }
  function handleChange(v: any) {
    onChange?.(v?.value as TagElement);
  }
  /**
   * 点击添加新页面的回调
   */
  function handleActionButtonClick() {
    actionButton?.onClick?.();
    setVisible(false);
  }
  /**
   * 设置dropdown的弹出层宽度 与输入框同宽
   */
  const [overlayWidth, setOverlayWidth] = useState(200);
  useEffect(() => {
    const root = triggerRef?.current as HTMLElement;
    const clientWidth = root?.clientWidth || 200;
    setOverlayWidth(clientWidth);
  }, []);

  const cls = classnames({
    [`${prefixCls}-trigger`]: true,
    [`${prefixCls}-trigger--open`]: visible,
  });
  const [triggerActive, setTriggerActive] = useState(false);
  function handleTriggerMouseOver() {
    setTriggerActive(true);
  }
  function handleTriggerMouseOut() {
    setTriggerActive(false);
  }
  const inputPrefixCls = usePrefixCls('input');
  const inputCls = classnames({
    [`${inputPrefixCls}--focus`]: triggerActive,
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
            <Button size="small" type="text" icon={<PlusCircleFilled />} onClick={handleActionButtonClick}>
              定义新页面
            </Button>
          </div>
        </div>
      }
    >
      <div
        className={cls}
        ref={triggerRef}
        onFocus={() => setTriggerActive(true)}
        onBlur={() => setTriggerActive(false)}
        onMouseOver={handleTriggerMouseOver}
        onMouseOut={handleTriggerMouseOut}
      >
        {/* {defaultInput()} */}
        <Input
          width="100%"
          aria-label="picker-value"
          className={inputCls}
          readOnly
          prefix={inputValue?.isCurrent && <span style={{ color: '#1248e9' }}>[当前页]</span>}
          suffix={<DownFilled className="caret" />}
          value={inputValue.label}
          placeholder="请选择所属页面"
        />
      </div>
    </Dropdown>
  );
};
export default Picker;

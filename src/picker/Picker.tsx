import * as React from 'react';
import Alert from '@gio-design-new/components/es/components/alert';
import SearchBar from '@gio-design-new/components/es/components/search-bar';
import Loading from '@gio-design-new/components/es/components/loading';
import TabNav from '@gio-design-new/components/es/components/tab-nav';
import Button from '@gio-design-new/components/es/components/button';
import Menu from '@gio-design-new/components/es/components/cascader/menu';
import Input from '@gio-design-new/components/es/components/input';
import Dropdown from '@gio-design-new/components/es/components/dropdown';
import usePrefixCls from '@gio-design-new/components/es/utils/hooks/use-prefix-cls';
import { UpFilled, DownFilled } from '@gio-design/icons';
import { NodeData } from '@gio-design-new/components/es/components/cascader/interface';
import EmptyPrompt from '../empty-prompt';
import { PickerProps } from './interfaces';

function Picker({
  visible = false,
  onVisibleChange,
  inputValue,
  input,
  searchPlaceholder = 'Search label',
  onSearch,
  tabNav,
  loading = false,
  groupVisible = true,
  dataSource,
  actionButton,
  onHoverPanelShow,
  onSelect,
  placeholder = '请选择',
  value,
  emptyPrompt = { description: 'No Data' },
}: PickerProps) {
  const prefixCls = usePrefixCls('picker');
  const [query, setQuery] = React.useState<string>('');

  function onQueryChange(current: string) {
    setQuery(current);
    onSearch?.(current.slice(0, 200).toLocaleLowerCase());
  }

  function onMenuHover(current: NodeData) {
    return !onHoverPanelShow ? null : <div className={`${prefixCls}-hover-panel`}>{onHoverPanelShow(current)}</div>;
  }

  function renderList() {
    if (loading) {
      return (
        <div className="gio-loading-wrapper">
          <Loading />
        </div>
      );
    }

    if (dataSource.length === 0) {
      return <EmptyPrompt {...emptyPrompt} />;
    }

    return (
      <Menu
        groupName={groupVisible}
        className={`${prefixCls}__list`}
        dataSource={dataSource}
        onSelect={onSelect}
        afterInner={onMenuHover}
        value={value}
      />
    );
  }
  function renderOverlay() {
    return (
      <div className={prefixCls}>
        <div className={`${prefixCls}__header`}>
          <SearchBar placeholder={searchPlaceholder} size="middle" value={query} onChange={onQueryChange} />
          {actionButton && <Button type="secondary" {...actionButton} />}
        </div>
        <>
          {query.length > 200 && (
            <Alert type="warning" message="搜索字符长度已超过200，只取前200字符搜索" size="small" showIcon closeable />
          )}
        </>
        {tabNav && (
          <TabNav type="line" size="small" onChange={tabNav.onChange}>
            {React.useMemo(() => tabNav.items.map((i) => <TabNav.Item {...i} />), [tabNav.items])}
          </TabNav>
        )}
        {renderList()}
      </div>
    );
  }
  const defaultTrigger = (
    <Input readOnly placeholder={placeholder} value={inputValue} suffix={visible ? <UpFilled /> : <DownFilled />} />
  );
  return (
    <Dropdown
      visible={visible}
      onVisibleChange={onVisibleChange}
      placement="bottomLeft"
      overlayClassName={`${prefixCls}-dropdown`}
      overlay={renderOverlay}
    >
      <div className={`${prefixCls}-trigger`}>
        {/* <Input
          placeholder={placeholder}
          aria-label="picker-value"
          suffix={visible ? <UpFilled /> : <DownFilled />}
          value={inputValue}
        /> */}
        {React.isValidElement(input) ? input : defaultTrigger}
      </div>
    </Dropdown>
  );
}

export default Picker;

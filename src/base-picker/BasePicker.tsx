import React from 'react';
import classnames from 'classnames';
import { SearchBar, TabNav, Alert } from '@gio-design/components';
import usePrefixCls from '@gio-design/components/es/utils/hooks/use-prefix-cls';
import List from '../list';
import { BasePickerProps } from './interfaces';

function BasePicker({
  className,
  style,
  searchBar,
  tabNav,
  items,
  renderItems,
  footer,
  detailVisible = false,
  renderDetail,
}: BasePickerProps) {
  const prefixCls = usePrefixCls('base-picker');
  const [query, setQuery] = React.useState<string>('');

  function handleQueryChange(current: string) {
    setQuery(current);
    searchBar?.onSearch(current.slice(0, 200).toLocaleLowerCase());
  }

  const cls = classnames(prefixCls, className);
  let content = null;
  if (items) {
    content = <List items={items} />;
  } else if (renderItems) {
    content = <List>{renderItems()}</List>;
  }

  return (
    <div className={cls} style={style}>
      {searchBar && (
        <div className={`${prefixCls}__header`}>
          <SearchBar size="middle" placeholder={searchBar.placeholder} value={query} onChange={handleQueryChange} />
          {query.length > 200 && (
            <Alert
              type="warning"
              message="搜索字符长度已超过 200，只取前 200 字符搜索"
              size="small"
              showIcon
              closeable
            />
          )}
        </div>
      )}
      {tabNav && (
        <TabNav type="line" size="small" onChange={tabNav.onChange}>
          {React.useMemo(() => tabNav.items.map((i) => <TabNav.Item {...i} />), [tabNav.items])}
        </TabNav>
      )}
      <div className={`${prefixCls}__content`}>{content}</div>
      {footer && <div className={`${prefixCls}__footer`}>{footer}</div>}
      {detailVisible && <div className={`${prefixCls}__detail`}>{renderDetail?.()}</div>}
    </div>
  );
}

export default BasePicker;

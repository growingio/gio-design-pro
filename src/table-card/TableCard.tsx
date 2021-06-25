import React from 'react';
import classNames from 'classnames';
import { CloseOutlined } from '@gio-design/icons';
import { isNil } from 'lodash';
import { Tabs, Table, SearchBar, Space, usePrefixCls, Link } from '@gio-design/components';
import { TableCardProps, TableCardTab } from './interfaces';
import TooltipButton from '../tooltip-button';

function TableCard<RecordType>({
  className,
  style,
  prefixCls: customizePrefixCls,
  tabs,
  otherTabs,
  title,
  description,
  showTabs = true,
}: TableCardProps<RecordType>) {
  const prefixCls = usePrefixCls('table-card', customizePrefixCls);

  const renderTable = (_content: TableCardTab<RecordType>) => {
    const { searchBar, buttons, batchButtons, table } = _content;
    const selectedRowKeys = table?.rowSelection?.selectedRowKeys ?? [];
    const onChange = table?.rowSelection?.onChange;
    return (
      <>
        {(!isNil(title) || showTabs) && (!isNil(searchBar) || !isNil(buttons) || selectedRowKeys?.length !== 0) && (
          <hr className={classNames(`${prefixCls}-divider`, { [`${prefixCls}-divider-withTabs`]: showTabs })} />
        )}
        <div
          className={classNames({
            [`${prefixCls}-opertor`]: !isNil(searchBar) || !isNil(buttons) || selectedRowKeys?.length !== 0,
          })}
        >
          {isNil(searchBar) ? <div /> : <SearchBar style={{ width: 360 }} {...searchBar} />}
          <Space size={12}>
            {selectedRowKeys?.length === 0 ? (
              <>
                {buttons?.map((buttonProps, btnKey) => (
                  <TooltipButton {...buttonProps} key={btnKey.toString()} />
                ))}
              </>
            ) : (
              <>
                <div className={`${prefixCls}-select`}>
                  <span className={`${prefixCls}-select-number`}>已选择 {selectedRowKeys?.length} 项</span>
                  <Link  // eslint-disable-line
                    className={`${prefixCls}-select-close`}
                    icon={<CloseOutlined />}
                    onClick={() => onChange?.([], [])}
                  />
                  {!isNil(batchButtons) && batchButtons?.length > 0 && <hr className={`${prefixCls}-select-divider`} />}
                </div>
                {batchButtons?.map((batchButtonProps, batchBtnKey) => (
                  <TooltipButton {...batchButtonProps} key={batchBtnKey.toString()} />
                ))}
              </>
            )}
          </Space>
        </div>
        <Table
          className={classNames({ 'gio-table-content-empty': table.dataSource?.length === 0 })}
          pagination={{ hideOnSinglePage: true }}
          {...table}
        />
      </>
    );
  };

  return (
    <div className={classNames(prefixCls, className)} style={style}>
      {title && <div className={`${prefixCls}-title`}>{title}</div>}
      {title && description && <div className={`${prefixCls}-description`}>{description}</div>}
      <Tabs type="line" className={classNames({ [`${prefixCls}-hide-tabNav`]: !showTabs })}>
        {tabs.map((tab, index) => (
          <Tabs.Pane tab={tab.name} key={index.toString()}>
            {renderTable(tab)}
          </Tabs.Pane>
        ))}
        {otherTabs?.map((tab, index) => (
          <Tabs.Pane tab={tab.name} key={(tabs.length + index).toString()}>
            <hr className={`${prefixCls}-divider`} />
            {tab.content}
          </Tabs.Pane>
        ))}
      </Tabs>
    </div>
  );
}

export default TableCard;

import React from 'react';
import classNames from 'classnames';
import { CloseOutlined } from '@gio-design/icons';
import { isNil } from 'lodash';
import { Tabs, Table, SearchBar, Button, Space, usePrefixCls } from '@gio-design/components';
import { TableCardProps } from './interfaces';

function TableCard<RecordType>({
  className,
  style,
  prefixCls: customizePrefixCls,
  tabs,
  title,
  description,
}: TableCardProps<RecordType>) {
  const prefixCls = usePrefixCls('table-card', customizePrefixCls);

  return (
    <div className={classNames(prefixCls, className)} style={style}>
      {title && <div className={`${prefixCls}-title`}>{title}</div>}
      {title && description && <div className={`${prefixCls}-description`}>{description}</div>}
      <hr className={`${prefixCls}-divider`} />
      <Tabs type="line">
        {tabs.map((tab, index) => {
          const { name, searchBar, buttons, batchButtons, table } = tab;
          const selectedRowKeys = table?.rowSelection?.selectedRowKeys ?? [];
          const onChange = table?.rowSelection?.onChange;

          return (
            <Tabs.Pane tab={name} key={index.toString()}>
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
                        <Button {...buttonProps} key={btnKey.toString()} />
                      ))}
                    </>
                  ) : (
                    <>
                      <div className={`${prefixCls}-select`}>
                        <span className={`${prefixCls}-select-number`}>已选择 {selectedRowKeys?.length} 项</span>
                        <Button
                          className={`${prefixCls}-select-close`}
                          icon={<CloseOutlined />}
                          onClick={() => onChange?.([], [])}
                          size="small"
                          type="assist"
                        />
                        {!isNil(batchButtons) && batchButtons?.length > 0 && (
                          <hr className={`${prefixCls}-select-divider`} />
                        )}
                      </div>
                      {batchButtons?.map((batchButtonProps, batchBtnKey) => (
                        <Button {...batchButtonProps} key={batchBtnKey.toString()} />
                      ))}
                    </>
                  )}
                </Space>
              </div>
              <Table {...table} />
            </Tabs.Pane>
          );
        })}
      </Tabs>
    </div>
  );
}

export default TableCard;

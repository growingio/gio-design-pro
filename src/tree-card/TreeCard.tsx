import React, { useState } from 'react';
import { usePrefixCls, SearchBar } from '@gio-design/components';
import classNames from 'classnames';
import { isArray } from 'lodash';
import { TreeCardProps } from './interfaces';
import TooltipButton from '../tooltip-button';
import Tree from './Tree';

function TreeCard<RecordType>({
  className,
  style,
  prefixCls: customizePrefixCls,
  title,
  searchBar,
  footerButton,
  treeConfig,
  parentNodeSelectable = true,
  onExpand,
  onSelect,
  selectedKeys,
  expandedKeys,
}: TreeCardProps<RecordType>) {
  const prefixCls = usePrefixCls('tree-card', customizePrefixCls);
  const [localSelectedKeys, setSelectedKeys] = useState<(string | number)[]>([]);
  const [localExpandedKeys, setExpandedKeys] = useState<(string | number)[]>([]);

  const renderTrees = () => {
    const _treeConfig = isArray(treeConfig) ? treeConfig : [treeConfig];
    return _treeConfig.map((config, index) => (
      <Tree
        {...config}
        key={index.toString()}
        selectedKeys={selectedKeys || localSelectedKeys}
        expandedKeys={expandedKeys || localExpandedKeys}
        hasDivider={index !== 0}
        prefixCls={prefixCls}
        parentNodeSelectable={parentNodeSelectable}
        onSelect={(_selectedKeys, e) => {
          if (parentNodeSelectable || e.node.isLeaf) {
            setSelectedKeys(_selectedKeys);
            onSelect?.(_selectedKeys, e);
          }
        }}
        onExpand={(_expandedKeys, e) => {
          setExpandedKeys(_expandedKeys);
          onExpand?.(_expandedKeys, e);
        }}
      />
    ));
  };

  return (
    <div className={classNames(prefixCls, className)} style={style}>
      {title && <span className={`${prefixCls}-title`}>{title}</span>}
      {title && <hr className={`${prefixCls}-divider`} />}
      {searchBar && <SearchBar {...searchBar} className={classNames(`${prefixCls}-searchbar`, searchBar.className)} />}
      <div className={`${prefixCls}-tree`}>{renderTrees()}</div>
      {footerButton && (
        <div className={`${prefixCls}-footer`}>
          <TooltipButton
            {...footerButton}
            size="middle"
            className={classNames(`${prefixCls}-footer-button`, footerButton.className)}
          />
        </div>
      )}
    </div>
  );
}

export default TreeCard;

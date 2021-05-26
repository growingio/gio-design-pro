import React, { useRef } from 'react';
import classNames from 'classnames';
import { isBoolean, get, isFunction, isUndefined, isArray } from 'lodash';
import { Tree as GioTree } from '@gio-design/components';
import { TreeProps } from './interfaces';
import OperationMenu from '../operation-menu';
import TooltipEllipsis from './TooltipEllipsis';

function Tree<RecordType>({
  title,
  data,
  customIcon,
  customTitle = 'name',
  customKey = 'key',
  customIsLeaf = (record: RecordType) => (isBoolean(get(record, 'isLeaf')) ? get(record, 'isLeaf') : false),
  operationMenu,
  childrenField = 'children',
  prefixCls,
  hasDivider,
  treeProps = {},
  tooltipDisabled = false,
  onExpand: onExpandFromInner,
  onSelect: onSelectFromInner,
  selectedKeys,
  expandedKeys,
  parentNodeSelectable,
}: TreeProps<RecordType>) {
  const { onSelect, onExpand, onClick, ...restTreeProps } = treeProps;
  const treeRef = useRef<any>();
  const renderTreeNodeTitle = (treeNode: RecordType) => {
    const treeNodeTitle = isFunction(customTitle) ? customTitle(treeNode) : get(treeNode, customTitle);
    const treeNodeIcon = isFunction(customIcon) ? customIcon(treeNode) : customIcon;
    const operationOptions = isFunction(operationMenu?.options)
      ? operationMenu?.options(treeNode)
      : operationMenu?.options;

    const treeNodeOperation =
      !isUndefined(operationMenu) && isArray(operationOptions) ? (
        <OperationMenu
          {...operationMenu}
          options={operationOptions}
          onClick={(value) => operationMenu.onClick?.(value, treeNode)}
        />
      ) : null;
    return (
      <div className={`${prefixCls}-tree-node-title-content`}>
        {treeNodeIcon && <span className={`${prefixCls}-tree-node-icon`}>{treeNodeIcon}</span>}
        {treeNodeTitle && (
          <TooltipEllipsis className={`${prefixCls}-tree-node-title`} tooltipDisabled={tooltipDisabled}>
            {treeNodeTitle}
          </TooltipEllipsis>
        )}
        {treeNodeOperation && <span className={`${prefixCls}-tree-node-operation`}>{treeNodeOperation}</span>}
      </div>
    );
  };

  const recursionRenderTreeNode = (childrenTreeDataNode: RecordType[]): React.ReactNode =>
    childrenTreeDataNode.map((item) => {
      const _childrenTreeNode = get(item, childrenField) || [];
      const treeNodeKey = isFunction(customKey) ? customKey(item) : get(item, customKey);
      if (customIsLeaf(item)) {
        return <GioTree.TreeNode {...item} key={treeNodeKey} title={renderTreeNodeTitle(item)} isLeaf />;
      }
      return (
        <GioTree.TreeNode {...item} key={treeNodeKey} title={renderTreeNodeTitle(item)} isLeaf={false}>
          {recursionRenderTreeNode(_childrenTreeNode as RecordType[])}
        </GioTree.TreeNode>
      );
    });

  return (
    <>
      {hasDivider && <hr className={classNames(`${prefixCls}-divider`, `${prefixCls}-tree-divider`)} />}
      {title && <span className={`${prefixCls}-subTitle`}>{title}</span>}
      <GioTree
        ref={treeRef}
        onClick={(e, node) => {
          if (!parentNodeSelectable) {
            treeRef.current?.onNodeExpand(e, node);
          }
          onClick?.(e, node);
        }}
        {...restTreeProps}
        selectedKeys={selectedKeys}
        expandedKeys={expandedKeys}
        onExpand={(...args) => {
          onExpand?.(...args);
          onExpandFromInner?.(...args);
        }}
        onSelect={(...args) => {
          onSelect?.(...args);
          onSelectFromInner?.(...args);
        }}
      >
        {recursionRenderTreeNode(data)}
      </GioTree>
    </>
  );
}

export default Tree;

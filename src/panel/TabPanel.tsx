import React from 'react';
import { usePrefixCls } from '@gio-design/utils';
import classNames from 'classnames';
import { TabNavProps } from '@gio-design/components';
import { TabPaneProps } from './interfaces';
import ToolBar from './ToolBar';

const TabPanel: React.FC<TabPaneProps> = (props) => {
  const { className, style, children } = props;

  const childs = React.Children.toArray(children);

  const toolBars = childs.filter(
    (toolBar) => React.isValidElement(toolBar) && toolBar.type === ToolBar
  ) as React.ReactElement<TabNavProps>[];

  const otherChildren = childs.filter((toolBar) => (React.isValidElement(toolBar) ? toolBar.type !== ToolBar : true));

  const showToolBars = toolBars.length > 0;

  const prefixCls = usePrefixCls('panel__tab-panel');

  return (
    <div className={classNames(prefixCls, className)} style={style}>
      {showToolBars ? <div className={`${prefixCls}__container`}>{toolBars}</div> : null}
      {otherChildren}
    </div>
  );
};

export default TabPanel;

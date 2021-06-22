import React, { useEffect, useState } from 'react';
import { useControlledState } from '@gio-design/utils';
import usePrefixCls from '@gio-design/components/es/utils/hooks/use-prefix-cls';
import classnames from 'classnames';
import { TabNav } from '@gio-design/components';
import { PanelProps, TabPaneProps } from './interfaces';
import TabPanel from './TabPanel';

import './style/index.less';

const InnerPanel: React.ForwardRefRenderFunction<HTMLDivElement, PanelProps> = (props, ref) => {
  const {
    title,
    description,
    children,
    footer,
    type = 'line',
    size = 'middle',
    activeKey,
    defaultActiveKey,
    onTabClick,
    onChange,
    className,
    style,
  } = props;
  const _prefixCls = usePrefixCls('panel');
  const prefix = (classname?: string) => `${_prefixCls}${classname || ''}`;

  const [key, setKey] = useControlledState(activeKey, defaultActiveKey);
  const [currentTabIndex, setCurrentTabIndex] = useState(0);

  const childs = React.Children.toArray(children);

  const tabs = childs.filter(
    (child) => React.isValidElement(child) && child.type === TabPanel
  ) as React.ReactElement<TabPaneProps>[];

  const isSinglePanel = tabs.length < 2;

  useEffect(() => {
    const _currentIndex = tabs.findIndex((tab) => tab.key === `.$${key}`);
    if (_currentIndex > -1) {
      setCurrentTabIndex(_currentIndex);
    }
  }, [key]);

  const showHeader = title || description || !isSinglePanel;

  const onTabChange = (_key: string) => {
    setKey(_key);
    onChange?.(_key);
  };

  return (
    <div ref={ref} className={classnames(prefix(), className)} style={style}>
      <div className={classnames(prefix('__header'), { [prefix('__header--hidden')]: !showHeader })}>
        {title ? <div className={classnames(prefix('__header__title'))}>{title}</div> : null}
        {description ? <div className={prefix('__header__description')}>{description}</div> : null}
        {!isSinglePanel ? (
          // TabNav组件 className没有生效, 只能暂时把这个逻辑加在外层
          <div
            className={classnames(prefix('__header__nav'), {
              [prefix('__header__nav--standlone')]: !title && !description,
            })}
          >
            <TabNav
              size={size}
              type={type}
              activeKey={key}
              onTabClick={onTabClick}
              defaultActiveKey={key}
              onChange={onTabChange}
            >
              {tabs.map((tab) => {
                const {
                  key: _key,
                  props: { name, disabled },
                } = tab;
                return (
                  <TabNav.Item disabled={disabled} key={String(_key).slice(2)}>
                    {name}
                  </TabNav.Item>
                );
              })}
            </TabNav>
          </div>
        ) : null}
      </div>
      <div className={prefix('__content')}>{tabs[currentTabIndex]}</div>
      {footer && <div className={prefix('__footer')}>{footer}</div>}
    </div>
  );
};

const Panel = React.forwardRef<unknown, PanelProps>(InnerPanel);

Panel.displayName = 'Panel';

export default Panel;

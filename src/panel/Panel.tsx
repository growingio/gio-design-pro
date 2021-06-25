import React, { useEffect, useState } from 'react';
import { useControlledState } from '@gio-design/utils';
import usePrefixCls from '@gio-design/components/es/utils/hooks/use-prefix-cls';
import classnames from 'classnames';
import { TabNav } from '@gio-design/components';
import { PanelProps, TabPaneProps } from './interfaces';
import TabPanel from './TabPanel';

const InnerPanel: React.ForwardRefRenderFunction<HTMLDivElement, PanelProps> = (props, ref) => {
  const {
    title,
    description,
    children,
    footer,
    tabType = 'line',
    tabSize = 'middle',
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
        <div
          className={classnames(prefix('__header__container'), {
            [prefix('__header__container--hidden')]: !title && !description,
          })}
        >
          <div className={classnames(prefix('__header__title'), { [prefix('__header__title--hidden')]: !title })}>
            {title}
          </div>
          <div
            className={classnames(prefix('__header__description'), {
              [prefix('__header__description--hidden')]: !description,
            })}
          >
            {description}
          </div>
        </div>

        {!isSinglePanel ? (
          <TabNav
            size={tabSize}
            type={tabType}
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

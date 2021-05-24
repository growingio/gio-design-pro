import React, { ReactElement, ReactNode } from 'react';
import classNames from 'classnames';
import usePrefixCls from '@gio-design/components/es/utils/hooks/use-prefix-cls';
import './footer-toolbar.less';
// import { RouteContext, RouteContextType } from '../index';
import ReactDOM from 'react-dom';

export interface FooterToolbarProps {
  extra?: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
  renderContent?: (props: FooterToolbarProps & { leftWidth?: string }, dom: ReactElement) => ReactNode;
}
const FooterToolbar: React.FC<FooterToolbarProps> = (props) => {
  const { children, className, extra, style, renderContent } = props;
  const prefixCls = usePrefixCls('event-form');
  const baseClassName = `${prefixCls}-footer-bar`;
  const width = '100%';

  const dom = (
    <>
      <div className={`${baseClassName}-left`}>{extra}</div>
      <div className={`${baseClassName}-right`}>{children}</div>
    </>
  );

  return (
    <div className={classNames(className, `${baseClassName}`)} style={{ width, ...style }}>
      {renderContent
        ? renderContent(
            {
              ...props,
              leftWidth: width,
            },
            dom
          )
        : dom}
    </div>
  );
};
type PortalFooterToolbarProps = FooterToolbarProps & { container?: Element };
const PortalFooterToolbar: React.FC<PortalFooterToolbarProps> = (props) => {
  const { container, ...rest } = props;
  if (container) {
    return ReactDOM.createPortal(<FooterToolbar {...rest} />, container);
  }
  return <FooterToolbar {...rest} />;
};
export default PortalFooterToolbar;

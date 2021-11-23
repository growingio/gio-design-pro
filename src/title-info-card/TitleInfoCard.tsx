import React from 'react';
import { FileOutlined } from '@gio-design/icons';
import Dotdotdot from 'react-dotdotdot';
import { usePrefixCls } from '@gio-design/components';
import classNames from 'classnames';
import { TitleInfoCardProps } from './interfaces';
import './style/index';

const TitleInfoCard = (props: TitleInfoCardProps) => {
  const {
    children,
    clamp = 3,
    titleIcon,
    centerWidth = 'auto',
    rightWidth = 'auto',
    title,
    description,
    operationContent,
    footerContent,
    prefixCls: customizePrefixCls,
    className,
  } = props;

  const prefixCls = usePrefixCls('title-info-card', customizePrefixCls);

  return (
    <div className={classNames(prefixCls, className)}>
      <div className={`${prefixCls}-title`}>
        {titleIcon && (
          <div className={`${!description && 'only-title-icon'} ${prefixCls}-title-icon`}>
            {titleIcon.constructor === Boolean ? <FileOutlined /> : titleIcon}
          </div>
        )}
        <div className={`${prefixCls}-title-text`} style={{ width: centerWidth }}>
          <h5 className={`${!description && 'only-title'}`}>{title}</h5>
          {!React.isValidElement(description) ? (
            <Dotdotdot className={`${prefixCls}-content-word-break`} clamp={clamp}>
              {description}
            </Dotdotdot>
          ) : (
            description
          )}
        </div>
        {operationContent && (
          <div className={`${prefixCls}-operation`} style={{ width: rightWidth }}>
            {operationContent}
          </div>
        )}
        <div style={{ clear: 'both' }} />
      </div>
      {children && <div className={`${prefixCls}-content`}>{children}</div>}
      {footerContent && <div className={`${prefixCls}-footer`}>{footerContent}</div>}
    </div>
  );
};

export default TitleInfoCard;

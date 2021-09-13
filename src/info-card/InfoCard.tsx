import { usePrefixCls } from '@gio-design/utils';
import classNames from 'classnames';
import React from 'react';
import { InfoCardProps } from './interfaces';

const InfoCard: React.FC<InfoCardProps> = ({ className, style, children, extra, title }) => {
  const prefixCls = usePrefixCls('info-card');
  const classes = classNames(prefixCls, className);

  return (
    <div className={classes} style={style}>
      <div className={`${prefixCls}__header`}>
        {title && <div className={`${prefixCls}__title`}>{title}</div>}
        {extra && <div className={`${prefixCls}__extra`}>{extra}</div>}
      </div>
      <div className={`${prefixCls}__body`}>{children}</div>
    </div>
  );
};

export default InfoCard;

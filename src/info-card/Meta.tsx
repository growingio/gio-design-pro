import { usePrefixCls } from '@gio-design/utils';
import classNames from 'classnames';
import React from 'react';
import { InfoCardMetaProps } from './interfaces';

const Meta: React.FC<InfoCardMetaProps> = ({ style, className, children, label, value, colon = true }) => {
  const prefixCls = usePrefixCls('info-card-meta');
  const classes = classNames(prefixCls, className);

  return (
    <div className={classes} style={style}>
      {label && (
        <div className={classNames(`${prefixCls}__label`, { [`${prefixCls}__label_no_colon`]: !colon })}>{label}</div>
      )}
      {(value || children) && <div className={`${prefixCls}__value`}>{value || children}</div>}
    </div>
  );
};

export default Meta;

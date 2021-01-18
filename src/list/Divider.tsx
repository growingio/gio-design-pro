import React from 'react';
import classnames from 'classnames';
import { DividerProps } from './interfaces';
import { rootPrefixCls } from './utils';

function Divider({ className, style }: DividerProps) {
  const cls = classnames(`${rootPrefixCls()}__divider`, className);
  return <li role="separator" className={cls} style={style} />;
}

export default Divider;

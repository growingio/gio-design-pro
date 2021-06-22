import React from 'react';
import { usePrefixCls } from '@gio-design/components';

import classNames from 'classnames';

import { ToolBarProps } from './interfaces';

import './style/toolBar.less';

const ToolBar: React.FC<ToolBarProps> = (props) => {
  const { children, className, style = {}, float = 'left' } = props;
  const prefix = usePrefixCls('panel__tool-bar');

  return (
    <div className={classNames(prefix, className)} style={Object.assign(style, { float })}>
      {children}
    </div>
  );
};

export default ToolBar;

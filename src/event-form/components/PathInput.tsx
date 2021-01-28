/* eslint-disable @typescript-eslint/no-use-before-define */
import React, { useEffect, useState } from 'react';
import { Input, Toggles, Tooltip } from '@gio-design/components';
import '@gio-design/components/es/components/toggles/style/index.less';
import { isEmpty } from 'lodash';
import { MAX_VALUE_LENGTH } from '../utils';

interface PathValue {
  path?: string;
  checked?: boolean;
}
interface PathProp {
  placeholder?: string;
  maxLength?: number;
  value?: PathValue;
  onChange?: (value: PathValue) => void;
}
const PathInput: React.FC<PathProp> = (props) => {
  const { value = {}, onChange, placeholder, maxLength = MAX_VALUE_LENGTH } = props;

  const [path, setPath] = useState(() => {
    let _path = '';
    if (!value || !value.path) {
      return _path;
    }
    // if (!value.path?.startsWith('/')) {
    //   _path = `/${value.path}`;
    //   triggerChange({ path: _path });
    // } else {
    //   _path = value.path;
    // }
    _path = value.path.startsWith('/') ? value.path : `/${value.path}`;
    return _path;
  });
  const [checked, setChecked] = useState(() => {
    let _checked = false;
    if (!value || !value.path) {
      return _checked;
    }
    _checked = !isEmpty(value.path);
    return _checked;
  });
  useEffect(() => {
    triggerChange({ path, checked });
  }, [path, checked]);
  const triggerChange = (changedValue: PathValue) => {
    onChange?.({ path, checked, ...changedValue });
  };
  const onPathValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value;
    if (val && !val.startsWith('/')) {
      val = `/${val}`;
    }
    setPath(val);
    // triggerChange({ path: val });
  };
  const onToggle = (v: boolean) => {
    setChecked(!!v);
    // triggerChange({ checked: !!v });
  };
  return (
    <div className="path-input">
      <Input
        className="left-input"
        value={path}
        placeholder={placeholder || '请输入路径'}
        maxLength={maxLength}
        disabled={!checked}
        onChange={onPathValueChange}
      />
      <Tooltip title="路径关闭后，将统计该域名下的所有页面" placement="topRight" disabled={checked}>
        <div className="right-toggle">
          <Toggles onChange={onToggle} checked={checked} />
        </div>
      </Tooltip>
    </div>
  );
};

export default PathInput;

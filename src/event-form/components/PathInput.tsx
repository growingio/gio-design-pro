import React, { useState } from 'react';
import { Input, Toggles, Tooltip } from '@gio-design/components';
import { MAX_VALUE_LENGTH } from '../utils';
import '@gio-design/components/es/components/toggles/style/index.less';

interface PathProp {
  placeholder?: string;
  maxLength?: number;
  initValue?: string;
  onChange?: (value?: string) => void;
}

const PathInput: React.FC<PathProp> = (props) => {
  const { initValue, onChange, placeholder } = props;
  const [state, update] = useState(() => {
    let value = initValue;
    let hasPath = true;
    if (value == null) {
      hasPath = false;
    } else if (!value.startsWith('/')) {
      value = `/${value}`;
    }
    return { hasPath, value };
  });

  const onToggle = (v: boolean) => {
    if (v) {
      onChange?.(state.value);
    } else {
      onChange?.(undefined);
    }
    update((prev) => {
      return { ...prev, hasPath: v };
    });
  };

  const onIptChange = (v: any) => {
    let { value } = v.target;

    if (!value.startsWith('/')) {
      value = `/${value}`;
    }
    onChange?.(value);
    update((prev) => {
      return { ...prev, value };
    });
  };

  return (
    <div className="path-input">
      <Input
        className="left-input"
        value={state.value}
        placeholder={placeholder || '请输入路径'}
        maxLength={MAX_VALUE_LENGTH}
        disabled={!state.hasPath}
        onChange={onIptChange}
      />
      <Tooltip title="路径关闭后，将统计该域名下的所有页面" placement="topRight" trigger="hover">
        <Toggles className="right-toggle" onChange={onToggle} defaultChecked={state.hasPath} />
      </Tooltip>
    </div>
  );
};

export default PathInput;

import React, { useEffect, useState } from 'react';
import { Checkbox } from '@gio-design/components';
import { CheckboxProps } from '@gio-design/components/es/components/checkbox/interface';
import { EditOutlined } from '@gio-design/icons';

interface Prop extends CheckboxProps {
  onClickEditor?: Function;
}

const _Checkbox: React.FC<Prop> = (props) => {
  const { onClickEditor, checked, children } = props;

  const [show, updateShow] = useState(false);

  useEffect(() => {
    if (!checked) {
      updateShow(false);
    }
  }, [checked]);

  const onMouseOver = () => {
    if (checked && onClickEditor) {
      updateShow(true);
    }
  };

  const onMouseLeave = () => {
    updateShow(false);
  };

  const onClickEditorSelf = (e: any) => {
    e.preventDefault();
    if (checked) {
      onClickEditor?.(e);
    }
  };

  return (
    <div className="checkbox-editor">
      <Checkbox {...props}>
        <span
          style={{ fontWeight: 'normal' }}
          onMouseOver={onMouseOver}
          onMouseLeave={onMouseLeave}
          onFocus={() => undefined}
        >
          {children}
          <span className="editor" onClick={onClickEditorSelf} onKeyPress={() => undefined} role="button" tabIndex={0}>
            {show && <EditOutlined size="14px" color="#ADB2C2" />}
          </span>
        </span>
      </Checkbox>
    </div>
  );
};

export default _Checkbox;

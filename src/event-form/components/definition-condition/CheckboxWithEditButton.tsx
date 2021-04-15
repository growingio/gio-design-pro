/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-script-url */
import React, { useEffect, useState } from 'react';
import { Checkbox } from '@gio-design/components';
import { CheckboxProps } from '@gio-design/components/es/components/checkbox/interface';
// import { EditOutlined } from '@gio-design/icons';
import { EditOutlined } from '@gio-design/icons';
import { omit } from 'lodash';

// type ButtonClick = React.MouseEventHandler<HTMLElement>;

interface ActionButtonProps {
  onClick?: React.MouseEventHandler<HTMLElement>;
}
interface Prop extends CheckboxProps {
  onEditClick?: () => void;
  actionButton: false | ActionButtonProps;
}

const _Checkbox: React.FC<Prop> = (props) => {
  const { actionButton = false, checked, children } = props;

  const [show, updateShow] = useState(false);

  useEffect(() => {
    if (!checked) {
      updateShow(false);
    }
  }, [checked]);

  const onMouseOver = () => {
    if (checked) {
      updateShow(true);
    }
  };

  const onMouseLeave = () => {
    updateShow(false);
  };
  const showActionButton = () => show && actionButton !== false;
  // return true;
  const editbuttonProps = actionButton === false ? ({} as ActionButtonProps) : actionButton;
  return (
    <div
      className="condition-checkbox-option"
      onMouseLeave={onMouseLeave}
      onMouseOver={onMouseOver}
      onFocus={() => undefined}
    >
      <Checkbox {...omit(props, ['onClick'])}>{children}</Checkbox>
      <span>
        {showActionButton() && (
          <a
            href="#!;"
            // tabIndex={0}
            onClick={(e) => {
              e.preventDefault();
              editbuttonProps.onClick?.(e);
            }}
            className="action-btn"
          >
            <EditOutlined size="14px" color="#ADB2C2" />
          </a>
        )}
      </span>
    </div>
  );
};

export default _Checkbox;

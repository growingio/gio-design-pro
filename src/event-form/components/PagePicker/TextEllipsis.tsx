import React, { useEffect, useRef, useState } from 'react';
import { Tooltip } from '@gio-design/components';
// import styled from 'styled-components';

// 文本溢出自动使用...代替，并且有弹出title
const TextEllipsis: React.FC = (props) => {
  const root = useRef<any>();
  const [showTitle, update] = useState(false);
  const { children } = props;
  const text: any = children;

  useEffect(() => {
    const div = root.current;
    const width = div.clientWidth;
    const textWidth = div.scrollWidth;

    if (textWidth > width) {
      update(true);
    } else {
      update(false);
    }
  }, [text]);

  const overflowText = (
    <span ref={root} className="over-flow-text">
      {text}
    </span>
  );
  const wrapText = (
    <Tooltip title={<>{text}</>} placement="topRight">
      <span ref={root} className="over-flow-text">
        {text}
      </span>
    </Tooltip>
  );
  return showTitle ? wrapText : overflowText;
};

export default TextEllipsis;

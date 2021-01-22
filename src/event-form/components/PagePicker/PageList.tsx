/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/no-array-index-key */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import { TagElement } from '../../TagElement';
import OverFlowText from './TextEllipsis';

interface Prop {
  tags: any[];
  value: any;
  // 在search状态下
  inSearch: boolean;
  onSelect?: (v: any, index?: number) => void;
  labelRenderer?: (tag: TagElement) => JSX.Element;
}

const PageList: React.FC<Prop> = (props) => {
  const { tags, value, onSelect, labelRenderer } = props;

  const [select, updateSelect] = useState(value);

  const onListClick = (e: any) => {
    let elem: any = e.target;
    let idx;
    // eslint-disable-next-line no-cond-assign
    while (elem && !(idx = elem.dataset.index)) {
      elem = elem.parentElement;
    }
    if (idx) {
      const tag = tags[idx];
      updateSelect(tag);
      onSelect?.(tag, +idx);
    }
  };

  if (!tags?.length) {
    return (
      <div className="empty-page-list">
        {/* <img src={require('../../assets/empty.png')} alt="空的" />
        <span>{inSearch ? '无搜索结果' : '当前页面尚未被定义'}</span> */}
      </div>
    );
  }

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events
    <div className="page-list" onClick={onListClick}>
      {tags.map((opt, idx) => {
        const showText = labelRenderer ? labelRenderer(opt) : opt.name;
        return (
          <div
            key={idx}
            data-index={idx}
            className={`page-list-item ${select && opt.id === select.id ? 'selected' : ''}`}
          >
            <OverFlowText>{showText}</OverFlowText>
          </div>
        );
      })}
    </div>
  );
};

export default PageList;

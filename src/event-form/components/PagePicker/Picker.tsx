/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable @typescript-eslint/no-use-before-define */
import React, { useEffect, useRef, useState } from 'react';
import { Button, SearchBar } from '@gio-design/components';
import './index.less';
import { DownFilled, PlusCircleFilled } from '@gio-design/icons';
import useUpdate from '../../../hooks/useUpdate';
import { isChildOfElement } from '../../utils';
import PageList from './PageList';
// import PlusCircleFilled from '@gio-design/icons/es/PlusCircleFilled';
import { Element as TagElement } from '../../../types';

interface Prop {
  // 去定义定的页面
  onDefineNewPage: (e?: any) => void;
  currentPageTags: TagElement[];
  relatedPageTags: TagElement[];
  onSelect?: (selectedPageTag: TagElement) => void;
}

// 失去焦点是 判断当前页面为空 提示错误
const PagePicker: React.FC<Prop> = (props) => {
  const { currentPageTags, relatedPageTags, onSelect, onDefineNewPage } = props;

  const root = useRef<any>();
  const [expand, setExpand] = useState(false);
  const [searchText, updateSearchText] = useState('');
  const [value, setValue] = useState<TagElement>();
  const [hasError] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    document.body.addEventListener('click', cancelExpand);
    return () => {
      document.body.removeEventListener('click', cancelExpand);
    };
  }, []);

  useEffect(() => {
    const page = currentPageTags?.[0];
    if (page) {
      onSelect?.(page);
    }
    setValue(page);
  }, [currentPageTags]);

  useUpdate(() => {
    let error = false;
    if (!expand && !value) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      error = true;
    }
    // 不提示页面选择的error
    // updateError(error);
  }, [expand, value]);

  /**
   * 隐藏页面选中面板
   */
  const cancelExpand = (e: any) => {
    if (!isChildOfElement(e.target, root.current)) {
      setExpand(false);
      updateSearchText('');
    }
  };

  /**
   * 搜索文本变化
   * @param nv 文本值
   */
  const onSearchBarChange = (nv: any) => {
    updateSearchText(nv);
  };

  /**
   * 页面列表选择器选中响应
   * @param tag  在相似页面中选中的tag
   * @param index
   */
  const onPageListSelected = (tag: TagElement) => {
    onSelect?.(tag);
    setValue(tag);
    setExpand(false);
  };

  /**
   * 把tag装换为显示的值
   * @param tag
   */
  const tagToValue = (tag: TagElement) => {
    const isCurrent = currentPageTags?.findIndex((v) => v.id === tag.id) !== -1;
    const { path } = tag.definition;
    let text = `${tag.name} | ${tag.definition.domain}${path || '下的所有页面'}`;
    // 是小程序
    if (tag.platforms.includes('minp')) {
      text = `${tag.name} | ${path || '小程序所有页面'}`;
    }
    return (
      <>
        {isCurrent && (
          <span
            style={{
              color: '#1248e9',
              marginRight: 4,
            }}
          >
            [当前页]
          </span>
        )}
        <span>{text}</span>
      </>
    );
  };

  return (
    <div ref={root} className={`page-selector ${hasError ? 'page-selector-error' : ''}`}>
      <div className={`page-selector-input ${expand ? 'focus' : ''}`} onClick={() => setExpand(!expand)}>
        {value ? tagToValue(value) : <span className="placeholder">请选择所属页面</span>}
        <DownFilled className="down-icon" color="#abb2c3" style={{ transform: expand ? 'rotate(180deg)' : 'none' }} />
      </div>
      {hasError && <span className="page-selector-error-text">所属页面不能为空</span>}
      {expand && (
        <div className="page-selector-dropdown">
          <div className="page-search-box">
            <SearchBar
              id="page-search"
              placeholder="搜索页面名称"
              value={searchText}
              onChange={onSearchBarChange}
              showClear
            />
          </div>
          <PageList
            value={value}
            tags={relatedPageTags.filter((v) => v.name.includes(searchText))}
            labelRenderer={tagToValue}
            inSearch={!!searchText}
            onSelect={onPageListSelected}
          />
          <div className="page-selector-footer">
            <Button size="small" type="text" icon={<PlusCircleFilled />} onClick={onDefineNewPage}>
              <span style={{ marginLeft: 8 }}>定义新页面</span>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PagePicker;

import { Tooltip } from '@gio-design/components';
import { isEqualWith } from 'lodash';
import React, { useState, useMemo, useRef, useEffect } from 'react';
import List from '../../../list';
import { ListItemProps } from '../../../list/interfaces';
import { TagElement } from '../../TagElement';

export interface ListOption {
  isCurrent?: boolean;
  // name?: string;
  // tagElement: TagElement;

  label?: string;
  key?: string;
  value?: TagElement;
}
interface PageListProps {
  dataSource: ListOption[];
  value?: ListOption;
  // labelRenderer?: (item: ListOption) => React.ReactNode;
  onSelect?: (value: ListOption) => void;
  onChange?: (value: ListOption) => void;
  // width: string;
  // height: string;
}
const InnerItem = (props: ListOption) => {
  const { isCurrent = false, label = '' } = props;
  const [overflow, setOverflow] = useState(false);
  const outRef = useRef<HTMLSpanElement | null>(null);
  useEffect(() => {
    const scrollWidth = outRef?.current?.scrollWidth || 0;
    const clientWidth = outRef?.current?.clientWidth || 0;
    const isOverflow = scrollWidth > clientWidth;
    setOverflow(isOverflow);
  }, [label]);

  return (
    <Tooltip title={<span style={{ wordBreak: 'break-all' }}>{label}</span>} disabled={!overflow}>
      <span className="list__item-inner" ref={outRef}>
        <span>
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
          <span>{label}</span>
        </span>
      </span>
    </Tooltip>
  );
};
const PageList = (props: PageListProps) => {
  const { dataSource = [], onSelect, onChange, value } = props;
  const renderLabel = (option: ListOption) => <InnerItem {...option} />;

  const [selectValue, setSelectValue] = useState<ListOption | undefined>(value);
  function valueEqual(one: ListOption = {}, other: ListOption) {
    return isEqualWith(one, other, (a, b) => a?.key === b.key);
  }
  function handleListItemClick(option: ListOption) {
    onSelect?.(option);
    if (!valueEqual(selectValue, option)) {
      onChange?.(option);
    }
    setSelectValue(option);
  }
  // useEffect(()=>{
  //   isEqual()
  // },[selectValue])
  const listDataSource: ListItemProps[] = useMemo(() => {
    // const datas = dataSource.filter((v) => !searchvalue || v.name.includes(searchvalue));
    const options = dataSource.map((option: ListOption) => {
      const item: ListItemProps = {
        children: renderLabel(option),
        key: option.key,
        ellipsis: true,
        className: valueEqual(selectValue, option) ? 'selected' : '',
        onClick: () => {
          handleListItemClick(option);
        },
      };
      return item;
    });
    // console.log(options);

    return options || [];
  }, [dataSource, selectValue]);
  return <List items={listDataSource} />;
};
export default PageList;

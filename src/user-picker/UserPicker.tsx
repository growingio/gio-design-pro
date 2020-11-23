import * as React from 'react';
import _ from 'lodash';
import { PlusOutlined } from '@gio-design/icons';
import Alert from '@gio-design/components/es/components/alert';
import SearchBar from '@gio-design/components/es/components/search-bar';
import List from '@gio-design/components/es/components/list';
import Loading from '@gio-design/components/es/components/loading';
import TabNav from '@gio-design/components/es/components/tab-nav';
import Button from '@gio-design/components/es/components/button';
import { Option } from '@gio-design/components/es/components/list/interface';
import EmptyPrompt from '../empty-prompt';
import { UserPickerProps, PreparedSegment } from './interfaces';
import { segmentToOption } from './utils';
import { Segment } from '../types';

function UserPicker({
  preparedSegments,
  segments,
  userId,
  loading,
  mode = 'single',
  onSelect,
  onCreateSegment,
}: UserPickerProps) {
  const mappedSegements = React.useMemo<{ [key: string]: PreparedSegment | Segment }>(
    () => _.keyBy([...preparedSegments, ...segments], 'id'),
    [preparedSegments, segments]
  );
  const [query, setQuery] = React.useState<string>('');
  const [scope, setScope] = React.useState<string>('my');
  const [values, setValues] = React.useState<(PreparedSegment | Segment)[]>([]);

  let dataSource: Option[];
  if (scope === 'my') {
    const preparedOptions = preparedSegments.map((seg) => {
      return segmentToOption(seg, { key: 'prepared', label: '预定义' });
    });
    const myOptions = _.filter(segments, (d) => d.creatorId === userId).map((seg) => {
      return segmentToOption(seg, { key: 'other', label: '其他' });
    });
    dataSource = [...preparedOptions, ...myOptions];
  } else {
    dataSource = [...preparedSegments, ...segments].map((seg) => segmentToOption(seg));
  }

  function onListSelect(selectedValue: string) {
    const current = mappedSegements[selectedValue];
    const currentValues = [...values, current];
    setValues(currentValues);
    onSelect?.(current, currentValues);
  }

  function renderSegs() {
    if (loading) {
      return (
        <div className="gio-loading-wrapper">
          <Loading />
        </div>
      );
    }
    const filterData = _.filter(dataSource, (option) =>
      option.label.toLocaleLowerCase().includes(query.toLocaleLowerCase())
    );
    if (query && filterData.length === 0) {
      return (
        <EmptyPrompt description="无搜索结果">
          <Button type="secondary" onClick={onCreateSegment}>
            创建分群
          </Button>
        </EmptyPrompt>
      );
    }
    return (
      <List isMultiple={mode === 'multiple'} onSelect={onListSelect} dataSource={filterData} width={352} height={406} />
    );
  }
  return (
    <div className="gio-user-picker">
      <div className="gio-user-picker__header">
        <SearchBar id="user-picker-search-bar" size="middle" value={query} onChange={setQuery} />
        <Button type="secondary" icon={<PlusOutlined />} onClick={onCreateSegment} />
        {query.length > 200 && (
          <Alert type="warning" message="搜索字符长度已超过 200，只取前 200 字符搜索" size="small" showIcon closeable />
        )}
      </div>
      <TabNav
        type="line"
        size="small"
        onChange={(key: string | number) => {
          setScope(key as string);
        }}
      >
        <TabNav.Item key="my">我的</TabNav.Item>
        <TabNav.Item key="all">全部</TabNav.Item>
      </TabNav>
      {renderSegs()}
    </div>
  );
}

export default UserPicker;

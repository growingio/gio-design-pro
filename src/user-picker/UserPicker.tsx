import * as React from 'react';
import { filter, keyBy, includes, uniq } from 'lodash';
import { PlusOutlined } from '@gio-design/icons';
import { format } from 'date-fns/fp';
import Tag from '@gio-design-new/components/es/components/tag';
import { NodeData } from '@gio-design-new/components/es/components/cascader/interface';
import usePrefixCls from '@gio-design-new/components/es/utils/hooks/use-prefix-cls';
import BasePicker from '../picker';
import { UserPickerProps, PreparedSegment } from './interfaces';
import { segmentToNode } from './utils';
import { Segment } from '../types';
import { useLocalStorage } from '../hooks';

function UserPicker({
  visible,
  onVisibleChange,
  preparedSegments,
  segments,
  userId,
  onSelect,
  onCreateSegment,
  ...restProps
}: UserPickerProps) {
  const prefixCls = usePrefixCls('user-picker');
  const mappedSegements = React.useMemo<{ [key: string]: PreparedSegment | Segment }>(
    () => keyBy([...preparedSegments, ...segments], 'id'),
    [preparedSegments, segments]
  );
  const [recentSegments, setRecentSegments] = useLocalStorage<string[]>(`${userId}-segments`, []);
  const [query, setQuery] = React.useState<string>('');
  const [scope, setScope] = React.useState<string>('my');
  const [showValue, setShowValue] = React.useState<string>('');
  const [values, setValues] = React.useState<(PreparedSegment | Segment)[]>([]);
  const [pickerVisible, setPickerVisible] = React.useState<boolean>(!!visible);

  function filterSegment(s: Segment) {
    if (query.length > 0) {
      return includes(s.name.toLocaleLowerCase(), query) || includes(s.creator?.toLocaleLowerCase(), query);
    }
    return true;
  }

  function onMenuSelect(nodeData: NodeData) {
    setShowValue(!nodeData.label ? '' : nodeData.label);
    setPickerVisible(false);
    onVisibleChange?.(false);
    const id = nodeData.id as string;
    const current = mappedSegements[id];
    const currentValues = [...values, current];
    setValues(currentValues);
    const segIds = uniq([id, ...recentSegments]);
    if (segIds.length > 5) {
      setRecentSegments(segIds.slice(0, 5));
    } else {
      setRecentSegments(segIds);
    }
    onSelect?.(current, currentValues);
  }

  function onMenuHover(nodeData: NodeData) {
    const segPrefixCls = `${prefixCls}-segment`;
    const seg = mappedSegements[nodeData.id as string];
    let content = null;
    if ('creator' in seg) {
      const segment = seg as Segment;
      content = (
        <>
          <div className={`${segPrefixCls}__label`}>分群人数和占比：</div>
          <div className={`${segPrefixCls}__tags`}>
            <Tag>{segment.detector?.totalUsers}</Tag>
            <Tag>{`${((segment.detector?.usersRatio ? segment.detector.usersRatio : 0) * 100)?.toFixed(2)}%`}</Tag>
          </div>
          <div className={`${segPrefixCls}__label`}>创建人 & 更新时间：</div>
          <div className={`${segPrefixCls}__value`}>
            {segment.creator} | {format('yyyy/MM/dd', new Date(segment.updatedAt))}
          </div>
        </>
      );
    }
    return (
      <div className={segPrefixCls}>
        <h4 className={`${segPrefixCls}__name`}>{seg.name}</h4>
        {content}
      </div>
    );
  }

  function onPickerVisibleChange(current: boolean) {
    setPickerVisible(current);
    onVisibleChange?.(current);
  }

  const dataSource = React.useMemo(() => {
    if (scope === 'my') {
      const recentNodes = recentSegments
        .filter((id) => !!mappedSegements[id])
        .map((id) => {
          return segmentToNode(mappedSegements[id], { id: 'recent', name: '最近使用' });
        });
      const preparedNodes = preparedSegments.map((seg) => {
        return segmentToNode(seg, { id: 'prepared', name: '预定义' });
      });
      const myNodes = filter(segments, (s) => s.creatorId === userId && filterSegment(s)).map((seg) => {
        return segmentToNode(seg, { id: 'other', name: '其他' });
      });

      return [...recentNodes, ...preparedNodes, ...myNodes];
    }
    return [...preparedSegments, ...filter(segments, filterSegment)].map((seg) => segmentToNode(seg));
  }, [preparedSegments, segments, recentSegments, scope, query]);

  const items = React.useRef([
    { key: 'my', children: '我的' },
    { key: 'all', children: '全部' },
  ]);

  return (
    <BasePicker
      {...restProps}
      visible={pickerVisible}
      onVisibleChange={onPickerVisibleChange}
      inputValue={showValue}
      searchPlaceholder="搜索分群名或创建人"
      onSearch={setQuery}
      tabNav={{
        items: items.current,
        onChange: setScope,
      }}
      actionButton={{ icon: <PlusOutlined />, onClick: onCreateSegment }}
      dataSource={dataSource}
      onHoverPanelShow={onMenuHover}
      onSelect={onMenuSelect}
      groupVisible={scope !== 'all'}
    />
  );
}

export default UserPicker;

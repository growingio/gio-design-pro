import React from 'react';
import { filter, keyBy, includes, uniq, debounce } from 'lodash';
import { Button } from '@gio-design/components';
import { PlusCircleFilled } from '@gio-design/icons';
import BasePicker from '../base-picker';
import SegmentCard from './SegmentCard';
import { useLocalStorage } from '../hooks';
import { UserPickerProps } from './interfaces';
import { resourceToItem } from '../utils';
import { preparedSegments } from './constant';
import { Resource } from '../utils/interfaces';

function UserPicker({
  itemOnHoverDelay = 750,
  segments,
  userId,
  onSelect,
  onCreateSegment,
  updatingRecentDelay = 0,
}: UserPickerProps) {
  const mappedSegements = React.useMemo<{ [key: string]: Resource }>(
    () => keyBy([...preparedSegments, ...segments], 'id'),
    [preparedSegments, segments]
  );
  const [hoveredResource, setHoveredResource] = React.useState<Resource>();
  const [recentSegments, setRecentSegments] = useLocalStorage<string[]>(`${userId}-segments`, []);
  const [query, setQuery] = React.useState<string>('');
  const [scope, setScope] = React.useState<string>('my');
  const [detailVisible, setDetailVisible] = React.useState(false);
  const detailDebounced = debounce(() => {
    setDetailVisible(true);
  }, itemOnHoverDelay);

  function filterSegment(s: Resource) {
    if (query.length > 0) {
      return includes(s.name.toLocaleLowerCase(), query) || includes(s.creator?.toLocaleLowerCase(), query);
    }
    return true;
  }

  function mapResource(current: Resource) {
    const onClick = () => {
      onSelect?.(current.id, current);
      const updateRecent = () => {
        const segIds = uniq([current.id, ...recentSegments]);
        if (segIds.length > 5) {
          setRecentSegments(segIds.slice(0, 5));
        } else {
          setRecentSegments(segIds);
        }
      };
      if (updatingRecentDelay > 0) {
        debounce(updateRecent, updatingRecentDelay)();
      } else {
        updateRecent();
      }
    };
    const onMouseEnter = () => {
      setHoveredResource(current);
      detailDebounced();
    };
    const onMouseLeave = () => {
      setHoveredResource(undefined);
      detailDebounced.cancel();
      setDetailVisible(false);
    };
    return resourceToItem(current, { onClick, onMouseEnter, onMouseLeave });
  }

  const dataSource = React.useMemo(() => {
    if (scope === 'my') {
      const preparedGroup = {
        key: 'prepared',
        title: '预定义',
        items: preparedSegments.map(mapResource),
      };
      const otherGroup = {
        key: 'other',
        title: '其他',
        items: filter(segments, (s) => s.creatorId === userId && filterSegment(s)).map(mapResource),
      };
      if (recentSegments.length > 0) {
        const recentGroup = {
          key: 'recent',
          title: '最近使用',
          items: recentSegments.filter((id) => !!mappedSegements[id]).map((id) => mapResource(mappedSegements[id])),
        };
        return [recentGroup, preparedGroup, otherGroup];
      }
      return [preparedGroup, otherGroup];
    }
    return [...preparedSegments, ...filter(segments, filterSegment)].map(mapResource);
  }, [preparedSegments, segments, recentSegments, scope, query]);

  const items = React.useRef([
    { key: 'my', children: '我的' },
    { key: 'all', children: '全部' },
  ]);
  const footer = (
    <Button type="text" icon={<PlusCircleFilled />} size="small" onClick={onCreateSegment}>
      新建分群
    </Button>
  );
  return (
    <BasePicker
      searchBar={{
        placeholder: '搜索分群名',
        onSearch: setQuery,
      }}
      tabNav={{
        items: items.current,
        onChange: setScope,
      }}
      items={dataSource}
      footer={footer}
      detailVisible={detailVisible}
      renderDetail={() => hoveredResource && <SegmentCard {...hoveredResource} />}
    />
  );
}

export default UserPicker;

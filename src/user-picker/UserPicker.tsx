import React from 'react';
import { filter, keyBy, includes, uniq, debounce, pick } from 'lodash';
import { Button } from '@gio-design/components';
import { PlusCircleFilled } from '@gio-design/icons';
import { useLocale } from '@gio-design/utils';
import type { Locale } from '@gio-design/utils';
import BasePicker from '../base-picker';
import SegmentCard from './SegmentCard';
import { useLocalStorage } from '../hooks';
import { UserPickerProps } from './interfaces';
import { resourceToItem } from '../utils';
import { preparedSegmentsCN, preparedSegmentsEn } from './constant';
import { Resource } from '../utils/interfaces';
import defaultLocale from './locales/zh-CN';
import localeEn from './locales/en-US';

function UserPicker({
  itemOnHoverDelay = 750,
  segments,
  userId,
  onSelect,
  onCreateSegment,
  showSegmentCard = true,
  disabledValues = [],
  updatingRecentDelay = 0,
  onShowSegmentChart,
}: UserPickerProps) {
  const _locale = useLocale('UserPicker');
  const language = localStorage.getItem('locale') || 'zh-CN';
  const locale = _locale || (language === 'en-US' ? localeEn : ({} as Locale));
  const { locale: contextLocale } = { locale: { code: language } };
  const { code } = contextLocale || { code: 'zh-CN' };
  const preparedSegments = code === 'en-US' ? preparedSegmentsEn : preparedSegmentsCN;
  const { preparedText, otherText, rencentText, myText, allText, placeholderText, createSegment } = {
    ...defaultLocale,
    ...locale,
  } as any;
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
    const disabled = !!disabledValues && disabledValues.includes(current.id);
    return resourceToItem(current, { onClick, onMouseEnter, onMouseLeave }, disabled);
  }

  const dataSource = React.useMemo(() => {
    if (scope === 'my') {
      const preparedGroup = {
        key: 'prepared',
        title: preparedText,
        items: filter(preparedSegments, (s) => filterSegment(s)).map(mapResource),
      };
      const otherGroup = {
        key: 'other',
        title: otherText,
        items: filter(segments, (s) => s.creatorId === userId && filterSegment(s)).map(mapResource),
      };
      if (recentSegments.length > 0) {
        const recentGroup = {
          key: 'recent',
          title: rencentText,
          items: recentSegments
            .filter((id) => !!mappedSegements[id] && filterSegment(mappedSegements[id]))
            .map((id) => mapResource(mappedSegements[id])),
        };
        return [recentGroup, preparedGroup, otherGroup];
      }
      return [preparedGroup, otherGroup];
    }
    return [...preparedSegments, ...filter(segments, filterSegment)].map(mapResource);
  }, [preparedSegments, segments, recentSegments, scope, query, disabledValues]);

  const items = React.useRef([
    { key: 'my', children: myText },
    { key: 'all', children: allText },
  ]);
  const footer = (
    <Button type="text" icon={<PlusCircleFilled />} size="small" onClick={onCreateSegment}>
      {createSegment}
    </Button>
  );
  return (
    <BasePicker
      searchBar={{
        placeholder: placeholderText,
        onSearch: setQuery,
      }}
      tabNav={{
        items: items.current,
        onChange: setScope,
      }}
      items={dataSource}
      footer={footer}
      detailVisible={showSegmentCard && detailVisible}
      renderDetail={() =>
        showSegmentCard &&
        hoveredResource && <SegmentCard {...hoveredResource} chart={onShowSegmentChart(hoveredResource)} />
      }
    />
  );
}

export default UserPicker;

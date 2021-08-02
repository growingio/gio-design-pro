import React from 'react';
import { TabNav } from '@gio-design/components';
import InputTrigger from '@gio-design/components/es/selector/InputTrigger';
import { usePrefixCls } from '@gio-design/utils';
import { CalendarOutlined } from '@gio-design/icons';
import moment from 'moment';
import { format, parse, startOfToday, subDays } from 'date-fns';
import { DATE_FORMAT, END_DATE_MAPPING } from './constant';
import { EndDateFixedMode, RangeHeaderProps } from './interfaces';

const SinceRangeHeader: React.FC<RangeHeaderProps> = ({
  dateRange,
  onRangeChange,
  onModeChange,
  experimental,
}: RangeHeaderProps) => {
  const endDateKeys = ['today', experimental ? 'yesterday' : undefined];
  const [start, setStart] = React.useState<string>();
  const [endKey, setEndKey] = React.useState<string>();
  const prefixCls = usePrefixCls('range-panel');

  const handleDateChange = (currentStart: string | undefined, currentEndKey: string | undefined) => {
    if (moment(currentStart, DATE_FORMAT, true).isValid()) {
      const startDate = parse(currentStart, DATE_FORMAT, new Date());
      const endDate = subDays(startOfToday(), endDateKeys.indexOf(currentEndKey));
      onRangeChange([startDate, endDate]);
    }
    setStart(currentStart);
    setEndKey(currentEndKey);
  };

  React.useEffect(() => {
    // setStart(dateRange[0] ? dateRange[0].format(DATE_FORMAT) : '');
    setEndKey(dateRange[1] ? endDateKeys[moment().diff(dateRange[1], 'days')] : 'today');
  }, [dateRange]);

  return (
    <>
      <span className={`${prefixCls}__header__text`}>从</span>
      <span className={`${prefixCls}__header__input`}>
        <InputTrigger
          suffix={<CalendarOutlined />}
          itemRender={() => (dateRange[0] ? format(dateRange[0], DATE_FORMAT) : undefined)}
          placeholder="选择日期"
        />
      </span>
      <span className={`${prefixCls}__header__options`}>
        <TabNav
          size="middle"
          defaultActiveKey={endKey}
          onChange={(key) => {
            handleDateChange(start, key);
            onModeChange?.(key as EndDateFixedMode);
          }}
        >
          {endDateKeys.map((o: string) => o && <TabNav.Item key={o}>{END_DATE_MAPPING[o]}</TabNav.Item>)}
        </TabNav>
      </span>
    </>
  );
};

export default SinceRangeHeader;

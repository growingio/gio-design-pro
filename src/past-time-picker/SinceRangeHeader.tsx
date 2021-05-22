import React from 'react';
import { Input, TabNav } from '@gio-design/components';
import { usePrefixCls } from '@gio-design/utils';
import { CalendarOutlined } from '@gio-design/icons';
import moment from 'moment';
import { EndDateFixedMode, RangeHeaderProps } from './interfaces';
import { DATE_FORMAT, END_DATE_MAPPING } from './constant';

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
      const startDate = moment(currentStart, DATE_FORMAT);
      const endDate = moment().startOf('day').subtract(endDateKeys.indexOf(currentEndKey), 'days');
      onRangeChange([startDate, endDate]);
    }
    setStart(currentStart);
    setEndKey(currentEndKey);
  };

  React.useEffect(() => {
    setStart(dateRange[0] ? dateRange[0].format(DATE_FORMAT) : '');
    setEndKey(dateRange[1] ? endDateKeys[moment().diff(dateRange[1], 'days')] : 'today');
  }, [dateRange]);

  return (
    <>
      <span className={`${prefixCls}__header__text`}>从</span>
      <span className={`${prefixCls}__header__input`}>
        <Input
          size="middle"
          suffix={<CalendarOutlined />}
          value={start}
          onChange={(e) => {
            handleDateChange(e.target.value, endKey);
          }}
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

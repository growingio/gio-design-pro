import React from 'react';
import moment from 'moment';
import RangeInput from './RangeInput';
import { RangeHeaderProps } from './interfaces';
import { DATE_FORMAT } from './constant';

const AbsoluteRangeHeader: React.FC<RangeHeaderProps> = ({ dateRange, onRangeChange }: RangeHeaderProps) => {
  const [start, setStart] = React.useState<string>();
  const [end, setEnd] = React.useState<string>();

  const handleDateChange = (startDate: string | undefined, endDate: string | undefined) => {
    if (moment(startDate, DATE_FORMAT, true).isValid() && moment(endDate, DATE_FORMAT, true).isValid()) {
      onRangeChange([moment(startDate, DATE_FORMAT), moment(endDate, DATE_FORMAT).endOf('day')]);
    }
    setStart(startDate);
    setEnd(endDate);
  };

  React.useEffect(() => {
    setStart(dateRange[0] ? dateRange[0].format(DATE_FORMAT) : '');
    setEnd(dateRange[1] ? dateRange[1].format(DATE_FORMAT) : '');
  }, [dateRange]);

  return (
    <RangeInput
      startDate={start}
      endDate={end}
      onStartDateChange={(date) => {
        handleDateChange(date, end);
      }}
      onEndDateChange={(date) => {
        handleDateChange(start, date);
      }}
    />
  );
};

export default AbsoluteRangeHeader;

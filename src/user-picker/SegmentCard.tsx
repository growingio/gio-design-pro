import React from 'react';
import { format } from 'date-fns/fp';
import classnames from 'classnames';
import { Card, Tag } from '@gio-design/components';
import usePrefixCls from '@gio-design/components/es/utils/hooks/use-prefix-cls';
import { CalendarOutlined } from '@gio-design/icons';
import { useLocale } from '@gio-design/utils';
import { SegmentCardProps } from './interfaces';
import defaultLocale from './locales/zh-CN';

function SegmentCard({ className, style, name, detector, chart, creator, updatedAt }: SegmentCardProps) {
  const prefixCls = usePrefixCls('segment-card');
  const locale = useLocale('UserPicker');
  const { updatedTime, segmentNumber, segmentRatio, creatorText } = { ...defaultLocale, ...locale } as any;
  const cls = classnames(prefixCls, className);
  const footer = updatedAt && (
    <div className={`${prefixCls}__footer`}>
      <CalendarOutlined className={`${prefixCls}__footer__icon`} size="14px" />
      <span>
        {`${updatedTime}`}：{format('yyyy/MM/dd', new Date(updatedAt))}
      </span>
    </div>
  );
  return (
    <Card className={cls} style={style} footer={footer} clickable={false}>
      <Card.Meta title={name} />
      {detector && (
        <>
          <Card.Meta>
            <span>{`${segmentNumber}:`}</span>
            <Tag>{detector.totalUsers}</Tag>
          </Card.Meta>
          <Card.Meta>
            <span>{`${segmentRatio}:`}</span>
            <Tag>{`${(detector.usersRatio * 100).toFixed(2)}%`}</Tag>
          </Card.Meta>
        </>
      )}
      {chart && (
        <Card.Meta>
          <div className={`${prefixCls}__chart`}>{chart}</div>
        </Card.Meta>
      )}
      {creator && (
        <Card.Meta>
          {`${creatorText}:`}
          <Tag>{creator}</Tag>
        </Card.Meta>
      )}
    </Card>
  );
}

export default SegmentCard;

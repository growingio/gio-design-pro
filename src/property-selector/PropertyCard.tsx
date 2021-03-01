// import { NodeData } from '@gio-design/components/es/components/cascader/interface';
// import { TagOutlined, UserOutlined, MapChartOutlined, LocationRecoveryOutlined } from '@gio-design/icons';
import usePrefixCls from '@gio-design/components/es/utils/hooks/use-prefix-cls';
import React from 'react';
import { Card, Tag, Loading } from '@gio-design/components';
import {
  NumberTypeOutlined,
  ListTypeOutlined,
  StringTypeOutlined,
  DateTypeOutlined,
  BooleanTypeOutlined,
} from '@gio-design/icons';
import { PropertyTypes, PropertyCardProps } from './interfaces';
import useAsync from './useAsync';

const ValueTypeMap: { [key: string]: [string, React.ReactElement] } = {
  string: ['字符串类型', <StringTypeOutlined size="14px" />],
  int: ['数值类型', <NumberTypeOutlined size="14px" />],
  double: ['数值类型', <NumberTypeOutlined size="14px" />],
  date: ['日期类型', <DateTypeOutlined size="14px" />],
  boolean: ['布尔类型', <BooleanTypeOutlined size="14px" />],
  list: ['列表类型', <ListTypeOutlined size="14px" />],
};

function PropertyCard(props: PropertyCardProps) {
  const { fetchData, nodeData } = props;
  const { loading, value: data } = useAsync(async () => {
    const res = await fetchData?.(nodeData);
    return res;
  }, [nodeData]);
  const prefixCls = usePrefixCls('property-picker');
  const propCardPrefixCls = `${prefixCls}-card`;
  return (
    <Card className={propCardPrefixCls}>
      <Loading size="small" title={false} loading={loading}>
        <Card.Meta style={{ minHeight: '40px' }}>
          <Card.Meta>
            <span className={`${propCardPrefixCls}-title`}>{data?.name}</span>
            {data?.type && (
              <Tag size="small" status="draft">
                {PropertyTypes[data?.type ?? ''] || ''}
              </Tag>
            )}
            <div className={`${propCardPrefixCls}-key`}>{data?.key ?? data?.id}</div>
          </Card.Meta>
          {data?.description && <Card.Meta>{data?.description}</Card.Meta>}
          {data?.valueType && (
            <Card.Meta>
              <div className={`${propCardPrefixCls}__divide`} />
              <div className={`${propCardPrefixCls}__footer`}>
                <span className={`${propCardPrefixCls}__footer__icon`}>{ValueTypeMap[data?.valueType ?? ''][1]}</span>
                {ValueTypeMap[data?.valueType ?? ''][0]}
              </div>
            </Card.Meta>
          )}
        </Card.Meta>
      </Loading>
    </Card>
  );
}
export default PropertyCard;

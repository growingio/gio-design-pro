// import { NodeData } from '@gio-design/components/es/components/cascader/interface';
// import { TagOutlined, UserOutlined, MapChartOutlined, LocationRecoveryOutlined } from '@gio-design/icons';
import usePrefixCls from '@gio-design/components/es/utils/hooks/use-prefix-cls';
import React, { useEffect, useState } from 'react';
import { Card, Tag, Loading } from '@gio-design/components';
import { NumberChartOutlined } from '@gio-design/icons';
import { PropertyInfo, PropertyTypes, PropertyCardProps } from './interfaces';

const ValueTypeMap: { [key: string]: [string, React.ReactElement] } = {
  string: ['字符串类型', <NumberChartOutlined size="14px" />],
  int: ['数值类型', <NumberChartOutlined size="14px" />],
  double: ['数值类型', <NumberChartOutlined size="14px" />],
  date: ['日期类型', <NumberChartOutlined size="14px" />],
  boolean: ['布尔类型', <NumberChartOutlined size="14px" />],
  list: ['列表类型', <NumberChartOutlined size="14px" />],
};

function PropertyCard(props: PropertyCardProps) {
  const { fetchData, nodeData } = props;
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<PropertyInfo>({});
  useEffect(() => {
    setLoading(true);
    let isMounted = true;
    fetchData(nodeData)
      .then((res) => {
        if (isMounted) {
          setData(res);
        }
      })
      .finally(() => {
        if (isMounted) {
          setLoading(false);
        }
      });
    return () => {
      isMounted = false;
    };
  }, [nodeData]);
  const prefixCls = usePrefixCls('property-picker');
  const propCardPrefixCls = `${prefixCls}-card`;
  return (
    <Loading size="small" title={false} loading={loading}>
      <Card className={propCardPrefixCls}>
        <Card.Meta>
          <span className={`${propCardPrefixCls}-title`}>{data?.name}</span>
          {data?.type && (
            <Tag size="small" status="draft">
              {PropertyTypes[data?.type ?? ''] || ''}
            </Tag>
          )}
          <div className={`${propCardPrefixCls}-key`}>{data?.id}</div>
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
      </Card>
    </Loading>
  );
}
export default PropertyCard;

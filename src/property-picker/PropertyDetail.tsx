import { NodeData } from '@gio-design-new/components/es/components/cascader/menu-item';
// import { TagOutlined, UserOutlined, MapChartOutlined, LocationRecoveryOutlined } from '@gio-design/icons';
import { Loading, Tag } from '@gio-design-new/components';
import usePrefixCls from '@gio-design-new/components/es/utils/hooks/use-prefix-cls';
import React, { useEffect, useState } from 'react';
import { PropertyInfo, PropertyTypes } from './interfaces';

function isPromise(obj: any) {
  return !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
}
const ValueTypeMap: { [key: string]: string } = {
  string: '字符串类型',
  int: '数值类型',
  double: '数值类型',
  date: '日期类型',
  boolean: '布尔类型',
  list: '列表类型',
};
interface PropertyDetailProps {
  nodeData: NodeData;
  fetchData?: (nodeData: NodeData) => Promise<PropertyInfo> | PropertyInfo;
  // data?: PropertyItem;
}
function PropertyDetailPanel(props: PropertyDetailProps) {
  const { nodeData, fetchData } = props;
  const [value, setValue] = useState<PropertyInfo>();
  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    setLoading(true);
    const fetched = fetchData?.(nodeData);
    if (isPromise(fetched)) {
      const func = fetched as Promise<PropertyInfo>;
      func
        .then((d: PropertyInfo) => {
          setValue(d);
        })
        .finally(() => setLoading(false));
    } else {
      setValue(fetched as PropertyInfo);
      setLoading(false);
    }
  }, []);

  // const fetched = fetchData?.(nodeData);

  const prefixCls = usePrefixCls('property-picker');
  const propDetailPrefixCls = `${prefixCls}-detail`;
  return (
    <Loading title={false} loading={loading} delay={1000}>
      <div className={propDetailPrefixCls}>
        <div className={`${propDetailPrefixCls}__header`}>
          <b className={`${propDetailPrefixCls}__name`}>{`${value?.name}`}</b>
          {value?.type && (
            <Tag className={`${propDetailPrefixCls}__tag`} size="small" status="draft">
              {PropertyTypes[value?.type ?? ''] || ''}
            </Tag>
          )}
        </div>
        <div className={`${propDetailPrefixCls}__main`}>
          <div className={`${propDetailPrefixCls}__key`}>{value?.key || value?.id}</div>
          <div className={`${propDetailPrefixCls}__description`}>{value?.description}</div>
        </div>
        {value?.valueType && (
          <div className={`${propDetailPrefixCls}__bottom`}>
            <div className={`${propDetailPrefixCls}__divide`} />
            <div className={`${propDetailPrefixCls}__value`}>{ValueTypeMap[value?.valueType ?? '']}</div>
          </div>
        )}
      </div>
    </Loading>
  );
}
export default PropertyDetailPanel;

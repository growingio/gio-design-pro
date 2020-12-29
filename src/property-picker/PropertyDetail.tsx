import { NodeData } from '@gio-design/components/es/components/cascader/menu-item';
// import { TagOutlined, UserOutlined, MapChartOutlined, LocationRecoveryOutlined } from '@gio-design/icons';
import { Loading, Tag } from '@gio-design/components';
import usePrefixCls from '@gio-design/components/es/utils/hooks/use-prefix-cls';
import React, { useEffect, useState } from 'react';
import { PropertyInfo } from './interfaces';

function isPromise(obj: any) {
  return !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
}
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
          <b className={`${propDetailPrefixCls}__name`}>{value?.name}</b>
          <Tag className={`${propDetailPrefixCls}__tag`}>{value?.type}</Tag>
        </div>
        <div className={`${propDetailPrefixCls}__key`}>{value?.key}</div>
        <div className={`${propDetailPrefixCls}__description`}>{value?.key}</div>
        <div className={`${propDetailPrefixCls}__divide`} />
        <div className={`${propDetailPrefixCls}__valuetype`}>{value?.valueType}</div>
      </div>
    </Loading>
  );
}
export default PropertyDetailPanel;

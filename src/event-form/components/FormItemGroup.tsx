import React from 'react';
import usePrefixCls from '@gio-design/components/es/utils/hooks/use-prefix-cls';

// interface State {
//     // 规则重复的tag
//     repeatRuleTag?: TagElement
//     // 整体的定义规则
//     tagEditor: PageTagEditor
//     // 是否可以保存
//     enableSave?: boolean
//     // 是不是原生app
//     isNative?: boolean
// }
function FormItemGroup({
  groupNumber,
  title,
  extra,
  children,
  style,
}: {
  groupNumber: number;
  title: string;
  children?: React.ReactNode;
  extra?: React.ReactElement;
  style?: React.CSSProperties;
}) {
  const prefixCls = usePrefixCls('event-form');
  const itemGroupPrefix = `${prefixCls}-item-group`;
  return (
    <div className={itemGroupPrefix} style={style}>
      <div className={`${itemGroupPrefix}__header`}>
        <div className="title">
          <div className="badge">{groupNumber}</div>
          <span>{title}</span>
        </div>
        <div className="extra">{extra}</div>
      </div>
      <div className={`${itemGroupPrefix}__body`}>{children}</div>
    </div>
  );
}
export default FormItemGroup;

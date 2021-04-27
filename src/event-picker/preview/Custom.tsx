import React from 'react';
import isEmpty from 'lodash/isEmpty';
import { Card, usePrefixCls } from '@gio-design/components';
import classnames from 'classnames';
import PreviewChart from './Chart';
import { getTypeName } from './helper';
import { PreviewProps } from './PreviewProps';

const Custom: React.FC<PreviewProps> = (props) => {
  const { eventData, chart, className, previewCustomRender } = props;
  const { name, key = '', description = '', attributes = [], itemModels = [] } = eventData;
  const prefixCls = usePrefixCls('event-previw');
  const cls = classnames(prefixCls, 'custom', className);
  return (
    <Card className={cls} clickable={false}>
      <Card.Meta title={name} />
      <Card.Meta>
        <div className={`${prefixCls}__sub-name`}>{key as string}</div>
      </Card.Meta>
      {description && <Card.Meta>{description as string}</Card.Meta>}
      {chart && (
        <Card.Meta>
          <PreviewChart chart={chart(eventData)} />
        </Card.Meta>
      )}
      {!isEmpty(attributes) && (
        <>
          <Card.Meta>
            <div className="event-preview-head">事件属性</div>
            <div className="event-preview-attributes">
              <table className="event-preview-attributes-table">
                <tbody>
                  <tr>
                    <th>名称</th>
                    <th>类型</th>
                  </tr>
                  {attributes.map((attr) => (
                    <tr key={attr.name}>
                      <td>{attr.name}</td>
                      <td>{getTypeName(attr.valueType)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card.Meta>
        </>
      )}
      {!isEmpty(itemModels) && (
        <Card.Meta>
          <div className="event-preview-head">物品属性</div>
          <div className="event-preview-attributes item-models">
            <table className="event-preview-attributes-table">
              <tbody>
                <tr>
                  <th>名称</th>
                  <th>类型</th>
                </tr>
                {itemModels.map((attr) => (
                  <tr key={attr.name}>
                    <td>{attr.name}</td>
                    <td>{getTypeName(attr.valueType)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card.Meta>
      )}
      {previewCustomRender?.(eventData)}
    </Card>
  );
};

export default React.memo(Custom);

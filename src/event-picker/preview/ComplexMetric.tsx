// import React, { useState, useEffect } from 'react';
// import { connect } from 'react-redux';
// import styled from 'styled-components';
// import Input from '@gio-design/components/es/components/input';
// import Tooltip from '@gio-design/components/es/components/tooltip';
// import Button from '@gio-design/components/es/components/button';
// import complexMetricsService from 'store/data/complexMetricsV2';
// import ComplexMetricEditor from 'modules/olapEvent/components/ComplexMetricEditor';
// import { GioChart } from 'giochart';
// import { computeMetrics } from 'modules/olapEvent/components/Measurement/helper';
// import FilterLabelList from 'modules/core/components/FilterPicker/FilterLabelList';
// import Maybe from 'giodesign/utils/Maybe';
// import _, { pick, isEmpty } from 'lodash';

// export const Header = styled.div`
//   color: #242e59;
//   font-family: PingFang SC;
//   font-weight: 500;
//   font-size: 14px;
//   line-height: 22px;
//   height: 22px;
//   margin: 16px;
//   display: flex;
//   flex-direction: row;
//   align-items: center;
//   justify-content: space-between;
// `;

// export const Desc = styled.div`
//   margin: 16px;
//   width: 288px;
//   font-family: PingFang SC;
//   font-weight: normal;
//   word-break: break-all;
//   font-size: 12px;
//   line-height: 20px;
//   color: #7b819c;
// `;

// export const Chart = styled.div`
//   height: 140px;
//   margin: 16px;
//   border: 1px solid #dfe4ee;
//   border-radius: 4px;
// `;

// export const Formula = styled.div`
//   height: 140px;
//   margin: 16px;
//   .formula {
//     font-weight: 500;
//     font-size: 12px;
//     line-height: 20px;
//   }
//   .formula-input {
//     padding: 9px 16px;
//     background: #f7f8fc;
//     color: #dbdee8;
//     word-break: break-all;
//     border: 1px solid #dfe4ee;
//     border-radius: 4px;
//     height: auto;
//     line-height: 16px;
//     font-size: 12px;
//     color: #313e75;
//     max-height: 80px;
//     margin: 4px 0 0 0;
//   }
//   .sub-metric {
//     background: #ffffff;
//     border: 1px solid #dfe4ee;
//     border-radius: 4px;
//     min-height: 36px;
//     line-height: 30px;
//     font-size: 12px;
//     color: #313e75;
//     margin: 8px 0;
//     .alias {
//       display: inline-block;
//       width: 20px;
//       text-align: center;
//       margin: 0 8px;
//     }
//     .filter-label {
//       margin: 0 0 0 36px;
//       max-width: 100%;
//       &-desc {
//         margin-bottom: 4px;
//         height: 20px;
//         color: #adb2c2;
//         font-family: 'PingFang SC';
//         font-size: 12px;
//         letter-spacing: 0;
//         line-height: 20px;
//       }
//     }
//   }
// `;

// interface IProps {
//   id?: string;
//   dataSource: any;
//   handleComplexMetricChange?: any;
//   customEvents?: any[];
// }

// const ComplexMetricPreview: React.FC<IProps> = (props) => {
//   const {
//     dataSource,
//     customEvents,
//     handleComplexMetricChange,
//   } = props;

//   const [complexMetric, setComplexMetric] = useState(dataSource);

//   const [editorVisible, setEditorVisible] = useState(false);

//   useEffect(() => {
//     window.store
//       .dispatch(complexMetricsService.actions.getById(dataSource.id))
//       .then((data) => {
//         if (data) {
//           setComplexMetric(data || dataSource);
//         }
//       });
//   }, []);

//   const name = dataSource.name || complexMetric.name;

//   const desc = dataSource.description || complexMetric.description;

//   const formula =
//     dataSource?.expression?.expression ||
//     complexMetric?.expression?.expression;

//   const format =
//     dataSource?.expression?.format ||
//     complexMetric?.expression?.format;

//   const metrics =
//     dataSource?.expression?.metrics ||
//     complexMetric?.expression?.metrics;

//   const rawMetrics = metrics
//     ?.map((m) => _.find(customEvents, { id: m.id }))
//     .map((m, index) => computeMetrics(metrics[index], m?.attributes));

//   const gql = {
//     chartType: 'line',
//     targetUser: 'uv',
//     dimensions: ['tm'],
//     filter: null,
//     granularities: [
//       {
//         id: 'tm',
//         interval: 86400000,
//       },
//     ],
//     limit: 20,
//     timeRange: 'day:15,1',
//     metrics: [
//       pick(props.dataSource, [
//         'id',
//         'type',
//         'name',
//         'attribute',
//         'alias',
//         'math',
//         'subgroupAggregation',
//       ]),
//     ],
//   };

//   const handleClick = (e: React.MouseEvent) => {
//     e.preventDefault();
//     e.stopPropagation();
//   };

//   const handleVisible = (visible) => {
//     setEditorVisible(visible);
//   };

//   const handleButtonClick = () => {
//     setEditorVisible(true);
//   };

//   return (
//     <div
//       style={{
//         width: '320px',
//         height: '420px',
//         position: 'relative',
//         overflow: 'scroll',
//         boxShadow: '0px 2px 14px rgba(123, 129, 156, 0.5)',
//         borderRadius: '4px',
//       }}
//       onClick={handleClick}
//     >
//       <Header>
//         <Tooltip title={name.length > 15 && name}>
//           <div>{name.substring(0, 15)}</div>
//         </Tooltip>
//         <ComplexMetricEditor
//           visible={editorVisible}
//           handleVisible={handleVisible}
//           id={dataSource.id}
//           desc={desc}
//           name={name}
//           formula={formula}
//           format={format}
//           rawMetrics={rawMetrics}
//           switchMetric={handleComplexMetricChange}
//         />
//         <Tooltip
//           title={'无计算指标编辑权限'}
//           disabled={window.can('manage', 'complex_metric')}
//         >
//           <span>
//             <Button
//               type='text'
//               size='small'
//               onClick={handleButtonClick}
//               disabled={!window.can('manage', 'complex_metric')}
//             >
//               编辑
//             </Button>
//           </span>
//         </Tooltip>
//       </Header>
//       {desc && <Desc>{desc}</Desc>}
//       <Chart>
//         <GioChart
//           padding={0}
//           hideDate
//           hideFilter
//           hideTitle
//           width={288}
//           height={140}
//           gql={gql}
//           sourceType='olap'
//         />
//       </Chart>
//       <Formula>
//         <div className='formula'>计算公式</div>
//         <div className='formula-input'>{formula}</div>
//         {rawMetrics?.map((m) => (
//           <div className='sub-metric'>
//             <span className='alias'>{m.alias}</span>
//             {`${m.name} ${m.attributeName}`}
//             <Maybe of={!isEmpty(m.filter)}>
//               <div className='filter-label'>
//                 <p className='filter-label-desc'>满足过滤条件：</p>
//                 <FilterLabelList filter={m.filter} metrics={[m]} />
//               </div>
//             </Maybe>
//           </div>
//         ))}
//       </Formula>
//     </div>
//   );
// };

// export default connect((state) => ({
//   customEvents: state['data:customEvents'],
// }))(ComplexMetricPreview);

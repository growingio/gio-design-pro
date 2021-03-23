export type Maybe<T> = T | undefined;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** Byte string json */
  BytesJson: any;
  /** An RFC-3339 compliant DateTime Scalar */
  DateTime: any;
  /** Hash ids */
  HashId: any;
  /** Long type */
  Long: any;
  /** An object scalar */
  Object: any;
};

export type AccessEntry = {
  __typename?: 'AccessEntry';
  isPublic?: Maybe<Scalars['Boolean']>;
  members?: Maybe<Array<Scalars['HashId']>>;
  groups?: Maybe<Array<Group>>;
  actions?: Maybe<Array<Scalars['String']>>;
};

export type AccessEntryInput = {
  isPublic?: Maybe<Scalars['Boolean']>;
  members?: Maybe<Array<Scalars['HashId']>>;
  groups?: Maybe<Array<Scalars['HashId']>>;
  actions?: Maybe<Array<Scalars['String']>>;
};

export type Action = {
  __typename?: 'Action';
  measurement?: Maybe<Measurement>;
  excluded?: Maybe<Scalars['Boolean']>;
  eventType?: Maybe<Scalars['String']>;
};

export type ActionInput = {
  measurement?: Maybe<MeasurementInput>;
  excluded?: Maybe<Scalars['Boolean']>;
  eventType?: Maybe<Scalars['String']>;
};

export type AnalysisExportJob = JobEntity & {
  __typename?: 'AnalysisExportJob';
  id: Scalars['String'];
  stage: JobStage;
  error?: Maybe<Error>;
};

export type AnalysisExportJobParam = {
  analysisType: AnalysisResourceType;
};

export type AnalysisResourceType = 'CHARTS' | 'FUNNELS' | 'RETENTIONS' | 'FREQUENCIES';

export type BasicProfile = {
  __typename?: 'BasicProfile';
  id: Scalars['String'];
  userId: Scalars['String'];
  name?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  avatar?: Maybe<Scalars['String']>;
  mobile?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  wechatOpenId?: Maybe<Scalars['String']>;
  properties?: Maybe<Array<Maybe<Property>>>;
};

export type Category = {
  __typename?: 'Category';
  id: Scalars['HashId'];
  name?: Maybe<Scalars['String']>;
  parentId?: Maybe<Scalars['HashId']>;
  subCategories?: Maybe<Array<Maybe<Category>>>;
  resources?: Maybe<Array<Maybe<CategoryResource>>>;
  resourceCount?: Maybe<Scalars['Int']>;
};

export type CategoryInput = {
  name: Scalars['String'];
  parentId?: Maybe<Scalars['HashId']>;
};

export type CategoryResource = {
  __typename?: 'CategoryResource';
  categoryId: Scalars['HashId'];
  resourceType: Scalars['String'];
  resourceId?: Maybe<Scalars['HashId']>;
  resourceEntity?: Maybe<Entity>;
};

export type CategoryResourceInput = {
  categoryId?: Maybe<Scalars['HashId']>;
  resourceType: Scalars['String'];
  resourceId: Scalars['HashId'];
};

export type ComplexMetric = NamedEntity & {
  __typename?: 'ComplexMetric';
  id: Scalars['HashId'];
  name: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  expression?: Maybe<Expression>;
  isSystem: Scalars['Boolean'];
  creatorId: Scalars['HashId'];
  createdAt: Scalars['DateTime'];
  updaterId?: Maybe<Scalars['HashId']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  creator?: Maybe<Scalars['String']>;
  updater?: Maybe<Scalars['String']>;
};

export type ComplexMetricInput = {
  name: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  expression?: Maybe<ExpressionInput>;
};

export type Component = {
  __typename?: 'Component';
  dashboardId: Scalars['HashId'];
  resourceType: Scalars['String'];
  resourceId: Scalars['HashId'];
  layout?: Maybe<Layout>;
};

export type ComponentInput = {
  resourceType: Scalars['String'];
  resourceId: Scalars['HashId'];
  layout?: Maybe<LayoutInput>;
};

export type ComputeDefinition = {
  __typename?: 'ComputeDefinition';
  name?: Maybe<Scalars['String']>;
  expression: Scalars['String'];
  directives: Array<Maybe<ComputeDirective>>;
  drillDownAttrs?: Maybe<Scalars['Object']>;
};

export type ComputeDefinitionInput = {
  name?: Maybe<Scalars['String']>;
  expression: Scalars['String'];
  directives: Array<Maybe<ComputeDirectiveInput>>;
};

export type ComputeDirective = {
  __typename?: 'ComputeDirective';
  alias: Scalars['String'];
  measurement: Measurement;
  timeRange?: Maybe<Scalars['String']>;
  filter?: Maybe<Filter>;
  op?: Maybe<Scalars['String']>;
  attribute?: Maybe<Scalars['String']>;
  aggregator?: Maybe<Scalars['String']>;
  values?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type ComputeDirectiveInput = {
  alias: Scalars['String'];
  measurement: MeasurementInput;
  op?: Maybe<Scalars['String']>;
  values?: Maybe<Array<Maybe<Scalars['String']>>>;
  timeRange?: Maybe<Scalars['String']>;
  attribute?: Maybe<Scalars['String']>;
  aggregator?: Maybe<Scalars['String']>;
  filter?: Maybe<FilterInput>;
};

export type CreateAccountReply = {
  __typename?: 'CreateAccountReply';
  account: Member;
  passwordResetUri: Scalars['String'];
};

export type CrystalBallPropertyCategory = {
  __typename?: 'CrystalBallPropertyCategory';
  title: Scalars['String'];
  properties?: Maybe<Array<Scalars['String']>>;
  tags: Array<Scalars['HashId']>;
};

export type CrystalBallUserInfoPanel = {
  __typename?: 'CrystalBallUserInfoPanel';
  name: Scalars['String'];
  categories?: Maybe<Array<Maybe<CrystalBallPropertyCategory>>>;
};

export type CursorPagination = {
  __typename?: 'CursorPagination';
  totalCount: Scalars['Int'];
  startCursor?: Maybe<Scalars['String']>;
  endCursor?: Maybe<Scalars['String']>;
  hasNextPage?: Maybe<Scalars['Boolean']>;
  hasPreviousPage?: Maybe<Scalars['Boolean']>;
  values: Array<Maybe<Entity>>;
};

export type CustomEvent = NamedEntity & {
  __typename?: 'CustomEvent';
  id: Scalars['HashId'];
  name: Scalars['String'];
  key: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  isSystem: Scalars['Boolean'];
  valueType: Scalars['String'];
  variables?: Maybe<Array<EventVariable>>;
  attributes?: Maybe<Array<CustomEventChild>>;
  itemModels?: Maybe<Array<CustomEventChild>>;
  creatorId: Scalars['HashId'];
  createdAt: Scalars['DateTime'];
  updaterId?: Maybe<Scalars['HashId']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  creator?: Maybe<Scalars['String']>;
  updater?: Maybe<Scalars['String']>;
};

export type CustomEventChild = {
  __typename?: 'CustomEventChild';
  id: Scalars['HashId'];
  key: Scalars['String'];
  name: Scalars['String'];
  valueType: Scalars['String'];
  associatedAt?: Maybe<Scalars['DateTime']>;
};

export type CustomEventInput = {
  name: Scalars['String'];
  key: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  valueType: Scalars['String'];
  attributes?: Maybe<Array<EventAttributes>>;
  itemModels?: Maybe<Array<EventAttributes>>;
};

export type Dashboard = NamedEntity & {
  __typename?: 'Dashboard';
  id: Scalars['HashId'];
  name: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  components?: Maybe<Array<Maybe<Component>>>;
  filter?: Maybe<Filter>;
  creatorId: Scalars['HashId'];
  createdAt: Scalars['DateTime'];
  updaterId?: Maybe<Scalars['HashId']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  creator?: Maybe<Scalars['String']>;
  updater?: Maybe<Scalars['String']>;
  readers?: Maybe<Array<Member>>;
  editors?: Maybe<Array<Member>>;
};

export type DashboardComment = {
  __typename?: 'DashboardComment';
  id: Scalars['HashId'];
  title: Scalars['String'];
  detail?: Maybe<Scalars['String']>;
  creatorId: Scalars['HashId'];
  createdAt: Scalars['DateTime'];
  updaterId?: Maybe<Scalars['HashId']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type DashboardCommentInput = {
  title: Scalars['String'];
  detail?: Maybe<Scalars['String']>;
};

export type DashboardInput = {
  name: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  components?: Maybe<Array<Maybe<ComponentInput>>>;
  filter?: Maybe<FilterInput>;
};

export type DashboardReference = {
  __typename?: 'DashboardReference';
  id: Scalars['HashId'];
  name: Scalars['String'];
  creatorId: Scalars['HashId'];
  creator: Scalars['String'];
};

export type Department = {
  __typename?: 'Department';
  id: Scalars['HashId'];
  name: Scalars['String'];
  parentId: Scalars['String'];
  departments?: Maybe<Array<Department>>;
  members?: Maybe<Array<Member>>;
  memberCount: Scalars['Int'];
};

export type DepartmentInput = {
  name: Scalars['String'];
  parentId?: Maybe<Scalars['String']>;
  members?: Maybe<Array<Scalars['HashId']>>;
};

export type DetectedStage = 'NONE' | 'READY' | 'RUNNING' | 'FINISH' | 'ERROR';

export type Detector = {
  __typename?: 'Detector';
  stage: DetectedStage;
  description?: Maybe<Scalars['String']>;
  detectedAt?: Maybe<Scalars['DateTime']>;
  totalUsers?: Maybe<Scalars['Int']>;
  usersRatio?: Maybe<Scalars['Float']>;
};

export type Dimension = {
  __typename?: 'Dimension';
  id: Scalars['String'];
  name: Scalars['String'];
  type: Scalars['String'];
  groupId: Scalars['String'];
  groupName?: Maybe<Scalars['String']>;
  valueType?: Maybe<Scalars['String']>;
};

export type DocProps = {
  __typename?: 'DocProps';
  domain: Scalars['String'];
  path?: Maybe<Scalars['String']>;
  query?: Maybe<Scalars['String']>;
  xpath?: Maybe<Scalars['String']>;
  index?: Maybe<Scalars['String']>;
  href?: Maybe<Scalars['String']>;
  content?: Maybe<Scalars['String']>;
  pg?: Maybe<Scalars['String']>;
  contentType?: Maybe<Scalars['String']>;
};

export type DocPropsInput = {
  domain: Scalars['String'];
  path?: Maybe<Scalars['String']>;
  query?: Maybe<Scalars['String']>;
  xpath?: Maybe<Scalars['String']>;
  index?: Maybe<Scalars['String']>;
  href?: Maybe<Scalars['String']>;
  content?: Maybe<Scalars['String']>;
  pg?: Maybe<Scalars['String']>;
  contentType?: Maybe<Scalars['String']>;
};

export type DrillDownSegmentReply = {
  __typename?: 'DrillDownSegmentReply';
  id: Scalars['HashId'];
};

export type DrillDownSegmentSnapshotReply = {
  __typename?: 'DrillDownSegmentSnapshotReply';
  id: Scalars['String'];
};

export type Element = NamedEntity & {
  __typename?: 'Element';
  id: Scalars['HashId'];
  name: Scalars['String'];
  actions?: Maybe<Array<Maybe<Scalars['String']>>>;
  attrs?: Maybe<DocProps>;
  definition?: Maybe<DocProps>;
  screenshot?: Maybe<Screenshot>;
  platforms?: Maybe<Array<Maybe<Scalars['String']>>>;
  docType: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  businessType?: Maybe<Scalars['String']>;
  isSystem: Scalars['Boolean'];
  createdAt: Scalars['DateTime'];
  updatedAt?: Maybe<Scalars['DateTime']>;
  creatorId: Scalars['HashId'];
  updaterId?: Maybe<Scalars['HashId']>;
  creator?: Maybe<Scalars['String']>;
  updater?: Maybe<Scalars['String']>;
  patternMatched?: Maybe<Scalars['Boolean']>;
  appVersion?: Maybe<Scalars['String']>;
  sdkVersion?: Maybe<Scalars['String']>;
};

export type ElementInput = {
  name: Scalars['String'];
  docType: Scalars['String'];
  actions: Array<Maybe<Scalars['String']>>;
  platforms: Array<Maybe<Scalars['String']>>;
  attrs?: Maybe<DocPropsInput>;
  definition?: Maybe<DocPropsInput>;
  screenshot?: Maybe<ScreenshotInput>;
  description?: Maybe<Scalars['String']>;
};

export type ElementUpdateInput = {
  name: Scalars['String'];
  description?: Maybe<Scalars['String']>;
};

export type Entity = UserSummary | Tag | Segment | Tunnel | UserEvent | UserVariable;

export type Error = {
  __typename?: 'Error';
  code?: Maybe<Scalars['String']>;
  message?: Maybe<Scalars['String']>;
};

export type EventAnalysis = NamedEntity & {
  __typename?: 'EventAnalysis';
  id: Scalars['HashId'];
  name: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  measurements: Array<Maybe<Measurement>>;
  dimensions?: Maybe<Array<Maybe<Scalars['String']>>>;
  granularities?: Maybe<Array<Maybe<Granularity>>>;
  timeRange: Scalars['String'];
  filter?: Maybe<Filter>;
  targetUser?: Maybe<TargetUser>;
  limit?: Maybe<Scalars['Int']>;
  attrs?: Maybe<Scalars['BytesJson']>;
  orders?: Maybe<Array<Maybe<Order>>>;
  splitter?: Maybe<Splitter>;
  chartType?: Maybe<Scalars['String']>;
  isSystem?: Maybe<Scalars['Boolean']>;
  businessType?: Maybe<Scalars['String']>;
  creatorId: Scalars['HashId'];
  createdAt: Scalars['DateTime'];
  updaterId?: Maybe<Scalars['HashId']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  creator?: Maybe<Scalars['String']>;
  updater?: Maybe<Scalars['String']>;
};

export type EventAnalysisInput = {
  name: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  measurements: Array<Maybe<MeasurementInput>>;
  dimensions?: Maybe<Array<Maybe<Scalars['String']>>>;
  granularities?: Maybe<Array<Maybe<GranularityInput>>>;
  timeRange: Scalars['String'];
  targetUser?: Maybe<TargetUserInput>;
  splitter?: Maybe<SplitterInput>;
  filter?: Maybe<FilterInput>;
  attrs?: Maybe<Scalars['Object']>;
  limit?: Maybe<Scalars['Int']>;
  orders?: Maybe<Array<Maybe<OrderInput>>>;
  chartType: Scalars['String'];
};

export type EventAttributes = {
  id: Scalars['HashId'];
};

export type EventImportArgument = {
  __typename?: 'EventImportArgument';
  timeRange: Scalars['String'];
  directory: Scalars['String'];
};

export type EventImportJob = NamedEntity & {
  __typename?: 'EventImportJob';
  id: Scalars['HashId'];
  name: Scalars['String'];
  type?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  parameter: EventImportParameter;
  argument: EventImportArgument;
  stage: JobStage;
  creatorId: Scalars['HashId'];
  createdAt: Scalars['DateTime'];
  updaterId?: Maybe<Scalars['HashId']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  creator?: Maybe<Scalars['String']>;
  updater?: Maybe<Scalars['String']>;
  error?: Maybe<Error>;
};

export type EventImportParameter = {
  __typename?: 'EventImportParameter';
  tunnelId: Scalars['HashId'];
  timeRange: Scalars['String'];
};

export type EventStat = {
  __typename?: 'EventStat';
  name?: Maybe<Scalars['String']>;
  type: UserEventType;
  key?: Maybe<Scalars['String']>;
  count?: Maybe<Scalars['Int']>;
};

export type EventTrend = {
  __typename?: 'EventTrend';
  interval: Scalars['Long'];
  points: Array<Maybe<TrendPoint>>;
};

export type EventVariable = NamedEntity & {
  __typename?: 'EventVariable';
  id: Scalars['HashId'];
  name: Scalars['String'];
  key: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  valueType: Scalars['String'];
  creatorId: Scalars['HashId'];
  createdAt: Scalars['DateTime'];
  updaterId?: Maybe<Scalars['HashId']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  creator?: Maybe<Scalars['String']>;
  updater?: Maybe<Scalars['String']>;
};

export type Expression = {
  __typename?: 'Expression';
  op: Scalars['String'];
  exprs?: Maybe<Array<Maybe<Expression>>>;
  measurements?: Maybe<Array<Maybe<Measurement>>>;
};

export type ExpressionInput = {
  op: Scalars['String'];
  exprs?: Maybe<Array<Maybe<ExpressionInput>>>;
  measurements?: Maybe<Array<Maybe<MeasurementInput>>>;
};

export type Feature = {
  __typename?: 'Feature';
  /**  目前 id 的值为 [segment, tag, funnle-analysis, retention-analysis, chart-analysis, kpi-analysis] */
  id: Scalars['String'];
  label: Scalars['String'];
};

export type FileDescriptor = {
  __typename?: 'FileDescriptor';
  name: Scalars['String'];
  owner: Scalars['String'];
  size: Scalars['Long'];
  checksum: Scalars['String'];
  lastModified: Scalars['DateTime'];
};

export type FileTunnelConfig = {
  __typename?: 'FileTunnelConfig';
  type?: Maybe<FilesTunnelConfigType>;
};

export type FilesTunnelConfigType = 'HISTORY_EVENT' | 'USER_PROPERTY' | 'ITEM_PROPERTY';

export type Filter = {
  __typename?: 'Filter';
  key?: Maybe<Scalars['String']>;
  op?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  values?: Maybe<Array<Maybe<Scalars['String']>>>;
  exprs?: Maybe<Array<Maybe<Filter>>>;
  valueType?: Maybe<Scalars['String']>;
};

export type FilterInput = {
  key?: Maybe<Scalars['String']>;
  op?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  values?: Maybe<Array<Maybe<Scalars['String']>>>;
  exprs?: Maybe<Array<Maybe<FilterInput>>>;
  valueType?: Maybe<Scalars['String']>;
};

export type FrequencyAnalysis = NamedEntity & {
  __typename?: 'FrequencyAnalysis';
  id: Scalars['HashId'];
  name: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  measurements: Array<Maybe<Measurement>>;
  dimensions?: Maybe<Array<Maybe<Scalars['String']>>>;
  granularities?: Maybe<Array<Maybe<Granularity>>>;
  timeRange: Scalars['String'];
  filter?: Maybe<Filter>;
  splitter?: Maybe<Splitter>;
  targetUser?: Maybe<TargetUser>;
  chartType?: Maybe<Scalars['String']>;
  isSystem?: Maybe<Scalars['Boolean']>;
  businessType?: Maybe<Scalars['String']>;
  creatorId: Scalars['HashId'];
  createdAt: Scalars['DateTime'];
  updaterId?: Maybe<Scalars['HashId']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  creator?: Maybe<Scalars['String']>;
  updater?: Maybe<Scalars['String']>;
};

export type FrequencyAnalysisInput = {
  name: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  measurements: Array<Maybe<MeasurementInput>>;
  dimensions?: Maybe<Array<Maybe<Scalars['String']>>>;
  granularities?: Maybe<Array<Maybe<GranularityInput>>>;
  timeRange: Scalars['String'];
  filter?: Maybe<FilterInput>;
  splitter?: Maybe<SplitterInput>;
  targetUser?: Maybe<TargetUserInput>;
  chartType: Scalars['String'];
};

export type FrequencyDrillDownSegmentInput = {
  name: Scalars['String'];
  lowerBound: Scalars['Float'];
  upperBound: Scalars['Float'];
  dimensionValue?: Maybe<Scalars['String']>;
  targetUser?: Maybe<TargetUserInput>;
  scheduler: SchedulerType;
  analysis: FrequencyAnalysisInput;
};

export type FunnelAnalysis = NamedEntity & {
  __typename?: 'FunnelAnalysis';
  id: Scalars['HashId'];
  name: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  measurements: Array<Maybe<Measurement>>;
  conversionWindow?: Maybe<Scalars['Int']>;
  timeRange?: Maybe<Scalars['String']>;
  targetUser?: Maybe<TargetUser>;
  filter?: Maybe<Filter>;
  splitter?: Maybe<Splitter>;
  isSystem?: Maybe<Scalars['Boolean']>;
  businessType?: Maybe<Scalars['String']>;
  creatorId: Scalars['HashId'];
  createdAt: Scalars['DateTime'];
  updaterId?: Maybe<Scalars['HashId']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  creator?: Maybe<Scalars['String']>;
  updater?: Maybe<Scalars['String']>;
};

export type FunnelAnalysisInput = {
  name: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  measurements: Array<Maybe<MeasurementInput>>;
  conversionWindow?: Maybe<Scalars['Int']>;
  timeRange: Scalars['String'];
  targetUser: TargetUserInput;
  filter?: Maybe<FilterInput>;
  splitter?: Maybe<SplitterInput>;
};

export type FunnelDrillDownSegmentInput = {
  name: Scalars['String'];
  position: Scalars['Int'];
  excluded: Scalars['Boolean'];
  scheduler: SchedulerType;
  dimensionValue?: Maybe<Scalars['String']>;
  targetUser?: Maybe<TargetUserInput>;
  analysis: FunnelAnalysisInput;
};

export type GioApiTunnelConfig = {
  __typename?: 'GIOApiTunnelConfig';
  projectUid: Scalars['String'];
  projectKey: Scalars['String'];
  token: Scalars['String'];
};

export type Granularity = {
  __typename?: 'Granularity';
  id?: Maybe<Scalars['String']>;
  values?: Maybe<Array<Maybe<Scalars['String']>>>;
  interval?: Maybe<Scalars['Long']>;
  split?: Maybe<Scalars['Float']>;
  statistics?: Maybe<Array<Maybe<Scalars['String']>>>;
  ranges?: Maybe<Array<Maybe<Scalars['Float']>>>;
  top?: Maybe<Scalars['Int']>;
  period?: Maybe<Scalars['String']>;
  trend?: Maybe<Scalars['Boolean']>;
};

export type GranularityInput = {
  id?: Maybe<Scalars['String']>;
  values?: Maybe<Array<Maybe<Scalars['String']>>>;
  interval?: Maybe<Scalars['Long']>;
  split?: Maybe<Scalars['Float']>;
  statistics?: Maybe<Array<Maybe<Scalars['String']>>>;
  ranges?: Maybe<Array<Maybe<Scalars['Float']>>>;
  top?: Maybe<Scalars['Int']>;
  period?: Maybe<Scalars['String']>;
  trend?: Maybe<Scalars['Boolean']>;
};

export type Group = {
  __typename?: 'Group';
  id?: Maybe<Scalars['HashId']>;
  name?: Maybe<Scalars['String']>;
};

export type InsensitiveProperty = {
  __typename?: 'InsensitiveProperty';
  key: Scalars['String'];
  name?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['String']>;
};

export type ItemModel = NamedEntity & {
  __typename?: 'ItemModel';
  id: Scalars['HashId'];
  name: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  attributes: Array<Maybe<ItemVariable>>;
  creatorId: Scalars['HashId'];
  createdAt: Scalars['DateTime'];
  updaterId?: Maybe<Scalars['HashId']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  creator?: Maybe<Scalars['String']>;
  updater?: Maybe<Scalars['String']>;
};

export type ItemModelInput = {
  name: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  attributes?: Maybe<Array<ItemVariableInput>>;
};

export type ItemVariable = NamedEntity & {
  __typename?: 'ItemVariable';
  id: Scalars['HashId'];
  name: Scalars['String'];
  key: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  valueType: Scalars['String'];
  isPrimaryKey: Scalars['Boolean'];
  creatorId: Scalars['HashId'];
  createdAt: Scalars['DateTime'];
  updaterId?: Maybe<Scalars['HashId']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  creator?: Maybe<Scalars['String']>;
  updater?: Maybe<Scalars['String']>;
};

export type ItemVariableInput = {
  name: Scalars['String'];
  key: Scalars['String'];
  isPrimaryKey: Scalars['Boolean'];
  description?: Maybe<Scalars['String']>;
  valueType: Scalars['String'];
};

export type JdbcTunnelConfig = {
  __typename?: 'JDBCTunnelConfig';
  url: Scalars['String'];
  username: Scalars['String'];
  password: Scalars['String'];
};

export type JobEntity = {
  id: Scalars['String'];
  stage: JobStage;
  error?: Maybe<Error>;
};

export type JobOperation = 'CREATE' | 'FILE_UPLOAD' | 'EXECUTE';

export type JobResult = {
  __typename?: 'JobResult';
  id: Scalars['HashId'];
  stage: JobStage;
  uris?: Maybe<Array<Scalars['String']>>;
};

export type JobStage =
  /**
   * NONE 任务的初始状态
   * READY 任务准备执行
   * RUNNING 任务正在执行
   * DATA_READY 数据已经准备就绪
   * FINISH 任务完成
   * ERROR 任务执行失败
   */
  'NONE' | 'READY' | 'RUNNING' | 'DATA_READY' | 'FINISH' | 'ERROR';

export type KpiAnalysis = NamedEntity & {
  __typename?: 'KpiAnalysis';
  id: Scalars['HashId'];
  name: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  measurements: Array<Maybe<Measurement>>;
  limit?: Maybe<Scalars['Int']>;
  timeRange?: Maybe<Scalars['String']>;
  interval?: Maybe<Scalars['Long']>;
  filter?: Maybe<Filter>;
  goal?: Maybe<Scalars['Float']>;
  targetUser?: Maybe<TargetUser>;
  splitter?: Maybe<Splitter>;
  isSystem?: Maybe<Scalars['Boolean']>;
  businessType?: Maybe<Scalars['String']>;
  creatorId: Scalars['HashId'];
  createdAt: Scalars['DateTime'];
  updaterId?: Maybe<Scalars['HashId']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  creator?: Maybe<Scalars['String']>;
  updater?: Maybe<Scalars['String']>;
};

export type KpiAnalysisInput = {
  name?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  measurements: Array<Maybe<MeasurementInput>>;
  limit?: Maybe<Scalars['Int']>;
  targetUser: TargetUserInput;
  timeRange: Scalars['String'];
  interval?: Maybe<Scalars['Long']>;
  filter?: Maybe<FilterInput>;
  goal?: Maybe<Scalars['Float']>;
  splitter?: Maybe<SplitterInput>;
};

export type Layout = {
  __typename?: 'Layout';
  y?: Maybe<Scalars['Int']>;
  w?: Maybe<Scalars['Int']>;
  h?: Maybe<Scalars['Int']>;
  x?: Maybe<Scalars['Int']>;
  minW?: Maybe<Scalars['Int']>;
  minH?: Maybe<Scalars['Int']>;
  moved?: Maybe<Scalars['Boolean']>;
  static?: Maybe<Scalars['Boolean']>;
  isDraggable?: Maybe<Scalars['Boolean']>;
  isResizable?: Maybe<Scalars['Boolean']>;
};

export type LayoutInput = {
  y: Scalars['Int'];
  w: Scalars['Int'];
  h: Scalars['Int'];
  x: Scalars['Int'];
  minW?: Maybe<Scalars['Int']>;
  minH?: Maybe<Scalars['Int']>;
  moved?: Maybe<Scalars['Boolean']>;
  static?: Maybe<Scalars['Boolean']>;
  isDraggable?: Maybe<Scalars['Boolean']>;
  isResizable?: Maybe<Scalars['Boolean']>;
};

export type LogEntry = {
  __typename?: 'LogEntry';
  operation: Scalars['String'];
  message: Scalars['String'];
  operatorId: Scalars['HashId'];
  timestamp: Scalars['DateTime'];
  operator: Scalars['String'];
};

export type Measurable = {
  __typename?: 'Measurable';
  id: Scalars['String'];
  name: Scalars['String'];
  type: Scalars['String'];
  action?: Maybe<Scalars['String']>;
  elementId?: Maybe<Scalars['String']>;
  valueType?: Maybe<Scalars['String']>;
  platforms?: Maybe<Array<Maybe<Scalars['String']>>>;
  attributes?: Maybe<Array<Maybe<MeasurableAttribute>>>;
  labels?: Maybe<Array<Maybe<Scalars['String']>>>;
  favorites?: Maybe<Scalars['Boolean']>;
  /**
   * 用户分群和分层/累计值标签，下面两种需要标记禁用
   * 1.计算指标中含有打点事件且为人数的
   * 2.计算指标含有用户量
   */
  isComplexDistinct?: Maybe<Scalars['Boolean']>;
};

export type MeasurableAttribute = {
  __typename?: 'MeasurableAttribute';
  id: Scalars['String'];
  name: Scalars['String'];
  valueType: Scalars['String'];
};

export type Measurement = {
  __typename?: 'Measurement';
  id: Scalars['String'];
  type: Scalars['String'];
  filter?: Maybe<Filter>;
  name?: Maybe<Scalars['String']>;
  action?: Maybe<Scalars['String']>;
  timeRange?: Maybe<Scalars['String']>;
  attribute?: Maybe<Scalars['String']>;
  aggregator?: Maybe<Scalars['String']>;
  weight?: Maybe<Scalars['Float']>;
};

export type MeasurementInput = {
  id: Scalars['String'];
  type: Scalars['String'];
  action?: Maybe<Scalars['String']>;
  filter?: Maybe<FilterInput>;
  attribute?: Maybe<Scalars['String']>;
  aggregator?: Maybe<Scalars['String']>;
  timeRange?: Maybe<Scalars['String']>;
  weight?: Maybe<Scalars['Float']>;
};

export type Member = {
  __typename?: 'Member';
  id: Scalars['HashId'];
  name?: Maybe<Scalars['String']>;
  source: Scalars['String'];
  avatar?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  phoneNumber?: Maybe<Scalars['String']>;
  directDepartment?: Maybe<Department>;
  identity?: Maybe<Scalars['String']>;
};

export type MemberInput = {
  name: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
  role: Scalars['HashId'];
  department?: Maybe<Scalars['String']>;
  phoneNumber?: Maybe<Scalars['String']>;
  identity?: Maybe<Scalars['String']>;
};

export type MiniProgramTunnelConfig = {
  __typename?: 'MiniProgramTunnelConfig';
  /**
   * 如果命名 type 会与 FilesTunnelConfig 中的 type 冲突，在 mutation create 时候，grapqhl validate 会报错: Validation error of type FieldsConflict
   * 所以命名加了前缀 programType
   */
  programType: MiniProgramType;
  urlScheme: Scalars['String'];
};

export type MiniProgramType =
  | 'ALIP'
  | 'WXWV'
  | 'WECHAT'
  | 'MINP'
  | 'QQ'
  | 'WXOA'
  | 'BAIDUP'
  | 'BYTEDANCE'
  | 'QUICKAPP'
  | 'MINIGAME';

export type MobileTunnelConfig = {
  __typename?: 'MobileTunnelConfig';
  platform: PlatformType;
  urlScheme: Scalars['String'];
  spn?: Maybe<Scalars['String']>;
};

export type Module = {
  __typename?: 'Module';
  key?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  permissions?: Maybe<Array<Permission>>;
};

export type ModuleInput = {
  key: Scalars['String'];
  permissions?: Maybe<Array<PermissionInput>>;
};

export type Mutation = {
  __typename?: 'Mutation';
  settingUtmArguments: Scalars['Boolean'];
  deleteUtmArgument: Scalars['Boolean'];
  settingPersonaMeasurements: Scalars['Boolean'];
  settingSegmentMeasurements: Scalars['Boolean'];
  updateProjectInfo: Scalars['Boolean'];
  updateOriginDataSetting: Scalars['Boolean'];
  createTag: Tag;
  deleteTag?: Maybe<Scalars['Boolean']>;
  updateTag?: Maybe<Tag>;
  batchDeleteTags?: Maybe<Scalars['Boolean']>;
  createSegment: Segment;
  deleteSegment?: Maybe<Scalars['Boolean']>;
  updateSegment?: Maybe<Segment>;
  batchDeleteSegments?: Maybe<Scalars['Boolean']>;
  createSegmentSnapshot: SegmentSnapshot;
  deleteTunnel?: Maybe<Scalars['Boolean']>;
  createTunnel: Tunnel;
  updateTunnel?: Maybe<Tunnel>;
  batchDeleteTunnels?: Maybe<Scalars['Boolean']>;
  syncUbaCustomEvent: Array<Maybe<CustomEvent>>;
  syncUbaUserVariable: Array<Maybe<UserVariable>>;
  executeJob?: Maybe<JobResult>;
  createEventImportJob: EventImportJob;
  submitTagUserExportJob: TagUserExportJob;
  submitSegmentUserExportJob: SegmentUserExportJob;
  submitSegmentSnapshotUserExportJob: SegmentUserExportJob;
  submitAnalysisExportJob: AnalysisExportJob;
  createSubscription?: Maybe<Scalars['Boolean']>;
  deleteSubscription?: Maybe<Scalars['Boolean']>;
  batchUpdateSubscriptions?: Maybe<Scalars['Boolean']>;
  createCategory?: Maybe<Category>;
  updateCategory?: Maybe<Category>;
  deleteCategory?: Maybe<Scalars['Boolean']>;
  addCategoryResource?: Maybe<CategoryResource>;
  removeCategoryResources?: Maybe<Scalars['Boolean']>;
  moveCategoryResources?: Maybe<Array<Maybe<CategoryResource>>>;
  roleAppendUser?: Maybe<Scalars['Boolean']>;
  updateUserPermissions?: Maybe<Scalars['Boolean']>;
  updateResourceAcls?: Maybe<Scalars['Boolean']>;
  batchUpdateResourceAcl?: Maybe<Scalars['Boolean']>;
  createRole: Role;
  deleteRole?: Maybe<Scalars['Boolean']>;
  updateRole?: Maybe<Scalars['Boolean']>;
  createDepartment: Department;
  updateDepartment: Department;
  deleteDepartment: Scalars['Boolean'];
  addMembersToDepartment: Scalars['Boolean'];
  updateMemberRole: Scalars['Boolean'];
  createAccount?: Maybe<CreateAccountReply>;
  disableAccount?: Maybe<Scalars['Boolean']>;
  resetAccountPassword: Scalars['String'];
  createMember: Member;
  resetPassword: Scalars['Boolean'];
  updateMember: Scalars['Boolean'];
  createElement: Element;
  updateElement: Element;
  deleteElement?: Maybe<Scalars['Boolean']>;
  batchDeleteElements?: Maybe<Scalars['Boolean']>;
  createCustomEvent: CustomEvent;
  updateCustomEvent: CustomEvent;
  deleteCustomEvent?: Maybe<Scalars['Boolean']>;
  batchDeleteCustomEvents?: Maybe<Scalars['Boolean']>;
  createComplexMetric: ComplexMetric;
  updateComplexMetric: ComplexMetric;
  deleteComplexMetric?: Maybe<Scalars['Boolean']>;
  batchDeleteComplexMetrics?: Maybe<Scalars['Boolean']>;
  createEventVariable: EventVariable;
  updateEventVariable: EventVariable;
  deleteEventVariable: Scalars['Boolean'];
  batchDeleteEventVariables?: Maybe<Scalars['Boolean']>;
  createItemVariable: ItemVariable;
  updateItemVariable: ItemVariable;
  deleteItemVariable: Scalars['Boolean'];
  batchDeleteItemVariables?: Maybe<Scalars['Boolean']>;
  createItemModel: ItemModel;
  updateItemModel: ItemModel;
  deleteItemModel: Scalars['Boolean'];
  batchDeleteItemModels?: Maybe<Scalars['Boolean']>;
  addItemModelAttribute?: Maybe<ItemVariable>;
  createUserVariable: UserVariable;
  updateUserVariable: UserVariable;
  deleteUserVariable: Scalars['Boolean'];
  batchDeleteUserVariables?: Maybe<Scalars['Boolean']>;
  createKpiAnalysis: KpiAnalysis;
  updateKpiAnalysis: KpiAnalysis;
  deleteKpiAnalysis: Scalars['Boolean'];
  batchDeleteKpiAnalyses?: Maybe<Scalars['Boolean']>;
  createFunnelAnalysis: FunnelAnalysis;
  updateFunnelAnalysis: FunnelAnalysis;
  deleteFunnelAnalysis: Scalars['Boolean'];
  batchDeleteFunnelAnalyses?: Maybe<Scalars['Boolean']>;
  createFrequencyAnalysis: FrequencyAnalysis;
  updateFrequencyAnalysis: FrequencyAnalysis;
  deleteFrequencyAnalysis: Scalars['Boolean'];
  batchDeleteFrequencyAnalyses?: Maybe<Scalars['Boolean']>;
  createEventAnalysis: EventAnalysis;
  updateEventAnalysis: EventAnalysis;
  deleteEventAnalysis: Scalars['Boolean'];
  batchDeleteEventAnalyses?: Maybe<Scalars['Boolean']>;
  createRetentionAnalysis: RetentionAnalysis;
  updateRetentionAnalysis: RetentionAnalysis;
  deleteRetentionAnalysis: Scalars['Boolean'];
  batchDeleteRetentionAnalyses?: Maybe<Scalars['Boolean']>;
  createDashboard: Dashboard;
  updateDashboard: Dashboard;
  deleteDashboard: Scalars['Boolean'];
  batchDeleteDashboards?: Maybe<Scalars['Boolean']>;
  updateDashboardComment: DashboardComment;
  deleteDashboardComment: Scalars['Boolean'];
  createDashboardComment: DashboardComment;
  createFunnelDrillDownSegment: DrillDownSegmentReply;
  createRetentionDrillDownSegment: DrillDownSegmentReply;
  createFrequencyDrillDownSegment: DrillDownSegmentReply;
  createFunnelDrillDownSegmentSnapshot: DrillDownSegmentSnapshotReply;
  createRetentionDrillDownSegmentSnapshot: DrillDownSegmentSnapshotReply;
  createFrequencyDrillDownSegmentSnapshot: DrillDownSegmentSnapshotReply;
};

export type MutationSettingUtmArgumentsArgs = {
  utmArguments: Array<UtmArgumentInput>;
};

export type MutationDeleteUtmArgumentArgs = {
  id: Scalars['HashId'];
};

export type MutationSettingPersonaMeasurementsArgs = {
  measurements: Array<MeasurementInput>;
};

export type MutationSettingSegmentMeasurementsArgs = {
  policy: SettingSegmentMeasurementPolicy;
  measurements: Array<MeasurementInput>;
  id?: Maybe<Scalars['HashId']>;
};

export type MutationUpdateProjectInfoArgs = {
  projectInfo?: Maybe<ProjectInfoInput>;
};

export type MutationUpdateOriginDataSettingArgs = {
  originDatas: Array<OriginDataSettingInput>;
};

export type MutationCreateTagArgs = {
  tag: TagInput;
};

export type MutationDeleteTagArgs = {
  id: Scalars['HashId'];
};

export type MutationUpdateTagArgs = {
  id: Scalars['HashId'];
  tag: TagInput;
};

export type MutationBatchDeleteTagsArgs = {
  ids?: Maybe<Array<Scalars['HashId']>>;
};

export type MutationCreateSegmentArgs = {
  segment: SegmentInput;
};

export type MutationDeleteSegmentArgs = {
  id: Scalars['HashId'];
};

export type MutationUpdateSegmentArgs = {
  id: Scalars['HashId'];
  segment: SegmentInput;
};

export type MutationBatchDeleteSegmentsArgs = {
  ids?: Maybe<Array<Scalars['HashId']>>;
};

export type MutationCreateSegmentSnapshotArgs = {
  compute: ComputeDefinitionInput;
};

export type MutationDeleteTunnelArgs = {
  id: Scalars['HashId'];
};

export type MutationCreateTunnelArgs = {
  tunnel: TunnelInput;
};

export type MutationUpdateTunnelArgs = {
  id: Scalars['HashId'];
  tunnel: TunnelInput;
};

export type MutationBatchDeleteTunnelsArgs = {
  ids: Array<Scalars['HashId']>;
};

export type MutationSyncUbaCustomEventArgs = {
  tunnelId: Scalars['HashId'];
  ubaCustomEvents: Array<Maybe<UbaCustomEventInput>>;
};

export type MutationSyncUbaUserVariableArgs = {
  tunnelId: Scalars['HashId'];
  ubaUserVariables: Array<Maybe<UbaUserVariableInput>>;
};

export type MutationExecuteJobArgs = {
  id: Scalars['HashId'];
};

export type MutationCreateEventImportJobArgs = {
  tunnelId: Scalars['HashId'];
  timeRange?: Maybe<Scalars['String']>;
};

export type MutationSubmitTagUserExportJobArgs = {
  tagId: Scalars['HashId'];
  properties?: Maybe<Array<Scalars['String']>>;
  charset?: Maybe<Scalars['String']>;
  detailExport?: Maybe<Scalars['Boolean']>;
};

export type MutationSubmitSegmentUserExportJobArgs = {
  segmentId: Scalars['HashId'];
  tags?: Maybe<Array<Scalars['HashId']>>;
  properties?: Maybe<Array<Scalars['String']>>;
  charset?: Maybe<Scalars['String']>;
};

export type MutationSubmitSegmentSnapshotUserExportJobArgs = {
  id: Scalars['String'];
  properties?: Maybe<Array<Scalars['String']>>;
  charset?: Maybe<Scalars['String']>;
};

export type MutationSubmitAnalysisExportJobArgs = {
  id: Scalars['HashId'];
  param: AnalysisExportJobParam;
  charset?: Maybe<Scalars['String']>;
};

export type MutationCreateSubscriptionArgs = {
  type?: Maybe<SubscriptionType>;
  id: Scalars['HashId'];
};

export type MutationDeleteSubscriptionArgs = {
  type?: Maybe<SubscriptionType>;
  id: Scalars['HashId'];
};

export type MutationBatchUpdateSubscriptionsArgs = {
  type?: Maybe<SubscriptionType>;
  subscriptions?: Maybe<Array<SubscriptionInput>>;
};

export type MutationCreateCategoryArgs = {
  category: CategoryInput;
};

export type MutationUpdateCategoryArgs = {
  id: Scalars['HashId'];
  category: CategoryInput;
};

export type MutationDeleteCategoryArgs = {
  id: Scalars['HashId'];
};

export type MutationAddCategoryResourceArgs = {
  categoryResource?: Maybe<CategoryResourceInput>;
};

export type MutationRemoveCategoryResourcesArgs = {
  categoryResources?: Maybe<Array<Maybe<CategoryResourceInput>>>;
};

export type MutationMoveCategoryResourcesArgs = {
  categoryId: Scalars['HashId'];
  categoryResources?: Maybe<Array<Maybe<CategoryResourceInput>>>;
};

export type MutationRoleAppendUserArgs = {
  roleName: Scalars['String'];
  userId: Scalars['HashId'];
};

export type MutationUpdateUserPermissionsArgs = {
  userId: Scalars['HashId'];
  roleId: Scalars['HashId'];
  permissions?: Maybe<Array<Scalars['HashId']>>;
};

export type MutationUpdateResourceAclsArgs = {
  resourceType?: Maybe<Scalars['String']>;
  resourceId: Scalars['HashId'];
  accessEntry?: Maybe<AccessEntryInput>;
};

export type MutationBatchUpdateResourceAclArgs = {
  resourceType?: Maybe<Scalars['String']>;
  resourceIds: Array<Scalars['HashId']>;
  readers?: Maybe<Array<Scalars['HashId']>>;
  editors?: Maybe<Array<Scalars['HashId']>>;
};

export type MutationCreateRoleArgs = {
  role: RoleInput;
};

export type MutationDeleteRoleArgs = {
  id: Scalars['HashId'];
};

export type MutationUpdateRoleArgs = {
  id: Scalars['HashId'];
  role: RoleInput;
};

export type MutationCreateDepartmentArgs = {
  department?: Maybe<DepartmentInput>;
};

export type MutationUpdateDepartmentArgs = {
  id: Scalars['HashId'];
  department: DepartmentInput;
};

export type MutationDeleteDepartmentArgs = {
  id: Scalars['HashId'];
};

export type MutationAddMembersToDepartmentArgs = {
  memberIds: Array<Scalars['HashId']>;
  departmentId?: Maybe<Scalars['String']>;
};

export type MutationUpdateMemberRoleArgs = {
  memberId: Scalars['HashId'];
  roleId: Scalars['HashId'];
};

export type MutationCreateAccountArgs = {
  email: Scalars['String'];
  roleId: Scalars['HashId'];
  permissions: Array<Scalars['HashId']>;
  extra?: Maybe<Scalars['String']>;
};

export type MutationDisableAccountArgs = {
  id: Scalars['HashId'];
};

export type MutationResetAccountPasswordArgs = {
  id: Scalars['HashId'];
};

export type MutationCreateMemberArgs = {
  input: MemberInput;
};

export type MutationResetPasswordArgs = {
  input?: Maybe<ResetPasswordInput>;
};

export type MutationUpdateMemberArgs = {
  id: Scalars['HashId'];
  input?: Maybe<MemberInput>;
};

export type MutationCreateElementArgs = {
  element: ElementInput;
};

export type MutationUpdateElementArgs = {
  id: Scalars['HashId'];
  element: ElementUpdateInput;
};

export type MutationDeleteElementArgs = {
  id: Scalars['HashId'];
};

export type MutationBatchDeleteElementsArgs = {
  ids: Array<Scalars['HashId']>;
};

export type MutationCreateCustomEventArgs = {
  customEvent: CustomEventInput;
};

export type MutationUpdateCustomEventArgs = {
  id: Scalars['HashId'];
  customEvent: CustomEventInput;
};

export type MutationDeleteCustomEventArgs = {
  id: Scalars['HashId'];
};

export type MutationBatchDeleteCustomEventsArgs = {
  ids: Array<Scalars['HashId']>;
};

export type MutationCreateComplexMetricArgs = {
  complexMetric: ComplexMetricInput;
};

export type MutationUpdateComplexMetricArgs = {
  id: Scalars['HashId'];
  complexMetric: ComplexMetricInput;
};

export type MutationDeleteComplexMetricArgs = {
  id: Scalars['HashId'];
};

export type MutationBatchDeleteComplexMetricsArgs = {
  ids: Array<Scalars['HashId']>;
};

export type MutationCreateEventVariableArgs = {
  eventVariable: VariableInput;
};

export type MutationUpdateEventVariableArgs = {
  id: Scalars['HashId'];
  eventVariable: VariableInput;
};

export type MutationDeleteEventVariableArgs = {
  id: Scalars['HashId'];
};

export type MutationBatchDeleteEventVariablesArgs = {
  ids: Array<Scalars['HashId']>;
};

export type MutationCreateItemVariableArgs = {
  itemVariable: VariableInput;
};

export type MutationUpdateItemVariableArgs = {
  id: Scalars['HashId'];
  itemVariable: VariableInput;
};

export type MutationDeleteItemVariableArgs = {
  id: Scalars['HashId'];
};

export type MutationBatchDeleteItemVariablesArgs = {
  ids: Array<Scalars['HashId']>;
};

export type MutationCreateItemModelArgs = {
  itemModel: ItemModelInput;
};

export type MutationUpdateItemModelArgs = {
  id: Scalars['HashId'];
  itemModel: ItemModelInput;
};

export type MutationDeleteItemModelArgs = {
  id: Scalars['HashId'];
};

export type MutationBatchDeleteItemModelsArgs = {
  ids: Array<Scalars['HashId']>;
};

export type MutationAddItemModelAttributeArgs = {
  id: Scalars['HashId'];
  attribute: ItemVariableInput;
};

export type MutationCreateUserVariableArgs = {
  userVariable: VariableInput;
};

export type MutationUpdateUserVariableArgs = {
  id: Scalars['HashId'];
  userVariable: VariableInput;
};

export type MutationDeleteUserVariableArgs = {
  id: Scalars['HashId'];
};

export type MutationBatchDeleteUserVariablesArgs = {
  ids: Array<Scalars['HashId']>;
};

export type MutationCreateKpiAnalysisArgs = {
  kpiAnalysis: KpiAnalysisInput;
};

export type MutationUpdateKpiAnalysisArgs = {
  id: Scalars['HashId'];
  kpiAnalysis: KpiAnalysisInput;
};

export type MutationDeleteKpiAnalysisArgs = {
  id: Scalars['HashId'];
};

export type MutationBatchDeleteKpiAnalysesArgs = {
  ids: Array<Scalars['HashId']>;
};

export type MutationCreateFunnelAnalysisArgs = {
  funnelAnalysis: FunnelAnalysisInput;
};

export type MutationUpdateFunnelAnalysisArgs = {
  id: Scalars['HashId'];
  funnelAnalysis: FunnelAnalysisInput;
};

export type MutationDeleteFunnelAnalysisArgs = {
  id: Scalars['HashId'];
};

export type MutationBatchDeleteFunnelAnalysesArgs = {
  ids: Array<Scalars['HashId']>;
};

export type MutationCreateFrequencyAnalysisArgs = {
  frequencyAnalysis: FrequencyAnalysisInput;
};

export type MutationUpdateFrequencyAnalysisArgs = {
  id: Scalars['HashId'];
  frequencyAnalysis: FrequencyAnalysisInput;
};

export type MutationDeleteFrequencyAnalysisArgs = {
  id: Scalars['HashId'];
};

export type MutationBatchDeleteFrequencyAnalysesArgs = {
  ids: Array<Scalars['HashId']>;
};

export type MutationCreateEventAnalysisArgs = {
  eventAnalysis: EventAnalysisInput;
};

export type MutationUpdateEventAnalysisArgs = {
  id: Scalars['HashId'];
  eventAnalysis: EventAnalysisInput;
};

export type MutationDeleteEventAnalysisArgs = {
  id: Scalars['HashId'];
};

export type MutationBatchDeleteEventAnalysesArgs = {
  ids: Array<Scalars['HashId']>;
};

export type MutationCreateRetentionAnalysisArgs = {
  retentionAnalysis: RetentionAnalysisInput;
};

export type MutationUpdateRetentionAnalysisArgs = {
  id: Scalars['HashId'];
  retentionAnalysis: RetentionAnalysisInput;
};

export type MutationDeleteRetentionAnalysisArgs = {
  id: Scalars['HashId'];
};

export type MutationBatchDeleteRetentionAnalysesArgs = {
  ids: Array<Scalars['HashId']>;
};

export type MutationCreateDashboardArgs = {
  dashboard: DashboardInput;
};

export type MutationUpdateDashboardArgs = {
  id: Scalars['HashId'];
  dashboard: DashboardInput;
};

export type MutationDeleteDashboardArgs = {
  id: Scalars['HashId'];
};

export type MutationBatchDeleteDashboardsArgs = {
  ids: Array<Scalars['HashId']>;
};

export type MutationUpdateDashboardCommentArgs = {
  id: Scalars['HashId'];
  dashboardComment: DashboardCommentInput;
};

export type MutationDeleteDashboardCommentArgs = {
  id: Scalars['HashId'];
};

export type MutationCreateDashboardCommentArgs = {
  dashboardComment: DashboardCommentInput;
};

export type MutationCreateFunnelDrillDownSegmentArgs = {
  funnelDrillDownSegment: FunnelDrillDownSegmentInput;
};

export type MutationCreateRetentionDrillDownSegmentArgs = {
  retentionDrillDownSegment: RetentionDrillDownSegmentInput;
};

export type MutationCreateFrequencyDrillDownSegmentArgs = {
  frequencyDrillDownSegment: FrequencyDrillDownSegmentInput;
};

export type MutationCreateFunnelDrillDownSegmentSnapshotArgs = {
  funnelDrillDownSegment: FunnelDrillDownSegmentInput;
};

export type MutationCreateRetentionDrillDownSegmentSnapshotArgs = {
  retentionDrillDownSegment: RetentionDrillDownSegmentInput;
};

export type MutationCreateFrequencyDrillDownSegmentSnapshotArgs = {
  frequencyDrillDownSegment: FrequencyDrillDownSegmentInput;
};

export type NamedEntity = {
  id: Scalars['HashId'];
  name: Scalars['String'];
  creatorId: Scalars['HashId'];
  createdAt: Scalars['DateTime'];
  updaterId?: Maybe<Scalars['HashId']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  creator?: Maybe<Scalars['String']>;
  updater?: Maybe<Scalars['String']>;
};

export type ObjectIdentity = {
  __typename?: 'ObjectIdentity';
  resourceId?: Maybe<Scalars['HashId']>;
  resourceType?: Maybe<Scalars['String']>;
};

export type Order = {
  __typename?: 'Order';
  id?: Maybe<Scalars['String']>;
  isDim?: Maybe<Scalars['Boolean']>;
  index?: Maybe<Scalars['Int']>;
  valueIndex?: Maybe<Scalars['Int']>;
  orderType?: Maybe<Scalars['String']>;
};

export type OrderInput = {
  id?: Maybe<Scalars['String']>;
  isDim: Scalars['Boolean'];
  index?: Maybe<Scalars['Int']>;
  valueIndex?: Maybe<Scalars['Int']>;
  orderType: Scalars['String'];
};

export type OriginDataSetting = {
  __typename?: 'OriginDataSetting';
  key: Scalars['String'];
  dayTTL?: Maybe<Scalars['Long']>;
};

export type OriginDataSettingInput = {
  key: Scalars['String'];
  dayTTL: Scalars['Long'];
};

export type Permission = {
  __typename?: 'Permission';
  id?: Maybe<Scalars['HashId']>;
  action?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
};

export type PermissionInput = {
  action: Scalars['String'];
};

export type PersonaProfile = {
  __typename?: 'PersonaProfile';
  id: Scalars['String'];
  name?: Maybe<Scalars['String']>;
  properties?: Maybe<Array<Maybe<Property>>>;
};

export type PlatformType = 'ANDROID' | 'IOS' | 'WEB' | 'MINP';

export type PreparedDimension = {
  __typename?: 'PreparedDimension';
  id: Scalars['String'];
  name: Scalars['String'];
  platforms: Array<Maybe<Scalars['String']>>;
  description?: Maybe<Scalars['String']>;
  example?: Maybe<Scalars['String']>;
};

export type PreparedMetric = {
  __typename?: 'PreparedMetric';
  id: Scalars['String'];
  name: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  instruction: Scalars['String'];
  platforms: Array<Maybe<Scalars['String']>>;
};

export type PreparedSegment = {
  __typename?: 'PreparedSegment';
  id: Scalars['String'];
  name: Scalars['String'];
  detector?: Maybe<Detector>;
};

export type PrimitiveType = 'INT' | 'STRING' | 'DOUBLE' | 'DATE';

export type ProjectInfo = {
  __typename?: 'ProjectInfo';
  id: Scalars['HashId'];
  name: Scalars['String'];
  logo?: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
};

export type ProjectInfoInput = {
  name?: Maybe<Scalars['String']>;
  logo?: Maybe<Scalars['String']>;
};

export type Property = {
  __typename?: 'Property';
  key: Scalars['String'];
  name?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  personaMeasurements?: Maybe<Array<Maybe<Measurement>>>;
  segmentMeasurements?: Maybe<Array<Maybe<Measurement>>>;
  utmArguments?: Maybe<Array<Maybe<UtmArgument>>>;
  projectInfo: ProjectInfo;
  originDataSettings: Array<Maybe<OriginDataSetting>>;
  crystalBallUserInfoPanels?: Maybe<Array<Maybe<CrystalBallUserInfoPanel>>>;
  tags?: Maybe<Array<Maybe<Tag>>>;
  tag?: Maybe<Tag>;
  countTags?: Maybe<Scalars['Int']>;
  segments?: Maybe<Array<Maybe<Segment>>>;
  segment?: Maybe<Segment>;
  countSegments?: Maybe<Scalars['Int']>;
  basicProfile?: Maybe<BasicProfile>;
  personaProfile?: Maybe<PersonaProfile>;
  userProfile?: Maybe<UserProfile>;
  userProfileWithTime?: Maybe<Array<Maybe<TimeUserProfile>>>;
  userEventsTrend?: Maybe<EventTrend>;
  searchUsers?: Maybe<Array<Maybe<UserSearch>>>;
  users: SlicePagination;
  activeUsers: SlicePagination;
  userEvents: CursorPagination;
  userEventCount?: Maybe<UserEventCount>;
  searchUserEvents: Array<Scalars['String']>;
  /**
   * activeToday: 今日活跃用户
   * activeInThreeWeeks: 近 3 周活跃用户
   * activeNotInTwoWeeks: 近 2 周不活跃用户
   */
  preparedSegment?: Maybe<PreparedSegment>;
  segmentDocument?: Maybe<SegmentDocument>;
  tunnels?: Maybe<Array<Maybe<Tunnel>>>;
  tunnel?: Maybe<Tunnel>;
  countTunnels?: Maybe<Scalars['Int']>;
  ubaCustomEvents?: Maybe<Array<Maybe<CustomEvent>>>;
  ubaUserVariables?: Maybe<Array<Maybe<UserVariable>>>;
  tunnelActivated: Scalars['Boolean'];
  getTunnelEventsTrend?: Maybe<TunnelEventsTrend>;
  jobResult?: Maybe<JobResult>;
  eventImportJobs?: Maybe<Array<EventImportJob>>;
  jobLogs?: Maybe<Array<LogEntry>>;
  jobFiles?: Maybe<Array<FileDescriptor>>;
  subscriptions?: Maybe<Array<Subscription>>;
  features: Array<Feature>;
  version: Scalars['String'];
  categories?: Maybe<Array<Maybe<Category>>>;
  category?: Maybe<Category>;
  resourceCategory?: Maybe<Category>;
  defaultCategory?: Maybe<Category>;
  searchCategories?: Maybe<Array<Maybe<Category>>>;
  treeLikeCategories?: Maybe<Array<Maybe<Category>>>;
  treeLikeCategoryWithResource?: Maybe<Category>;
  userPermissionModules?: Maybe<Array<Maybe<Module>>>;
  permissionModules?: Maybe<Array<Maybe<Module>>>;
  role?: Maybe<Role>;
  roles?: Maybe<Array<Maybe<Role>>>;
  acls?: Maybe<Array<Maybe<UserAccessCtrl>>>;
  resourceActions?: Maybe<Array<Maybe<Scalars['String']>>>;
  userGrants?: Maybe<AccessEntry>;
  departments?: Maybe<Array<Department>>;
  allDepartments?: Maybe<Array<Department>>;
  resourceTrees?: Maybe<Array<Maybe<TreeNode>>>;
  /** 检验SDK安装匹配 */
  verifyProjectAi: Scalars['Boolean'];
  customEvents?: Maybe<Array<Maybe<CustomEvent>>>;
  customEvent?: Maybe<CustomEvent>;
  countCustomEvents?: Maybe<Scalars['Int']>;
  elements?: Maybe<Array<Maybe<Element>>>;
  element?: Maybe<Element>;
  simpleEvents?: Maybe<Array<Maybe<SimpleEvent>>>;
  complexMetrics?: Maybe<Array<Maybe<ComplexMetric>>>;
  complexMetric?: Maybe<ComplexMetric>;
  preparedMetrics?: Maybe<Array<Maybe<PreparedMetric>>>;
  countComplexMetrics?: Maybe<Scalars['Int']>;
  eventVariables?: Maybe<Array<Maybe<EventVariable>>>;
  eventVariable?: Maybe<EventVariable>;
  countEventVariables?: Maybe<Scalars['Int']>;
  itemModels?: Maybe<Array<Maybe<ItemModel>>>;
  itemModel?: Maybe<ItemModel>;
  itemVariables?: Maybe<Array<Maybe<ItemVariable>>>;
  itemVariable?: Maybe<ItemVariable>;
  countItemVariables?: Maybe<Scalars['Int']>;
  userVariables?: Maybe<Array<Maybe<UserVariable>>>;
  userVariable?: Maybe<UserVariable>;
  countUserVariables?: Maybe<Scalars['Int']>;
  userProperties?: Maybe<Array<Maybe<UserProperty>>>;
  preparedDimensions?: Maybe<Array<Maybe<PreparedDimension>>>;
  measurements?: Maybe<Array<Maybe<Measurable>>>;
  insightDimensions?: Maybe<Array<Maybe<Dimension>>>;
  kpiAnalysis?: Maybe<KpiAnalysis>;
  kpiAnalyses?: Maybe<Array<Maybe<KpiAnalysis>>>;
  countKpiAnalyses?: Maybe<Scalars['Int']>;
  funnelAnalysis?: Maybe<FunnelAnalysis>;
  funnelAnalyses?: Maybe<Array<Maybe<FunnelAnalysis>>>;
  countFunnelAnalyses?: Maybe<Scalars['Int']>;
  frequencyAnalysis?: Maybe<FrequencyAnalysis>;
  frequencyAnalyses?: Maybe<Array<Maybe<FrequencyAnalysis>>>;
  countFrequencyAnalyses?: Maybe<Scalars['Int']>;
  eventAnalysis?: Maybe<EventAnalysis>;
  eventAnalyses?: Maybe<Array<Maybe<EventAnalysis>>>;
  countEventAnalyses?: Maybe<Scalars['Int']>;
  retentionAnalysis?: Maybe<RetentionAnalysis>;
  retentionAnalyses?: Maybe<Array<Maybe<RetentionAnalysis>>>;
  countRetentionAnalyses?: Maybe<Scalars['Int']>;
  dashboard?: Maybe<Dashboard>;
  dashboards?: Maybe<Array<Maybe<Dashboard>>>;
  countDashboards?: Maybe<Scalars['Int']>;
  analysisDashboardReferers?: Maybe<Array<Maybe<DashboardReference>>>;
  dashboardComment?: Maybe<DashboardComment>;
  crystalBallDashboard?: Maybe<Dashboard>;
  crystalBallDashboards?: Maybe<Array<Maybe<Dashboard>>>;
  crystalBallKpiAnalysis?: Maybe<KpiAnalysis>;
  crystalBallEventAnalysis?: Maybe<EventAnalysis>;
  crystalBallTrackOverviewAnalysis?: Maybe<TrackOverviewAnalysis>;
  crystalBallFrequencyAnalysis?: Maybe<FrequencyAnalysis>;
  crystalBallDashboardComment?: Maybe<DashboardComment>;
};

export type QuerySegmentMeasurementsArgs = {
  policy: SettingSegmentMeasurementPolicy;
  id?: Maybe<Scalars['HashId']>;
};

export type QueryTagArgs = {
  id: Scalars['HashId'];
};

export type QuerySegmentArgs = {
  id: Scalars['HashId'];
};

export type QueryBasicProfileArgs = {
  id: Scalars['String'];
};

export type QueryPersonaProfileArgs = {
  id: Scalars['String'];
};

export type QueryUserProfileArgs = {
  userId?: Maybe<Scalars['String']>;
  tags?: Maybe<Array<Scalars['HashId']>>;
  properties?: Maybe<Array<Scalars['String']>>;
};

export type QueryUserProfileWithTimeArgs = {
  userId: Scalars['String'];
  tags: Array<Maybe<Scalars['HashId']>>;
  properties?: Maybe<Array<Scalars['String']>>;
};

export type QueryUserEventsTrendArgs = {
  id: Scalars['String'];
  type: UserEventType;
  timeRange?: Maybe<Scalars['String']>;
  interval?: Maybe<Scalars['Long']>;
  eventKeys?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type QuerySearchUsersArgs = {
  q: Scalars['String'];
  searchProperty?: Maybe<Scalars['String']>;
  properties?: Maybe<Array<Scalars['String']>>;
};

export type QueryUsersArgs = {
  type: UserQueryType;
  id: Scalars['String'];
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
};

export type QueryActiveUsersArgs = {
  timeRange: Scalars['String'];
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
};

export type QueryUserEventsArgs = {
  id: Scalars['String'];
  type: UserEventType;
  timeRange?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  last?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
  limit?: Maybe<Scalars['Int']>;
};

export type QueryUserEventCountArgs = {
  id: Scalars['String'];
  timeRange: Scalars['String'];
  eventKeys?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type QuerySearchUserEventsArgs = {
  id: Scalars['String'];
  q: Scalars['String'];
  timeRange?: Maybe<Scalars['String']>;
};

export type QueryPreparedSegmentArgs = {
  id?: Maybe<Scalars['String']>;
};

export type QuerySegmentDocumentArgs = {
  id: Scalars['HashId'];
};

export type QueryTunnelArgs = {
  id: Scalars['HashId'];
};

export type QueryUbaCustomEventsArgs = {
  tunnelId: Scalars['HashId'];
};

export type QueryUbaUserVariablesArgs = {
  tunnelId: Scalars['HashId'];
};

export type QueryTunnelActivatedArgs = {
  id: Scalars['HashId'];
};

export type QueryGetTunnelEventsTrendArgs = {
  id?: Maybe<Scalars['HashId']>;
};

export type QueryJobResultArgs = {
  id: Scalars['String'];
};

export type QueryJobLogsArgs = {
  id: Scalars['HashId'];
};

export type QueryJobFilesArgs = {
  id: Scalars['HashId'];
};

export type QuerySubscriptionsArgs = {
  type?: Maybe<SubscriptionType>;
};

export type QueryCategoryArgs = {
  id?: Maybe<Scalars['HashId']>;
};

export type QueryResourceCategoryArgs = {
  categoryResource: CategoryResourceInput;
};

export type QuerySearchCategoriesArgs = {
  q: Scalars['String'];
};

export type QueryTreeLikeCategoryWithResourceArgs = {
  id?: Maybe<Scalars['HashId']>;
};

export type QueryUserPermissionModulesArgs = {
  userId: Scalars['HashId'];
};

export type QueryRoleArgs = {
  id: Scalars['HashId'];
};

export type QueryAclsArgs = {
  resourceType?: Maybe<Scalars['String']>;
};

export type QueryResourceActionsArgs = {
  resourceType?: Maybe<Scalars['String']>;
  resourceId?: Maybe<Scalars['Long']>;
};

export type QueryUserGrantsArgs = {
  resourceType?: Maybe<Scalars['String']>;
  resourceId?: Maybe<Scalars['Long']>;
};

export type QueryDepartmentsArgs = {
  parentId?: Maybe<Scalars['String']>;
};

export type QueryVerifyProjectAiArgs = {
  ai: Scalars['String'];
};

export type QueryCustomEventArgs = {
  id: Scalars['HashId'];
};

export type QueryElementArgs = {
  id: Scalars['HashId'];
};

export type QuerySimpleEventsArgs = {
  elementId: Scalars['HashId'];
};

export type QueryComplexMetricArgs = {
  id: Scalars['HashId'];
};

export type QueryEventVariableArgs = {
  id: Scalars['HashId'];
};

export type QueryItemModelArgs = {
  id: Scalars['HashId'];
};

export type QueryItemVariableArgs = {
  id: Scalars['HashId'];
};

export type QueryUserVariableArgs = {
  id: Scalars['HashId'];
};

export type QueryMeasurementsArgs = {
  t?: Maybe<Array<Maybe<Scalars['String']>>>;
  q?: Maybe<Scalars['String']>;
  c?: Maybe<Scalars['String']>;
};

export type QueryInsightDimensionsArgs = {
  measurements?: Maybe<Array<Maybe<MeasurementInput>>>;
  targetUsers?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type QueryKpiAnalysisArgs = {
  id: Scalars['HashId'];
  dashboardId?: Maybe<Scalars['String']>;
};

export type QueryFunnelAnalysisArgs = {
  id: Scalars['HashId'];
  dashboardId?: Maybe<Scalars['String']>;
};

export type QueryFrequencyAnalysisArgs = {
  id: Scalars['HashId'];
  dashboardId?: Maybe<Scalars['String']>;
};

export type QueryEventAnalysisArgs = {
  id: Scalars['HashId'];
  dashboardId?: Maybe<Scalars['String']>;
};

export type QueryRetentionAnalysisArgs = {
  id: Scalars['HashId'];
  dashboardId?: Maybe<Scalars['String']>;
};

export type QueryDashboardArgs = {
  id: Scalars['HashId'];
};

export type QueryAnalysisDashboardReferersArgs = {
  resourceType: Scalars['String'];
  resourceId: Scalars['HashId'];
};

export type QueryDashboardCommentArgs = {
  id: Scalars['HashId'];
};

export type QueryCrystalBallDashboardArgs = {
  id: Scalars['HashId'];
};

export type QueryCrystalBallKpiAnalysisArgs = {
  id: Scalars['HashId'];
};

export type QueryCrystalBallEventAnalysisArgs = {
  id: Scalars['HashId'];
};

export type QueryCrystalBallTrackOverviewAnalysisArgs = {
  id: Scalars['HashId'];
};

export type QueryCrystalBallFrequencyAnalysisArgs = {
  id: Scalars['HashId'];
};

export type QueryCrystalBallDashboardCommentArgs = {
  id: Scalars['HashId'];
};

export type ResetPasswordInput = {
  id: Scalars['HashId'];
  password: Scalars['String'];
};

export type RetentionAnalysis = NamedEntity & {
  __typename?: 'RetentionAnalysis';
  id: Scalars['HashId'];
  name: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  measurements: Array<Maybe<Measurement>>;
  range: Scalars['String'];
  eventType?: Maybe<Scalars['String']>;
  timeRange: Scalars['String'];
  targetUser?: Maybe<TargetUser>;
  currentTurn?: Maybe<Scalars['Int']>;
  splitter?: Maybe<Splitter>;
  chartType: Scalars['String'];
  creatorId: Scalars['HashId'];
  createdAt: Scalars['DateTime'];
  updaterId?: Maybe<Scalars['HashId']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  creator?: Maybe<Scalars['String']>;
  updater?: Maybe<Scalars['String']>;
};

export type RetentionAnalysisInput = {
  name: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  measurements?: Maybe<Array<MeasurementInput>>;
  range: Scalars['String'];
  eventType?: Maybe<Scalars['String']>;
  timeRange: Scalars['String'];
  targetUser: TargetUserInput;
  splitter?: Maybe<SplitterInput>;
  currentTurn?: Maybe<Scalars['Int']>;
  chartType: Scalars['String'];
};

export type RetentionDrillDownSegmentInput = {
  name: Scalars['String'];
  time: Scalars['Long'];
  timeIndex: Scalars['Int'];
  excluded: Scalars['Boolean'];
  scheduler: SchedulerType;
  dimensionValue?: Maybe<Scalars['String']>;
  action?: Maybe<ActionInput>;
  targetUser?: Maybe<TargetUserInput>;
  triggerTimeRange: Scalars['String'];
  returnTimeRange: Scalars['String'];
  analysis: RetentionAnalysisInput;
};

export type Role = {
  __typename?: 'Role';
  id?: Maybe<Scalars['HashId']>;
  name?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  members?: Maybe<Array<Member>>;
  permissions?: Maybe<Array<Permission>>;
  isSystem?: Maybe<Scalars['Boolean']>;
  isRoot?: Maybe<Scalars['Boolean']>;
  isTechSupport?: Maybe<Scalars['Boolean']>;
};

export type RoleInput = {
  name: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  permissions?: Maybe<Array<Scalars['HashId']>>;
  members?: Maybe<Array<Scalars['HashId']>>;
};

export type SchedulerType = 'DAILY' | 'ONCE' | 'WEEKLY';

export type Screenshot = {
  __typename?: 'Screenshot';
  target?: Maybe<Scalars['String']>;
  viewport?: Maybe<Scalars['String']>;
};

export type ScreenshotInput = {
  target?: Maybe<Scalars['String']>;
  viewport?: Maybe<Scalars['String']>;
};

export type Segment = NamedEntity & {
  __typename?: 'Segment';
  id: Scalars['HashId'];
  name: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  compute: ComputeDefinition;
  scheduler: Scalars['String'];
  creatorId: Scalars['HashId'];
  createdAt: Scalars['DateTime'];
  updaterId?: Maybe<Scalars['HashId']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  creator?: Maybe<Scalars['String']>;
  updater?: Maybe<Scalars['String']>;
  createdBy?: Maybe<Scalars['String']>;
  detector?: Maybe<Detector>;
};

export type SegmentCreatedByType =
  | 'DIRECT'
  | 'FROM_FILES'
  | 'FROM_FUNNEL'
  | 'FROM_RETENTION'
  | 'FROM_FREQUENCY'
  | 'FROM_WXAPP'
  | 'FROM_SHARE_CHAIN';

export type SegmentDocument = {
  __typename?: 'SegmentDocument';
  id: Scalars['HashId'];
  fileName: Scalars['String'];
  sourceType: Scalars['String'];
};

export type SegmentInput = {
  name: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  compute: ComputeDefinitionInput;
  scheduler: SchedulerType;
  createdBy: SegmentCreatedByType;
};

export type SegmentMeasurementInput = {
  measurement: MeasurementInput;
  timeRange: Scalars['String'];
};

export type SegmentSnapshot = {
  __typename?: 'SegmentSnapshot';
  id: Scalars['String'];
  totalUsers?: Maybe<Scalars['Int']>;
  usersRatio?: Maybe<Scalars['Float']>;
};

export type SegmentUserExportJob = JobEntity & {
  __typename?: 'SegmentUserExportJob';
  id: Scalars['String'];
  name: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  stage: JobStage;
  creatorId: Scalars['HashId'];
  createdAt: Scalars['DateTime'];
  updaterId?: Maybe<Scalars['HashId']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  creator?: Maybe<Scalars['String']>;
  updater?: Maybe<Scalars['String']>;
  error?: Maybe<Error>;
};

export type SettingSegmentMeasurementPolicy = 'APPLY_TO_MEMBER' | 'APPLY_TO_SEGMENT';

export type SimpleEvent = NamedEntity & {
  __typename?: 'SimpleEvent';
  id: Scalars['HashId'];
  name: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  elementId: Scalars['HashId'];
  platforms?: Maybe<Array<Maybe<Scalars['String']>>>;
  docType: Scalars['String'];
  action: Scalars['String'];
  isSystem: Scalars['Boolean'];
  businessType?: Maybe<Scalars['String']>;
  creatorId: Scalars['HashId'];
  createdAt: Scalars['DateTime'];
  updaterId?: Maybe<Scalars['HashId']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  creator?: Maybe<Scalars['String']>;
  updater?: Maybe<Scalars['String']>;
};

export type SlicePagination = {
  __typename?: 'SlicePagination';
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  totalCount?: Maybe<Scalars['Int']>;
  hasNextPage?: Maybe<Scalars['Boolean']>;
  hasPreviousPage?: Maybe<Scalars['Boolean']>;
  values: Array<Maybe<Entity>>;
};

export type Splitter = {
  __typename?: 'Splitter';
  key: Scalars['String'];
  values?: Maybe<Array<Maybe<Scalars['String']>>>;
  users?: Maybe<Array<Maybe<TargetUser>>>;
  actions?: Maybe<Array<Maybe<Action>>>;
  splitters?: Maybe<Array<Maybe<Splitter>>>;
  selectedValues?: Maybe<Array<Maybe<Scalars['String']>>>;
  selectedIndices?: Maybe<Array<Maybe<Scalars['Int']>>>;
  valueType?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
};

export type SplitterInput = {
  key: Scalars['String'];
  values?: Maybe<Array<Maybe<Scalars['String']>>>;
  users?: Maybe<Array<Maybe<TargetUserInput>>>;
  actions?: Maybe<Array<Maybe<ActionInput>>>;
  splitters?: Maybe<Array<Maybe<SplitterInput>>>;
  selectedValues?: Maybe<Array<Maybe<Scalars['String']>>>;
  selectedIndices?: Maybe<Array<Maybe<Scalars['Int']>>>;
  valueType?: Maybe<Scalars['String']>;
};

export type Subscription = {
  __typename?: 'Subscription';
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['String']>;
  children?: Maybe<Array<Subscription>>;
};

export type SubscriptionInput = {
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  children?: Maybe<Array<Maybe<SubscriptionInput>>>;
};

export type SubscriptionType = 'DASHBOARD';

export type Tag = NamedEntity & {
  __typename?: 'Tag';
  id: Scalars['HashId'];
  name: Scalars['String'];
  key?: Maybe<Scalars['String']>;
  type: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  computes: Array<Maybe<ComputeDefinition>>;
  creatorId: Scalars['HashId'];
  createdAt: Scalars['DateTime'];
  updaterId?: Maybe<Scalars['HashId']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  creator?: Maybe<Scalars['String']>;
  updater?: Maybe<Scalars['String']>;
  valueType?: Maybe<ValueType>;
  detector?: Maybe<Detector>;
};

export type TagInput = {
  name: Scalars['String'];
  /**     key: String! */
  type: TagType;
  description?: Maybe<Scalars['String']>;
  computes: Array<Maybe<ComputeDefinitionInput>>;
};

export type TagType = 'HORIZONTAL' | 'AGGREGATED' | 'TOP_N_ATTRIBUTE' | 'DATA_SET_ATTRIBUTE' | 'ATTRIBUTION_ATTRIBUTE';

export type TagUserExportJob = JobEntity & {
  __typename?: 'TagUserExportJob';
  id: Scalars['String'];
  name: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  stage: JobStage;
  creatorId: Scalars['HashId'];
  createdAt: Scalars['DateTime'];
  updaterId?: Maybe<Scalars['HashId']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  creator?: Maybe<Scalars['String']>;
  updater?: Maybe<Scalars['String']>;
  error?: Maybe<Error>;
};

export type TargetUser = {
  __typename?: 'TargetUser';
  id: Scalars['String'];
  name?: Maybe<Scalars['String']>;
};

export type TargetUserInput = {
  id: Scalars['String'];
};

export type TimeUserProfile = {
  __typename?: 'TimeUserProfile';
  updatedAt?: Maybe<Scalars['DateTime']>;
  property?: Maybe<InsensitiveProperty>;
};

export type TrackOverviewAnalysis = NamedEntity & {
  __typename?: 'TrackOverviewAnalysis';
  id: Scalars['HashId'];
  name: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  measurements: Array<Maybe<Measurement>>;
  timeRange?: Maybe<Scalars['String']>;
  filter?: Maybe<Filter>;
  targetUser?: Maybe<TargetUser>;
  chartType: Scalars['String'];
  isSystem?: Maybe<Scalars['Boolean']>;
  businessType?: Maybe<Scalars['String']>;
  creatorId: Scalars['HashId'];
  createdAt: Scalars['DateTime'];
  updaterId?: Maybe<Scalars['HashId']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  creator?: Maybe<Scalars['String']>;
  updater?: Maybe<Scalars['String']>;
};

export type TreeNode = {
  __typename?: 'TreeNode';
  id?: Maybe<Scalars['HashId']>;
  name?: Maybe<Scalars['String']>;
  type: Scalars['String'];
  resourceId?: Maybe<Scalars['HashId']>;
  parentId?: Maybe<Scalars['HashId']>;
  children?: Maybe<Array<Maybe<TreeNode>>>;
};

export type TrendPoint = {
  __typename?: 'TrendPoint';
  timestamp: Scalars['Long'];
  count: Scalars['Int'];
};

export type Tunnel = NamedEntity & {
  __typename?: 'Tunnel';
  id: Scalars['HashId'];
  name: Scalars['String'];
  type: Scalars['String'];
  config?: Maybe<TunnelConfig>;
  description?: Maybe<Scalars['String']>;
  key: Scalars['String'];
  projectKey: Scalars['String'];
  creatorId: Scalars['HashId'];
  createdAt: Scalars['DateTime'];
  updaterId?: Maybe<Scalars['HashId']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  creator?: Maybe<Scalars['String']>;
  updater?: Maybe<Scalars['String']>;
};

export type TunnelConfig =
  | JdbcTunnelConfig
  | GioApiTunnelConfig
  | FileTunnelConfig
  | MobileTunnelConfig
  | MiniProgramTunnelConfig;

export type TunnelEventsTrend = {
  __typename?: 'TunnelEventsTrend';
  totalCount: Scalars['Long'];
  interval: Scalars['Long'];
  points: Array<Maybe<TrendPoint>>;
};

export type TunnelInput = {
  name: Scalars['String'];
  type: TunnelType;
  description?: Maybe<Scalars['String']>;
  config?: Maybe<Scalars['Object']>;
};

export type TunnelType = 'UBA' | 'FILE' | 'MOBILE' | 'SERVER' | 'MINI_PROGRAM' | 'WEB';

export type UbaCustomEventInput = {
  key: Scalars['String'];
  name: Scalars['String'];
  valueType: Scalars['String'];
  variables?: Maybe<Array<UbaCustomEventVariableInput>>;
  isSystem: Scalars['Boolean'];
};

export type UbaCustomEventVariableInput = {
  key: Scalars['String'];
  name: Scalars['String'];
  valueType: Scalars['String'];
};

export type UbaUserVariableInput = {
  key: Scalars['String'];
  name: Scalars['String'];
  type: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  isSystem: Scalars['Boolean'];
};

export type UserAccessCtrl = {
  __typename?: 'UserAccessCtrl';
  resourceId?: Maybe<Scalars['HashId']>;
  resourceType?: Maybe<Scalars['String']>;
  memberId?: Maybe<Scalars['HashId']>;
  actions?: Maybe<Array<Scalars['String']>>;
};

export type UserEvent = {
  __typename?: 'UserEvent';
  name?: Maybe<Scalars['String']>;
  type: UserEventType;
  key?: Maybe<Scalars['String']>;
  timestamp?: Maybe<Scalars['DateTime']>;
  properties?: Maybe<Array<Property>>;
};

export type UserEventCount = {
  __typename?: 'UserEventCount';
  stats?: Maybe<Array<Maybe<EventStat>>>;
  totalOfChangeRate?: Maybe<Scalars['Float']>;
};

export type UserEventType = 'ALL' | 'VISIT' | 'CUSTOM_EVENT' | 'PAGE' | 'UNKNOWN';

export type UserProfile = {
  __typename?: 'UserProfile';
  id: Scalars['String'];
  userId: Scalars['String'];
  properties?: Maybe<Array<Maybe<InsensitiveProperty>>>;
};

export type UserProperty = {
  __typename?: 'UserProperty';
  id: Scalars['String'];
  key: Scalars['String'];
  name: Scalars['String'];
  platform: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  example?: Maybe<Scalars['String']>;
};

export type UserQueryType = 'TAG' | 'SEGMENT' | 'SNAPSHOT_SEGMENT' | 'PREPARED_SEGMENT';

export type UserSearch = {
  __typename?: 'UserSearch';
  id: Scalars['String'];
  userId?: Maybe<Scalars['String']>;
  properties?: Maybe<Array<Property>>;
};

export type UserSummary = {
  __typename?: 'UserSummary';
  id: Scalars['String'];
  userId: Scalars['String'];
  monthlyVisits: Scalars['Int'];
  visitedAt?: Maybe<Scalars['DateTime']>;
  visitedLocation: Scalars['String'];
};

export type UserVariable = NamedEntity & {
  __typename?: 'UserVariable';
  id: Scalars['HashId'];
  name: Scalars['String'];
  key: Scalars['String'];
  type: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  isSystem: Scalars['Boolean'];
  creatorId: Scalars['HashId'];
  createdAt: Scalars['DateTime'];
  updaterId?: Maybe<Scalars['HashId']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  creator?: Maybe<Scalars['String']>;
  updater?: Maybe<Scalars['String']>;
  valueType: Scalars['String'];
};

export type UtmArgument = {
  __typename?: 'UtmArgument';
  id: Scalars['HashId'];
  utmKey: Scalars['String'];
  userKey: Scalars['String'];
};

export type UtmArgumentInput = {
  utmKey: Scalars['String'];
  userKey: Scalars['String'];
};

export type ValueType = {
  __typename?: 'ValueType';
  type: PrimitiveType;
  unit?: Maybe<ValueUnit>;
  isArray?: Maybe<Scalars['Boolean']>;
};

export type ValueUnit = 'COUNT' | 'DISTINCT';

export type VariableInput = {
  name: Scalars['String'];
  key: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  valueType?: Maybe<Scalars['String']>;
};

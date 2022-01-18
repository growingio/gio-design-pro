const insightDimensions: any[] = [
  {
    associatedKey: null,
    description:
      '示例：Web、iOS、Android、MinP\n应用所属平台，包括：Web、iOS、Android、微信小程序、支付宝小程序、微信公众号等',
    groupId: 'normal',
    groupName: '常用维度',
    id: 'b',
    isSystem: true,
    key: '$platform',
    name: '应用平台',
    type: 'global',
    valueType: 'string',
  },
  {
    associatedKey: null,
    description: '示例：5.1、5.2\nApp 和小程序的版本号',
    groupId: 'normal',
    groupName: '常用维度',
    id: 'cv',
    isSystem: true,
    key: '$client_version',
    name: 'App 版本',
    type: 'global',
    valueType: 'string',
  },
  {
    id: 'itm_youlan',
    name: '幽兰拿铁',
    groupId: 'item',
    groupName: '物品属性',
    type: 'itm',
    valueType: 'string',
    description: null,
    associatedKey: 'vvar_virtual_1',
    isSystem: false,
    key: 'itm_youlan',
    __typename: 'Dimension',
  },
  {
    id: 'itm_shengsheng',
    name: '声声乌龙',
    groupId: 'item',
    groupName: '物品属性',
    type: 'itm',
    valueType: 'string',
    description: null,
    associatedKey: 'vvar_virtual_1',
    isSystem: false,
    key: 'itm_shengsheng',
    __typename: 'Dimension',
  },
  {
    id: 'itm_renjian',
    name: '人间烟火',
    groupId: 'item',
    groupName: '物品属性',
    type: 'itm',
    valueType: 'string',
    description: null,
    associatedKey: 'vvar_virtual_1',
    isSystem: false,
    key: 'itm_renjian',
    __typename: 'Dimension',
  },
  {
    id: 'itm_mocha',
    name: '抹茶菩提',
    groupId: 'item',
    groupName: '物品属性',
    type: 'itm',
    valueType: 'string',
    description: null,
    associatedKey: 'vvar_virtual_1',
    isSystem: false,
    key: 'itm_mocha',
    __typename: 'Dimension',
  },
  {
    associatedKey: null,
    description: '',
    groupId: 'event',
    groupName: '事件变量',
    id: 'var_list_1',
    isSystem: false,
    key: 'var_list_1',
    name: '列表型属性1_update',
    type: 'var',
    valueType: 'list',
  },
  {
    associatedKey: null,
    description: '',
    groupId: 'event',
    groupName: '事件变量',
    id: 'var_list_2',
    isSystem: false,
    key: 'var_list_2',
    name: '列表型属性2',
    type: 'var',
    valueType: 'list',
  },
  {
    associatedKey: null,
    description:
      '示例：www.example.com\nWeb 端理解为： "www.example.com" 是 https://www.example.com/about 的域名。APP 理解为应用的包名。小程序理解为 AppID',
    groupId: 'normal',
    groupName: '常用维度',
    id: 'd',
    isSystem: true,
    key: '$domain',
    name: '域名',
    type: 'global',
    valueType: 'string',
  },
  {
    associatedKey: null,
    description: `示例：https://www.example.com/circle\nWeb 端理解为： "/about" 是https://www.example.com/about的页面。
      Android 应用理解为: activity + fragment。iOS 应用理解为：UIViewController。小程序理解为：页面 URL（不包括 query ）`,
    groupId: 'normal',
    groupName: '常用维度',
    id: 'p',
    isSystem: true,
    key: '$path',
    name: '页面',
    type: 'global',
    valueType: 'string',
  },
  {
    associatedKey: null,
    description: '示例：/circle\n访问页面的上级页面来源',
    groupId: 'normal',
    groupName: '常用维度',
    id: 'rp',
    isSystem: true,
    key: '$referrer_path',
    name: '页面来源',
    type: 'global',
    valueType: 'string',
  },
  {
    associatedKey: null,
    description:
      '示例：立即注册、立即购买\n圈选某个元素时，如果该元素本身有 "内容"信息，即可用 "元素内容" 来统计该元素对应的指标',
    groupId: 'normal',
    groupName: '常用维度',
    id: 'v',
    isSystem: true,
    key: '$textValue',
    name: '元素内容',
    type: 'global',
    valueType: 'string',
  },
  {
    associatedKey: null,
    description: '示例：1、2、3\n圈选某个元素时，如果该元素本身有 "位置"信息，即可用 "元素位置"来统计该元素对应的指标',
    groupId: 'normal',
    groupName: '常用维度',
    id: 'idx',
    isSystem: true,
    key: '$index',
    name: '元素位置',
    type: 'global',
    valueType: 'string',
  },
  {
    associatedKey: null,
    description: '示例：/div.title/div/div.title/button\n圈选元素在页面源码结构中的位置路径',
    groupId: 'normal',
    groupName: '常用维度',
    id: 'xp',
    isSystem: true,
    key: '$xpath',
    name: '元素路径',
    type: 'global',
    valueType: 'string',
  },
  {
    associatedKey: null,
    description: '示例：https://www.growingio.com/\nWeb/Hybrid页面超链接元素的href参数',
    groupId: 'normal',
    groupName: '常用维度',
    id: 'h',
    isSystem: true,
    key: '$hyperlink',
    name: '元素链接',
    type: 'global',
    valueType: 'string',
  },
  {
    associatedKey: null,
    description: '用于区分数据来源标记',
    groupId: 'normal',
    groupName: '常用维度',
    id: '$data_source_id',
    isSystem: true,
    key: '$data_source_id',
    name: '数据源ID',
    type: 'global',
    valueType: 'string',
  },
  {
    id: 'var_condition_count',
    name: '条件数量',
    groupId: 'event',
    groupName: '事件变量',
    type: 'var',
    valueType: 'string',
    description: null,
    associatedKey: null,
    isSystem: false,
    __typename: 'Dimension',
  },
  {
    id: 'var_condition_group_count',
    name: '条件组数量',
    groupId: 'event',
    groupName: '事件变量',
    type: 'var',
    valueType: 'string',
    description: null,
    associatedKey: null,
    isSystem: false,
    __typename: 'Dimension',
  },
  {
    id: 'var_segment_name',
    name: '分群名称 (1)',
    groupId: 'event',
    groupName: '事件变量',
    type: 'var',
    valueType: 'string',
    description: null,
    associatedKey: null,
    isSystem: false,
    __typename: 'Dimension',
  },
  {
    id: 'var_create_segment_based_id',
    name: '创建分群基于ID',
    groupId: 'event',
    groupName: '事件变量',
    type: 'var',
    valueType: 'string',
    description: null,
    associatedKey: null,
    isSystem: false,
    __typename: 'Dimension',
  },
  {
    id: 'var_create_segment_method',
    name: '创建分群方式',
    groupId: 'event',
    groupName: '事件变量',
    type: 'var',
    valueType: 'string',
    description: null,
    associatedKey: null,
    isSystem: false,
    __typename: 'Dimension',
  },
  {
    id: 'var_is_manual_event',
    name: '是否使用了打点事件',
    groupId: 'event',
    groupName: '事件变量',
    type: 'var',
    valueType: 'string',
    description: null,
    associatedKey: null,
    isSystem: false,
    __typename: 'Dimension',
  },
  {
    id: 'usr_date0830',
    name: '0830日期属性',
    groupId: 'user',
    groupName: '用户属性',
    type: 'usr',
    valueType: 'date',
    description: 'Test',
    associatedKey: null,
    isSystem: false,
    __typename: 'Dimension',
  },
  {
    id: 'usr_int0830',
    name: '0830整数属性',
    groupId: 'user',
    groupName: '用户属性',
    type: 'usr',
    valueType: 'int',
    description: '',
    isSystem: false,
    associatedKey: null,
    __typename: 'Dimension',
  },
  {
    id: 'usr_String0830',
    name: '0830字符串属性',
    groupId: 'user',
    groupName: '用户属性',
    type: 'usr',
    valueType: 'string',
    description: '',
    isSystem: false,
    associatedKey: null,
    __typename: 'Dimension',
  },
  {
    id: 'usr_yhsxdate',
    name: '0926_date_用户属性',
    groupId: 'user',
    groupName: '用户属性',
    type: 'usr',
    valueType: 'date',
    isSystem: false,
    description: '',
    associatedKey: null,
    __typename: 'Dimension',
  },
  {
    id: 'usr_yhsx_int',
    name: '0926_int_用户属性',
    groupId: 'user',
    groupName: '用户属性',
    type: 'usr',
    isSystem: false,
    valueType: 'int',
    description: '',
    associatedKey: null,
    __typename: 'Dimension',
  },
  {
    associatedKey: 'p',
    description: null,
    groupId: 'item',
    groupName: '物品属性',
    id: 'itm_platform_prop3',
    isSystem: false,
    key: 'itm_platform_prop3',
    name: 'platform_prop3',
    type: 'itm',
    valueType: 'string',
  },
  {
    associatedKey: 'p',
    description: null,
    groupId: 'item',
    groupName: '物品属性',
    id: 'itm_platform_prop4',
    isSystem: false,
    key: 'itm_platform_prop4',
    name: 'platform_prop4',
    type: 'itm',
    valueType: 'string',
  },
  {
    associatedKey: 'var_create_segment_method',
    description: null,
    groupId: 'item',
    groupName: '物品属性',
    id: 'itm_platform_prop1',
    isSystem: false,
    key: 'itm_platform_prop1',
    name: 'platform_prop1',
    type: 'itm',
    valueType: 'string',
  },
  {
    associatedKey: 'var_create_segment_method',
    description: null,
    groupId: 'item',
    groupName: '物品属性',
    id: 'itm_platform_prop2',
    isSystem: false,
    key: 'itm_platform_prop2',
    name: 'platform_prop2',
    type: 'itm',
    valueType: 'string',
  },
  {
    associatedKey: null,
    description: '',
    groupId: 'user',
    groupName: '用户属性',
    id: 'usr_test_0506_111',
    isSystem: false,
    key: 'usr_test_0506_111',
    name: '0506_111',
    type: 'usr',
    valueType: 'date',
  },
  {
    valueType: 'STRING',
    type: 'tag',
    name: '标签1',
    groupId: 'tag',
    groupName: '用户标签',
    id: 'tag_id_1',
    isSystem: false,
  },
  {
    valueType: 'STRING',
    type: 'tag',
    name: '标签2',
    groupId: 'tag',
    groupName: '用户标签',
    id: 'tag_id_2',
    isSystem: false,
  },
  {
    valueType: 'STRING',
    type: 'tag',
    name: '标签3',
    groupId: 'tag',
    groupName: '用户标签',
    id: 'tag_id_3',
    isSystem: false,
  },
  {
    associatedKey: null,
    description: '安卓手机系统生成的设备ID',
    groupId: 'user',
    groupName: '用户属性',
    id: 'usr_$device_androidId',
    isSystem: true,
    key: 'usr_$device_androidId',
    name: '安卓 ID',
    type: 'usr',
    valueType: 'string',
  },
  {
    associatedKey: null,
    description: '',
    groupId: 'user',
    groupName: '用户属性',
    id: 'usr_baodan',
    isSystem: false,
    key: 'usr_baodan',
    name: '保单号',
    type: 'usr',
    valueType: 'string',
  },
  {
    associatedKey: null,
    description: '用户属性的描述',
    groupId: 'user',
    groupName: '用户属性',
    id: 'usr_wangtaoTag_002',
    isSystem: false,
    key: 'usr_wangtaoTag_002',
    name: '测试02',
    type: 'usr',
    valueType: 'date',
  },
  {
    associatedKey: null,
    description: '用户属性的描述',
    groupId: 'user',
    groupName: '用户属性',
    id: 'usr_wangtaoTag_004',
    isSystem: false,
    key: 'usr_wangtaoTag_004',
    name: '测试04',
    type: 'usr',
    valueType: 'int',
  },
  {
    associatedKey: null,
    description: '用户属性的描述',
    groupId: 'user',
    groupName: '用户属性',
    id: 'usr_wangtaoTag_005',
    isSystem: false,
    key: 'usr_wangtaoTag_005',
    name: '测试05',
    type: 'usr',
    valueType: 'int',
  },
  {
    associatedKey: null,
    description: '用户属性的描述',
    groupId: 'user',
    groupName: '用户属性',
    id: 'usr_wangtaoTag_006',
    isSystem: false,
    key: 'usr_wangtaoTag_006',
    name: '测试06',
    type: 'usr',
    valueType: 'int',
  },
  {
    associatedKey: null,
    description: '用户属性的描述',
    groupId: 'user',
    groupName: '用户属性',
    id: 'usr_wangtaoTag_007',
    isSystem: false,
    key: 'usr_wangtaoTag_007',
    name: '测试07',
    type: 'usr',
    valueType: 'int',
  },
  {
    associatedKey: null,
    description: '',
    groupId: 'user',
    groupName: '用户属性',
    id: 'usr_su',
    isSystem: false,
    key: 'usr_su',
    name: '成交购买车的产品型号',
    type: 'usr',
    valueType: 'string',
  },
  {
    associatedKey: null,
    description: '',
    groupId: 'user',
    groupName: '用户属性',
    id: 'usr_imgOpenCnt',
    isSystem: false,
    key: 'usr_imgOpenCnt',
    name: '触达APP图片点击次数',
    type: 'usr',
    valueType: 'string',
  },
  {
    associatedKey: null,
    description: '',
    groupId: 'user',
    groupName: '用户属性',
    id: 'usr_phone',
    isSystem: false,
    key: 'usr_phone',
    name: '触达登录用户手机号',
    type: 'usr',
    valueType: 'string',
  },
  {
    associatedKey: null,
    description: '',
    groupId: 'user',
    groupName: '用户属性',
    id: 'usr_gio_push_device_brand',
    isSystem: false,
    key: 'usr_gio_push_device_brand',
    name: '触达推送通道',
    type: 'usr',
    valueType: 'string',
  },
  {
    associatedKey: null,
    description: '',
    groupId: 'user',
    groupName: '用户属性',
    id: 'usr_CreateAt',
    isSystem: false,
    key: 'usr_CreateAt',
    name: '触达注册日期',
    type: 'usr',
    valueType: 'string',
  },
  {
    associatedKey: null,
    description: '',
    groupId: 'user',
    groupName: '用户属性',
    id: 'usr_Category_ppl',
    isSystem: false,
    key: 'usr_Category_ppl',
    name: 'Category_ppl',
    type: 'usr',
    valueType: 'string',
  },
  {
    associatedKey: null,
    description: '',
    groupId: 'user',
    groupName: '用户属性',
    id: 'usr_Country_ppl',
    isSystem: false,
    key: 'usr_Country_ppl',
    name: 'Country_ppl',
    type: 'usr',
    valueType: 'string',
  },
  {
    associatedKey: null,
    description: '',
    groupId: 'user',
    groupName: '用户属性',
    id: 'usr_popWindowSoloClick',
    isSystem: false,
    key: 'usr_popWindowSoloClick',
    name: '弹窗的点击--用户细查',
    type: 'usr',
    valueType: 'string',
  },
  {
    associatedKey: null,
    description: '',
    groupId: 'user',
    groupName: '用户属性',
    id: 'usr_popWindowSoloClose',
    isSystem: false,
    key: 'usr_popWindowSoloClose',
    name: '弹窗的关闭--用户细查',
    type: 'usr',
    valueType: 'string',
  },
  {
    associatedKey: null,
    description: '用户注册时用的，或者填写的邮箱地址',
    groupId: 'user',
    groupName: '用户属性',
    id: 'usr_$basic_email',
    isSystem: true,
    key: 'usr_$basic_email',
    name: '电子邮箱',
    type: 'usr',
    valueType: 'string',
  },
  {
    associatedKey: null,
    description:
      '示例：www.baidu.com、m.baidu.com、直接访问、微信-其他\n网站的流量来源，可以是百度，谷歌，优酷等站外渠道，也可能是直接访问该网站。可以通过设置 UTM 参数来确定流量具体是哪个广告带来的',
    groupId: 'origin',
    groupName: '用户来源',
    id: 'rd',
    isSystem: true,
    key: '$referrer_domain',
    name: '访问来源',
    type: 'global',
    valueType: 'string',
  },
  {
    associatedKey: null,
    description: '示例：google、baidu、toutiao\nutm_source，标识投放的广告来源，例如：google、baidu、toutiao',
    groupId: 'origin',
    groupName: '用户来源',
    id: 'utm_source',
    isSystem: true,
    key: '$utm_source',
    name: '广告来源',
    type: 'global',
    valueType: 'string',
  },
  {
    associatedKey: null,
    description: '示例：cpc、banner、EDM\nutm_medium，标识投放的广告媒介或营销媒介，例如：CPC、Banner 和 Edm',
    groupId: 'origin',
    groupName: '用户来源',
    id: 'utm_medium',
    isSystem: true,
    key: '$utm_medium',
    name: '广告媒介',
    type: 'global',
    valueType: 'string',
  },
  {
    associatedKey: null,
    description: '示例：springsale\nutm_campaign，标识投放产品的具体广告系列名称、标语、促销代码等',
    groupId: 'origin',
    groupName: '用户来源',
    id: 'utm_campaign',
    isSystem: true,
    key: '$utm_campaign',
    name: '广告名称',
    type: 'global',
    valueType: 'string',
  },
  {
    associatedKey: null,
    description: '示例：running+shoes\nutm_term，标识投放的付费搜索关键字',
    groupId: 'origin',
    groupName: '用户来源',
    id: 'utm_term',
    isSystem: true,
    key: '$utm_term',
    name: '广告关键字',
    type: 'global',
    valueType: 'string',
  },
  {
    associatedKey: null,
    description:
      '示例：textlink\nutm_content，用于区分相似内容或同一广告内的链接。如果在同一封 EDM 中使用了两个不同的链接，就可以使用 utm_content 设置不同的值，以便判断哪个版本的效果更好',
    groupId: 'origin',
    groupName: '用户来源',
    id: 'utm_content',
    isSystem: true,
    key: '$utm_content',
    name: '广告内容',
    type: 'global',
    valueType: 'string',
  },
  {
    associatedKey: null,
    description: '用户生日',
    groupId: 'user',
    groupName: '用户属性',
    id: 'usr_$basic_birthday',
    isSystem: true,
    key: 'usr_$basic_birthday',
    name: '出生年月日',
    type: 'usr',
    valueType: 'date',
  },
  {
    associatedKey: null,
    description: '',
    groupId: 'user',
    groupName: '用户属性',
    id: 'usr_Category_ppl',
    isSystem: false,
    key: 'usr_Category_ppl',
    name: 'Category_ppl',
    type: 'usr',
    valueType: 'string',
  },
  {
    associatedKey: null,
    description: '',
    groupId: 'user',
    groupName: '用户属性',
    id: 'usr_Country_ppl',
    isSystem: false,
    key: 'usr_Country_ppl',
    name: 'Country_ppl',
    type: 'usr',
    valueType: 'string',
  },
  {
    associatedKey: null,
    description: '',
    groupId: 'user',
    groupName: '用户属性',
    id: 'usr_popWindowSoloClick',
    isSystem: false,
    key: 'usr_popWindowSoloClick',
    name: '弹窗的点击--用户细查',
    type: 'usr',
    valueType: 'string',
  },
  {
    associatedKey: null,
    description: '',
    groupId: 'user',
    groupName: '用户属性',
    id: 'usr_popWindowSoloClose',
    isSystem: false,
    key: 'usr_popWindowSoloClose',
    name: '弹窗的关闭--用户细查',
    type: 'usr',
    valueType: 'string',
  },
  {
    associatedKey: null,
    description: '',
    groupId: 'user',
    groupName: '用户属性',
    id: 'usr_popWindowSoloImp',
    isSystem: false,
    key: 'usr_popWindowSoloImp',
    name: '弹窗的展示--用户细查',
    type: 'usr',
    valueType: 'string',
  },
  {
    associatedKey: null,
    description: '用户填写的地址',
    groupId: 'user',
    groupName: '用户属性',
    id: 'usr_$basic_address',
    isSystem: true,
    key: 'usr_$basic_address',
    name: '地址',
    type: 'usr',
    valueType: 'string',
  },
  {
    associatedKey: null,
    description:
      '示例：www.baidu.com、m.baidu.com、直接访问、微信-其他\n网站的流量来源，可以是百度，谷歌，优酷等站外渠道，也可能是直接访问该网站。可以通过设置 UTM 参数来确定流量具体是哪个广告带来的',
    groupId: 'origin',
    groupName: '用户来源',
    id: 'rd',
    isSystem: true,
    key: '$referrer_domain',
    name: '访问来源',
    type: 'global',
    valueType: 'string',
  },
  {
    associatedKey: null,
    description: '示例：cpc、banner、EDM\nutm_medium，标识投放的广告媒介或营销媒介，例如：CPC、Banner 和 Edm',
    groupId: 'origin',
    groupName: '用户来源',
    id: 'utm_medium',
    isSystem: true,
    key: '$utm_medium',
    name: '广告媒介',
    type: 'global',
    valueType: 'string',
  },
  {
    associatedKey: null,
    description: '示例：springsale\nutm_campaign，标识投放产品的具体广告系列名称、标语、促销代码等',
    groupId: 'origin',
    groupName: '用户来源',
    id: 'utm_campaign',
    isSystem: true,
    key: '$utm_campaign',
    name: '广告名称',
    type: 'global',
    valueType: 'string',
  },
  {
    associatedKey: null,
    description: '示例：running+shoes\nutm_term，标识投放的付费搜索关键字',
    groupId: 'origin',
    groupName: '用户来源',
    id: 'utm_term',
    isSystem: true,
    key: '$utm_term',
    name: '广告关键字',
    type: 'global',
    valueType: 'string',
  },
  {
    associatedKey: null,
    description:
      '示例：textlink\nutm_content，用于区分相似内容或同一广告内的链接。如果在同一封 EDM 中使用了两个不同的链接，就可以使用 utm_content 设置不同的值，以便判断哪个版本的效果更好',
    groupId: 'origin',
    groupName: '用户来源',
    id: 'utm_content',
    isSystem: true,
    key: '$utm_content',
    name: '广告内容',
    type: 'global',
    valueType: 'string',
  },
  {
    associatedKey: null,
    description:
      '示例：huawei、oppo、vivo、xiaomi\n自定义 App 渠道。在 App 集成 SDK 的时候，针对安卓用户，设置分包渠道。在小程序中，则自动获取小程序打开的来源。目前支持微信中 60 多种统计场景',
    groupId: 'origin',
    groupName: '用户来源',
    id: 'ch',
    isSystem: true,
    key: '$channel',
    name: '自定义 App 渠道',
    type: 'global',
    valueType: 'string',
  },
  {
    associatedKey: null,
    description: `示例：直接访问、搜索引擎、社交媒体、外部链接\n
      为了便于分析，我们将访问来源进行了归类。分为直接访问，搜索引擎，社交媒体，外部链接四大部分。
      直接访问： 可能是用户直接在浏览器中输入了一个域名或使用书签进行访问；
      搜索引擎： www.baidu.com，m.baidu.com，so.com，sogou.com 等；
      社交媒体：weibo.com，zhihu.com，linkedin.com， facebook.com，mp.weixin.qq.com 等；
      外部链接： 除了社交媒体，搜索⽹站之外的来源`,
    groupId: 'origin',
    groupName: '用户来源',
    id: 'rt',
    isSystem: true,
    key: '$referrer_type',
    name: '一级访问来源',
    type: 'global',
    valueType: 'string',
  },
  {
    associatedKey: null,
    description: '示例：CN，US，JP，SG\n⽤户所在的国家的英⽂缩写',
    groupId: 'geo',
    groupName: '地域信息',
    id: 'countryCode',
    isSystem: true,
    name: '国家代码',
    type: 'global',
    valueType: null,
  },
  {
    groupId: 'geo',
    groupName: '地域信息',
    id: 'countryName',
    name: '国家名称',
    isSystem: true,
    type: 'global',
    valueType: null,
  },
  {
    groupId: 'device',
    groupName: '设备信息',
    id: 'bw',
    name: '浏览器',
    isSystem: true,
    type: 'global',
    valueType: null,
  },
  {
    groupId: 'device',
    groupName: '设备信息',
    id: 'bwv',
    name: '浏览器版本',
    isSystem: true,
    type: 'global',
    valueType: null,
  },
  {
    groupId: 'device',
    groupName: '设备信息',
    id: 'os',
    name: '操作系统',
    isSystem: true,
    type: 'global',
    valueType: null,
  },
  {
    groupId: 'device',
    groupName: '设备信息',
    id: 'osv',
    isSystem: true,
    name: '操作系统版本',
    type: 'global',
    valueType: null,
  },
  {
    groupId: 'device',
    groupName: '设备信息',
    id: 'shw',
    isSystem: true,
    name: '屏幕大小（高*宽）',
    type: 'global',
    valueType: null,
  },
  {
    groupId: 'device',
    groupName: '设备信息',
    id: 'l',
    isSystem: true,
    name: '操作系统语言',
    type: 'global',
    valueType: null,
  },
  {
    groupId: 'device',
    groupName: '设备信息',
    id: 'db',
    isSystem: true,
    name: '设备品牌',
    type: 'global',
    valueType: null,
  },
  {
    groupId: 'device',
    groupName: '设备信息',
    id: 'dm',
    isSystem: true,
    name: '设备型号',
    type: 'global',
    valueType: null,
  },
  {
    groupId: 'device',
    groupName: '设备信息',
    id: 'o',
    isSystem: true,
    name: '设备方向',
    type: 'global',
    valueType: null,
  },
  {
    id: 'AbQ3bDYe',
    isPrimaryKey: false,
    key: 'order_name',
    type: 'itm',
    isSystem: false,
    groupId: 'item',
    name: 'shangpin',
    groupName: '物品属性',
    valueType: 'string',
    description: '',
    associatedKey: 'var_engageType',
  },
  {
    associatedKey: null,
    description:
      '示例：直接访问、搜索引擎、社交媒体、外部链接\n为了便于分析，我们将访问来源进行了归类。分为直接访问，搜索引擎，社交媒体，外部链接四大部分。直接访问： 可能是用户直接在浏览器中输入了一个域名或使用书签进行访问；搜索引擎： www.baidu.com，m.baidu.com，so.com，sogou.com 等；社交媒体：weibo.com，zhihu.com，linkedin.com， facebook.com，mp.weixin.qq.com 等；外部链接： 除了社交媒体，搜索⽹站之外的来源',
    groupId: 'origin',
    groupName: '用户来源',
    id: 'rt',
    isSystem: true,
    key: '$referrer_type',
    name: '一级访问来源',
    type: 'global',
    valueType: 'string',
  },
  {
    associatedKey: null,
    description: '示例：CN，US，JP，SG\n⽤户所在的国家的英⽂缩写',
    groupId: 'geo',
    groupName: '地域信息',
    id: 'countryCode',
    isSystem: true,
    key: '$country_code',
    name: '国家代码',
    type: 'global',
    valueType: 'string',
  },
  {
    associatedKey: null,
    description: '示例：中国，美国，英国，新加坡\n⽤户所在的国家的名称',
    groupId: 'geo',
    groupName: '地域信息',
    id: 'countryName',
    isSystem: true,
    key: '$country_name',
    name: '国家名称',
    type: 'global',
    valueType: 'string',
  },
  {
    associatedKey: null,
    description:
      '示例：北京、上海、广东、浙江\n用户访问时所在的地区，Web 基于IP地址，该维度包含国内省级以上行政区，以及国外地区。 App 和小程序 基于 IP 地址和 GPS 。优先判断 GPS 值，GPS 值缺失时，使用IP地址',
    groupId: 'geo',
    groupName: '地域信息',
    id: 'region',
    isSystem: true,
    key: '$region',
    name: '地区',
    type: 'global',
    valueType: 'string',
  },
  {
    associatedKey: null,
    description:
      '示例：北京、上海、深圳、天津\n用户访问时所在的城市，Web 基于 IP 地址， App 和小程序 基于 IP 地址和 GPS 。优先判断 GPS 值，GPS 值缺失时，使用 IP 地址',
    groupId: 'geo',
    groupName: '地域信息',
    id: 'city',
    isSystem: true,
    key: '$city',
    name: '城市',
    type: 'global',
    valueType: 'string',
  },
  {
    associatedKey: null,
    description: '示例：Chrome，Chrome Mobile， Safari，IE\n⽤户所⽤浏览器的类型',
    groupId: 'device',
    groupName: '设备信息',
    id: 'bw',
    isSystem: true,
    key: '$browser',
    name: '浏览器',
    type: 'global',
    valueType: 'string',
  },
  {
    associatedKey: null,
    description: '示例：Chrome 47.0.2526 、IE 8.0、Firefox 65.0\n同「浏览器」，但是会按照不同的版本进⾏区分',
    groupId: 'device',
    groupName: '设备信息',
    id: 'bwv',
    isSystem: true,
    key: '$browser_version',
    name: '浏览器版本',
    type: 'global',
    valueType: 'string',
  },
  {
    associatedKey: null,
    description: '示例：Mac OS X ，Android，weixin-iOS，weixin-Android\n用户所使用的操作系统',
    groupId: 'device',
    groupName: '设备信息',
    id: 'os',
    isSystem: true,
    key: '$os',
    name: '操作系统',
    type: 'global',
    valueType: 'string',
  },
  {
    associatedKey: null,
    description: '示例：Android 4.0、Windows 8 ，Windows 7\n同「操作系统」，但是会按照不同的版本进⾏区分',
    groupId: 'device',
    groupName: '设备信息',
    id: 'osv',
    isSystem: true,
    key: '$os_version',
    name: '操作系统版本',
    type: 'global',
    valueType: 'string',
  },
  {
    associatedKey: null,
    description: '示例：Apple、xiaomi、huawei、oppo\n设备的品牌',
    groupId: 'device',
    groupName: '设备信息',
    id: 'db',
    isSystem: true,
    key: '$device_brand',
    name: '设备品牌',
    type: 'global',
    valueType: 'string',
  },
  {
    associatedKey: null,
    description: '示例：iPhone X、iPhone 8 Plus、OPPO R11\n设备具体的机型',
    groupId: 'device',
    groupName: '设备信息',
    id: 'dm',
    isSystem: true,
    key: '$device_model',
    name: '设备型号',
    type: 'global',
    valueType: 'string',
  },
  {
    id: 'vvar_virtual_1',
    associatedKey: null,
    description: null,
    groupId: 'virtual',
    groupName: '虚拟属性',
    name: '虚拟属性1-string',
    type: 'vvar',
    valueType: 'string',
  },
  {
    id: 'vvar_virtual_2',
    associatedKey: null,
    description: null,
    groupId: 'virtual',
    groupName: '虚拟属性',
    name: '虚拟属性1-int',
    type: 'vvar',
    valueType: 'int',
  },
  {
    associatedKey: null,
    description: '示例：竖直、横向\n用户访问时使用的设备方向',
    groupId: 'device',
    groupName: '设备信息',
    id: 'o',
    isSystem: true,
    key: '$device_orientation',
    name: '设备方向',
    type: 'global',
    valueType: 'string',
  },
  {
    associatedKey: null,
    description: '示例：640*360、1920*1080\nWeb 端是窗⼝⼤⼩，移动端是屏幕⼤⼩',
    groupId: 'device',
    groupName: '设备信息',
    id: 'shw',
    isSystem: true,
    key: '$resolution',
    name: '屏幕大小（高*宽）',
    type: 'global',
    valueType: 'string',
  },
  {
    associatedKey: null,
    description: '示例：简体中⽂、英语、繁体中文\n统计不同的操作系统语⾔的使⽤情况',
    groupId: 'device',
    groupName: '设备信息',
    id: 'l',
    isSystem: true,
    key: '$language',
    name: '操作系统语言',
    type: 'global',
    valueType: 'string',
  },
];

export default insightDimensions;

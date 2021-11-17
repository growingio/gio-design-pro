export const typeMap: { [key: string]: string } = {
  string: '字符串',
  int: '整数',
  float: '小数',
  double: '小数',
};

export const enTypeMap: { [key: string]: string } = {
  string: 'String',
  int: 'Int',
  float: 'Float',
  double: 'Double',
};

export const getTypeName = (type: string) =>
  (localStorage.getItem('locale') === 'en-US' ? enTypeMap[type.toLowerCase()] : typeMap[type.toLowerCase()]) || type;

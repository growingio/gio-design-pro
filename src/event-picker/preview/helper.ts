export const typeMap: { [key: string]: string } = {
  string: '字符串',
  int: '整数',
  float: '小数',
  double: '小数',
};

export const getTypeName = (type: string) => typeMap[type.toLowerCase()] || type;

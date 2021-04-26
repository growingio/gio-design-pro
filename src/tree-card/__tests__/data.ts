export interface DataType {
  key: string;
  name: string;
  customName?: string;
  children?: DataType[];
}

export const data: DataType[] = [
  {
    key: '1',
    name: '第一个一级分类',
    children: [
      {
        key: '1-1',
        name: '二级分类',
      },
      {
        key: '1-2',
        name: '二级分类',
      },
      {
        key: '1-3',
        name: '二级分类',
        children: [
          {
            key: '1-3-1',
            name: '三级分类',
            children: [
              {
                key: '1-3-1-1',
                name: '四级分类',
              },
            ],
          },
        ],
      },
    ],
  },
  {
    key: '2',
    name: '第二个一级分类',
    children: [
      {
        key: '2-1',
        name: '二级分类',
      },
      {
        key: '2-2',
        name: '二级分类',
        children: [
          {
            key: '2-2-1',
            name: '三级分类',
          },
        ],
      },
      {
        key: '2-3',
        name: '二级分类',
      },
    ],
  },
  {
    key: '3',
    name: '第三个一级分类',
    children: [
      {
        key: '3-1',
        name: '二级分类',
        children: [
          {
            key: '3-1-1',
            name: '三级分类',
          },
        ],
      },
      {
        key: '3-2',
        name: '二级分类',
      },
      {
        key: '3-3',
        name: '二级分类',
      },
    ],
  },
];

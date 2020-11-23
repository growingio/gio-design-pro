export const currentUserId = 'V0G5vDAR';

export const preparedSegments = [
  {
    id: 'uv',
    name: '全部用户',
  },
  {
    id: 'nuv',
    name: '新用户',
  },
];

export const segments = [
  {
    id: 'WlGk4Daj',
    name: '活跃用户',
    detector: {
      usersRatio: 0.016,
      totalUsers: 310,
    },
    creator: '张三',
    creatorId: '7RDYeDA8',
    createdAt: '2020-05-09T02:15:20.643Z',
    updatedAt: '2020-05-09T02:15:20.643Z',
  },
  {
    id: 'y9pm1pme',
    name: '过去7天浏览过详情页的地活跃用户',
    detector: {
      usersRatio: 0.002,
      totalUsers: 32,
    },
    creator: '李四',
    creatorId: 'V0G5vDAR',
    createdAt: '2020-05-11T03:45:31.275Z',
    updatedAt: '2020-05-11T03:45:31.275Z',
  },
  {
    id: 'AbQ3bDYe',
    name: '过去7天低活跃的免费用户',
    detector: {
      usersRatio: 0.0,
      totalUsers: 0,
    },
    creator: '李四',
    creatorId: 'V0G5vDAR',
    createdAt: '2020-05-11T04:01:53.514Z',
    updatedAt: '2020-05-11T04:01:53.514Z',
  },
  {
    id: 'rRGoYQml',
    name: '过去7天访问用户',
    detector: {
      usersRatio: 0.042,
      totalUsers: 832,
    },
    creator: '王武',
    creatorId: 'o8D03G7P',
    createdAt: '2020-05-20T08:32:30.387Z',
    updatedAt: '2020-05-20T08:32:30.387Z',
  },
  {
    id: 'klGvyp7E',
    name: '高意向人群',
    detector: {
      usersRatio: 0.003,
      totalUsers: 64,
    },
    creator: '陈留',
    creatorId: 'nKD1PGWr',
    createdAt: '2020-05-22T02:44:06.972Z',
    updatedAt: '2020-05-22T02:44:06.972Z',
  },
];

export default {
  currentUserId,
  preparedSegments,
  segments,
};

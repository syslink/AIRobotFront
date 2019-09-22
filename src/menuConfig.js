// 菜单配置
// headerMenuConfig：头部导航配置
// asideMenuConfig：侧边导航配置

const headerMenuConfig = [
  // {
  //   name: 'feedback',
  //   path: 'https://github.com/alibaba/ice',
  //   external: true,
  //   newWindow: true,
  //   icon: 'email',
  // },
  // {
  //   name: 'help',
  //   path: 'https://alibaba.github.io/ice',
  //   external: true,
  //   newWindow: true,
  //   icon: 'help',
  // },
];

const asideMenuConfig = [
  {
    name: 'Dashboard',
    path: '/dashboard',
    icon: 'atm',
    children: [
      {
        name: '概览',
        path: '/dashboard/monitor',
      },
    ],
  },
  {
    name: '赛事',
    path: '/competition',
    icon: 'picture',
    children: [
      {
        name: '进行中',
        path: '/competition/running',
      },
      {
        name: '已结束',
        path: '/competition/done',
      },
      {
        name: '未开始',
        path: '/competition/todo',
      },
    ],
  },
  {
    name: 'club',
    path: '/club',
    icon: 'calendar',
    children: [
      {
        name: '甲级',
        path: '/club/levelOne',
      },
      {
        name: '乙级',
        path: '/club/levelTwo',
      },
      {
        name: '初创',
        path: '/club/noLevel',
      },
    ],
  },
  {
    name: 'AI Developer',
    path: '/developer',
    icon: 'picture',
    children: [
      {
        name: '资深',
        path: '/developer/senior',
      },
      {
        name: '初级',
        path: '/developer/junior',
      },
    ],
  },
];

export { headerMenuConfig, asideMenuConfig };

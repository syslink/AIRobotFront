import React from 'react';

import BasicLayout from '@/layouts/BasicLayout';

const Dashboard = React.lazy(() => import('@/pages/Dashboard'));
const Keystore = React.lazy(() => import('@/pages/KeystoreManager'));
const ContractDev = React.lazy(() => import('@/pages/ContractDev'));
const NodeManager = React.lazy(() => import('@/pages/NodeManager'));
const NotFound = React.lazy(() => import('@/pages/NotFound'));

const routerConfig = [
  {
    path: '/',
    component: BasicLayout,
    children: [
      {
        path: '/dashboard',
        component: Dashboard,
      },
      {
        path: '/',
        redirect: '/dashboard',
      },
      {
        path: '/keystore',
        component: Keystore,
      },
      {
        path: '/contract/normal',
        component: ContractDev,
      },
      {
        path: '/nodeMgr',
        component: NodeManager,
      },
      {
        component: NotFound,
      },
    ],
  },
];

export default routerConfig;

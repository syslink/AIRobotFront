import React from 'react';

import BasicLayout from '@/layouts/BasicLayout';

const Dashboard = React.lazy(() => import('@/pages/Dashboard'));
const Keystore = React.lazy(() => import('@/pages/KeystoreManager'));
const ContractDev = React.lazy(() => import('@/pages/ContractDev'));
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
        component: NotFound,
      },
    ],
  },
];

export default routerConfig;

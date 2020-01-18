const Routes = [
  // {
  //   path: '/',
  //   redirect: '/index',
  // },
  {
    path: '/',
    name: 'index',
    component: () => import('../views/index.vue')
  }
]

export default Routes;
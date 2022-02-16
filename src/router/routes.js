export default [
  {
    path: '/home',
    name: 'Home',
    component: () => import('@/pages/Home/Home'),
    children: [],
  },
  {
    path: '/cart',
    name: 'Cart',
    component: () => import('@/pages/Cart/Cart'),
  },
  {
    path: '/category:index?',
    name: 'Category',
    component: () => import('@/pages/Category/Category'),
  },
  {
    path: '/center',
    name: 'Center',
    component: () => import('@/pages/Center/Center'),
  },
  {
    path: '/detail',
    name: 'Detail',
    component: () => import('@/pages/Detail/Detail'),
  },
  {
    path: '/worthbuy',
    name: 'WorthBuy',
    component: () => import('@/pages/WorthBuy/WorthBuy'),
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/pages/Login/Login'),
  },
  {
    path: '/pay',
    name: 'Pay',
    component: () => import('@/pages/Pay/Pay'),
  },
  {
    path: '/subcateList',
    name: 'SubCateList',
    component: () => import('@/pages/Category/SubCateList'),
    meta: {
      isHidden: true,
    },
  },
  //访问根路径，跳转到主页
  {
    path: '/',
    redirect: '/home',
  },
  // 访问的路径都没有的话,回到首页
  { path: '*', redirect: '/home' },
];

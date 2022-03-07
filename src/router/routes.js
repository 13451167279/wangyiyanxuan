export default [
  {
    path: '/home',
    name: 'Home',
    component: () => import('@/pages/Home/Home'),
    meta: {
      showTabbar: true,
    },
  },
  {
    path: '/home/homecate',
    name: 'Homecate',
    component: () => import('@/pages/Home/Homecate'),
  },
  {
    path: '/cart',
    name: 'Cart',
    component: () => import('@/pages/Cart/Cart'),
    meta: {
      showTabbar: true,
    },
  },
  {
    path: '/category:index?',
    name: 'Category',
    component: () => import('@/pages/Category/Category'),
    meta: {
      showTabbar: true,
    },
  },
  {
    path: '/center',
    name: 'Center',
    component: () => import('@/pages/Center/Center'),
    meta: {
      showTabbar: true,
    },
    children: [],
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/pages/Login/Login'),
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
    meta: {
      showTabbar: true,
    },
  },

  {
    path: '/pay',
    name: 'Pay',
    component: () => import('@/pages/Pay/Pay'),
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('@/pages/Register/Register'),
  },
  {
    path: '/subcatelist',
    name: 'SubCateList',
    component: () => import('@/pages/Category/SubCateList/index.vue'),
    meta: {
      isHidden: true,
    },
  },
  {
    path: '/search',
    name: 'Search',
    component: () => import('@/pages/Search/Search'),
  },
  //访问根路径，跳转到主页
  {
    path: '/',
    redirect: '/home',
  },
  // 访问的路径都没有的话,回到首页
  {
    path: '*',
    redirect: '/home',
  },
];

import Vue from "vue";
import VueRouter from "vue-router";

import routes from './routes.js'
import store from '@/store'

Vue.use(VueRouter);
//为了避免router上的push方法连续请求相同的参数会出现报错的情况，重写push方法
const originPush = VueRouter.prototype.push;
const originReplace = VueRouter.prototype.replace;
VueRouter.prototype.push = function (location, resolve, reject) {

	if (resolve === undefined && reject === undefined) {
		return originPush.call(this, location).catch(() => {
		});
	} else {
		return originPush.call(this, location, resolve, reject);
	}

}

VueRouter.prototype.replace = function (location, resolve, reject) {

	if (resolve === undefined && reject === undefined) {
		return originReplace.call(this, location).catch(() => {
		});
	} else {
		return originReplace.call(this, location, resolve, reject);
	}

}

const router = new VueRouter({
	mode: 'history',

	routes,
	scrollBehavior(to, from, savedPosition) {
		return {x: 0, y: 0}
	}


})

router.beforeEach(async(to,form,next)=>{
	// 全局前置路由导航
	let token = store.state.login.token;
	let userInfo = store.state.login.userInfo;
	if(token){
		//token存在代表用户登录过
		if(to.path === '/login'){
		  // 代表用户登录之后又去登录页,强制跳转到首页
		  next('/center')
		}else{
		  // 代表用户登录了但是这次不是去的登录页
		  if(userInfo.name){
			next()
		  }else{
			try {
			  //获取用户信息成功
			  await store.dispatch('getUserInfo')
			  next()
			} catch (error) {
			  //代表获取用户信息失败,一概归结为token过期
			  // 先清空token
			  // state.xxx = 'xxx' 这样的写法不能在这里写，vuex的数据必须通过mutation直接修改
			  await store.dispatch('removeToken')
			  next('/login')
			}
		  }
		}
	  }else{
		//代表token不存在，用户没登录过
		// next() //目前我们先无条件放行，后面我们做了支付等功能完成后再回来限定它
		next()
	  }
	
})

export default router

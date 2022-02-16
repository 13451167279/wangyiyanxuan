import Vue from "vue";
import VueRouter from "vue-router";

import routes from './routes.js'


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

export default new VueRouter({
	mode: 'history',

	routes,
	scrollBehavior(to, from, savedPosition) {
		return {x: 0, y: 0}
	}


})

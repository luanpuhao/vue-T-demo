import Vue from 'vue'
import vueRouter from 'vue-router'
import store from '../store';
import staticRoutes from './staticRoutes';
Vue.use(vueRouter)

//获取token失效方法
let token = true;

//添加路由页面
function routerMatch(data) {
	let home = {
		path: "/home",
		name: "home",
		meta: {
			title: "首页"
		},
		component: resolve => require(["../home.vue"], resolve),
		children: []
	}
	return new Promise(resolve => {
		function formatter(page, parent) {
			page.forEach(val => {
				if(val.children && val.children.length > 0) {
					return formatter(val.children, val.title)
				} else {
					let item = {
						path: val.router_path,
						name: val.name,
						meta: {
							parent: parent,
							title: val.title
						},
						component: () =>
							import('../views/' + val.component_path)
					}
					home.children.push(item)
				}
			})
		}
		formatter(data)
		resolve([home])
	})
}

const router = new vueRouter({
	mode: 'history',
	routes: staticRoutes
});

//不需要token和权限的页面 
const whitelist = ["/login"]

router.beforeEach(async(to, from, next) => {
	if(whitelist.indexOf(to.path) != -1) {
		return next();
	}

	//判断token失效
	if(token) {

		//获取store存的菜单
		let menus = store.state.user.menus;
		if(menus.length == 0) {
			//store的菜单丢失时候重新获取菜单
			menus = await store.dispatch("user/getMenus")
			routerMatch(menus).then(list => {
				router.addRoutes(list)
				next(to.path)
			})

		} else {
			next();
		}

	} else {
		alert("登录失效,请重新登录!");
		router.replace('/login');
	}

})

export default router
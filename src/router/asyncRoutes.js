//后台返回的菜单json数组

const staticRoutes = [ {
	id: 1,
	router_path: "/home",
	component_path: "home.vue",
	title: " 首页",
	name: " 首页",
	icon: "",
	
}, {
	id: 2,
	router_path: "/one", //路由路径
	component_path: "one.vue", //路由对于组件路径
	title: "视频监控", //菜单名称,
	name: "视频监控", //路由的name
	icon: "",
	children: [{ //子菜单
		id: 3,
		router_path: "/one",
		component_path: "one.vue",
		title: "勘察单",
		name: "勘察单",
		icon: "",
	}, {
		id: 4,
		router_path: "/two",
		component_path: "two.vue",
		title: "未交费",
		name: "未交费",
		icon: "",
	}, {
		id: 5,
		router_path: "/three",
		component_path: "three.vue",
		title: "已缴费",
		name: "已缴费",
		icon: "",
		children:[{
			id: 6,
			router_path: "/three",
			component_path: "three.vue",
			title: "已派单",
			name: "已派单",
			icon: "",
		}]
	}]
},{
	id: 7,
	router_path: "/five",
	component_path: "five.vue",
	title: "导航3",
	name: "导航3",
	icon: "",
	children: []
}]
export default staticRoutes
import asyncRoutes from "@/router/asyncRoutes"
const state = {
	menus: [],
	openTab:[],//所有打开的路由
	activeIndex:'/home' //激活状态
}

const mutations = {
	//存菜单列表
	setMenus: (state, data) => {
		state.menus = data
	},
	add_tabs :(state, data) =>{
		console.log(state)
		let index = state.openTab.findIndex(val => val.route == data.route)
		if(index == -1){
			state.openTab.push(data);
		}
	  },
	delete_tabs: (state, route)=> {
		let index = 0;
		for (let option of state.openTab) {
			if (option.route === route) {
			break;
			}
			index++;
		}
		state.openTab.splice(index, 1);
	},
	set_active_index: (state, index)=> {
		state.activeIndex = index;
	},
	
}

const actions = {
	// 获取菜单
	async getMenus({
		commit
	}) {
		
		commit("setMenus", asyncRoutes)
		return asyncRoutes
	}
}

export default {
	namespaced: true,
	actions,
	state,
	mutations
}
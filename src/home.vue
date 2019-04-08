<template>
	<div class="about">
		<header-menu></header-menu>
		<left-menu></left-menu>
		<div class="content">
			<div class="tabs_box"><!--  -->
				<el-tabs class="tabs_inner" v-model="activeIndex"  closable v-if="openTab.length"   @tab-click='tabClick' @tab-remove='tabRemove'>
					<el-tab-pane :key="item.name" v-for="(item, index) in openTab" :label="item.name" :name="item.route">
					</el-tab-pane>
				</el-tabs>
			</div>
			<transition name="move" mode="out-in">
				<router-view class="centerView"></router-view>
			</transition>
		</div>
		
	</div>
</template>

<script>
	import leftMenu from "@/components/menu/leftMennu";
	import headerMenu from "@/components/menu/headerMennu";
	import {
		mapState
	} from "vuex"
	export default {
		name: "home",
		data() {
			return {
			}
		},
		
		methods: {
	
			selectmenu(item) {
				bus.$emit("item", item);
				//防止刷新页面 左侧菜单消失
				localStorage.setItem("leftMennu", JSON.stringify(item))
				this.$router.push(item.router_path)
			}, //tab标签点击时，切换相应的路由
			tabClick(tab) {
				console.log("tab", tab);
				console.log('active', this.activeIndex);
				this.$router.push({
					path: this.activeIndex
				});
			},
			//移除tab标签
			tabRemove(targetName) {
				console.log("tabRemove", targetName);
				//首页不删
				if (targetName == '/home') {
					return
				}
				this.$store.commit('user/delete_tabs', targetName);
				if (this.activeIndex === targetName) {
					// 设置当前激活的路由
					if (this.openTab && this.openTab.length >= 1) {
						console.log('=============', this.openTab[this.openTab.length - 1].route)
						this.$store.commit('user/set_active_index', this.openTab[this.openTab.length - 1].route);
						this.$router.push({
							path: this.activeIndex
						});
					} else {
						this.$router.push({
							path: '/home'
						});
					}
				}
			}
	
	
		},
		mounted() {
			 // 刷新时以当前路由做为tab加入tabs
    // 当前路由不是首页时，添加首页以及另一页到store里，并设置激活状态
	// 当当前路由是首页时，添加首页到store，并设置激活状态
	console.log(this.$route.path == '/home')
			if (this.$route.path != '/home' ) {
			this.$store.commit('user/add_tabs', {route: '/home' , name: '首页'});
			this.$store.commit('user/add_tabs', {route: this.$route.path , name: this.$route.name });
			this.$store.commit('user/set_active_index', this.$route.path);
			} else {
			this.$store.commit('user/add_tabs', {route: '/home', name: '首页'});
			this.$store.commit('user/set_active_index', '/home');
			this.$router.push('/home');
			}
		},
		computed: {
			
			openTab() {
				console.log(this.$store.state.user.openTab.indexOf('/home'))
				
				return this.$store.state.user.openTab;
			},
			activeIndex: {
				get() {
					return this.$store.state.user.activeIndex;
				},
				set(val) {
					this.$store.commit('user/set_active_index', val);
				}
			}
	
		},
		components: {
			leftMenu,
			headerMenu
		},
		watch: {
			
			'$route' (to, from) {

				//判断路由是否已经打开
				//已经打开的 ，将其置为active
				//未打开的，将其放入队列里
				
					this.$store.commit('user/add_tabs', {route: to.path, name: to.name});
					this.$store.commit('user/set_active_index', to.path);
					
				
			}
		},
		
	};
</script>

<style scoped>
	header {
		width: 100%;
		height: 65px;
		position: fixed;
		background: #5B5B5B;
		overflow: hidden;
		zoom: 1;
		z-index: 999;
	}
	
	.content {
		background: none repeat scroll 0 0 #f8f8f8;
		position: absolute;
		left: 203px;
		right: 0;
		top: 50px;
		bottom: 0;
		width: calc(100% - 205px);
		padding: 15px;
		padding-right: 0;
		box-sizing: border-box;
		overflow-y: scroll;
		min-width: 1110px;
	}
	
	.full {
		/* left: 0; */
		width: calc(100% + 10px);
		min-width: 1310px;
		padding-bottom: 0;
	}
	
	#wrapper {
		height: 100%;
		position: relative;
	}
	
	.breadcrumb {
		margin-bottom: 15px;
	}
	
	.centerView {
		height: calc(100% - 35px);
	}
	.tabs_box{
		position: abslout;
		height: 40px;
	}
	.tabs_inner{
		position: absolute;
		height: 200px;
	}
	
</style>
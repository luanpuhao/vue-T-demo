<template>
	<div class="left_box">
		<header>

		</header>
		<el-scrollbar class="scroll-x box">
			<el-menu :default-active="$route.path" router class="leftSide" background-color="#2F3B53" text-color="#fff" active-text-color="fff">
				<template v-for="(item,index) in leftMenu">
					<template v-if="item.children&&item.children.length > 0">
						<el-submenu :index="index.toString()">
							<template slot="title">
								<i :class="item.icon"></i>
								<span>{{item.title}}</span>
							</template>
							<template v-for="(x,y) in item.children">
								<el-menu-item :index="x.router_path" :key="x.id">{{x.title}}</el-menu-item>
							</template>
						</el-submenu>
					</template>
					<template v-else>
						<el-menu-item :index="item.router_path" :key="item.id">
							<i :class="item.icon"></i>
							<span slot="title">{{item.title}}</span>
						</el-menu-item>
					</template>
				</template>
			</el-menu>
		</el-scrollbar>
	</div>
</template>
<script>
	import bus from "@/lib/bus";
	export default {
		name:'leftMennu',
		data(){
			return {
				leftMenu: []
			}
		},
		created() {
			let self = this;
			bus.$on("item", val => {
				self.leftMenu = val.children;
			})

			if(this.leftMenu.length == 0) {
				let data = localStorage.getItem("leftMennu");
				let menu = data ? JSON.parse(data) : {};
				self.leftMenu = menu.children || [];
			}
		},
		methods:{}
	}
</script>
<style scoped>
	header {
		width: 100%;
		height: 50px;
		background: rgb(11, 224, 100);
	}
	
	.left_box {
		position: absolute;
		height: 100%;
		width: 200px;
		background: #2F3B53;
	}
	
	.left_box i {
		color: #fff;
	}
	
	.el-menu {
		border-right: none;
	}
</style>
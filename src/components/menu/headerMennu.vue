<template>
    <div class="header_box">
        <!-- <el-menu :default-active="activeIndex2" class="el-menu-demo" mode="horizontal" @select="handleSelect" background-color="#2F3B53" text-color="#fff" active-text-color="#ffd04b">
            <el-menu-item index="1">处理中心</el-menu-item>
            <el-menu-item index="2" >gong</el-menu-item>
                <el-menu-item index="3" >消息中心</el-menu-item>
        </el-menu> -->
        <!-- <el-menu :default-active="navActive" mode="horizontal" background-color="#2F3B53" text-color="#fff" active-text-color="#fff">
				<template v-for="(item,index) in navMenu">
					<el-menu-item :index="index.toString()" @click="selectmenu(item)" :key="index">
						{{item.title}}
					</el-menu-item>
				</template>
			</el-menu> -->
    </div>
</template>

<script>
import { mapState } from "vuex"
import bus from "@/lib/bus";
export default {
		name: "headerMennu",
		data() {
			return {
				
				
			}
		},
		components: {
			
		},
		computed: {
			...mapState({
				navMenu: state => state.user.menus
			}),
			
			
			navActive() {
				let self = this;
				let path = self.$route.path.split("/")[1];
                let menu = self.navMenu;
                
				if(path == "home") return "0"

				for(var i = 0; i < menu.length; i++) {
					if(menu[i].router_path.indexOf(path) > -1) {
						return i.toString()
					}
				}

			}
		},
		mounted() {
		
		},
		methods: {
			selectmenu(item) {
				bus.$emit("item", item);
				//防止刷新页面 左侧菜单消失
				localStorage.setItem("leftMennu", JSON.stringify(item))
				this.$router.push(item.router_path)
			},
			
		}
	}
</script>


<style scoped>
    .header_box {
        position: absolute;
        width: calc(100% - 200px);
        height: 50px;
        background: #2F3B53;
        left: 200px;
    }
   .el-menu--horizontal>.el-menu-item {

    float: left;
    height: 50px;
    line-height: 52px;
    margin: 0;
    border-bottom: 2px solid transparent;
}
.el-menu-demo{
    left: 20px;
}
</style>

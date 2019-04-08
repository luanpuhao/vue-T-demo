<template>
	<div class="home">
		<header></header>
		<div class="login_box">
			<div class="login_header">
				欢迎使用瓯云
			</div>
			<div class="login_form" id="login">
				<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px" class="login-form">
					<el-form-item prop="username">
						<el-input class="" v-model="ruleForm.username" placeholder="请输入您的账号">
							<div slot="prefix" class="login-icon-username"></div>
						</el-input>
					</el-form-item>
					<el-form-item prop="pwd">
						<el-input type="password" placeholder="请输入您的密码" v-model="ruleForm.pwd">
							<div slot="prefix" class="login-icon-pwd"></div>
						</el-input>
					</el-form-item>
					<el-form-item class="login-drag">
						<drag @valid=""></drag>
					</el-form-item>

					<el-button type="primary" @click="submitForm" class="submit-btn">{{logintext}}</el-button>
				</el-form>
			</div>
		</div>

		<div class="center_bg">
			<transition-group name="fadeIn" tag="div" class="items">
				<div class="item" v-show="index == active" v-for="(item, index) in images" :class="item" :key="index+1"></div>
			</transition-group>

		</div>
		<div class="footer">
			<div class="nav-links">
				<div>智慧工地</div>
				<div>|</div>
				<div>智慧安监</div>
				<div>|</div>
				<div>工薪保障支付系统</div>
				<div>|</div>
				<div>薪乐达</div>
				<div>|</div>
				<div>智慧住建</div>
				<div>|</div>
				<div>瓯速OA</div>
				<div>|</div>
				<div>诚征英才</div>
				<div>|</div>
				<div>实名制客户端</div>
				<div>|</div>
				<div>联系我们</div>
			</div>
		</div>

	</div>
</template>

<script>
	// @ is an alias to /src
	import drag from "@/components/common/drag";
	export default {
		name: "home",
		data() {
			return {
				active: 0,
				images: ["item1", "item2", "item3"],
				ruleForm: {
					pwd: '',
					username: '',
					disabled: false
				},
				logintext: '登录',
				rules: {
					username: [{
						required: true,
						message: "请输入用户名",
						trigger: "blur"
					}],
					pwd: [{
						required: true,
						message: "请输入密码",
						trigger: "blur"
					}]
				},
			}
		},
		components: {
			drag
		},
		computed: {},
		mounted() {
			this.setSlider()
		},
		methods: {

			setSlider() {
				let self = this;
				setInterval(function() {
					self.active += 1
					if(self.active == 3) {
						self.active = 0;
					}
				}, 5000)
			},
			submitForm() {
				this.$router.push("/home")
			}
		}
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
		opacity: 0.1;
		z-index: 999;
	}
	
	.center_bg {
		bottom: 70px;
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		overflow: hidden;
	}
	
	.bg_inner {
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
	}
	
	.footer {
		position: absolute;
		bottom: 0px;
		left: 0px;
		width: 100%;
		height: 67px;
		background-color: #fff;
		z-index: 99;
	}
	
	.nav-links {
		width: 99%;
		height: 20px;
		margin: 0 auto;
		text-align: center;
		overflow: hidden;
		padding-top: 5px;
	}
	
	.footer div {
		display: inline-block;
		padding-left: 5px;
		color: #666;
		font-size: 12px;
	}
	
	.login_box {
		position: absolute;
		width: 400px;
		height: 400px;
		border: 1px solid #666;
		z-index: 10;
		top: 200px;
		left: 70%;
		background: #142046;
		opacity: 0.9;
	}
	
	.login_box {
		color: #fff;
	}
	
	.login_header {
		font-size: 25px;
		margin: 15px;
	}
	
	.login_form {
		width: 300px;
		margin: 0 auto;
	}
	
	.el-button {
		width: 300px;
	}
	
	.login-icon-pwd,
	.login-icon-username {
		width: 30px;
		height: 40px;
		padding: 5px 0;
		padding-right: 5px;
		box-sizing: border-box;
		background: url(./assets/image/login/username.png) no-repeat;
		background-size: 20px 20px;
		background-position: 3px 50%;
		position: relative;
	}
	
	.login-icon-pwd {
		background: url(./assets/image/login/pwd.png) no-repeat;
		background-size: 20px 20px;
		background-position: 3px 50%;
	}
	
	.el-input--prefix .el-input__inner {
		padding-left: 43px !important;
	}
	
	.login-icon-pwd:after,
	.login-icon-username:after {
		content: "";
		background: #EEEEEE;
		width: 2px;
		height: 20px;
		position: absolute;
		right: 0;
		top: 10px;
	}
	
	.items {
		width: 100%;
		height: 100%;
		overflow: visible;
		position: relative;
	}
	
	.item {
		width: 100%;
		height: 100%;
		background: #fff none no-repeat center center;
		position: absolute;
		left: 0;
		top: 0;
		overflow: hidden;
	}
	
	.item0 {
		background: url(./assets/image/bg.jpg) no-repeat center center;
		background-size: cover;
	}
	
	.item1 {
		background: url(./assets/image/bg1.jpeg) no-repeat center center;
		background-size: cover;
	}
	
	.item2 {
		background: url(./assets/image/bg2.jpg) no-repeat center center;
		background-size: cover;
	}
	
	.item3 {
		background: url(./assets/image/bg.jpg) no-repeat center center;
		background-size: cover;
	}
	
	.fadeIn-enter-active,
	.fadeIn-leave-active {
		transition: all 1s ease;
	}
	
	.fadeIn-enter-active,
	.fadeIn-leave {
		opacity: 1;
	}
	
	.fadeIn-enter,
	.fadeIn-leave-active {
		opacity: 0;
	}
</style>
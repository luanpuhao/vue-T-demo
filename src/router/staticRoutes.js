const staticRoutes = [{
	path: "/",
	redirect: "/login"
}, {
	path: "/login",
	name: "login", //登录
	component: resolve => require(["../login.vue"], resolve)
}]
export default staticRoutes
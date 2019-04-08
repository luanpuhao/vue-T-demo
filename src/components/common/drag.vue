<template>
	<div>
		<div id="drag">
			<div class="drag_bg"></div>
			<div class="drag_text">请按住滑块，拖动到最右边</div>
			<div class="handler handler_bg" v-drag="testFn"></div>
		</div>
	</div>
</template>

<script>
	export default {
		name: "drag",
		methods: {
			testFn(val) {
				this.$emit("valid", val)
			}
		},
		directives: {
			drag(el, binding, vnode, oldVnode) {
				let isMove = false;
				el.onmousedown = function(e) {
					let x;

					let drag = document.getElementById("drag");
					let handler = drag.getElementsByClassName("handler")[0];
					let drag_bg = drag.getElementsByClassName("drag_bg")[0];
					let text = drag.getElementsByClassName("drag_text")[0];

					let maxWidth = drag.offsetWidth - handler.offsetWidth; //能滑动的最大间距

					isMove = true;

					x = e.pageX - handler.offsetLeft;

					//鼠标指针在上下文移动时，移动距离大于0小于最大间距，滑块x轴位置等于鼠标移动距离
					document.onmousemove = function(e) {
						var _x = e.pageX - x;
						if(isMove) {
							if(_x > 0 && _x <= maxWidth) {
								handler.style.left = `${_x}px`;
								drag_bg.style.width = `${_x}px`;
							} else if(_x > maxWidth) { //鼠标指针移动距离达到最大时清空事件
								drag_bg.style.width = "100%";
								handler.style.left = "auto";
								handler.style.right = "0px";

								//清空事件
								handler.className =  `${handler.className} handler_ok`;
								handler.classList.add("handler_ok")
								text.innerText = "验证通过";
								drag.style.color = "#fff";
								el.onmousedown = null;
								binding.value(true)
								document.onmousemove = null
								document.onmouseup = null
							}
						}
					}
					document.onmouseup = function(e) {
						isMove = false;
						var _x = e.pageX - x;
						if(_x < maxWidth) { //鼠标松开时，如果没有达到最大距离位置，滑块就返回初始位置
							handler.style.left = "0px";
							drag_bg.style.width = "0px";
						}
					}

				}
			}
		}
	}
</script>

<style scoped>
	#drag {
		position: relative;
		background-color: #e8e8e8;
		width: 100%;
		height: 34px;
		line-height: 34px;
		text-align: center;
	}
	
	#drag .handler {
		position: absolute;
		top: 0px;
		left: 0px;
		width: 40px;
		height: 34px;
		border: 1px solid #ccc;
		cursor: move;
		box-sizing: border-box;
		-moz-user-select: none;
		-webkit-user-select: none;
		user-select: none;
		-o-user-select: none;
		-ms-user-select: none;
	}
	
	.handler_bg {
		background: #fff url(../../assets/image/arrow.png) no-repeat center;
	}
	
	.handler_ok {
		background: #fff url(../../assets/image/right.png) no-repeat center;
	}
	
	#drag .drag_bg {
		background-color: #7ac23c;
		height: 34px;
		width: 0px;
	}
	
	#drag .drag_text {
		position: absolute;
		top: 0px;
		font-size: 12px;
		width: 100%;
		/*color: #666;*/
	}
</style>
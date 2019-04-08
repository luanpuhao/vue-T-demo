import { Message } from "element-ui";
import Cookie from "js-cookie";
import baseUrl from "@/util/env";
import Qs from "qs"
const Msg = msg => {
	Message({
		type: "error",
		showClose: true,
		duration: 60000,
		message: msg
	})
}

/*
 * 根据某个字段 遍历 获取到整个对象
 * {params} array 要遍历的数组
 * {params} string 字段
 * {params} 值
 */
export const getObjectByEach = (arr, key, val) => {
	return new Promise((resolve, reject) => {
		let obj = {}
		arr.forEach(item => {
			if(item[key] == val) {
				obj = item;
			}
		})
		resolve(obj)
	})

}

/*
 * 验证图片大小格式
 */

export const checkImg = (type, size) => {
	if(size / 1024 / 1024 >= 2) {
		Msg("图片最大支持2M")
		return true
	}

	let result = ["image/jpg", "image/jpeg", "image/png"].indexOf(type);
	if(result > -1) {
		return false
	} else {
		Msg("图片只支持jpg/png")
		return true
	}
}

/*
 * 验证文件格式大小
 */
export const checkFile = (type, size) => {
	if(size / 1024 / 1024 >= 2) {
		Msg("文件最大支持2M")
		return true
	}

	let result = ["application/msword", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "application/vnd.ms-excel", "application/vnd.openxmlformats-officedocument.wordprocessingml.document", "application/pdf"].indexOf(type);
	if(result > -1) {
		return false
	} else {
		Msg("文件只支持world excel pdf")
		return true
	}

}
/*
 * cookie 获取userinfo
 */

let user = Cookie.get("userInfo") || "{}";
export const userInfo = JSON.parse(user);

/*
 * 文件上传action
 */
export const actions = {
	picAction: `${baseUrl}/File/PicUpload`,
	fileAction: `${baseUrl}/File/FileUpload`,
	payRoll: `${baseUrl}/PayRollFile/GetPayRollList`,
	CheckPayRoll: `${baseUrl}/PayRollFile/CheckPayRoll`,
}

/**
 * Remove an item from an array
 */
export const remove = (arr, item) => {
	if(arr.length) {
		var index = arr.indexOf(item);
		if(index > -1) {
			return arr.splice(index, 1)
		}
	}
}

/*
 * 请求结果回调
 */
export const resCallback = (res, fn) => {
	if(res.Status == "0") {
		Message.success(res.Message)
		fn ? fn() : false;
	} else {
		Message.error(res.Message)
	}
}

/*
 * 获取当前日期 
 */
export const getCurrentDate = format => {
	var now = new Date();
	var year = now.getFullYear(); //得到年份
	var month = now.getMonth(); //得到月份
	var date = now.getDate(); //得到日期
	var day = now.getDay(); //得到周几
	var hour = now.getHours(); //得到小时
	var minu = now.getMinutes(); //得到分钟
	var sec = now.getSeconds(); //得到秒
	month = month + 1;
	if(month < 10) month = `0${month}`;
	if(date < 10) date = `0${date}`
	if(hour < 10) hour = `0${hour}`
	if(minu < 10) minu = `0${minu}`
	if(sec < 10) sec = `0${sec}`
	//精确到天
	let yymmdd = `${year}-${month}-${date}`;
	let hhmmss = `${hour}:${minu}:${sec}`;
	if(format) {
		return yymmdd
	} else {
		return `${yymmdd} ${hhmmss}`
	}
}
/*
 * 判断是否为Object类型
 */

function isObject(obj) {
	return obj !== null && typeof obj === 'object'
}

/**
 * Convert a value to a string that is actually rendered.
 */
function toString(val) {
	return val == null ?
		'' :
		typeof val === 'object' ?
		JSON.stringify(val, null, 2) :
		String(val)
}

/**
 * Convert a input value to a number for persistence.
 * If the conversion fails, return original string.
 */
function toNumber(val) {
	var n = parseFloat(val);
	return isNaN(n) ? val : n
}
/**
 * Convert an Array-like object to a real Array.
 */
function toArray(list, start) {
	start = start || 0;
	var i = list.length - start;
	var ret = new Array(i);
	while(i--) {
		ret[i] = list[i + start];
	}
	return ret
}

/**
 * Mix properties into target object.
 */
function extend(to, _from) {
	for(var key in _from) {
		to[key] = _from[key];
	}
	return to
}

/**
 * Merge an Array of Objects into a single Object.
 */
function toObject(arr) {
	var res = {};
	for(var i = 0; i < arr.length; i++) {
		if(arr[i]) {
			extend(res, arr[i]);
		}
	}
	return res
}

/**
 * Check if two values are loosely equal - that is,
 * if they are plain objects, do they have the same shape?
 */
function looseEqual(a, b) {
	if(a === b) {
		return true
	}
	var isObjectA = isObject(a);
	var isObjectB = isObject(b);
	if(isObjectA && isObjectB) {
		try {
			var isArrayA = Array.isArray(a);
			var isArrayB = Array.isArray(b);
			if(isArrayA && isArrayB) {
				return a.length === b.length && a.every(function(e, i) {
					return looseEqual(e, b[i])
				})
			} else if(!isArrayA && !isArrayB) {
				var keysA = Object.keys(a);
				var keysB = Object.keys(b);
				return keysA.length === keysB.length && keysA.every(function(key) {
					return looseEqual(a[key], b[key])
				})
			} else {
				/* istanbul ignore next */
				return false
			}
		} catch(e) {
			/* istanbul ignore next */
			return false
		}
	} else if(!isObjectA && !isObjectB) {
		return String(a) === String(b)
	} else {
		return false
	}
}

function looseIndexOf(arr, val) {
	for(var i = 0; i < arr.length; i++) {
		if(looseEqual(arr[i], val)) {
			return i
		}
	}
	return -1
}

export const mothods = {
	looseEqual
}

/*
 * 拼接导出数据url
 */

export const setUrlParams = (data,url) => {
	let json  = Cookie.get("userInfo");
	let userInfo = JSON.parse(json)
	let path = url || 'DownExcel'
	let params = {
		Token: userInfo.token,
		Parameter: data
	}
	let str = Qs.stringify(params, {
		arrayFormat: 'brackets'
	})
	let api = `${baseUrl}/File/${path}?${str}`
	return api

}
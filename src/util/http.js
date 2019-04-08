import axios from "axios";
import auth from "./auth";
import { Message } from "element-ui";
import baseUrl from "./env";
import Qs from "qs"

const tokenWhiteList = ["/User/Login","/User/CheckUser"]

const callback = (fn, data) => {
	auth.removeToken();
	Message({
		message: data.Message || data.Data.Message || "",
		type: 'error',
		duration: 3000,
		showClose: true
	})
	fn(data)
	window.location.href = "/";
}

const $http = (url, data, type, page) => {
    let token = auth.hasToken();
    // beforeSend: function(request) {
    //     request.setRequestHeader("Authorization", token);
    // },

	let options = {
		baseURL: baseUrl,
		timeout: 100000,
		url: url,
        headers: {'Authorization': token},
        method: type || "get",
		paramsSerializer: function(params) {
			return Qs.stringify(params, {
				arrayFormat: 'brackets'
			})
		},
	}
	
	let params = {
		Token: token, //tokenWhiteList.find(val => url.indexOf(val) == -1) ? token : "",
		Parameter: data || "",
		Paging: page || {}
	}

	if(options.method == "post") {
		options.data = params;
	} else {
		options.params = params;
	}

	return new Promise((resolve, reject) => {
		axios(options).then(res => {
			if(res.status == 200) {
				let data = res.data
				if(data.Status == 2) {
					callback(reject, data);
				} else if(data.Status == 1) {
					Message.closeAll();
					Message({
						message: data.Message,
						type: 'error',
						duration: 60000,
						showClose: true
					})
					resolve(data)
				} else {
					resolve(data)
				}
			} else {
				console.log(res)
				reject(res)
			}
		})
	})
}

export default $http
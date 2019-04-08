let baseUrl = "";
let env = process.env.NODE_ENV;

let port = "8024";

if(env === "development"){
 baseUrl = `http://192.168.1.102:${port}/api`
 
} else {
   	baseUrl = ""

}



export default baseUrl

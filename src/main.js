// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import Vue from 'vue'
import App from './App'
import router from './router'
import  VueResource  from 'vue-resource'
import store from './store/store'
import axios from 'axios'
import 'babel-polyfill'
import VueLazyLoad from 'vue-lazyload'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
// import ElementUI from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css'
// import './assets/iconfont/iconfont.css'
import qs from 'qs'
import { getIsLogin ,setIsLogin ,removeIsLogin,setLoginName ,getIsLoginFinance,removeLoginName,removeIsLoginFinance,setIsLoginFinance ,setLoginNameFinance} from '@/utils/user' // 验权   
import config from '../config'
// import '/static/css/iconfont.css'
/*图片懒加载*/
Vue.use(Element)
Vue.use(VueLazyLoad,{
    error:'static/img/loding.gif',
    loading:'static/img/loding.gif',
    throttleWait:200
})
Vue.use(VueResource)
const instance = axios.create({ 
	method: 'post',
	timeout: 35000, 
	headers: {
		'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
	}
});
//本地存储
const Storage =  {}

Storage.get = function (name) {
    return JSON.parse(localStorage.getItem(name))
}

Storage.set = function (name, val) {
    localStorage.setItem(name, JSON.stringify(val))
}

Storage.remove = function (name) {
    localStorage.removeItem(name)
}

Storage.add = function (name, addVal) {
    let oldVal = Storage.get(name)
    let newVal = oldVal.concat(addVal)
    Storage.set(name, newVal)
}

//POST传参序列化(添加请求拦截器)
instance.interceptors.request.use(
  config => {
  	if(!navigator.onLine) { //执行离线状态时的任务
		mui.toast(`
		<div  class="toast_content" >
			<div class="toast_text">连接失败,请检查您的网络!</div>
		</div>`);
		return false;
	}
  	if(config.timeout==10000||config.timeout==30000||config.timeout==60000){
  		
  	}else{
  		// 在发送请求之前做某件事
	    if (
	      config.method === "post" ||
	      config.method === "put" ||
	      config.method === "delete"
	    ) {
	      // 序列化
	      config.data = qs.stringify(config.data);
	    }
  	}
    // 若是有做鉴权token , 就给头部带上token
    //if (localStorage.token) {
     // config.headers.Authorization = localStorage.token;
    //}
    return config;
  },
  error => {
  	
  }
);
//返回状态判断(添加响应拦截器)
instance.interceptors.response.use(
  res => {
    //对响应数据做些事&& !res.data.success
    /*if(res.data.code =="200"){
    	mui.toast(
		'<div  class="toast_content">'+
		'<i class="mui-icon iconfont icon-roundcheck"></i>'+
		'<div class="toast_text">'+res.data.message+'</div>'+
		'</div>');
    }*/
    if(res.data.code =="401"){
    	let _href = window.location.href;
		//401: 未登录或会话过期, 需要重定向到微信授权页
		if(_href.match(/guarantor/g)&&_href.match(/guarantor/g)[0]==='guarantor'){
			removeLoginName();//担保人前端退出登陆
			router.replace({path: "/guarantor/login"});
			return res;
		}else{
			let  _loginType = getQueryString('loginType');
			if(_loginType==='REGIST'){
				removeIsLogin();//入驻前端退出登陆
				router.replace({path: "/"});
			}else if(_loginType==='FINANCE'){
				removeIsLoginFinance();//融资前端退出登陆
				router.replace({path: "/login"});
			}
			mui.toast(
			'<div  class="toast_content" >'+
			'<i class="mui-icon iconfont icon-roundclose"></i>'+
			'<div class="toast_text">'+res.data.message+'</div>'+
			'</div>');
		}
	}
    if(res.data.code !="200"){
    	mui.toast(
		'<div  class="toast_content" >'+
		'<i class="mui-icon iconfont icon-roundclose"></i>'+
		'<div class="toast_text">'+res.data.message+'</div>'+
		'</div>');
    }
    //获取指定的URL参数值  
	function getQueryString(name) {
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
		var r = window.location.search.substr(1).match(reg);
		if(r != null) return unescape(r[2]);
		return null;
	}
    /*if (res.data.code) {
    	if(res.data.code =="500"||res.data.code =="10001"){
    		this.$store.commit('loadStatus', {
				'bool': false,
				'txt': '提交中...'
			}); //成功...
			mui.toast(
			'<div  class="toast_content" >'+
			'<i class="mui-icon iconfont icon-roundclose"></i>'+
			'<div class="toast_text">'+res.data.message+'</div>'+
			'</div>');
    	}
    	if(res.data.code =="401"){
    		this.$store.commit('loadStatus', {
				'bool': false,
				'txt': '提交中...'
			}); //成功...
    		mui.toast(
			'<div  class="toast_content" >'+
			'<i class="mui-icon iconfont icon-roundclose"></i>'+
			'<div class="toast_text">'+res.data.message+'</div>'+
			'</div>');
    		//401: 未登录或会话过期, 需要重定向到微信授权页
    		router.push({path: "/"});
    	}
    }*/
    return res;
  },
  error => {
  /*  // 用户登录的时候会拿到一个基础信息,比如用户名,token,过期时间戳
    // 直接丢localStorage或者sessionStorage
    if (!window.localStorage.getItem("loginUserBaseInfo")) {
      // 若是接口访问的时候没有发现有鉴权的基础信息,直接返回登录页
      router.push({
        path: "/login"
      });
    } else {
      // 若是有基础信息的情况下,判断时间戳和当前的时间,若是当前的时间大于服务器过期的时间
      // 乖乖的返回去登录页重新登录
      let lifeTime =
        JSON.parse(window.localStorage.getItem("loginUserBaseInfo")).lifeTime *
        1000;
      let nowTime = new Date().getTime(); // 当前时间的时间戳
      console.log(nowTime, lifeTime);
      console.log(nowTime > lifeTime);
      if (nowTime > lifeTime) {
        Message({
          showClose: true,
          message: "登录状态信息过期,请重新登录",
          type: "error"
        });
        router.push({
          path: "/login"
        });
      } else {
        // 下面是接口回调的satus ,因为我做了一些错误页面,所以都会指向对应的报错页面
        if (error.response.status === 403) {
          router.push({
            path: "/error/403"
          });
        }
        if (error.response.status === 500) {
          router.push({
            path: "/error/500"
          });
        }
        if (error.response.status === 502) {
          router.push({
            path: "/error/502"
          });
        }
        if (error.response.status === 404) {
          router.push({
            path: "/error/404"
          });
        }
      }
    }
    // 返回 response 里的错误信息
    let errorInfo =  error.data.error ? error.data.error.message : error.data;
    return Promise.reject(errorInfo);*/
// 	let errorInfo =  error.data.error ? error.data.error.message : error.data;
	let str = error + ''
    if (str.search('timeout') !== -1) {   // 超时error捕获
     	 mui.toast(
		'<div  class="toast_content" >'+
		'<i class="mui-icon iconfont icon-roundclose"></i>'+
		'<div class="toast_text">请求超时！</div>'+
		'</div>');
    }
  }
);
/*axios.defaults.baseURL = 'https://api.example.com';
axios.defaults.headers.post['Content-Type'] =  'application/x-www-form-urlencoded;charset=UTF-8';*/
/*axios.defaults.timeout = 4000;//响应时间
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8'; //配置请求头
*/
Vue.config.productionTip = false
Vue.prototype.$axios = instance;
Vue.prototype.$Storage = Storage;
//用来判断用户是否登陆钩子  修改页面title
router.beforeEach((to, from, next) => {
	//修改页面title
	if(to.meta.title){
		document.title = to.meta.title
	}
	let  _code = getQueryString('code');//拿到code值
	let  _loginType = getQueryString('loginType');
	var get_code = localStorage.getItem("code");
//	if(_loginType==='REGIST'){
//		if(store.state.isEnrollLogin){//入驻是否已经登录
//			next();
//			return;
//		}
//	}else if(_loginType==='FINANCE'){
//		if(getIsLoginFinance()){//融资是否已经登录
//			next();
//			return;
//		}
//	}
	if(_code !== get_code&&_code){
		localStorage.setItem("code",_code); //存入
		instance({
			url: '/wxmp-api/customer/login/wechat_code',
			async:true,
			data: {
				code: _code,
			}
		})
		.then(function(response) {
			store.commit('loadStatus', {
				'bool': false,
				'txt': '成功...'
			}); //成功...
			if(response.data.code=='200'){
				//是否绑定手机
				// this.$router.replace({path: '/enroll'});
				let _href = window.location.href;
				let _search = window.location.search;
				_href = _href.replace(_search,'?loginType='+_loginType);
				_href = escape(_href);
//				if(!response.data.data.bind&&_code == get_code){
//					window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid='+process.env.APP_ID+'&redirect_uri='+_href+'&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect' 
//				}else 
				console.log(response)
				if(response.data.data.bind){

					next({path:'/', query:{bind:response.data.data.bind}});
					
					if(_loginType==='REGIST'){
						store.commit('enrollLogin'); //入驻已登陆存状态
//						setIsLogin(true);//入驻已登陆
						store.commit('setEnrollLoginName',response.data.data.loginName); //获取入驻登录名
//						setLoginName(response.data.data.loginName);
					}else if(_loginType==='FINANCE'){
						store.commit('financeLogin'); //融资已登陆存状态
//						setIsLoginFinance(true);//融资已登陆
						store.commit('setFinanceLoginName',response.data.data.loginName); //获取融资登录名
//						setLoginNameFinance(response.data.data.loginName);
					}
					
				}else{
					// if(_loginType==='REGIST'){
						next({path:'/'});
					// }else if(_loginType==='FINANCE'){
					// 	next({path:'/login'});
					// }
					// next();
				}
			}
		})
		.catch(function(response) {
			var that = this;
			store.commit('loadStatus', {
				'bool': false,
				'txt': '加载中...'
			}); //登录提示...
		})
	}else{
		next();
	}
	//获取指定的URL参数值  
	function getQueryString(name) {
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
		var r = window.location.search.substr(1).match(reg);
		if(r != null) return unescape(r[2]);
		return null;
	}
    //let token = router.app.$storage.fetch("token");
    //let needAuth = to.matched.some(item => item.meta.login);
    // if(!token && needAuth) return next({path: "/login"});
//  next();
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  axios,
  components: { 
  	App 
  },
  template: '<App/>'
})

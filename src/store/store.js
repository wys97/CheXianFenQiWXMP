import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios'
Vue.use(Vuex);
const instance = axios.create({ 
	method: 'post',
	baseURL: 'http://10.188.0.26:8082/mockjsdata/9',
	timeout: 6000, 
	headers: {
		'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
	}
});
 /* 数据流都是单向的
    组件能够调用 action
  action 用来派发 Mutation
    只有 mutation 可以改变状态
 store 是响应式的，无论 state 什么时候更新，组件都将同步更新*/
const state = {
	islogin:false,//是否已经登录
	isEnrollLogin:false,//入驻是否已经登录
	enrollLoginName:'',//入驻登录名
	isFinanceLogin:false,//融资是否已经登录
	financeLoginName:'',//入驻登录名
	loadStatus:{
		show:false,
		status:'加载中...'
	}
}
/*相当于vm中的methods  状态的改变，将触发视图的更新 mutations改变state并且必须是同步改变*/
const mutations={
	enrollLogin(state){//入驻登录
		state.isEnrollLogin = true;
	},
	setEnrollLoginName(state,name){//存储入驻登录名
		state.enrollLoginName = name;
	},
	getEnrollLoginName(state){//获取入驻登录名
		return state.enrollLoginName
	},
	enrollOut(state){//入驻退出
		state.isEnrollLogin = false;
	},
	financeLogin(state){//融资登录
		state.isFinanceLogin = true;
	},
	setFinanceLoginName(state,name){//存储融资登录名
		state.financeLoginName = name;
	},
	getFinanceLoginName(state){//获取融资登录名
		return state.financeLoginName
	},
	financeOut(state){//融资退出
		state.isFinanceLogin = false;
	},
	loadStatus(state,status){
		state.loadStatus.show = status.bool;
		state.loadStatus.status = status.txt;
	},
}
/*获取初始化的数据源，或者中间数据的过滤 actions可以作为异步提交的方法，dispatch 可以接收一个promise，并且返回一个promise*/
const actions={
}

/*相当于vm的计算属性  计算的是store._vm.$options.data*/
const getters={
	
}
/*用export default 封装代码，让外部可以引用。*/
export default new Vuex.Store({
	state,
	mutations,
	actions,
	getters
})

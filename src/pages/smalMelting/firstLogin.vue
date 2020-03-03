<template>
	<div class="">
		<div class="screen_padding">
			<div style="line-height: 1rem; font-size: .26rem;">首次登录需修改初始密码</div>
			<form class="logo_form" @submit.prevent="submit" style="width: 100%;">
				<div class="input_groups">
					<div class="input_group mui-input-row" style="position: relative;">
						<span class="input_group_icon">原密码:</span>
						<input :type="rawPasswordType?'password':'text'"  class="input_group_input mui-input-password" v-model="password" @input="inputFunc"/>
						<span @click="changeType('rawPasswordType')" class="eye">
							<i class="iconfont " :class="rawPasswordType?'icon-attentionfill':'icon-attention'"></i>
						</span>
					</div>
					<div class="input_group mui-input-row" style="position: relative;">
						<span class="input_group_icon">新密码:</span>
						<input  :type="newPasswordType?'password':'text'" v-model="newPassword" @input="inputFunc" class="input_group_input mui-input-password"/>
						<span @click="changeType('newPasswordType')" class="eye">
							<i class="iconfont " :class="newPasswordType?'icon-attentionfill':'icon-attention'"></i>
						</span>
					</div>
					<div class="input_group mui-input-row" style="position: relative;">
						<span class="input_group_icon">确认密码:</span>
						<input :type="affirmPasswordType?'password':'text'" v-model="confirmPassword" @input="inputFunc" class="input_group_input mui-input-password"/>
						<span @click="changeType('affirmPasswordType')" class="eye">
							<i class="iconfont " :class="affirmPasswordType?'icon-attentionfill':'icon-attention'"></i>
						</span>
					</div>
				</div>
				<div style="width: 100%;text-align: center;">
					<input type="submit" class="gray_btn" v-bind:class="{black_login_btn: isSuccess }" value="确认" />
				</div>
			</form>
		</div>
	</div>
</template>
<script>
	import { $resError,$subError } from '@/utils/muiAlert'
	import axios from 'axios'
	export default {
		name: '',
		data() {
			return {
				password:'',
				newPassword:'',
				confirmPassword:'',
				loginName:'',
				isSuccess:'',
		    	rawPasswordType:true,//true:password ,false:text,
		    	newPasswordType:true,//true:password ,false:text,
		    	affirmPasswordType:true,//true:password ,false:text
			}
		},
		props: ['loading'],
		methods: {
			inputFunc: function() {
				//判断输入内容是否都为空
				if(this.newPassword!=''&&this.password != ''&&this.confirmPassword!=''){
					this.isSuccess = true;
				}
			},
			//登录
			submit: function() {
				if(!navigator.onLine) { //执行离线状态时的任务
					mui.toast(`
		  			<div  class="toast_content" >
		  				<div class="toast_text">无法连接网络</div>
					</div>`);
					return false;
				}
				//登陆验证
				var that = this;
				if(that.newPassword!=that.confirmPassword) {
					mui.toast(`
						<div  class="toast_content" >
					  	<i class="mui-icon iconfont icon-roundclose"></i>
					  	<div class="toast_text">确认密码与新密码不一致</div>
					</div>`);
					return false;
				}else if(that.password == null) {
					mui.toast(`
		  			<div  class="toast_content" >
					  	<i class="mui-icon iconfont icon-roundclose"></i>
					  	<div class="toast_text">原密码不能为空</div>
					</div>`);
					return false;
				}else{
					that.$store.commit('loadStatus', {
						'bool': true,
						'txt': '登录中...'
					}); //登录提示...
					this.$axios({
						url:'/supplier/login/change_password',
						data: {
						    password:that.password,
							newPassword:that.newPassword,
							confirmPassword:that.confirmPassword,
							loginName:localStorage.getItem('userName'),
						}
					})
					.then(function(response) {
						that.$store.commit('loadStatus', {
							'bool': false,
							'txt': '加载中...'
						}); //登录成功提示...
						if(response.data.code == '200') {
							/*mui.toast(`
							  <div  class="toast_content" >
							  	<i class="mui-icon iconfont icon-roundcheck"></i>
							  	<div class="toast_text">登陆成功</div>
							  </div>`);*/
							that.$router.replace({
								path: '/index'
							});
						}else{
							mui.toast(`
				  			<div  class="toast_content" >
							  	<i class="mui-icon iconfont icon-roundclose"></i>
							  	<div class="toast_text">${response.data.message}</div>
							</div>`);
						}
							
					}.bind(this))
					.catch(function(response) {
						setTimeout(function(){
							that.$store.commit('loadStatus', {
								'bool': false,
								'txt': '加载中...'
							}); //登录失败...
						},1000)
					}.bind(this))
					// 保存数据到localStorage
					//localStorage.setItem('userPhone', that.user.mobile);
					/*	// 从sessionStorage获取数据
						var userPhone = sessionStorage.getItem('userPhone');
						console.log(userPhone);
						// 从sessionStorage删除保存的数据
						sessionStorage.removeItem('key');
						// 从sessionStorage删除所有保存的数据
						sessionStorage.clear();*/
					/*setTimeout(function() {
						that.$router.push({
							path: '/index/index'
						});
					}, 0)*/
				}
			},
			//获取指定的URL参数值
			getQueryString: function(name) {
				var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
				var r = window.location.search.substr(1).match(reg);
				if(r != null) return unescape(r[2]);
				return null;
			},
			changeType(type){
				if(type==='rawPasswordType'){
					this.rawPasswordType = !this.rawPasswordType;
				}else if(type==='newPasswordType'){
					this.newPasswordType = !this.newPasswordType;
				}else if(type==='affirmPasswordType'){
					this.affirmPasswordType = !this.affirmPasswordType;
				}
			}
		},
		watch: { //监听

		},
		computed: { //计算属性

		},
		beforeCreate: function() { //创建前状态
			document.title = "登录";
		},
		created: function() { //创建完毕状态
			var that = this;
			that.$store.commit('loadStatus', {
				'bool': false,
				'txt': '成功...'
			}); //成功...
			let bool = that.$route.params.bool;
			if(bool == 'false'){
				that.waited = true;
				return false;
			}
			if(that.getQueryString("code")){
				var get_code = localStorage.getItem("financeCode");
				var _code = that.getQueryString("code"); //拿到code值
				localStorage.setItem("financeCode",_code); //存入 
				that.$store.commit('loadStatus', {
					'bool': true,
					'txt': '加载中...'
				}); //登录提示...
				that.$axios({
					url: '/supplier/login/wechat_code',
					data: {
						code: _code,
						loginType:'FINANCE'
					}
				}).then(function(response) {
					that.$store.commit('loadStatus', {
						'bool': false,
						'txt': '成功...'
					}); //成功...
					if(response.data.code=='200'){
						//是否绑定手机
						let _href = window.location.href;
						let _search = window.location.search;
						_href = _href.replace(_search,'');
						_href = escape(_href);
						if(!response.data.data.bind&&_code == get_code){
							window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid='+process.env.APP_ID+'&redirect_uri='+_href+'&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect' 
						}else if(response.data.data.bind){
							that.$router.replace({
								path: '/index'
							});
						}else{
							that.waited = true;
						}
					}
				}).catch(function(response) {
					var that = this;
					that.$store.commit('loadStatus', {
						'bool': false,
						'txt': '加载中...'
					}); //登录提示...
				})
			}else{
				that.waited = true;
			}
		},
		beforeMount: function() { //挂载前状态
			
			
		},
		mounted: function() { //挂载结束状态
			var that = this;
			that.$store.commit('loadStatus', {
				'bool': false,
				'txt': '加载中...'
			}); //登录提示...
			/*if(that.$route.query.mobile){
				that.user.mobile = that.$route.query.mobile;
			}*/
		},
		beforeUpdate: function() { //更新前状态
		},
		updated: function() { //更新完成状态
		},
		destroyed: function() { //销毁完成状态
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.top_box {
		height: auto;
		width: 100%;
		margin-top: 8%;
		padding: 4%;
		border-radius: .1rem;	
		-webkit-border-radius: .1rem;
		background-repeat: no-repeat;
		background-size: 100% 100%;
		
	}
	.top_title {
		font-size: .5rem;
		padding: .25rem 0;
		text-transform: uppercase;
		color: #4f4e4c;
	}
	
	.top_mes {
		color: #504f4d;
		font-size: .28rem;
	}
	
	.input_group .label {
		line-height: 1rem;
		font-size: .42rem;
	}
	
	.mui-content {
		overflow-y: hidden;
	}
	
	.logo_img {
		width: 3rem;
		margin: 0 auto 0;
		padding-top: 1.3rem;
	}
	
	.logo_img img {
		width: 100%;
	}
	
	.logo_form {
		margin-top: .4rem;
	}
	
	.input_group {
		padding-top: .1rem;
		padding-bottom: .1rem;
		margin: 0 auto;
		width: 100%;
		border-bottom: .02rem dashed #eee;
		overflow: hidden;
	}
	
	.logo_form .input_group input {
		border: none;
		margin-bottom: .1rem;
		margin-top: .1rem;
		font-size: .28rem;
		padding: .45rem 0;
	}
	.input_group_icon{
		position: absolute;
		transform: translateY(-50%);
		-webkit-transform: translateY(-50%);
		top: 50%;
		width: 22%;
		text-align: right;
		font-size: .28rem;
		color: #666;
	}
	.input_group_input{
		padding-left: 23%!important;
	}
	.input_g_left {
		float: left;
		width: 3.5rem;
	}
	
	.input_g_right {
		float: right;
		display: inline-block;
		width: 1.4rem;
		margin-top: .22rem;
		text-align: center;
		padding: .14rem .05rem;
		background-color: #fff;
		color: #fc9d23;
		border: .01rem solid #fc9d23;
		border-radius: .1rem;
		-webkit-border-radius: .1rem;
	}
	.count {
		text-align: center;
	}
	.gray_btn {
		width: 100%;
		height: .8rem;
		text-align: center;
		background-color: #fc9d23;
		opacity: .6;
		color: #fff;
		font-size: .3rem;
		margin: .5rem auto .2rem;
		border: none;
		border-radius: .8rem;
		-webkit-border-radius: .8rem;
	}
	.black_login_btn {
		background-color: #fc9d23!important;
		opacity: 1;
	}
	.check_css3 {
		margin: .4rem auto 0;
		width: 6.4rem;
		padding-left: 4%;
	}
	
	.check_css3 span {
		position: relative;
	}
	
	.check_css3 .input_check {
		position: absolute;
		visibility: hidden;
	}
	
	.check_css3 .input_check+label {
		display: inline-block;
		width: .26rem;
		height: .26rem;
		border: 1px solid #cdcdcd;
	}
	
	.check_css3 .input_check:checked+label:after {
		content: "";
		position: absolute;
		left: 2px;
		bottom: 12px;
		width: 9px;
		height: 4px;
		border: 2px solid #4cd964;
		border-top-color: transparent;
		border-right-color: transparent;
		-ms-transform: rotate(-60deg);
		-moz-transform: rotate(-60deg);
		-webkit-transform: rotate(-60deg);
		transform: rotate(-45deg);
	}
	
	.check_font {
		color: #cdcdcd;
		font-size: .24rem;
		bottom: .04rem;
		margin-left: .1rem;
	}
	
	.change_check_font {
		color: #4cd964;
	}
	.changeLoginStyleBtn{
		font-size: .24rem;
		margin-top: .3rem;
		text-align: right;
		color: #fc9d23;
	}
	.segmentedControl{
		margin-top: 1rem;
	}
	.mui-segmented-control{
		border: 0;
	}
	.mui-segmented-control .mui-control-item.mui-active{
		color: #fc9d23;
    	background-color: transparent;
    	border-bottom:1px solid #fc9d23 ;
	}
	.mui-segmented-control .mui-control-item {
		display: inline-block;
	    line-height: .8rem;
	    display: table-cell;
	    overflow: hidden;
	    width: 50%;
	    -webkit-transition: background-color .1s linear;
	    transition: background-color .1s linear;
	    text-align: center;
	    white-space: nowrap;
	    text-overflow: ellipsis;
	    border-color: #fc9d23;
	    border-left: 0;
	    background-color: transparent;
    	color: #999;
    	font-size: .3rem;
    	/*border-radius: .8rem;
    	-webkit-border-radius: .8rem;*/
	}
	.eye{
		position: absolute;
		right: 10px;
    	bottom: .5rem;
    	padding: 0 10px;
	}
</style>
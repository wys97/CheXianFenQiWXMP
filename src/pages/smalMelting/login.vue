<template>
	<div class="">
		<div class="bg_box" v-if="waited" style="background-image: url(static/img/loginImg.png);">
			<div class="logo_form_box">
				<div class="">
					<div id="segmentedControl" class="flex_l_between segmentedControl mui-segmented-control">
						<div>
							<a class="mui-control-item mui-active" href="#passwordLogin">
								<span>账号登录</span>
							</a>
						</div>
						<div>
							<a class="mui-control-item" href="#phoneLogin">
								<span>手机登录</span>
							</a>
						</div>
					</div>
					<div>
						<div id="passwordLogin" class="mui-control-content mui-active">
							<!--账号密码登录-->
							<form id="passwordLoginForm" class="logo_form" @submit.prevent="passwordSubmit" style="width: 100%;">
								<div class="input_groups">
									<div class="input_group" style="position: relative;">
										<i class="input_group_icon c_aaa iconfont icon-people"></i>
										<input class="input_group_input" v-model="passUser.userName" name="userName" @input="passInputFunc" type="text" placeholder="账号" />
									</div>
									<div class="input_group mui-input-row" style="position: relative;">
										<i class="input_group_icon c_aaa iconfont icon-lock"></i>
										<input v-model="passUser.password" @input="passInputFunc" class="input_group_input mui-input-password" type="password" placeholder="密码" name="password"  value="" />
									</div>
									<div class="input_group  flex_l_between" style="position: relative;" >
										<i class="input_group_icon c_aaa iconfont icon-tuxingyanzhengma"></i>
										<input v-model="passUser.imageCode" @input="passInputFunc" class="input_group_input"  maxlength="4" type="text" placeholder="图形验证码" name="imageCode"  value="" />
										<div class="GraphCodeImg" >
											<img @click="getPassworldImgCode" :src="PassworldSrcImg"/>
										</div>
									</div>
								</div>
								<div style="width: 100%;text-align: center;">
									<input type="submit" class="gray_btn" v-bind:class="{black_login_btn: passIsSuccess }" value="登录" name="submit"/>
								</div>
							</form> 
						</div>
						<div id="phoneLogin" class="mui-control-content ">
							<!--手机验证码登录-->
							<form  id="phoneLoginForm" class="logo_form" @submit.prevent="submit" style="width: 100%;">
								<div class="input_groups">
									<div class="input_group" style="position: relative;">
										<i class="input_group_icon c_aaa iconfont icon-mobilefill"></i>
										<input class="input_group_input" v-model="user.mobile" name="mobile" @input="inputFunc" type="text" maxlength="11" onkeyup="value=value.replace(/[^\d]/g,'')"  placeholder="请输入手机号码" />
									</div>
									<div class="input_group flex_l_between" style="position: relative;">
										<i class="input_group_icon c_aaa iconfont icon-tuxingyanzhengma"></i>
										<input v-model="user.imageCode" @input="inputFunc" class="input_group_input"  maxlength="4"  type="text" placeholder="图形验证码" name="imageCode" id="" value="" />
										<div class="GraphCodeImg" >
											<img @click="getGraphCode" :src="srcImg"/>
										</div>
									</div>
									<div class="input_group flex_l_between"  style="position: relative;">
										<i class="input_group_icon c_aaa iconfont icon-yanzhengma1"></i>
										<input v-model="user.smsCode" @input="inputFunc" class="input_group_input" maxlength="6" onkeyup="value=value.replace(/[^\d]/g,'')"  type="text" placeholder="短信验证码" name="smsCode" value="" />
										<div class="input_g_right" >
											<span v-show="Tshow" @click="fnGetCode">获取验证码</span>
											<span v-show="!Tshow" class="count">{{codeTime}} s</span>
										</div>
									</div>
								</div>
								<div style="width: 100%;text-align: center;">
									<input type="submit" class="gray_btn" v-bind:class="{black_login_btn: isSuccess }" value="登录" name="submit"/>
								</div>
							</form>  
						</div>					
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	import { $resError,$subError } from '@/utils/muiAlert'
	import axios from 'axios'
	import { getIsLoginFinance,setIsLoginFinance,setLoginNameFinance} from '@/utils/user' 
	export default {
		name: '',
		data() {
			return {
				waited:false,
				srcImg:'/supplier/login/image_code?imgCodeType=SUPPLIER_FINANCE_LOGIN',
				PassworldSrcImg:'/supplier/login/image_code?imgCodeType=SUPPLIER_ADMIN_LOGIN',
				user: {
					mobile:'',
					smsCode:'',
					imageCode:''
				},
				passUser: {
					userName:'',
					password:'',
					imageCode:''
				},
				Tshow: true,
				codeTime: '',
				timer: null,
				isSuccess: false,//短信验证码登录按钮颜色判断
				passIsSuccess:false,//账号密码登录按钮颜色判断
				checkedNames:[],
				
			}
		},
		props: ['loading'],
		methods: {
			getGraphCode:function(){
				this.srcImg = '/supplier/login/image_code'+"?imgCodeType=SUPPLIER_FINANCE_LOGIN&nocache="+new Date().getTime();
			},//更换手机登录图片路径
			getPassworldImgCode:function(){
				this.PassworldSrcImg = '/supplier/login/image_code'+"?imgCodeType=SUPPLIER_ADMIN_LOGIN&nocache="+new Date().getTime();
			},//更换管理员登录图片路径
			fnGetCode: function() {
				var that = this;
				//手机号正则  
				var phoneR = /^0?1[3|5|6|7|8|9][0-9]\d{8}$/
				var mflag = phoneR.test(this.user.mobile);
				if(mflag) {
					if(!that.user.imageCode){
						mui.toast(`
					  	<div  class="toast_content" >
						  	<i class="mui-icon iconfont icon-roundclose"></i>
						  	<div class="toast_text">图形验证码不能为空</div>
						</div>
						`);
						return false;
					}
					that.$axios({//获取短信验证码
						url: '/supplier/login/finance_send_sms',
						data: {
							mobile: that.user.mobile,
							imageCode: that.user.imageCode
						}
					})
					.then(function(response) {
						if(response.data.code == "200") {
							that.getCode();
						}else{
							that.getGraphCode();
						}
					}.bind(this))
					.catch(function(response) {
						
					}.bind(this))
					that.getCode();
				} else {
					mui.toast(`
				  	<div  class="toast_content" >
					  	<i class="mui-icon iconfont icon-roundclose"></i>
					  	<div class="toast_text">请输入正确手机号</div>
					</div>
					`);
				}
				// 对象
				/*// 命名的路由
				this.$router.push({ name: 'home', params: { userId: wise }})*/
			},
			getCode: function() {
				//获取验证码倒计时
				const TIME_COUNT = 60;
				if(!this.timer) {
					this.codeTime = TIME_COUNT;
					this.Tshow = false;
					this.timer = setInterval(() => {
						if(this.codeTime > 0 && this.codeTime <= TIME_COUNT) {
							this.codeTime--;
						} else {
							this.Tshow = true;
							clearInterval(this.timer);
							this.timer = null;
						}
					}, 1000)
				}
			},
			inputFunc: function() {
				//判断输入内容是否都为空
				var that = this;
				if(this.user.mobile.length==11&&this.user.smsCode.length==6&&this.user.imageCode.length==4) {
					this.isSuccess = true;
				} else {
					this.isSuccess = false;
				}
			},
			passInputFunc:function(){
				//判断 账号密码输入内容是否都为空
				if(this.passUser.userName != '' && this.passUser.password != ''&&this.passUser.imageCode.length==4) {
					this.passIsSuccess = true;
				} else {
					this.passIsSuccess = false;
				}
			},
			//手机验证码登录
			submit: function() {
				//登陆验证
				var that = this;
				var mobileR = /^0?1[3|5|6|7|8|9][0-9]\d{8}$/;
				var mflag = mobileR.test(this.user.mobile); //布尔值
				var mCode = this.user.smsCode;
				var formData = JSON.stringify(this.user); // 表单数据
				if(!this.isSuccess){
					return false;
				}
				if(!mflag) {
					mui.toast(`
						<div  class="toast_content" >
					  	<i class="mui-icon iconfont icon-roundclose"></i>
					  	<div class="toast_text">手机号码错误</div>
					</div>`);
					return false;
				}else  if(mflag ) {
					that.$store.commit('loadStatus', {
						'bool': true,
						'txt': '登录中...'
					}); //登录提示...
						this.$axios({
							url:'/supplier/login/finance',
							data: {
								mobile: that.user.mobile,
								smsCode: that.user.smsCode,
								imageCode: that.user.imageCode
							}
						})
						.then(function(response) {
							that.$store.commit('loadStatus', {
								'bool': false,
								'txt': '加载中...'
							}); //登录成功提示...
							if(response.data.code == '200') {
								that.$store.commit('financeLogin'); //融资已登陆存状态
//								setIsLoginFinance(true);//融资已登陆
								that.$store.commit('setFinanceLoginName',that.user.mobile); //获取融资登录名
//								setLoginNameFinance(that.user.mobile);
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
					localStorage.setItem('userPhone', that.user.mobile);
					/*	// 从sessionStorage获取数据
						var userPhone = sessionStorage.getItem('userPhone');
						console.log(userPhone);
						// 从sessionStorage删除保存的数据
						sessionStorage.removeItem('key');
						// 从sessionStorage删除所有保存的数据
						sessionStorage.clear();*/
					/*setTimeout(function() {
						that.$router.replace({
							path: '/index/index'
						});
					}, 0)*/
				}
			},
			//账号密码登录
			passwordSubmit:function(){
				if(!navigator.onLine) { //执行离线状态时的任务
					mui.toast(`
		  			<div  class="toast_content" >
		  				<div class="toast_text">无法连接网络</div>
					</div>`);
					return false;
				}
				//登陆验证
				var that = this;
				var mobileR = /^0?1[3|5|6|7|8|9][0-9]\d{8}$/;
				var mUserName = that.passUser.userName; //用户名
				var mPassWord = that.passUser.password;//密码
				var mImageCode = that.passUser.imageCode;//图形验证码
				if(!mUserName){
					mui.toast(`
		  			<div  class="toast_content" >
					  	<i class="mui-icon iconfont icon-roundclose"></i>
					  	<div class="toast_text">用户名不能为空</div>
					</div>`);
				}else if (!mPassWord){
					mui.toast(`
		  			<div  class="toast_content" >
					  	<i class="mui-icon iconfont icon-roundclose"></i>
					  	<div class="toast_text">密码不能为空</div>
					</div>`);
				}else if(!mImageCode){
					mui.toast(`
		  			<div  class="toast_content" >
					  	<i class="mui-icon iconfont icon-roundclose"></i>
					  	<div class="toast_text">验证码不能为空</div>
					</div>`);
				}else{
					that.$store.commit('loadStatus', {
						'bool': true,
						'txt': '登录中...'
					}); //登录提示...
					that.$axios({
						url:'/supplier/login/admin_login',
						data: {
						    userName: mUserName,
							password: mPassWord,
							imageCode: mImageCode
						}
					})
					.then(function(response) {
						that.$store.commit('loadStatus', {
							'bool': false,
							'txt': '加载中...'
						}); //登录成功提示...
						if(response.data.code == '200') {
							that.$router.push({
								path: `/smalMelting/noteVerify/${response.data.data.mobile}`
							});
							that.$store.commit('financeLogin'); //融资已登陆存状态
//							setIsLoginFinance(true);//融资已登陆
							that.$store.commit('setFinanceLoginName',that.passUser.userName); //获取融资登录名
//							setLoginNameFinance(that.passUser.userName);
							localStorage.setItem('userName', that.passUser.userName);
						}else{
							that.getPassworldImgCode();//重新获取图形验证码
						}	
					}.bind(this))
					.catch(function(response) {
						that.getPassworldImgCode();//重新获取图形验证码
						setTimeout(function(){
							that.$store.commit('loadStatus', {
								'bool': false,
								'txt': '加载中...'
							}); //登录失败...
						},1000)
					}.bind(this))
					// 保存数据到localStorage
					localStorage.setItem('userPhone', that.user.mobile);
				}
			},
			//获取指定的URL参数值
			getQueryString: function(name) {
				var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
				var r = window.location.search.substr(1).match(reg);
				if(r != null) return unescape(r[2]);
				return null;
			},
		},
		watch: { //监听

		},
		computed: { //计算属性

		},
		beforeCreate: function() { //创建前状态
			document.title = "融资登录";
		},
		created: function() { //创建完毕状态
			var that = this;
			that.$store.commit('loadStatus', {
				'bool': false,
				'txt': '成功...'
			}); //成功...
			if(that.$route.query.mobile){
				that.user.mobile = that.$route.query.mobile;
			}
			if(that.$store.state.isFinanceLogin){//是否已经登录
				that.$router.replace({
					path: '/index'
				});
				return;
			}else{
				that.waited = true;
			}
//			if(that.getQueryString("code")){
//				var get_code = localStorage.getItem("financeCode");
//				var _code = that.getQueryString("code"); //拿到code值
//				localStorage.setItem("financeCode",_code); //存入 
//				that.$store.commit('loadStatus', {
//					'bool': true,
//					'txt': '加载中...'
//				}); //登录提示...
//				that.$axios({
//					url: '/supplier/login/wechat_code',
//					async:true,
//					data: {
//						code: _code,
//						loginType:'FINANCE',
//						aa:'asd'
//					}
//				}).then(function(response) {
//					that.$store.commit('loadStatus', {
//						'bool': false,
//						'txt': '成功...'
//					}); //成功...
//					if(response.data.code=='200'){
//						//是否绑定手机
//						let _href = window.location.href;
//						let _search = window.location.search;
//						_href = _href.replace(_search,'');
//						_href = escape(_href);
//						if(!response.data.data.bind&&_code == get_code){
//							window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid='+process.env.APP_ID+'&redirect_uri='+_href+'&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect' 
//						}else if(response.data.data.bind){
//							setIsLogin(true);//登陆
//							that.$store.commit('login', {'bool': true}); //改变登录状态...
//							that.$router.replace({
//								path: '/index'
//							});
//						}else{
//							that.waited = true;
//						}
//					}
//				}).catch(function(response) {
//					var that = this;
//					that.$store.commit('loadStatus', {
//						'bool': false,
//						'txt': '加载中...'
//					}); //登录提示...
//				})
//			}else{
//				that.waited = true;
//			}
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
	.logo_box{
		padding: .2rem;
	}
	.logo_box_img{
		min-width: .45rem;
		min-height:.5rem; 
		margin-right: .1rem;
		background-size: contain;
		background-repeat: no-repeat;
	}
	.logo_box_name{
		color: #dfb44d;
		font-size: .22rem;
		padding-bottom: .1rem;
	}
	.logo_box_sm{
		color: #858585;
		font-size: .17rem;
	}
	.logo_form_box{
		width: 90%;
		margin: auto;
		padding: .1rem .3rem;
		border-radius: .15rem;
		-webkit-border-radius: .15rem;
		background-color: #fff;
	}
	.bg_box{
		height: auto;
		width: 100%;
		padding: 48% 0 10%;
		background-repeat: no-repeat;
		background-size: 100% auto;
	}
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
	.input_group_icon{
		position: absolute;
		transform: translateY(-50%);
		-webkit-transform: translateY(-50%);
		top: 50%;
		left: .1rem;
		font-size: .5rem;
	}
	.input_group_input{
		padding-left: .7rem!important;
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
		padding: 0;
	}
	.input_g_right {
		display: inline-block;
		width: 70%;
	    height: .5rem;
	    line-height: .5rem;
		margin-top: 3.2%;
		text-align: center;
		color: #fc9d23;
		border: 1px solid #fc9d23;
		font-size: .24rem;
		border-radius: .1rem;
		-webkit-border-radius: .1rem;
	}
	.count {
		text-align: center;
	}
	.gray_btn {
		width: 50%;
		height: .6rem;
		text-align: center;
		background-color: #cdcdcd;
		opacity: .6;
		color: #fff;
		font-size: .24rem;
		margin: .5rem auto .5rem;
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
		margin-top: .rem;
		padding-left: .2rem;
		padding-right: .2rem;
	}
	.mui-segmented-control{
		border: 0;
	}
	.mui-segmented-control .mui-control-item.mui-active span{
		color: #fc9d23;
		padding-bottom: .2rem;
    	background-color: transparent;
    	border-bottom:2px solid #fc9d23 ;
	}
	.mui-segmented-control .mui-control-item{
		display: inline-block;
	    line-height: 1rem;
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
	}
	
</style>
<template>
	<div class="">
		<div  class="screen_padding">
			<div class="login_page">
				<div style="line-height: 1rem;font-size: .24rem;">
				短信验证码已发送至
				<span class="c_bdred">
					{{user.mobile.replace(/^(.{3})(.{4})(.*)$/, '$1****$3')}}
				</span>
				请注意查收！
				</div>
				<!--手机验证码登录-->
				<form  class="logo_form" @submit.prevent="submit" style="width: 100%;">
					<div class="input_groups">
						<div class="input_group" style="position: relative;">
							<i class="input_group_icon c_main iconfont icon-yanzhengma1"></i>
							<input v-model="user.smsCode" @input="inputFunc" class="input_group_input input_g_left"maxlength="6" onkeyup="value=value.replace(/[^\d]/g,'')"  type="text" placeholder="短信验证码" name="" value="" />
							<div class="input_g_right">
								<span v-show="Tshow" @click="fnGetCode">获取验证码</span>
								<span v-show="!Tshow" class="count">{{codeTime}} s</span>
							</div>
						</div>
						<div style="position: relative;height: 1.1rem;"></div>
					</div>
					<div style="width: 100%;text-align: center;">
						<input type="submit" class="gray_btn" v-bind:class="{black_login_btn: isSuccess }" value="提交" />
					</div>
				</form> 
			</div>
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
				srcImg:'/supplier/login/image_code',
				user: {
					mobile:'',
					smsCode:''
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
			fnGetCode: function() {
				var that = this;
				//手机号正则  
				var phoneR = /^0?1[3|5|6|7|8|9][0-9]\d{8}$/
				var mflag = phoneR.test(this.user.mobile);
				if(mflag) {
					that.$axios({//获取短信验证码
						url: '/supplier/login/admin_send_sms'
					})
					.then(function(response) {
						if(response.data.code == "200") {
							/*mui.toast(`
			  			 	<div  class="toast_content" >
							  	<i class="mui-icon iconfont icon-roundcheck"></i>
							  	<div class="toast_text">验证码获取成功</div>
							  </div>
						  	`);*/
						}
					}.bind(this))
					.catch(function(response) {
						mui.toast(`
					  	<div  class="toast_content" >
						  	<i class="mui-icon iconfont icon-roundclose"></i>
						  	<div class="toast_text">验证码获取失败</div>
						  </div>
						`);
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
				if(this.user.mobile != null && this.user.smsCode.length == 6) {
					this.isSuccess = true;
				} else {
					this.isSuccess = false;
				}
			},
			
			//手机验证
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
				var mobileR = /^0?1[3|5|6|7|8|9][0-9]\d{8}$/;
				var mflag = mobileR.test(this.user.mobile); //布尔值
				var mCode = this.user.smsCode;
				if(!mflag) {
					mui.toast(`
						<div  class="toast_content" >
					  	<i class="mui-icon iconfont icon-roundclose"></i>
					  	<div class="toast_text">手机号码错误</div>
					</div>`);
					return false;
				}else if(mCode.length!= 6) {
					mui.toast(`
		  			<div  class="toast_content" >
					  	<i class="mui-icon iconfont icon-roundclose"></i>
					  	<div class="toast_text">验证码错误</div>
					</div>`);
					return false;
				}else if(mflag ) {
					that.$store.commit('loadStatus', {
						'bool': true,
						'txt': '登录中...'
					}); //登录提示...
					this.$axios({
						url:'/supplier/login/admin_mobile',
						data: {
						    mobile: this.user.mobile,
							smsCode: this.user.smsCode,
							loginName:localStorage.getItem('userName')
						}
					})
					.then(function(response) {
						that.$store.commit('loadStatus', {
							'bool': false,
							'txt': '加载中...'
						}); //登录成功提示...
						if(response.data.code == '200') {
							if(response.data.data.firstLogin=='true'){
								that.$router.replace({
									path: '/index'
								});
							}else{
								that.$router.push({
									path: `/smalMelting/firstLogin/${response.data.data.firstLogin}`
								});
							}
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
			/*that.fnGetCode();*/
			that.user.mobile = that.$route.params.mobile;
			that.fnGetCode();//获取验证码
			that.waited = true;
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
		left: .1rem;
		font-size: .32rem;
	}
	.input_group_input{
		padding-left: .5rem!important;
	}
	.input_g_left {
		float: left;
		width: 70%;
	}
	
	.input_g_right {
		float: right;
		display: inline-block;
		box-sizing: border-box;
		height: .9rem;
		line-height: .9rem;
		width: 30%;
		margin-top: .1rem;
		text-align: center;
		padding: 0;
		color: #fc9d23;
		background-color: #e9e9e9;
		font-size: .24rem;
		border-bottom-right-radius: .1rem;
		border-top-right-radius: .1rem;
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
</style>
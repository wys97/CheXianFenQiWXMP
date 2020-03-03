<template>
  	<div class="" id="bg">
	 	<div class="pf_top flex_l_start">
	  		<div class="img_box">
	  			{{txt}}
	  		</div>
	  		<div>
	  			<p class="pf_title">{{supplierName}}</p>
	  			<p class="pf_name">{{operatorName}}</p>
	  		</div>
	 	</div>
	 	<div>
	 		<ul class="pro_ul">
	 			<!--<li class="pro_li">
	 				<router-link to="" class="pro_a">
	 					<div class="pro_a_content flex_l_between">
	 						<span>企业信息设置</span>
	 						<span><i class="mui-icon mui-icon-arrowright"></i></span>
	 					</div>
	 				</router-link>
	 			</li>-->
	 			<!--<li class="pro_li">
	 				<router-link to="/smalMelting/profile/centreDetail" class="pro_a">
	 					<div class="pro_a_content flex_l_between">
	 						<span>核心企业合作关系管理</span>
	 						<span>
	 							<span class="c_mdred">{{remark}}</span>
	 							<i class="mui-icon mui-icon-arrowright"></i>
	 						</span>
	 					</div>
	 				</router-link>
	 			</li>-->
	 			<li v-if="admin" class="pro_li">
	 				<router-link to="/smalMelting/profile/accountManage" class="pro_a">
	 					<div class="pro_a_content flex_l_between">
	 						<span>账号管理</span>
	 						<span><i class="mui-icon mui-icon-arrowright"></i></span>
	 					</div>
	 				</router-link>
	 			</li>
	 			<li v-if="admin" class="pro_li">
	 				<router-link to="/smalMelting/profile/resetPasswords" class="pro_a">
	 					<div class="pro_a_content flex_l_between">
	 						<span>修改密码</span>
	 						<span><i class="mui-icon mui-icon-arrowright"></i></span>
	 					</div>
	 				</router-link>
	 			</li>
	 			<!--<li class="pro_li" style="margin-top: .2rem;">
	 				<div to="" class="pro_a">
	 					<div class="pro_a_content flex_l_between">
	 						<span>联系专属客户经理</span>
	 						<span>
 							<a href="tel:0755-88858812" style="color: #409eff;">
			  	 				0755-88858812
							</a> 
 							<i class="mui-icon mui-icon-arrowright"></i></span>
	 					</div>
	 				</div>
	 			</li>-->
	 			<!--<li class="pro_li" style="margin-top: .2rem;">
	 				<router-link to="" class="pro_a">
	 					<div class="pro_a_content flex_l_between">
	 						<span>设置</span>
	 						<span><i class="mui-icon mui-icon-arrowright"></i></span>
	 					</div>
	 				</router-link>
	 			</li>-->
	 		</ul>
	 		
	 	</div>
	 	<div class="flex_l_center">
	 		<div @click="logout" class="logout">注销</div>
	 	</div>
 	</div>
</template>
<script>
	import { $resError,$subError } from '@/utils/muiAlert'
	export default {
	  	name: '',
	  	data () {
		    return {
		    	txt:'',
		    	supplierName:'',
		    	operatorName:'',
		    	admin:false,//是否为管理员true 是 false不是
		    	remark:'',
		    }
	  	},
	  	methods: { 
	  		logout:function(){
	  			var that = this;
	  			that.$store.commit('loadStatus', {
					'bool': true,
					'txt': '注销中...'
				}); //登录提示...
				that.$axios({
					url: '/supplier/login/login_out',
					data:{
						loginType:'OPERATOR'
					}
				}).then(function(response) {
					that.$store.commit('loadStatus', {
						'bool': false,
						'txt': '加载中...'
					}); //登录提示...
					if(response.data.code=='200'){
						that.$store.commit('financeOut'); //融资退出状态
						that.$router.push({path:'/login'})
					}
				}).catch(function(response) {
					var that = this;
					that.$store.commit('loadStatus', {
						'bool': false,
						'txt': '加载中...'
					}); //登录提示...
				})
	  		},
	  		init(){
	  			this.profileData();//我基本信息
	  			this.centreData();//合作关系
	  		},
	  		profileData(){
	  			let that = this
	  			that.$axios({
				url: '/supplier/profile'
				}).then(function(response) {
					that.$store.commit('loadStatus', {
						'bool': false,
						'txt': '加载中...'
					}); //登录提示...
					if(response.data.code=='200'){
						that.supplierName = response.data.data.supplierName;
			    		that.operatorName = response.data.data.operatorName;
			    		that.admin = response.data.data.admin;
			    		that.txt = response.data.data.operatorName.substring(0,1)
					}
				}).catch(function(response) {
					that.$store.commit('loadStatus', {'bool': false,'txt': '加载中...'}); //登录提示...
				})
	  		},
	  		centreData(){
	  			let that = this;
	  			that.$axios({
				url: '/supplier/profile/centre'
				}).then(function(response) {
					that.$store.commit('loadStatus', {
						'bool': false,
						'txt': '加载中...'
					}); //登录提示...
					if(response.data.code=='200'){
						that.remark=response.data.data.remark;
					}
				}).catch(function(response) {
					that.$store.commit('loadStatus', {'bool': false,'txt': '加载中...'}); //登录提示...
				})
	  		}
	 	},
	  	watch:{//监听
	  	
	  	},
	    computed: {//计算属性
	    	
	    },
		beforeCreate: function() { //创建前状态
		},
		created: function() { //创建完毕状态
		},
		beforeMount: function() { //挂载前状态
		},
		mounted: function() { //挂载结束状态
			var that = this;
			that.$store.commit('loadStatus', {
				'bool': false,
				'txt': '成功...'
			}); //成功...
			that.$store.commit('loadStatus', {
				'bool': true,
				'txt': '加载中...'
			}); //登录提示...
			that.init();
			let h=document.getElementsByTagName("html");
			let cha = parseFloat(h[0].style.fontSize)*1.8; 
			document.getElementById('bg').style.height =  window.screen.height-cha +'px';
			
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
  	.pf_top{
  		height: 1.68rem;
  		background-color: #fff;
  		padding: .3rem .2rem;
  	}
  	.img_box{
  		width: 1.06rem;
  		height: 1.06rem;
  		line-height: 1.06rem;
  		text-align: center;
  		border: 1px solid #e6e6e6;
  		background-color: #e6e6e6;
  		border-radius: 50%;
  		-webkit-border-radius: 50%;
  		margin-right: .25rem;
  		font-size: .4rem;
  		color: #fc9d23;
  	}
  	.pf_title{
  		height: .6rem;
  		line-height: .6rem;
  		font-size: .32rem;
  	}
  	.pf_name{
  		line-height: .4rem;
  		font-size: .24rem;
  	}
  	.pro_ul{
  		width: 100%;
  		border-bottom: 1px solid #f1f1f1;
  	}
  	.pro_li{
  		width: 100%;
  	}
  	.pro_a{
  		display: inline-block;
  		width: 100%;
  		height: 1rem;
  		line-height: 1rem;
  		padding: 0 .2rem 0 .2rem;
  		background-color: #fff;
  		border-top: 1px solid #f1f1f1;
  		border-width: 1px 0 1px 0;
  		font-size: .24rem;
  	}
  	.pro_a_content{
  		width: 100%;
  		height: 100%;
  	}
  	.mui-icon-arrowright:before{
  		line-height: 1rem;
  	}
  	.logout{
  		display: inline-block;
  		padding: .1rem .2rem;
  		margin-top: .9rem;
  		background-color: #cdcdcd;
  		text-align: center;
  		color: #fff;
  		border-radius: .1rem;
  		-webkit-border-radius: .1rem;
  	}
</style>

<template>
  <div class="">
	  <div>
	  		<ul class="pro_ul">
	  			<li class="pro_li" style="margin-top: .2rem;">
		 				<div to="" class="pro_a">
		 					<div class="pro_a_content flex_l_between">
		 						<span class="c_666">姓名:</span>
		 						<span>
		 							{{guarantorName}}
	 							<!--<i class="mui-icon mui-icon-arrowright"></i>-->
		 						</span>
		 					</div>
		 				</div>
		 			</li>
		 			<li class="pro_li" style="margin-top: .1rem;">
		 				<div to="" class="pro_a">
		 					<div class="pro_a_content flex_l_between">
		 						<span class="c_666">身份证：</span>
		 						<span>
		 							{{idcard}}
		 						</span>
		 					</div>
		 				</div>
		 			</li>
		 			<li class="pro_li" style="margin-top: .1rem;">
		 				<div to="" class="pro_a">
		 					<div class="pro_a_content flex_l_between">
		 						<span class="c_666">手机号码：</span>
		 						<span>
		 							{{mobile}}
		 						</span>
		 					</div>
		 				</div>
		 			</li>
		 		</ul>
	 			<div class="flex_l_center">
			 		<div @click="logout" class="logout">退出</div>
			 	</div>
	  </div>
  </div>
</template>
<script>
	import { $resError,$subError } from '@/utils/muiAlert'
	export default {
	  	name: '',
	  	data () {
		    return {
		    	idcard:'',
		    	guarantorName:'',
		    	mobile:'',
		    }
	  	},
	  	methods: { 
	  		getGuarantorInfo(){//获取担保人信息
	  			let that = this;
	  			that.$store.commit('loadStatus', {'bool': true,'txt': '加载中...'}); //成功...
					that.$axios({
						url:'/guarantor/info'
					}).then(function(res){
	  				that.$store.commit('loadStatus', {'bool': false,'txt': '加载中...'}); //成功...
	  				if(res.data.code==='200'){
	  					that.idcard = res.data.data.idcard;
	  					that.guarantorName = res.data.data.guarantorName;
	  					that.mobile = res.data.data.mobile;
	  				}
					}).catch(function(){
	  				that.$store.commit('loadStatus', {'bool': false,'txt': '加载中...'});
					})
	  		},
	  		logout(){
	  			let that = this;
	  			var btnArray = ['否', '是'];
					mui.confirm('是否退出登录？', '',btnArray, function(e) {
						if (e.index == 1) {
							that.$store.commit('loadStatus', {'bool': true,'txt': '加载中...'}); //成功...
							that.$axios({
								url:'/guarantor/login/login_out'
							}).then(function(res){
			  				that.$store.commit('loadStatus', {'bool': false,'txt': '加载中...'}); //成功...
			  				if(res.data.code==='200'){
			  					that.$router.replace({path:'/guarantor/login'});
			  				}
							}).catch(function(){
			  				that.$store.commit('loadStatus', {'bool': false,'txt': '加载中...'});
							})
						} else {
							console.log("0")
						}
					})
	  			
	  		}
	  	},
	  	watch:{//监听
	  	
	  	},
	    computed: {//计算属性
	    	
	    },
			beforeCreate: function() { //创建前状态
				document.title = "个人中心";
			},
			created: function() { //创建完毕状态
				let that = this;
  			that.getGuarantorInfo();
			},
			beforeMount: function() { //挂载前状态
			},
			mounted: function() { //挂载结束状态
				var that = this;
				that.$store.commit('loadStatus', {
					'bool': false,
					'txt': '成功...'
				}); //成功...
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
	position: fixed;
	bottom: 1.5rem;
	
	display: inline-block;
	padding: .2rem .4rem;
	margin-top: .9rem;
	background-color: #cbcbcb;
	text-align: center;
	color: #fff;
	border-radius: .1rem;
	-webkit-border-radius: .1rem;
}
</style>

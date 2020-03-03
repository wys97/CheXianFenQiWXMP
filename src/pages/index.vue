<template>
  	<div class="">
  	</div>
</template>
<script>
	import { $resError,$subError } from '@/utils/muiAlert'
	export default {
	 	name: '',
		data () {
		    return {
		    }
		},
		methods: { 
		  	/*获取指定的URL参数值  */
			getQueryString:function(name) { 
				var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); 
			    var r = window.location.search.substr(1).match(reg); 
			    if (r != null) return unescape(r[2]); 
			    return null; 
			}  
		},
		watch:{//监听
		  	
		},
	    computed: {//计算属性
	    	
	    },
		beforeCreate: function() { //创建前状态
			document.title = "引导";
		},
		created: function() { //创建完毕状态
		},
		beforeMount: function() { //挂载前状态
			var that =this;
		  	that.$store.commit('loadStatus', {
					'bool': true,
					'txt': '加载中...'
				}); //登录提示...
		  	var _code = that.getQueryString("code");//拿到code值
				that.$axios({
					url:'/supplier/login/wechat_code',
					data:{
						code: _code
					}
				})
				.then(function(response) {
					let isBind = response.data.data.bind;//是否绑定手机
					let _registerStatus = response.data.data.bind;//入驻状态
					if(isBind){//绑定了手机
						if(_registerStatus == "PASS"){
							that.$router.push({'path':'/index'});//已经绑定手机and入驻成功
							// that.$router.replace({'path': '/'})
						}
						if(_registerStatus == "INIT"){//入驻中 
							
						}
						if(_registerStatus == "APPROVING"){//待审批  
							
						}
						
						if(_registerStatus == "AMENDING"){//待补充  
							
						}
						if(_registerStatus == "KNOWING"){//预沟通 
							
						}
						if(_registerStatus == "INVESTIGATING"){//尽调中 
							
						}
						if(_registerStatus == "SIGNING"){//签署中 
							
						}
						if(_registerStatus == "REJECT"){//入驻失败 
							
						}
					}else{//未绑定手机，按流程走
						//that.$router.push({'path':'/index'});//已经绑定手机and入驻成功
						// that.$router.replace({path: '/enroll'});
					}
				})
				.catch(function(response) {
				})
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
  
</style>

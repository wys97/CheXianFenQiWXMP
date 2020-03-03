<template>
  <div class="">
	  	<div class="en_status_content">
	  	 	<div class="wai_img_box">
	  	 		<i class="font_180 c_fuz iconfont icon-roundclosefill"></i>
	  	 	</div>
	  	 	<p class="en_status_title">入驻失败</p>
	  	 	<p class="en_status_sm">暂不符合入驻条件 </p>
	  	 	<p class="c_a en_status_sm" @click="registAgain" style="margin-top: .3rem;">重新申请</p>
	  	 	<!--<router-link to="/enter/index" class="c_a en_status_sm" style="line-height: .5rem;">
	  	 		
	  	 	</router-link>-->
	  	 	<!--<p class="back_ibtn" @click="backIndex">返回首页</p>-->
	  	</div>
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
	  	backIndex(){
	  		window.location.href = 'https://website.xiaorongtech.com/about.html'+"?v="+new Date().getTime();
	  	},
	  	registAgain(){//重新入驻
	  		let that = this;
	  		that.$axios({
					url:'/supplier/register/regist_again'
				}).then(function(res){
					if(res.data.code=='200'){
						that.$router.replace({'path': '/enter/index'}); 
					}
				}).catch(function(){
					
				})
	  	}
	  },
	  watch:{//监听
	  	
	  },
    computed: {//计算属性
    	
    },
		beforeCreate: function() { //创建前状态
			document.title = "入驻失败";
		},
		created: function() { //创建完毕状态
		},
		beforeMount: function() { //挂载前状态
		},
		mounted: function() { //挂载结束状态
			let that = this;
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

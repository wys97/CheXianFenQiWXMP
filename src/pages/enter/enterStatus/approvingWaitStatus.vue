<template>
  <div class="">
	  	<div class="en_status_content">
	  	 	<div class="wai_img_box">
	  	 		<i class="font_180 c_fuz iconfont icon-timefill"></i>
	  	 	</div>
	  	 	<p class="en_status_title">待审核</p>
	  	 	<p class="en_status_sm">您的贸易资料已提交成功 </p>
	  	 	<p class="en_status_sm">客户经理将在24小时内与您联系</p>
	  	 	<p class="back_ibtn" @click="backIndex">返回首页</p>
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
		  	backIndex:function(){
		  		window.location.href = 'https://website.xiaorongtech.com/about.html'+"?v="+new Date().getTime();
		  	}
	  	},	
	  	watch:{//监听
	  	
	  	},
	    computed: {//计算属性
	    	
	    },
		beforeCreate: function() { //创建前状态
			document.title = "贸易资料待审核";
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

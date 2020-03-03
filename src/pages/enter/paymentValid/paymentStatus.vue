<template>
  <div class="">
	  	<div class="en_status_content">
	  	 	<div class="wai_img_box">
	  	 		<i class="font_180 c_fuz iconfont " :class="status==='CONFIRM'?'icon-roundcheckfill':'icon-roundclosefill'"></i>
	  	 	</div>
	  	 	<div v-if="status==='CONFIRM'">
	  	 		<p class="en_status_title">验证成功</p>
		  	 	<p class="en_status_sm">您的入驻申请已提交成功</p>
				<p class="en_status_sm">客户经理将在24小时内与你联系</p>
				<p class="en_status_sm">联系电话：
					<a href="tel:0755-88858812" style="color: #409eff;">
	  	 				0755-88858812
					</a> 
				</p>
		  	 	<p class="back_ibtn" @click="backIndex">返回首页</p>
	  	 	</div>
	  	 	<div v-if="status==='INVALID'">
	  	 		<p class="en_status_title">验证失败</p>
		  	 	<p class="en_status_sm">您输入的失败次数过多!</p>
				<p class="en_status_sm">请联系客服处理</p>
				<p class="en_status_sm">联系电话：
					<a href="tel:0755-88858812" style="color: #409eff;">
	  	 				0755-88858812
					</a> 
				</p>
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
		    	status:'',//状态:INVALID-失效 CONFIRM_ING-待确认 CONFIRM-已确认
		    }
	  	},
	  	methods: { 
		  	goFinance:function(){
		  		let _href = window.location.href;
					let _search = window.location.search;
					let _router = _href.substring(_href.indexOf("#")+1)
					_href = _href.replace(_router,'/login')
					_href = _href.replace(_search,'');
					_href = escape(_href);
					window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid='+process.env.APP_ID+'&redirect_uri='+_href+'&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect' 
					
		  	},
		  	backIndex:function(){
		  		window.location.href = 'https://website.xiaorongtech.com/about.html'+"?v="+new Date().getTime();
		  	}
	  	},	
		watch:{//监听
		  	
		},
	    computed: {//计算属性
	    	
	    },
		beforeCreate: function() { //创建前状态
			document.title = "打款验证";
		},
		created: function() { //创建完毕状态
		},
		beforeMount: function() { //挂载前状态
		},
		mounted: function() { //挂载结束状态
			let that = this;
			that.status = that.$route.params.status;
			if(that.status=='CONFIRM'){
				document.title = "验证成功";
			}else{
				document.title = "验证失败";
			}
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

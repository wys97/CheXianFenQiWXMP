<template>
  <div class="">
	  	<div class="en_status_content">
	  	 	<div class="wai_img_box">
	  	 		<i class="font_180 c_fuz iconfont icon-roundcheckfill"></i>
	  	 	</div>
	  	 	<p class="en_status_title">入驻成功</p>
	  	 	<p class="en_status_sm">您已成功入驻</p>
	  	 	<p class="en_status_sm">请查看手机 {{$route.params.id.replace(/^(.{3})(.{4})(.*)$/, '$1****$3')}}收到的短信 </p>
	  	 	<p class="back_ibtn" @click="goFinance">去融资</p>
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
	  	goFinance:function(){
	  		let _href = window.location.href;
				let _search = window.location.search;
				let _router = _href.substring(_href.indexOf("#"))
				_href = _href.replace(_search,'');
				_href = _href.replace(_router,'?logintype=FINANCE#/login');
//				_href=_href.replace('REGIST','FINANCE');
				_href = escape(_href);
				window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid='+process.env.APP_ID+'&redirect_uri='+_href+'&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect' 
			}
	  },	
	  watch:{//监听
	  	
	  },
    computed: {//计算属性
    	
    },
		beforeCreate: function() { //创建前状态
			document.title = "入驻成功";
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

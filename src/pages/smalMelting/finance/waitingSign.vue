<template>
  <div class="">
	  	<div class="en_status_content" style="padding: 0 .2rem;">
	  	 	<div class="wai_img_box">
	  	 		<i class="font_180 c_fuz iconfont icon-timefill"></i>
	  	 	</div>
	  	 	<p v-if="status == 'TRANSFER_CONTRACT'" class="en_status_title">待签署</p>
	  	 	<p v-if="status == 'FINANCE_AUDIT_ING'" class="en_status_title">待审核</p>
	  	 	<p v-if="status == 'FAIL'" class="en_status_title">签署失败</p>
	  	 	<div v-if="status == 'FINANCE_AUDIT_ING'">
	  	 		<p class="en_status_sm">您的应收账款融资已经成功提交</p>
	  	 		<p class="en_status_sm">请耐心等待审核 </p>
	  	 	</div>
	  	 	<p v-if="status == 'TRANSFER_CONTRACT'" class="en_status_sm">未签署成功，请重新签署</p>
	  	 	<!--<div class="sub_btn" @click="share" style="background-color: #409ffd; height: .7rem;line-height: .7rem;margin-top: .5rem;">
	  	 		分享给担保人
	  	 	</div>-->
	  	 	<p  v-if="status == 'FINANCE_AUDIT_ING'||status == 'FAIL'" class="back_ibtn" @click="backIndex" style="margin-top: 1rem;">返回融资首页</p>
	  	 	<div v-if="status == 'TRANSFER_CONTRACT'" class="black_login_btn gray_btn" @click="goSign" >去签署</div>
	  	</div>
  </div>
</template>
<script>
	import { $resError,$subError } from '@/utils/muiAlert'
	import { GetQueryString } from '@/utils/common'
	export default {
	  	name: '',
	  	data () {
		    return {
		    	status:'',
		    	financeNo:'',
		    	contractUrl:''
		    }
	  	},
	  	methods: { 
		  	backIndex:function(){
	  			var that = this;
	  			that.$router.push({'path':'/index'})
		  	},
		  	share:function(){
		  	},
		  	goSign:function(){
		  		var that = this;
		  		that.$store.commit('loadStatus', {
						'bool': true,
						'txt': '提交中...'
					}); //成功...
		  		let _returnUrl =window.location.href.substring(0,window.location.href.indexOf("#"))+'#/smalMelting/finance/waitingSign';
					that.$axios({
		  			url:'/supplier/finance/sign_supplier_contract',
		  			data:{
		  				financeNo:that.financeNo,
		  				returnUrl:_returnUrl		
		  			}
		  		}).then(function(res){
		  			that.$store.commit('loadStatus', {
							'bool': false,
							'txt': '提交中...'
						}); //成功...
		  			if(res.data.code == '200'){
		  				window.location.href = res.data.data.contractUrl;
		  			}
		  		}).catch(function(){
		  			that.$store.commit('loadStatus', {
							'bool': false,
							'txt': '失败...'
						}); //成功...
						mui.toast(`
						<div  class="toast_content" >
						  	<div class="toast_text">连接失败，请检查你的网络！</div>
						</div>`);
		  		})
		  	},
	  	},
	  	watch:{//监听
	  	
	  	},
    	computed: {//计算属性
    	
    	},
		beforeCreate: function() { //创建前状态
			document.title = "待审核";
		},
		created: function() { //创建完毕状态
			var that = this;
			var url_receivableNo = GetQueryString('financeNo');
			that.$store.commit('loadStatus', {
				'bool': true,
				'txt': '签署中...'
			}); //成功...
			setTimeout(function(){
				if(url_receivableNo){
					that.financeNo = url_receivableNo;
				}
				that.$axios({
					url:'/supplier/finance/supplier_contract_back',
					data:{
						financeNo:that.financeNo,
					}
				}).then(function(res){
						that.$store.commit('loadStatus', {
							'bool': false,
							'txt': '加载中...'
						}); //成功...
					if(res.data.code == '200'){
						that.status = res.data.data.status;
						return false;
					}
					
				}).catch(function(){})
			},6000)
			
		},
		beforeMount: function() { //挂载前状态
		},
		mounted: function() { //挂载结束状态
			let that = this;
			var url_receivableNo = GetQueryString('financeNo');
			if(url_receivableNo){
				that.financeNo = url_receivableNo;
			}
			/*that.$store.commit('loadStatus', {
				'bool': false,
				'txt': '成功...'
			}); //成功...*/
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

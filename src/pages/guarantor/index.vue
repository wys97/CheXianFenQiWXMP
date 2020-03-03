<template>
  <div class="ibox">
  	<router-link v-if="status==='NOT_PASS'"
			to="/enter/faceVerify/guarantorFaceVerify">
			<div class="warn_title c_bdred">
		  	您未实名认证，请认证成功后再签署合同。去认证 >>
		  </div>
		</router-link>
	  
	  <div @click="lookPersonalCenter" class="top_box flex_l_between">
	  	<div class="left">
		  	<div>{{guarantorName}}   &nbsp;&nbsp; 
		  		<span :class="status==='PASS'?'suc_status_span':'fail_status_span'">{{statusText}}</span> 
		  	</div>
		  	<div>{{idcard}}</div>
	  	</div>
	  	<div class="right">
	  		<i class=" mui-icon mui-icon-arrowright"></i>
	  	</div>
	  </div>
	  <div class="ht_ibox" v-for="item in contractList">
	  	<div class="ht_title flex_l_between">
	  		<span>合同号：{{item.contractNo}}</span>
	  		<span :class="item.status==='SIGNED'?'pass_status':'no_pass_status'">{{item.statusText}}</span>
	  		<!--<span class="pass_status">已签署</span>
	  		<span class="no_pass_status">已失效</span>-->
	  	</div>
	  	<hr />
	  	<div class="ht_content">
	  		<div>
	  			合同名称：《保证合同》
	  		</div>
	  		<div>
	  			所属企业：{{item.supplierName}}
	  		</div>
				<div class="flex_l_between">
	  			<span></span>
	  			<span v-if="item.status!=='SIGNED'" @click="goSign(item.contractId)" class="signBtn">去签署</span>
	  			<span v-else>
	  				<div @click="lookPact(item.contractId)">
		  				<span class="lookPact">查看合同>></span>
		  			</div>
	  			</span>
	  		</div>
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
		    	status:'',
		    	statusText:'',
		    	contractList:[],//合同列表
		    }
	  	},
	  	methods: { 
	  		init(){
	  			
	  		},
	  		getGuarantorInfo(){// 获取担保人信息 
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
	  					that.status = res.data.data.status;
	  					that.statusText = res.data.data.statusText;
	  				}
					}).catch(function(){
	  				that.$store.commit('loadStatus', {'bool': false,'txt': '加载中...'});
					})
	  		},
	  		getGuarantorContractInfo(){//签署合同列表
	  			let that = this;
	  			that.$store.commit('loadStatus', {'bool': true,'txt': '加载中...'}); //成功...
					that.$axios({
						url:'/guarantor/contractInfo'
					}).then(function(res){
	  				that.$store.commit('loadStatus', {'bool': false,'txt': '加载中...'}); //成功...
	  				if(res.data.code==='200'){
	  					that.contractList = res.data.data;
	  					
	  				}
					}).catch(function(){
	  				that.$store.commit('loadStatus', {'bool': false,'txt': '加载中...'});
					})
	  		},
	  		lookPersonalCenter(){
	  			let that = this;
	  			that.$router.push({path:'/guarantor/personalCenter'});
	  		},
	  		goSign(contractId){
	  			let that = this;
	  			if(that.status==='NOT_PASS'){
	  				var btnArray = ['取消', '去认证'];
						mui.confirm('请认证成功后再签署合同', '您未实名认证', btnArray, function(e) {
							if (e.index == 1) {
								that.$router.push({path:'/enter/faceVerify/guarantorFaceVerify'});
							} else {
							}
						})
	  			}else{
	  				that.$axios({
							url:'/guarantor/contract_url',
							data:{
								contractId:contractId
							}
						}).then(function(res){
		  				that.$store.commit('loadStatus', {'bool': false,'txt': '加载中...'}); //成功...
		  				if(res.data.code==='200'){
		  					let _url = res.data.data.contractUrl;
//		  					window.open(_url);
		  					window.location.href = _url;
		  				}
						}).catch(function(error){
		  				that.$store.commit('loadStatus', {'bool': false,'txt': '加载中...'});
						})
	  			}
	  			
	  		},
	  		lookPact(contractId){
	  			let that = this;
	  			that.$store.commit('loadStatus', {'bool': true,'txt': '加载中...'}); //成功...
	  			that.$axios({
						url:'/guarantor/contract_url',
						data:{
							contractId:contractId
						}
					}).then(function(res){
	  				that.$store.commit('loadStatus', {'bool': false,'txt': '加载中...'}); //成功...
	  				if(res.data.code==='200'){
	  					let _url = res.data.data.contractUrl;
//	  					window.open(_url);
	  					window.location.href = _url;
	  				}
					}).catch(function(error){
	  				that.$store.commit('loadStatus', {'bool': false,'txt': '加载中...'});
					})
	  		}
	  	},
	  	watch:{//监听
	  	
	  	},
	    computed: {//计算属性
	    	
	    },
			beforeCreate: function() { //创建前状态
				document.title = "首页";
			},
			created: function() { //创建完毕状态
				let that = this;
				if(false){
					that.$router.replace({path:'/guarantor/login'});
				}
				that.getGuarantorInfo();//获取担保人信息
				that.getGuarantorContractInfo();//获取签署合同列表
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
	.ibox{
		font-size: .24rem;
	}
  .warn_title{
  	height: .8rem;
  	line-height: .8rem;
  	background-color: rgba(252, 157, 35, 0.2);
  	padding: 0 .2rem;
  	font-size: .24rem;
  }
  .top_box{
  	height: 1.3rem;
  	background-color: #fff;
  	/*padding: .3rem .2rem;*/
  }
  .top_box .left{
  	line-height: .5rem;
  	padding: .2rem .2rem;
  }
  .top_box .right{
  	line-height: 1.3rem;
  	padding-right: .2rem;
  }
  .suc_status_span{
  	height: .2rem;
  	padding: 0 .1rem;
  	border: 1px solid #259B24;
  	color: #259B24;
  	border-radius: .2rem;
  }
  .fail_status_span{
  	height: .2rem;
  	padding: 0 .1rem;
  	border: 1px solid #e4301f;
  	color: #e4301f;
  	border-radius: .2rem;
  }
  .ht_ibox{
  	min-height: 3rem;
  	line-height: .5rem;
  	margin: .2rem;
  	background-color: #fff;
  	border: 1px solid #dcdcdc;
  	padding: 0 .2rem;
  }
  .ht_title{
  	line-height: .8rem;
  }
  .ht_content{
  	margin-top: .25rem;
  }
  .signBtn{
  	background-color: #fc9d23;
  	padding: 0 .2rem;
  	border-radius: .1rem;
  	-webkit-border-radius: .1rem;
  	color: #fff;
  }
  .lookPact{
  	color: rgb(64, 158, 255);
  }
  .pass_status{
		color: #259B24;
	}
	.no_pass_status{
		color: #E51C23;
	}
</style>

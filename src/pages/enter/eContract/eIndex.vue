<template>
  	<div class="">
  		<div v-if="isFinsh" class="" style="padding: 0 .2rem; position: fixed;top: 0;width: 100%;z-index: 111; height: 100%; background-color: #f1f1f1;">
	  	 	<div class="wai_img_box" style="margin-top: 2rem;">
	  	 		<i class="font_180 c_fuz iconfont icon-timefill"></i>
	  	 	</div>
	  	</div>
  	    <div class="np_content">
  	    	<ul class="np_content_ul">
  	    		<li class="np_content_li">
  	    			<a :href="dataList.commerceFactorContractUrl" class="np_item_a" >
  	    				<div class="flex_l_between">
	  	    				<div>
	  	    					 《国内商业保理合同》
	  	    				</div>
	  	    				<div :class="dataList.commerceFactorContractStatus==='SUCCESS'?'pass_status':'no_pass_status'">
	  	    					<span>
		  	    					{{dataList.commerceFactorContractStatusText}}
	  	    					</span>
	  	    					<i class="mui-icon mui-icon-arrowright"></i>
	  	    				</div>
  	    				</div>
  	    			</a>
  	    		</li>
  	    		<li class="np_content_li" v-for="item in dataList.guarantor">
  	    			<a :href="dataList.commerceFactorContractStatus==='SUCCESS'?item.contractUrl:'javascript:void(0)'" 
  	    				class="np_item_a" 
  	    				:class="dataList.commerceFactorContractStatus==='SUCCESS'?'':'np_item_a_disable'"
  	    				>
  	    				<div class="flex_l_between">
	  	    				<div>
	  	    					 《保证合同》  {{item.name}}
	  	    				</div>
	  	    				<div :class="item.contractStatus==='SUCCESS'?'pass_status':'no_pass_status'">
	  	    					<span 
	  	    						:class="dataList.commerceFactorContractStatus==='SUCCESS'?'':'np_item_a_disable'">
		  	    					{{item.contractStatusText}}
	  	    					</span>
	  	    					<i class="mui-icon mui-icon-arrowright"></i>
	  	    				</div>
  	    				</div>
  	    			</a>
  	    		</li>
  	    	</ul>
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
		    	isFinsh:true,//签署过度
		    	dataList:{},//电子合同数据
		    }
	  	},
	  	methods: { 
	  		getQueryContract(){
	  			let that = this;
	  			that.$store.commit('loadStatus', {
					'bool': false,
					'txt': '成功...'
				}); //成功...
				that.$axios({
					url:'/supplier/electronic_contract/query_contract',
				})
				.then(function(response){
					if(response.data.code == '200'){
						that.dataList = response.data.data;
					}
				})
				.catch(function(error){
					
				})
	  		}
	 	},
	  	watch:{//监听	
	  		dataList:function(val,oldVal){
	  			
	  		}
	  	},
	    computed: {//计算属性
	    },
		beforeCreate: function() { //创建前状态
			document.title = "电子合同";
		},
		created: function() { //创建完毕状态
		},
		beforeMount: function() { //挂载前状态
		},
		mounted: function() { //挂载结束状态
			let that = this;
			let _type = GetQueryString('type');
			if(_type){
				that.$store.commit('loadStatus', {
					'bool': true,
					'txt': '签署中...'
				}); //成功...
				setTimeout(function(){
					that.isFinsh = false;
					that.getQueryContract();
				},6000)
				
			}else{
				that.isFinsh = false;
				that.getQueryContract();
			}
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
    .np_top{
    	height: auto;
		width: 100%;
		padding: 9% .23rem;
		background-repeat: no-repeat;
		background-size: 100% 100%;
    }
    .np_img_box{
    	height: .9rem;
    	line-height: .9rem;
    	width: .9rem;
    	margin-right: .2rem;
    	border-radius: 50%;
    	-webkit-border-radius: 50%;
  		text-align: center;
  		background-color: #fc9d23;
  		color: #fff;
  		font-size: .3rem;
    }
    .np_top_status{
    	padding: .12rem 0;
    	font-size: .4rem;
    	color: #fff;
    }
    .np_top_sm{
    	font-size: .22rem;
    	color: #fff;
    	word-wrap: break-word;
    	line-height: .3rem;
    }
    .np_top_sm_red{
    	color: #e4301f;
    }
    .np_content{
    }
    .np_item_icon{
    	height: .4rem;
    	width: .4rem;
    	margin-right: .1rem;
    	position: relative;
    	top: .1rem;
    }
    .np_content_ul{
    	width: 100%;
    }
    .np_content_ul i{
    	position: relative;
    	top: -.02rem;
    	color: #ccc;
    }
    .np_content_li{
    	width: 100%;
    }
    .np_item_a{
    	display: inline-block;
    	height: 1.1rem;
    	line-height: 1.1rem;
    	width: 100%;
    	padding: 0 .13rem;
    	background-color: rgba(255,255,255);
    	margin-top: .24rem;
    	font-size: .26rem;
    }
    .np_item_a_disable{
    	color: #999;
    }
    .pass_status{
    	color: #259B24;
    }
    .no_pass_status{
    	color: #E51C23;
    }
</style>

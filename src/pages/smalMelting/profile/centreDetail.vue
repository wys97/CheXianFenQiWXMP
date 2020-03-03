<template>
  	<div class="" id="bg">
	 	<div class="center_item_box">
	 		<div v-if="centreDetail" class="center_item" v-for="item in centreDetail">
	 			<div class="center_title">{{item.centreName}}</div>
	 			<div class="center_content">
	 				<div>
	 					<span class="center_text">合同有效期：{{item.contractEndDate}}</span>
	 					<span v-if="item.contractEndDateStatusText" class="fil_status">{{item.contractEndDateStatusText}}</span>
	 				</div>
	 				<div>
	 					<span class="center_text">平台账号：{{item.scmAccount}}</span>
	 					<span v-if="item.scmAccountStatusText" class="fil_status">{{item.scmAccountStatusText}}</span>
	 				</div> 
	 				<div>
	 					<span class="center_text">银行账号：{{item.bankAccountNo}}</span>
	 					<span v-if="item.bankAccountNoStatusText" class="fil_status">{{item.bankAccountNoStatusText}}</span>
	 				</div>
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
		    	centreDetail:''
		    }
	  	},
	  	watch:{//监听
	  	},
	    computed: {//计算属性
	    	
	    },
		beforeCreate: function() { //创建前状态
			document.title = "还款详情";
		},
		created: function() { //创建完毕状态
		},
		beforeMount: function() { //挂载前状态
		},
		mounted: function() { //挂载结束状态
			var that = this;
			that.init();
		},
	  	methods: { 
	  		init(){
	  			this.getCentreDetail();
	  		},
	  		getCentreDetail(){
	  			let that = this;
	  			that.$axios({
					url: '/supplier/profile/centre_detail'
				}).then(function(response) {
					that.$store.commit('loadStatus', {'bool': false,'txt': '加载中...'}); //登录提示...
					if(response.data.code=='200'){
						that.centreDetail = response.data.data;
					}
				}).catch(function(response) {
					var that = this;
					that.$store.commit('loadStatus', {'bool': false,'txt': '加载中...'}); //登录提示...
				})
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
  	.center_item_box{
  		padding: .3rem .15rem;
  	}
  	.center_item{
  		background-color: #fff;
  		padding: .1rem .15rem .2rem;
  		border-radius: .1rem;
  		-webkit-border-radius: .1rem;
  	}
  	.center_title{
  		line-height: .8rem;
  		font-size: .36rem;
  	}
  	.center_content{
  		line-height: .5rem;
  		font-size: .26rem;
  	}
  	.center_text{
  		display: inline-block;
  		width: 4rem;
  	}
</style>

<template>
  	<footer class="footer_bar">
  		<div class="flex_l_around footer_box">
  			<div class="footer_item">
  				<router-link to="/index/finance" class="footer_item_a" >
					<span class="footer_item_icon mui-icon iconfont icon-money"></span>
					<div class="footer_item_title" >融资</div>
				</router-link>
  			</div>
  			<div class="footer_item">
  				<router-link to="/index/repayment" class="footer_item_a" >
					<span class="footer_item_icon mui-icon iconfont icon-huankuandan"></span>
					<div class="footer_item_title ">还款</div>
				</router-link>
  			</div>
  			<div class="footer_item">
				<router-link to="/index/profile" class="footer_item_a" >
					<span class="footer_item_icon mui-icon mui-icon-contact"></span>
					<div class="footer_item_title">我的</div>
				</router-link>
  			</div>
  		</div>
	</footer>
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
	  	
	 	 },
	  	watch:{//监听
	  	
	  	},
	    computed: {//计算属性
	    	
	    },
		beforeCreate: function() { //创建前状态
			
		},
		created: function() { //创建完毕状态
			
		},
		beforeMount: function() { //挂载前状态
		},
		mounted: function() { //挂载结束状态
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
  	.footer_bar{
  		position: fixed;
  		bottom: 0;
  		left: 0;
  		    z-index: 222;
  		width: 100%;
  		height: .85rem;
  		border: 1px solid #cecece;
  		background-color: #f3f3f3;
  	}
  	.footer_box{
  		width: 100%;
  		height: 100%;
  	}
  	.footer_item{
  		width: 33.33%;
  		height: 100%;
  		box-sizing: border-box;
  		text-align: center;
  	}
  	.footer_item_a{
  		display: inline-block;
  		width: 100%;
  		height: 100%;
  		background-color: #f3f3f3;
  	}
  	.footer_item_icon{
  		padding: .10rem 0 .06rem;
  		font-size: .38rem;
  		
  	}
  	.footer_item_title{
  		font-size: .24rem;
  	}
  	.router-link-active{
  		color: #fc9d23;
  	}
</style>

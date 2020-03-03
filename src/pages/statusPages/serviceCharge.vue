<template>
  	<div class="">
  		<div class="ri_top_box" >
  			<p class="c_bgblack" style="line-height: .8rem;">保证金金额</p>
  			<p class="font_42 c_mdred" style="line-height: 1.5rem;">{{fee}} <span class="font_18">元</span> </p>
  			<!--<p class="c_aaa">
  				<span>还款记录</span>
  				<i class="mui-icon mui-icon-arrowright" style="position: relative;top: -2px;"></i>
  			</p>-->
  		</div>
	  	<div class="footer_bar_padding">
		  	<ul class="ri_ul">
				<!--<li class="ri_li">
					<div class="ri_a">
						<div class="	">
							开户名称：深圳小融商业保理有限公司
						</div>
						<div class="">
							开户银行：招商银行
						</div>
						<div class="">
							开户网点：深圳高新园支行
						</div>
						<div class="">
							银行账号：7559 3866 2810 802
						</div>
					</div>
				</li>-->
				<li class="ri_li" style="margin-top: .2rem;">
					<div class="ri_a" style="min-height: .2rem;">
						<div class="flex_l_between">
							<span>融资订单：</span>
							<span>{{orderNo}}</span>
						</div>
					</div>
				</li>
		  	</ul>
		</div>
  	</div>
</template>
<script>
	import { $resError,$subError } from '@/utils/muiAlert'
	export default {
	  	name: '',
	  	data () {
		    return {
		    	fee:'',
		    	orderNo:'',
		    }
	  	},
	  	methods: { 
	  		//获取指定的URL参数值  
			getQueryString: function(name) {
				var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
				var r = window.location.search.substr(1).match(reg);
				if(r != null) return unescape(r[2]);
				return null;
			},
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
			var that = this;
			that.$store.commit('loadStatus', {
				'bool': false,
				'txt': '成功...'
			}); //成功...
			that.fee = that.getQueryString('fee');
			that.orderNo = that.getQueryString('orderNo');
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
  	.ri_top_box{
  		width: 100%;
  		height: 3.1rem;
  		background-color: #fff;
  		text-align: center;
  		font-size: .26rem;
  		border: 2px solid #fff;
  		margin-bottom: .2rem;
  	}
  	.ri_top_pd{
  		padding-bottom: .86rem;
  	}
  	.ri_ul{
		width: 100%;
		font-size: .22rem;
		border-bottom: 1px solid #e1e1e1;
	}
	.ri_li{
		width: 100%;
	}
	.ri_a{
		display: inline-block;
		width: 100%;
		min-height: 2rem;
		background-color: #fff;
		border-top: 1px solid #e1e1e1;
		padding: .15rem .15rem;
		line-height: .4rem;
		font-size: .26rem;
	}
	.ri_a_left{
		width: 15%;
	}
	.ri_a_right{
		width: 75%;
	}
	.ri_a_top{
		height: .5rem;
		line-height: .5rem;
	}
	.ri_a_middle{
		height: .9rem;
		line-height: .9rem;
		color: #e4301f;
	}
	.ri_a_down{
		color: #cfcfcf;
		width: 80%;
	}
	.ri_hk_btn{
		display: inline-block;
		height: .5rem;
		line-height: .5rem;
		text-align: center;
		width: 1rem;
		color: #fc9d23;
		border:1px solid #fc9d23;
		border-radius: .08rem;
		-webkit-border-radius: .08rem;
	}
	.ri_bg_font{
		font-size: .4rem;
		color: #f46457;
		font-weight:900;
	}
</style>

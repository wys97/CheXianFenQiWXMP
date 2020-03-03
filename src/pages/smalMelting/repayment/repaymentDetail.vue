<template>
  	<div class="fil_ul" id="bg">
	 	<div>
	 		<ul class="pro_ul">
	 			<li class="pro_li">
	 				<router-link to="" class="pro_a">
	 					<div class="pro_a_content flex_l_between">
	 						<span>还款状态：</span>
	 						<span>
	 							<span  class="ri_status" 
	 								:class="paymentDetails.status=='OVERDUE'?'ri_status_yq':paymentDetails.status=='ALL'?'ri_status_hq':''">
	 								{{paymentDetails.statusText}}
	 							</span>
	 						</span>
	 					</div>
	 				</router-link>
	 			</li>
	 			<li class="pro_li">
	 				<router-link :to="'/smalMelting/finance/financeDetail/'+paymentDetails.financeNo" class="pro_a">
	 					<div class="pro_a_content flex_l_between">
	 						<span>融资详情</span>
	 						<span>
	 							<span class="c_bgblack">{{paymentDetails.financeNo}}</span>
	 							<i class="mui-icon mui-icon-arrowright"></i>
	 						</span>
	 					</div>
	 				</router-link>
	 			</li>
	 			<li class="pro_li">
	 				<router-link to="" class="pro_a">
	 					<div class="pro_a_content flex_l_between" style="padding-top: .1rem; line-height: .4rem;">
	 						<span>
	 							<div>期数：</div>
	 							<div>融资金额：</div>
	 							<div>融资还款到期日：</div>
	 						</span>
	 						<span>
	 							<div>{{paymentDetails.curPeriod}}</div>
	 							<div class="c_bgblack">{{paymentDetails.financeAmt}}元</div>
	 							<div>{{paymentDetails.expireDate}}</div>
	 						</span>
	 					</div>
	 				</router-link>
	 			</li>
	 			<div v-if="showDetail" class="rimx_box">
	 				<div class="rimx_title">
						  待还明细
					</div>
					<div class="rimx_content">
						<div style="line-height: .4rem;">
							<div class="flex_l_between">
								<span>剩余待还本金：</span>
								<span>{{paymentDetails.stayPrincipal}}元</span>
							</div>
							<div class="flex_l_between">
								<span>利息：</span>
								<span>{{paymentDetails.interest}}元</span>
							</div>
							<div class="flex_l_between">
								<span>逾期利息：</span>
								<span>{{paymentDetails.overdueInterest}}元</span>
							</div>
							<div class="flex_l_between">
								<span>服务费：</span>
								<span>{{paymentDetails.fee}}元</span>
							</div>
						</div>
						<hr style="border-top: 1px solid #cdcdcd;margin: .2rem 0 .1rem;" />
						<div class="flex_l_between" style="line-height: 1.2rem;position: relative;">
							<div class="">剩余应还总金额：</div>
							<div>
								<div class="font_32 c_money font_w">{{paymentDetails.residualClaimsAmt}}元</div>
							</div>
							<div v-if="paymentDetails.cashDepositStatus" style="position: absolute;top: .4rem;right: 0;">(已扣除提前支付的保证金 {{paymentDetails.cashDeposit}} 元)</div>
						</div>
					</div>
	 			</div>
	 			<li class="pro_li" style="margin-top: .2rem;">
	 				<router-link :to="'/smalMelting/repayment/repaymentRecorded/'+orderNo" class="pro_a">
	 					<div class="pro_a_content flex_l_between">
	 						<span>已还金额：</span>
 							<div>
			  	 			<span class="c_bgblack">{{paymentDetails.paidDebtAmt}}元</span>
 							<i class="mui-icon mui-icon-arrowright"></i>
							</div> 
	 					</div>
	 				</router-link>
	 			</li>
	 		</ul>
	 		<div style="line-height: 1rem;padding: 0 .15rem;">注：日利息=当前应还本金（全部应还未还本金）*日利率</div>
	 	</div>
 	</div>
</template>
<script>
	import { $resError,$subError } from '@/utils/muiAlert'
	export default {
	  	name: '',
	  	data () {
		    return {
		    	status:'',//还款状态 WAITING-待还款 ALL-已还清 OVERDUE-已逾期
		    	orderNo:'',//融资单号
		    	showDetail:false,//是否显示待还明细
		    	paymentDetails:{},//还款详情数据
		    }
	  	},
	  	methods: { 
	  		
	 	},
	  	watch:{//监听
	  		status:function(val,oldVal){
	  			if(val==='OVERDUE'||val==='WAITING'){
	  				this.showDetail = true;
	  			}
	  		}
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
			that.orderNo = that.$route.params.id;
			that.$store.commit('loadStatus', {
				'bool': false,
				'txt': '成功...'
			}); //成功...
			that.$store.commit('loadStatus', {
				'bool': true,
				'txt': '加载中...'
			}); //登录提示...
			that.$axios({
				url: '/supplier/repayment/paymentDetails',
				data:{
					orderNo:that.orderNo
				}
			}).then(function(response) {
				that.$store.commit('loadStatus', {
					'bool': false,
					'txt': '加载中...'
				}); //登录提示...
				if(response.data.code=='200'){
					that.paymentDetails = response.data.data;
					that.status = response.data.data.status;
				}
			}).catch(function(response) {
				that.$store.commit('loadStatus', {
					'bool': false,
					'txt': '加载中...'
				}); //登录提示...
			})
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
  	.pf_top{
  		height: 1.68rem;
  		background-color: #fff;
  		padding: .3rem .2rem;
  	}
  	.img_box{
  		width: 1.06rem;
  		height: 1.06rem;
  		line-height: 1.06rem;
  		text-align: center;
  		border: 1px solid #e6e6e6;
  		background-color: #e6e6e6;
  		border-radius: 50%;
  		-webkit-border-radius: 50%;
  		margin-right: .25rem;
  		font-size: .4rem;
  		color: #fc9d23;
  	}
  	.pf_title{
  		height: .6rem;
  		line-height: .6rem;
  		font-size: .32rem;
  	}
  	.pf_name{
  		line-height: .4rem;
  		font-size: .24rem;
  	}
  	.pro_ul{
  		width: 100%;
  		border-bottom: 1px solid #f1f1f1;
  	}
  	.pro_li{
  		width: 100%;
  	}
  	.pro_a{
  		display: inline-block;
  		width: 100%;
  		min-height: 1rem;
  		line-height: 1rem;
  		padding: 0 .2rem 0 .2rem;
  		background-color: #fff;
  		border-top: 1px solid #f1f1f1;
  		border-width: 1px 0 1px 0;
  		font-size: .24rem;
  	}
  	.pro_a_content{
  		width: 100%;
  		height: 100%;
  	}
  	.mui-icon-arrowright:before{
  		line-height: 1rem;
  	}
  	.rimx_box{
  		margin-top: .2rem;
  	}
  	.rimx_title{
  		padding: 0 .15rem;
  		line-height: .8rem;
  		color: #333;
  		background-color: rgba(252, 157, 35, 0.2);
  	}
  	.rimx_content{
  		padding: .1rem .15rem;
  		background-color: #fff;
  	}
</style>

<template>
  	<div class="" style="padding-bottom: 2rem;">
		<div class="">
			<div class="account_content">
				<ul class="fil_ul">
					<li  class="fil_li" v-for="(item,index) in backPlanList">
						<router-link :to="'/smalMelting/repayment/repaymentDetail/'+item.receivableNo" class="fil_a" style="min-height: .8rem;">
							<div class="flex_l_between">
								<div>
									<div class="fil_je_sm">融资单号：{{item.financeNo}} {{item.curPeriod}}</div>
									<div class="fil_je_num c_666 font_36">{{item.financeAmt}}</div>
								</div>
								<div class="">
									<div class="fil_je_num" style="margin-top: .08rem;">
										<span>{{item.paidDebtAmt}}</span>
										<i class="mui-icon mui-icon-arrowright"></i>
									</div>
									<div class="fil_je_sm"></div>
								</div>
							</div>
						</router-link>
					</li>
					<div v-if="accountNone">
						<div v-if="accountIsMore" @click="lookMore" class="lookMoreBtn">
							<span>加载更多</span>
						</div>
						<div v-if="!accountIsMore" class="noMore">-没有更多-</div>
					</div>
					<div v-if="!accountNone" class="noMore">-暂无记录-</div>
				</ul>
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
		    	backPlanList:[],//还清融资单列表
		    	lastReceivableNo:'',//上次查询还清融资单最后一条的单号，第一次传空
		    	limit:10,//每页显示数量
		    	accountIsMore:true,//还清融资单是否还有更多
		    	accountNone:false,//是否有还清融资单
		    }
	  	},
	  	methods: { 
	  		upVoucher(){
	  			this.$router.push({path:'/smalMelting/repayment/paymentVoucher'})
	  		},
	  		lookMore(){//查看更多
	  			this.getAccountReceivableList();
	  		},
	  		init(){
				this.getAccountReceivableList();
	  		},
	  		getAccountReceivableList(){//获取还清融资单列表	
	  			var that = this;
	  			that.$store.commit('loadStatus', {'bool': true,'txt': '加载中...'}); 
	  			if(that.accountIsMore){
		  			that.$axios({
						url:'/supplier/repayment/havePaidOffFinanceList',
						data:{
							lastReceivableNo:that.lastReceivableNo,
							limit:that.limit,
						}
					})
					.then(function(res){
		  				that.$store.commit('loadStatus', {'bool': false,'txt': '加载中...'}); 
						if(res.data.code=='200'){
							that.backPlanList = that.backPlanList.concat(res.data.data.list);
							if(res.data.data.list.length){
								that.lastReceivableNo = that.backPlanList[that.backPlanList.length-1].orderNo;
							}
							if(that.backPlanList.length>0){
								that.accountNone = true;
							}
							that.accountIsMore = res.data.data.isMore;
						}
					})
	  			}
	  		},
	 	 },
	  	watch:{//监听
	  		
	  	},
	    computed: {//计算属性
	    	
	    },
		beforeCreate: function() { //创建前状态
			document.title = '已还清融资单'
		},
		created: function() { //创建完毕状态
			this.init();
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
	.fil_je_num{
		height: .8rem;
		line-height: .8rem;
	}
	.finance_top_box_sub{
		display: inline-block;
		padding: .2rem .35rem;
		background-color: #fc9d23;
		color: #fff;
		border-radius: .1rem;
		-webkit-border-radius: .1rem;
	}
  	.ri_top_box{
  		width: 100%;
  		height: 2.8rem;
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
	
	.finance_top_box{
		height: 2.4rem;
		text-align: center;
		background-color: #fff;
	}
	.finance_top_box_sup{
		line-height: .8rem;
	}
	.finance_top_box_middle{
		font-size: .5rem;
		margin-bottom: .16rem;
		color: #333;
	}
	.finance_top_box_sub{
		display: inline-block;
		padding: .2rem .35rem;
		background-color: #fc9d23;
		color: #fff;
		border-radius: .1rem;
		-webkit-border-radius: .1rem;
	}
	.finance_two_box{
		min-height: 1.2rem;
		margin-top: .05rem;
		text-align: center;
		background-color: #fff;
	}
	.finance_two_box .left{
		border-right: 1px solid #e8e8e8;
		
	}
	.finance_two_box .left,.finance_two_box .right{
		width: 50%;
	}
	.finance_records_box,.finance_account_box{
		margin-top: .18rem;
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
  		height: 1rem;
  		line-height: 1rem;
  		padding: 0 .2rem 0 .2rem;
  		border-top: 1px solid #f1f1f1;
  		background-color:rgba(252, 157, 35, 0.2);
  		/*fa7a3d*/
  		color: #252525;
  		border-width: 1px 0 1px 0;
  		font-size: .24rem;
  	}
  	.pro_a_content{
  		width: 100%;
  		height: 100%;
  	}
  	.records_content .fil_a{
  		min-height: .16rem;
  		border: 0;
  		margin-bottom: .03rem;
  	}
  	.records_content .fil_bh{
  		font-size: .24rem;
  		line-height: .4rem;
  		height: .4rem;
  	}
  	.noMore{
  		line-height: .7rem;
  		text-align: center;
  	}
  	.lookMoreBtn{
  		text-align: center;
  		line-height: .7rem;
  	}
  	.lookMoreBtn span{
  		padding: .1rem .6rem;
  		border: 1px solid #e0e0e0;
  		background-color: #f6f3f3;
  		border-radius: .1rem;
  	}
  	.top_warning{
  		position: sticky;
  		top: 0;
  		left: 0;
  		background-color: #E51C23;
  		color: #fff;
  		padding: .1rem .2rem;
  		font-size: .18rem;
  	}
</style>

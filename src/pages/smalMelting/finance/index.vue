<template>
  	<div id="finance" class="mui-control-content mui-active" style="padding-bottom: 1.5rem;">
	 	<div class="finance_top_box">
			<div class="finance_top_box_sup">可融资额度（元）</div>
			<div class="finance_top_box_middle">{{availableBalance}}</div>
			<div @click="applyFinance" class="finance_top_box_sub">申请融资</div>
		</div>
		<div class="finance_two_box flex_l_around">
			<div class="left">
				<div style="line-height: .65rem;">授信额度(元)</div>
				<div class="c_bgblack">{{creditLine}}</div>
			</div>
			<div class="right">
				<div style="line-height: .65rem;">已用额度（元）</div>
				<div class="c_bgblack">{{usedBalance}}</div>
			</div>
		</div>
		<div class="finance_records_box">
			<div class="records_title">
				<ul class="pro_ul">
		 			<li class="pro_li">
		 				<div  @click="lookFinanceRecordsIng('all')"  class="pro_a">
		 					<div class="pro_a_content flex_l_between">
		 						<span>融资记录</span>
		 						<span>全部 <i class="mui-icon mui-icon-arrowright"></i></span>
		 					</div>
		 				</div>
		 			</li>
		 		</ul>
			</div>
			<div v-if="financeNumber>0" class="records_content">
				<ul class="fil_ul">
					<li class="fil_li"  v-for="(item,index) in financeOrderList">
						<router-link  :to="'/smalMelting/finance/financeDetail/'+item.financeNo" class="fil_a">
							<div class="flex_l_between">
								<div class="">
									<div  class="fil_bh">
										<span style="display: inline-block;">
											融资单号：<span class="c_bgblack">{{item.financeNo.substring(0,16)}}...</span>
										</span>
										<span class="fil_status" style="margin-left: .1rem;">{{item.statusText.substring(0,6)}}</span>
									</div>
									<div class="fil_bh">
										<span style="display: inline-block;">
											融资金额：<span class="c_bgblack bg_font fil_bg_font_t">{{item.financeAmt}}元</span>
										</span>
									</div>
									<div class="fil_bh">
										<span style="display: inline-block;">
											申请日期：<span class="c_bgblack">{{item.applyTime}}</span>
										</span>
									</div>
								</div>
								<div class="">
									<div class="fil_je_num ">
										<i class="mui-icon mui-icon-arrowright"></i>
									</div>
									<div class="fil_je_sm"></div>
								</div>
							</div>
						</router-link>
					</li>
				</ul>
				<div @click="lookFinanceRecordsIng('ing')" style="text-align: center;line-height: .5rem;background-color: #fff;">查看{{financeNumber}}笔融资中的记录>></div>
				
			</div>
		</div>
		<div class="finance_account_box">
			<div class="records_title">
				<ul class="pro_ul">
		 			<li class="pro_li">
		 				<router-link to="/smalMelting/finance/accountReceivable" class="pro_a">
		 					<div class="pro_a_content flex_l_between">
		 						<span>应收账款</span>
		 						<span>全部 <i class="mui-icon mui-icon-arrowright"></i></span>
		 					</div>
		 				</router-link>
		 			</li>
		 		</ul>
			</div>
			<div class="account_content">
				<ul class="fil_ul">
					<li  class="fil_li" v-for="(item,index) in accountReceivableList">
						<router-link :to="'/smalMelting/finance/accountReceivableDetail/'+item.receivableNo" class="fil_a">
							<div class="fil_bh">
								<!--<span class="fil_centreType">{{item.centreName.substring(0,1)}}</span>-->
								<span style="display: inline-block;">{{item.receivableNo}}</span>
								<span class="fil_status">{{item.statusText}}</span>
							</div>
							<div class="flex_l_between">
								<div class="flex_l_start" style="width: 78%;">
									<div class="" style="width: 50%;">
										<div class="fil_je_num fil_bg_font">{{item.financeAmt}}</div>
										<div class="fil_je_sm">可融金额（元）</div>
									</div>
									<div class="" style="width: 50%;">
										<div class="text_c fil_je_num fil_bg_font fil_bg_font_t">{{item.validDays}}</div>
										<div class="text_c fil_je_sm">剩余有效期（天）</div>
									</div>
								</div>
								<div class="">
									<div class="fil_je_num ">
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
		    	status:['AUDIT_PASS ','FINANCE_AUDIT_ING','FINANCE_AUDIT_PASS ',''],
		    	availableBalance:'--',//可融额度
		    	creditLine:'',//授信额度
		    	usedBalance:'',//已用额度（单位：元）
		    	financeMethod:'',//融资方式
		    	financeNumber:0,//融资中条数
		    	financeOrderList:[],//融资中列表
		    	accountReceivableList:[],//应收账款列表
		    	page:1,//上次查询应收账款最后一条的单号，第一次传空
		    	limit:30,//每页显示数量
		    	accountIsMore:true,//应收账款是否还有更多
		    	accountNone:false,//是否有应收账款
		    }
	  	},
	  	methods: {
	  		sayAvailableBalance:function(msg){//子组件传过来的可融余额
	  			
	  		},
	  		lookFinanceRecordsIng(type){//点击查看融资中记录
	  			var that = this;
	  			that.$router.push({
	  				path:'/smalMelting/finance/financeRecords',
	  				query: { type: type }
	  			})
	  		},
	  		
	  		lookMore(){//查看更多
	  			this.getAccountReceivableList();
	  		},
	  		init(){
				this.getFinanceCreditLine();
				this.getOrderIndexlist();
				this.getAccountReceivableList();
	  		},
	  		applyFinance(){
	  			var that = this;
	  			// 加载当前商户的融资方式
	  			that.$axios({
	  				url: '/supplier/finance/get_finance_method'
	  			}).then(function(res) {
	  				if (res.data.code === '200') {
	  					that.financeMethod = res.data.data.financeMethod;
	  					if (that.financeMethod.search("ORDER") !== -1 && that.financeMethod.search("CASH") !== -1) {
			  				// 订单融和现金融
			  				that.$router.push({'path':'/smalMelting/finance/choseFinanceMethod'})
			  			} else if (that.financeMethod.search("ORDER") !== -1) {
			  				// 订单融
			  				that.$router.push({'path':'/smalMelting/finance/selectAccount'})
			  			} else if (that.financeMethod.search("CASH") !== -1) {
			  				// 现金融
			  				that.$router.push({'path':'/smalMelting/finance/applyFinance/needless/needlses/needless/CASH'})
			  			} else {
			  				$subError("请配置资方的融资方式");
			  			}
	  				} else {
	  					$subError(res.data.message);
	  				}
	  			})
	  		},
	  		getFinanceCreditLine (){//获取供应商授信额度
	  			var that = this;
	  			that.$store.commit('loadStatus', {'bool': true,'txt': '加载中...'}); 
	  			that.$axios({
					url:'/supplier/finance/credit_line'
				})
				.then(function(res){
	  				that.$store.commit('loadStatus', {'bool': false,'txt': '加载中...'}); 
					if(res.data.code=='200'){
						that.availableBalance = res.data.data.availableBalance;
						that.creditLine = res.data.data.creditLine;
						that.usedBalance = res.data.data.usedBalance;
						that.financeMethod = res.data.data.financeMethod;
					}
				})
	  		},
	  		getOrderIndexlist(){//获取融资记录列表
	  			var that = this;
	  			that.$store.commit('loadStatus', {'bool': true,'txt': '加载中...'}); 
	  			that.$axios({
					url:'/supplier/finance/order_index_list'
				})
				.then(function(res){
	  				that.$store.commit('loadStatus', {'bool': false,'txt': '加载中...'}); 
					if(res.data.code=='200'){
						that.financeNumber = res.data.data.financeNumber;
//						that.financeNumber = 1;
						that.financeOrderList = res.data.data.list;
//						that.financeOrderList = [{'financeNo':'12312321'}];
					}
				})
	  		},
	  		getAccountReceivableList(){//获取应收账款列表
	  			var that = this;
	  			that.$store.commit('loadStatus', {'bool': true,'txt': '加载中...'}); 
	  			if(that.accountIsMore){
		  			that.$axios({
						url:'/supplier/finance/account_receivable_list',
						data:{
							page:that.page,
							limit:that.limit,
							status:'AUDIT_PASS'
						}
					})
					.then(function(res){
		  				that.$store.commit('loadStatus', {'bool': false,'txt': '加载中...'}); 
						if(res.data.code=='200'){
							that.accountReceivableList = that.accountReceivableList.concat(res.data.data.orders);
							if(res.data.data.orders.length){
//								that.lastReceivableNo = that.accountReceivableList[that.accountReceivableList.length-1].receivableNo;
								that.page = that.page+1;
							}
							if(that.accountReceivableList.length>0){
								that.accountNone = true;
							}
							that.accountIsMore = res.data.data.isMore;
						}
					})
	  			}
	  		}
	 	},
	  	watch:{//监听
	  	
	  	},
	    computed: {//计算属性
	    	
	    },
		beforeCreate: function() { //创建前状态
		},
		created: function() { //创建完毕状态
			this.init();
		},
		beforeMount: function() { //挂载前状态
		},
		mounted: function() { //挂载结束状态
			var that = this;
			that.$store.commit('loadStatus', {'bool': false,'txt': '成功...'});
			window.onload = function(){
				/*let h=document.getElementsByTagName("html");
				let cha = parseFloat(h[0].style.fontSize)*1.8; 
				document.getElementById('walld').style.height =  window.screen.height-cha +'px';
				document.getElementById('wuditIng').style.height =  window.screen.height-cha +'px';
				document.getElementById('auditPass').style.height =  window.screen.height-cha +'px';
				document.getElementById('all').style.height =  window.screen.height-cha +'px';*/
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
  	/*头部*/
  	body{
  		overflow: hidden;
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
		display: flex;
		align-items: center;
  	}
  	.fil_bh{
  		font-size: .24rem;
  		line-height: .3rem;
  		height: .3rem;
		display: flex;
		align-items: center;
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
	.fil_centreType{
		display: inline-block;
		width: .5rem;
		height: .5rem;
		line-height: .5rem;
		text-align: center;
		overflow: hidden;
		background-color: #cdcdcd;
		color: #fff;
		border-radius: 50%;
		-webkit-border-radius: 50%;
	}
</style>

<template>
  <div class="bg_sm">
	 	<div>
	 		<div class="detail_top  flex_l_start" v-if="">
	 			<div class="detail_top_img">
	 				<i class="font_100 c_white iconfont" :class="
	 					(financeDetail.status=='FINANCE_AUDIT_ING')?'icon-timefill':
	 					(financeDetail.status=='FINANCE_AUDIT_PASS'||financeDetail.status=='SUCCESS')?'icon-roundcheckfill':
	 					(financeDetail.status=='FINANCE_AUDIT_REFUSE'||financeDetail.status=='FAIL')?'icon-roundclosefill':'icon-timefill'">
	 				</i>
	 			</div>
	 			<div v-if="financeDetail.status=='TRANSFER_CONTRACT'" style="margin-left: .3rem;width: 100%;">
	 				<div class="c_white font_30" style="line-height: .45rem;">
	 					待签署 
	 				</div>
 					<div class="flex_l_between c_white">
 						<span>请及时签署</span>
 						<span  class="signBtn" @click="goSign">去签署</span>
 					</div>   
	 			</div>
	 			<div v-if="financeDetail.status=='FINANCE_AUDIT_ING'||financeDetail.status=='CAPTICAL_CONTRACT'" style="margin-left: .3rem;">
	 				<div class="c_white font_30" style="line-height: .45rem;">
	 					审核中 
	 				</div>
	 				<p class="c_white" style="width: 100%;">
	 					您的应收账款融资已经成功提交  <br />
	 					请耐心等待审核 
	 				</p>
	 			</div>
	 			<div v-if="financeDetail.status=='WAIT_LOAN'" style="margin-left: .3rem;">
	 				<div class="c_white font_30" style="line-height: .45rem;">
	 					待放款  
	 				</div>
	 				<p class="c_white" style="width: 100%;">
	 					你的融资申请已经通过转入保证金即可执行放款操作
	 				</p>
	 			</div>
	 			<div v-if="financeDetail.status=='SUCCESS'" style="margin-left: .3rem;">
	 				<div class="c_white font_30" style="line-height: .45rem;">
	 					融资成功  
	 				</div>
	 				<p class="c_white" style="width: 100%;">
	 					你的融资已经成功，请按约定还款计划进行还款。
	 				</p>
	 			</div>
	 			<div v-if="financeDetail.status=='FAIL'||financeDetail.status=='FINANCE_AUDIT_REFUSE'" style="margin-left: .3rem;">
	 				<div class="c_white font_30" style="line-height: .45rem;">
	 					融资失败  
	 				</div>
	 				<p class="c_white" style="width: 100%;">
	 					您的申请暂不符合融资条件
	 				</p>
	 			</div>
	 		</div>
	 		<!--融资金额：50000元  还款日期：7月15日 (45天)  还款方式：到期还本付息  总利息：2095.89元  保证金 (1%)：500.00元  服务费 (1%)：500.00元  还款总金额：53095.89元-->
 			<div class="ard_table_box">
	 			<table class="ard_table" cellspacing="0" cellpadding="0">
	 				<tbody>
	 					<tr class="ard_table_tr text_c">
	 						<td>融资单号</td>
	 						<td class="">{{financeNo}}</td>
	 					</tr>
	 					<tr class="ard_table_tr text_c">
	 						<td>融资金额</td>
	 						<td class="c_bgblack">{{financeDetail.financeAmt}}元</td>
	 					</tr>
	 					<tr class="ard_table_tr text_c">
	 						<td>融资期限</td>
	 						<td>{{financeDetail.validMonths}}个月</td>
	 					</tr>
	 					<tr class="ard_table_tr text_c">
	 						<td>还款方式</td>
	 						<td class="">{{financeDetail.repaymentMethodText?financeDetail.repaymentMethodText:'--'}}</td>
	 					</tr>
	 					<tr class="ard_table_tr text_c">
	 						<td>年利率</td>
	 						<td class="">{{financeDetail.loanRate?financeDetail.loanRate:'--'}}%</td>
	 					</tr>
	 					<tr class="ard_table_tr text_c">
	 						<td>逾期日利率</td>
	 						<td class="">{{financeDetail.overdueRate?financeDetail.overdueRate:'--'}}%</td>
	 					</tr>
	 					<tr class="ard_table_tr text_c">
	 						<td>总利息</td>
	 						<td class="">{{financeDetail.totalInterest}}<span class="font_18"> 元 </span></td>
	 					</tr>
	 					<!--<tr class="ard_table_tr text_c">
	 						<td>保证金({{financeDetail.marginRate}}%)</td>
	 						<td class="">{{financeDetail.marginAmt}}<span class="font_18"> 元 </span></td>
	 					</tr>-->
	 					<tr class="ard_table_tr text_c">
	 						<td>服务费({{financeDetail.chargeRate}}%)</td>
	 						<td class="">{{financeDetail.chargeAmt}}<span class="font_18"> 元 </span></td>
	 					</tr>
	 					<tr class="ard_table_tr text_c">
	 						<td>计划还款总金额</td>
	 						<td class="">{{financeDetail.totalAmt}}<span class="font_18"> 元 </span></td>
	 					</tr>
	 					<tr class="ard_table_tr text_c">
	 						<td>融资方式</td>
	 						<td class="">{{financeDetail.financeMethodText}}</td>
	 					</tr>
	 				</tbody>
	 			</table>
	 			<div class="ard_table_box" style="padding: .1rem 0 ;border-top: 1px solid #cdcdcd;margin-top: .1rem;">
	 				<div style="line-height: .4rem;">还款计划</div>
		 			<table v-if="financeDetail.backPlanList" class="ard_table ard_table2" cellspacing="0" cellpadding="0" style="margin-top: 0;">
		 				<thead>
		 					<tr style="background-color: #fff; color: #fc9d23;">
		 						<th>序号</th>
		 						<th>还款日期</th>
		 						<th>还款总金额</th>
		 						<th>本金</th>
		 						<th>利息</th>
		 					</tr>
		 				</thead>
		 				<tbody>
		 					<tr v-for="(item,index) in financeDetail.backPlanList">
		 						<td>{{index+1}}</td>
		 						<td>{{item.planDate}}</td>
		 						<td>{{item.totalAmount}}</td>
		 						<td>{{item.amount}}</td>
		 						<td>{{item.interest}}</td>
		 					</tr>
		 				</tbody>
		 			</table>
		 			<div v-else style="text-align: center;line-height: .6rem;">
		 				暂无订单
		 			</div>
		 		</div>
	 			<div style="border-top: 1px solid #cdcdcd;line-height: .5rem;margin-top: .2rem;">
	 				申请时间：{{financeDetail.applyDate}}<br />
	 				放款时间：{{financeDetail.loanDate}}
	 			</div>
	 		<!--	<table class="ard_table" cellspacing="0" cellpadding="0">
	 				<tbody>
	 					<tr v-for="(item,index) in financeDetail.plans" class="ard_table_tr text_c">
	 						<td style="vertical-align: middle;">{{item.backDate}}</td>
	 						<td class="">
	 							<div>{{item.total}}</div>
	 							<div>（含本金{{item.capital}}元 +利息{{item.interest}}）</div>
	 						</td>
	 					</tr>
	 				</tbody>
	 			</table>-->
	 		</div>
	 		<ul class="pro_ul">
	 			<li v-if="financeDetail.electronicContract" class="pro_li" style="margin: .1rem 0;">
	 				<div @click="lookFinanceContract" class="pro_a">
	 					<div class="pro_a_content flex_l_between">
	 						<span>协议:</span>
	 						<span class="c_bgblack font_28">
	 							<span>《应收账款转让申请暨确认书》</span>
	 							<span class="font_22"> 
	 								{{
				 						(status=='VALID')?'已生效':
				 						(status=='INVALID')?'无效':
				 						(status=='AUDIT_ING')?'审核中 ':
				 						(status=='AUDIT_REF')?'':''
				 					}} 
	 							</span>
	 							<i class="c_aaa mui-icon mui-icon-arrowright"></i>
	 						</span>
	 					</div>
	 				</div>
	 			</li>
	 			<li class="pro_li" style="padding-bottom: .2rem;" v-if="financeDetail.financeMethod === 'ORDER'">
	 				<div @click="lookReceivableNo" class="pro_a">
	 					<div class="pro_a_content flex_l_between">
	 						<span>转让的应收账款:</span>
	 						<span class="c_bgblack font_28">
	 							<span>{{financeDetail.receivableNo[0]?financeDetail.receivableNo[0].substring(0,14):''}}...等<span>{{financeDetail.receivableNumber}}</span>笔</span>	
	 							<i class="c_aaa mui-icon mui-icon-arrowright"></i>
	 						</span>
	 					</div>
	 				</div>
	 			</li>
	 		</ul>
	 	</div>
 	</div>
</template>
<script>
	import { $resError,$subError } from '@/utils/muiAlert'
	import { GetQueryString } from '@/utils/common'
	export default {
	  name: 'financeDetail',
	  data () {
		  return {
		  	receivableNo:'',
		  	financeNo:'',//融资单号
		  	status:'',
		  	financeDetail:{
		  		financeNo:"******",
		  		receivableNo:"******",
		  		financeAmt:'00.00',
		  		repaymentMethod:"*****",
		  		status:"",
		  		validDays:0,
		  		totalAmt:'00.00',
		  		totalInterest:'00.00',
		  		receiveAccount:"****",
		  		financeMethod:'',
		  		plans:[
			  		{
			  			backDate:"00-00-00",
			  			capital:'00.00',
			  			interest:'00.00',
			  			total:'00.00'
			  		}
		  		]
		  	}
		  }
	  },
	  methods: { 
	  	lookReceivableNo:function(){
	  		var that = this;
	  		that.$router.push({
					path:`/smalMelting/finance/financeAccountList/${that.financeNo}/${'financeNo'}`
				})
	  	},
	  	lookFinanceContract:function(){
	  		var that = this;
				if(that.financeNo){
					that.$store.commit('loadStatus', {
						'bool': true,
						'txt': '成功...'
					}); //成功...
					that.$axios({
						url:'/supplier/finance/view_finance_contract',
						data:{
							financeNo:that.financeNo
						}
					}).then(function(res){
						that.$store.commit('loadStatus', {
							'bool': false,
							'txt': '成功...'
						}); //成功...
						if(res.data.code == '200'){
							window.location.href =  res.data.data.previewUrl;
						}
					}).catch(function(error){
						that.$store.commit('loadStatus', {
							'bool': false,
							'txt': '成功...'
						}); //成功...
					})
				}else{
					/*window.history.go(-2)*/
				}
	  	},
	  	goSign:function(){
		  		var that = this;
		  		that.$store.commit('loadStatus', {'bool': true,'txt': '提交中...'}); 
		  		let _returnUrl =window.location.href.substring(0,window.location.href.indexOf("#"))+'#/smalMelting/finance/waitingSign?financeNo='+that.financeNo;
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
		  init(){
		  	this.getFinanceDetail();
		  },
		  getFinanceDetail(){//获取融资详情
				var that = this;
				that.$store.commit('loadStatus', {'bool': true,'txt': '加载中...'});
		  	that.$axios({
					url:'/supplier/finance/finance_detail',
					data:{
						financeNo:that.financeNo,
					}
				})
				.then(function(response){
					that.$store.commit('loadStatus', {
						'bool': false,
						'txt': '加载成功...'
					}); //成功...
					if(response.data.code =='200'){
						that.financeDetail = response.data.data;
					}
				})
				.catch(function(error){
					that.$store.commit('loadStatus', {
						'bool': false,
						'txt': '失败...'
					}); //成功...
					mui.toast(`
					<div  class="toast_content" >
					  	<div class="toast_text">连接失败，请检查你的网络！</div>
					</div>`);
				})
		  }
	 	},
	  watch:{//监听
	  	
	  },
	  computed: {//计算属性
	    	
	  },
		beforeCreate: function() { //创建前状态
			document.title = "融资详情";
		},
		created: function() { //创建完毕状态
		},
		beforeMount: function() { //挂载前状态
		},
		mounted: function() { //挂载结束状态
			var that = this;
		  that.financeNo = that.$route.params.id;
			that.$store.commit('loadStatus', {'bool': false,'txt': '成功...'}); 
			if(that.financeNo==null){
				mui.alert('找不到帐款编号', '提示', function() {
							
				});
				return false;
			}
			that.init(); 
			
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
	.signBtn{
		padding: 4px 12px;
		border: 1px solid ;
		border-radius: .05rem;
		-webkit-border-radius: .05rem;
	}
	.detail_top{
		padding: .28rem .2rem;
		background-color: #FC9D23;
	}
	.detail_top_img{
		width: .8rem;
		height: .8rem;
		line-height: .8rem;
		text-align: center;
		border-radius: 50%;
		-webkit-border-radius: 50%;
	}
  	.pf_top{
  		height: 1.68rem;
  		background-color: #fff;
  		padding: .3rem .2rem;
  	}
  	.img_box{
  		width: 1.06rem;
  		height: 1.06rem;
  		border: 1px solid #E6E6E6;
  		background-color: #e5e5e5;
  		border-radius: 50%;
  		-webkit-border-radius: 50%;
  		margin-right: .25rem;
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
  		height: 1rem;
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
  	.ard_circles{
  		position: absolute;
  		transform: translateY(-50%);
  		top: 50%;
  		left: 20%;
  	}
  	.ard_circle{
  		position: relative;
  		height: .85rem;
  		line-height: .85rem;
  		width: .85rem;
  		text-align: center;
  		color: #fff; 
  		background-color: red;
  		border-radius: 50%;
  		margin-right: .35rem;
  		background-color: #fc9d23;
  	}
  	.ard_circle_disable{
  		background-color: #f3cb98;
  	}
  	.ard_small_circle{
  		position: absolute;
  		left: .34rem;
  		top: -.2rem;
  		height: .2rem;
  		overflow: hidden;
  		line-height: .2rem;
  		text-align: center;
  		border-radius: 50%;
  		-webkit-border-radius: 50%;
  		background-color: #fc9d23;
  	}
  	.ard_small_circle_disable{
  		background-color: #f3cb98;
  	}
  	.ard_small_circle i{
  		width: .2rem;
  		font-size: .2rem;
  	}
  	.ard_line{
  		position: absolute;
  		transform: translateY(-50%);
  		top: 50%;
  		width: 80%;
  		height: 2px;
  		background-color: #9a9a9a;
  	}
  	.ard_table_box{
  		padding:.3rem .2rem .1rem;
  	}
  	.ard_table{
  		width: 100%;
  		text-align: center;
  		background-color: #fff;
  	}
  	.ard_table2 {
  		margin-top: .2rem;
  	}
  	.ard_table2 td{
  		border: 1px solid #ccc;
  		
  	}
  	.ard_table th{
  		border: 1px solid #ccc;
  	}
  	.ard_table td,.ard_table th{
  		height: .64rem;
  		line-height: .64rem;
  		margin-top: .1rem;
  	}
  	.ard_table_title{
  		height: .88rem;
  		line-height: .88rem;
  		font-size: .3rem;
  		color: #333;
  	}
  	.ard_table_tr{
  		border-bottom: .05rem solid #F3F3F3;
  	}
  	.ard_table_tr td:nth-of-type(1){
  		background-color: #fc9d23;
  		color: #fff;
  		text-align: center;
  		width: 30%;
  	}
  	.ard_table_box{
  		padding:.1rem .2rem .3rem;
  	}
  	.ard_table{
  		width: 100%;
  		text-align: center;
  		background-color: #fff;
  	}
  	.ard_table2 {
  		margin-top: .2rem;
  	}
  	.ard_table2 td{
  		border: 1px solid #ccc;
  		
  	}
  	.ard_table th{
  		border: 1px solid #ccc;
  	}
  	.ard_table td,.ard_table th{
  		height: .64rem;
  		line-height: .64rem;
  		margin-top: .1rem;
  	}
  	.ard_table_title{
  		height: .88rem;
  		line-height: .88rem;
  		font-size: .3rem;
  		color: #333;
  	}
  	.ard_table_tr{
  		border-bottom: .1rem solid #F3F3F3;
  	}
  	.ard_table_tr td:nth-of-type(1){
  		background-color: #fc9d23;
  		color: #fff;
  		text-align: center;
  		width: 30%;
  	}
		.mui-icon-arrowright:before{
  		line-height: 1rem;
  	}
  	
</style>


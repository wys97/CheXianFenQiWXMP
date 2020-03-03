<template>
  <div class="bg_sm">
	 	<div>
	 		<ul class="pro_ul">
	 			<!--<li class="pro_li">
	 				<router-link to="" class="pro_a">
	 					<div class="pro_a_content flex_l_between">
	 						<span>渠道:</span>
	 						<span class="c_bgblack font_28">{{accountOrderDetail.channelName}}</span>
	 					</div>
	 				</router-link>
	 			</li>-->
	 			<li class="pro_li">
	 				<router-link to="" class="pro_a">
	 					<div class="pro_a_content flex_l_between">
	 						<span>订单日期:</span>
	 						<span style="margin-top: .01rem;">
	 							<span class="c_bgblack font_28" >{{accountOrderDetail.date}}</span>
	 						</span>
	 					</div>
	 				</router-link>
	 			</li>
	 			<li class="pro_li">
	 				<router-link to="" class="pro_a">
	 					<div class="pro_a_content flex_l_between">
	 						<span>订单笔数:</span>
	 						<span class="c_bgblack font_28">{{accountOrderDetail.count}} 笔</span>
	 					</div>
	 				</router-link>
	 			</li>
	 			<li class="pro_li">
	 				<router-link to="" class="pro_a">
	 					<div class="pro_a_content flex_l_between">
	 						<span>订单总额:</span>
	 						<span class="c_bgblack font_28">{{accountOrderDetail.totalAmount?accountOrderDetail.totalAmount:'--'}} 元</span>
	 					</div>
	 				</router-link>
	 			</li>
	 		</ul>
 			<div class="ard_table_box">
	 			<table v-if="accountOrderDetail.details" class="ard_table ard_table2" cellspacing="0" cellpadding="0" style="margin-top: 0;">
	 				<thead>
	 					<tr style="background-color: #fc9d23; color: #fff;">
	 						<th>序号</th>
	 						<th>渠道</th>
	 						<th>订单编号</th>
	 						<th>金额</th>
	 					</tr>
	 				</thead>
	 				<tbody>
	 					<tr v-for="(item,index) in accountOrderDetail.details">
	 						<td>{{index+1}}</td>
	 						<th>{{item.channelName}}</th>
	 						<td>{{item.orderNo}}</td>
	 						<td>{{item.orderAmount}}</td>
	 					</tr>
	 				</tbody>
	 			</table>
	 			<div v-else style="text-align: center;line-height: .6rem;">
	 				暂无订单
	 			</div>
	 		</div>
	 	
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
			  	receivableNo:'',
			  	status:'',
			  	accountOrderDetail:{
			  		
			  	}
		  	}
	  	},
	 	methods: { 
	 		init(){
	 			this.getAccountOrderDetail();
	 		},
	  		getAccountOrderDetail(){
	  			var that = this;
				that.$store.commit('loadStatus', {
					'bool': true,
					'txt': '加载中...'
				}); //成功...
				that.$axios({
					url:'/supplier/finance/receivable_order_detail',
					data:{
						receivableNo:that.receivableNo
					}
				})
				.then(function(response){
					that.$store.commit('loadStatus', {
						'bool': false,
						'txt': '加载成功...'
					}); //成功...
					if(response.data.code =='200'){
						that.accountOrderDetail = response.data.data;
						that.status = response.data.data.status;
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
			document.title = "应收账款详情";
		},
		created: function() { //创建完毕状态
		},
		beforeMount: function() { //挂载前状态
		},
		mounted: function() { //挂载结束状态
			var that = this;
			that.receivableNo = that.$route.params.id;
			/*var url_receivableNo = GetQueryString('id');
			var _status = GetQueryString('status');
			if(url_receivableNo){
				that.receivableNo = url_receivableNo;
				that.status = _status;
			}*/
			that.$store.commit('loadStatus', {
				'bool': false,
				'txt': '成功...'
			}); //成功...
			that.init();
			if(that.receivableNo==null){
				mui.alert('找不到帐款编号', '温馨提示', function() {
							
				});
				return false;
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
  		height: .7rem;
  		line-height: .7rem;
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
  		background-color: #cdcdcd;
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
  		background-color: #cdcdcd;
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


<template>
  	<div id="finance" style="padding-bottom: 1.5rem;">
		<div class="finance_account_box">
			<div class="account_content">
				<ul class="fil_ul">
					<li  class="fil_li" v-for="(item,index) in accountReceivableList" :key="index">
						<router-link :to="'/smalMelting/finance/accountReceivableDetail/'+item.receivableNo" class="fil_a">
							<div class="fil_bh">
								<span style="display: inline-block;">编号：{{item.receivableNo}}</span>
								<!--<span class="fil_status">{{item.statusText}}</span>-->
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
					<!--<div v-if="accountIsMore" @click="lookMore" class="lookMoreBtn">
						<span>加载更多</span>
					</div>-->
					<div v-if="accountIsMore" class="noMore">-没有更多-</div>
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
		    	financeNo:'',//融资单号或多比应收账款号
		    	accountReceivableList:[],//应收账款列表
		    	accountIsMore:true,//应收账款是否还有更多
		    	type:'financeNo',//参数类型
		    }
	  	},
	  	methods: {
	  		lookMore(){//查看更多
	  			this.getAccountReceivableList();
	  		},
	  		init(){
				this.getAccountReceivableList();
	  		},
	  		getAccountReceivableList(){//获取应收账款列表
	  			var that = this;
	  			var type = that.type;
	  			that.$store.commit('loadStatus', {'bool': true,'txt': '加载中...'}); 
	  			if(type==='financeNo'){
		  			if(that.accountIsMore){
			  			that.$axios({
							url:'/supplier/finance/finance_detail_account_list',
							data:{
								financeNo:that.financeNo
							}
						})
						.then(function(res){
			  				that.$store.commit('loadStatus', {'bool': false,'txt': '加载中...'}); 
							if(res.data.code=='200'){
								that.accountReceivableList = res.data.data;
							}
						})
		  			}
	  			}else if(type==='financeAccountList'){
	  				if(that.accountIsMore){
			  			that.$axios({
							url:'/supplier/finance/account_list_receivableNos',
							data:{
								receivableNos:that.financeNo
							}
						})
						.then(function(res){
			  				that.$store.commit('loadStatus', {'bool': false,'txt': '加载中...'}); 
							if(res.data.code=='200'){
								that.accountReceivableList = res.data.data;
							}
						})
		  			}
	  			}
	  		}
	 	},
	  	watch:{//监听
	  	
	  	},
	    computed: {//计算属性
	    	
	    },
		beforeCreate: function() { //创建前状态
			document.title = "转让的应收账款";
		},
		created: function() { //创建完毕状态
		},
		beforeMount: function() { //挂载前状态
		},
		mounted: function() { //挂载结束状态
			var that = this;
			that.$store.commit('loadStatus', {'bool': false,'txt': '成功...'});
			that.financeNo = that.$route.params.id;
			that.type = that.$route.params.type;
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
		margin-top: 0;
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
</style>

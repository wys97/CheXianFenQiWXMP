<template>
	<div class="">
		<div class="mui-content" style="padding-bottom: 1rem;">
			<div class="">
				<form class="mui-input-group" style="background-color: transparent;">
					<div v-for="(item,index) in accountReceivableList" 

						class="mui-input-row mui-checkbox  mui-right" >
						<label for="'checkbox'+index" style="height: 100%;">
							<div  class="fil_a">
								<div class="fil_bh c_666">
									<!--<span class="fil_centreType">
										{{item.centreName.substring(0,1)}}
									</span>-->
									<span style="display: inline-block;">
										{{item.receivableNo}}
									</span>
								</div>
								<div class="flex_l_between">
									<div class="flex_l_start" style="width: 100%;">
										<div class="" style="width: 50%;">
											<div class="fil_je_num fil_bg_font">{{item.financeAmt}}</div>
											<div class="fil_je_sm c_666">可融金额（元）</div>
										</div>
										<div class="" style="width: 50%;">
											<div class="text_c fil_je_num fil_bg_font fil_bg_font_t">{{item.validDays}}</div>
											<div class="text_c fil_je_sm c_666">剩余有效期（天）</div>
										</div>
									</div>
								</div>
							</div>
						</label>
						<input v-model="checkedNames"   :id="'checkbox'+index" name="checkbox1" :value="item.receivableNo" type="checkbox" >
					</div>
					<div v-if="accountIsMore" @click="lookMore" class="lookMoreBtn">
						<span>加载更多</span>
					</div>
					<div v-if="!accountIsMore" class="noMore">-没有更多-</div>
				</form>
			</div>
		</div>
		<div class="select_footer">
			<div class="flex_l_between" style="height: 100%;">
				<div class="left">
					<div class="left_top">
						已选 
						<span class="font_28 mui-badge mui-badge-primary mui-badge-inverted">{{checkedNames.length}}</span>笔，
						总金额
						<span class="font_28 mui-badge mui-badge-primary mui-badge-inverted">{{toalMoney}}</span>元
					</div>
					<!--<div class="left_down c_bdred">最多30笔，最大金额不超过200,000.00元</div>-->
				</div>
				<div class="right">
					<div @click="goApplyFinance" class="submit_btn" :class="(toalMoney!=0&&checkedNames[0])?'':'submit_btn_disable'">去融资</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	import { $resError,$subError } from '@/utils/muiAlert'
	export default {
		name: '',
		data() {
			return {
				centreId:'',//合作企业ID
				toalMoney:0,//总金额
				checkedNames:[],//复选框选择的数组
				checkedsDisabled:false,//是否禁用复选框
		    	accountReceivableList:[],//应收账款列表
		    	page:1,//上次查询应收账款最后一条的单号，第一次传空
		    	limit:50,//每页显示数量
		    	accountIsMore:true,//应收账款是否还有更多
			}
		},
		methods: {
			goApplyFinance(){
				var that =this;
				if(30>=that.checkedNames.length>0&&that.toalMoney!=0){
					let receivableNos = that.checkedNames.join();
					that.$router.push({
						path: `/smalMelting/finance/applyFinance/${receivableNos}/needless/needless/ORDER`
					});
				}
				
				/*that.$router.push({'path':'/smalMelting/finance/applyFinance'});*/
			},
			lookMore(){//查看更多
	  			this.getAccountReceivableList();
	  		},
			getAccountReceivableList(){//获取可融应收账款列表
	  			var that = this;
	  			that.$store.commit('loadStatus', {'bool': true,'txt': '加载中...'}); 
	  			if(that.accountIsMore){
		  			that.$axios({
						url:'/supplier/finance/account_receivable_list',
						data:{
							centreId:that.centreId,
							page:that.page,
							limit:that.limit,
							status:'AUDIT_PASS'
						}
					})
					.then(function(res){
		  				that.$store.commit('loadStatus', {'bool': false,'txt': '加载中...'}); 
						if(res.data.code=='200'){
							that.accountReceivableList = that.accountReceivableList.concat(res.data.data.orders);
							if(res.data.data.orders.length>0){
//								that.lastReceivableNo = that.accountReceivableList[that.accountReceivableList.length-1].receivableNo;
								that.page = that.page+1;
							}
							that.accountIsMore = res.data.data.isMore;
						}
					})
	  			}
	  		},
			toNumber(str){//将金额转为数字
	  			str = str.replace(/[^\d|.]/g,'');//去掉其他字符
	  			str = str.replace(/^\b(0+)/g,"");//去掉前面的0
	  			str = str.replace(/,/g,'');//去掉逗号
	  			str = parseFloat(str);//字符串转为数字
	  			return str;
	  		},
	  		format_number(nStr){// 数字转为千分位金额
	  			nStr += '';  
		        let x = nStr.split('.');  
		        let x1 = x[0];  
		        let x2 = x.length > 1 ? '.' + x[1] : '';  
		        let rgx = /(\d+)(\d{3})/;  
		        while (rgx.test(x1)) {  
		            x1 = x1.replace(rgx, '$1' + ',' + '$2');  
		        }  
		        return x1 + x2; 
	  		},
		},
		watch: { //监听
			checkedNames:function(val,oldVal){
				let that = this;
				let toal = 0;
				for(var i=0;i<this.accountReceivableList.length;i++){
					if(this.checkedNames.indexOf(this.accountReceivableList[i].receivableNo)!=-1){
						let _financeAmt= this.accountReceivableList[i].financeAmt;
						let _num = that.toNumber(_financeAmt);
						toal+=_num;
					}
				}
				toal = toal.toFixed(2);
				this.toalMoney = that.format_number(toal);
				if(val.length>=30||toal>=200000){
					this.checkedsDisabled =true;
				}else{
					this.checkedsDisabled =false;
				}
			}
		},
		computed: { //计算属性

		},
		beforeCreate: function() { //创建前状态
			document.title = "选择融资订单";
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
			that.centreId = that.$route.params.centreId;
			this.getAccountReceivableList();
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
	.mui-input-group .mui-input-row{
		background-color: #fff;
   	 	margin-bottom: .03rem;
	}
	.mui-input-group .mui-input-row:after{
		height: 0;
	}
	.mui-input-row label{
		padding: .1rem .15rem;
		padding-right: 15%;
	}
	.mui-checkbox input[type=checkbox], .mui-radio input[type=radio]{
		position: absolute;
	    top: 42%;
	    transform: translateY(-50%);
	    right: .5rem;
	    display: inline-block;
	    width: .28rem;
	    height: .28rem;
	    border: 0;
	    outline: 0!important;
	    background-color: transparent;
	    -webkit-appearance: none;
	}
	.mui-checkbox input[type=checkbox]:before, .mui-radio input[type=radio]:before{
		font-family: Muiicons;
	    font-size: .5rem;
	    font-weight: 400;
	    line-height: 1;
	    text-decoration: none;
	    border-radius: 0;
	    background: 0 0;
	    -webkit-font-smoothing: antialiased;
	}
	.mui-checkbox input[type=checkbox]:checked:before, .mui-radio input[type=radio]:checked:before{
		color: #fc9d23;
	}
	.fil_ul{
		width: 100%;
		font-size: .22rem;
		color: #9a9a9a;
		border-bottom:1px solid #e9e9e9;
	}
	.fil_li{
		width: 100%;
	}
	.fil_a{
		display: inline-block;
		width: 100%;
		min-height: 1rem;
		background-color: #fff;
		padding: 0 .15rem;
		font-size: .22rem;
	}
  	.fil_bh{
  		font-size: .24rem;
  		line-height: .3rem;
  		height: .3rem;
		display: flex;
		align-items: center;
		padding: .2rem 0;
  	}
	.fil_status{
		display: inline-block;
		height: .4rem;
		line-height: .4rem;
		padding: 0 .1rem;
		color: #fff;
		background-color: #fc9d23;
		border-radius: .07rem;
		-webkit-border-radius: .07rem;
	}
	.fil_je_num{
		height: .8rem;
		line-height: .8rem;
	}
	.fil_je_sm{
	}
	.fil_Cstatus{
		display: inline-block;
		height: .5rem;
		line-height: .5rem;
		text-align: center;
		width: 1.2rem;
		border: 1px solid #fc9d23;
		color: #fc9d23;
		border-radius: .07rem;
		-webkit-border-radius: .07rem;
		
	}
	.fil_bg_font{
		font-size: .4rem;
	}
	.fil_bg_font_t{
		color: #333;
	}
	.select_footer{
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 1rem;
		line-height: 1rem;
		background-color: #fff;
		box-sizing: content-box;
		-webkit-box-shadow: 0px -1px 2px #d5d5d5;
		box-shadow:  0px -1px 2px #d5d5d5;
	}
	.select_footer .left{
		padding-top: .14rem;
		font-size: .2rem;
		padding-left: .3rem;
		line-height: .4rem;
	}
	.select_footer .left_top{
		font-size: .24rem;
		height: 100%;
		line-height: .84rem;
	}
	.select_footer .right{
		width: 30%;
		height: 100%;
	}
	.submit_btn{
		display: inline-block;
		width: 100%;
		height: 100%;
		text-align: center;
		font-size: .26rem;
		background-color: #fc9d23;
		color: #fff;
	}
	.submit_btn_disable{
		background-color: #cdcdcd;
	}
  	.noMore{
  		line-height: .7rem;
  		text-align: center;
  		color: #999;
  	}
  	.lookMoreBtn{
  		text-align: center;
  		line-height: .7rem;
  		color: #999;
  	}
  	.lookMoreBtn span{
  		padding: .1rem .6rem;
  		border: 1px solid #e0e0e0;
  		background-color: #f6f3f3;
  		border-radius: .1rem;
  	}
  	.mui-input-group:after{
  		background-color: transparent;
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
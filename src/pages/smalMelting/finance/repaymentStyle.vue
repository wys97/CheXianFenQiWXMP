<template>
  <div class="mui-content">
	  <form class="mui-input-group" style="background-color: transparent;">
	  	<div v-for="item in repayWayList" style="margin-bottom: .2rem;">
				<div class="mui-input-row mui-checkbox  mui-right" >
					<label for="'checkbox1'" style="height: 100%;">
						<div  class="fil_a">
							<div class="fil_je_num fil_bg_font" style="color: #333;">{{item.repayWayNameText}}</div>
							<div class="fil_je_sm c_666">
								<span>年化{{item.yearRate}}%，共{{item.totalAmt}}</span>
							</div>
						</div>
					</label>
					<input v-model="checkedNames" @change="selectChange(item.repayWayName,item.repayWayNameText)" id="checkbox1" name="checkbox1" :value="item.repayWayName" type="checkbox" >
				</div>
				<ul class="mui-table-view">
					<!-- :class="checkedNames[0]===item.repayWayName?'mui-active':''"-->
					<li class="mui-table-view-cell mui-collapse">
						<a class="mui-navigate-right" href="#">还款计划</a>
						<div class="mui-collapse-content">
							<div class="son_item" v-for="son_item in item.repayPlan">
								<div class="flex_l_start font_20">
									<div>{{son_item.repayDate}}</div>
									<div class="black_c"></div>
									<div>
										<div>{{son_item.amount}}</div>
										<div  class="c_666">本金{{son_item.basicAmount}} + 利息 {{son_item.interest}}</div>
									</div>
								</div>
							</div>
						</div>
					</li>
				</ul>
			</div>
		</form>
  </div>
</template>
<script>
	import { $resError,$subError } from '@/utils/muiAlert'
	export default {
	  name: '',
	  data () {
		  return {
//		  	financeAmt:'',
//		  	financeMonths:'',
//		  	repaymentMethod:'',
		  	repayWayList:'',//还款方式列表
		  	checkedNames:[]
		  }
	  },
	  props:{
	  	financeAmt:{
	  		default:''
	  	},
	  	financeMonths:{
	  		default:''
	  	},
	  	repaymentMethod:{
	  		default:''
	  	}
	  },
	  watch:{//监听
	  	repaymentMethod(val){
	  		var that = this;
				that.checkedNames = []
				that.checkedNames.push(that.repaymentMethod);
				that.$store.commit('loadStatus', {'bool': false,'txt': '成功...'}); //成功...
				that.init();
	  	},
	  	checkedNames(val,oldVal){
	  		if(val.length===0){
	  			val = oldVal
	  			this.checkedNames = val
	  		}else if(val.length>=2){
	  			val = oldVal
	  			this.checkedNames = val
	  		}
	  	},
        financeAmt(val, oldVal){
	  	  if(val !== oldVal){
	  	    this.getRepayWayList();
		  }
		},
        financeMonths(val, oldVal){
          if(val !== oldVal){
            this.getRepayWayList();
          }
        }
	  },
	  computed: {//计算属性
	    	
	  },
		beforeCreate: function() { //创建前状态
			document.title = "还款方式";
		},
		created: function() { //创建完毕状态
		},
		beforeMount: function() { //挂载前状态
		},
		mounted: function() { //挂载结束状态
			this.init();
		},
	  methods: { 
	  	init(){
	  		this.getRepayWayList();
	  	},
	  	getRepayWayList(){//获取还款方式列表
	  		let that = this;
	  		that.$axios({
	  			url:'/supplier/finance/repay_way_list',
	  			data:{
	  				financeAmt: parseFloat(that.toNumber(that.financeAmt)),
	  				financeMonths:that.financeMonths
	  			}
	  		}).then(function(res){
						if(res.data.code==='200'){
							that.repayWayList = res.data.data
						}
	  		}).catch(function(){
	  			
	  		})
	  	},
	  	toNumber(str){//将千分位金额转为数字
  			str = str.replace(/[^\d|.]/g,'');//去掉其他字符
  			str = str.replace(/^\b(0+)/g,"");//去掉前面的0
  			str = str.replace(/,/g,'');//去掉逗号
  			return str;
  		},
	  	selectChange(repayWayName,repayWayNameText){
	  		let that = this;
	  		that.$emit('repayWayName',repayWayName)
	  		that.$emit('repayWayNameText',repayWayNameText)
//	  		if(that.$route.params.repaymentMethod===repayWayName){
//	  			return false
//	  		}else{
//	  			that.$router.replace({
//						path: `/smalMelting/finance/applyFinance/${that.receivableNos}/${repayWayName}/${repayWayNameText}`
//					});
//	  		}
	  		mui('#pay-schedule').popover('toggle');
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
  .mui-checkbox label{
  	padding-right: 0;
  }
  .mui-input-row label{
  	padding: 0;
  }
  .mui-input-group .mui-input-row:after{
  	height: 0;
  }
  .mui-checkbox input[type=checkbox], .mui-radio input[type=radio]{
  	top: .5rem;
  }
  .mui-content>.mui-card:first-child{
  	margin-top: 0px;
  }
  .mui-table-view-cell.mui-active{
  	background-color: #fff0de;
  }
  .mui-table-view-cell{
  	padding: .11rem .15rem;
  }
  .mui-table-view-cell>a:not(.mui-btn){
  	margin: 0;
  	padding: .06rem 0;
  }
  .fil_a{
  	min-height: .15rem;
  	margin-bottom: 0;
  }
  .black_c{
  	width: .15rem;
  	height: .15rem;
  	margin: 0.06rem 0.2rem;
  	border-radius: 50%;
  	-webkit-border-radius: 50%;
  	background-color: #fc9d23;
  }
  .son_item{
  	margin: .2rem 0;
  	line-height: .3rem;
  }
  .mui-popover .mui-table-view{
  	max-height: none;
  }
</style>

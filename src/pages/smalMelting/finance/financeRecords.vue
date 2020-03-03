<template>
  	<div id="finance" class="mui-control-content mui-active">
	 	<div class="top_bar">
			<div id="segmentedControl" class="mui-segmented-control">
				<a class="mui-control-item " :class="type=='all'?'mui-active':''" href="#all">
					<span class="x_line">全部</span>
				</a>   
				<a class="mui-control-item" :class="type=='ing'?'mui-active':''" href="#wuditIng">
					<span class="x_line">融资中</span>
				</a>
				<a class="mui-control-item" href="#auditPass">
					<span class="x_line">已融资</span>
				</a>
			</div>
		</div>
		<div class="rz_top_p">
			<div id="all" class="mui-control-content" :class="type=='all'?'mui-active':''" style="position: relative;">
				<finance-list :finance-status="status[0]"></finance-list>
			</div>
			<div id="wuditIng" class="mui-control-content" :class="type=='ing'?'mui-active':''" style="position: relative;">
				<finance-list :finance-status="status[1]"></finance-list>
			</div>
			<div id="auditPass" class="mui-control-content" style="position: relative;">
				<finance-list :finance-status="status[2]"></finance-list>
			</div>
		</div>
 	</div>
</template>
<script>
	import { $resError,$subError } from '@/utils/muiAlert'
	import finnanceList from '../components/financeList'
	export default {
		components:{
			'finance-list':finnanceList
		},
	  	name: '',
	  	data () {
		    return {
		    	type:'',
		    	status:['','FINANCE_AUDIT_ING','SUCCESS'],
		    	availableBalance:'--',//可融额度
		    }
	  	},
	  	methods: {
	  		sayAvailableBalance:function(msg){//子组件传过来的可融余额
	  			
	  		}
	 	},
	  	watch:{//监听
	  	
	  	},
	    computed: {//计算属性
	    	
	    },
		beforeCreate: function() { //创建前状态
			document.title = "融资记录";
		},
		created: function() { //创建完毕状态
		},
		beforeMount: function() { //挂载前状态
		},
		mounted: function() { //挂载结束状态
			var that = this;
			if(that.$route.query.type){
				that.type = that.$route.query.type;
			}
			that.$store.commit('loadStatus', {
				'bool': false,
				'txt': '成功...'
			}); //成功...
			that.$axios({
				url:'/supplier/finance/credit_line'
			})
			.then(function(res){
				if(res.data.code=='200'){
					that.availableBalance = res.data.data.availableBalance;
				}
			})
			window.onload = function(){
				let h=document.getElementsByTagName("html");
//				let cha = parseFloat(h[0].style.fontSize)*(1.8+.75);
				let cha = 0;
				document.getElementById('wuditIng').style.height =  window.screen.height-cha +'px';
				document.getElementById('auditPass').style.height =  window.screen.height-cha +'px';
				document.getElementById('all').style.height =  window.screen.height-cha +'px';
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
	.top_bar{
		height: .75rem;	
		position: fixed;
		z-index: 2223;
		background-color: #f3f3f3;
	}
	.rz_top_p{
		position: relative;
		padding-top: .75rem;
	}
	.top_bar_sm{
		height: .85rem;
		line-height: .85rem;
		font-size: .27rem;
		padding: 0 .15rem;
		background-color: #fc9d23;
		color: #fff;
		margin-bottom: .2rem;
	}
	.mui-segmented-control{
		border:none;
		background-color: #fff6ef;
	}
	.mui-segmented-control .mui-control-item{
		font-size: .27rem;
		height: .75rem;
		line-height: .75rem;
		color: #9a9a9a;
		border-left: 1px solid transparent;
	}
	.mui-segmented-control .mui-control-item.mui-active{
		background-color: transparent;
		color: #fc9d23;
	}
	.mui-segmented-control .mui-control-item.mui-active .x_line{
		padding: .15rem 0;
		border-bottom: 2px solid #fc9d23;
	}
</style>

<template>
	<div class="">
		<div class="tabItem">
            <slot></slot>
        </div>
        <v-scroll  :on-refresh="onRefresh"  :on-infinite="onInfinite" :dataList="scrollData">
			<ul class="fil_ul records_content">
				<!--<div style="position: absolute;top: 1.5rem;z-index: -1;text-align: center;width: 100%; font-size: .3rem;">
					—— 暂无更多数据 ——
				</div>-->
				<li class="fil_li" v-for="(item,index) in listdata">
					<router-link  :to="'/smalMelting/finance/financeDetail/'+item.financeNo"  class="fil_a">
						<!--<div class="fil_bh">
							<span style="display: inline-block;">融资单号： {{(item.financeNo!=null)?item.financeNo:'--'}}</span>
							<span class="fil_status">{{item.statusText}}</span>
						</div>
						<div class="flex_l_between">
							<div class="flex_l_start" style="width: 80%;">
								<div class="" style="width: 50%;">
									<div class="fil_je_num fil_bg_font">{{item.financeAmt}}</div>
									<div class="fil_je_sm">可融金额（元）</div>
								</div>
								<div class="" style="width: 50%;">
									<div class="text_c fil_je_num fil_bg_font fil_bg_font_t">{{item.expireDate}}</div>
									<div class="text_c fil_je_sm">还款日期</div>
								</div>
							</div>
							<div class="">
								<div class="fil_je_sm_icon">
									<i class="mui-icon mui-icon-arrowright"></i>
								</div>
							</div>
						</div>-->
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
		</v-scroll>
	</div>
</template>

<script>
	import { $resError,$subError } from '@/utils/muiAlert'
	import scroll from '../../../components/pullRefresh'
	export default {
		components: {
			'v-scroll': scroll
		},
		name: 'Index2',
		data() {
			return {
				isLoaded:false,
				counter: 1, //当前页
				num: 20, // 一页显示多少条
				pageStart: 0, // 开始页数
				pageEnd: 0, // 结束页数
				listdata: [], // 下拉更新数据存放数组
				downdata: [], // 上拉更多的数据存放数组
				scrollData:{
					noFlag: false //暂无更多数据显示
				},
				isMore:true,
				lastFinanaceNo:null,
		    	data:{},
		    	availableBalance:'--',//可融资额度
			}
		},
		watch:{
			availableBalance:function(val,oldVal){
				this.$emit('child-say','');
			} 
		},
		methods:{
			clickA:function(status,financeNo){
				var that = this;
				
				if(status == 'INVALID'||status == 'OVERDUE'||status == 'FINANCE_AUDIT_REFUSE'){//未达标，已过期，融资失败
					that.$router.push({
						path:'/smalMelting/finance/accountReceivableDetail',
						query:{id:financeNo,status:status}
					})
				}
				if(status == 'AUDIT_PASS'){//可融资
					that.$router.push({
						path:'/smalMelting/finance/applyFinance',
						query:{id:financeNo,status:status}
					})
				}
				if(status == 'FINANCE_AUDIT_ING'||status == 'FINANCE_AUDIT_PASS'){//融资中，已融资
					that.$router.push({
						path:'/smalMelting/finance/financeDetail',
						query:{id:financeNo,status:status}
					})
				}
			},
			getList:function($el) {
				var that = this;
				that.$store.commit('loadStatus', {
					'bool': true,
					'txt': '数据加载中...'
				}); //加载提示...
				if(that.isMore){
					that.$axios({
						url:'/supplier/finance/order_list',
						data:{
							lastFinanaceNo:that.lastFinanaceNo,
				    		status:that.financeStatus,
				    		limit:50
						}
					})
					.then(function(response){
						that.$store.commit('loadStatus', {
							'bool': false,
							'txt': '成功...'
						}); //成功...
						if(response.data.code ==="200"){
							that.isMore = response.data.data.isMore;
							if(that.listdata.length!=0){
								that.listdata=that.listdata.concat(response.data.data.data);
							}else{
								that.listdata= response.data.data.data;
							}
							if(response.data.data.data.length!=0){
								that.lastFinanaceNo = response.data.data.data[response.data.data.data.length-1].financeNo
							}
							if($el){
								if(response.data.data.isMore==false){
									let more = $el.querySelector('.load-more')
									more.style.display = 'none'; //隐藏加载条
					                //走完数据调用方法
					                that.scrollData.noFlag = true;
								}else{
									let more = $el.querySelector('.load-more')
									more.style.display = 'none'; //隐藏加载条
								}
							}
							
							that.$store.commit('loadStatus', {
								'bool': false,
								'txt': '数据加载中...'
							}); //加载提示...
						}
					})
					.catch(function(error){
						that.$store.commit('loadStatus', {
							'bool': false,
							'txt': '失败...'
						}); //成功...
					})
				}else{
					that.$store.commit('loadStatus', {
						'bool': false,
						'txt': '成功...'
					}); //成功...
					let more = $el.querySelector('.load-more')
					more.style.display = 'none'; //隐藏加载条
	                //走完数据调用方法
	                that.scrollData.noFlag = true;
				}
				
			},
			onRefresh(done) {//下拉刷新
				done(); // call done
			},
			onInfinite(done) {//上拉加载数据
				this.getList(this.$el);
				done();
			}
		},
		props:{
			financeStatus:{
				type:String,
				default:''
			}
		},
		beforeCreate: function() { //创建前状态
		},
		created: function() { //创建完毕状态
		},
		beforeMount: function() { //挂载前状态
		},
		mounted: function() { //挂载结束状态
			var that = this;
			that.getList(this.$el);//初始化数据
			that.$store.commit('loadStatus', {
				'bool': false,
				'txt': '成功...'
			}); //成功...
			
			let h=document.getElementsByTagName("html");
			let cha = 0;
//			let cha = parseFloat(h[0].style.fontSize)*(1.8+.75); 
			document.getElementById('wuditIng').style.height =  window.screen.height-cha +'px';
			document.getElementById('auditPass').style.height =  window.screen.height-cha +'px';
			document.getElementById('all').style.height =  window.screen.height-cha +'px';
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
		min-height: 1.5rem;
		background-color: #fff;
		border-top:1px solid #e9e9e9;
		padding: .15rem .15rem;
	}
	.fil_bh{
		height: .3rem;
		line-height: .3rem;
	}
	.records_content .fil_bh{
  		font-size: .24rem;
  		line-height: .4rem;
  		height: .4rem;
		display: flex;
		align-items: center;
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
		height: 1rem;
		line-height: 1rem;
	}
	.fil_je_sm_icon{
		line-height: 500%;
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
		color: #e2493a;
	}
	.fil_bg_font_t{
		color: #333;
	}
</style>
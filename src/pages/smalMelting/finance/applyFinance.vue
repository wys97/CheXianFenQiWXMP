<template>
	<div class="bg_sm" id="bg-sm">
		<div>
			<ul class="pro_ul">
				<li class="pro_li" style="margin-bottom: .2rem;" v-if="financeMethod === 'ORDER'">
					<div @click="lookReceivableNo" class="pro_a">
						<div class="pro_a_content flex_l_between">
							<span>转让的应收账款:</span>
							<span>
	 							<span class="font_28 c_bgblack">{{receivableNos.substring(0,16)}}...等{{accountNum}}笔</span>
							<i class="mui-icon mui-icon-arrowright"></i>
							</span>
						</div>
					</div>
				</li>
				<li class="pro_li">
					<router-link to="" class="pro_a" style="position: relative;height: 98%;">
						<div class="pro_a_content flex_l_between">
							<span>融资金额(元):</span>
							<span>
	 							<span class="font_32 c_bgblack">
	 								<input class="pro_input font_32" @input="maxInput" @blur="lostBlur" v-model="financeAmt" type="text" name="" id=""/>
	 							</span>
							</span>
						</div>
					</router-link>
				</li>
				<li class="pro_li">
					<router-link to="" class="pro_a" style="position: relative;height: 98%;">
						<select class="select" v-model="financeMonths" name="time">
							<option value=''>请选择</option>
							<option :value='item.timeLimit' v-for="(item,index) in timeList">
								{{item.timeLimit}}月
							</option>
						</select>
						<div class="pro_a_content flex_l_between">
							<span>融资期限:</span>
							<div class="flex_l_end">
								<span class="font_28 c_bgblack">
	 								<span style="padding-right: .2rem;">
	 									{{financeMonths?financeMonths:'请选择'}}
	 									<span>{{financeMonths?'月':''}}</span>
	 								</span>
								</span>
								<div>
									<i class="mui-icon mui-icon-arrowright"></i>
								</div>
							</div>
						</div>
					</router-link>
				</li>
				<li class="pro_li">
					<!--<div  @click="selectRepaymentStyle" class="pro_a">-->
					<a :href="financeMonths?'#pay-schedule':'javacript:void(0);'" class="pro_a">
						<div class="pro_a_content flex_l_between">
							<span>还款方式:</span>
							<div class="flex_l_end">
								<span class="font_28 c_bgblack">
	 								<span style="padding-right: .2rem;">
	 									<span class="c_bgblack font_w font_24">{{repaymentMethodText?repaymentMethodText:financeMonths?'请选择':'请先选择融资期限'}}</span>
								</span>
								</span>
								<div>
									<i class="mui-icon mui-icon-arrowright"></i>
								</div>
							</div>
						</div>
					</a>
					<!--</div>-->
				</li>
				<li class="pro_li">
					<div class="pro_a">
						<div class="pro_a_content flex_l_between">
							<span>总利息(年化{{yearRate}}%):</span>
							<div class="flex_l_end">
								<span class="font_28 c_bgblack">
	 								<span style="padding-right: .2rem;">
	 									<span class="c_bgblack font_28">{{totalInterest}}元</span>
								</span>
								</span>
							</div>
						</div>
					</div>
				</li>
<!--				<li class="pro_li" style="margin-top: .15rem;">-->
<!--					<router-link to="" class="pro_a">-->
<!--						<div class="pro_a_content flex_l_between">-->
<!--							<span>保证金（{{marginRate}}%）:</span>-->
<!--							<span style="padding-right: .2rem;">-->
<!--	 							<span  class="font_28 c_bgblack">-->
<!--	 								<span>{{marginAmt}}元</span>-->
<!--							&lt;!&ndash;<i class="mui-icon mui-icon-info-filled @click="chargeAmtAlert""></i>&ndash;&gt;-->
<!--							</span>-->
<!--							</span>-->
<!--						</div>-->
<!--					</router-link>-->
<!--				</li>-->
				<li class="pro_li" style="margin-top: .15rem;">
					<router-link to="" class="pro_a">
						<div class="pro_a_content flex_l_between">
							<span>服务费（{{chargeRate}}%）:</span>
							<span style="padding-right: .2rem;">
	 							<span  class="font_28 c_bgblack">
	 								<span>{{chargeAmt}}元</span>
							</span>
							</span>
						</div>
					</router-link>
				</li>
				<li class="pro_li">
					<router-link to="" class="pro_a">
						<div class="pro_a_content flex_l_between">
							<span>还款总金额:</span>
							<span style="padding-right: .2rem;">
	 							<span class="font_28 c_bgblack">
	 								{{totalAmt}}元
	 							</span>
							</span>
						</div>
					</router-link>
				</li>
				<div style="padding-left: .2rem; line-height: .7rem;">
					<i class="mui-icon mui-icon-info-filled c_main"></i> 
					注：融资申请审批成功后，卖方需提前支付服务费，资方再放款。
				</div>
			</ul>

			<div class="gray_btn " :class="{black_login_btn:isSuccess}" @click="submit">确认融资</div>
		</div>
		<!--还款方式-->
		<div id="pay-schedule" class="mui-popover mui-popover-action mui-popover-bottom " style="overflow-y: auto;max-height: 100%;">
			<div class="bgc_fuz popover_top">
				还款计划
				<a href="#pay-schedule" class="qx_btn">
					<i class="mui-icon mui-icon-close"></i>
				</a>
			</div>
			<div class="popover_content" style="padding-bottom:2rem ;" v-if="financeAmt&&financeMonths">
				<repayment-style @repayWayName="GetChilderRepayWayName" @repayWayNameText="GetChilderRepayWayNameText" :financeAmt="financeAmt" :financeMonths="financeMonths" :repaymentMethod="repaymentMethod"></repayment-style>
			</div>
		</div>
	</div>
</template>
<script>
	import { $resError, $subError } from '@/utils/muiAlert'
	import { GetQueryString } from '@/utils/common'
	import RepaymentStyle from './repaymentStyle'
	export default {
		name: '',
		components: {
			'repayment-style': RepaymentStyle
		},
		data() {
			return {
				financeEditData: '',
				isSuccess: false, //判断提交按钮颜色
				checkedNames: [],
				ischeckedNames: false, //是否阅读协议
				receivableNos: '', //应收账款编号
				financeMethod: '', // 融资方式
				financeAmt: null, //融资金额
				maxFinanceAmt: 0, //最大融资金额
				maxAmt: 200000, //最大限制金额
				financeDays: '-- ', //融资期限（单位：天）
				expireDate: '0000-00-00', //过期日期
				financeMonths: '', //  融资期限
				repaymentMethod: '', //还款方式
				repaymentMethodText: '', //还款方式文本
				yearRate: '', //日利率
				totalInterest: '', //总利息
				receiveAccount: '--', //收款账号
				chargeRate: '', //服务费利率
				chargeAmt: '', //服务金额
				totalAmt: '', //还款总额
				marginRate: '', //保证金利率
				marginAmt: '', //保证金费用

				timeList: [], //下拉的时间列表
				isChecked: false, //还款方式复选
				accountList: [], //应收账款列表
				accountNum: 0, //应收账款数
			}
		},
		computed: {
			// 计算属性的 getter
		},
		watch: { //监听
			financeMonths: function(val, oldVal) { //下拉的选中的融资期限时间
				var that = this;
				that.repaymentMethod = '';//还款方式
				that.repaymentMethodText = '';//还款方式文本
				that.totalInterest = '';//总利息
              	that.yearRate = ''; //年化
				that.totalAmt = '';//还款总额
				this.inputFunc();//判断提交按钮颜色
//				that.referInterest();//查询利息
			},
			repaymentMethod: function(val) {//还款方式该表
				this.repaymentMethod = val
				this.referInterest(); //查询利息
				this.inputFunc();//判断提交按钮颜色
			},
			accountList: function(val, oldVal) {
				this.accountNum = val.length;
			},
			financeAmt: function() {
				this.financeMonths = '';
			}
		},
		methods: {
			GetChilderRepayWayName(val) {
				this.repaymentMethod = val;
			},
			GetChilderRepayWayNameText(val) {
				this.repaymentMethodText = val
			},
			/*clickA:function(){
				var that = this;
				that.$router.push({
					path:'/smalMelting/finance/accountReceivableDetail',
					query:{id:that.receivableNos}
				})
			},*/
			lookReceivableNo() { //查看融资单对应的应收账款单
				var that = this;
				that.$router.push({
					path: `/smalMelting/finance/financeAccountList/${that.receivableNos}/${'financeAccountList'}`
				})
			},
			selectRepaymentStyle() { //选择还款方式
				var that = this;
				that.$router.push({
					path: `/smalMelting/finance/repaymentStyle/${that.receivableNos}/${that.financeAmt}/${that.financeMonths}/${that.repaymentMethod}`
				})
			},
			repayMethodAlert() {
				mui.alert('', `
				<div style="text-align: left;font-size:.27rem;line-height:.38rem;">
					<p>1、到期一次性还本金和利息。</p>
					<p>2、逾期罚息标准等见合同详情。</p>
					<p>3、 总利息以实际放款日为准，起息日于放款日算起。</p>
				</div>
				`, function() {

				});
			}, //还款方式alert警告
			chargeAmtAlert() {
				mui.alert('', `
				<div style="font-size:.27rem;line-height:.38rem;">
					<p>服务费需到款日+1天偿还。</p>
				</div>
				`, function() {

				});
			}, //服务费alert警告
			lookFinanceContract() {
				var that = this;
				if(that.receivableNos) {
					that.$store.commit('loadStatus', {
						'bool': true,
						'txt': '成功...'
					}); //成功...
					that.$axios({
						url: '/supplier/finance/view_finance_contract',
						data: {
							receivableNos: that.receivableNos
						}
					}).then(function(res) {
						that.$store.commit('loadStatus', {
							'bool': false,
							'txt': '成功...'
						}); //成功...
					}).catch(function(error) {
						that.$store.commit('loadStatus', {
							'bool': false,
							'txt': '成功...'
						}); //成功...
					})
				} else {
					/*window.history.go(-2)*/
				}
			},
			referInterest() { //查询利息
				var that = this;
				if(that.financeAmt == 0 || that.financeAmt == null) {
					return
				}
				if(!that.financeMonths||!that.repaymentMethod){
					return
				}
				that.$store.commit('loadStatus', {
					'bool': true,
					'txt': '计算中...'
				}); //成功...
				that.$axios({
						url: '/supplier/finance/calculate_interest',
						data: {
							financeAmt: parseFloat(that.toNumber(that.financeAmt)),
							receivableNos: that.receivableNos,
							repaymentMethod: that.repaymentMethod,
							financeMonths: that.financeMonths,
							financeMethod: that.financeMethod,
						},
					})
					.then(function(response) {
						that.$store.commit('loadStatus', {
							'bool': false,
							'txt': '加载完成...'
						}); //成功...
						if(response.data.code == '200') {
							that.totalAmt = response.data.data.totalAmt;
							that.chargeAmt = response.data.data.chargeAmt;
							that.totalInterest = response.data.data.totalInterest;
                          	that.yearRate = response.data.data.yearRate; //年化
							that.marginAmt = response.data.data.marginAmt;
						} else {
							that.isSuccess = false;
						}
					})
					.catch(function() {
						that.$store.commit('loadStatus', {
							'bool': false,
							'txt': '加载失败...'
						}); //失败...
						mui.toast(`
					<div  class="toast_content" >
					  	<div class="toast_text">连接失败，请检查你的网络！</div>
					</div>`);
					})
			},
			seletPayStyle() { //选择还款方式
				var that = this;
				that.isChecked = !that.isChecked;
				if(that.isChecked) {
					mui.toast(`
					<div  class="toast_content" >
					  	<div class="toast_text">选择成功!</div>
					</div>`);
				}
				that.referInterest(); //查询利息
			},
			getTimeLimitList() { //获取融资期限列表
				let that = this;
				that.$axios({
						url: '/supplier/finance/time_limit_list'
					})
					.then(function(response) {
						if(response.data.code == '200') {
							that.timeList = response.data.data
						}
					})
					.catch(function(error) {})
			},
			toNumber(str) { //将千分位金额转为数字
				str = str.replace(/[^\d|.]/g, ''); //去掉其他字符
				str = str.replace(/^\b(0+)/g, ""); //去掉前面的0
				str = str.replace(/,/g, ''); //去掉逗号
				//	  			str = parseFloat(str);//字符串转为数字
				return str;
			},
			format_number(nStr) { // 数字转为千分位金额
				nStr += '';
				let x = nStr.split('.');
				let x1 = x[0];
				let x2 = x.length > 1 ? '.' + x[1] : '';
				let rgx = /(\d+)(\d{3})/;
				while(rgx.test(x1)) {
					x1 = x1.replace(rgx, '$1' + ',' + '$2');
				}
				return x1 + x2;
			},
			maxInput() { //金额输入
				let that = this;
				if(that.financeAmt != '' && that.financeAmt != NaN) {
					// let _max_num = parseFloat(that.toNumber(that.maxFinanceAmt));
					let _financeAmt = parseFloat(that.toNumber(that.financeAmt));
					// if(_financeAmt > _max_num) {
					// 	mui.alert('不能超过最大额度' + _max_num, '温馨提示', function() {
                    //
					// 	});
					// 	_financeAmt = that.maxFinanceAmt;
					// }
					that.financeAmt = that.format_number(_financeAmt);
				} else {
					that.financeAmt = 0;
				}

			},
			lostBlur() {
				var that = this;
				if(that.financeMonths&&that.repaymentMethod){//融资期限，还款方式有值才调利息计算
					that.referInterest(); //查询利息
				}

			},
			inputFunc() {
				//判断输入内容是否都为空
				if(this.financeAmt&&this.repaymentMethod&&this.financeMonths) {
					this.isSuccess = true;
				} else {
					this.isSuccess = false;
				}
			},
			onClickHander() {
				if(/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
					//移动端
					if(this.checkedNames.length != 0) {
						this.isSuccess = true;
					} else {
						this.isSuccess = false;
					}
				} else {
					//pc端
					if(this.checkedNames.length == 0) {
						this.isSuccess = true;
					} else {
						this.isSuccess = false;
					}
				}
			},
			submit() {
				var that = this;
				/*if(!that.isChecked){
	 				mui.alert('请选择还款方式', '温馨提示', function() {
						document.getElementById('pay-method').classList.add("mui-active");
					});
					return false;
	 			}*/
				if(that.financeAmt == null) {
					mui.toast(`
					<div  class="toast_content" >
					  	<div class="toast_text">金额不能为空</div>
					</div>`);
					return false;
				}
				if(!that.financeMonths) {
					mui.toast(`
					<div  class="toast_content" >
					  	<div class="toast_text">请选择融资期限</div>
					</div>`);
					return false;
				}
				if(!that.repaymentMethod) {
					mui.toast(`
					<div  class="toast_content" >
					  	<div class="toast_text">请选择还款方式</div>
					</div>`);
					return false;
				}

				if(true) { //已经阅读协议
					that.$store.commit('loadStatus', {
						'bool': true,
						'txt': '提交中...'
					}); //成功...
					let _returnUrl = window.location.href.substring(0, window.location.href.indexOf("#")) + '#/smalMelting/finance/waitingSign';
					that.$axios({
							url: '/supplier/finance/finance_apply',
							data: {
								financeAmt: parseFloat(that.toNumber(that.financeAmt)),
								receivableNos: that.receivableNos,
								repaymentMethod: that.repaymentMethod,
								financeMonths: that.financeMonths,
								returnUrl: _returnUrl,
								financeMethod: that.financeMethod,
							}
						})
						.then(function(response) {
							that.$store.commit('loadStatus', {
								'bool': false,
								'txt': '提交中...'
							}); //成功...
							if(response.data.code == '200') {
								window.location.href = response.data.data.contractUrl;
								/*that.$router.push({
									path:'/smalMelting/finance/waitingSign',
									contractUrl:response.data.data.contractUrl,
									receivableNos:that.receivableNos
								})*/
							}
						})
						.catch(function(error) {
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
			getFinanceEdit() { //获取融资详情
				let that = this;
				that.$store.commit('loadStatus', {
					'bool': false,
					'txt': '成功...'
				}); //成功...
				that.$axios({
						url: '/supplier/finance/finance_edit',
						data: {
							receivableNos: that.receivableNos,
							financeMethod: that.financeMethod
						}
					})
					.then(function(response) {
						if(response.data.code == '200') {
							that.financeEditData = response.data.data;
							if (response.data.data.financeAmt != null) {
								that.financeAmt = response.data.data.financeAmt; //融资金额
								that.maxFinanceAmt = response.data.data.financeAmt; //最大融资金额
								let _num = parseFloat(that.toNumber(that.maxFinanceAmt));
								if(_num > that.maxAmt) {
									that.maxFinanceAmt = that.maxAmt;
								}
							}
							that.financeDays = response.data.data.financeDays; //融资期限（单位：天）
							that.expireDate = response.data.data.expireDate; //过期日期
							that.financeMonths = response.data.data.financeMonths; //融资期限

							that.totalInterest = response.data.data.totalInterest; //总利息
							that.receiveAccount = response.data.data.receiveAccount; //收款账号
							that.chargeRate = response.data.data.chargeRate; //服务利率
							that.chargeAmt = response.data.data.chargeAmt; //服务金额
							that.marginRate = response.data.data.marginRate; //服务利率
							that.marginAmt = response.data.data.marginAmt; //服务金额
							that.totalAmt = response.data.data.totalAmt; //还款总额
							if(that.$route.params.repaymentMethod !== 'needless' && that.$route.params.repaymentMethodText !== 'needless') {
								that.repaymentMethod = that.$route.params.repaymentMethod;
								that.repaymentMethodText = that.$route.params.repaymentMethodText;
//								that.referInterest();//查询利息
							} else {
								that.repaymentMethod = response.data.data.repaymentMethod; //还款方式
								that.repaymentMethodText = response.data.data.repaymentMethodText; //还款方式文本
							}
							that.getTimeLimitList(); //生成融资期限列表下拉的数组
						}

					})
					.catch(function(error) {
						mui.toast(`
					<div  class="toast_content" >
					  	<div class="toast_text">连接失败，请检查你的网络！</div>
					</div>`);
					})
			},
			touchScroll(id) {
				var el = document.getElementById(id);
				var scrollStartPos = 0;
				document.getElementById(id).addEventListener("touchstart",
					function(event) {
						scrollStartPos = this.scrollTop + event.touches[0].pageY;
						event.preventDefault();
					}, false);
				document.getElementById(id).addEventListener("touchmove",
					function(event) {
						this.scrollTop = scrollStartPos - event.touches[0].pageY;
						event.preventDefault();
					}, false);
			}
		},
		beforeCreate: function() { //创建前状态
			document.title = '申请融资';
		},
		created: function() { //创建完毕状态

		},
		beforeMount: function() { //挂载前状态
		},
		mounted: function() { //挂载结束状态
			var that = this;
			this.receivableNos = that.$route.params.receivableNos;
			this.financeMethod = that.$route.params.financeMethod;
			that.getFinanceEdit();//获取融资详情
			if(that.$route.params.repaymentMethod !== 'needless' && that.$route.params.repaymentMethodText !== 'needless') {
				that.repaymentMethod = that.$route.params.repaymentMethod;
				that.repaymentMethodText = that.$route.params.repaymentMethodText;
				//that.referInterest();//查询利息
			}
			that.accountList = that.receivableNos.split(',');
			let _returnUrl = window.location.href.substring(0, window.location.href.indexOf("#")) + '#/smalMelting/finance/waitingSign';
			document.getElementById('bg-sm').style.height = document.documentElement.clientHeight + 'px';
			if(!that.receivableNos) {
				mui.toast(`
				<div  class="toast_content" >
				  	<div class="toast_text">很抱歉,没有对应的账款编号!</div>
				</div>`);
				return false
			}
			that.touchScroll("pay-schedule"); //调用需要overflow:auto的id即可。
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
	::-webkit-scrollbar {
		-webkit-appearance: none;
		/*可去除系统默认的样式*/
		width: 7px;
		/*滚动条宽度*/
	}

	::-webkit-scrollbar-thumb {
		/*当焦点不在当前区域滑块的状态*/
		border-radius: 4px;
		background-color: rgba(0, 0, 0, .5);
		-webkit-box-shadow: 0 0 1px rgba(255, 255, 255, .5);
	}

	.pf_top {
		height: 1.68rem;
		background-color: #fff;
		padding: .3rem .2rem;
	}

	.img_box {
		width: 1.06rem;
		height: 1.06rem;
		border: 1px solid #E6E6E6;
		background-color: #e5e5e5;
		border-radius: 50%;
		-webkit-border-radius: 50%;
		margin-right: .25rem;
	}

	.pf_title {
		height: .6rem;
		line-height: .6rem;
		font-size: .32rem;
	}

	.pf_name {
		line-height: .4rem;
		font-size: .24rem;
	}

	.pro_ul {
		width: 100%;
		border-bottom: 1px solid #f1f1f1;
	}

	.pro_li {
		width: 100%;
	}

	.pro_a {
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

	.pro_a_content {
		width: 100%;
		height: 100%;
	}

	.pro_sx {
		line-height: .34rem;
		margin-top: .2rem;
		margin-right: .08rem;
	}

	.pro_s_btn {
		position: relative;
		top: -.03rem;
		border: 1px solid #fc9d23;
		color: #fc9d23;
		border-radius: .07rem;
		-webkit-border-radius: .07rem;
		padding: .05rem .06rem;
	}

	.pro_input {
		border: 0;
		height: 100%;
		width: auto;
		padding: 0 0;
		text-align: right;
		padding-right: .2rem;
	}

	.mui-icon-arrowright:before {
		line-height: 1rem;
	}

	.check_css3 {
		margin: .4rem auto 0;
		width: 100%;
		padding-left: 4%;
	}

	.check_css3 span {
		position: relative;
	}

	.check_css3 .input_check {
		position: absolute;
		visibility: hidden;
	}

	.check_css3 .input_check+label {
		display: inline-block;
		width: .3rem;
		height: .3rem;
		border: 1px solid #cdcdcd;
	}

	.check_css3 .input_check:checked+label:after {
		content: "";
		position: absolute;
		left: .02rem;
		bottom: .18rem;
		width: .2rem;
		height: .05rem;
		border: .05rem solid #4cd964;
		border-top-color: transparent;
		border-right-color: transparent;
		-ms-transform: rotate(-60deg);
		-moz-transform: rotate(-60deg);
		-webkit-transform: rotate(-60deg);
		transform: rotate(-45deg);
	}

	.check_font {
		color: #cdcdcd;
		font-size: .24rem;
		bottom: .04rem;
		margin-left: .1rem;
	}

	.change_check_font {
		color: #4cd964;
	}
	/*弹窗*/

	.mui-popover {
		background-color: #fff;
	}

	.qx_btn {
		position: absolute;
		right: .2rem;
		padding: 0 .15rem;
		top: 50%;
		transform: translateY(-50%);
	}

	.popover_top {
		position: sticky;
		position: -webkit-sticky;
		top: 0;
		z-index: 3;
		height: .7rem;
		line-height: .7rem;
		width: 100%;
		text-align: center;
		color: #fff;
	}

	.popover_content {
		position: relative;
		padding: 0 .2rem;
	}

	.popover_content_top {
		line-height: .5rem;
		margin: 0 -.2rem;
		padding: .1rem .2rem;
	}

	.no_check_circle {
		margin-top: .22rem;
		margin-right: .4rem;
	}

	.no_check_circle i {
		width: .32rem;
		height: .32rem;
		line-height: .32rem;
		background-color: #cdcdcd;
		border-radius: 50%;
		-webkit-border-radius: 50%;
		color: #fff;
		font-size: .34rem;
	}

	.check_circle i {
		width: .32rem;
		height: .32rem;
		line-height: .32rem;
		background-color: #fc9d23;
		border-radius: 50%;
		-webkit-border-radius: 50%;
		color: #fff;
		font-size: .34rem;
	}

	.af_li {
		position: relative;
		height: 1.2rem;
		line-height: 1.2rem;
	}

	.af_item_circle {
		position: relative;
		top: .57rem;
		left: .2rem;
		transform: translateY(-50%);
		-webkit-transform: translateY(-50%);
		width: .24rem;
		height: .24rem;
		border-radius: 50%;
		background-color: #bbb;
	}

	.select {
		text-align: right;
		position: absolute;
		height: 95%;
		width: 100%;
		background-color: transparent;
		color: transparent;
		left: 0;
	}
</style>

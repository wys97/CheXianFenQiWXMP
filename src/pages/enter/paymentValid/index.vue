<template>
	<div>
		<form class="public_form"  style="width: 100%;padding: .2rem;">
			<div class="public_input_groups">
				<!--<div class="" style="line-height: .8rem;">
					<label class="public_label" for=""> <span class="c_666">收款企业: </span>
						<div>
							 {{supplierName}}
						</div> 
					</label>
				</div>-->
				<div class="public_input_group">
					<label class="public_label" for="">收款企业:</label>
					<input class="public_input" placeholder="请输入企业名称" v-model="supplierName" disabled="disabled" @input="inputFunc" type="text"   />
				</div>
				<div class="public_input_group">
					<label class="public_label" for="">银行账户:</label>
					<input class="public_input" placeholder="请输入企业名称" v-model="bankNameAccountNo" disabled="disabled" @input="inputFunc" type="text"   />
				</div>
				<!--<div class="" style="line-height: .8rem;">
					<label class="public_label" for="">
						<span class="c_666">
							银行账户：
						</span>
						<div>
							{{bankName}}&nbsp (尾号{{bankAccountNo}})
						</div> 	
					</label>
				</div>-->
				<div class="public_input_group">
					<label class="public_label must_input" for="">收款金额:</label>
					<input class="public_input mui-input-clear" v-model="bankAmt" placeholder="请输入收款金额"   maxlength="4"  @input="inputFunc" type="text"  />
				</div>
				<div class="c_bdred" style="line-height: .3rem;padding: .2rem 0;">
					<span>注：</span>请输入打款企业深圳小融商业保理有限公司（尾号0802）的银行打款金额。
				</div>
			</div>
			<!--<input type="submit" class="footer_btn" v-bind:class="{footer_btn_pass: isSuccess }" value="提交" />-->
		</form>
		
		<div class="footer_btn " @click="submit" :class="isSuccess?'footer_btn_pass':''">提交</div>
		<!--<form class="public_form" @submit.prevent="submit" style="width: 100%;">
			<div class="public_input_groups">
				<div class="public_input_group">
					<label class="public_label must_input" for="">企业名称:</label>
					<input class="public_input" placeholder="请输入企业名称" v-model="business_license.enterpriseName" @input="inputFunc" type="text"   />
				</div>
				<div class="public_input_group">
					<label class="public_label  must_input" for="">统一社会信用代码:</label>
					<input class="public_input" placeholder="请输入信用代码"  maxlength="18"  v-model="business_license.businessLicenseNo" @input="inputFunc" type="text"   />
				</div>
				<div class="public_input_group">
					<label class="public_label  must_input" for="">公司地址:</label>
					<textarea class="public_input" cols="3" rows="3"  placeholder="请输入公司地址"  v-model="business_license.address" @input="inputFunc"   />
				</div>
				<div class="public_input_group">
					<label class="public_label  must_input" for="">联系电话:</label>
					<input class="public_input" placeholder="请输入联系电话"  v-model="business_license.phone" @input="inputFunc"  type="text"/>
				</div>
				<div class="public_input_group">	
					<label class="public_label" for="">传真:</label>
					<input class="public_input" placeholder="请输入传真"   v-model="business_license.fax" @input="inputFunc" type="text"  />
				</div>
			</div>
			<input type="submit" class="public_submit_input_disable " v-bind:class="{public_submit_input: (isSuccess&&registerStatus!=='PASS') }" :disabled="isSuccess&&registerStatus==='PASS'" value="确认" />
		</form>-->
	</div>
</template>

<script>
	import { $resError,$subError } from '@/utils/muiAlert'
	import Upload from '../../../components/imageUpload'
	import { clearNoNum } from '@/utils/common'
	export default {
	  	name: '',
	  	components: {
			'image-html5-upload': Upload,
		},
	  	data () {
		    return {
		    	isSuccess:false,//判断按钮颜色
		    	bankAmt:'',//收款金额
		    	bankName:'',//银行名字
		    	bankAccountNo:'',//银行账户
		    	bankNameAccountNo:'',//银行名字和账户
		    	supplierName:'',//供应商名字
		    	status:'',//状态:INVALID-失效 CONFIRM_ING-待确认 CONFIRM-已确认
		    }
	  	},
	  	watch:{ //监听
	  		
	  	},
	  	methods: { 
	  		inputFunc:function(){//输入
				//判断输入内容是否都为空
				this.bankAmt = clearNoNum(this.bankAmt);
				if(this.bankAmt&&this.bankAmt!=0){
					this.isSuccess =true;
				}else{
					this.isSuccess =false;
				}
			},
	  		submit:function(){
	  			let that = this;
	  			if(this.bankAmt&&this.bankAmt!=0){
	  			}else{
	  				mui.toast(`
	  			 	<div  class="toast_content" >
					  	<i class="mui-icon iconfont icon-roundclose"></i>
					  	<div class="toast_text">金额输入有误</div>
					</div>`);
	  				return false;
	  			}
	  			that.$store.commit('loadStatus', {'bool': false,'txt': '验证中...'}); //成功...
				that.$axios({
					url:'/supplier/payment_valid/confirm',
					data:{
						bankAmt:that.bankAmt,
					}	
				})
				.then(function(response){
					that.$store.commit('loadStatus', {
						'bool': false,
						'txt': '成功...'
					}); //成功...
					if(response.data.code=='200'){
						that.status = 'CONFIRM';
						that.$router.replace({
							'path': '/enter/paymentValid/paymentStatus/'+that.status
						});
					}else{
						if(response.data.data.times){
							if(response.data.data.times>2){
								that.status = 'INVALID';
								that.$router.replace({
									'path': '/enter/paymentValid/paymentStatus/'+that.status
								});
							}else{
								mui.alert(`<div class="alert_content">收款金额输入有误</br>仅剩${3-response.data.data.times}次输入，超过后锁定账号</div>`, 
					  			`<div class="wai_img_box">
						  	 		<i class="font_180 c_fuz iconfont icon-roundclosefill"></i>
						  	 	</div><p class="alert_title">验证失败</p>`,
					  			function() {});
							}
						}
						
					}
					
				})
				.catch(function(error){
					that.$store.commit('loadStatus', {
						'bool': false,
						'txt': '失败...'
					}); //失败...
				})
			},
	  	},
	  	watch:{//监听
	  	},
	    computed: {//计算属性
	    	
	    },
		beforeCreate: function() { //创建前状态
			document.title = "打款验证";
		},
		created: function() { //创建完毕状态
			let that = this;
			that.$store.commit('loadStatus', {
				'bool': false,
				'txt': '加载中...'
			}); //成功...
			that.$axios({
				url:'/supplier/payment_valid/view_account'
			})
			.then(function(response){
				that.$store.commit('loadStatus', {
					'bool': false,
					'txt': '成功...'
				}); //成功...
				if(response.data.code=='200'){
					that.bankName =response.data.data.bankName//银行名字
					that.bankAccountNo =response.data.data.bankAccountNo//银行账户
					that.supplierName =response.data.data.supplierName//供应商名字
					that.bankNameAccountNo = that.bankName+' (尾号'+that.bankAccountNo+')'
					that.status = response.data.data.status//状态
					if(that.status === "INVALID"||that.status === "CONFIRM"){
						that.$router.replace({
							'path': '/enter/paymentValid/paymentStatus/'+that.status
						});
					}
				}
			})
			.catch(function(error){
				that.$store.commit('loadStatus', {
					'bool': false,
					'txt': '失败...'
				}); //失败...
			})
		},
		beforeMount: function() { //挂载前状态
		},
		mounted: function() { //挂载结束状态
			
			
		},
		beforeUpdate: function() { //更新前状态
		},
		updated: function() { //更新完成状态
		},
		destroyed: function() { //销毁完成状态
		}
	}
</script>

<style scoped>
	.disabled_input{
		border-color:transparent;
		background-color: transparent;
		padding-left: .2rem;
	}
	.img_wbox{
		float: left;
		margin: 0;
		padding: 0;
		border: none;
		display: inline-block;
		width: 33.33%;
	}
	.img_box {
		position: relative;
		margin: 0 auto .2rem;
		line-height: 1rem;
		text-align: center;
		border: 1px dashed #cdcdcd;
		border-radius: .1rem;
	}
	.remove_btn{
		position: absolute;
		z-index: 222;
		top: -.15rem;
		right: -.15rem;
		width: .3rem;
		align-content: center;
		height: .3rem;
		line-height: .3rem;
		border-radius: 50%;
		-webkit-border-radius: 50%;
	}
	.remove_btn>i{
		font-weight: 900;
		font-size: .3rem;
		color: #E51C23;
	}
	.img_box_label{
		position: absolute;
		transform: translateX(-50%);
		-webkit-transform: translateX(-50%);
		left: 50%;
		top: 0;
		z-index: 2;
		display: inherit;
	}
	.s_img {
		position: absolute;
		z-index: 2;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		background-size: contain;
	    background-position: center;
	    background-repeat: no-repeat;
	}
	.img_box .mui-icon {
		position: absolute;
		z-index: 1;
		top: 50%;
		transform: translateX(-50%) translateY(-50%);
		-webkit-transform: translateX(-50%) translateY(-50%);
		font-weight: 900;
		font-size: .9rem;
		color: #cdcdcd;
		align-content: center;
	}
	.img_box img {
		width: 100%;
	}
	.img_box .img_sm {
		position: absolute;
		z-index: 1;
		top: 60%;
		text-align: center;
		width: 100%;
		color: #a8a8a8;
		font-size: .25rem;
	}
	.img_box .img_sm2 {
		position: absolute;
		z-index: 1;
		top: 50%;
		text-align: center;
		width: 100%;
		color: #a8a8a8;
		font-size: .2rem;
	}
	.zy_img{
		width: 1.35rem;
		height: .8rem;
		background-color: #cdcdcd;
	}
	.zy_text{
		line-height: .3rem;
		text-align: center;
	}
	.public_input_group_disable{
		margin: 0 -.2rem .1rem;
		padding: 0 .2rem;
		background-color: #eaeaea;
	}
</style>
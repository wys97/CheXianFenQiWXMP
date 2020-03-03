<template>
	<div>
		<div class="screen_padding">
			<div class="public_input_group">
				<label class="public_label must_input" for="">开户许可证:</label>
				<div class="flex_l_start">
					<div class="img_wbox mui-btn mui-btn-primary mui-btn-block mui-btn-outlined">
						<div class="img_box" style="width: 2.7rem;height: 1.5rem;">
							<div class="s_img" v-bind:style="{backgroundImage:'url(' + feedback_mes_license.src + ')',backgroundColor:addBgColor.one}">
							</div>
							<i class="c_main iconfont icon-xiangji2"></i>
							<div class="img_sm2">开户许可证</div>
						</div>
						<label for="01" class="img_box_label" style="width: 2.7rem;height: 1.5rem;"></label>
					</div>
				</div>
			</div>
			<form class="public_form" @submit.prevent="submit" style="width: 100%;">
				<div class="public_input_groups">		
					<div class="public_input_group">
						<label class="public_label must_input" for="">开户名称:</label>
						<input class="public_input" v-model="name" placeholder="请输入开户名称" disabled="disabled" @input="inputFunc" type="text"   />
					</div>
					<div class="public_input_group ">
						<!--class=select_bank-->
						<label class="public_label must_input" for="">开户银行:</label>
						<input class="public_input" v-model="bankCode"  placeholder="请输入开户银行名"   @input="inputFunc" type="text"   />
						<!--<select v-model="bankCode" style="padding: 0 15px;margin-bottom: 0;">
						    <option v-for="(val,key,index) in bankList" :value="val" :selected="index==0?true:false">{{val}}</option>
						</select>-->
					</div>
					<div class="public_input_group">
						<label class="public_label must_input" for="">开户网点:</label>
						<input class="public_input" v-model="bankBranch" placeholder="请输入开户网点"   @input="inputFunc" type="text"   />
					</div>
					<div class="public_input_group">
						<label class="public_label must_input" for="">银行账号:</label>
						<input class="public_input" v-model="bankAccountNo"  placeholder="请输入银行账号"   @input="inputFunc" type="text"   />
					</div>
				</div>
				<!--<div class="c_bdred" style="line-height: .5rem;">注：此账号作为融资收款账户，请认真核对！</div>-->
				<input type="submit" class="public_submit_input_disable" 
					v-if="!iswait"
					v-bind:class="{public_submit_input: (isSuccess&&registerStatus!=='PASS') }" 
					:disabled="registerStatus==='PASS'" 
					value="保存" />
			</form>
		</div>
		<image-html5-upload @child-say="listenImg" :img-num-limit="imgNum" :img-id="imgId.one"></image-html5-upload>
	</div>
</template>

<script>
	import { $resError,$subError } from '@/utils/muiAlert'
	import Upload from '@/components/imageUpload'
	export default {
	  	name: '',
	  	components: {
			'image-html5-upload': Upload,
		},
	  	data () {
		    return {
		    	imgNum: 1,
				imgId: {
					one: '01'
				},
				feedback_mes_license: {
					isHave:false,
					picture: null,
					src:''
				},
				addBgColor:{
					one:''
				},//上传照片后控制添加背景色
		    	name:'',//开户名称
		    	bankCode:'',//银行编号
		    	bankBranch:'',//开户网点
		    	bankAccountNo:'',//银行账号
		    	account:'',
		    	isSuccess:false,//判断按钮的颜色
		    	bankList:{},//银行列表
				registerStatus:'',//审批状态. registerStatus=AMENDING 时有值. INIT: 初始化 APPROVING: 待审核 (已更新) PASS: 通过 NOT_PASS: 不通过
				iswait:false,//是否为等待审核
		    }
	  	},
	  	watch:{ //监听
	  		
	  	},
	  	methods: { 
	  		//组件传过来的数据
			listenImg: function(someData) {
				var that = this;
				that.feedback_mes_license.picture = someData[0];//改变提交的file值
				that.feedback_mes_license.src = someData[1];
				that.addBgColor.one = '#e5e5e5';
				that.fnUploadIdcard();
				this.fnisSuccess();
			},
	  		fnisSuccess:function(){
				//判断输入内容是否都为空
				if(this.bankCode&& this.bankBranch&&this.bankAccountNo&&this.feedback_mes_license.src) {
					this.isSuccess = true;
				} else {
					this.isSuccess = false;
				}
			},
			inputFunc:function(){//输入
				this.fnisSuccess();
			},
	  		submit:function(){
	  			let that = this;
	  			that.fnisSuccess();
	  			let _keys = [];
	  			if(that.isSuccess){
					let formData = new FormData();
					formData.append('bankCode',that.bankCode);
					formData.append('bankBranch',that.bankBranch);
					formData.append('bankAccountNo',that.bankAccountNo);
					that.$store.commit('loadStatus', {
						'bool': true,
						'txt': '验证中...'
					}); //提示...
					that.$axios({
						url:'/supplier/register/update_account',
						data: formData ,
						timeout:30000,
					})
					.then(function(response){
						that.$store.commit('loadStatus', {
							'bool': false,
							'txt': '成功...'
						}); //成功...
						if(response.data.code=='200'){
							that.$router.replace({path: '/enter/index'});
						}
					})
					.catch(function(error){
						that.$store.commit('loadStatus', {
							'bool': false,
							'txt': '失败...'
						}); //失败...
						mui.toast(`
						<div  class="toast_content" >
						  	<div class="toast_text">连接失败，请检查你的网络！</div>
						</div>`);
					})
	  				
	  			}else{
	  				mui.toast(`
					<div  class="toast_content" >
					  	<div class="toast_text">请补全开户许可证信息!</div>
					</div>`);
	  			}
			},
			fnUploadIdcard:function(){
				let that =this;
				let formData = new FormData();
				formData.append('licence',that.feedback_mes_license.picture)
				if(that.feedback_mes_license.picture!=null){
					that.$store.commit('loadStatus', {
						'bool': true,
						'txt': '提交中...'
					}); //提示...
					that.$axios({
						url:'/supplier/register/upload_license',
						data: formData,
						timeout:10000
					})
					.then(function(response){
						that.$store.commit('loadStatus', {
							'bool': false,
							'txt': '识别中...'
						}); //提示...
						if(response.data.code == '200'){
							that.isSubIdCard = [false,true,false];
							if(response.data.data.businessLicenseNo!=null){
								that.business_license.businessLicenseNo = response.data.data.businessLicenseNo;
							}
							if(response.data.data.enterpriseName!=null){
								that.business_license.enterpriseName = response.data.data.enterpriseName;
							}
							if(response.data.data.address!=null){
								that.business_license.address = response.data.data.address;
							}
							that.fnisSuccess();//判断按钮的颜色
						}
						
					})
					.catch(function(response) {
						that.$store.commit('loadStatus', {
							'bool': false,
							'txt': '失败...'
						}); //失败...
					})
				}else{
					mui.toast(`
				  	<div  class="toast_content" >
					  	<div class="toast_text">请补全入户许可证</div>
					  </div>
					`);
				}
			},
	  	},
	  	watch:{//监听
	  	},
	    computed: {//计算属性
	    	
	    },
		beforeCreate: function() { //创建前状态
			document.title = "开户许可证";
		},
		created: function() { //创建完毕状态
		},
		beforeMount: function() { //挂载前状态
		},
		mounted: function() { //挂载结束状态
			let that = this;
			that.account = that.$route.params.account;//拿到上一个路由带过来的数据
			that.registerStatus = that.$route.params.registerStatus;//拿到上一个路由带过来的状态
			that.iswait = that.$route.params.iswait;//拿到上一个路由带过来的状态
			if(that.account){
				that.name = that.account.name;
				if(!that.account.bankCode){
//					that.bankCode = '中国银行'
				}else{
					that.bankCode = that.account.bankCode;
				}
				that.bankBranch = that.account.bankBranch;
				that.bankAccountNo = that.account.bankAccountNo;
				if(that.account.pic){
					that.feedback_mes_license.src = that.account.pic;
					that.addBgColor.one = '#e5e5e5';
				}
				that.fnisSuccess();
			}
			
			that.$store.commit('loadStatus', {
				'bool': false,
				'txt': '加载中...'
			}); //成功...
			that.$axios({
				url:'/supplier/register/bank_list'
			}).then(function(response){
				that.$store.commit('loadStatus', {
					'bool': false,
					'txt': '成功...'
				}); //成功...
				if(response.data.code=='200'){
					that.bankList = response.data.data;
				}
			}).catch(function(error){
				that.$store.commit('loadStatus', {
					'bool': false,
					'txt': '失败...'
				}); //失败...
			})
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
	.top_warning{
  		position: fixed;
  		width: 100%;
  		top: 0;
  		left: 0;
  		background-color: #E51C23;
  		color: #fff;
  		padding: 0 .1rem;
  		line-height: .5rem;
  		font-size: .18rem;
  	}
  	select{
  		height: .75rem;
  	}
  	.select_bank{
  		position: relative;
  	}
  	.select_bank:before{
  		position: absolute;
  		right: 2%;
  		top: 1.1rem;
  		content: '';
  		width: 0;
  		height: 0;
  		border: .15rem solid #cdcdcd;
  		border-color: #cdcdcd transparent transparent transparent;
  	}
</style>
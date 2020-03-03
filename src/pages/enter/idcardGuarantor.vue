<template>
		<div class="">
			<div class="screen_padding">
				<div class="" v-show="!isSubIdCard">
					<div class="c_bgblack font_w font_32" style="line-height: .8rem;">
						上传担保人身份证：
					</div>
					<div class="img_wbox mui-btn mui-btn-primary mui-btn-block mui-btn-outlined">
						<div class="img_box" style="height: 2rem;width: 3.8rem;">
							<div class="s_img" v-bind:style="{backgroundImage:'url(' + feedback_mes_front.src + ')',backgroundColor:addBgColor.one}">
							</div>
							<i class="c_main iconfont icon-xiangji2"></i>
							<div class="img_sm">担保人身份证正面</div>
						</div>
						<label for="01" class="img_box_label" style="height: 2rem;width: 3.8rem;"></label>
					</div>
					<div class="img_wbox mui-btn mui-btn-primary mui-btn-block mui-btn-outlined">
						<div class="img_box" style="height: 2rem;width: 3.8rem;">
							<div class="s_img" v-bind:style="{backgroundImage:'url(' + feedback_mes_back.src + ')',backgroundColor:addBgColor.two}">
							</div>
							<i class="c_main iconfont icon-xiangji2"></i>
							<div class="img_sm">担保人身份证反面</div>
						</div>
						<label for="02" class="img_box_label" style="height: 2rem;width: 3.8rem;"></label>
					</div>
					<div class="black font_24" style="line-height: .8rem;color: #666;">
						注意事项：
					</div>
					<div class="flex_l_around">
						<div class="">
							<div class="zy_img" style="background-image: url(static/img/Idbuwanzheng.png);"></div>
							<div class="zy_text">不完整</div>
						</div>
						<div class="">
							<div class="zy_img" style="background-image: url(static/img/Idmohu.png);"></div>
							<div class="zy_text">模糊</div>
						</div>
						<div class="">
							<div class="zy_img" style="background-image: url(static/img/Idyouzedang.png);"></div>
							<div class="zy_text">有遮挡</div>
						</div>
					</div>
					<div class="sub_btn" style="margin: .3rem 0;" @click="fnUploadIdcard">提交识别</div>
				</div>
				<div v-show="isSubIdCard">
					<div class="public_input_group">
						<label class="public_label must_input" for="">担保人身份证信息核对:</label>
						<div class="flex_l_between">
							<div class="img_wbox mui-btn mui-btn-primary mui-btn-block mui-btn-outlined">
								<div class="img_box" style="width: 2.7rem;height: 1.5rem;">
									<div class="s_img" v-bind:style="{backgroundImage:'url(' + feedback_mes_front.src + ')',backgroundColor:addBgColor.one}">
									</div>
									<i class="c_main iconfont icon-xiangji2"></i>
									<div class="img_sm2">身份证正面</div>
								</div>
								<label for="01" class="img_box_label" style="width: 2.7rem;height: 1.5rem;"></label>
							</div>
							<div class="img_wbox mui-btn mui-btn-primary mui-btn-block mui-btn-outlined">
								<div class="img_box" style="width: 2.7rem;height: 1.5rem;">
									<div class="s_img" v-bind:style="{backgroundImage:'url(' + feedback_mes_back.src + ')',backgroundColor:addBgColor.two}">
									</div>
									<i class="c_main iconfont icon-xiangji2"></i>
									<div class="img_sm2">身份证反面</div>
								</div>
								<label for="02" class="img_box_label" style="width: 2.7rem;height: 1.5rem;"></label>
							</div>
						</div>
					</div>
					<form class="public_form" @submit.prevent="submit" style="width: 100%;">
						<div class="public_input_groups">
							<div class="public_input_group">
								<label class="public_label must_input" for="">担保人:</label>
								<input class="public_input" placeholder="请输入真实姓名" v-model="idcard_repre.name" @input="inputFunc" type="text"   />
							</div>
							<div class="public_input_group">
								<label class="public_label must_input" for="">担保人证件号码:</label>
								<input class="public_input" placeholder="请输入身份证"  v-model="idcard_repre.idcardNo" @input="inputFunc" type="text"   />
							</div>
							<div class="public_input_group">
								<label class="public_label must_input" for="">担保人地址:</label>
								<input class="public_input" placeholder="请输入地址"  v-model="idcard_repre.address" @input="inputFunc" type="text"   />
							</div>
							<div class="public_input_group">
								<label class="public_label must_input" for="">担保人手机号:</label>
								<input class="public_input" placeholder="请输入手机号"  v-model="idcard_repre.mobile" @input="inputFunc" type="text" maxlength="11" onkeyup="value=value.replace(/[^\d]/g,'')"  />
							</div>
							<div class="public_input_group">
								<label class="public_label" for="">担保人邮箱:</label>
								<input class="public_input" placeholder="请输入邮箱"  v-model="idcard_repre.email" @input="inputFunc" type="email"   />
							</div>
						</div>
						<input type="submit" class="public_submit_input_disable "  
							v-bind:class="{public_submit_input: (isSuccess&&registerStatus!=='PASS') }" 
							:disabled="isSuccess&&registerStatus==='PASS'" 
							value="保存" />
					</form>
				</div>
			</div>
			<image-html5-upload @child-say="listenImg" :img-num-limit="imgNum" :img-id="imgId.one"></image-html5-upload>
			<image-html5-upload @child-say="listenImg2" :img-num-limit="imgNum" :img-id="imgId.two"></image-html5-upload>
		</div>
</template>
<script>
	import { $resError,$subError } from '@/utils/muiAlert'
	import Upload from '../../components/imageUpload'
	export default {
		name: '',
		components: {
			'image-html5-upload': Upload,
		},
		data() {
			return {
				isPage:[true,true,true],//判断顶部状态
				isSubIdCard:false,//判断是否已经提交身份证
				isSuccess:false,//判断按钮的颜色
				imgNum: 1,
				imgId: {
					one: '01',
					two: '02'
				},
				feedback_mes_front: {
					isHave:false,
					picture: null,
					src:''
				},
				feedback_mes_back: {
					isHave:false,
					picture: null,
					src:''
				},
				addBgColor:{
					one:'',
					two:''
				},//上传照片后控制添加背景色
				idcard_repre:{
					name:'',
					idcardNo:'',
					mobile:'',
					address:'',
					email:'',
				},
				registerStatus:'',//审批状态. registerStatus=AMENDING 时有值. INIT: 初始化 APPROVING: 待审核 (已更新) PASS: 通过 NOT_PASS: 不通过
			}
		},
		props: ['loading'],
		methods: {
			//组件传过来的数据
			listenImg: function(someData) {
				var that = this;
				that.feedback_mes_front.picture = someData[0];//改变提交的file值
				that.feedback_mes_front.src = someData[1];
				that.addBgColor.one = '#e5e5e5';
				if(that.isSubIdCard == true){//是否已经提交身份证
					that.fnUploadIdcard();
				}
			},
			listenImg2: function(someData) {
				var that = this;
				that.feedback_mes_back.picture = someData[0];//改变提交的file值
				that.feedback_mes_back.src = someData[1];
				that.addBgColor.two = '#e5e5e5';
				if(that.isSubIdCard == true){//是否已经提交身份证
					that.fnUploadIdcard();
				}
			},
			fnisSuccess:function(){
				//判断输入内容是否都为空
				if(this.idcard_repre.name && this.idcard_repre.idcardNo&&this.idcard_repre.mobile&&this.idcard_repre.address) {
					this.isSuccess = true;
				} else {
					this.isSuccess = false;
				}
			},
			inputFunc:function(){//输入
				this.fnisSuccess();
			},
			submit:function(){
				var that = this;
				that.fnisSuccess();
				if (that.isSuccess&&that.isSubIdCard) {
					let _isCard = that.isCardNo(that.idcard_repre.idcardNo)
					//手机号正则  
					let phoneR = /^0?1[3|5|6|7|8|9][0-9]\d{8}$/
					let mflag = phoneR.test(that.idcard_repre.mobile);
					if(!_isCard){
						mui.toast(`
					  	<div  class="toast_content" >
						  	<div class="toast_text">身份证输入有误</div>
						  </div>
						`);
						return false;
					}
					if(!mflag){
						mui.toast(`
					  	<div  class="toast_content" >
						  	<div class="toast_text">请输入正确的手机号</div>
						  </div>
						`);
						return false;
					}
					that.$store.commit('loadStatus', {
						'bool': true,
						'txt': '提交中...'
					}); //提示...
					that.$axios({
						url:'/supplier/register/update_idcard_bondsman',
						data:that.idcard_repre
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
						
					})
				}else{
					mui.toast(`
				  	<div  class="toast_content" >
					  	<div class="toast_text">请补全信息</div>
					  </div>
					`);
				}
			},
			fnUploadIdcard:function(){
				let that =this;
				let formData = new FormData();
				formData.append('picBack',that.feedback_mes_back.picture);
				formData.append('picFront',that.feedback_mes_front.picture);
				let bool = Boolean;
				let _and = that.feedback_mes_back.picture!=null&&that.feedback_mes_front.picture!=null;
				let _or = that.feedback_mes_back.picture!=null||that.feedback_mes_front.picture!=null||false;
				if(that.isSubIdCard == true){
					bool = _or
				}else{
					bool = _and
				}
				if(bool){
					that.$store.commit('loadStatus', {
						'bool': true,
						'txt': '识别中...'
					}); //提示...
					that.$axios({
						url:'/supplier/register/upload_idcard_bondsman',
						data: formData,
						timeout:30000
					})
					.then(function(response){
						that.$store.commit('loadStatus', {
							'bool': false,
							'txt': '识别中...'
						}); //提示...
						if(response.data.code == '200'){
							that.isSubIdCard = true;
							if(response.data.data.name!=''){
								that.idcard_repre.name = response.data.data.name;
							}
							if(response.data.data.idcardNo!=''){
								that.idcard_repre.idcardNo = response.data.data.idcardNo;
							}
							if(response.data.data.mobile!=''){
								that.idcard_repre.mobile = response.data.data.mobile;
							}
							if(response.data.data.address!=''){
								that.idcard_repre.address = response.data.data.address;
							}
							that.fnisSuccess();//判断输入内容是否都为空
							mui.toast(`
				  			 	<div  class="toast_content" >
								  	<div class="toast_text">请核对证件信息</div>
								</div>
							`);
						}
						
					})
					.catch(function(response) {
//						that.isSubIdCard = true;
						that.fnisSuccess();//判断输入内容是否都为空
						that.$store.commit('loadStatus', {
							'bool': false,
							'txt': '识别中...'
						}); //提示...
					})
				}else{
					mui.toast(`
				  	<div  class="toast_content" >
					  	<div class="toast_text">请补全证件照</div>
					  </div>
					`);
				}
			},
			isCardNo(card){
				// 身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X   
			    var reg = /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$)/;   
			    if(reg.test(card) === false) {   
			        return false;   
			        }   
			    return true
			},
		},
		watch: { //监听
			
		},
		computed: { //计算属性

		},
		beforeCreate: function() { //创建前状态
			document.title = "担保人信息";
		},
		created: function() { //创建完毕状态
			let that = this;
			let bondsman =that.$route.params.bondsman;//拿到上一个路由带过来的数据
			that.registerStatus = that.$route.params.registerStatus;//拿到上一个路由带过来的状态
			if(bondsman.idcardNo!=null||bondsman.name!=null||bondsman.idcardPicBack!=null||bondsman.idcardPicFront!=null){
				that.isSubIdCard = true;
				if(bondsman!=null){
					//展示信息
					that.feedback_mes_back.src = bondsman.idcardPicBack;
					that.addBgColor.one = '#e5e5e5';
					that.feedback_mes_front.src = bondsman.idcardPicFront;
					that.addBgColor.two = '#e5e5e5';
					that.idcard_repre.name = bondsman.name;
					that.idcard_repre.idcardNo = bondsman.idCardNo;
					that.idcard_repre.mobile = bondsman.mobile;
					that.idcard_repre.address = bondsman.address;
					that.idcard_repre.email = bondsman.email;
					that.fnisSuccess();	
				}
			}else{
				that.isSubIdCard = false;
			}
		},
		beforeMount: function() { //挂载前状态
		},
		mounted: function() { //挂载结束状态
			var that = this;
			that.$store.commit('loadStatus', {
				'bool': false,
				'txt': '成功...'
			}); //成功...
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
	.img_wbox{
		margin: 0;
		padding: 0;
		border: none;
		display: inline-block;
		width: 100%;
	}
	.img_box {
		position: relative;
		margin: 0 auto .2rem;
		line-height: 1rem;
		text-align: center;
		border: 1px dashed #cdcdcd;
		border-radius: .1rem;
		overflow: hidden;
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
	.img_box i {
		position: absolute;
		z-index: 1;
		top: 40%;
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
		border-radius: .1rem;	
		-webkit-border-radius: .1rem;
		overflow: hidden;
		background-repeat: no-repeat;
		background-color: transparent;
		background-size:cover;
	}
	.zy_text{
		color: #666;
		line-height: .5rem;
		font-size:.25rem;
		text-align: center;
	}
</style>
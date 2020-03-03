<template>
	<div>
		<form class="public_form" @submit.prevent="submit" style="width: 100%;padding: 0 .2rem .2rem;">
			<div class="public_input_groups">
				<!--<div class="public_input_group public_input_group_disable" style="line-height: .7rem;">
					<label class="public_label" for=""> <span class="c_666">核心企业名称: </span>
						<span>
							{{update_trade.centreName}}
						</span> 
					</label>
				</div>-->
				<div class="public_input_group">
					<label class="public_label" for="">核心企业名称:</label>
					<input class="public_input" v-model="update_trade.centreName"  disabled="disabled" type="text"   />
				</div>
				<!--<div class="public_input_group public_input_group_disable" style="line-height: .7rem;">
					<label class="public_label" for="">
						<span class="c_666">
							交易平台网址/微信公众号: 
						</span>
						<span>{{update_trade.scmSite}}</span>	
					</label>
					
				</div>-->
				<div class="public_input_group">
					<label class="public_label" for="">交易平台网址/微信公众号:</label>
					<input class="public_input" v-model="update_trade.scmSite"  disabled="disabled" type="text"   />
				</div>
				<div class="public_input_group">
					<label class="public_label must_input" for="">平台账号:</label>
					<input class="public_input" v-model="update_trade.scmAccount" placeholder="请输入平台账号"   @input="inputFunc" type="text"   />
				</div>
				<div class="public_input_group">
					<label class="public_label" for="">平台密码:</label>
					<input :type="passwordType?'password':'text'"   class="public_input" v-model="update_trade.scmPassword" placeholder="如果是只有验证码登录可为空"   @input="inputFunc" />
					<span @click="changeType" class="eye">
						<i class="iconfont " :class="passwordType?'icon-attentionfill':'icon-attention'"></i>
					</span>
				</div>
				<div class="public_input_group">
					<label class="public_label c_666" for="">合作合同:</label>
				</div>
				<!--图片-->
				<div>
					<div v-for="(item,index) in pictureSrcArr" class="img_wbox mui-btn mui-btn-primary mui-btn-block mui-btn-outlined">
						<div class="img_box" style="height: 1rem;width: 1.9rem;">
							<div class="remove_btn" @click="removeImg(item.key)">
								<i class="iconfont icon-roundclosefill"></i>
							</div>
							<div class="s_img" v-bind:style="{backgroundImage:'url(' + item.src + ')'}">
							</div>
							<i class="c_main iconfont icon-xiangji2"></i>
							<div class="img_sm"></div>
						</div>
						<label :for="item.key" class="img_box_label" style="height: 1rem;width: 1.9rem;"></label>
					</div>
					<div class="img_wbox mui-btn mui-btn-primary mui-btn-block mui-btn-outlined">
						<div class="img_box" style="height: 1rem;width: 1.9rem;">
							<div class="s_img">
							</div>
							<i class="c_main iconfont icon-xiangji2"></i>
							<div class="img_sm"></div>
						</div>
						<label for="add" class="img_box_label" style="height: 1rem;width: 1.9rem;"></label>
					</div>
					<!--<div v-for="(item,index) in pictureSrcArr" style="height: 0;overflow: hidden;">
						<image-html5-upload @child-say="listenImg" :img-num-limit="imgNum" :img-id="item.key"></image-html5-upload>
					</div>	-->
					<!--<image-html5-upload @child-say="listenImg" :img-num-limit="imgNum" :img-id="imgId.one"></image-html5-upload>-->
					<image-html5-upload @child-say="listenImgAdd" :img-num-limit="imgNum" :img-id="addID"></image-html5-upload>
				</div>
			</div>
			<input type="submit" class="public_submit_input_disable public_submit_input" v-bind:class="{public_submit_input: isSuccess }" value="确认" />
		</form>
	</div>
</template>

<script>
	import { $resError,$subError } from '@/utils/muiAlert'
	import Upload from '@/components/imagesUpload'
	export default {
	  	name: '',
	  	components: {
			'image-html5-upload': Upload,
		},
	  	data () {
		    return {
		    	imgNum: 20,
		    	centreId:'',
		    	addID:'add',//添加图片的id，关联for
		    	contractFiles:[],//	合作合同 url
		    	contractKeys:[],//合作合同的文件 key
				pictureSrcArr:[],//显示的图片数组
		    	isSuccess:false,//判断按钮的颜色，
		    	update_trade:{
		    		centreName:'',
		    		centreId:'',
		    		contractKeys:[],
		    		contractFiles:[],
		    		scmAccount:'',
		    		scmPassword:'',
		    		scmSite:''
		    	},
		    	src:[],
		    	passwordType:true,//true:password ,false:text
		    }
	  	},
	  	watch:{ //监听
	  		pictureSrcArr:function(val,oldVal){//监听显示的图片数组的变化
	  			var that = this;
	  			for(var i=0;i<val.length;i++){
	  				that.contractKeys = [];//清空
	  				that.contractKeys.push(val[i].key);
	  			}
	  		}
	  	},
	  	methods: { 
	  		//组件传过来的数据
			listenImg: function(someData) {//替换图片
				console.log(someData)
				var that = this;
				let _key ='';
				let _file = someData[0];//改变提交的file值
				let formData = new FormData();
				formData.append('file',_file)
				that.$store.commit('loadStatus', {
					'bool': true,
					'txt': '替换中...'
				}); 
				that.$axios({
					url:'/supplier/register_trade/upload_contract',
					data:formData,
					timeout: 10000, 
				})
				.then(function(response){
					if(response.data.code=='200'){
						_key = response.data.data.key
						for(var i=0;i<that.pictureSrcArr.length;i++){
							if(that.pictureSrcArr[i].key == someData[2]){
								that.pictureSrcArr[i].src = someData[1];//本地预览的base64
								that.pictureSrcArr[i].key = _key;//改变提交的key值
							}
						}
						that.$store.commit('loadStatus', {
							'bool': false,
							'txt': '上传中...'
						}); 
						mui.toast(`
					  	<div  class="toast_content">
						  	<div class="toast_text">替换成功</div>
					  	</div>`);
					}
					
				})
				.catch(function(error){
					that.$store.commit('loadStatus', {
						'bool': false,
						'txt': '上传中...'
					}); 
					mui.toast(`
				  	<div  class="toast_content">
					  	<div class="toast_text">上传失败</div>
				  	</div>`);
				})
			},
			listenImgAdd: function(someData) {//添加图片
				var that = this;
				let _key ='';
				let _file = someData[0];//改变提交的file值
				let formData = new FormData();
				formData.append('file',_file)
				that.$store.commit('loadStatus', {
					'bool': true,
					'txt': '上传中...'
				}); 
				that.$axios({
					url:'/supplier/register_trade/upload_contract',
					data:formData,
					timeout: 10000, 
				})
				.then(function(response){
					that.$store.commit('loadStatus', {
						'bool': false,
						'txt': '上传中...'
					}); 
					if(response.data.code=='200'){
						_key = response.data.data.key;
						that.pictureSrcArr.push({
							src:someData[1]	,//本地预览的base64
							key:_key,
						})
					}
				})
				.catch(function(error){
					that.$store.commit('loadStatus', {
						'bool': false,
						'txt': '上传中...'
					}); 
					mui.toast(`
				  	<div  class="toast_content">
					  	<div class="toast_text">上传失败</div>
				  	</div>`);
				})
				
				//that.pictureSrcArr[1].picture = someData[0];//改变提交的file值
				//that.pictureSrcArr[1].src = someData[1];//本地预览的base64
				if(that.isSubIdCard == true){//是否已经提交身份证
					that.fnUploadIdcard();
				}
			},
	  		//组件传过来的数据
			listenKey: function(someData) {
				var that = this;
				let _arr = [];
				for(var i=0;i<someData.length;i++){
					_arr.push(someData[i].key);
				}
				that.update_trade.contractKeys = _arr;
				/*that.feedback_mes_front.picture = someData[0];//改变提交的file值
				that.feedback_mes_front.src = someData[1];
				that.addBgColor.one = '#e5e5e5';
				if(that.isSubIdCard == true){//是否已经提交身份证
					that.fnUploadIdcard();
				}*/
			},
			removeImg:function(_key){
				let that = this;
				for(var i=0;i<that.pictureSrcArr.length;i++){
					if(_key == that.pictureSrcArr[i].key){
						that.pictureSrcArr.splice(i,1);
					}
				}
			},
	  		inputFunc:function(){//输入
				//判断输入内容是否都为空
				
			},
	  		submit:function(){
	  			let that = this;
	  			let _keys = [];
	  			for(var i=0;i<that.pictureSrcArr.length;i++){
	  				_keys.push(that.pictureSrcArr[i].key); 
	  			}
	  			if(that.centreId!=null&&_keys.length!=0&&that.update_trade.scmAccount!=null){
					let formData = new FormData();
					formData.append('centreId',that.centreId);
					formData.append('contractKeys',_keys.join(","));
					formData.append('scmAccount',that.update_trade.scmAccount);
					formData.append('scmPassword',that.update_trade.scmPassword);
					that.$store.commit('loadStatus', {
						'bool': true,
						'txt': '验证中...'
					}); //提示...
					that.$axios({
						url:'/supplier/register_trade/update_trade',
						data: formData ,
						timeout:10000,
					})
					.then(function(response){
						that.$store.commit('loadStatus', {
							'bool': false,
							'txt': '成功...'
						}); //成功...
						if(response.data.code=='200'){
							that.$router.push({path:'/enter/kr/krIndex'})
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
					  	<div class="toast_text">请补全平台信息!</div>
					</div>`);
	  			}
			},
			changeType(){
				this.passwordType = !this.passwordType;
			}
	  	},
	  	watch:{//监听
	  	},
	    computed: {//计算属性
	    	
	    },
		beforeCreate: function() { //创建前状态
			document.title = "贸易资料详情";
		},
		created: function() { //创建完毕状态
		},
		beforeMount: function() { //挂载前状态
		},
		mounted: function() { //挂载结束状态
			let that = this;
			that.centreId = that.$route.params.centreId;
			that.$store.commit('loadStatus', {
				'bool': true,
				'txt': '加载中...'
			}); //成功...
			that.$axios({
				url:'/supplier/register_trade/query_trade',
				data:{
					centreId:that.centreId
				}
			})
			.then(function(response){
				that.$store.commit('loadStatus', {
					'bool': false,
					'txt': '成功...'
				}); //成功...
				
				if(response.data.code=='200'){
					that.update_trade.contractFiles = response.data.data.contractFiles;
					that.update_trade.contractKeys = response.data.data.contractKeys;
					that.update_trade.scmAccount = response.data.data.scmAccount;
					if((typeof response.data.data.scmPassword) === 'object'){
						response.data.data.scmPassword = "";
					}
					that.update_trade.scmPassword = response.data.data.scmPassword;
					that.update_trade.centreName = response.data.data.centreName;
					that.update_trade.scmSite = response.data.data.scmSite;
					for(var i=0;i<response.data.data.contractFiles.length;i++){
						that.pictureSrcArr.push({
							src:response.data.data.contractFiles[i],//预览的url
							key:response.data.data.contractKeys[i],
						})
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
	.img_box i{
		position: relative;
		font-size: .5rem;
		top: -.1rem;
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
		top: 0rem;
		right: .05rem;
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
	.eye{
		position: absolute;
		right: 10px;
    	bottom: 15px;
    	padding: 0 10px;
	}
</style>
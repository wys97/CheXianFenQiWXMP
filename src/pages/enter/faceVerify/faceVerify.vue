<template>
  	<div class="">
  		<div v-if="steps[0]">
		  	<div class="sketch">
		  		<!--<img src="static/img/sketch.png"/>-->
				<div class="sketch_img" style="background-image: url(static/img/sketch.png)"></div>
				<p class="sketch_text">正面平视手机、保证光线充足<br>请勿遮挡面部</p>
			</div>
			<div class="prompt">
				<div class="prompt_box">
					<div class="prompt_box_text">
						<span class="prompt_box_text_number">1</span>
						<span class="prompt_box_text_content">牢记验证码，点击开始录制</span>
						<span class="prompt_box_text_border"></span>
					</div>
					<div class="prompt_box_text">
						<span class="prompt_box_text_number">2</span>
						<span class="prompt_box_text_content">开启前置摄像头，用普通话朗读数字</span>
						<span class="prompt_box_text_border"></span>
					</div>
					<div class="prompt_box_text">
						<span class="prompt_box_text_number">3</span>
						<span class="prompt_box_text_content">完成录制，等待验证结果</span>
						<!---->
					</div>
				</div> 	
				<div style="width: 5rem;margin: 0 auto;">
					<div class="sub_btn"@click="next">下一步</div>
				</div>
			</div>
  		</div>
		<!--弹窗-->
		<div class="modal_layer" v-if="steps[1]">
			<div class="modal_layer_mask"></div>
			<div class="modal_layer_popup">
				<div class="modal_layer_success">
					<div class="modal_layer_popup_title">请牢记以下验证码</div>
					<div class="modal_layer_popup_content">
						此验证码将于<span>{{countDown}}</span>秒后过期<br>
						用普通话朗读数字，视频时长<span>3-8</span>秒最佳</div>
					<div class="modal_layer_popup_number">
						<span v-for="item in wordList">{{item}}</span>
					</div>
					<div :class="!isRecord?'modal_point_disable':''" class="modal_wrapper modal_point">
						<span  class="modal_confirm_btn">
		                  	  记住了，开始录制<span v-if="time">({{time}}s)</span>
		                </span> 
		                <input type="file" accept="video/*" capture="camcorder" class="camera_input" :disabled="!isRecord" @change="upload">
					</div>
				</div>
				<span class="modal_layer_close" @click="close">
					<i class="iconfont icon-roundclose font_58"></i>
				</span>
			</div>
		</div>
  		<!--结果-->
  		<div class="result" v-if="steps[2]">
			<div class="result_box">
				<span class="result_box_pic">
					<span class="result_box_pic_icon icon_top"></span> 
					<span class="result_box_pic_icon icon_right"></span>
					<span class="result_box_pic_icon icon_bottom"></span> 
					<span class="result_box_pic_icon icon_left"></span> 
					<img v-if="!isSuccess" src="//aip.bdstatic.com/faceliveness/dist/1523595724898/images/pic_default.png" class="result_box_return_img">
					<img v-if="isSuccess"  src="static/img/sketchResult.png" class="result_box_return_img">
				</span>
					
				<span class="result_box_text">
					活体检测
		            <span v-if="!isSuccess" class="result_box_color no_pass_status">失败</span> 
		            <span v-if="isSuccess" class="result_box_color pass_status">成功</span> 
		            <span class="result_box_failcolor">{{message}}</span>
				</span>
				<!--<div class="result_box_value">
					<span class="result_box_value_text">检测分值:0</span> 
		            <span class="result_box_value_text">应读数字:0</span> 
		            <span class="result_box_value_text">检测数字:0</span>
				</div>-->
			</div>
			<div class="result_option">
				<span @click="finsh" class="result_option_btn result_option_btn_ok">完成</span>
				<span  v-if="!isSuccess" @click="resetShoot"  class="result_option_btn result_option_btn_again">重拍</span>
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
		    	steps:[true,false,false],//进行的步骤0：sketch，1：modal_layer弹窗，2：result返回结果
		    	isRecord:false,//是否可点录制视频 false不可 true 可
		    	time:3,//记住数字的次数
		    	countDown:60,//过期倒计时
		    	wordList:[],//唇语数字数组
		    	message:'',//识别结果描述
		    	isSuccess:'',//识别是否成功
		    } 
	  	},
	  	methods: { 
	  		next(){//下一步
	  			let that = this;
	  			that.getLip();//获取唇语
	  			that.time = 3;//初始化次数
	  			that.countDown = 60;//初始化过期倒计时
	  			if(window.t){
	  				window.clearInterval(window.t);
	  			}
	  			if(window.countDownT){
	  				window.clearInterval(window.countDownT);
	  			}
	  			window.t = setInterval(function(){
	  				that.time =that.time - 1;
	  				if(that.time===0){
	  					window.clearInterval(window.t);
	  				}
	  			},1000);
	  			//60s倒计时
	  			window.countDownT =setInterval(function(){
	  				that.countDown =that.countDown - 1;
	  				if(that.countDown===0){
	  					window.clearInterval(window.countDownT);
	  				}
	  			},1000);
	  		},
	  		close(){//关闭弹窗
	  			let that = this;
	  			window.clearInterval(window.countDownT);
	  			that.steps = [true,false,false]
	  		},
	  		upload (e) {//获取视频
	  			let that = this;
		      	let files = e.target.files || e.dataTransfer.files;
		      	if(files[0].size>20971520){
		      		mui.toast(
					'<div  class="toast_content" >'+
					'<i class="mui-icon iconfont icon-roundclose"></i>'+
					'<div class="toast_text">视频不能超过20M</div>'+
					'</div>');
		      		return false;
		      	}
		      	if (!files.length) return;
		      	let video = files[0];
		      	if (files.length){
		      		that.$store.commit('loadStatus', {
						'bool': true,
						'txt': '视频上传中...'
					}); //提示...
					let formData = new FormData();
					formData.append('video',video)
					that.$axios({
						url:'/supplier/register/upload_video',
						data:formData,
						timeout:60000	
					})
					.then(function(res){
						that.$store.commit('loadStatus', {
							'bool': false,
							'txt': '成功...'
						}); //成功...
						if(res.data.code=='200'){	
							that.$store.commit('loadStatus', {
								'bool': true,
								'txt': '验证中...'
							}); //提示...
							that.$axios({//查询识别结果
								url:'/supplier/register/check_repre_identity'
							})
							.then(function(response){
								that.$store.commit('loadStatus', {
									'bool': false,
									'txt': '成功...'
								}); //成功...
								if(response.data.code=='200'){	
			  						that.isSuccess = response.data.data.success;
			  						that.message = response.data.data.message;
			  						that.steps = [false,false,true];
			//						that.$router.replace({path: '/enter/index'});
								}else{
									
								}
							})
							.catch(function(error){
								that.$store.commit('loadStatus', {
									'bool': false,
									'txt': '失败...'
								}); //失败...
							})
//	  						that.steps = [false,false,true];
	//						that.$router.replace({path: '/enter/index'});
						}
					})
					.catch(function(error){
						that.$store.commit('loadStatus', {
							'bool': false,
							'txt': '失败...'
						}); //失败...
						mui.toast(
						'<div  class="toast_content" >'+
						'<i class="mui-icon iconfont icon-roundclose"></i>'+
						'<div class="toast_text">录制失败,请重新录制！</div>'+
						'</div>');
			      		return false;
					})
		      	}
		   	},
		   	resetShoot(){
		   		this.next();
		   	},
		   	finsh(){
		   		let that = this;
		   		that.$router.replace({path: '/enter/index'});
		   	},
		   	getLip () {//获取唇语
		   		let that = this;
		   		that.$store.commit('loadStatus', {
					'bool': true,
					'txt': '验证中...'
				}); //提示...
				that.$axios({
					url:'/supplier/register/get_lip'
				})
				.then(function(res){
					that.$store.commit('loadStatus', {
						'bool': false,
						'txt': '成功...'
					}); //成功...
					if(res.data.code=='200'){
						that.steps = [true,true,false];
			   			that.wordList = res.data.data.word.split('');
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
	  		time(val,oldVal){
	  			if(val===0){
	  				this.isRecord = true;
	  			}else{
	  				this.isRecord = false;
	  			}
	  		},
	  		countDown(val,oldVal){
	  			let that = this;
	  			if(val===0&&that.steps[2]===false){
	  				this.next();
	  			}
	  		}
	  	},
	    computed: {//计算属性
	    	
	    },
		beforeCreate: function() { //创建前状态
			document.title = "人脸识别";
		},
		created: function() { //创建完毕状态
			let that = this;
			if(that.$route.params.status==='PASS'){	
				that.isSuccess = true;
  				that.steps = [false,false,true];
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
  	.sketch{
  		/*background: hsla(0,0%,88%,.35);*/
    	padding: .3rem;
  	}
  	.sketch_img{
  		width: 3.5rem;
	    height: 5rem;
	    margin: 0 auto;
	    background-repeat: no-repeat;
	    background-origin: 0 , 0;
	    -webkit-background-size: 100% auto;
	    background-size: 100% auto;
  	}
  	.sketch_text{
  		font-size: 14px;
	    color: #999;
	    letter-spacing: 0;
	    line-height: 24px;
	    text-align: center;
  	}
  	.prompt {
  		min-height:4rem ;
	    -webkit-box-shadow: 0 -4px 10px 0 #e8e8e8;
	    -moz-box-shadow: 0 -4px 10px 0 #e8e8e8;
	    box-shadow: 0 -4px 10px 0 #e8e8e8;
	    padding-bottom: .3rem;
	    background-color: #fff;
	}
	.prompt_box {
	    padding: .4rem 0;
	}
	.prompt_box_text {
	    margin: 0 auto .5rem;
	    height: .15rem;
	    line-height: .15rem;
	    width: 5rem;
	}
	.prompt_box_text_number {
	    -webkit-border-radius: 200px;
	    -moz-border-radius: 200px;
	    border-radius: 200px;
	    border: 1px solid #0073eb;
	    text-align: center;
	    color: #0073eb;
	    display: inline-block;
	    width: .3rem;
	    height: .3rem;
	    line-height: .3rem;
	    -webkit-box-sizing: border-box;
	    -moz-box-sizing: border-box;
	    box-sizing: border-box;
	    font-size: 12px;
	    margin-right: .4rem;
	    letter-spacing: 0;
	    vertical-align: top;
	}
	.prompt_box_text_content {
	    color: #333;
	    letter-spacing: 0;
	    white-space: nowrap;
	    display: inline-block;
	    font-size: .22rem;
	    padding-top: .1rem;
	}
	.prompt_box_text_border {
	    height: .2rem;
	    margin: .06rem 0 .06rem .13rem;
	    width: 0;
	    border-left: 1px dotted #0073eb;
	    display: block;
	}
	/*弹窗*/
	.modal_layer, .modal_layer_mask {
	    position: fixed;
	    left: 0;
	    top: 0;
	    right: 0;
	    bottom: 0;
	}
	.modal_layer_mask {
	    opacity: .45;
	    background: #000;
	    z-index: 1;
	}
	.modal_layer_popup {
	    width: 5rem;
	    height: 4.5rem;
	    /*background-color: #fff;*/
	    /*padding: 0 .833rem .833rem;*/
	    position: fixed;
	    transform: translateX(-50%);
	    left: 50%;
	    top: 2.5rem;
	    /*margin-left: -12.85rem;*/
	    z-index: 2;
	    background-color: #fff;
	    border-radius: .1rem;
	    -webkit-border-radius: .1rem;
	}
	.modal_layer_popup_title {
	    font-size: 16px;
	    color: #333;
	    height: .5rem;
	    line-height: .5rem;
	    text-align: center;
	    margin: .3rem 0 .1rem;
	}
	.modal_layer_popup_content {
	    font-size: 13px;
	    line-height: .3rem;
	    color: #666;
	    text-align: center;
	    margin-bottom: .2rem;
	    letter-spacing: 0;
	}
	.modal_layer_popup_content span {
	    color: red;
	}
	.modal_layer_popup_number {
		/*display: flex;
		display: -webkit-flex;
		align-items: center;
		-webkit-align-items: center;*/
	    font-size: 0;
	    text-align: center;
	}
	.modal_layer_popup_number span {
	    font-size: 40px;
	    color: #333;
	    display: inline-block;
	    width: .7rem;
	    height: 1.2rem;
	    line-height: 1.2rem;
	    margin: 0 .06rem;
	    border: 1px solid #e1e1e1;
	    -webkit-border-radius: 10px;
	    -moz-border-radius: 10px;
	    border-radius: 10px;
	    text-align: center;
	    -webkit-box-sizing: border-box;
	    -moz-box-sizing: border-box;
	    box-sizing: border-box;
	}
	.modal_layer_fail_restart, .modal_layer .modal_wrapper {
	    height: .8rem;
	    line-height: .8rem;
	    text-align: center;
	    -webkit-border-radius: 4px;
	    -moz-border-radius: 4px;
	    border-radius: 4px;
	    position: absolute;
	    width: 4.5rem;
	    bottom: .2rem;
	    margin: auto;
	}
	.modal_layer .modal_wrapper {
	    background: #bcd2eb;
	}
	.modal_layer .modal_wrapper.modal_point {
	    background: #fc9d23;
	    position: absolute;
	    transform: translateX(-50);
	    -webkit-transform: translateX(-50%);
	    left: 50%;
	}
	.modal_layer .modal_wrapper.modal_point_disable {
	    background: #fc9d23;
	    position: absolute;
	    transform: translateX(-50);
	    -webkit-transform: translateX(-50%);
	    left: 50%;
	    opacity: .4;
	}
	.modal_layer .modal_confirm_btn {
	    font-size: 16px;
	    color: #fff;
	    width: 100%;
	    height: 100%;
	}
	.modal_layer .camera_input {
	    position: absolute;
	    left: 0;
	    top: 0;
	    width: 100%;
	    height: 100%;
	    opacity: 0;
	}
	.modal_layer_close {
	    /*outline: none;*/
	    position: absolute;
	    position: absolute;
	    transform: translateX(-50);
	    -webkit-transform: translateX(-50%);
	    left: 50%;
	    color: #fff;
	    text-align: center;
	    bottom: -1rem;
	    /*margin-left: -1.833rem;*/
	    /*background: url(//aip.bdstatic.com/faceliveness/dist/1523595724898/images/icon_close.png) 0 0 no-repeat;*/
	    /*-moz-background-size: 100% auto;*/
	    /*background-size: 100% auto;*/
	}
	.result {
	    background: #e1e1e1;
	    position: absolute;
	    left: 0;
	    top: 0;
	    right: 0;
	    bottom: 0;
	    padding: .25rem;
	}
	.result_box {
	    background: #fff;
	    -webkit-box-shadow: 0 -4px 10px 0 #e8e8e8;
	    -moz-box-shadow: 0 -4px 10px 0 #e8e8e8;
	    box-shadow: 0 -4px 10px 0 #e8e8e8;
	    padding: .4rem .5rem .4rem;
	    margin-bottom: .2rem;
	}
	.result_box_pic {
	    display: block;
	    width: 4rem;
	    height: 4rem;
	    margin: 0 auto .3rem;
	    position: relative;
	    text-align: center;
	}	
	.result_box_pic_icon {
	    position: absolute;
	    width: .3rem;
	    height: .3rem;
	}
	.result_box_pic .icon_top {
	    left: 0;
	    top: 0;
	    background: url(//aip.bdstatic.com/faceliveness/dist/1523595724898/images/icon_left_top.png) 0 0 no-repeat;
	    -moz-background-size: 50% 50%;
	    background-size: 50% 50%;
	}
	.result_box_pic .icon_right {
	    right: 0;
	    top: 0;
	    background: url(//aip.bdstatic.com/faceliveness/dist/1523595724898/images/icon_right_top.png) .16rem 0 no-repeat;
	    -moz-background-size: 50% 50%;
	    background-size: 50% 50%;
	}
	.result_box_pic .icon_bottom {
	    right: 0;
	    bottom: 0;
	    background: url(//aip.bdstatic.com/faceliveness/dist/1523595724898/images/icon_right_bottom.png) .16rem .16rem no-repeat;
	    -moz-background-size: 50% 50%;
	    background-size: 50% 50%;
	}
	.result_box_pic .icon_left {
	    left: 0;
	    bottom: 0;
	    background: url(//aip.bdstatic.com/faceliveness/dist/1523595724898/images/icon_left_bottom.png) 0 .16rem no-repeat;
	    -moz-background-size: 50% 50%;
	    background-size: 50% 50%;
	}
	.result_box_pic .result_box_return_img {
	    width: 2.6rem;
	    display: block;
	    position: absolute;
	    left: 50%;
	    top: 50%;
	    -webkit-transform: translate(-50%,-50%);
	    -moz-transform: translate(-50%,-50%);
	    -ms-transform: translate(-50%,-50%);
	    transform: translate(-50%,-50%);
	}
	.result_box_text {
	    font-size: .32rem;
	    line-height: .4rem;
	    color: #00002d;
	    display: block;
	    text-align: center;
	    height: .8rem;
	    margin: .5rem .8rem;
	}
	.result_box_color.resulr_color_red {
	    color: #f30;
	}
	.result_box_color {
	    margin-bottom: .2rem;
	}
	.result_box_failcolor {
	    color: #999;
	    font-size: .26rem;
	    display: block;
	    text-align: center;
	}
	.result_box_value {
	    width: 3rem;
	    margin: 0 auto;
	}
	.result_box_value_text {
	    color: #999;
	    font-size: .28rem;
	    margin-bottom: .28rem;
	    display: block;
	}
	.result_option {
	    display: -webkit-box;
	    display: -webkit-flex;
	    display: -moz-box;
	    display: -ms-flexbox;
	    display: flex;
	}
	.result_option_btn {
	    -webkit-border-radius: 4px;
	    -moz-border-radius: 4px;
	    border-radius: 4px;
	    text-align: center;
	    -webkit-box-flex: 1;
	    -webkit-flex: 1;
	    -moz-box-flex: 1;
	    -ms-flex: 1;
	    flex: 1;
	    height: .8rem;
	    line-height: .8rem;
	    font-size: .32rem;
	}
	.result_option_btn.result_option_btn_ok {
	    background: #fc9d23;
	    color: #fff;
	    border: 1px solid #fc9d23;
	}
	.result_option_btn.result_option_btn_again {
	    color: #fc9d23;
	    background: #f5f5f5;
	    border: 1px solid #fc9d23;
	    margin-left: .3rem;
	}
	.pass_status{
    	color: #259B24;
    }
    .no_pass_status{
    	color: #E51C23;
    }
</style>

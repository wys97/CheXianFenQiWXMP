<template>
  	<div class="">
	  	<div v-for="(item,index) in pictureSrcArr" class="img_wbox mui-btn mui-btn-primary mui-btn-block mui-btn-outlined">
			<div class="img_box" style="height: 2rem;width: 3.8rem;">
				<div class="s_img" v-bind:style="{backgroundImage:'url(' + item.src + ')'}">
				</div>
				<i class="c_main iconfont icon-xiangji2"></i>
				<div class="img_sm">img</div>
			</div>
			<label :for="item.key" class="img_box_label" style="height: 2rem;width: 3.8rem;"></label>
		</div>
		<div class="img_wbox mui-btn mui-btn-primary mui-btn-block mui-btn-outlined">
			<div class="img_box" style="height: 2rem;width: 3.8rem;">
				<div class="s_img">
				</div>
				<i class="c_main iconfont icon-xiangji2"></i>
				<div class="img_sm">添加</div>
			</div>
			<label for="add" class="img_box_label" style="height: 2rem;width: 3.8rem;"></label>
		</div>
		<div v-for="(item,index) in pictureSrcArr">
			<image-html5-upload @child-say="listenImg" :img-num-limit="imgNum" :img-id="item.key"></image-html5-upload>
		</div>	
		<!--<image-html5-upload @child-say="listenImg" :img-num-limit="imgNum" :img-id="imgId.one"></image-html5-upload>-->
		<image-html5-upload @child-say="listenImgAdd" :img-num-limit="imgNum" :img-id="addID"></image-html5-upload>
  	</div>
</template>
<script>
	import { $resError,$subError } from '@/utils/muiAlert'
	import Upload from '../../../components/imageUpload'
	export default {
	  	name: '',
	  	components: {
			'image-html5-upload': Upload,
		},
	  	data () {
		    return {
		    	imgNum: 1,
		    	addID:'add',//添加图片的id，关联for
		    	contractFiles:[],//	合作合同 url
		    	contractKeys:[],//合作合同的文件 key
				pictureSrcArr:[],//显示的图片数组
		    }
	  	},
	  	watch:{ //监听
	  		pictureSrcArr:function(val , oldVal){//监听显示的图片数组的变化
	  			var that = this;
	  			that.$emit('child-say-key-arr',val);//将变化后的新数传给父件（key）
	  		}
	  	},
	    computed:{//计算属性
	    	
	    },
	  	methods: { 
	  		//组件传过来的数据
			listenImg: function(someData) {//替换图片
				var that = this;
				let _key ='';
				let _file = someData[0];//改变提交的file值
				let formData = new FormData();
				formData.append('file',_file)
				that.$axios({
					url:'/supplier/register_trade/upload_contract',
					data:formData,
					timeout: 10000, 
				})
				.then(function(response){
					_key = response.data.data.key
					for(var i=0;i<that.pictureSrcArr.length;i++){
						if(that.pictureSrcArr[i].key == someData[2]){
							that.pictureSrcArr[i].src = someData[1];//本地预览的base64
							that.pictureSrcArr[i].key = _key;//改变提交的key值
						}
					}
				})
				.catch(function(error){
					
				})
			},
			listenImgAdd: function(someData) {//添加图片
				var that = this;
				let _key ='';
				let _file = someData[0];//改变提交的file值
				let formData = new FormData();
				formData.append('file',_file)
				that.$axios({
					url:'/supplier/register_trade/upload_contract',
					data:formData,
					timeout: 10000, 
				})
				.then(function(response){
					_key = response.data.data.key;
					that.pictureSrcArr.push({
						src:someData[1]	,//本地预览的base64
						key:_key,
					})
				})
				.catch(function(error){
					
				})
				
				//that.pictureSrcArr[1].picture = someData[0];//改变提交的file值
				//that.pictureSrcArr[1].src = someData[1];//本地预览的base64
				if(that.isSubIdCard == true){//是否已经提交身份证
					that.fnUploadIdcard();
				}
			},
	  	},
	  	
		beforeCreate: function() { //创建前状态
			document.title = "上传多个图片";
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
			that.$axios({
				url:'/supplier/register_trade/query_trade',
				data:{
					centreId:'PAGODA'
				}
			})
			.then(function(response){
				if(response.data.code=='200'){
					for(var i=0;i<response.data.data.contractFiles.length;i++){
						that.pictureSrcArr.push({
							src:response.data.data.contractFiles[i],//预览的url
							key:response.data.data.contractKeys[i],
						})
					}
				}
			})
			.catch(function(error){
				
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
		background-color: #cdcdcd;
	}
	.zy_text{
		line-height: .3rem;
		text-align: center;
	}
</style>

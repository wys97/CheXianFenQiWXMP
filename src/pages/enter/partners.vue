<template>
		<div class="">
			<div class="screen_padding">
				<div class="">
					<div class="public_input_group">
						<label class="public_label must_input" for="">合作核心企业:</label>
						<form class="qy_form" @submit.prevent="fnSubmit">
							<div v-for="(item,index) in centreList" class="listItem mui-input-row mui-checkbox">
								<label style="height: 100%;"><img class="np_item_icon" src="static/img/icon_qy.png" alt="" />{{item.name}}</label>
								<input name="checkbox1" :value="item.name" v-model="checkedNames" type="checkbox"  :checked="item.remark">
							</div>
							<textarea  id="textarea"  v-model="otherName" @input="inputFunc" name="textarea" type="text" class="textarea" placeholder="输入其他更多合作核心企业">
							</textarea>
							<input type="submit" class="public_submit_input_disable " 
								:class="{public_submit_input: (isSuccess&&registerStatus!=='PASS') }" 
								:disabled="isSuccess&&registerStatus==='PASS'"
								value="提交" />
						</form>
					</div>
				</div>
			</div>
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
					idcardNo:''
				},
				centreList:[],
				registerStatus:'',//审批状态. registerStatus=AMENDING 时有值. INIT: 初始化 APPROVING: 待审核 (已更新) PASS: 通过 NOT_PASS: 不通过
				otherName:'',//文本框内容
				newCentreList:'',//提交的内容
				checkedNames:[],//复选框集合
			}
		},
		props: ['loading'],
		methods: {
			inputFunc:function(){
				var that = this;
				//判断输入内容是否都为空
				if(that.checkedNames.length>0||that.otherName) {
					this.isSuccess = true;
				} else {
					this.isSuccess = false;
				}
			},
			fnSubmit:function(){
				if(!this.isSuccess){
					return false;
				}
				let that =this;
				if(that.otherName){
					that.checkedNames.push(that.otherName)
				}
				let _data = that.checkedNames.join(",");
				that.$store.commit('loadStatus', {
					'bool': true,
					'txt': '验证中...'
				}); //提示...
				that.$axios({
					url:'/supplier/register/update_centre',
					data:{'centreList':_data}
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
			},
			getCentreList(){
				let that = this;
				that.$axios({
					url:'/supplier/register/centre_enterprise'
				})
				.then(function(response){
					that.$store.commit('loadStatus', {
						'bool': false,
						'txt': '成功...'
					}); //成功...
					if(response.data.code==='200'){
						that.centreList = response.data.data.centerName;
						for(var i=0;i<that.centreList.length;i++){
							if(that.centreList[i].remark){
								that.checkedNames.push(that.centreList[i].name);
								that.isSuccess = true;
							}
						}
						that.otherName = response.data.data.otherName;
					}
				})
				.catch(function(error){
				})
			}
		},
		watch:{
			checkedNames:function(val,oldVal){
				this.inputFunc();
			},
			otherName:function(val,oldVal){
				this.inputFunc();
			}
		},
		computed: { //计算属性

		},
		beforeCreate: function() { //创建前状态
			document.title = "合作核心企业";
		},
		created: function() { //创建完毕状态
		},
		beforeMount: function() { //挂载前状态
		},
		mounted: function() { //挂载结束状态
			var that = this;
			that.getCentreList();//获取合作企业列表
			that.$store.commit('loadStatus', {
				'bool': false,
				'txt': '成功...'
			}); //成功...
			let centreList = that.$route.params.centreList;//拿到上一个路由带过来的数据
			that.registerStatus = that.$route.params.registerStatus;//拿到上一个路由带过来的状态
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
	.mui-table-view{
		width: 100%;
		margin-top: .4rem;
	}
	.mui-table-view-radio .mui-table-view-cell .mui-navigate-right{
		padding: 20px 15px;
		font-size: .26rem;
	}
	.mui-table-view-radio .mui-table-view-cell.mui-selected .mui-navigate-right{
		color: #fc9d23;
	}
	.textarea{
		margin-top: .35rem;
		height: 2rem;
	}
	.listItem{
		height: 1.1rem;
    	line-height: 1.1rem;
		background-color: #fff;
		margin: .1rem -.25rem;
	}
	.np_item_icon{
    	height: .4rem;
    	width: .4rem;
    	margin-right: .1rem;
    	position: relative;
    	top: .1rem;
    }
    .mui-checkbox input[type=checkbox], .mui-radio input[type=radio]{
    	top: .25rem;
    }
</style>
<template>
  <div class="">
  	<ul class="pro_ul">
 			<li class="pro_li">
 				<div class="pro_a">
 					<div class="pro_a_content flex_l_between">
 						<span class="c_999">姓名</span>
 						<span>{{name}}</span>
 					</div>
 				</div>
 			</li>
 			<li class="pro_li">
 				<div class="pro_a">
 					<div class="pro_a_content flex_l_between">
 						<span class="c_999">手机</span>
 						<span>{{mobile}}</span>
 					</div>
 				</div>
 			</li>
 		</ul>
 		<div @click="deleteOperator" class="sub_btn" style="margin: .2rem auto;width: 90%;">删除</div>
	 	<!--<div  @click="deleteOperator" style="margin: .3rem auto;text-align: center;">
	 		<i class="mui-icon mui-icon-trash"></i>
	 	</div>-->
  </div>
</template>
<script>
	import { $resError,$subError } from '@/utils/muiAlert'
	import axios from 'axios'
	export default {
	  	name: '',
	  	data () {
		    return {
		    	name:'小明',
		    	mobile:'',
		    }
	  	},
	  	methods: { 
	  		deleteOperator:function(){
	  			var that = this;
	  			var btnArray = ['否', '是'];
					mui.confirm('删除后，该号码无法进行任何操作', '是否删除该手机号', btnArray, function(e) {
						if (e.index == 1) {
							that.$store.commit('loadStatus', {
								'bool': true,
								'txt': '删除中...'
							}); //成功...
							that.$axios({
								url: '/supplier/profile/delete_operator',
								data:{
									mobile:that.mobile,
								}
							}).then(function(response) {
								if(response.data.code=='200'){
									that.$router.push({
										path: '/smalMelting/profile/accountManage'
									});
								}
							}).catch(function(response) {
								var that = this;
								that.$store.commit('loadStatus', {
									'bool': false,
									'txt': '加载中...'
								}); //登录提示...
							})
						} else {
							
						}
					})
	  			
	  		}
	  	},
	  	watch:{//监听
	  	
	  	},
	    computed: {//计算属性
	    	
	    },
			beforeCreate: function() { //创建前状态
				document.title = "账号管理";
			},
			created: function() { //创建完毕状态
			},
			beforeMount: function() { //挂载前状态
			},
			mounted: function() { //挂载结束状态
				var that = this;
				that.mobile = that.$route.params.mobile;
				that.name = that.$route.params.name;
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
  .pf_top{
		height: 1.68rem;
		background-color: #fff;
		padding: .3rem .2rem;
	}
	.img_box{
		width: 1.06rem;
		height: 1.06rem;
		line-height: 1.06rem;
		text-align: center;
		border: 1px solid #e6e6e6;
		background-color: #e6e6e6;
		border-radius: 50%;
		-webkit-border-radius: 50%;
		margin-right: .25rem;
		font-size: .4rem;
		color: #fc9d23;
	}
	.pf_title{
		height: .6rem;
		line-height: .6rem;
		font-size: .32rem;
	}
	.pf_name{
		line-height: .4rem;
		font-size: .24rem;
	}
	.pro_ul{
		width: 100%;
		border-bottom: 1px solid #f1f1f1;
		margin-top: .1rem;
	}
	.pro_li{
		width: 100%;
	}
	.pro_a{
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
	.pro_a_content{
		width: 100%;
		height: 100%;
	}
	.mui-icon-arrowright:before{
		line-height: 1rem;
	}
</style>

<template>
  	<div class="">
  		<div class="np_top" style="background-image: url(static/img/banner2.png);">
  			<div class="flex_l_start">
  				<div>
  					<p class="np_top_status">
  						{{remark?'已打回（修改后再提交）':'待补充'}}
  					</p>
  					<p class="np_top_sm">{{remark?'打回原因：'+remark:'补充与合作供应企业的交易资料'}}</p>
  				</div>
  			</div>
  		</div>
  	    <div class="np_content">
  	    	<ul class="np_content_ul">
  	    		<li class="np_content_li" v-for="item in dataList">
  	    			<router-link :to="'/enter/kr/krDetails/'+item.centreId" class="np_item_a">
  	    				<div class="flex_l_between">
	  	    				<div>
	  	    					<img class="np_item_icon" src="static/img/icon_qy.png" alt="" />
	  	    					{{item.centreName}}
	  	    				</div>
	  	    				<div :class="(item.approveStatus == 'INIT'||item.approveStatus =='NOT_PASS')?'no_pass_status':'pass_status'
	  	    					">
	  	    					<span>
		  	    					{{(item.approveStatus == 'INIT')?'未提交':
		  	    					(item.approveStatus == 'APPROVING')?'已提交 ':
		  	    					(item.approveStatus == 'PASS')?'通过  ':
		  	    					(item.approveStatus == 'NOT_PASS')?'不通过  ':'--'}}
	  	    					</span>
	  	    					<i class="mui-icon mui-icon-arrowright"></i>
	  	    				</div>
  	    				</div>
  	    			</router-link>
  	    		</li>
  	    	</ul>
  	    </div>
	  	<div class="footer_btn" :class="suc?'footer_btn_pass':''" @click="submit">提交</div>
  	</div>
</template>
<script>
	import { $resError,$subError } from '@/utils/muiAlert'	
	export default {
	  	name: '',
	 	data () {	
		    return {
		    	dataList:[],//合作企业列表
		    	suc:false,//判断提交按钮的颜色
		    	remark:'',//打回原因
		    }
	  	},
	  	methods: { 
	  		submit:function(){
	  			let that = this;
				if(that.suc){
					that.$store.commit('loadStatus', {
						'bool': true,
						'txt': '提交中...'
					}); //成功...
		  			that.$axios({
						url:'/supplier/register_trade/submit',
					})
					.then(function(response){
						that.$store.commit('loadStatus', {
							'bool': false,
							'txt': '提交中...'
						}); //成功...
						if(response.data.code == '200'){
						  	that.$router.push({
								'path': '/enter/enterStatus/approvingWaitStatus'
							}); 
						}
					})
					.catch(function(error){
						that.$store.commit('loadStatus', {
							'bool': false,
							'txt': '提交中...'
						}); //成功...
					})
				}
	  		}
	 	},
	  	watch:{//监听	
	  		dataList:function(val,oldVal){
	  			for(let i=0;i<val.length;i++){
	  				if(val[i].approveStatus ==='NOT_PASS'||val[i].approveStatus ==='INIT'){
	  					this.suc = false;
	  					break;
	  				}else{
	  					this.suc = true;
	  				}
	  			}
	  			
	  		}
	  	},
	    computed: {//计算属性
	    },
		beforeCreate: function() { //创建前状态
			document.title = "补充贸易资料";
		},
		created: function() { //创建完毕状态
		},
		beforeMount: function() { //挂载前状态
		},
		mounted: function() { //挂载结束状态
			let that = this;
			that.$store.commit('loadStatus', {
				'bool': false,
				'txt': '成功...'
			}); //成功...
			that.$axios({
				url:'/supplier/register_trade/query_centre_list',
			})
			.then(function(response){
				if(response.data.code == '200'){
					that.dataList = response.data.data.list;
					that.remark = response.data.data.remark;
//					if(response.data.data.list[0].approveStatus=="APPROVING"){
//						that.suc = true;
//					}
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
    .np_top{
    	height: auto;
		width: 100%;
		padding: 9% .23rem;
		background-repeat: no-repeat;
		background-size: 100% 100%;
    }
    .np_img_box{
    	height: .9rem;
    	line-height: .9rem;
    	width: .9rem;
    	margin-right: .2rem;
    	border-radius: 50%;
    	-webkit-border-radius: 50%;
  		text-align: center;
  		background-color: #fc9d23;
  		color: #fff;
  		font-size: .3rem;
    }
    .np_top_status{
    	padding: .12rem 0;
    	font-size: .4rem;
    	color: #fff;
    }
    .np_top_sm{
    	font-size: .22rem;
    	color: #fff;
    	word-wrap: break-word;
    	line-height: .3rem;
    }
    .np_top_sm_red{
    	color: #e4301f;
    }
    .np_content{
    }
    .np_item_icon{
    	height: .4rem;
    	width: .4rem;
    	margin-right: .1rem;
    	position: relative;
    	top: .1rem;
    }
    .np_content_ul{
    	width: 100%;
    }
    .np_content_ul i{
    	position: relative;
    	top: -.02rem;
    	color: #ccc;
    }
    .np_content_li{
    	width: 100%;
    }
    .np_item_a{
    	display: inline-block;
    	height: 1.1rem;
    	line-height: 1.1rem;
    	width: 100%;
    	padding: 0 .13rem;
    	background-color: #fff;
    	margin-top: .24rem;
    	font-size: .26rem;
    }
    .pass_status{
    	color: #259B24;
    }
    .no_pass_status{
    	color: #E51C23;
    }
</style>

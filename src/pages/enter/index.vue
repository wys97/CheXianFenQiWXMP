<template>
  	<div class="" >
		<div class="np_top" style="background-image: url(static/img/banner2.png);">
			<div class="flex_l_start">
				<div>
					<p class="np_top_status">提交资料中</p>
					<p class="np_top_sm">请提交真实有效的入驻资料</p>
				</div>
			</div>
		</div>
		<div class="np_content">
			<ul class="np_content_ul">
				<li class="np_content_li">
					<router-link 
						:to="{name :'idcardRepre',params:{insuredIdCard:data.insuredIdCard}}"
						class="np_item_a">
						<div class="flex_l_between">
							<div>
								<img class="np_item_icon" src="/static/img/icon_fr.png" alt="" />
								被保人身份证
							</div>
							<div>
								<span :class="newApprove.insuredIdCard[0]" v-text="newApprove.insuredIdCard[1]"></span>
								<i class="mui-icon mui-icon-arrowright"></i>
							</div>
						</div>
					</router-link>
				</li>
				<li class="np_content_li">
					<router-link 
						:to="{name :'businessLicense'}" 
						class="np_item_a">
						<div class="flex_l_between">
							<div>
								<img class="np_item_icon" src="/static/img/icon_qy.png" alt="" />
								被保人行驶证
							</div>
							<div>
								<span :class="newApprove.insuredCarLicense[0]" v-text="newApprove.insuredCarLicense[1]"></span>
								<i class="mui-icon mui-icon-arrowright"></i>
							</div>
						</div>
					</router-link>
				</li>
			</ul>
		</div>
		<div class="footer_btn" @click="submit" :class="{footer_btn_pass:valid}">提交</div>
  	</div>
</template>
<script>
	import { $resError,$subError } from '@/utils/muiAlert'
	const axiosRequest = require("axios");
	export default {
	  	name: '',
	 	data () {	
		    return {
				susmissionstatus:{
					insuredIdCard:false,
					insuredCarLicense:false,
				},
				data:{},	
				valid:false,	    	
		    }
	  	},
	  	watch:{//监听
	    	registerStatus:function(val){
	    		if(val==='trul'||val==='false'){
	    			this.iswait = false;
	    		}else{
	    			this.iswait = true;
	    		}
	    	}
	  	},
	    computed: {//计算属性
	    	
	    	newApprove:function(){
	    		let List = {
		    		insuredCarLicense:['','--'],
		    		insuredIdCard:['','--'],
				};
				
	    		for(var key in this.susmissionstatus){
	    			if(this.susmissionstatus[key] === false){	
	    				List[key] = ['no_pass_status','未填写'];
	    			} else if(this.susmissionstatus[key] === true){
	    				List[key] = ['pass_status','已填写'];
	    			}
				}
	    		return List;
	    	}
	    },
		beforeCreate: function() { //创建前状态
			document.title = "提交基础资料";
		},
		created: function() { //创建完毕状态
			this.getDetail();//获取入驻资料
		},
		beforeMount: function() { //挂载前状态
		},
		mounted: function() { //挂载结束状态
			let that = this;
		},
	  	methods: { 
	  		getDetail (){
	  			let that = this;
				that.$store.commit('loadStatus', {'bool': true,'txt': '加载中...'}); //成功...
				that.$axios({
					url:'/wxmp-api/customer/finance/write-status',
					methods: 'get',
				})

				.then(function(response){
					that.$store.commit('loadStatus', {'bool': false,'txt': '成功...'}); //成功...
					if(response.data.code ==="200"){
						that.susmissionstatus.insuredIdCard = response.data.data.insuredIdCard;
						that.susmissionstatus.insuredCarLicense = response.data.data.insuredCarLicense;
						if(response.data.data.insuredIdCard&&response.data.data.insuredCarLicense){
							that.valid=true
						}else{
							that.valid=false
						}
					}
				})
				.catch(function(error){
//					that.$store.commit('loadStatus', {'bool': false,'txt': '...'}); 
				})
	  		},
	  		submit:function(){
	  			var that = this;
	  			if(that.valid){
					that.$store.commit('loadStatus', {'bool': true,'txt': '提交中...'}); //提示...
					that.$axios({
						url:'/wxmp-api/customer/finance/create-finance-order',
						method: 'POST',
  						headers: { 'content-type': 'application/x-www-form-urlencoded' },
					})
					.then(function(res){
						that.$store.commit('loadStatus', {'bool': false,'txt': '成功...'}); //成功...
						if(res.data.code=='200'){
							that.$router.push({
								path: '/enter/enterStatus/waitStatus'
							});
						}else{
							$resError(res.data.message)
						}
					})
	  			}else{
	  				mui.toast(`
				  	<div  class="toast_content" >
					  	<div class="toast_text">请补全入驻资料</div>
					  </div>
					`);
	  			}
	  		}
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
		height: auto !important;
		width: 100% !important;
		padding: 9% 18px;
		background-repeat: no-repeat;
		background-size: 100% 100% !important;
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
    	padding: 18px 0;
    	font-size: 25px;
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
    	height: 25px;
        width: 25px;
        margin-right: 8px;
        position: relative;
        top: 6px;
    }
    .np_content_ul{
    	width: 100%;
    	padding-bottom: 1rem;
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
        height: 65px;
        line-height: 61px;
        width: 100%;
        padding: 0 12px;
        background-color: #fff;
        margin-top: 15px;
        font-size: 18px;
    }
    .pass_status{
    	color: #259B24;
    }
    .no_pass_status{
    	color: #E51C23;
    }
	.footer_btn {
    position: fixed;
    bottom: 177px;
    width: 96%;
    height: 6vh;
    line-height: 6vh;
    text-align: center;
    color: #fff;
    background-color: #dadada;
    font-size: 20px;
    border-radius: 20px;
    left: 10px;
	}
	.aas{
		width: 20px;
		height: 20px
	}
</style>

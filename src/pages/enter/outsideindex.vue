<template>
    <div class="" >
        <div class="bystages_title" style="background-image: url(static/img/banner2.png);">
            <div class="flex_l_start">
                <div>
                    <p class="np_top_status">分期申请</p>
                </div>
            </div>
        </div>
        <div class="np_content">
            <ul class="np_content_ul">
                <li class="np_content_li">
                    <router-link 
	  	    			:to="{name :'enrollIndex'}" 
	  	    			class="np_item_a">
	  	    			<div class="flex_l_between">
		  	    			<div>
		  	    				<img class="np_item_icon" src="static/img/icon_qy.png" alt="" />
		  	    				提交申请信息
		  	    			</div>
		  	    			<div>
			  	    			<span>提交</span>
			  	    			<i class="mui-icon mui-icon-arrowright"></i>
		  	    			</div>
	  	    			</div>
	  	    		</router-link>
                </li>
                <li class="np_content_li">
	  	    		<router-link 
	  	    			:to="{name :'enrollOrderInquiry'}"
	  	    			class="np_item_a">
	  	    			<div class="flex_l_between">
		  	    			<div>
		  	    				<img class="np_item_icon" src="static/img/icon_fr.png" alt="" />
		  	    				分期订单查询
		  	    			</div>
		  	    			<div>
			  	    			<span>提交</span>
			  	    			<i class="mui-icon mui-icon-arrowright"></i>
		  	    			</div>
	  	    			</div>
	  	    		</router-link>
	  	    	</li>
            </ul>
        </div>
    </div>
</template>
<script>
import { $resError,$subError } from '@/utils/muiAlert'

export default {
    name:'',
    beforeCreate: function() { //创建前状态
		document.title = "分期申请信息";
	},
}
</script>

<style scoped>
    .bystages_title{
    	height: auto;
		width: 100%;
		padding: 9% 18px;
		background-repeat: no-repeat;
		background-size: 100% 100%;
    }
    .np_top_status{
    	padding: 18px 0;
    	font-size: 25px;
    	color: #fff;
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
</style>
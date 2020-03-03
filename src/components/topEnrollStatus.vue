<template>
	<div>
		<div class="cp_top_box">
			<div class="cp_top_line"></div>
			<div class="flex_l_around" style="position: relative;">
				<div class="cp_top_item">
					<div class="circle " :class="{circle_finsh:isPage[0]}">1</div>
					<div class="black font_24">实名认证</div>
				</div>
				<div class="cp_top_item">
					<div class="circle" :class="{circle_finsh:isPage[1]}">2</div>
					<div class="black font_24">企业信息</div>
				</div>
				<div class="cp_top_item">
					<div class="circle" :class="{circle_finsh:isPage[2]}">3</div>
					<div class="black font_24">法定代表人信息</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	import { $resError,$subError } from '@/utils/muiAlert'
	export default{
		name:"top-enroll-status",
		data(){
			return{
				
			}
		},
		props:{
			isPage:{//一次最多可以上传多少张照片
                type:Array,
                default:[true,false,false]
            }
			
		}
	}
</script>
<style scoped>
	.cp_top_box{
		position: relative;
		height: 1.4rem;
		width: 100%;
		padding:0 5% ;
		text-align: center;
		background-color: #ffb923;
	}
	.cp_top_line{
		position: absolute;
		top: .5rem;
		left: 18%;
		width: 64%;
		height: .03rem;
		background-color: #c4c4c4;
	}
	.cp_top_item{
		width: 30%;
	}
	.circle{
		height: .5rem;
		width: .5rem;
		line-height: .5rem;
		text-align: center;
		margin:.26rem auto .19rem; 
		font-size: .3rem;
		border-radius: 50%;
		-webkit-border-radius: 50%;
		background-color: #cccccc;
		color: #fcfcfc;
	}
	.circle_finsh{
		background-color: #f24b43;
	}
</style>
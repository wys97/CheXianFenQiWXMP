<template>
	<div class="">
		<div v-for="(item,index) in centreList">
			<div  @click="goSelectAccount(item.centreId)" class="centre_a">
				<div class="flex_v_center name font_36 text_c"> 
					<div>
						<span>{{item.centreName}}</span>
					</div>
				</div>
				<div  class="rate">日利率{{item.interestRate}}%</div>
			</div>
		</div>
	</div>
</template>
<script>
	import { $resError,$subError } from '@/utils/muiAlert'
	export default {
		name: '',
		data() {
			return {
				centreList:[],
			}
		},
		methods: {
			goSelectAccount(centreId){
				var that = this;
				that.$router.replace({'path':'/smalMelting/finance/selectAccount/'+centreId})
			}
		},
		watch: { //监听
			
		},
		computed: { //计算属性

		},
		beforeCreate: function() { //创建前状态
			document.title = "选择融资核心企业";
			var that = this;
			that.$store.commit('loadStatus', {'bool': true,'txt': '加载中...'}); 
			that.$axios({
				url:'/supplier/finance/choice_centre'
			})
			.then(function(res){
  				that.$store.commit('loadStatus', {'bool': false,'txt': '加载中...'}); 
				if(res.data.code=='200'){
					if(res.data.data.length===1){
						that.$router.replace({'path':'/smalMelting/finance/selectAccount/'+res.data.data[0].centreId})
					}else{
						that.centreList = res.data.data;
					}
				}
			})
		},
		created: function() { //创建完毕状态
			var that = this;
			that.$store.commit('loadStatus', {
				'bool': false,
				'txt': '成功...'
			}); //成功...
		},
		beforeMount: function() { //挂载前状态
		},
		mounted: function() { //挂载结束状态
			
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
	.centre_a{
		position: relative;
		width: 80%;
		height: 3rem;
		border-radius: .1rem;
		-webkit-border-radius:.1rem;
		padding: .1rem .2rem;
		margin: .5rem auto .5rem;
		color: #727272;
		background-color: #fff;
		box-shadow:0px 0px 5px 1px #e6d38d;
		-webkit-box-shadow: 0px 0px 5px 1px #e6d38d;
		/*background: -webkit-linear-gradient(180deg,#fde3c2,#edc28b);
		background: linear-gradient(180deg,#fde3c2,#edc28b); */
	}
	.name{
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translateX(-50%) translateY(-50%);
	}
	.rate{
		position: absolute;
		bottom: .3rem;
		right: .4rem;
		text-align: right;
	}
</style>
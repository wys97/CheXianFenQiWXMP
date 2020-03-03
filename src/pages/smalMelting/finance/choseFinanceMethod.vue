<template>
	<div>
		<div class="box top" @click="intoFinancePage('ORDER')">订单融</div>
		<div class="box bottom" @click="intoFinancePage('CASH')">现金融</div>
	</div>
</template>
<script>
	import { $resError,$subError } from '@/utils/muiAlert'
	export default {
		name: '',
		data() {
			return {
			}
		},
		methods: {
			intoFinancePage:function(type) {
				let that = this;
				if (type === 'ORDER') {
					// 进入订单融
					that.$router.push({'path':'/smalMelting/finance/selectAccount'})
				} else if (type === 'CASH') {
					// 进入现金融
					that.$router.push({'path':'/smalMelting/finance/applyFinance/needless/needlses/needless/CASH'})
				} else {
					$subError("请选择正确的融资方式");
				}
			},
		},
		watch: { //监听
		},
		computed: { //计算属性

		},
		beforeCreate: function() { //创建前状态
			document.title = "选择融资方式";
		},
		created: function() { //创建完毕状态
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
	.box {
		width: 3rem;
		line-height: 1.5rem;
		border-radius: .2rem;
	    text-align: center;
	    margin: 0 auto;
		background-color: #fc9d23;
		color: #fff;
		font-size: 0.5rem;
	}
	.top {
		margin-top: 2.5rem;
		margin-bottom: 1.5rem;
	}
	.bottom {
		margin-bottom: 3rem;
	}
</style>

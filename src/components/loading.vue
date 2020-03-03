<template>
	<div class="flex_l_center loding_pop" v-show="$store.state.loadStatus.show">
		<div class="loading_ibox">
			<img src="static/img/status.gif"/>
			<p class="loading_text">{{$store.state.loadStatus.status}}</p>
		</div>
	</div>
</template>
<script>
	export default{
		data(){
			return{
			}
		}
	}
</script>
<style scoped>
	.loding_pop{
		height: 100%;
		width: 100%;
		position: fixed;
		z-index: 123;
	}
	.loading_ibox{
		display: inline-block;
		margin: auto;
		text-align: center;
		padding: .35rem .25rem .25rem;
		min-width: 1.8rem;
		min-height: 1.8rem;
		background-color: rgba(205,205,205,.3);
		border-radius: .1rem;
		-webkit-border-radius: .1rem;
	}
	.loading_text{
		margin-top: .2rem;
		color: #4e4e4e;
		font-size: .24rem;
	}
</style>
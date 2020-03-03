<template>
  	<div id="bgFaf" class="bg_sm">
		<div class="mui-content">
			<router-view></router-view>
		</div>
		<com-footer></com-footer>
  	</div>
</template>
<script>
	import { $resError,$subError } from '@/utils/muiAlert'
	import footer from './components/footer'
	export default {
		components:{
			'com-footer':footer,
		},
	  	name: '',
	  	data () {
		    return {
		    	title:'融资'
		    }
	  	},
	  	methods: { 
	 	},
	 	watch:{//监听
	  	
	  	},
	    computed: {//计算属性
	    	
	    },
		beforeCreate: function() { //创建前状态
			document.title = '融资';
		},
		created: function() { //创建完毕状态
		},
		beforeMount: function() { //挂载前状态
		},
		mounted: function() { //挂载结束状态
			var that = this;
			that.$store.commit('loadStatus', {
				'bool': false,
				'txt': '加载中...'
			}); //登录提示...
			
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
	/*底部*/
	.footer_bar{
		
	}
	.mui-bar-tab .mui-tab-item.mui-active {
	    color: #2fbc71;
	}
	.mui-bar-tab .mui-tab-item .mui-icon{
		top: -.06rem;
		left: -.02rem;
		font-size: .45rem;
	}
	.mui-bar-tab .mui-tab-item .mui-icon~.mui-tab-label{
		font-size: .22rem;
	}
</style>

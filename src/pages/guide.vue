<template>
  <div class="">
	  <div>demo</div>
  </div>
</template>
<script>
	import { $resError,$subError } from '@/utils/muiAlert'
	export default {
	  name: '',
	  data () {
		  return {
		  }
	  },
	  watch:{//监听
	  	
	  },
	  computed: {//计算属性
	    	
	  },
		beforeCreate: function() { //创建前状态
			document.title = "活体检测";
		},
		created: function() { //创建完毕状态
		},
		beforeMount: function() { //挂载前状态
		},
		mounted: function() { //挂载结束状态
			var that = this;
			that.$store.commit('loadStatus', {
				'bool': false,
				'txt': '成功...'
			}); //成功...
		},
	  methods: { 
	  	
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
  
</style>

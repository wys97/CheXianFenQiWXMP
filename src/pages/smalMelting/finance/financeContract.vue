<template>
  <div class="">
  </div>
</template>
<script>
	import { $resError,$subError } from '@/utils/muiAlert'
	export default {
		name: '',
		data () {
		    return {
		    	receivableNo:'',
		    }
		},
		methods: { 
		  	
		},
		watch:{//监听
		  	
		},
	    computed: {//计算属性
	    	
	    },
		beforeCreate: function() { //创建前状态
			document.title = "应收账款转让与回购协议";
		},
		created: function() { //创建完毕状态
		},
		beforeMount: function() { //挂载前状态
			var that = this;
			that.receivableNo = that.$route.query.receivableNo;
			if(that.receivableNo){
				that.$store.commit('loadStatus', {
					'bool': false,
					'txt': '成功...'
				}); //成功...
				that.$axios({
					url:'/supplier/finance/view_finance_contract',
					data:{
						receivableNo:that.receivableNo
					}
				})
				.then(function(res){
					window.location.href =  res.data.data.previewUrl;
					
				})
				.catch(function(error){
					
				})
			}else{
				/*window.history.go(-2)*/
			}
			
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
  
</style>

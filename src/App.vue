<template>
  <div id="app">
  	<app-loading></app-loading>
		<!-- 路由出口 -->
		<!-- 点击<router-link>的时候指定的页面将渲染在这里 -->
    <router-view  @suc="getLoading"   />
  </div>
</template>
<script>
	import { $resError,$subError } from '@/utils/muiAlert'
import Loading from './components/loading'
export default {
  name: 'App',
  provide(){
      return{
        reload:this.reload
      }
    },
  components:{
			'app-loading':Loading
	},
  data () {
    return {
	  	loading: false,  //隐藏内容
		isRouterAlive:true,
    }
  },
  methods: { 
	  
    	changeIcon:function(){
    	 },
    	fetchdata:function(){
     	},
     	getLoading:function(mes){
     		
     	},
     	/*获取指定的URL参数值  */
			getQueryString:function(name) { 
				var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); 
			    var r = window.location.search.substr(1).match(reg); 
			    if (r != null) return unescape(r[2]); 
			    return null; 
			}  

  },
  watch:{
  	//监听路由切换回调
  	'$route':'fetchdata' 
  },
  beforeCreate:function(){
  	
  },
  //创建完毕状态
  created: function () {
  	
	},
  /*挂载结束状态*/
	mounted:function() {
	},
	beforeUpdate:function(){
	},
	updated:function(){
	}
}
</script>

<style scoped>
*{
	margin: 0;
	padding: 0;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>

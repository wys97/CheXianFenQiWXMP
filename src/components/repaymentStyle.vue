<template>
  <div class="mui-content">
	  <form class="mui-input-group" style="background-color: transparent;">
			<div class="mui-input-row mui-checkbox  mui-right" >
				<label for="'checkbox1'" style="height: 100%;">
					<div  class="fil_a">
						<div class="fil_je_num fil_bg_font">123123</div>
						<div class="fil_je_sm c_666">可融金额（元）</div>
					</div>
				</label>
				<input v-model="checkedNames" @change="selectChange" id="checkbox1" name="checkbox1" value="21" type="checkbox" >
			</div>
			<ul class="mui-table-view">
				<li class="mui-table-view-cell mui-collapse mui-active">
					<a class="mui-navigate-right" href="#">还款计划</a>
					<div class="mui-collapse-content">
						内容
					</div>
				</li>
			</ul>
			<div class="mui-input-row mui-checkbox  mui-right" style="margin-top: 20px;">
				<label for="'checkbox2'" style="height: 100%;">
					<div  class="fil_a">
						<div class="fil_je_num fil_bg_font">123123</div>
						<div class="fil_je_sm c_666">可融金额（元）</div>
					</div>
				</label>
				<input  v-model="checkedNames"  @change="selectChange" id="checkbox2" name="checkbox1" value="22" type="checkbox" >
			</div>
		</form>
  </div>
</template>
<script>
	import { $resError,$subError } from '@/utils/muiAlert'
	export default {
	  name: '',
	  data () {
		  return {
		  	checkedNames:['22']
		  }
	  },
	  watch:{//监听
	  	checkedNames(val,oldVal){
	  		if(val.length===0){
	  			val = oldVal
	  			this.checkedNames = val
	  		}else if(val.length>=2){
	  			val = oldVal
	  			this.checkedNames = val
	  		}
	  	}
	  },
	  computed: {//计算属性
	    	
	  },
		beforeCreate: function() { //创建前状态
			document.title = "还款方式";
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
	  	selectChange(event){
	  		console.log(event.target.value)
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
  .mui-checkbox label{
  	padding-right: 0;
  }
  .mui-input-row label{
  	padding: 0;
  }
  .mui-input-group .mui-input-row:after{
  	height: 0;
  }
  .mui-checkbox input[type=checkbox], .mui-radio input[type=radio]{
  	top: .5rem;
  }
  .mui-content>.mui-card:first-child{
  	margin-top: 0px;
  }
  /*.mui-table-view-cell.mui-active{
  	background-color: #fff;
  }*/
  /*.mui-table-view:before{
  	width: 90%;
  	margin: auto;
  }*/
  .mui-table-view-cell{
  	padding: .11rem .15rem;
  }
  .mui-table-view-cell>a:not(.mui-btn){
  	margin: 0;
  	padding: .06rem 0;
  }
  .fil_a{
  	min-height: .15rem;
  	margin-bottom: 0;
  }
</style>

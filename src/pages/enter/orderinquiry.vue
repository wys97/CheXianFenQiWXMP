<template>
<div>
  <div class="orderList" v-for="item in listData" @click="goDetails(item.financeOrderId)">
    <div>
      <p>
        <span style="margin-right:20px; font-size:18px; font-weight:700">{{item.installmentAmount}}</span>
        <span style="color:#6D6D6D">期数：{{item.installmentNum}}</span>
      </p>
      <div style="margin-top: 15px; color:#6D6D6D" v-if="item.licenseNo">{{item.licenseNo}}</div>
    </div>
    <div>
      <span style="margin-right:15px; color:#05CE40" v-if="item.statusText=='正常'">{{item.statusText}}</span>
      <span style="margin-right:15px; color:red" v-else-if="item.statusText=='审核失败'">{{item.statusText}}</span>
      <span style="margin-right:15px; color:#6D6D6D" v-else>{{item.statusText}}</span>
      <i class="r_arrows"></i>
    </div>
  </div> 
</div>
</template>
<script>
import { $resError, $subError } from "@/utils/muiAlert";
const axios = require('axios');
export default {
  data() {
    return {
      listData:[],
    };
  },
  name: "",
  beforeCreate: function() {
    //创建前状态
    document.title = "分期订单信息";
     axios({
      url:'/wxmp-api/customer/finance/order/list',
      method:'get',
    }).then(res=>{
      if(res.data.code=='200'){
        this.listData = res.data.data
      }
     
    })
  },
  methods:{
    goDetails(id){
      this.$router.push({path:'/enter/roderDetails/'+id})
    }
  }
 
};
</script>
<style scoped>
.orderList {
  font-size: 16px;
  display: flex;
  height: 80px;
  align-items: center;
  justify-content: space-between;
  padding: 12px 20px;
  border-bottom: 1px solid #EFEFEF;
  background: #fff;
}
.r_arrows {
  border:1px solid #6D6D6D;
  border-width: 0 1px 1px 0;
  display: inline-block;
  padding: 4px;
  transform: rotate(-45deg);
  -webkit-transform: rotate(-45deg);
}
</style>
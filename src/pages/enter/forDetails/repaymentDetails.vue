<template >
  <div class="repayment">
    <div class="title">
      <p style="font-weight:700; ">订单分期详情</p>
      <p>业务单号：{{data.financeOrderId}}</p>
      <p>分期总额：{{data.installmentAmount}}</p>
      <p>分期期数：{{data.installmentNum}}期</p>
      <p>申请时间：{{data.applyTime}}</p>
      <p>放款时间：{{data.payEndTime}}</p>
    </div>
    <div class="two">
      <p>首付：{{data.firstAmount}}元</p>
      <div style="color: rgb(79, 82, 81); margin-top:10px">
        ( 交强{{data.strongAmount}}元+车船{{data.taxAmont}}元+保证金{{data.depositAmount}}元+线上服务费{{data.onlineServiceCharge}}元 )
        <p style="color: rgb(79, 82, 81);margin-top:8px">首付保证金率=100%/总期数</p>
      </div>
    </div>
    <div class="three">
      <p style="padding: 0 18px">还款计划：</p>
      <div
        class="detaildsFrom"
        v-if="data.repayPlanList.length!==0"
        v-for="(item, index) in data.repayPlanList"
        :key="index"
      >
        <div>
          <span>{{item.dueDate}}</span>
          <span>（第{{item.periodNo}}期）</span>
        </div>
        <div>
          <span>{{item.payableAmount}}元</span>
          <span v-if="item.lateFee!==null||item.lateFee">（{{item.lateFee}}）</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
const axios = require("axios");
export default {
  data() {
    return {
      data: {}
    };
  },
  beforeCreate() {
    document.title = "还款计划";
    axios({
      url:
        "/wxmp-api/customer/finance/order/repay-plan/" + this.$route.params.id,
      method: "get"
    }).then(res => {
      if (res.data.code == "200") {
        this.data = res.data.data;
      }
    });
  }
};
</script>
<style scoped>
.repayment {
  width: 100%;
  height: 100%;
  font-size: 16px;
}
.title {
  line-height: 30px;
  background: #fff;
  padding: 14px 18px;
  margin: 10px 12px 0;
  border-radius: 6px;
  color: rgb(79, 82, 81);
}
.two {
  margin: 10px 12px;
  line-height: 25px;
  background: #fff;
  padding: 14px 18px;
  border-radius: 6px;
}
.three {
  padding: 18px 0 0;
  background: #fff;
  min-height: 200px;
  margin: 0 12px 15px;
  border-radius: 6px;
}
.detaildsFrom {
  padding: 0px 18px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 10px;
  border-bottom: 1px solid #ccc;
  height: 50px;
  line-height: 50px;
  color: rgb(79, 82, 81);
}
.detaildsFrom:last-child {
  border-bottom: none;
}
</style>

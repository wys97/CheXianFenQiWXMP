<template>
    <div class="roderDetails">
        <p style="padding:0 18px;">业务单号：{{listData.financeOrderNo}}</p>
        <p style="padding:0 18px;">订单状态：{{listData.statusText}}</p>
        <p style="padding:0 18px;">被保人：{{listData.insuredName}}</p>
        <p style="padding:0 18px;">被保人手机号：{{listData.insuredPhone}}</p>
        <p style="padding:0 18px;">车牌号码：{{listData.licenseNo}}</p>
        <p style="padding:0 18px;">分期总额：{{listData.installmentAmount}}</p>
        <p style="padding:0 18px;">分期期数：{{listData.installmentNum}}</p>
        <p style="padding:0 18px;">还款方式：{{listData.repayMethodText}}</p>
        <div class='hint'>好借好还，再借不难！</div>
        <div class="flex_btn" v-if="listData.status=='NORMAL'">
            <p class="btn" @click="goPolicyDetails(listData.financeOrderId)">查看保单</p>
            <p class="btn" @click="repaymentDetails(listData.financeOrderId)">还款计划</p>
        </div>
    </div>
</template>
<script>
const axios = require('axios');
export default {
    data(){
        return{
            listData:{}
        }
    },
    beforeCreate(){
    document.title = "分期订单详情";
  
        axios({
            url:'/wxmp-api/customer/finance/order/get/'+this.$route.params.id,
            method:'get'
        }).then(res=>{
           if(res.data.code=='200'){
               this.listData=res.data.data
           }
        })
    },
    methods:{
        //保单信息
        goPolicyDetails(id){
            this.$router.push({path:'/enter/policyDetails/'+id})
        },
        //还款计划
        repaymentDetails(id){
            this.$router.push({path:'/enter/repaymentDetails/'+id})

        }
    }
}
</script>
<style scoped>
.roderDetails{
        padding: 18px 0 0;
    font-size: 16px;
    line-height: 32px;
    background: #fff;
    margin: 12px;
    border-radius: 6px;
}
.hint{
text-align:center;
color:#999;
height: 70px;
line-height: 70px;
border-bottom: 0.5px solid #999
}
.flex_btn{
    display: flex;
    align-items: center;
    justify-content: space-around;
    padding: 30px 0;
}
.btn{
    width: 100px;
    height: 36px;
    line-height: 36px;
    border-radius: 25px;
    background: #409EFF;
    text-align: center;
    color: #fff
}
</style>
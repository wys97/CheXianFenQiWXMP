<template>
    <div class="policy">
        <p>保险公司：{{data.policyCompanyName}}</p>
        <p>保费总额：{{data.premiumTotalAmount}}元</p>
        <p>商业险金额：{{data.commerceInsuranceAmount}}元</p>
        <p>交强险金额：{{data.strongAmount}}元</p>
        <p>车船税金额：{{data.taxAmont}}元</p>
        <div>
        <span style="vertical-align:top">电子单据：</span>
        <img :src="data.policyUrl" style='width:70%;height:auto'/>
        </div>
    </div>
</template>
<script>
const axios = require('axios')
export default {
    data(){
        return{
            data:{}
        }
    },
    beforeCreate(){
        document.title = "保单信息";
        axios({
            url:'/wxmp-api/customer/finance/order/policy/'+this.$route.params.id,
            method:'get',

        }).then(res=>{
            if(res.data.code=='200'){
                this.data = res.data.data
            }
        })
    }
}
</script>
<style scoped>

.policy{
    height: 100%;
font-size: 16px;
  color: rgb(79, 82, 81);
line-height: 30px;
background: #fff;
border-radius: 6px;
padding: 15px ;
}
</style>
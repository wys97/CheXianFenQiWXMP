<template>
    <div id="bgLogin">
        <div class="bg_box" style="background-image: url(static/img/banner3.jpeg);">
            <div class="bg_content">
                <div>
                    <div class="loan_title">OTA应收，借钱快</div>
                    <div class="loan_subtitle"><span class="subtitle_text">无抵押</span><span class="subtitle_text">放款快</span><span class="subtitle_text">成本低</span></div>
                    <div class="loan_advantage">
                        <span>
                            <div class="content_red">500万元</div>
                            <div class="content_normal">最高额度</div>
                        </span>
                        <span>
                            <div class="content_red">1~12个月</div>
                            <div class="content_normal">借款期限</div>
                        </span>
                        <span>
                            <div class="content_red">等额/先息</div>
                            <div class="content_normal">还款灵活</div>
                        </span>
                        <span>
                            <div class="content_red">日息0.39%</div>
                            <div class="content_normal">借款费率</div>
                        </span>
                    </div>
                </div>
            </div>
        </div>
        <div class="logo_form_box">
            <div class="content_title">产品简介</div>
            <div class="content">
                <p>OTA应收贷是迅鹿金融面向OTA供应商，有稳定OTA应收账款的旅行社提供的纯信用、无抵押贷款融资服务。</p>
            </div>
            <div class="content_title">资金用途</div>
            <div class="content">
                <p>经营周转等。</p>
            </div>
            <div class="content_title">申请条件</div>
            <div class="content">
                <p>申请资格：<span>中国大陆境内具有独立法人主体；</span></p>
                <p>年龄要求：<span>实际控制人年龄25~60周岁；</span></p>
                <p>企业运营：<span>2年及以上；</span></p>
                <p>信用状况：<span>信用状况良好，当前无逾期；</span></p>
                <p>年营业额：<span>2000万元及以上；</span></p>
                <p>在线交易：<span>OTA平台应收账款（如携程、途牛等）；</span></p>
            </div>
        </div>
        <button class="base_btn" @click="regist">立即申请</button>
    </div>
</template>
<script>
    import { $resError,$subError } from '@/utils/muiAlert'
    import axios from 'axios/index'
    import Upload from '../../../components/imageUpload'
    // import { setIsLogin,setLoginName,getIsLogin,getLoginName} from '@/utils/user'
    export default {
        name: '',
        components: {
            'image-html5-upload': Upload
        },
        data() {
            return {
            }
        },
        props: ['loading'],
        methods: {
            regist: function() {
                window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx526d26e325caa749&redirect_uri=https%3a%2f%2fscf-xunlu.xiaorongtech.com%2fwxmp%2findex.html%3flogintype%3dREGIST%23%2fenroll&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect';
            }
        },
        watch: { //监听

        },
        computed: { //计算属性

        },
        beforeCreate: function() { //创建前状态
        },
        created: function() { //创建完毕状态
        },
        beforeMount: function() { //挂载前状态

        },
        mounted: function() { //挂载结束状态
            let that = this;
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
<style scoped >
    .bg_box{
        height: auto;
        width: 100%;
        padding-top: 10%;
        border-radius: .1rem;
        -webkit-border-radius: .1rem;
        background-repeat: no-repeat;
        background-size: 100% auto;
    }
    .bg_box .bg_content .loan_title {
        font-size: .45rem;
        font-weight: 600;
        color: #FCFF00;
        padding: 3% 0;
        text-align: center;
    }
    .bg_box .bg_content .loan_subtitle {
        font-size: .25rem;
        font-weight: 600;
        padding: 2% 0;
        text-align: center;
    }
    .bg_content .loan_subtitle .subtitle_text{
        padding: 0 5%;
        color: #ffffff;
    }
    .loan_advantage{
        text-align: center;
    }
    .loan_advantage span{
        display: inline-block;
        height: 1.25rem;
        width: 1.25rem;
        background-color: #fff;
        border-radius: 0.6rem;
        margin: 1%;
        margin-top: 10%;
        margin-bottom: 5%;
        font-size: .24rem;
    }
    .content_red{
        color: #FF5600;
        height: .62rem;
        padding-top: .30rem;
        line-height: .32rem;
    }
    .content_normal{
        color: #999999;
        height: .55rem;
        line-height: .4rem;
        font-size: .22rem;
    }
    .logo_form_box{
        padding: 5%;
        background-color: #ffffff;
        font-size: .27rem;
    }
    .logo_form_box .content_title{
        color: #335695;
        font-weight: bold;
        height: .6rem;
        line-height: .6rem;
        border-bottom: 1px solid #335695;
    }
    .logo_form_box .content{
        line-height: .4rem;
        padding: 5% 0;
    }
    .logo_form_box p{
        color: #333333;
    }
    .logo_form_box p span{
        color: #2E2E2E;
        font-weight: bold;
    }
    .base_btn{
        background-color: #335695;
        color: #ffffff;
        width: 100%;
        font-size: .30rem;
        height: .80rem;
    }
</style>

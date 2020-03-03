<template>
    <div class="register_box">
        <!-- <div class="register_header">
            <div class="register_header_left" @click="goBack">
                <span class="iconfont icon-back"></span>
                <span>返回</span>
            </div>
            <div class="register_header_title">
                <p class="register_header_title_p">企业注册</p>
            </div>
            <div class="register_header_right">
                <span class="iconfont icon-more"></span>
            </div>
        </div> -->
        <div class="register_con">
            <div class="res_chatperson">
                <p>业务员</p>
                <input v-model="salesmanName" @input="inputFunc" type="text" value="" />
            </div>
            <!-- <div class="res_chatperson">
                <p>企业信息</p>
                <input v-model="comInfo" @input="inputFunc" type="text" value="" />
            </div> -->
            <div class="res_chatperson">
                <template v-if="paramCode !== ''">
                    <p>推荐码</p>
                    <input readonly v-model="recommendCode" @input="inputFunc" type="text" value="" />
                </template>
                <template v-else>
                    <p>推荐码 (选填) </p>
                    <input v-model="recommendCode" @input="inputFunc" type="text" value="" />
                </template>
            </div>
            <div class="res_chatperson">
                <input class="res_submit" @click="nextStep()" v-bind:class="{black_register_btn: isSuccess }" type="submit" value="下一步" />
            </div>

        </div>
    </div>

</template>

<script>
    import {$resError} from '@/utils/muiAlert'

    export default {
        data(){
            return{
                salesmanName:"",
                // comInfo:"",
                // userInfo:"",
                paramCode: this.getQueryString("agentRecommendCode") ? this.getQueryString("agentRecommendCode") : '',
                recommendCode: this.getQueryString("agentRecommendCode") ? this.getQueryString("agentRecommendCode") : '',
                isSuccess:false
            }
        },
        methods:{
            inputFunc(){
                if(this.salesmanName.length>0&&this.recommendCode.length>0){
                    this.isSuccess = true
                }else{
                    this.isSuccess = false
                }
            },
            goBack(){
                this.$router.go(-1)
            },
            nextStep(){
                var that = this
                that.$store.commit('loadStatus', {'bool': false,'txt': '成功...'}); //成功...
                // console.log(response)
                that.$axios({
						url: '/wxmp-api/customer/login/update_recommend_code',
						data: {
							salesmanName: that.salesmanName,
                            recommendCode: that.recommendCode,
						}
                    })
                    
					.then(function(response) {
                        // that.$store.commit('loadStatus', {'bool': false,'txt': '成功...'}); //成功...
						if(response.data.code == "200") {
                            that.$router.push({
                                'path': '/outsideindex'
                            });
						}else{
                            // console.log(response.data.code)
                            $resError(response.data.message)
						}
					}.bind(this))
					.catch(function(response) {

					}.bind(this))
            },
            //获取指定的URL参数值
            getQueryString: function(name) {
                var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
                var r = window.location.search.substr(1).match(reg);
                if(r != null) return unescape(r[2]);
                return null;
            },
        },
        beforeCreate: function() { //创建前状态
			document.title = "登记信息";
		},
    }
</script>

<style scoped>
     .register_box{
        width:100%;
        height:100%;
    }
    .register_header{
        height: 1rem;
        width: 100%;
        display: flex;
        background-color: #ccc;
        justify-content: space-between;
        align-items: center;
        overflow: hidden;
        box-sizing: border-box;
        padding:0rem .2rem;
    }
    .register_header .iconfont{
        font-size: .3rem;
    }
    .register_header_left , .register_header_left{
        font-size:.28rem;
    }
    /* .left img , .right img{
        width: 100%;
        height: 100%;
    } */
    .register_box .register_header_title{
        height: 1rem;
        margin-left:-.3rem;
    }
    .register_header_title_p{
        font-size: .28rem;
        line-height: 1rem;
        height:1rem;
    }
    .register_con{
        width:100%;
        height:100%;
        /* padding-top:1rem;  */
        padding: 0 .25rem;
        overflow: hidden;
        margin-top:.4rem;
    }
    .res_chatperson{
        width:100%;
        height:100%;
        margin-bottom:.2rem;
    }
    .res_chatperson p{
        font-size: .28rem;
        color: #666;
        margin-bottom:.1rem;
    }
    .res_chatperson input{
        width:100%;
        height:.8rem;
        font-size: .28rem;
        border:none;
    }
    .res_submit{
        background-color: #000;
        height: .8rem;
        text-align: center;
        background-color: #cdcdcd;
        opacity: .6;
        color: #fff;
        font-size: .24rem;
        border:none;
        border-radius: .8rem;
    }
    .black_register_btn {
		background-color: #fc9d23!important;
		opacity: 1;
    }
</style>

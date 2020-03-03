<template>
  <div id="bgLogin" v-if="waited">
    <!-- <div class="logo_box flex_l_start">
			<div class="logo_box_img" style="background-image:url(/static/img/logo.png);"></div>
			<div>
				<div class="logo_box_name">迅&nbsp;鹿</div>
				<div class="logo_box_sm">科技·智能·大数据</div>
			</div>
    </div>-->
    <div class="bg_box" style="background-image: url(static/img/东西汇1.png);"></div>
    <div class="logo_form_box">
      <form id="logoForm" class="logo_form" @submit.prevent="submit" style="width: 100%;">
        <div class="input_groups">
          <div class="input_group" style="position: relative;">
            <i class="input_group_icon c_aaa iconfont icon-mobilefill"></i>
            <input
              class="input_group_input"
              maxlength="11"
              onkeyup="value=value.replace(/[^\d]/g,'')"
              v-model="user.mobile"
              @input="inputFunc"
              type="text"
              name="mobile"
              placeholder="请输入手机号码"
            />
          </div>
          <div class="input_group flex_l_between" style="position: relative;">
            <i class="input_group_icon c_aaa iconfont icon-tuxingyanzhengma"></i>
            <input
              v-model="user.imageCode"
              @input="inputFunc"
              class="input_group_input"
              maxlength="4"
              type="text"
              placeholder="图形验证码"
              name="imageCode"
              value
            />
            <div class="GraphCodeImg" style="width: 28%;float: right;">
              <img @click="getGraphCode" :src="srcImg" />
            </div>
          </div>
          <div class="input_group flex_l_between" style="position: relative;">
            <i class="input_group_icon c_aaa iconfont icon-yanzhengma1"></i>
            <input
              v-model="user.smsCode"
              @input="inputFunc"
              class="input_group_input"
              maxlength="6"
              onkeyup="value=value.replace(/[^\d]/g,'')"
              type="text"
              placeholder="短信验证码"
              name="smsCode"
              value
            />
            <div class="input_g_right">
              <span v-show="Tshow" @click="fnGetCode">获取验证码</span>
              <span v-show="!Tshow" class="count">{{codeTime}} s</span>
            </div>
          </div>
        </div>
        <div
          class="mui-input-row mui-checkbox mui-left"
          style="margin-top: .1rem;overflow: inherit;"
        >
          <label style="width: 10%;padding-left: 15px;"></label>
          <span class="check_font" :class="{change_check_font:ischeckedNames}">
            我已阅读并同意
            <router-link to="/enter/dns" style="color: #fc9d23;">《平台服务协议》</router-link>
          </span>
          <input
            name="checkbox"
            value="agreen"
            type="checkbox"
            id="checkLookDns"
            @click="checkedFunc"
            style="z-index: 11111;"
          />
        </div>
        <div style="width: 100%;text-align: center;">
          <input
            type="submit"
            class="gray_btn"
            v-bind:class="{black_login_btn: isSuccess }"
            value="注册"
          />
        </div>
      </form>
    </div>
  </div>
</template>
<script>
import { $resError, $subError } from "@/utils/muiAlert";
import axios from "axios";
import Upload from "../../components/imageUpload";
import {
  setIsLogin,
  setLoginName,
  getIsLogin,
  getLoginName
} from "@/utils/user";
export default {
  name: "",
  components: {
    "image-html5-upload": Upload
  },
  data() {
    return {
      srcImg:
        "/wxmp-api/customer/login/image_code?imgCodeType=CUSTOMER_REGISTER_LOGIN",
      waited: false,
      user: {
        mobile: "",
        smsCode: "",
        imageCode: "",
        salesmanId: "",
        recommendCode: ""
      },
      Tshow: true,
      codeTime: "",
      timer: null,
      isSuccess: false,
      isChecked: false,
      ischeckedNames: false,
      linkParameters: [] //二维码参数
    };
  },
  props: ["loading"],
  methods: {
    getGraphCode: function() {
      this.srcImg =
        "/wxmp-api/customer/login/image_code" +
        "?imgCodeType=CUSTOMER_REGISTER_LOGIN&nocache=" +
        new Date().getTime();
    }, //更换图片路径
    fnGetCode: function() {
      var that = this;
      //手机号正则
      var phoneR = /^0?1[3|5|6|7|8|9][0-9]\d{8}$/;
      var mflag = phoneR.test(this.user.mobile);
      if (mflag) {
        if (!that.user.imageCode) {
          mui.toast(`
					  	<div  class="toast_content" >
						  	<i class="mui-icon iconfont icon-roundclose"></i>
						  	<div class="toast_text">图形验证码不能为空</div>
						</div>
						`);
          return false;
        }
        that
          .$axios({
            //获取短信验证码
            url: "/wxmp-api/customer/login/send_sms",
            data: {
              mobile: that.user.mobile,
              imageCode: that.user.imageCode
            }
          })
          .then(
            function(response) {
              if (response.data.code == "200") {
                that.getCode();
              } else {
                that.getGraphCode();
              }
            }.bind(this)
          )
          .catch(function(response) {}.bind(this));
      } else {
        mui.toast(`
				  	<div  class="toast_content" >
					  	<i class="mui-icon iconfont icon-roundclose"></i>
					  	<div class="toast_text">请输入正确手机号</div>
					</div>
					`);
      }
      // 对象
      /*// 命名的路由
				this.$router.push({ name: 'home', params: { userId: wise }})*/
    },
    getCode: function() {
      //获取验证码倒计时
      const TIME_COUNT = 60;
      if (!this.timer) {
        this.codeTime = TIME_COUNT;
        this.Tshow = false;
        this.timer = setInterval(() => {
          if (this.codeTime > 0 && this.codeTime <= TIME_COUNT) {
            this.codeTime--;
          } else {
            this.Tshow = true;
            clearInterval(this.timer);
            this.timer = null;
          }
        }, 1000);
      }
    },
    inputFunc: function() {
      if (document.getElementById("checkLookDns").checked) {
        this.isChecked = true;
      } else {
        this.isChecked = false;
      }
      //判断输入内容是否都为空
      if(this.user.mobile.length==11&&this.user.smsCode.length==6&&this.user.imageCode.length==4&&this.isChecked) {
      this.isSuccess = true;
      } else {
      	this.isSuccess = false;
      }
    },
    checkedFunc() {
      this.inputFunc();
    },
    submit: function() {
      //登陆验证
      var that = this;
      var mobileR = /^0?1[3|5|6|7|8|9][0-9]\d{8}$/;
      var mflag = mobileR.test(this.user.mobile); //布尔值
      var mCode = this.user.smsCode;
      var formData = JSON.stringify(this.user); // 表单数据
      if (!this.isSuccess) {
        return false;
      }
      if (!mflag) {
        mui.toast(`
						<div  class="toast_content" >
					  	<i class="mui-icon iconfont icon-roundclose"></i>
					  	<div class="toast_text">手机号码错误</div>
					</div>`);
        return false;
      } else if (!this.isChecked) {
        mui.toast(`
		  			<div  class="toast_content" >
					  	<i class="mui-icon iconfont icon-roundclose"></i>
					  	<div class="toast_text">未勾选协议</div>
					</div>`);
        return false;
      } else if (mflag) {
        that.$store.commit("loadStatus", {
          bool: true,
          txt: "登录中..."
        }); //登录提示...
        that
          .$axios({
            url: "/wxmp-api/customer/login/finance",
            data: {
              mobile: that.user.mobile,
              smsCode: that.user.smsCode,
              imageCode: that.user.imageCode,
              salesmanId: that.linkParameters.length>0?that.linkParameters[0]:'',
              recommendCode: that.linkParameters.length>0?that.linkParameters[1]:'',
            }
          })
          .then(function(response) {
            that.$store.commit("loadStatus", {
              bool: false,
              txt: "加载中..."
            }); //登录提示...
            if (response.data.success == true) {
              that.isStatus(); //判断状态

              that.$store.commit("enrollLogin"); //入驻已登陆存状态
              setIsLogin(true); //入驻已登陆
              that.$store.commit("setEnrollLoginName", response.data.data); //获取入驻登录名
              setLoginName(that.user.mobile);
            }
          })
          .catch(function(error) {
            that.$store.commit("loadStatus", {
              bool: false,
              txt: "登录中..."
            }); //登录提示...
            setTimeout(function() {
              that.$store.commit("loadStatus", {
                bool: false,
                txt: "加载中..."
              }); //登录失败...
              mui.toast(`
							<div  class="toast_content" >
							  	<div class="toast_text">连接失败，请检查你的网络！</div>
							</div>`);
            }, 1000);
          });
        // 保存数据到localStorage
        localStorage.setItem("userPhone", that.user.mobile);
        /*	// 从sessionStorage获取数据
						var userPhone = sessionStorage.getItem('userPhone');
						console.log(userPhone);
						sessionStorage.removeItem('key');
						sessionStorage.clear();*/
        /*setTimeout(function() {
						that.$router.push({
							path: '/index/index'
						});
					}, 0)*/
      }
    },
    //获取指定的URL参数值
    getQueryString: function(name) {
      var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
      var r = window.location.search.substr(1).match(reg);
      if (r != null) return unescape(r[2]);
      return null;
    },
    //状态判断
    isStatus: function() {
      var that = this;
      that.$store.commit("loadStatus", {
        bool: false,
        txt: "加载中..."
      });
      that
        .$axios({
          url: "/wxmp-api/customer/login/is_recommend_code",
          method: "get"
        })
        .then(function(response) {
          if (response.data.data == false) {
            that.$router.replace({
              path: "/companyregister"
            });
          } else if (response.data.data == true) {
            that.$router.replace({
              path: "/outsideindex"
            });
          } else {
            that.waited = true;
          }
        })
        .catch(function() {});
      that.waited = true;
    }
  },
  watch: {
    //监听
  },
  computed: {
    //计算属性
  },
  beforeCreate: function() {
    var url = window.location.href; //当前页面的地址
    var arrObj = url.split("?");

    if (arrObj.length > 1) {
      var arrPara = arrObj[1].split("&");
      var arr;
      let data = [];

      for (var i = 0; i < arrPara.length; i++) {
        arr = arrPara[i].split("=");
        //业务员id
        if (arr != null && arr[0] == "salesmanId") {
          data.push(arr[1]);
        }
        //推荐码
        if (arr != null && arr[0] == "agentRecommendCode") {
          data.push(arr[1]);
         
        }
        //code
        if (arr != null && arr[0] == "code") {
          data.push(arr[1]);
         
        }
      }
      this.linkParameters = data;
    }

    //创建前状态
    document.title = "企业注册";

   




  },
  created: function() {
    //创建完毕状态
    var that = this;


 if(that.$route.query.bind){
      that.isStatus()
    }


    that.$store.commit("loadStatus", {
      bool: false,
      txt: "成功..."
    }); //成功...
    if (that.$route.query.mobile) {
      that.user.mobile = that.$route.query.mobile;
    }
    if (that.$store.state.isEnrollLogin) {
        that.isStatus(that.$store.state.enrollLoginName);
      return;
    } else {
      that.waited = true;
    }
  },
  beforeMount: function() {
    //挂载前状态
  },
  mounted: function() {
    //挂载结束状态
    let that = this;
  },
  beforeUpdate: function() {
    //更新前状态
  },
  updated: function() {
    //更新完成状态
  },
  destroyed: function() {
    //销毁完成状态
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.logo_box {
  padding: 0.2rem;
}
.logo_box_img {
  min-width: 0.45rem;
  min-height: 0.5rem;
  margin-right: 0.1rem;
  background-size: contain;
  background-repeat: no-repeat;
}
.logo_box_name {
  color: #dfb44d;
  font-size: 0.22rem;
  padding-bottom: 0.1rem;
}
.logo_box_sm {
  color: #858585;
  font-size: 0.17rem;
}
.logo_form_box {
  width: 90%;
  margin: 0 auto 0.3rem;
  padding: 0.1rem 0.3rem;
  border-radius: 0.15rem;
  -webkit-border-radius: 0.15rem;
  background-color: #fff;
}
.bg_box {
  height: auto;
  width: 100%;
  margin-top: 2%;
  padding: 35% 0;
  border-radius: 0.1rem;
  -webkit-border-radius: 0.1rem;
  background-repeat: no-repeat;
  background-size: 82% auto;
  margin-left: 40px;
}
.top_box {
  height: auto;
  width: 100%;
  margin-top: 8%;
  padding: 4%;
  border-radius: 0.1rem;
  -webkit-border-radius: 0.1rem;
  background-repeat: no-repeat;
  background-size: 100% 100%;
}
.top_title {
  font-size: 0.5rem;
  padding: 0.25rem 0;
  text-transform: uppercase;
  color: #4f4e4c;
}

.top_mes {
  color: #504f4d;
  font-size: 0.28rem;
}

.input_group .label {
  line-height: 1rem;
  font-size: 0.42rem;
}
.input_group_icon {
  position: absolute;
  transform: translateY(-50%);
  -webkit-transform: translateY(-50%);
  top: 50%;
  left: 0.1rem;
  font-size: 0.5rem;
}
.input_group_input {
  padding-left: 0.7rem !important;
}
.mui-content {
  overflow-y: hidden;
}

.logo_img {
  width: 3rem;
  margin: 0 auto 0;
  padding-top: 1.3rem;
}

.logo_img img {
  width: 100%;
}

.logo_form {
}

.input_group {
  padding-top: 0.1rem;
  padding-bottom: 0.1rem;
  margin: 0 auto;
  width: 100%;
  border-bottom: 0.02rem dashed #eee;
  overflow: hidden;
}

.logo_form .input_group input {
  border: none;

  margin-bottom: 0.1rem;
  margin-top: 0.1rem;
  font-size: 0.28rem;
  padding: 0;
}
.input_g_right {
  display: inline-block;
  width: 70%;
  height: 0.5rem;
  line-height: 0.5rem;
  margin-top: 3.2%;
  text-align: center;
  color: #fc9d23;
  border: 1px solid #fc9d23;
  font-size: 0.24rem;
  border-radius: 0.1rem;
  -webkit-border-radius: 0.1rem;
}
.count {
  text-align: center;
}
.gray_btn {
  width: 50%;
  height: 0.6rem;
  text-align: center;
  background-color: #cdcdcd;
  opacity: 0.6;
  color: #fff;
  font-size: 0.24rem;
  margin: 0.3rem auto 0.3rem;
  border: none;
  border-radius: 0.8rem;
  -webkit-border-radius: 0.8rem;
}
.black_login_btn {
  background-color: #fc9d23 !important;
  opacity: 1;
}
.check_font {
  position: absolute;
  top: 26%;
  color: #cdcdcd;
  font-size: 0.24rem;
  margin-left: 0.1rem;
}

.change_check_font {
  color: #4cd964;
}
.mui-checkbox input[type="checkbox"]:before {
  font-size: 0.35rem;
}
.mui-checkbox input[type="checkbox"]:checked:before {
  color: #fc9d23;
}
.mui-checkbox.mui-left input[type="checkbox"] {
  left: 0.2rem;
}
.mui-checkbox input[type="checkbox"] {
  top: 0.03rem;
}
.GraphCodeImg img {
  width: 1.6rem;
  padding-top: 0.13rem;
}
</style>
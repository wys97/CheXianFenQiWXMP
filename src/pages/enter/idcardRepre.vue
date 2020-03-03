<template>
  <div class>
    <div class="screen_padding">
      <div class>
        <div class="c_bgblack font_w font_32" style="line-height: .8rem;">上传被保人身份证:</div>
        <div class="img_wrap">
          <div class="img_wbox mui-btn mui-btn-primary mui-btn-block mui-btn-outlined">
            <div class="img_box" style="height: 1.7rem;width: 2.8rem;">
              <div
                class="s_img"
                v-bind:style="{backgroundImage:'url(' + imgPath.src + ')',backgroundColor:addBgColor.one}"
              ></div>
              <input
                type="file"
                style="display: none;"
                id="img-upload"
                multiple
                accept="image/*"
                capture="camera"
                @change="uploadImg($event)"
              />
              <i class="c_main iconfont icon-xiangji2"></i>
              <div class="img_sm">身份证正面</div>
            </div>
            <label for="01" class="img_box_label" style="height: 1.7rem;width: 2.8rem;"></label>
          </div>
          <div class="img_wbox mui-btn mui-btn-primary mui-btn-block mui-btn-outlined">
            <div class="img_box" style="height: 1.7rem;width: 2.8rem;">
              <div
                class="s_img"
                v-bind:style="{backgroundImage:'url(' + imgPath_back.src + ')',backgroundColor:addBgColor.two}"
              ></div>

              <i class="c_main iconfont icon-xiangji2"></i>
              <div class="img_sm">身份证反面</div>
            </div>
            <label for="02" class="img_box_label" style="height: 1.7rem;width: 2.8rem;"></label>
          </div>
        </div>
        <form class="public_form" @submit.prevent="submit" style="width: 100%;">
          <div class="public_input_groups">
            <div class="public_input_group">
              <label class="public_label must_input" for>被保人姓名:</label>
              <input
                class="public_input"
                placeholder="请输入真实姓名"
                v-model="information.name"
                @input="inputFunc"
                type="text"
              />
            </div>
            <div class="public_input_group">
              <label class="public_label must_input" for>被保人身份证号:</label>
              <input
                class="public_input"
                placeholder="请输入身份证"
                v-model="information.idcardNo"
                @input="inputFunc"
                type="text"
              />
            </div>
            <div class="public_input_group">
              <label class="public_label must_input" for>被保人地址:</label>
              <input
                class="public_input"
                placeholder="请输入地址"
                v-model="information.address"
                @input="inputFunc"
                type="text"
              />
            </div>
            <div class="public_input_group">
              <label class="public_label must_input must_input" for>被保人手机号:</label>
              <input
                class="public_input"
                placeholder="请输入手机号"
                v-model="information.mobile"
                @input="inputFunc"
                type="text"
                maxlength="11"
                onkeyup="value=value.replace(/[^\d]/g,'')"
              />
            </div>
          </div>
          <input
            type="submit"
            class="public_submit_input_disable"
            v-bind:class="{public_submit_input: isSuccess }"
            value="保存"
          />
        </form>
        <!-- <div class="sub_btn" style="margin: .3rem 0;" @click="fnUploadIdcard">提交识别</div> -->
      </div>
    </div>

    <div v-if="uploadSuccess" class="Obscuration">
      <div class="content" v-if="success">
        <div class="title_wrap">
          <p class="title">上传成功</p>
          <span class="g-right" @click="()=>{this.uploadSuccess=false; this.success=false}"></span>
        </div>
        <div style="margin:30px 0">确定进行图片识别吗？</div>
        <div class="btn_wrap">
          <p class="btn confirmBtn" @click="confirmOCR">确定</p>
          <p class="btn cancelBtn" @click="()=>{this.uploadSuccess=false; this.success=false}">取消</p>
        </div>
      </div>
      <div class="content" v-else>
        <div class="title_wrap">
          <p class="title">上传失败</p>
          <span class="g-right" @click="()=>{this.uploadSuccess=false; this.success=false}"></span>
        </div>
        <div style="margin:30px 0">请重新上传附件！</div>
        <div class="btn_wrap">
          <div class="btn">
            <input
              type="file"
              style="display: none;"
              id="img-upload"
              multiple
              accept="image/*"
              capture="camera"
              @change="uploadImg($event)"
            />
            <label for="01" style="width:100%; height:100%">重新上传</label>
          </div>

          <p class="btn cancelBtn" @click="()=>{this.uploadSuccess=false; this.success=false}">取消</p>
        </div>
      </div>
    </div>

    <image-html5-upload @child-say="listenImg" :img-num-limit="imgNum" :img-id="imgId.one"></image-html5-upload>
    <image-html5-upload @child-say="listenImg2" :img-num-limit="imgNum" :img-id="imgId.two"></image-html5-upload>
  </div>
</template>
<script>
import { $resError, $subError } from "@/utils/muiAlert";
const axiosRequest = require("axios");
// import Upload from "../../components/Upload";
// import Uploads from "../../components/Uploads";
import Upload from "../../components/imageUpload";
export default {
  name: "",
  components: {
    "image-html5-upload": Upload
  },
  data() {
    return {
      data: { name: "", idcardNo: "", mobile: "", address: "" },
      user: {
        fileInfo: "",
        suffix: "",
        desc: ""
      },
      // listData:{
      // 	policyholderUrl: "", //上传的身份证正面
      // },
      // rules:{
      // 	policyholderUrl: [
      // 		{ required: true, message: "请上传保单", trigger: "blur" }
      // 	],
      // },
      isPage: [true, true, true], //判断顶部状态
      isSuccess: false, //判断按钮的颜色
      imgNum: 1,

      imgId: {
        one: "01",
        two: "02"
      },
      imgPath: {
        isHave: false,
        picture: null,
        src: ""
      },
      imgPath_back: {
        isHave: false,
        picture: null,
        src: ""
      },
      addBgColor: {
        one: "",
        two: ""
      }, //上传照片后控制添加背景色
      information: {
        name: "",
        idcardNo: "",
        mobile: "",
        address: ""
      },
      uploadSuccess: false,
      success: false
      // registerStatus:'',//审批状态. registerStatus=AMENDING 时有值. INIT: 初始化 APPROVING: 待审核 (已更新) PASS: 通过 NOT_PASS: 不通过
      // iswait:false,//是否为等待审核
    };
  },
  props: ["loading"],
  methods: {
    //组件传过来的数据
    listenImg: function(someData) {
      var that = this;
      if (someData.length > 0) {
        const loading = this.$loading({
          lock: true,
          text: "正在上传",
          spinner: "el-icon-loading",
          background: "rgba(0, 0, 0, 0.7)"
        });
        let suffix = someData[0].name.split(".");
        let fileInfo = someData[1].split(",");
        let data = {
          fileInfo: fileInfo[1],
          suffix: suffix[1],
          desc: "身份证正面"
        };
        axiosRequest({
          url: "/wxmp-api/customer/finance/upload-image",
          method: "post",
          data
        }).then(res => {
          loading.close();
          if (res.data.code == "200") {
            that.imgPath.src = res.data.data;
            that.uploadSuccess = true;
            that.success = true;
            that.imgPath.picture = someData[0]; //改变提交的file值
            that.inputFunc();

            that.addBgColor.one = "#e5e5e5";
          } else {
            that.uploadSuccess = true;
            that.success = false;
          }
        });
      }
    },
    listenImg2: function(someData) {
      var that = this;
      const loading = this.$loading({
        lock: true,
        text: "正在上传",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)"
      });
      let suffix = someData[0].name.split(".");
      let fileInfo = someData[1].split(",");
      let data = {
        fileInfo: fileInfo[1],
        suffix: suffix[1],
        desc: "身份证反面"
      };
      axiosRequest({
        url: "/wxmp-api/customer/finance/upload-image",
        method: "post",
        data
      }).then(res => {
        loading.close();
        if (res.data.code == "200") {
          that.imgPath_back.picture = someData[0]; //改变提交的file值
          that.imgPath_back.src = res.data.data;
          that.addBgColor.two = "#e5e5e5";
          this.$message({
            message: "上传成功",
            type: "success"
          });
            that.inputFunc();

        } else {
          this.$message({
            message: "上传失败",
            type: "success"
          });
        }
      });
    },
    confirmOCR: function() {
      let that = this;
      //身份证ocr 识别
      if (that.imgPath.src) {
        axiosRequest({
          url: "/wxmp-api/customer/finance/ocr-id-card-front",
          method: "post",
          data: {
            imgPath: that.imgPath.src
          }
        }).then(res => {
          if (res.data.code == "200") {
            that.information = {
              name: res.data.data.name,
              idcardNo: res.data.data.idCardNo,
              mobile: "",
              address: res.data.data.address
            };
            that.uploadSuccess = false;
          }
        });
      }
    },

    fnisSuccess: function() {
      //判断输入内容是否都为空
      if (
        this.information.name &&
        this.information.idcardNo &&
        this.information.mobile &&
        this.information.address &&
        this.imgPath.src &&
        this.imgPath_back.src
      ) {
        this.isSuccess = true;
      } else {
        this.isSuccess = false;
      }
    },
    inputFunc: function() {
      //输入
      this.fnisSuccess();
    },
    submit: function() {
      var that = this;
      that.fnisSuccess();
      if (that.isSuccess) {
        let _isCard = that.isCardNo(that.information.idcardNo);
        //手机号正则
        let phoneR = /^0?1[3|5|6|7|8|9][0-9]\d{8}$/;
        let mflag = phoneR.test(that.information.mobile);
        if (!_isCard) {
          mui.toast(`
					  	<div  class="toast_content" >
						  	<div class="toast_text">身份证输入有误</div>
						  </div>
						`);
          return false;
        }
        if (!mflag) {
          mui.toast(`
					  	<div  class="toast_content" >
						  	<div class="toast_text">请输入正确的手机号</div>
						  </div>
						`);
          return false;
        }
        that.$store.commit("loadStatus", {
          bool: true,
          txt: "提交中..."
        }); //提示...
      
        let data = {
          insuredPhone: that.information.mobile,
          insuredFontUrl: that.imgPath.src,
          insuredBackUrl: that.imgPath_back.src,
          insuredName:that.information.name,
          idNo:that.information.idcardNo,
          insuredAddres: that.information.address
        };
        axiosRequest({
            url: "/wxmp-api/customer/finance/add-insured-id-card",
            method: "post",
            data
          })
          .then(function(response) {
            that.$store.commit("loadStatus", {
              bool: false,
              txt: "保存成功..."
            }); //成功...
            if (response.data.code == "200") {
              that.$router.replace({ path: "/enter/index" });
            }
          })
          .catch(function(error) {
            that.$store.commit("loadStatus", {
              bool: false,
              txt: "保存失败..."
            }); //失败...
          });
      } else {
        mui.toast(`
				  	<div  class="toast_content" >
					  	<div class="toast_text">请补全信息</div>
					  </div>
					`);
      }
    },

    isCardNo(card) {
      // 身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X
      var reg = /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$)/;
      if (reg.test(card) === false) {
        return false;
      }
      return true;
    }
  },
  watch: {
    //监听
  },
  computed: {
    //计算属性
  },
  beforeCreate: function() {
    //创建前状态
    document.title = "被保人信息";
  },
  created: function() {
    //创建完毕状态
    let that = this;
    // let insuredIdCard = that.$route.params.insuredIdCard; //拿到上一个路由带过来的数据
    // that.registerStatus = that.$route.params.registerStatus;//拿到上一个路由带过来的状态
    // that.iswait = that.$route.params.iswait;//拿到上一个路由带过来的状态
    // if (
    //   insuredIdCard.idcardNo != null ||
    //   insuredIdCard.name != null ||
    //   repre.idcardimgPath != null
    // ) {
    //   if (insuredIdCard != null) {
    //     //展示信息
    //     // that.imgPath_back.src = insuredIdCard.idcardPicBack;
    //     that.addBgColor.one = "#e5e5e5";
    //     that.imgPath.src = insuredIdCard.idcardimgPath;
    //     that.addBgColor.two = "#e5e5e5";
    //     that.information.name = insuredIdCard.name;
    //     that.information.idcardNo = insuredIdCard.idcardNo;
    //     that.information.mobile = insuredIdCard.mobile;
    //     that.information.address = insuredIdCard.address;

    //     that.fnisSuccess();
    //   }
    // } else {
    // }
  },
  beforeMount: function() {
    //挂载前状态
  },
  mounted: function() {
    //挂载结束状态
    var that = this;
    that.$store.commit("loadStatus", {
      bool: false,
      txt: "成功..."
    }); //成功...
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
.img_wbox {
  margin: 0;
  padding: 0;
  border: none;
  display: inline-block;
  width: 100%;
}
.img_box {
  position: relative;
  margin: 0 auto 0.2rem;
  line-height: 1rem;
  text-align: center;
  border: 1px dashed #cdcdcd;
  border-radius: 0.1rem;
  overflow: hidden;
}
.img_box_label {
  position: absolute;
  transform: translateX(-50%);
  -webkit-transform: translateX(-50%);
  left: 50%;
  top: 0;
  z-index: 2;
  display: inherit;
}
.s_img {
  position: absolute;
  z-index: 2;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
}
.img_box i {
  position: absolute;
  z-index: 1;
  top: 32%;
  transform: translateX(-50%) translateY(-50%);
  -webkit-transform: translateX(-50%) translateY(-50%);
  font-weight: 900;
  font-size: 0.9rem;
  color: #cdcdcd;
  align-content: center;
}

.img_box img {
  width: 100%;
}
.img_box .img_sm {
  position: absolute;
  z-index: 1;
  top: 54%;
  text-align: center;
  width: 100%;
  color: #a8a8a8;
  font-size: 0.25rem;
}
.img_box .img_sm2 {
  position: absolute;
  z-index: 1;
  top: 50%;
  text-align: center;
  width: 100%;
  color: #a8a8a8;
  font-size: 0.2rem;
}
.zy_img {
  width: 1.35rem;
  height: 0.8rem;
  border-radius: 0.1rem;
  -webkit-border-radius: 0.1rem;
  overflow: hidden;
  background-repeat: no-repeat;
  background-color: transparent;
  background-size: cover;
}
.zy_text {
  color: #666;
  line-height: 0.5rem;
  font-size: 0.25rem;
  text-align: center;
}
.img_wrap {
  display: flex;
  align-items: center;
  justify-content: space-around;
}
.Obscuration {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  z-index: 2;
}
.content {
  width: 80%;
  height: 30%;
  background: #fff;
  text-align: center;
  font-size: 16px;
  padding: 20px;
  border-radius: 10px;
  margin: 50% auto;
}
.title_wrap {
  display: flex;
  align-items: center;
}
.title {
  width: 95%;
  font-size: 20px;
  padding-left: 6%;
}
.g-right {
  display: inline-block;
  width: 17px;
  height: 3px;
  background: #999;
  line-height: 0;
  font-size: 0;
  vertical-align: middle;
  -webkit-transform: rotate(45deg);
}
.g-right:after {
  content: "/";
  display: block;
  width: 17px;
  height: 3px;
  background: #999;
  -webkit-transform: rotate(-90deg);
}

.btn_wrap {
  display: flex;
  align-items: center;
  justify-content: center;
}

.btn {
  width: 100px;
  height: 32px;
  line-height: 32px;
  margin: 0 10px;
  color: #fff;
  background: #9e99b9;
  border-radius: 25px;
}
</style>
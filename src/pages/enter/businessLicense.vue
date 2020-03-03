<template>
  <div class="box">
    <div class="menu-list">
      <div
        class="total"
        :class="{active:item.id === sel}"
        v-for="item in tabs"
        :key="item.id"
        @click="select(item)"
      >{{ item.label }}</div>
    </div>
    <div class="text">
      <div class="all" v-show="sel === 1">
        <div class="screen_padding">
          <div class>
            <div class="c_bgblack font_w font_32" style="line-height: .8rem;">上传行驶证:</div>
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
                  <div class="img_sm">行驶证正面</div>
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
                  <div class="img_sm">行驶证反面</div>
                </div>
                <label for="02" class="img_box_label" style="height: 1.7rem;width: 2.8rem;"></label>
              </div>
            </div>
            <form class="public_form" @submit.prevent="submit" style="width: 100%;">
              <div class="public_input_groups">
                <div class="public_input_group">
                  <label class="public_label must_input" for>车牌号:</label>
                  <input
                    class="public_input"
                    v-model="drivingData.licenseNo"
                    placeholder="通过行驶证读取，可修改"
                    @input="inputFunc"
                    type="text"
                  />
                </div>
                <div class="public_input_group">
                  <label class="public_label must_input" for>车主姓名:</label>
                  <input
                    class="public_input"
                    v-model="drivingData.ownerName"
                    placeholder="通过行驶证读取，可修改"
                    @input="inputFunc"
                    type="text"
                  />
                </div>
                <div class="public_input_group">
                  <label class="public_label must_input" for>车辆识别代号:</label>
                  <input
                    v-model="drivingData.frameNo"
                    class="public_input"
                    placeholder="通过行驶证读取，可修改"
                    @input="inputFunc"
                    type="text"
                  />
                </div>
                <div class="public_input_group">
                  <label class="public_label must_input must_input" for>发动机号:</label>
                  <input
                    class="public_input"
                    placeholder="通过行驶证读取，可修改"
                    v-model="drivingData.engineNo"
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
              <p
                class="btn cancelBtn"
                @click="()=>{this.uploadSuccess=false; this.success=false}"
              >取消</p>
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

              <p
                class="btn cancelBtn"
                @click="()=>{this.uploadSuccess=false; this.success=false}"
              >取消</p>
            </div>
          </div>
        </div>

        <image-html5-upload @child-say="listenImg" :img-num-limit="imgNum" :img-id="imgId.one"></image-html5-upload>
        <image-html5-upload @child-say="listenImg2" :img-num-limit="imgNum" :img-id="imgId.two"></image-html5-upload>
      </div>
      <div class="all" v-show="sel === 2">

      <div class="screen_padding">
        <div class>
          <div class="c_bgblack font_w font_32" style="line-height: .8rem;">上传合格证:</div>

          <div class="img_wbox mui-btn mui-btn-primary mui-btn-block mui-btn-outlined">
            <div class="img_box" style="height: 2.2rem;width: 3.8rem;">
              <div
                class="s_img"
                v-bind:style="{backgroundImage:'url(' + certificate.licenseFontUrl + ')',backgroundColor:addBgColor.three}"
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
              <div class="img_sm">合格证</div>

              <label for="01" class="img_box_label" style="height: 2.2rem;width: 3.8rem;"></label>
            </div>
          </div>
          <form class="public_form" @submit.prevent="submit" style="width: 100%;">
            <div class="public_input_groups">
              <div class="public_input_group">
                <label class="public_label must_input" for>车主姓名:</label>
                <input
                  class="public_input"
                  v-model="certificate.ownerName"
                  placeholder="请输入车主姓名"
                  @input="inputFunc"
                  type="text"
                />
              </div>
              <div class="public_input_group">
                <label class="public_label must_input" for>车辆识别代号:</label>
                <input
                  v-model="certificate.frameNo"
                  class="public_input"
                  placeholder="请输入车辆识别代号"
                  @input="inputFunc"
                  type="text"
                />
              </div>
              <div class="public_input_group">
                <label class="public_label must_input must_input" for>发动机号:</label>
                <input
                  class="public_input"
                  placeholder="请输入发动机号"
                  v-model="certificate.engineNo"
                  @input="inputFunc"
                  type="text"
                />
              </div>
            </div>
            <input
              type="submit"
              class="public_submit_input_disable"
              v-bind:class="{public_submit_input: isSuccess2 }"
              value="保存"
            />
          </form>
          <!-- <div class="sub_btn" style="margin: .3rem 0;" @click="fnUploadIdcard">提交识别</div> -->
        </div>
        <image-html5-upload @child-say="listenImg" :img-num-limit="imgNum" :img-id="imgId.one"></image-html5-upload>
      </div>
	  </div>
    </div>
  </div>
</template>
<script>
import { $resError, $subError } from "@/utils/muiAlert";
import Upload from "@/components/imageUpload";
import selectTime from "@/components/selectTime";
const axiosRequest = require("axios");

export default {
  name: "",
  components: {
    "image-html5-upload": Upload,
    "select-time": selectTime
  },
  data() {
    return {
      sel: 1,
      tabs: [
        { label: "上传行驶证", num: 0, id: 1 },
        { label: "新车未上牌", num: 0, id: 2 }
      ],
      isPage: [true, true, false], //判断顶部状态
      isSubIdCard: [true, false, false], //判断是否已经提交身营业执照
	  isSuccess: false, //判断按钮的颜色
	  isSuccess2:false,
      imgNum: 1,
      imgId: {
        one: "01",
        two: "02"
      },
      feedback_mes_license: {
        isHave: false,
        picture: null,
        src: ""
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
      uploadSuccess: false,
      success: false,
      //行驶证信息
      drivingData: {
        engineNo: "",
        frameNo: "",
        licenseNo: "",
        ownerName: ""
      },
      //合格证
      certificate: {
        licenseFontUrl: "",
        ownerName: "",
        frameNo: "",
        engineNo: ""
      },
      addBgColor: {
        one: "",
        two: "",
        three: ""
      }, //上传照片后控制添加背景色

      enterprise_contact: {
        //补全企业信息
        address: null,
        contactPhone: null
      },
      registerStatus: "", //审批状态. registerStatus=AMENDING 时有值. INIT: 初始化 APPROVING: 待审核 (已更新) PASS: 通过 NOT_PASS: 不通过
      iswait: false //是否为等待审核
    };
  },
  props: ["loading"],
  methods: {
    select(item) {
      this.sel = item.id;
      //切换导航栏  //行驶证 || 合格证  清空相对的列表数据
      if (item.id == 1) {
        this.certificate = {
          licenseFontUrl: "",
          ownerName: "",
          frameNo: "",
          engineNo: ""
        };
        this.addBgColor = {
          three: ""
        };
      } else {
        this.imgPath.src = "";
        this.imgPath_back.src = "";
        this.drivingData = {
          engineNo: "",
          frameNo: "",
          licenseNo: "",
          ownerName: ""
        };
        this.addBgColor = {
          one: "",
          two: ""
        };
      }
    },
    //组件传过来的数据
    listenImg: function(someData) {
      var that = this;
      if (someData.length > 0 && that.sel == 1) {
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
      } else {
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
          desc: "合格证"
        };
        axiosRequest({
          url: "/wxmp-api/customer/finance/upload-image",
          method: "post",
          data
        }).then(res => {
          loading.close();
          if (res.data.code == "200") {
            that.certificate.licenseFontUrl = res.data.data;
            that.inputFunc();

            that.addBgColor.three = "#e5e5e5";
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
      //行驶证ocr 识别
      if (that.imgPath.src) {
        axiosRequest({
          url: "/wxmp-api/customer/finance/ocr-car-license-front",
          method: "post",
          data: {
            imgPath: that.imgPath.src
          }
        }).then(res => {
          if (res.data.code == "200") {
            (that.drivingData = {
              engineNo: res.data.data.engineNo,
              frameNo: res.data.data.frameNo,
              licenseNo: res.data.data.licenseNo,
              ownerName: res.data.data.ownerName
            }),
              (that.uploadSuccess = false);
          }
        });
      }
    },

    selectTimeValue(val) {
      this.fnisSuccess();
    },
    fnisSuccess: function() {
      //判断输入内容是否都为空
      if (this.sel == 1) {
		  //行驶证验证
        if (
          this.drivingData.engineNo &&
          this.drivingData.frameNo &&
          this.drivingData.licenseNo &&
          this.drivingData.ownerName &&
          this.imgPath.src &&
          this.imgPath_back.src
        ) {
          this.isSuccess = true;
        } else {
          this.isSuccess = false;
        }
      }else{
		  //合格证验证
		  if(this.certificate.engineNo&&
		  this.certificate.frameNo&&
		  this.certificate.ownerName&&
		  this.certificate.licenseFontUrl
		  ){
			  this.isSuccess2 = true;
		  }else{
			  this.isSuccess2 = false;
		  }
		   
	  }
    },
    inputFunc: function() {
      //判断按钮的颜色
      this.fnisSuccess();
    },
    submit: function() {
      var that = this;
      that.fnisSuccess();
      if (that.isSuccess && that.sel==1) {
        that.$store.commit("loadStatus", {
          bool: true,
          txt: "验证中..."
        }); //提示...
        let data = {
          licenseFontUrl: that.imgPath.src,
          licenseBackUrl: that.imgPath_back.src,
          licenseNo: that.drivingData.licenseNo,
          ownerName: that.drivingData.ownerName,
          frameNo: that.drivingData.frameNo,
          engineNo: that.drivingData.engineNo
        };
        axiosRequest({
          url: "/wxmp-api/customer/finance/add-insured-car-license",
          method: "post",
          data
        })
          .then(function(response) {
            that.$store.commit("loadStatus", {
              bool: false,
              txt: "成功..."
            }); //成功...
            if (response.data.code == "200") {
              that.$router.replace({ path: "/enter/index" });
            }
          })
          .catch(function(error) {
            that.$store.commit("loadStatus", {
              bool: false,
              txt: "失败..."
            }); //失败...
          });
      } else {
		  //上传合格证
		   let data = {
        engineNo: that.certificate.engineNo,
		 frameNo: that.certificate.frameNo,
		  ownerName:that.certificate.ownerName,
		 licenseFontUrl: that.certificate.licenseFontUrl
        };
        axiosRequest({
          url: "/wxmp-api/customer/finance/add-insured-car-qualification",
          method: "post",
          data
        })
          .then(function(response) {
            that.$store.commit("loadStatus", {
              bool: false,
              txt: "成功..."
            }); //成功...
            if (response.data.code == "200") {
              that.$router.replace({ path: "/enter/index" });
            }
          })
          .catch(function(error) {
            that.$store.commit("loadStatus", {
              bool: false,
              txt: "失败..."
            }); //失败...
          });
      }
    },
    repSubmit: function() {
      var that = this;
      that.$store.commit("loadStatus", {
        bool: true,
        txt: "验证中..."
      }); //提示...
      that
        .$axios({
          url: "/supplier/register/enterprise_contact",
          data: that.enterprise_contact
        })
        .then(function(response) {
          that.$store.commit("loadStatus", {
            bool: false,
            txt: "成功..."
          }); //成功...
          that.isSubIdCard = [true, false, false];
          that.$router.push({ path: "/enter/idcardRepre" });
        })
        .catch(function(error) {
          setTimeout(function() {
            that.$store.commit("loadStatus", {
              bool: false,
              txt: "失败..."
            }); //失败...
            mui.toast(`
							<div  class="toast_content" >
							  	<div class="toast_text">连接失败，请检查你的网络！</div>
							</div>`);
          }, 1000);
        });
    },

    strlen(str) {
      var len = 0;
      for (var i = 0; i < str.length; i++) {
        var c = str.charCodeAt(i);
        //单字节加1
        if ((c >= 0x0001 && c <= 0x007e) || (0xff60 <= c && c <= 0xff9f)) {
          len++;
        } else {
          len += 2;
        }
      }
      return len;
    } //返回字符串长度
  },
  watch: {
    //监听
  },
  computed: {
    //计算属性
  },
  beforeCreate: function() {
    //创建前状态
    document.title = "企业信息";
  },
  created: function() {
    //创建完毕状态
    let that = this;
    let businessLicense = that.$route.params.businessLicense; //拿到上一个路由带过来的数据
    that.registerStatus = that.$route.params.registerStatus; //拿到上一个路由带过来的状态
    that.iswait = that.$route.params.iswait; //拿到上一个路由带过来的状态
    if (
      businessLicense
      //   businessLicense.businessLicenseNo != null ||
      //   businessLicense.enterpriseName != null ||
      //   businessLicense.pic != null
    ) {
      that.isSubIdCard = [false, true, false];
      //初始化输入框的内容

      //   if (businessLicense.pic != null) {
      //     that.feedback_mes_license.src = businessLicense.pic;
      //     that.addBgColor.one = "#e5e5e5";
      //   }
      that.fnisSuccess(); //判断按钮的颜色
    } else {
      that.isSubIdCard = [true, false, false];
    }
  },
  beforeMount: function() {
    //挂载前状态
  },
  mounted: function() {
    //挂载结束状态
    let that = this;
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
.equi_container {
  display: flex;
  flex-direction: column;
}
.menu-list {
  height: 0.625rem;
  display: flex;
  border-bottom: 1px solid #ccccff;
}
.total {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  /*height: 100%;*/
  /*line-height: 0.44rem;*/
  /* background:#F4FAFF; */
  /* color:#4c8fff; */
  text-align: center;
  float: left;
  font-size: 15px;
  display: inline-block;
  line-height: 40px;
  background: white;
}
.total.active {
  border-bottom: 5px solid black;
}
.text {
  flex: 1;
  overflow: auto;
}

.img_wbox {
  margin: 0;
  padding: 0;
  border: none;
  display: inline-block;
}
.img_box {
  position: relative;
  height: 2rem;
  width: 3.8rem;
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
  background-color: #cdcdcd;
}
.zy_text {
  line-height: 0.3rem;
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
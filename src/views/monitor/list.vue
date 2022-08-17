<template>
  <!--  原生摄像头-->
  <div>
    <div class="app-container">
      <!-- <el-alert
        v-if="isshow"
        title="请勿遮挡摄像头"
        type="error"
        center
        show-icon
      ></el-alert> -->
      <div class="app-box">
        <div class="video-box top-box">
          <div class="box">
            <video
              id="videoCamera"
              class="canvas"
              :width="videoWidth"
              :height="videoHeight"
              autoPlay
            ></video>
            <!-- <canvas
              id="canvasCamera"
              class="canvas"
              :width="videoWidth"
              :height="videoHeight"
            ></canvas> -->
          </div>

          <!-- <div class="open-btn" align="center"> -->

            <!-- <el-button @click="photographBtn" icon="el-icon-camera" size="small"
              >拍照</el-button
            > -->

            <!-- <el-button
              v-if="os"
              @click="openCamera"
              icon="el-icon-video-camera"
              size="small"
              >打开</el-button
            >
            <el-button
              v-else
              @click="stopCamera"
              icon="el-icon-switch-button"
              size="small"
              >关闭</el-button
            > -->

            <!-- <el-button @click="resetBtn" icon="el-icon-refresh" size="small"
              >重置</el-button
            >
            <el-button
              @click="submitBtn"
              icon="el-icon-circle-close"
              size="small"
              >提交</el-button
            > -->

          <!-- </div> -->
        </div>

        <div class="down-box">
          <el-row><h4>考试排行榜</h4></el-row>
          <el-row class="chart-box">
            <div class="rank-box" v-for="(rank, index) in ranks" :key="index">
              <el-card class="box-card">
                <div class="rank-desc">
                  <div class="rank_order">{{ index + 1 }}</div>
                  <div class="student_name">
                    {{ rank.d }}
                  </div>
                </div>
              </el-card>
            </div>
          </el-row>
          <el-row><h4>考生清单</h4></el-row>
          <el-row class="chart-box">
            <div class="rank-box" v-for="(rank, index) in ranks" :key="index" @click="btnexport(rank)">
              <el-card class="box-card" >
                <div class="rank-desc pointer">
                  <div class="student_name">
                    {{ rank.k }}
                  </div>
                </div>
              </el-card>
            </div>
          </el-row>
      
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "camera",
  data() {
    return {
      isshow: false,
      ranks: [
        {
          d: "罗伯特",
          k: "考生1",
        },
        // {
        //   d: "拖布撕盖",
        //   k: "考生2",
        // },
        // {
        //   d: "富贵",
        //   k: "考生3",
        // },
        // {
        //   d: "深蒂",
        //   k: "考生4",
        // },
        // {
        //   d: "玛丽",
        //   k: "考生5",
        // },
        // {
        //   d: "已输入",
        //   k: "考生6",
        // },
        // {
        //   d: "观音湖",
        //   k: "考生7",
        // },
        // {
        //   d: "华法林",
        //   k: "考生8",
        // },
        // {
        //   d: "弗兰克",
        //   k: "考生9",
        // },
        // {
        //   d: "国寿福",
        //   k: "考生10",
        // },
        // {
        //   d: "安捷伦",
        //   k: "考生11",
        // },
        // {
        //   d: "叹啥气",
        //   k: "考生12",
        // },
      ],

      os: true, //控制摄像头开关
      thisVideo: null,
      thisContext: null,
      thisCancas: null,
      imgSrc: "",
      videoWidth: 500,
      videoHeight: 400,
    };
  },
  created(){
    this.openCamera()
  },
  methods: {
    //考生点击开启摄像头
    btnexport() {
      this.isshow = false;
      this.openCamera();
      setTimeout(() => {
        this.isshow = true;
        this.$message.error("开启摄像头失败")
      }, 5000);
    },

    // submitBtn() {
    //   console.log(this.imgSrc);
    // },
    // 调用摄像头权限
    openCamera() {
      //必须在model中render后才可获取到dom节点,直接获取无法获取到model中的dom节点
      this.$nextTick(() => {
        const _this = this;
        this.os = false; //切换成关闭摄像头
        // this.thisCancas = document.getElementById("canvasCamera");
        // this.thisContext = this.thisCancas.getContext("2d");
        this.thisVideo = document.getElementById("videoCamera");
        // 旧版本浏览器可能根本不支持mediaDevices，我们首先设置一个空对象
        if (navigator.mediaDevices === undefined) {
          navigator.menavigatordiaDevices = {};
        }
        // 一些浏览器实现了部分mediaDevices，我们不能只分配一个对象
        // 使用getUserMedia，因为它会覆盖现有的属性。
        // 这里，如果缺少getUserMedia属性，就添加它。
        if (navigator.mediaDevices.getUserMedia === undefined) {
          navigator.mediaDevices.getUserMedia = function (constraints) {
            // 首先获取现存的getUserMedia(如果存在)
            let getUserMedia =
              navigator.webkitGetUserMedia ||
              navigator.mozGetUserMedia ||
              navigator.getUserMedia;
            // 有些浏览器不支持，会返回错误信息
            // 保持接口一致
            if (!getUserMedia) {
              return Promise.reject(
                new Error("开启摄像头失败")
              );
            }
            // 否则，使用Promise将调用包装到旧的navigator.getUserMedia
            return new Promise(function (resolve, reject) {
              getUserMedia.call(navigator, constraints, resolve, reject);
            });
          };
        }
        const constraints = {
          audio: false,
          video: {
            width: _this.videoWidth,
            height: _this.videoHeight,
            transform: "scaleX(-1)",
          },
        };
        navigator.mediaDevices
          .getUserMedia(constraints)
          .then(function (stream) {
            // 旧的浏览器可能没有srcObject
            if ("srcObject" in _this.thisVideo) {
              _this.thisVideo.srcObject = stream;
            } else {
              // 避免在新的浏览器中使用它，因为它正在被弃用。
              _this.thisVideo.src = window.URL.createObjectURL(stream);
            }
            _this.thisVideo.onloadedmetadata = function (e) {
              _this.thisVideo.play();
            };
          })
          .catch((err) => {
            this.$message({
              message: "开启摄像头失败",
              type: "warning",
            });
          });
      });
    },
    //拍照按钮
    // photographBtn() {
    //   // 点击，canvas画图
    //   this.thisContext.drawImage(
    //     this.thisVideo,
    //     0,
    //     0,
    //     this.videoWidth,
    //     this.videoHeight
    //   );
    //   // 获取图片base64链接
    //   this.imgSrc = this.thisCancas.toDataURL("image/png");
    // },
    //清空画布
    // clearCanvas(id) {
    //   let c = document.getElementById(id);
    //   let cxt = c.getContext("2d");
    //   cxt.clearRect(0, 0, c.width, c.height);
    // },
    //重置画布
    // resetBtn() {
    //   this.imgSrc = "";
    //   this.clearCanvas("canvasCamera");
    // },
    //关闭摄像头
    stopCamera() {
      if (this.thisVideo && this.thisVideo !== null) {
        this.thisVideo.srcObject.getTracks()[0].stop();
        this.os = true; //切换成打开摄像头
        this.isshow = false;
      }
    },
  },
};
</script>

<style lang="scss">
.app-box {
  .top-box {
    width: 100%;
    height: calc(100vh - 120px);
    background: #000;
    position: relative;
    #videoCamera{
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%,-50%);
      // background: red;
      
    }
    .open-btn{
      display: none;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%,-50%);
    }
    &:hover{
      .open-btn{
        display: block;
      }
    }
    
  }
  .down-box {
    .chart-box {
      overflow: auto;
      display: flex;
      align-items: center;

      .rank-box {
        margin: 1rem;
        .box-card {
          min-width: 12.5rem;
          max-width: 18.75rem;
          // padding: 1rem;

          .rank-desc {
            display: flex;
            justify-content: space-around;
            align-items: center;
            
            .rank_order {
              font-size: 1.25rem;
              font-weight: bold;
            }
          }
        }
        &:first-child {
          margin-left: 0;
          .rank_order {
            color: red;
          }
        }
        &:nth-child(2) {
          .rank_order {
            color: goldenrod;
          }
        }
        &:nth-child(3) {
          .rank_order {
            color: blue;
          }
        }
        &:last-child {
          margin-right: 0;
        }
      }
    }
  }
}

.pointer{
  cursor: pointer;
}
@media screen and (max-width: 75rem) {
  .box-card {
    padding: 0;
  }
}
@media screen and (min-width: 75rem) {
  .box-card {
    padding: 1rem;
  }
}

/* 整个滚动条 */
::-webkit-scrollbar {
  /* 对应纵向滚动条的宽度 */
  width: 10px;
  /* 对应横向滚动条的宽度 */
  height: 10px;
}

/* 滚动条上的箭头按钮 */
::-webkit-scrollbar-button {
  display: none;
}

/* 滚动条上的滚动滑块 */
::-webkit-scrollbar-thumb {
  background-color: #ccc;
  border-radius: 32px;
}
/* 滚动条轨道 */
::-webkit-scrollbar-track {
  // background-color: whitesmoke;
  border-radius: 32px;
}
</style>

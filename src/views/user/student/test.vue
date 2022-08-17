<template>
  <div class="test-box">
    <div class="test-subject">
      <div class="test-title">
        <h4>{{ test.title }}</h4>
        <el-button size="mini" type="primary" @click="submitResponse"
          >提交</el-button
        >
      </div>
      <div class="subject-detail">{{ test.subject }}</div>
      <div class="response-title">解：</div>
      <el-input type="textarea" rows="8" v-model="test.response"></el-input>
      <!-- <div class="answer-box">
        <p class="answer-title" v-show="showAnswer">参考答案：</p>
        <div class="answer-detail" v-show="showAnswer">
          {{ test.answer.detail }}
        </div>
      </div> -->
    </div>
    <div class="video-box">
      <video
        id="videoCamera"
        class="canvas"
        :width="videoWidth"
        :height="videoHeight"
        autoPlay
      ></video>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      test: {
        title: "简答题",
        subject: `美国一家公司在1982年计划用FORTRAN语言开发一个在VAX
750计算机上运行的应用程序,估计这个程序的长度为10000条
FORTRAN指令。如果平均每人每天可以开发出10条
FORTRAN指令,请问：(1)开发这个应用程序需要多少人日？(2)
假设程序员的月平均工资为4000美元,每月按20个工作日计算，
这个软件的成本是多少美元？(3)1982年VAX750计算机硬件价
格约为125000美元,在那一年这个软件的成本在总成本中占多
大比例？（4)20年后,一台性能远优于VAX750的微型计算机的价
格约为2000美元,这时软件开发生产率已提高到平均每人每天
可以开发出40条指令,而程序员的月平均工资也己涨到8000美
元。如果在2002年开发上述FORTRAN应用程序,则该软件的
成本在总成本中占多大比例？ （15.0分）
`,
        response: "",
        answer: {
          detail: `(1)工作量：10000/10=1000（人日）(2)工作量：1000/20=50（
人月)
成本：50×4000=200000（美元）(3)软件成本所占比例：
200000/(200000+125000)=61.5%（4)工作量：10000/(40
×20)=12.5 (^ A)
成本：12.5x8000=100000（美元）
软件成本所占比例：
100000/(100000+2000)=98%`,
        },
      },
      showAnswer: false,
      id: -1,
      isshow: false,
      

      os: false, //控制摄像头开关
      thisVideo: null,
      thisContext: null,
      thisCancas: null,
      imgSrc: "",
      videoWidth:300,
      videoHeight: 150,
    };
  },
  created() {
    this.getTestData();
    this.openCamera()
  },
  methods: {
    getTestData() {
      let id = JSON.parse(this.$route.query.data);
      this.id = parseInt(id);
      this.test.response = this.test.response ? "" : "";
      if (!this.test || !this.test.subject) {
        this.test = this.$getStorage("test")
          ? this.$getStorage("test").subject
            ? this.$getStorage("test")
            : ""
          : "";
      }
      var object = this.$getStorage("test");
      if (!object || !object.subject) {
        this.$setStorage("test", this.test);
      }
      var obj = this.$getStorage("test");
      obj.response = obj.response ? "" : "";
      this.$setStorage("test", obj);
      this.test = obj;
    },
    submitResponse() {
      var object = this.$getStorage("test");
      if (object && object.response) {
        object.response = "";
        this.$setStorage("test", object);
      }
      this.test.response
        ? this.$setStorage("test", this.test)
        : this.$message.error("答案不能为空");
      var obj = this.$getStorage("test");
      if (this.test.response !== "" && obj.response) {
        let exams = this.$getStorage("exam_list");
        exams[this.id].accomplish = "已完成";
        this.$setStorage("exam_list", exams);
        var exam_list = this.$getStorage("exam_list");
        if (exam_list[this.id].accomplish === "已完成") {
          this.$message.success("提交成功");
          this.$router.push("/exam/student/list")
          // this.showAnswer = true;
        }
      }
    },
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
            // transform: "scaleX(-1)",
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

<style lang="scss" scoped>
.test-box {
  padding: 0 20px 0 20px;
  .test-subject {
    width: 50rem;
    min-width: 50rem;
    max-width: 62.5rem;
    margin: 0 auto;
    .test-title {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .subject-detail {
      margin-bottom: 0.625rem;
      text-indent: 36px;
      line-height: 1.5;
    }
    .response-title {
      padding: 1.125rem 0;
    }
    .answer-box {
      .answer-detail {
        text-indent: 36px;
        line-height: 1.5;
      }
    }
  }
  .video-box{
    position: absolute;
    bottom: 2%;
    right: 2%;
    background: #000;
  }
}
</style>

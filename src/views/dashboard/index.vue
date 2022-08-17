<template>
  <div class="dashboard-container">
    <!-- <el-row :gutter="40" class="panel-group">
      <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
        <div class="card-panel">
          <div class="card-panel-icon-wrapper icon-people">
            <svg-icon icon-class="exam" class-name="card-panel-icon"/>
          </div>
          <div class="card-panel-description">
            <div class="card-panel-text">
              试卷总数
            </div>
            <count-to :start-val="0" :end-val="examPaperCount" :duration="2600" class="card-panel-num" v-loading="loading"/>
          </div>
        </div>
      </el-col>
      <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
        <div class="card-panel" >
          <div class="card-panel-icon-wrapper icon-message">
            <svg-icon icon-class="question" class-name="card-panel-icon"/>
          </div>
          <div class="card-panel-description">
            <div class="card-panel-text">
              题目总数
            </div>
            <count-to :start-val="0" :end-val="questionCount" :duration="3000" class="card-panel-num" v-loading="loading"/>
          </div>
        </div>
      </el-col>
      <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
        <div class="card-panel">
          <div class="card-panel-icon-wrapper icon-shopping">
            <svg-icon icon-class="doexampaper" class-name="card-panel-icon"/>
          </div>
          <div class="card-panel-description">
            <div class="card-panel-text">
              答卷总数
            </div>
            <count-to :start-val="0" :end-val="doExamPaperCount" :duration="3600" class="card-panel-num" v-loading="loading"/>
          </div>
        </div>
      </el-col>
      <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
        <div class="card-panel">
          <div class="card-panel-icon-wrapper icon-money">
            <svg-icon icon-class="doquestion" class-name="card-panel-icon"/>
          </div>
          <div class="card-panel-description">
            <div class="card-panel-text">
              答题总数
            </div>
            <count-to :start-val="0" :end-val="doQuestionCount" :duration="3200" class="card-panel-num" v-loading="loading"/>
          </div>
        </div>
      </el-col>
    </el-row> -->
    <!-- <el-row class="echarts-line">
      <div id="echarts-moth-user" style="width: 100%;height:400px;" v-loading="loading"/>
    </el-row>
    <el-row class="echarts-line">
      <div id="echarts-moth-question" style="width: 100%;height:400px;" v-loading="loading"/>
    </el-row> -->

    

    <!-- <el-row class="echarts-line">
      <el-col :xs="16" :sm="16" :lg="16" class="card-panel-col">
        <div id="echartsRight" style="width: 100%; height: 400px"></div>
      </el-col>
      <el-col :xs="8" :sm="8" :lg="8" class="card-panel-col">
        <div id="echartsAbility" style="width: 100%; height: 400px"></div>
      </el-col>
    </el-row> -->

    <!-- <el-row class="echarts-line">
      <div id="echartsAbility" style="width: 100%; height: 400px"></div>
    </el-row> -->
    <!-- <el-row class="echarts-line">
      <div id="echartsTrain" style="width: 100%; height: 400px"></div>
    </el-row> -->

    <el-card >
      <el-tabs active-name="echartsRight">
        <el-tab-pane label="正确率趋势" name="echartsRight">
          <!-- <el-row class="echarts-line">
            <el-col :xs="16" :sm="16" :lg="16" class="card-panel-col"> -->
              <div id="echartsRight" ></div>
            <!-- </el-col>
            <el-col :xs="8" :sm="8" :lg="8" class="card-panel-col"> -->
              <!-- <div id="echartsAbility" style="width: 100%; height: 400px"></div> -->
            <!-- </el-col>
          </el-row> -->
        </el-tab-pane>
        <el-tab-pane label="能力分析" name="echartsAbility">
              <div id="echartsAbility"></div>
        </el-tab-pane>
        <el-tab-pane label="练习题量" name="echartsTrain">
          <!-- <el-row>
            <el-col  class="card-panel-col"> -->
              <div id="echartsTrain" ></div>
              <!-- </el-col>
          </el-row> -->
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
import resize from "./components/mixins/resize";
import CountTo from "vue-count-to";
import dashboardApi from "@/api/dashboard";

import * as echarts from "echarts";

export default {
  mixins: [resize],
  components: {
    CountTo,
  },
  data() {
    return {
      examPaperCount: 0,
      questionCount: 0,
      doExamPaperCount: 0,
      doQuestionCount: 0,
      echartsUserAction: null,
      echartsQuestion: null,
      loading: false,
    };
  },
  mounted() {
    // eslint-disable-next-line no-undef
    // this.echartsUserAction = echarts.init(
    //   document.getElementById("echarts-moth-user"),
    //   "macarons"
    // );
    // // eslint-disable-next-line no-undef
    // this.echartsQuestion = echarts.init(
    //   document.getElementById("echarts-moth-question"),
    //   "macarons"
    // );
    // let _this = this;
    // this.loading = true;
    // dashboardApi.index().then(re => {
    //   let response = re.response
    //   _this.examPaperCount = response.examPaperCount
    //   _this.questionCount = response.questionCount
    //   _this.doExamPaperCount = response.doExamPaperCount
    //   _this.doQuestionCount = response.doQuestionCount
    //   _this.echartsUserAction.setOption(this.option('用户活跃度', '{b}日{c}度', response.mothDayText, response.mothDayUserActionValue))
    //   _this.echartsQuestion.setOption(this.option('题目月数量', '{b}日{c}题', response.mothDayText, response.mothDayDoExamQuestionValue))
    //   this.loading = false
    // })
   
     this.$nextTick(()=>{
       this.initEchartsRight();
      this.initEchartsTrain();
      this.initEchartsAbility();
     })
   
  },
  methods: {
    initEchartsAbility() {
      
      var option = {
        center: [120, 120],
        radar: {
          // 雷达
          center: ["50%", "62%"],
          indicator: [
            {
              // 配置各位最大值
              name: "编程题",
              max: 100, // 原数据 6500
            },
            {
              name: "理论题",
              max: 100, // 16000
            },
            {
              name: "操作题",
              max: 100, // 30000
            },
          ],
          textStyle: {
            color: "#000000",
          },
        },
        series: [
          {
            label: {
              // 设置标签样式
              show: true, //显示数值
            },
            type: "radar", // 雷达图
            data: [
              {
                name: "能力分析",
                value: [99, 95, 78],
              },
            ],
          },
        ],
        color: ["#1890ff"],
      };
      var DOM = document.getElementById("echartsAbility");
      var echartsRight = echarts.init(DOM);
      echartsRight.clear();
      echartsRight.setOption(option);
      window.addEventListener("resize", () => {
        echartsRight.resize();
      });
    },
    initEchartsRight() {
      // var echartsRightDOM = this.$refs.echartsRight
      
      let arr = [
        {
          key1: "0",
        },
        {
          key2: "0",
        },
        {
          key3: "0",
        },
        {
          key4: "0",
        },
        {
          key5: "0",
        },
        {
          key6: "0",
        },
      ];
      const dataList = Array.from(
        {
          length: 20,
        },
        (v, k) => {
          const list = arr.filter((item) => item[`key${k + 1}`]);
          if (list.length) {
            return Number(list[0][`key${k + 1}`]);
          } else {
            return 0;
          }
        }
      );
      var data = dataList;

      var option = {
        legend: {
          y: "bottom",
          data: ["最近20次练习正确率趋势"],
        },
        xAxis: {
          type: "category",
          data: Array.from(
            {
              length: 20,
            },
            (v, k) => k + 1
          ),
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            name: "最近20次练习正确率趋势",
            type: "line",
            smooth: true,
            data,
          },
        ],
        color: ["#1369a6"],
      };
      var option = {
        title: {
          text: "练习正确率趋势",
        },
        tooltip: {},
        legend: {
          y: "bottom",
          data: ["练习正确率趋势"],
        },
        xAxis: {
          type: "category",
          data: Array.from(
            {
              length: 20,
            },
            (v, k) => k + 1
          ),
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            name: "练习正确率趋势",

            type: "line",
            smooth: true,
            data: [
              30, 45, 78, 45, 89, 90, 43, 56, 78, 80, 31, 34, 56, 23, 53, 67,
              89, 32, 78, 90,
            ],
          },
        ],
        color: ["#1890ff"],
      };
      var echartsRightDOM = document.getElementById("echartsRight");
      var echartsRight = echarts.init(echartsRightDOM);
      echartsRight.clear();
      echartsRight.setOption(option);
      window.addEventListener("resize", () => {
        echartsRight.resize();
      });
    },
    initEchartsTrain() {
      
      var option = {
        title: {
          text: "最近20天练习数量",
        },
        tooltip: {},
        legend: {
          y: "bottom",
          data: ["最近20天练习数量"],
        },
        xAxis: {
          type: "category",
          data: Array.from(
            {
              length: 20,
            },
            (v, k) => k + 1
          ),
          // data: [
          //   1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
          //   20,
          // ],
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            name: "最近20天练习数量",

            type: "line",
            smooth: true,
            data: [
              2, 6, 9, 3, 5, 12, 3, 6, 13, 17, 12, 4, 0, 2, 7, 9, 18, 12, 9, 4,
            ],
          },
        ],
        color: ["#1890ff"],
      };
      var echartsRightDOM = document.getElementById("echartsTrain");
      var echartsRight = echarts.init(echartsRightDOM);
      echartsRight.clear();
      echartsRight.setOption(option);
      window.addEventListener("resize", () => {
        echartsRight.resize();
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.dashboard-container {



// canvas{
//   width: 100% !important;
// }

// .el-tab-pane>div{
//   width: 100% !important;
// }


  padding: 32px;
  background-color: rgb(240, 242, 245);
  position: relative;

  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
  }
}

@media (max-width: 1024px) {
  .chart-wrapper {
    padding: 8px;
  }
}

.dashboard-editor-container {
  padding: 32px;
  background-color: rgb(240, 242, 245);
  position: relative;

  .github-corner {
    position: absolute;
    top: 0px;
    border: 0;
    right: 0;
  }

  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
  }
}

@media (max-width: 1024px) {
  .chart-wrapper {
    padding: 8px;
  }
}

.panel-group {
  margin-top: 18px;

  .card-panel-col {
    margin-bottom: 32px;
  }

  .card-panel {
    height: 108px;
    cursor: pointer;
    font-size: 12px;
    position: relative;
    overflow: hidden;
    color: #666;
    background: #fff;
    box-shadow: 4px 4px 40px rgba(0, 0, 0, 0.05);
    border-color: rgba(0, 0, 0, 0.05);

    &:hover {
      .card-panel-icon-wrapper {
        color: #fff;
      }

      .icon-people {
        background: #40c9c6;
      }

      .icon-message {
        background: #36a3f7;
      }

      .icon-money {
        background: #f4516c;
      }

      .icon-shopping {
        background: #34bfa3;
      }
    }

    .icon-people {
      color: #40c9c6;
    }

    .icon-message {
      color: #36a3f7;
    }

    .icon-money {
      color: #f4516c;
    }

    .icon-shopping {
      color: #34bfa3;
    }

    .card-panel-icon-wrapper {
      float: left;
      margin: 14px 0 0 14px;
      padding: 16px;
      transition: all 0.38s ease-out;
      border-radius: 6px;
    }

    .card-panel-icon {
      float: left;
      font-size: 48px;
    }

    .card-panel-description {
      float: right;
      font-weight: bold;
      margin: 26px;
      margin-left: 0px;

      .card-panel-text {
        line-height: 18px;
        color: rgba(0, 0, 0, 0.45);
        font-size: 16px;
        margin-bottom: 12px;
      }

      .card-panel-num {
        font-size: 20px;
      }
    }
  }
}

@media (max-width: 550px) {
  .card-panel-description {
    display: none;
  }

  .card-panel-icon-wrapper {
    float: none !important;
    width: 100%;
    height: 100%;
    margin: 0 !important;

    .svg-icon {
      display: block;
      margin: 14px auto !important;
      float: none !important;
    }
  }
}

.echarts-line {
  background: #fff;
  padding: 16px 16px 0;
  margin-bottom: 32px;
}



::v-deep .el-card{
  height: calc(100vh - 150px);
  
}

#echartsRight {
  width: calc(100vw - 260px );
  height: 400px;
  margin-top: 5%;
}
#echartsAbility {
     width: calc(100vw - 260px );
  height: 400px;
  margin-top: 5%;
}
#echartsTrain {
    width: calc(100vw - 260px );
  height: 400px;
  margin-top: 5%;
}
</style>

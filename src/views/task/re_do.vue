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
      <!-- <div class="response-title">解：</div> -->
      <!-- <el-input type="textarea" rows="8" v-model="test.response"></el-input> -->

      <div class="check-box">
        <el-checkbox
          v-model="check.checked"
          :disabled="check.disabled"
          v-for="(check, index) in test.checkList"
          :key="index"
          @change="selectItem(check, index)"
          >{{ check.select }}</el-checkbox
        >
      </div>
      <div
        class="your_answer"
        v-show="showAnswer"
        :class="test.answer.your_answer!=null ? 'red' : 'green'"
      >
        {{
          test.answer.your_answer!=null
            ? "错误答案：" + test.answer.your_answer
            : "  C  答案正确"
        }}
      </div>
      <div class="answer-box">
        <p class="answer-title" v-show="showAnswer">参考答案：</p>
        <div class="answer-detail" v-show="showAnswer">
          {{ test.answer.detail }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      test: {
        title: "单选题",
        subject: `下列有关计算机系统组成成分正确的是？ （5.0分）`,
        response: "",
        answer: {
          your_answer: null,
          right: `C、硬件系统包括以下五个部分：运算器、控制器、存储设备、输入设备、输出设备。`,
          detail: `一个完整的计算机系统由硬件和软件系统构成。硬件系统包括以下五个部分：运算器、控制器、存储设备、输入设备、输出设备。软件系统包括：系统软件和应用软件两个部分。故选 C 。`,
        },
        check: false,
        checkList: [
          {
            checked: false,
            disabled: false,
            select: "A、计算机系统由计算机软件系统构成。",
            color: "",
          },
          {
            checked: false,
            disabled: false,
            select: "B、计算机系统由计算机硬件系统构成。",
            color: "",
          },
          {
            checked: false,
            disabled: false,
            select:
              "C、硬件系统包括以下五个部分：运算器、控制器、存储设备、输入设备、输出设备。",
            color: "",
          },
          {
            checked: false,
            disabled: false,
            select: "D、软件系统指的是应用层上的应用软件部分。",
            color: "",
          },
        ],
      },
      showAnswer: false,
      id: -1,
    };
  },
  created() {
    this.initData();
  },
  methods: {
    initData() {
      let list = this.test.checkList;
      list.map((item) => {
        item.checked = false;
        item.disabled = false;
      });
    },
    selectItem(check, index) {
      var arr = this.test.checkList;
      if (check.checked) {
        arr.forEach((item, i) => {
          item.checked = false;
        });
        arr[index].checked = true;
        this.test.answer.your_answer = arr[index].select;
      }
    },
    submitResponse() {
      var arr = this.test.checkList;
      var selectItem = arr.filter((item) => {
        item.disabled=true
        if (item.checked === true && item.select) {
          return item;
        }
      });
       console.log(selectItem);
      if (!selectItem || !selectItem[0].select) {
        return this.$message.warning("答案不能为空");
      }
     
      if (selectItem[0].select == this.test.answer.right) {
        this.$message.success("提交成功");
        this.test.answer.your_answer = null;
      } else {
        this.$message.error("答案错误");
        // this.test.answer.your_answer=selectItem.select
      }
      this.showAnswer = true;
      // if (!select[0].checked && !select[0].select) {
      // selectItem.select == this.test.answer.right
      //   ? ""
      //   : (selectItem.color = "#F56C6C");
      // }
      // this.test.response
      //   ? `${this.$message.success("提交成功")}`
      //   : this.$message.error("答案不能为空");
      // // this.showAnswer = true;
      // if(this.test.response){
      //   this.$router.push("/task/list")
      // }
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
      // text-indent: 36px;
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
    .check-box {
      display: flex;
      flex-direction: column;
      line-height: 2;
    }
    .your_answer {
      margin: 5% 0;
    }
  }
}
.red{
  color: #F56C6C;
}
.green{
  color: green;
}
</style>
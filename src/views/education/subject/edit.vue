<template>
  <div class="app-container">
    <el-form
      :model="form"
      ref="form"
      label-width="100px"
      v-loading="formLoading"
      :rules="formRules"
    >
      <el-form-item label="考卷名称：" required prop="name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="考试时间：" required prop="dateTime">
        <el-input v-model="form.dateTime"></el-input>
      </el-form-item>
      <el-form-item label="考试时长：" required prop="last">
        <el-input v-model="form.last"></el-input>
      </el-form-item>
      <el-form-item label="题目数量：" required prop="quantity">
        <el-input v-model="form.quantity"></el-input>
      </el-form-item>
      <el-form-item label="限制类型：" required prop="limitType">
        <el-select v-model="form.limitType">
          <el-option
            v-for="item in types"
            :key="item.key"
            :value="item.value"
            :label="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="监控模式：" required prop="monitorMode">
        <el-select v-model="form.monitorMode">
          <el-option
            v-for="item in modes"
            :key="item.key"
            :value="item.value"
            :label="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="积分标准：" required  prop="scoreStandard">
        <el-input v-model="form.scoreStandard"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm">提交</el-button>
        <el-button @click="resetForm">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mapGetters, mapState, mapActions } from "vuex";
import subjectApi from "@/api/subject";

export default {
  data() {
    return {
      form: {
        // id: null,
        // name: '',
        // level: 1,
        // levelName: ''

        name: "",
        dateTime: "",
        last: "2h",
        limitType: "每日一次",
        monitorMode: "监控桌面",
        scoreStandard: "15分",
        accomplish: "未完成", // 默认不输入
        quantity: "1",
      },
      formLoading: false,
      formRules: {
        name: [{ required: true, message:"不能为空", trigger: "blur" }],
        dateTime: [{ required: true, message:"不能为空",  trigger: "blur" }],
        last: [{ required: true,  message:"不能为空", trigger: "blur" }],
        limitType: [{ required: true, message:"不能为空",  trigger: "blur" }],
        monitorMode: [{ required: true, message:"不能为空",  trigger: "blur" }],
        scoreStandard: [{ required: true, message:"不能为空",  trigger: "blur" }],
        accomplish: [{ required: true, message:"不能为空",  trigger: "blur" }], // 默认不输入
        quantity: [{ required: true, message:"不能为空",  trigger: "blur" }],
      },
      modes: [
        {
          value: "监控桌面",
          key: 0,
        },
        {
          value: "监控人脸",
          key: 1,
        },
      ],
      types: [
        {
          value: "每日一次",
          key: 0,
        },
        {
          value: "只能做一次",
          key: 1,
        },
      ],

      id: -1,
    };
  },
  created() {
    if (this.$route.query.data) {
      let data = JSON.parse(this.$route.query.data);
      this.id = parseInt(data);
      let _this = this;
      _this.formLoading = true;
      var arr = _this.$getStorage("exam_list");
      _this.form = arr[_this.id];
      _this.formLoading = false;
    }
  },
  methods: {
    submitForm() {
      var _this = this;
      this.$refs.form.validate((valid) => {
        if (valid) {
          console.log(valid);
          _this.formLoading = true;
          if (_this.form && _this.id != -1) {
            // 修改
            var arr = _this.$getStorage("exam_list");
            arr[_this.id] = _this.form;
            _this.$setStorage("exam_list", arr);
            _this.$message.success("修改成功");
          } else {
            // 新增
            if (_this.form) {
              var arr = _this.$getStorage("exam_list");
              arr.push(_this.form);
              _this.$setStorage("exam_list", arr);
              _this.$message.success("提交成功");
            }
          }
          _this.$router.push("/education/subject/list");
          _this.formLoading = false;
        } else {
          this.$message.warning("请填写完整");
        }
      });

      // this.form.levelName = this.enumFormat(this.levelEnum, this.form.level)
      // subjectApi.edit(this.form).then(data => {
      //   if (data.code === 1) {
      //     _this.$message.success(data.message)
      //     _this.delCurrentView(_this).then(() => {
      //       _this.$router.push('/education/subject/list')
      //     })
      //   } else {
      //     _this.$message.error(data.message)
      //     _this.formLoading = false
      //   }
      // }).catch(e => {
      //   _this.formLoading = false
      // })
    },
    resetForm() {
      let lastId = this.form.id;
      this.$refs["form"].resetFields();
      this.form = {
        //   id: null,
        //   name: '',
        //   level: 1,
        //   levelName: ''
        name: "",
        dateTime: "",
        last: "",
        limitType: "",
        monitorMode: "",
        scoreStandard: "",
        accomplish: "", // 默认不输入
        quantity: "",
      };
      // this.form.id = lastId
    },
    ...mapActions("tagsView", { delCurrentView: "delCurrentView" }),
  },
  computed: {
    ...mapGetters("enumItem", ["enumFormat"]),
    ...mapState("enumItem", {
      levelEnum: (state) => state.user.levelEnum,
    }),
  },
};
</script>

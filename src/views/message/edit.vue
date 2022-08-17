<template>
  <div class="app-container">
    <el-form
      :model="form"
      ref="form"
      :rules="formRules"
      label-width="100px"
      v-loading="formLoading"
    >
      <el-form-item label="名称：" required prop="name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="创建时间：" required prop="dateTime">
        <el-input v-model="form.dateTime"></el-input>
      </el-form-item>
      <el-form-item label="题型：" required prop="type">
        <el-select v-model="form.type">
          <el-option
            v-for="item in types"
            :key="item.key"
            :value="item.value"
            :label="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="考点：" required prop="config">
        <el-select v-model="form.config" multiple>
          <el-option
            v-for="item in configs"
            :key="item.key"
            :label="item.value"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="问题：" required prop="question">
        <el-input type="textarea" v-model="form.question"></el-input>
      </el-form-item>
      <el-form-item label="答案解答：" required prop="answer">
        <el-input type="textarea" v-model="form.answer"></el-input>
      </el-form-item>
      <el-form-item label="上传材料：" align="center">
        <el-upload
          class="upload-demo"
          drag
          action="https://jsonplaceholder.typicode.com/posts/"
          multiple
        >
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        </el-upload>
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
        name: "",
        type: "Access",
        question: "无",
        answer: "有",
        config: "第一章",
        createTime: "" || `${new Date()}`,
      },
      formLoading: false,
      types: [
        {
          value: "Word",
          key: 0,
        },
        {
          value: "Excel",
          key: 1,
        },
        {
          value: "Access",
          key: 2,
        },
        {
          value: "Windows",
          key: 3,
        },
        {
          value: "IE",
          key: 4,
        },
        {
          value: "EMail",
          key: 5,
        },
        {
          value: "网络操作",
          key: 6,
        },
      ],
      configs: [
        {
          value: "第一章",
          key: 0,
        },
        {
          value: "第二章",
          key: 1,
        },
        {
          value: "第三章",
          key: 2,
        },
        {
          value: "第四章",
          key: 3,
        },
      ],

      id: -1,
      videoFlag: false,
      //是否显示进度条
      videoUploadPercent: "",
      //进度条的进度，
      isShowUploadVideo: false,
      //显示上传按钮
      videoForm: {
        showVideoPath: "",
      },
      // :rules="formRules"
      // prop=""
      //       this.$refs.form.validate((valid) => {
      //         if (valid) {}})
       // [{ required: true, message:"不能为空", trigger: "blur" }],
      formRules: {
        name: [{ required: true, message: "不能为空", trigger: "blur" }],
        type: [{ required: true, message: "不能为空", trigger: "blur" }],
        question: [{ required: true, message: "不能为空", trigger: "blur" }],
        answer: [{ required: true, message: "不能为空", trigger: "blur" }],
        config: [{ required: true, message: "不能为空", trigger: "blur" }],
        createTime: [{ required: true, message: "不能为空", trigger: "blur" }],
       
      },
    };
  },
  created() {
    if (this.$route.query.data) {
      let data = JSON.parse(this.$route.query.data);
      this.id = parseInt(data);
      let _this = this;
      _this.formLoading = true;
      var arr = _this.$getStorage("operate_list");
      _this.form = arr[_this.id];
      _this.formLoading = false;
    }
  },
  methods: {
    submitForm() {
      var _this = this;
      this.$refs.form.validate((valid) => {
        if (valid) {
          _this.formLoading = true;
          if (_this.form && _this.id != -1) {
            // 修改
            var arr = _this.$getStorage("operate_list");
            arr[_this.id] = _this.form;
            _this.$setStorage("operate_list", arr);
            _this.$message.success("修改成功");
            _this.$router.push("/topic/operate/list");
          } else {
            // 新增
            if (_this.form) {
              var arr = _this.$getStorage("operate_list");
              arr.push(_this.form);
              _this.$setStorage("operate_list", arr);
              _this.$message.success("提交成功");
              _this.$router.push("/topic/operate/list");
            }
          }
        }else{
          this.$message.warning("请填写完整")
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
        name: "",
        type: "",
        question: "",
        config: "",
        answer: "",
        createTime: `${new Date()}`,
      };
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

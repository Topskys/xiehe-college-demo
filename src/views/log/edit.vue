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
      <el-form-item label="执行时间：" required prop="time">
        <el-input v-model="form.time"></el-input>
      </el-form-item>
      <el-form-item label="执行内存：" required prop="limitRAM">
        <el-input v-model="form.limitRAM"></el-input>
      </el-form-item>
      <el-form-item label="编程语言：" required prop="language">
        <el-select v-model="form.language">
          <el-option
            v-for="item in languages"
            :key="item.key"
            :value="item.value"
            :label="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="描述：" required prop="description">
        <!-- <el-input type="textarea" v-model="form.description"></el-input> -->
        <quill-editor
          class="editor"
          v-model="form.description"
          ref="myQuillEditor"
          :options="editorOption"
          @blur="onEditorBlur($event)"
          @focus="onEditorFocus($event)"
          @change="onEditorChange($event)"
        >
        </quill-editor>
      </el-form-item>
      <el-form-item label="输出：" required prop="output">
        <!-- <el-input type="textarea" v-model="form.output"></el-input> -->
        <quill-editor
          class="editor"
          v-model="form.output"
          ref="myQuillEditor"
          :options="editorOption"
          @blur="onEditorBlur($event)"
          @focus="onEditorFocus($event)"
          @change="onEditorChange($event)"
        >
        </quill-editor>
      </el-form-item>
      <el-form-item label="用例配置：">
        <el-input v-model="form.config"></el-input>
      </el-form-item>
      <el-form-item label="上传用例：" align="center">
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
import { quillEditor } from "vue-quill-editor";
export default {
  data() {
    return {
      form: {
        name: "",
        time: "10s" || `${new Date()}`,
        time: "10s",
        language: "C++",
        description: "",
        output: "",
        limitRAM: "10MB",
        config: "有",
      },
      formLoading: false,
      languages: [
        {
          value: "C",
          key: 0,
        },
        {
          value: "C++",
          key: 1,
        },
        {
          value: "Java",
          key: 2,
        },
        {
          value: "Python2",
          key: 3,
        },
        {
          value: "Python3",
          key: 4,
        },
        {
          value: "Access",
          key: 5,
        },
        {
          value: "JavaScript",
          key: 6,
        },
        {
          value: "CSS",
          key: 7,
        },
      ],
      // content: null,
      editorOption: {},

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
      // formRules: {}
      // [{ required: true, message:"不能为空", trigger: "blur" }],
      formRules: {
        name: [{ required: true, message: "不能为空", trigger: "blur" }],
        time: [{ required: true, message: "不能为空", trigger: "blur" }],
        language: [{ required: true, message: "不能为空", trigger: "blur" }],
        description: [{ required: true, message: "不能为空", trigger: "blur" }],
        output: [{ required: true, message: "不能为空", trigger: "blur" }],
        limitRAM: [{ required: true, message: "不能为空", trigger: "blur" }],
      },
    };
  },
  created() {
    if (this.$route.query.data) {
      let data = JSON.parse(this.$route.query.data);
      this.id = parseInt(data);
      let _this = this;
      _this.formLoading = true;
      var arr = _this.$getStorage("program_list");
      _this.form = arr[_this.id];
      _this.formLoading = false;
    }
  },
  methods: {
    submitForm() {
      var _this = this;
      _this.form.description=_this.form.description.replace(/<\/?.+?\/?>/g, '') 
      _this.form.output=_this.form.output.replace(/<\/?.+?\/?>/g, '') 
      this.$refs.form.validate((valid) => {
        if (valid) {
          _this.formLoading = true;
          if (_this.form && _this.id != -1) {
            // 修改
            var arr = _this.$getStorage("program_list");
            arr[_this.id] = _this.form;
            _this.$setStorage("program_list", arr);
            _this.$message.success("修改成功");
          } else {
            // 新增
            if (_this.form) {
              var arr = _this.$getStorage("program_list");
              arr.push(_this.form);
              _this.$setStorage("program_list", arr);
              _this.$message.success("提交成功");
            }
          }
          _this.$router.push("/topic/program/list");
        } else {
          this.$message.warning("请填写完整");
        }
      });
    },
    resetForm() {
      let lastId = this.form.id;
      this.$refs["form"].resetFields();
      this.form = {
        name: "",
        time: "",
        language: "",
        description: "",
        output: "",
        limitRAM: "",
        test: "",
      };
    },
    onEditorBlur() {},
    onEditorFocus() {
      //获得焦点事件
    },
    onEditorChange() {
      //内容改变事件
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

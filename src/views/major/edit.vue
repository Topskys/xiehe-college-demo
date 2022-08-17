<template>
  <div class="app-container">
    <el-form
      :model="form"
      ref="form"
      :rules="formRules"
      label-width="100px"
      v-loading="formLoading"
    >
      <el-form-item label="专业名称：" required prop="name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="学院：" required prop="college">
        <el-input v-model="form.college"></el-input>
      </el-form-item>
      <el-form-item label="年级：" required prop="level">
        <el-input v-model="form.level"></el-input>
      </el-form-item>
      <el-form-item label="人数：" required prop="count">
        <el-input v-model="form.count"></el-input>
      </el-form-item>
      <el-form-item label="选择课程：" required prop="course">
        <el-select v-model="form.course" multiple>
          <el-option
            v-for="item in courses"
            :key="item.key"
            :value="item.value"
            :label="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="学习步骤：" required prop="step">
        <quill-editor
          class="editor"
          v-model="form.step"
          ref="myQuillEditor"
          :options="editorOption"
          @blur="onEditorBlur($event)"
          @focus="onEditorFocus($event)"
          @change="onEditorChange($event)"
        >
        </quill-editor>
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
        college: "",
        level: "",
        count: "",
        course: "",
        step: "",
      },
      formLoading: false,
      courses: [
        {
          value: "计算机组成与原理",
          key: 0,
        },
        {
          value: "计算机网络原理",
          key: 1,
        },
        {
          value: "思科路由",
          key: 2,
        },
        {
          value: "云计算技术原理与应用",
          key: 3,
        },
        {
          value: "Android程序基础开发",
          key: 4,
        },
      ],

      id: -1,
// content: null,
      editorOption: {},
      formRules: {
        name: [{ required: true, message: "不能为空", trigger: "blur" }],
        college: [{ required: true, message: "不能为空", trigger: "blur" }],
        level: [{ required: true, message: "不能为空", trigger: "blur" }],
        count: [{ required: true, message: "不能为空", trigger: "blur" }],
        course: [{ required: true, message: "不能为空", trigger: "blur" }],
        step: [{ required: true, message: "不能为空", trigger: "blur" }],
      },
    };
  },
  created() {
    if (this.$route.query.data) {
      let data = JSON.parse(this.$route.query.data);
      this.id = parseInt(data);
      let _this = this;
      _this.formLoading = true;
      var arr = _this.$getStorage("major_list");
      _this.form = arr[_this.id];
      _this.formLoading = false;
    }
  },
  methods: {
    submitForm() {
      var _this = this;
      _this.form.step = _this.form.step.replace(/<\/?.+?\/?>/g, '')
      this.$refs.form.validate((valid) => {
        if (valid) {
          _this.formLoading = true;
          if (_this.form && _this.id != -1) {
            // 修改
            var arr = _this.$getStorage("major_list");
            arr[_this.id] = _this.form;
            _this.$setStorage("major_list", arr);
            _this.$message.success("修改成功");
          } else {
            // 新增
            if (_this.form) {
              var arr = _this.$getStorage("major_list");
              arr.push(_this.form);
              _this.$setStorage("major_list", arr);
              _this.$message.success("提交成功");
            }
          }
          _this.$router.push("/major/paper/list");
          _this.formLoading = false;
        } else {
          this.$message.warning("请填写完整");
        }
      });
    },
    resetForm() {
      let lastId = this.form.id;
      this.$refs["form"].resetFields();
      // this.form = {
      //   id: null,
      //   name: '',
      //   level: 1,
      //   levelName: ''
      // }
      // this.form.id = lastId
      this.form = {
        name: "",
        dateTime: "",
        last: "",
        limitType: "",
        monitorMode: "",
        scoreStandard: "",
        type: "",
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

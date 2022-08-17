<template>
  <div class="app-container">
    <el-form
      :model="form"
      ref="form"
      :rules="formRules"
      label-width="100px"
      v-loading="formLoading"
    >
      <el-form-item label="题目：" required prop="name">
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
      <el-form-item
        label="选项："
        required
        v-show="form.type == '单选' || form.type == '多选'"
      >
        <el-input v-model="form.select1" placeholder="选项A"></el-input>
        <el-input v-model="form.select2" placeholder="选项B"></el-input>
        <el-input v-model="form.select3" placeholder="选项C"></el-input>
        <el-input v-model="form.select4" placeholder="选项D"></el-input>
        <el-input v-model="form.right" placeholder="正确选项"></el-input>
      </el-form-item>
      <el-form-item label="题目详情：" required v-show="form.type == '简答'">
        <el-input v-model="form.detail" placeholder="题目详情"></el-input>
        <!-- <el-input v-model="form.right" placeholder="正确答案"></el-input> -->
      </el-form-item>
      <el-form-item label="问题：" required prop="question">
        <el-input type="textarea" v-model="form.question"></el-input>
      </el-form-item>
      <el-form-item label="答案解答：" required prop="answer">
        <el-input type="textarea" v-model="form.answer"></el-input>
      </el-form-item>
      <el-form-item label="视屏解答：" align="center">
        <!-- <el-upload
          class="avatar-uploader"
          action="127.0.0.1"
          v-bind:data="{ FoldPath: '上传目录', SecretKey: '安全验证' }"
          v-bind:on-progress="uploadVideoProcess"
          v-bind:on-success="handleVideoSuccess"
          v-bind:before-upload="beforeUploadVideo"
          v-bind:show-file-list="false"
        >
          <video
            v-if="videoForm.showVideoPath != '' && !videoFlag"
            v-bind:src="videoForm.showVideoPath"
            class="avatar video-avatar"
            controls="controls"
          >
            您的浏览器不支持视频播放
          </video>
          <i
            v-else-if="videoForm.showVideoPath == '' && !videoFlag"
            class="el-icon-plus avatar-uploader-icon"
          ></i>
          <el-progress
            v-if="videoFlag == true"
            type="circle"
            v-bind:percentage="videoUploadPercent"
            style="margin-top: 7px"
          ></el-progress>
        </el-upload> -->
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
        // id: null,
        // name: '',
        // level: 1,
        // levelName: ''

        name: "",
        dateTime: "" || `${new Date()}`,
        type: "",
        question: "无",
        answer: "",
        select1: "",
        select2: "",
        select3: "",
        select4: "",
        right: "",
        detail: "",
      },
      formLoading: false,
      types: [
        {
          value: "单选",
          key: 0,
        },
        {
          value: "多选",
          key: 1,
        },
        {
          value: "填空",
          key: 2,
        },
        {
          value: "判断",
          key: 3,
        },
        {
          value: "简答",
          key: 4,
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

      formRules: {
        name: [{ required: true, message: "不能为空", trigger: "blur" }],
        dateTime: [{ required: true, message: "不能为空", trigger: "blur" }],
        type: [{ required: true, message: "不能为空", trigger: "blur" }],
        question: [{ required: true, message: "不能为空", trigger: "blur" }],
        answer: [{ required: true, message: "不能为空", trigger: "blur" }],
      },
    };
  },
  created() {
    if (this.$route.query.data) {
      let data = JSON.parse(this.$route.query.data);
      this.id = parseInt(data);
      let _this = this;
      _this.formLoading = true;
      var arr = _this.$getStorage("theory_list");
      _this.form = arr[_this.id];
      console.log("准备修改：", _this.$getStorage("theory_list")[_this.id]); //
      _this.formLoading = false;
    }
  },
  methods: {
    submitForm() {
      var _this = this;
      if (_this.form.type == "单选" || _this.form.type == "多选") {
        if (
          !_this.form.select1 ||
          !_this.form.select2 ||
          !_this.form.select3 ||
          !_this.form.select4
        ) {
          return _this.$message.warning("选项未填写完整");
        }
      }
      if (_this.form.type == "简答") {
        if (!_this.form.detail) {
          return _this.$message.warning("未填写完整");
        }
      }
      _this.$refs.form.validate((valid) => {
        if (valid) {
          _this.formLoading = true;
          if (_this.form && _this.id != -1) {
            // 修改
            var arr = _this.$getStorage("theory_list");
            arr[_this.id] = _this.form;
            console.log("update::", arr);
            _this.$setStorage("theory_list", arr);
            // _this.$bus.$emit("updateExam", JSON.stringify(data));
          } else {
            // 新增
            if (_this.form) {
              var arr = _this.$getStorage("theory_list");
              arr.push(_this.form);
              _this.$setStorage("theory_list", arr);
              _this.$bus.$emit("add");
              _this.$message.success("提交成功");
            }
          }
          _this.$router.push("/topic/list");
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
        name: "",
        dateTime: "" ,
        type: "",
        question: "",
        answer: "",
        select1: "",
        select2: "",
        select3: "",
        select4: "",
        right: "",
        detail: "",
      };
    },
    //上传前回调
    beforeUploadVideo(file) {
      var fileSize = file.size / 1024 / 1024 < 500;
      if (
        [
          "video/mp4",
          "video/ogg",
          "video/flv",
          "video/avi",
          "video/wmv",
          "video/rmvb",
          "video/mov",
        ].indexOf(file.type) == -1
      ) {
        layer.msg("请上传正确的视频格式");
        return false;
      }
      if (!fileSize) {
        layer.msg("视频大小不能超过500MB");
        return false;
      }
      this.isShowUploadVideo = false;
    },
    //进度条
    uploadVideoProcess(event, file, fileList) {
      this.videoFlag = true;
      this.videoUploadPercent = file.percentage.toFixed(0) * 1;
    },
    //上传成功回调
    handleVideoSuccess(res, file) {
      this.isShowUploadVideo = true;
      this.videoFlag = false;
      this.videoUploadPercent = 0;

      //前台上传地址
      //if (file.status == 'success' ) {
      //    this.videoForm.showVideoPath = file.url;
      //} else {
      //     layer.msg("上传失败，请重新上传");
      //}

      //后台上传地址
      // if (res.Code == 0) {
      //   this.videoForm.showVideoPath = res.Data;
      // } else {
      //   layer.msg(res.Message);
      // }
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

<template>
  <div class="app-container">
    <!-- <el-form :model="form" ref="form" label-width="100px" v-loading="formLoading" :rules="rules">
      <el-form-item label="用户名："  prop="userName" required>
        <el-input v-model="form.userName"></el-input>
      </el-form-item>
      <el-form-item label="密码："  required>
        <el-input v-model="form.password"></el-input>
      </el-form-item>
      <el-form-item label="真实姓名：" prop="realName" required>
        <el-input v-model="form.realName"></el-input>
      </el-form-item>
      <el-form-item label="年龄：">
        <el-input v-model="form.age"></el-input>
      </el-form-item>
      <el-form-item label="性别：">
        <el-select v-model="form.sex" placeholder="性别" clearable>
          <el-option v-for="item in sexEnum" :key="item.key" :value="item.key" :label="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="出生日期：">
        <el-date-picker v-model="form.birthDay" type="date" value-format="yyyy-MM-dd" placeholder="选择日期" />
      </el-form-item>
      <el-form-item label="手机：">
        <el-input v-model="form.phone"></el-input>
      </el-form-item>
      <el-form-item label="年级：" prop="userLevel" required>
        <el-select v-model="form.userLevel" placeholder="年级">
          <el-option v-for="item in levelEnum" :key="item.key" :value="item.key" :label="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="状态：" required>
        <el-select v-model="form.status" placeholder="状态">
          <el-option v-for="item in statusEnum" :key="item.key" :value="item.key" :label="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm">提交</el-button>
        <el-button @click="resetForm">重置</el-button>
      </el-form-item>
    </el-form> -->

    <div class="ready-box">
      <h2>
        <b
          ><mark>{{ form.name }}</mark></b
        >
      </h2>
      <p>
        考试时长：<b>{{ form.last }}</b>
      </p>
      <h5>
        请注意考试时间，期间有网络断开的情况，可以重新登录考试，但考试计时将不会停止。点击考试，我们将默认你允许开启摄像头权限。
      </h5>
      
      <router-link
            :to="{
              path: '/exam/student/test',
              query: { data: JSON.stringify(id>-1?id:'')},
            }"
          >
          <el-button type="danger" size="large">开始考试</el-button>
          </router-link>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState, mapActions } from "vuex";
import userApi from "@/api/user";

export default {
  data() {
    return {
      form: {
        id: null,
        userName: "",
        password: "",
        realName: "",
        role: 1,
        status: 1,
        age: "",
        sex: "",
        birthDay: null,
        phone: null,
        userLevel: null,
        name: "",
        last: "",
      },
      formLoading: false,
      rules: {
        userName: [
          { required: true, message: "请输入用户名", trigger: "blur" },
        ],
        realName: [
          { required: true, message: "请输入真实姓名", trigger: "blur" },
        ],
        userLevel: [
          { required: true, message: "请选择年级", trigger: "change" },
        ],
      },
      id: -1,
    };
  },
  created() {
    // let id = this.$route.query.id
    // let _this = this
    // if (id && parseInt(id) !== 0) {
    //   _this.formLoading = true
    //   userApi.selectUser(id).then(re => {
    //     _this.form = re.response
    //     _this.formLoading = false
    //   })
    // }
    this.getReadyData();
  },
  methods: {
    getReadyData() {
      this.id = parseInt(JSON.parse(this.$route.query.data));
      let id = this.id;
      let list = this.$getStorage("exam_list");
      if (id  !== -1 && list[id].name) {
        this.form = list[id];
      }
    },
    submitForm() {
      let _this = this;
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.formLoading = true;
          userApi
            .createUser(this.form)
            .then((data) => {
              if (data.code === 1) {
                _this.$message.success(data.message);
                _this.delCurrentView(_this).then(() => {
                  _this.$router.push("/user/student/list");
                });
              } else {
                _this.$message.error(data.message);
                _this.formLoading = false;
              }
            })
            .catch((e) => {
              _this.formLoading = false;
            });
        } else {
          return false;
        }
      });
    },
    resetForm() {
      let lastId = this.form.id;
      this.$refs["form"].resetFields();
      this.form = {
        id: null,
        userName: "",
        password: "",
        realName: "",
        role: 1,
        status: 1,
        age: "",
        sex: "",
        birthDay: null,
        phone: null,
        userLevel: null,
      };
      this.form.id = lastId;
    },
    ...mapActions("tagsView", { delCurrentView: "delCurrentView" }),
  },
  computed: {
    ...mapGetters("enumItem", ["enumFormat"]),
    ...mapState("enumItem", {
      sexEnum: (state) => state.user.sexEnum,
      roleEnum: (state) => state.user.roleEnum,
      statusEnum: (state) => state.user.statusEnum,
      levelEnum: (state) => state.user.levelEnum,
    }),
  },
};
</script>
<style lang='scss' scoped>
.app-container {
  .ready-box {
    text-align: center;
    padding: 12.41rem 0 0 0;
    // height: calc(100vh - 120px);
    // line-height: calc(100vh - 120px);
  }
}
</style>

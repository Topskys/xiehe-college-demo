<template>
  <el-card style="margin-bottom: 20px">
    <div slot="header" class="clearfix">
      <span>关于我</span>
    </div>

    <div class="user-profile">
      <div class="box-center">
        <!-- <img
          :src="
            userInfo.imagePath === null
              ? require('@/assets/avatar.gif')
              : userInfo.imagePath
          "
          height="100px"
          width="100px"
          style="border-radius: 50px"
        /> -->
        <img
          :src="
            student.imgUrl === null
              ? require('@/assets/avatar.gif')
              : student.imgUrl
          "
          height="100px"
          width="100px"
          style="border-radius: 50px"
        />
      </div>
      <div class="box-center">
        <!-- <div class="user-name text-center">{{ student.name}}</div>
        <div class="user-name text-center">{{ student.id}}</div>
        <div class="user-name text-center">{{ student.class}}</div>
        <div class="user-name text-center">{{ student.college}}</div> -->
        <div class="user-role text-center text-muted">
          <!-- {{ enumFormat(roleEnum, userInfo.role) }} -->
        </div>
      </div>
    </div>

    <div class="user-bio">
      <div class="user-education user-bio-section">
        <div class="user-bio-section-header">
          <svg-icon icon-class="education" /><span>个人简介</span>
        </div>
        <div class="user-bio-section-body">
          <div class="text-muted">
            <p>姓名：{{ student.name }}</p>
            <p>学号：{{ student.id }}</p>
            <p>班级：{{ student.class }}</p>
            <p>学院：{{ student.college }}</p>
          </div>
        </div>
      </div>
    </div>
  </el-card>
</template>

<script>
import { mapGetters, mapState } from "vuex";

export default {
  props: {
    userInfo: {
      type: Object,
      default: () => {
        return {
          realName: "",
          userName: "",
          role: "",
          imagePath: null,
        };
      },
    },
    student:{
      type:Object,
      default:()=>{
        return{
          name:"",
          id:"",
          college:"",
          class:"",
          imgUrl:null
        }
      }
    }
  },
  computed: {
    ...mapGetters("enumItem", ["enumFormat"]),
    ...mapState("enumItem", {
      roleEnum: (state) => state.user.roleEnum,
    }),
  },
};
</script>

<style lang="scss" scoped>
.box-center {
  margin: 0 auto;
  display: table;
}

.text-muted {
  color: #777;
}

.user-profile {
  .user-name {
    font-weight: bold;
  }

  .box-center {
    padding-top: 10px;
  }

  .user-role {
    padding-top: 10px;
    font-weight: 400;
    font-size: 14px;
  }

  .box-social {
    padding-top: 30px;

    .el-table {
      border-top: 1px solid #dfe6ec;
    }
  }

  .user-follow {
    padding-top: 20px;
  }
}

.user-bio {
  margin-top: 20px;
  color: #606266;

  span {
    padding-left: 4px;
  }

  .user-bio-section {
    font-size: 14px;
    padding: 15px 0;

    .user-bio-section-header {
      border-bottom: 1px solid #dfe6ec;
      padding-bottom: 10px;
      margin-bottom: 10px;
      font-weight: bold;
    }
  }
}
</style>

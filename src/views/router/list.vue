<template>
  <div class="router-box">
    <div class="router-item" v-for="(item, index) in list" :key="index">
      <el-card>
        <router-link :to="item.path">
          <p class="router-name">{{ item.name }}</p>
        </router-link>
      </el-card>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
  data() {
    return {
      list: [],
      routers: [
        {
          name: "个人信息",
          path: "/profile/index",
        },
        {
          name: "评估报告",
          path: "/dashboard/list",
        },
        {
          name: "考试",
          path: "/exam/student/list",
        },
        {
          name: "错题集",
          path: "/task/list",
        },
        {
          name: "专业管理",
          path: "/major/paper/list",
        },
        {
          name: "考试管理",
          path: "/education/subject/list",
        },
        {
          name: "理论题管理",
          path: "/topic/list",
        },
        {
          name: "操作题管理",
          path: "/topic/operate/list",
        },
        {
          name: "编程题管理",
          path: "/topic/program/list",
        },
        {
          name: "训练列表",
          path: "/train/list",
        },
        {
          name: "监控列表",
          path: "/monitor/list",
        },
        // {
        //   name: "路由列表",
        //   path: "/router/list",
        // },
        //
      ],
      // userName: "",
    };
  },
  computed: {
    ...mapGetters(["sidebar", "device", "userName"]),
  },
  created(){
    this.resetRouterList()
    this.redirectPath()
  },
  methods: {
    redirectPath(){
      let currUser=this.$getStorage("currentUser")
      if(!this.userName|| this.userName==""||!currUser || currUser==""|| currUser==null){
        this.$router.replace("/login")
      }
    },
    resetRouterList() {
      var currUser = this.userName|| this.$getStorage("currentUser") ;
      var routers = this.routers;
      this.list = currUser == "student" ? routers.slice(0, 4) : routers.slice(4);
    },
  },
};
</script>

<style lang='scss' scoped>
.router-box {
  padding: 20px;
  // display: flex;
  // align-items: center;
  // flex-wrap: wrap;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  // grid-auto-rows: 1fr;
  gap: 20px;
  .router-item {
    width: 12.5rem;
    text-align: center;

    // margin: 10px;
    &:first-child {
      margin-left: 0;
    }
    &:last-child {
      margin-right: 0;
    }
    &:hover {
      text-decoration: underline;
    }
    .router-name {
      color: #000;
      font-size: 1.125rem;
      font-weight: bold;
      white-space: nowrap;
      padding: 10px;
    }
  }
}
</style>
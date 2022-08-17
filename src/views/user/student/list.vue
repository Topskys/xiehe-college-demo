<template>
  <div class="app-container">
    <el-form :model="queryParam" ref="queryForm" :inline="true">
      <el-form-item label="考试名称：">
        <el-input v-model="queryParam.userName"></el-input>
        <!-- 支持标题模糊查询，根据时间查询 -->
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm">查询</el-button>
        <!-- <router-link :to="{path:'/user/student/edit'}" class="link-left">
          <el-button type="primary">添加</el-button>
        </router-link> -->
      </el-form-item>
      <el-form-item label="考试时间：">
        <el-input v-model="queryParam.timeKey"></el-input>
        <!-- 支持标题模糊查询，根据时间查询 -->
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm">查询</el-button>
        <!-- <router-link :to="{path:'/user/student/edit'}" class="link-left">
          <el-button type="primary">添加</el-button>
        </router-link> -->
      </el-form-item>
    </el-form>

    <!-- 考试列表 -->
    <el-table
      v-loading="listLoading"
      :data="queryArr"
      border
      fit
      highlight-current-row
      style="width: 100%"
    >
      <el-table-column type="index" label="Id" align="center" />
      <el-table-column prop="name" label="考试名称" align="center" />
      <!-- <el-table-column prop="position" label="考场" align="center" /> -->
      <el-table-column prop="last" label="考试时长" align="center" />
      <!-- <el-table-column prop="userLevel" label="考试时间"  :formatter="levelFormatter"/> -->
      <el-table-column prop="dateTime" label="考试时间" align="center" />
      <el-table-column prop="limitType" label="类型" align="center" />
      <!-- <el-table-column prop="sex" label="完成情况"  :formatter="sexFormatter"/> -->
      <el-table-column prop="quantity" label="考题数" align="center" />
      <el-table-column prop="accomplish" label="完成情况" align="center" />

      <!-- <el-table-column label="状态" prop="status" width="70px">
        <template slot-scope="{row}">
          <el-tag :type="statusTagFormatter(row.status)">
            {{ statusFormatter(row.status) }}
          </el-tag>
        </template>
      </el-table-column> -->
      <el-table-column width="270px" label="操作" align="center">
        <template slot-scope="{ row, $index }">
          <router-link
            :to="{
              path: '/exam/student/ready',
              query: { data: JSON.stringify($index) || JSON.stringify(row) },
            }"
            class="link-left"
          >
            <el-button size="mini" type="primary">进入考试</el-button>
          </router-link>
          <!-- <router-link :to="{path:'/log/user/list', query:{userId:row.id}}" class="link-left">
            <el-button size="mini" >日志</el-button>
          </router-link> -->
          <!-- <el-button  size="mini" type="danger" @click="deleteUser(row)" class="link-left">删除</el-button> -->
        </template>
      </el-table-column>
    </el-table>
    <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="queryParam.pageIndex"
      :limit.sync="queryParam.pageSize"
      @pagination="search"
    />
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import Pagination from "@/components/Pagination";
import userApi from "@/api/user";

export default {
  components: { Pagination },
  data() {
    return {
      queryParam: {
        userName: "",
        timeKey:"",
        role: 1,
        pageIndex: 1,
        pageSize: 10,
      },
      listLoading: true,
      tableData: [
       {
          name: "Android高级程序开发",
          dateTime: `2022年8月26日 14:30`,
          last: "2h",
          limitType: "只能做一次",
          monitorMode: "监控桌面",
          scoreStandard: "15分",
          accomplish: "未完成",
          quantity: "1",
        },
        {
          name: "离散数学",
          dateTime: `2022年8月27日 15:00`,
          last: "2h",
          limitType: "每日一次",
          monitorMode: "监控桌面",
          scoreStandard: "15分",
          accomplish: "未完成",
          quantity: "1",
        },
        {
          name: "SQL結構化查詢語言",
          dateTime: `2022年8月28日 11:00`,
          last: "2h",
          limitType: "只能做一次",
          monitorMode: "监控桌面",
          scoreStandard: "15分",
          accomplish: "未完成",
          quantity: "1",
        },
        {
          name: "JavaWeb高级程序开发",
          dateTime: `2022年8月18日 9:00`,
          last: "2h",
          limitType: "只能做一次",
          monitorMode: "监控桌面",
          scoreStandard: "15分",
          accomplish: "未完成",
          quantity: "1",
        },
        {
          name: "高级集成电路设计PCB",
          dateTime: `2022年8月12日 14:00`,
          last: "2h",
          limitType: "只能做一次",
          monitorMode: "监控桌面",
          scoreStandard: "15分",
          accomplish: "未完成",
          quantity: "1",
        },
      ],
      total: 0,
      queryArr: [],
    };
  },
  created() {
    this.search();
  },
  methods: {
    search() {
      this.listLoading = true;
      let list =this.$getStorage("exam_list")
      if (!list||!list[0].name|| !list[0].dateTime) {
        this.$setStorage("exam_list", this.tableData);
      }

      if (this.$getStorage("exam_list")) {
        this.queryArr = this.$getStorage("exam_list");
      }
      this.total = this.queryArr.length;
      this.listLoading = false;
      //   })
    },
    changeStatus(row) {
      let _this = this;
      userApi.changeStatus(row.id).then((re) => {
        if (re.code === 1) {
          row.status = re.response;
          _this.$message.success(re.message);
        } else {
          _this.$message.error(re.message);
        }
      });
    },
    deleteUser(row) {
      let _this = this;
      userApi.deleteUser(row.id).then((re) => {
        if (re.code === 1) {
          _this.search();
          _this.$message.success(re.message);
        } else {
          _this.$message.error(re.message);
        }
      });
    },
    submitForm() {
      this.queryParam.pageIndex = 1;
      // this.search()
      // queryArr: [],
      //   this.queryArr = this.tableData
      // this.total = this.queryArr.length
      // 模糊查询
      var key = this.queryParam.userName || this.queryParam.timeKey,
        arr = [],
        list = this.tableData;
      if (!key) {
        return this.$message("关键词不能为空");
      }
      var reg = new RegExp(key);
      for (let i = 0; i < list.length; i++) {
        if (reg.test(list[i].name) || reg.test(list[i].dateTime)) {
          arr.push(list[i]);
        }
      }
      this.queryArr = arr;
      this.total = this.queryArr.length;
      this.queryParam.userName = !this.queryParam.userName?"":"";
      this.queryParam.timeKey=!this.queryParam.timeKey?"":""
    },
    levelFormatter(row, column, cellValue, index) {
      return this.enumFormat(this.levelEnum, cellValue);
    },
    sexFormatter(row, column, cellValue, index) {
      return this.enumFormat(this.sexEnum, cellValue);
    },
    statusFormatter(status) {
      return this.enumFormat(this.statusEnum, status);
    },
    statusTagFormatter(status) {
      return this.enumFormat(this.statusTag, status);
    },
    statusBtnFormatter(status) {
      return this.enumFormat(this.statusBtn, status);
    },
  },
  computed: {
    ...mapGetters("enumItem", ["enumFormat"]),
    ...mapState("enumItem", {
      sexEnum: (state) => state.user.sexEnum,
      statusEnum: (state) => state.user.statusEnum,
      statusTag: (state) => state.user.statusTag,
      statusBtn: (state) => state.user.statusBtn,
      levelEnum: (state) => state.user.levelEnum,
    }),
  },
};
</script>

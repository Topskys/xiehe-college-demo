<template>
  <div class="app-container">
    <el-form :model="queryParam" ref="queryForm" :inline="true">
      <!-- <el-form-item label="用户Id：">
        <el-input v-model="queryParam.userId"></el-input>
      </el-form-item> -->
      <el-form-item label="题目：">
        <el-input v-model="queryParam.userName"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm">查询</el-button>
      </el-form-item>
      <el-form-item>
        <router-link :to="{ path: '/topic/program/edit' }" class="link-left">
          <el-button type="primary">新建</el-button>
        </router-link>
      </el-form-item>
    </el-form>

    <el-table
      v-loading="listLoading"
      :data="queryArr"
      border
      fit
      highlight-current-row
      style="width: 100%"
    >
      
      <el-table-column type="index" label="Id" width="100px" align="center" />
      <el-table-column prop="name" label="名称" />
      <el-table-column prop="language" label="编程语言" />
      <el-table-column prop="description" label="描述"/>
      <el-table-column prop="output" label="输出" />
      <el-table-column prop="time" label="执行时间" />
      <el-table-column prop="limitRAM" label="限制内存"/>
      <el-table-column prop="config" label="用例配置"/>
      <el-table-column label="操作" width="220px" align="center">
        <template slot-scope="{ row, $index }">
          <router-link
            :to="{
              path: '/topic/program/edit',
              query: { data: JSON.stringify($index) || JSON.stringify(row) },
            }"
            class="link-left"
          >
            <el-button size="mini">修改</el-button>
          </router-link>
          <el-button size="mini" @click="delRow({ row, $index })" type="danger"
            class="link-left">删除</el-button
          >
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
import Pagination from "@/components/Pagination";
import userApi from "@/api/user";

export default {
  components: { Pagination },
  data() {
    return {
      queryParam: {
        userId: null,
        userName: null,
        pageIndex: 1,
        pageSize: 10,
      },
      listLoading: true,
      tableData: [
        {
          name: "最短路径算法",
          time: "10s",
          language: "C++",
          description: ">>",
          output: "<<",
          limitRAM: "10MB",
          config:"有"
        },
      ],
      total: 0,
      queryArr: [],
    };
  },
  created() {
    // let userId = this.$route.query.userId
    // if (userId && parseInt(userId) !== 0) {
    //   this.queryParam.userId = userId
    // }
    this.search();
  },
  methods: {
    search() {
      this.listLoading = true;
      if (!this.$getStorage("program_list")) {
        this.$setStorage("program_list", this.tableData);
      }

      if (this.$getStorage("program_list")) {
        this.queryArr = this.$getStorage("program_list");
      }


      this.total = this.queryArr.length;
      this.listLoading = false;
    },
    submitForm() {
      this.queryParam.pageIndex = 1;
      // this.search()

      // 模糊查询
      var key = this.queryParam.userName,
        arr = [],
        list = this.$getStorage("program_list");
      if (!key) {
        return this.$message("关键词不能为空");
      }
      var reg = new RegExp(key);
      for (let i = 0; i < list.length; i++) {
        if (reg.test(list[i].name) || reg.test(list[i].language)) {
          arr.push(list[i]);
        }
      }
      this.queryArr = arr;
      this.total = this.queryArr.length;
      this.queryParam.userName = "";
    },
    // 删除
    delRow(option) {
      var arr = this.$getStorage("program_list");
      option.row ? arr.splice(option.$index, 1) : ""; // 删除
      this.$setStorage("program_list", arr);
      var list = this.$getStorage("program_list");
      if (list && list.name !== option.row.name) {
        this.$message.success("删除成功");
      } else {
        this.$message.error("删除失败");
      }
      this.search(); // 刷新列表
    },
  },
};
</script>

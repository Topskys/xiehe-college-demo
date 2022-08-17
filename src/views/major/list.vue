<template>
  <div class="app-container">
    <el-form :model="queryParam" ref="queryForm" :inline="true">
      <el-form-item label="名称：">
        <el-input v-model="queryParam.level"></el-input>
        <!-- <el-select v-model="queryParam.level" placeholder="年级" clearable="">
          <el-option v-for="item in levelEnum" :key="item.key" :value="item.key" :label="item.value"></el-option>
        </el-select> -->
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm">查询</el-button>
      </el-form-item>
      <el-form-item>
        <router-link
          :to="{ path: '/major/paper/edit' }"
          class="link-left"
        >
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
      <el-table-column type="index" label="Id" align="center" />
      <el-table-column prop="name" label="专业名称" />
      <el-table-column prop="college" label="学院" />
      <el-table-column prop="level" label="年级" />
      <!-- <el-table-column prop="dateTime" label="创建时间" /> -->
      <el-table-column prop="count" label="专业人数" />
      <el-table-column prop="course" label="课程" />
      <el-table-column prop="step" label="学习步骤" />
      <el-table-column width="220px" label="操作" align="center">
        <template slot-scope="{ row, $index }">
          <router-link
            :to="{
              path: '/major/paper/edit',
              query: { data: JSON.stringify($index) || JSON.stringify(row) },
            }"
            class="link-left"
          >
            <el-button size="mini" class="link-left">修改</el-button>
          </router-link>
          <el-button size="mini" @click="delRow({ row, $index })" type="danger"
            class="link-left">删除</el-button
          >
          <!-- <el-button   size="mini" type="primary" @click="delSubject(row)" class="link-left">导出</el-button> -->

          <!-- <a
            href="https://code.jquery.com/jquery-3.6.0.slim.min.map"
            style="text-underline: none"
          >
            <el-button size="mini" type="primary" class="link-left"
              >导出</el-button
            ></a
          > -->
        </template>
      </el-table-column>
    </el-table>
    <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="queryParam.pageIndex"
      :limit.sync="queryParam.pageSize"
      @pagination="searchX"
    />
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import Pagination from "@/components/Pagination";
import subjectApi from "@/api/subject";

export default {
  components: { Pagination },
  data() {
    return {
      queryParam: {
        level: null,
        pageIndex: 1,
        pageSize: 10,
      },
      listLoading: true,
      tableData: [
        {
          name:"计算机科学与技术",
          college:"信息技术学院",
          level:"2019级",
          count:"98",
          course:"计算机网络、计算机组成与原理",
          step:"学习--》活动",
        }
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
      if (!this.$getStorage("major_list")) {
        this.$setStorage("major_list", this.tableData);
      }

      if (this.$getStorage("major_list")) {
        this.queryArr = this.$getStorage("major_list");
      }
      this.total = this.queryArr.length;
      this.listLoading = false;
    },
    searchX() {
      this.listLoading = true;
      this.listLoading = false;
      this.queryParam.pageIndex = this.queryParam.pageIndex;
      switch (this.queryParam.pageIndex) {
        case 1:
          this.queryParam.pageSize = 5;
          break;
        case 2:
          this.queryParam.pageSize = 10;
          break;
        case 3:
          this.queryParam.pageSize = 20;
          break;
        case 4:
          this.queryParam.pageSize = 30;
          break;
        case 5:
          this.queryParam.pageSize = 50;
          break;
      }
      this.total = this.tableData.length;
      // this.$getStorage("addExamList") ? this.tableData.push(this.$getStorage("addExamList")) : ""
      this.queryArr = this.tableData;
      this.total = this.queryArr.length;
      this.listLoading = false;
    },
    submitForm() {
      this.queryParam.pageIndex = 1;
      // this.search()

      // 模糊查询
      var key = this.queryParam.level,
        arr = [],
        list = this.$getStorage("major_list");
      if (!key) {
        return this.$message("关键词不能为空");
      }
      var reg = new RegExp(key);
      for (let i = 0; i < list.length; i++) {
        if (reg.test(list[i].name) || reg.test(list[i].level)) {
          arr.push(list[i]);
        }
      }
      this.queryArr = arr;
      this.total = this.queryArr.length;
      this.queryParam.level = "";
    },
    delSubject(row) {
      let _this = this;
      subjectApi.deleteSubject(row.id).then((re) => {
        if (re.code === 1) {
          _this.search();
          _this.$message.success(re.message);
        } else {
          _this.$message.error(re.message);
        }
      });
    },
    // 删除
    delRow(option) {
      var arr = this.$getStorage("major_list");
      option.row ? arr.splice(option.$index, 1) : ""; // 删除
      this.$setStorage("major_list", arr);
      var list = this.$getStorage("major_list");
      if (list && list.name !== option.row.name) {
        this.$message.success("删除成功");
      } else {
        this.$message.error("删除失败");
      }
      this.search(); // 刷新列表
    },
  },
  computed: {
    ...mapGetters("enumItem", ["enumFormat"]),
    ...mapState("enumItem", {
      levelEnum: (state) => state.user.levelEnum,
    }),
  },
};
</script>

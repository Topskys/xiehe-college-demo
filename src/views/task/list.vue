<template>
  <div class="app-container">
    <el-form :model="queryParam" ref="queryForm" :inline="true">
      <el-form-item label="题目：">
        <el-input v-model="queryParam.gradeLevel"></el-input>
        <!-- <el-select v-model="queryParam.gradeLevel" placeholder="年级" clearable>
          <el-option v-for="item in levelEnum" :key="item.key" :value="item.key" :label="item.value"></el-option>
        </el-select> -->
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm">查询</el-button>
      </el-form-item>
    </el-form>
    <!--  -->
    <el-table
      v-loading="listLoading"
      :data="queryArr"
      border
      fit
      highlight-current-row
      style="width: 100%"
    >
      <el-table-column type="index" label="Id" width="100" align="center" />
      <el-table-column prop="name" label="标题" align="center" />
      <!-- <el-table-column prop="gradeLevel" label="学级"  :formatter="levelFormatter"/> -->
      <el-table-column prop="from" label="来源" align="center" />
      <el-table-column prop="createTime" label="创建时间" align="center" />
      <el-table-column label="操作" align="center">
        <template slot-scope>
          <router-link to="/task/re_do">
            <el-button size="mini">重做</el-button>
          </router-link>

          <!-- <el-button size="mini"  type="danger" @click="deleteTask(row)" class="link-left">删除</el-button> -->
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
import taskApi from "@/api/task";

export default {
  components: { Pagination },
  data() {
    return {
      queryParam: {
        gradeLevel: null,
        pageIndex: 1,
        pageSize: 10,
      },
      listLoading: true,
      tableData: [
        {
          name: `一个完整的计算机系统有哪些组成成分？`, // 答：一个完整的计算机系统由硬件系统和软件系统所组成。硬件系统包括：控制器、运算器、存储器、输入设备和输出设备。软件系统由系统软件和应用软件所组成
          from: "训练",
          createTime: "2022年8月4日17:56:50",
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

      this.queryArr = this.tableData;
      this.total = this.queryArr.length;
      // taskApi.pageList(this.queryParam).then(data => {
      //   const re = data.response
      //   this.tableData = re.list
      //   this.total = re.total
      //   this.queryParam.pageIndex = re.pageNum
      //   this.listLoading = false
      // })
      // this.total=this.tableData.length
      this.listLoading = false;
    },
    submitForm() {
      this.queryParam.pageIndex = 1;
      // this.search()

      // 模糊查询
      var key = this.queryParam.gradeLevel,
        arr = [],
        list = this.tableData;
      if (!key) {
        return this.$message("关键词不能为空");
      }
      var reg = new RegExp(key);
      for (let i = 0; i < list.length; i++) {
        if (reg.test(list[i].name) || reg.test(list[i].createTime)) {
          arr.push(list[i]);
        }
      }
      this.queryArr = arr;
      this.total = this.queryArr.length;
      this.queryParam.gradeLevel = "";
    },
    deleteTask(row) {
      let _this = this;
      taskApi.deleteTask(row.id).then((re) => {
        if (re.code === 1) {
          _this.search();
          _this.$message.success(re.message);
        } else {
          _this.$message.error(re.message);
        }
      });
    },
    levelFormatter(row, column, cellValue, index) {
      return this.enumFormat(this.levelEnum, cellValue);
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

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
        <router-link :to="{ path: '/train/list/edit' }" class="link-left">
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
      <el-table-column prop="name" label="名称" />
      <el-table-column prop="dateTime" label="考试时间" />
      <el-table-column prop="last" label="考试时长" />
      <el-table-column prop="limitType" label="限制类型" />
      <el-table-column prop="type" label="类型" />
      <el-table-column prop="monitorMode" label="监控模式" />
      <el-table-column prop="scoreStandard" label="积分标准" />
      <el-table-column width="220px" label="操作" align="center">
        <template slot-scope="{ row, $index }">
          <router-link
            :to="{
              path: '/train/list/edit',
              query: { data: JSON.stringify($index) || JSON.stringify(row) },
            }"
            class="link-left"
          >
            <el-button size="mini" class="link-left">修改</el-button>
          </router-link>
          <el-button
            size="mini"
            @click="delRow({ row, $index })"
            type="danger"
            class="link-left"
            >删除</el-button
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
          <el-button size="mini" type="primary" class="link-left" @click="DownloadFile">导出</el-button>
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
          name: "离散数学",
          dateTime: `2022年8月10日 15:00`,
          last: "2h",
          limitType: "每日一次",
          monitorMode: "监控桌面",
          scoreStandard: "100分",
          type: "易错题",
        
        },
      ],
      total: 0,
      queryArr: [],
    };
  },
  created() {
    this.search();
  },
  mounted() {
    this.$bus.$on("getAddExam", (data) => {
      this.$nextTick(() => {
        this.tableData.push(data);
        this.queryArr.push(data);
        console.log("List:", this.queryArr);
        if (!data) {
          this.search();
        }
      });
    });
    this.$bus.$on("updateExam", (data) => {
      data = JSON.parse(data);
      this.$nextTick(() => {
        let id = parseInt(data.id) - 1;
        this.queryArr[id] = data.form;
        this.$message.success("修改成功");
      });
    });
  },
  methods: {
    search() {
      this.listLoading = true;
      if (!this.$getStorage("train_list")) {
        this.$setStorage("train_list", this.tableData);
      }

      if (this.$getStorage("train_list")) {
        this.queryArr = this.$getStorage("train_list");
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
        list = this.$getStorage("train_list");
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
      this.queryParam.level = "";
    },
    DownloadFile() {
      // var path = window.location.href
      // const reg1 = /(\w+):\/\/([^/:]+)(:\d*)?/g
      // const reg = /(\w+):\/\/([^/:]+)(:\d*)?(\/admin)?/g
      // let path= reg.exec(path)[0]
      // const reg2=/admin?/g
      // let flag=reg2.test(path)
      // if ( !path) {
        // path = "https://47.109.37.204:8089"
        // path2 = "https://47.109.37.204:8089/admin"
      // }
      // window.open(`${path}/试卷.docx`)
      // window.open("http://47.109.49.136:8089/assets/试卷.docx")

      var path = window.location.href
      const reg = /(\w+):\/\/([^/:]+)(:\d*)?/g
      path = reg.exec(path)[0]
      if (!path) {
        path = "https://47.109.37.204:8089"
      }
      window.open(`${path}/exam.docx`)
      // console.log("href:", window.location.href)
      // console.log("Download:", `${path}/试卷.docx`)
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
      var arr = this.$getStorage("train_list");
      option.row ? arr.splice(option.$index, 1) : ""; // 删除
      this.$setStorage("train_list", arr);
      var list = this.$getStorage("train_list");
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

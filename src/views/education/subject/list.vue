<template>
  <div class="app-container">
    <el-form :model="queryParam" ref="queryForm" :inline="true">
      <el-form-item label="考卷名称：">
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
          :to="{ path: '/education/subject/edit' }"
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
      <el-table-column prop="name" label="考卷名称" />
      <el-table-column prop="dateTime" label="考试时间" />
      <el-table-column prop="last" label="考试时长" />
      <el-table-column prop="limitType" label="限制类型" />
      <el-table-column prop="monitorMode" label="监控模式" />
      <el-table-column prop="scoreStandard" label="积分标准" />
      <el-table-column width="220px" label="操作" align="center">
        <template slot-scope="{ row, $index }">
          <router-link
            :to="{
              path: '/education/subject/edit',
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
          <!-- @click="download" https://code.jquery.com/jquery-3.6.0.min.map-->
          
            <el-button
              size="mini"
              type="primary"
              class="link-left"
              @click="DownloadFile"
              >导出</el-button
            >
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
import { number } from "echarts";

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
          name: "Android高级程序开发",
          dateTime: `2022年8月10日 16:00`,
          last: "2h",
          limitType: "每日一次",
          monitorMode: "监控桌面",
          scoreStandard: "15分",
          accomplish: "未完成",
          quantity: "1",
        },
        {
          name: "离散数学",
          dateTime: `2022年8月13日 14:00`,
          last: "2h",
          limitType: "每日一次",
          monitorMode: "监控桌面",
          scoreStandard: "15分",
          accomplish: "未完成",
          quantity: "1",
        },
        {
          name: "SQL結構化查詢語言",
          dateTime: `2022年8月8日 9:00`,
          last: "2h",
          limitType: "每日一次",
          monitorMode: "监控桌面",
          scoreStandard: "15分",
          accomplish: "未完成",
          quantity: "1",
        },
        {
          name: "JavaWeb高级程序开发",
          dateTime: `2022年8月15日 11:00`,
          last: "2h",
          limitType: "每日一次",
          monitorMode: "监控桌面",
          scoreStandard: "15分",
          accomplish: "未完成",
          quantity: "1",
        },
        {
          name: "高级集成电路设计PCB",
          dateTime: `2022年8月28日 14:00`,
          last: "2h",
          limitType: "每日一次",
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
    DownloadFile() {
      var path = window.location.href
      const reg = /(\w+):\/\/([^/:]+)(:\d*)?/g
      path = reg.exec(path)[0]
      if(!path){
        path = "https://47.109.37.204:8089"
      }  
      window.open(`${path}/exam.docx`)
      // console.log("href:", window.location.href)
      //  console.log("Download:",`${path}/试卷.docx`)
    },
    search() {
      this.listLoading = true;
      let list = this.$getStorage("exam_list");
      if (!list || !list[0].name || !list[0].dateTime) {
        // if (!this.$getStorage("exam_list")) {
        this.$setStorage("exam_list", this.tableData);
      }

      if (this.$getStorage("exam_list")) {
        this.queryArr = this.$getStorage("exam_list");
      }
      this.total = this.queryArr.length;
      this.listLoading = false;
      // this.listLoading = true
      // // this.total=this.tableData.length
      // this.$getStorage("addExamList") ? this.tableData.push(this.$getStorage("addExamList")) : ""
      // this.queryArr = this.tableData
      // console.log("queryAr:", this.queryArr)
      // this.total = this.queryArr.length
      // this.listLoading = false

      // subjectApi.pageList(this.queryParam).then(data => {
      //   const re = data.response
      //   this.tableData = re.list
      //   this.total = re.total
      //   this.queryParam.pageIndex = re.pageNum
      //   this.listLoading = false
      // })
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
        list = this.$getStorage("exam_list");
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
    download() {
      this.$nextTick(() => {
        window.location = "/public/exam.docx";
      });
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
      var arr = this.$getStorage("exam_list");
      option.row ? arr.splice(option.$index, 1) : ""; // 删除
      this.$setStorage("exam_list", arr);
      var list = this.$getStorage("exam_list");
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

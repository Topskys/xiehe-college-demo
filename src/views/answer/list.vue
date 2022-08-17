<template>
  <div class="app-container">
    <el-form :model="queryParam" ref="queryForm" :inline="true">
      <el-form-item label="题目：">
        <!-- <el-select v-model="queryParam.subjectId"  clearable>
          <el-option v-for="item in subjects" :key="item.id" :value="item.id" :label="item.name"></el-option>
        </el-select> -->
        <el-input v-model="queryParam.key"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm">查询</el-button>
      </el-form-item>
      <el-form-item>
        <router-link :to="{ path: '/topic/theory/edit' }" class="link-left">
          <el-button type="primary">新建</el-button>
        </router-link>
      </el-form-item>
    </el-form>

    <el-table v-loading="listLoading" :data="queryArr" border fit highlight-current-row style="width: 100%">
      <el-table-column type="index" label="Id" width="100px" align="center" />
      <el-table-column prop="name" label="名称" />
      <el-table-column prop="dateTime" label="创建时间" />
      <el-table-column prop="type" label="类型" />
      <el-table-column prop="answer" label="答案" />
      <el-table-column label="操作" width="220px" align="center">
        <template slot-scope="{ row, $index }">
          <router-link :to="{
              path: '/topic/theory/edit',
              query: { data: JSON.stringify($index) || JSON.stringify(row) },
            }" class="link-left">
            <el-button size="mini">修改</el-button>
          </router-link>
          <el-button size="mini" @click="delRow({ row, $index })" type="danger" class="link-left">删除</el-button>
        </template>
      </el-table-column>
      <!-- <el-table-column  label="题目对错" width="80px" >
        <template slot-scope="{row}">
          {{row.questionCorrect}} / {{row.questionCount}}
        </template>
      </el-table-column>
      <el-table-column prop="doTime" label="耗时" width="100px"/>
      <el-table-column prop="createTime" label="提交时间" width="160px"/> -->
    </el-table>
    <pagination v-show="total > 0" :total="total" :page.sync="queryParam.pageIndex" :limit.sync="queryParam.pageSize"
      @pagination="search" />
  </div>
</template>

<script>
import { mapGetters, mapState, mapActions } from "vuex";
import Pagination from "@/components/Pagination";
import examPaperAnswerApi from "@/api/examPaperAnwser";

export default {
  components: { Pagination },
  data() {
    return {
      queryParam: {
        key: null,
        subjectId: null,
        pageIndex: 1,
        pageSize: 10,
      },
      listLoading: false,
      tableData: [
        {
          name: "一个完整的计算机系统有哪些组成成分？",
          dateTime: "2022年8月7日 14:23:35",
          type: "多选",
          answer: `一个完整的计算机系统由硬件和软件系统构成。硬件系统包括以下五个部分：运算器、控制器、存储设备、输入设备、输出设备。软件系统包括：系统软件和应用软件两个部分。故选 C 。`,
          question: "无",
          select1: "A、计算机系统由计算机软件系统构成。",
          select2: "B、计算机系统由计算机硬件系统构成。",
          select3: "C、硬件系统包括以下五个部分：运算器、控制器、存储设备、输入设备、输出设备。",
          select4: "D、软件系统指的是应用层上的应用软件部分。",
          right:"C、硬件系统包括以下五个部分：运算器、控制器、存储设备、输入设备、输出设备。",
          detail:"",
        },
      ],
      total: 0,
      queryArr: [],
    };
  },
  created() {
    // this.initSubject()
    this.search();
  },
  methods: {
    search() {
      this.listLoading = true;
      if (!this.$getStorage("theory_list")) {
        this.$setStorage("theory_list", this.tableData);
      }

      if (this.$getStorage("theory_list")) {
        this.queryArr = this.$getStorage("theory_list");
      }
      this.total = this.queryArr.length;
      this.listLoading = false;
    },
    submitForm() {
      this.queryParam.pageIndex = 1;
      // this.search()

      // 模糊查询
      var key = this.queryParam.key,
        arr = [],
        list = this.$getStorage("theory_list");
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
      this.queryParam.key = "";
    },
    // 删除
    delRow(option) {
      var arr = this.$getStorage("theory_list");
      option.row ? arr.splice(option.$index, 1) : ""; // 删除
      this.$setStorage("theory_list", arr);
      var list = this.$getStorage("theory_list");
      if (list && list.name !== option.row.name) {
        this.$message.success("删除成功");
      } else {
        this.$message.error("删除失败");
      }
      this.search(); // 刷新列表
    },
    ...mapActions("exam", { initSubject: "initSubject" }),
  },
  computed: {
    ...mapGetters("enumItem", ["enumFormat"]),
    ...mapGetters("exam", ["subjectEnumFormat"]),
    ...mapState("exam", { subjects: (state) => state.subjects }),
  },
};
</script>

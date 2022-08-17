<template>
  <div class="app-container">
    <el-form :model="queryParam" ref="queryForm" :inline="true">
      <el-form-item label="题目：">
        <el-input v-model="queryParam.sendUserName"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm">查询</el-button>
      </el-form-item>
      <el-form-item>
        <router-link :to="{path:'/topic/operate/edit'}" class="link-left">
          <el-button type="primary">新建</el-button>
        </router-link>
      </el-form-item>
    </el-form>

    <el-table v-loading="listLoading" :data="queryArr" border fit highlight-current-row style="width: 100%">
      <!-- <el-table-column prop="id" label="Id"  width="100" />
      <el-table-column prop="title" label="标题" show-overflow-tooltip/>
      <el-table-column prop="content" label="内容" show-overflow-tooltip />
      <el-table-column prop="sendUserName" label="发送人"  width="100" />
      <el-table-column prop="receives" label="接收人"  show-overflow-tooltip />
      <el-table-column prop="readCount" label="已读数" width="70" />
      <el-table-column prop="receiveUserCount" label="接收人数" width="100" />
      <el-table-column prop="createTime" label="创建时间" width="160px"/> -->
      <el-table-column type="index" label="Id" width="100px" align="center" />
      <el-table-column prop="name" label="名称" />
      <el-table-column prop="type" label="类型" />
      <el-table-column prop="config" label="考点" />
      <el-table-column prop="question" label="问题" />
      <el-table-column prop="answer" label="答案解读" />
      <el-table-column prop="createTime" label="创建时间" />
      <el-table-column label="操作" width="220px" align="center">
        <template slot-scope="{row,$index}">
          <router-link :to="{path:'/topic/operate/edit', query:{data: JSON.stringify($index) || JSON.stringify(row) }}"
            class="link-left">
            <el-button size="mini">修改</el-button>
          </router-link>
          <el-button size="mini" @click="delRow({ row, $index })" type="danger" class="link-left">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0" :total="total" :page.sync="queryParam.pageIndex" :limit.sync="queryParam.pageSize"
      @pagination="search" />
  </div>
</template>

<script>

import Pagination from '@/components/Pagination'
import messageApi from '@/api/message'

export default {
  components: { Pagination },
  data () {
    return {
      queryParam: {
        sendUserName: null,
        pageIndex: 1,
        pageSize: 10
      },
      listLoading: true,
      tableData: [
        {
          name:"学习浏览器代码调试",
          type:"IE",
          question:"无",
          config:"目录",
          answer:"有",
          createTime:`${new Date}`,
        },
        
      ],
      total: 0,
      queryArr: [],
    }
  },
  created () {
    this.search()
  },
  methods: {
    search () {
      this.listLoading = true;
      if(!this.$getStorage("operate_list")){
        this.$setStorage("operate_list", this.tableData);
      }

      if (this.$getStorage("operate_list")) {
        this.queryArr = this.$getStorage("operate_list");
      }
      this.total = this.queryArr.length;
      this.listLoading = false;
    },
    submitForm () {
      this.queryParam.pageIndex = 1
      // this.search()
      
      // 模糊查询
      var key = this.queryParam.sendUserName, arr = [], list = this.$getStorage("operate_list");
      if (!key) {
        return this.$message('关键词不能为空')
      }
      var reg = new RegExp(key)
      for (let i = 0; i < list.length; i++) {
        if (reg.test(list[i].name) || reg.test(list[i].createTime)) {
          arr.push(list[i])
        }
      }
      this.queryArr = arr
      this.total = this.queryArr.length
      this.queryParam.sendUserName = ""
    },
    // 删除
    delRow(option) {
      var arr = this.$getStorage("operate_list");
      option.row ? arr.splice(option.$index, 1) : ""; // 删除
      this.$setStorage("operate_list", arr);
      var list = this.$getStorage("operate_list");
      if (list && list.name !== option.row.name) {
        this.$message.success("删除成功");
      } else {
        this.$message.error("删除失败");
      }
      this.search(); // 刷新列表
    },
  }
}
</script>

<template>
  <div>
    <el-button type="primary" @click="multiDelete">批量删除</el-button>
    <el-table
      :data="tableData"
      border
      ref="multipleTable"
      tooltip-effect="dark"
      @selection-change="handleSelectionChange"
      style="width: 100%"
    >
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="id" label="id" width="150"></el-table-column>
      <el-table-column prop="content" label="内容" width="120">
      </el-table-column>
      <el-table-column prop="createTime" label="评论时间" width="120">
      </el-table-column>
      <el-table-column prop="blogId" label="博客Id" width="120">
      </el-table-column>
      <el-table-column prop="parentId" label="父评论Id" width="300">
      </el-table-column>
      <el-table-column prop="ip" label="客户端ip" width="120">
      </el-table-column>
      <el-table-column label="操作" width="100">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small"
          >删除
          </el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
  import axios from 'axios';

  export default {
    data() {
      return {
        type: 'A',
        tableData: []
      };
    },
    methods: {
      getData() {
        axios.get('/comment/all').then(res => {
          this.tableData = res.data.data;
        });
      },
      handleClick(e) {
        console.log(e.id);
        axios
          .delete(`/comment/delete?ids=${e.id}`)
          .then(res => {
            this.getData();
          })
          .catch(err => {
            console.log(err);
          });
      },
      multiDelete() {
        const idsArr = this.multipleSelection.map(e => e.id);
        axios
          .delete(`/comment/delete?ids=${idsArr.join(',')}`)
          .then(res => {
            this.getData();
          })
          .catch(err => {
            console.log(err);
          });
      },
      handleSelectionChange(val) {

        this.multipleSelection = val;
        console.log(this.multipleSelection)
      }
    },
    mounted() {
      this.getData();
    }
  };
</script>

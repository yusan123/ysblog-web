<template>
  <div>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column  prop="id" label="id" width="150">
      </el-table-column>
      <el-table-column prop="content" label="内容" width="120"> </el-table-column>
      <el-table-column prop="createTime" label="评论时间" width="120">
      </el-table-column>
      <el-table-column prop="blogId" label="博客Id" width="120"> </el-table-column>
      <el-table-column prop="parentId" label="父评论Id" width="300">
      </el-table-column>
      <el-table-column prop="ip" label="客户端ip" width="120"> </el-table-column>
      <el-table-column  label="操作" width="100">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small"
            >删除</el-button
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
    getData(){
      axios.get('/comment/all').then(res=>{
        this.tableData = res.data.data;
      })
    }
    
  },
  mounted(){
    this.getData()
  }
};
</script>

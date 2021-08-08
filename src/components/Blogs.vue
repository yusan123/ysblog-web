
<template>
  <div>
    <el-button type="primary" @click="create">添加</el-button>
    <router-link :to="{ path: '/blogList' }">查看</router-link>
    <el-table :data="tableData" border style="width: 85%">
      <el-table-column prop="title" label="标题" width="200"> </el-table-column>
      <el-table-column prop="createTime" label="创建时间" width="200">
      </el-table-column>
      <el-table-column prop="updateTime" label="修改时间" width="200">
      </el-table-column>
      <el-table-column prop="context" label="正文" width="300">
      </el-table-column>
      <el-table-column label="操作" width="100">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small"
            >删除</el-button
          >
          <el-button type="text" size="small" @click="edit(scope.row)"
            >编辑</el-button
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
    create() {
      this.$router.push({ path: '/create' });
    },
    edit(e) {
      this.$router.push({
        path: '/create',
        query: {
          id: e.id
        }
      });
    },
    handleClick(e) {
      axios.delete(`/blog/delete?id=${e.id}`).then((res) => {
        console.log(res);
        if (res.data.result === 'success') {
          this.getAllData();
        }
      });
    },
    getAllData() {
      axios.get('/blog/all').then((res) => {
        if (res.data.result === 'success') {
          this.tableData = res.data.data;
        }
      });
    }
  },
  mounted() {
    this.getAllData();
  }
};
</script>

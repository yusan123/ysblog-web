<template>
  <div>
    <el-button type="primary" @click="dialogFormVisible = true">添加</el-button>
    <el-table :data="tableData" border style="width: 50%">
       <el-table-column fixed prop="uuId" label="序号" width="230">
      </el-table-column>
      <el-table-column fixed prop="name" label="tag" width="220">
      </el-table-column>
      <el-table-column label="操作" width="150">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="添加分类" :visible.sync="dialogFormVisible">
      <el-alert :title="tips" type="error" v-if="tips"> </el-alert>
      <el-form :model="form">
        <el-form-item label="分类名称" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button  @click="cancel">取 消</el-button>
        <el-button type="primary" @click="submitData">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import axios from 'axios';
export default {
  data() {
    return {
      dialogFormVisible: false,
      tips: '',
      form: {
        name: ''
      },
      formLabelWidth: '120px',
      type: 'A',
      tableData: []
    };
  },
  mounted() {
    this.getAll();
  },
  methods: {
    getAll() {
      axios.get('/tag/all').then((res) => {
        this.tableData = res.data.data;
        this.tableData.forEach((e, index) => {
          e.uuId = index;
        });
      });
    },
    create(params) {
      return axios.post('/tag/create?name=' + params, params);
    },
    cancel() {
      this.dialogFormVisible = false;
      this.tips = '';
      this.form.name = '';
    },
    submitData() {
      axios
        .get(`/tag/isExist?name=${this.form.name}`)
        .then((result) => {
          console.log(result);
          if (result.data.result !== 'failed') {
            this.create(this.form.name)
              .then((res) => {
                if (res.status === 200) {
                  this.dialogFormVisible = false;
                  this.getAll();
                  this.form.name = '';
                }
              })
              .catch((er) => {
                console.log(er);
              });
          } else {
            this.tips = '分类已存在';
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    handleClick(e) {
      console.log(e.id);
      axios
        .delete(`/tag/delete?id=${e.id}`)
        .then((res) => {
          this.getAll();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }
};
</script>

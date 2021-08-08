
<template>
  <el-form
    :model="ruleForm"
    :rules="rules"
    ref="ruleForm"
    label-width="100px"
    class="demo-ruleForm"
  >
    <el-form-item label="博客标题" prop="name" width="400">
      <el-input v-model="ruleForm.name"></el-input>
    </el-form-item>
    <el-form-item label="博客正文" prop="delivery">
      <el-input type="textarea" v-model="ruleForm.desc"></el-input>
    </el-form-item>
    <el-form-item>
      <el-select v-model="value1" multiple placeholder="请选择">
        <el-option
          v-for="item in ruleForm.options"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        >
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm('ruleForm')"
        >{{buttonLabel}}</el-button
      >
      <!-- <el-button @click="resetForm('ruleForm')">取消</el-button> -->
      <el-button @click="cancel">取消</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
import axios from 'axios';
export default {
  data() {
    return {
      buttonLabel: '立即创建',
      ruleForm: {
        name: '',
        desc: '',
        options: [

        ]
      },
      value1: [],
      rules: {
        name: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 100, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],

        desc: [{ required: true, message: '请填写活动形式', trigger: 'blur' }]
      }
    };
  },
  methods: {
    submitForm(formName) {
      if (this.$route.query.id) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            const params = {
              id: this.$route.query.id,
              title: this.ruleForm.name,
              context: this.ruleForm.desc,
              tagIds: this.value1
            };
            axios.put('/blog/update', params).then(res => {
              this.$message('修改博客成功');
              setTimeout(() => {
                this.$router.push({path: '/blogs'});
              }, 3000);
            });
          } else {
            return false;
          }
        });
      } else {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            const params = {
              title: this.ruleForm.name,
              context: this.ruleForm.desc,
              tagIds: this.value1
            };
            axios.post('/blog/create', params).then(res => {
              this.$message('创建博客成功');
              setTimeout(() => {
                this.$router.push({path: '/blogs'});
              }, 3000);
            });
          } else {
            return false;
          }
        });
      }
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    cancel() {
      this.$router.push({path: '/blogs'});
    },
    // 根据id查询博客
    getBlogInfo() {
      axios.get(`/blog/getById?id=${this.$route.query.id}`).then(res => {
        this.ruleForm.name = res.data.data.title;
        this.ruleForm.desc = res.data.data.context;
        this.value1 = res.data.data.tags.map(e => e.id);
      });
    }

  },
  mounted() {
    if (this.$route.query.id) {
      this.getBlogInfo();
      this.buttonLabel = '修改博客';
    }
    axios.get('/tag/all').then((res) => {
      this.ruleForm.options = res.data.data;
    });
  }
};
</script>
<style>
.el-form-item__content,.el-select {
  width: 400px;
}

</style>

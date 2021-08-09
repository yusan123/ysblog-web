<template
  v-loading="loading"
  element-loading-text="拼命加载中"
  element-loading-spinner="el-icon-loading"
  element-loading-background="rgba(0, 0, 0, 0.8)"
>
  <div class="top-title">
    <h2>xxx的博客</h2>

    <div>
      <router-link
        :to="{ path: '/blogList' }"
        style="float: right; margin-right: 40px"
      >返回博客列表
      </router-link
      >
    </div>
    <el-card class="box-card">
      <div slot="header" class="clearfix" style="font-size: 28px; color: blue">
        {{ resObj.title }}
      </div>
      <div style="text-align: left; font-size: 20px">
        <el-tag type="success" v-for="tag in resObj.tags" :key="tag.id">{{
          tag.name
          }}
        </el-tag>
      </div>
      <div style="font-size: 10px;color: gray">
        创建时间<span> {{ createTime }}</span> 创建人:<span>admin </span
      >评论数<span>({{ commentCount }})</span>
      </div>
      <div style="margin-top: 20px">
        {{ blogContent }}
      </div>
      <el-form
        ref="ruleForm"
        :model="ruleForm"
        label-width="80px"
        style="margin-top: 40px"
        :rules="rules"
      >
        <el-form-item label="评论" prop="desc">
          <el-input type="textarea" v-model="ruleForm.desc"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit('ruleForm')"
          >提交
          </el-button
          >
        </el-form-item>
      </el-form>
      <el-card
        class="box-card"
        style="width: 100%"
        v-for="o in blogCommnets"
        :key="o.id"
      >
        <div class="text item">
          {{ o.content }}
          <div
            style="font-size: 10px;color: gray;margin-top:5px;text-align:right"
          >
            来自于<span>{{ o.ip }}的评论 </span>时间:<span>
              {{ o.createTime }}</span
          >
          </div>
        </div>
      </el-card>
    </el-card>
  </div>
</template>
<script>
  import axios from 'axios';

  export default {
    data() {
      return {
        loading: true,
        activeIndex: '1',
        blogContent: '',
        createTime: '',
        commentCount: 0,
        resObj: '',
        navItems: [
          {
            index: 1,
            label: 'java'
          },
          {
            index: 2,
            label: 'C++'
          },
        {
          index: 3,
          label: 'java'
        },
        {
          index: 4,
          label: 'java'
        },
        {
          index: 5,
          label: 'java'
        },
          {
            index: 6,
            label: 'java'
          },
          {
            index: 7,
            label: 'java'
          }
        ],
        blogCommnets: [],
        ruleForm: {
          desc: ''
        },
        rules: {
          desc: [
            {required: true, message: '您不可以提交空评论...', trigger: 'blur'}
          ]
        }
      };
  },
  mounted() {
    this.goDetail();
    axios.get(`/blog/getById?id=${this.$route.query.id}`).then(res => {
      console.log(res);
      this.blogContent = res.data.data.context;
      this.createTime = res.data.data.createTime;
      this.resObj = res.data.data;
      this.commentCount = res.data.data.commentCount;
    });
  },
  methods: {
    handleSelect() {
    },
    goDetail() {
      axios.get(`/comment/all?blogId=${this.$route.query.id}`).then(res => {
        console.log(res);
        this.blogCommnets = res.data.data;
      });
    },
    onSubmit(ruleForm) {
      this.$refs[ruleForm].validate(valid => {
        if (valid) {
          const params = {
            content: this.ruleForm.desc,
            blogId: this.$route.query.id
          };
          axios
            .post('/comment/create', params)
            .then(res => {
              this.goDetail();
              this.ruleForm.desc = '';
            })
            .catch(err => {
              console.log(err);
            });
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    }
  }
};
</script>
<style lang="">
.top-title {
  height: 60px;
  width: 100%;
  background-color: #000;
}

h2 {
  color: #fff;
  height: 80px;
  line-height: 80px;
}
.blog-item {
  padding-block: 20px;
  width: 60%;
  height: 400px;
  margin: 20px auto;
  background-color: #ccc;
}

.el-card {
  width: 60%;
  margin: 0 auto;
  margin-bottom: 15px;
}
</style>

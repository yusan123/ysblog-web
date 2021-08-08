<template>
  <div class="top-title">
    <h2>xxx的博客</h2>
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
    >
      <el-menu-item
        index="item.index"
        @click="filter(item)"
        v-for="item of navItems"
        :key="item.id"
        >{{ item.name }}</el-menu-item
      >
    </el-menu>
      <router-link
        :to="{ path: '/blogs' }"
        style="float: right; margin-right: 40px"
        >返回</router-link
      >
    <el-card class="box-card" v-for="item in blogContentList" :key="item.id">
      <div slot="header" class="clearfix">
        <span style="font-size: 28px; color: blue"> {{ item.title }}</span>

        <el-button
          style="float: right; padding: 3px 0"
          type="text"
          @click="goDetail(item.id)"
          >查看更多</el-button
        >
      </div>
      <div style="text-align: left; font-size: 20px">
        <el-tag
          type="success"
          v-for="tag in item.tags"
          :key="tag.id"
          class="tag-click"
          @click="filter(tag)"
          >{{ tag.name }}</el-tag
        >
      </div>
      创建时间<span> {{ item.createTime }}</span> 创建人<span> admin</span>
      评论数<span> （100）</span>
      <div style="margin-top: 20px; text-align: center">
        {{ item.context }}
      </div>
    </el-card>
    <!-- <div class="blog-content">
      <div class="blog-item" v-for="item in blogContentList" :key="item.id">
        <div
          style="font-weight: 700; font-size:28px; color: blue; margin-bottom:20px;"
        >
         
        </div>
      
        <p style="text-align:left;  text-indent: 20px;margin-top: 20px;">
         
        </p>
      </div>
    </div> -->
  </div>
</template>
<script>
import axios from 'axios';
export default {
  data() {
    return {
      activeIndex: '1',
      blogContentList: [],
      navItems: [],
    };
  },
  mounted() {
    this.getAlltags();
    this.getAllBlog();
  },
  methods: {
    handleSelect(){

    },
    getAllBlog() {
      axios.get('/blog/all').then((res) => {
        console.log(res);
        this.blogContentList = res.data.data;
      });
    },
    goDetail(id) {
      this.$router.push({
        path: '/blogDetail',
        query: {
          id,
        },
      });
    },
    filter(e) {
      if (e.id === 'all') {
        this.getAllBlog();
      } else {
        axios.get(`/blog/all?tagName=${e.name}`).then((res) => {
          this.blogContentList = res.data.data;
        });
      }
    },
    getAlltags() {
      axios.get(`/tag/all`).then((res) => {
        this.navItems = res.data.data;
        this.navItems.unshift({
          id: 'all',
          name: '所有',
        });
        this.navItems.forEach((item, i) =>{
          item.index  = i + '';
        })
      });
    },
  },
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
.el-tag.el-tag--success {
  font-size: 16px;
  margin-right: 8px;
}
.tag-click {
  cursor: pointer;
}
</style>
